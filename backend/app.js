const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const {promises: fs} = require('fs');
const NadraUserDatabase = require('./NADRA');

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
const multer = require('multer');
const getData = require('./handler');

const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    cb(null, 'public');
  },
  filename: function (req, file, cb) {
    cb(null, `${req.body.cnic}.jpg`);
  },
});

const upload = multer({storage: storage});

const verifyUserCredentials = (req, res, next) => {
  const {cnic} = req.body;

  let _verify = NadraUserDatabase.filter(value => value.cnic === cnic);

  if (!_verify) {
    return res.status(400).json({message: 'CNIC not found', status: false});
  }

  let usersFilePath = 'Users.json';

  const users = fs.readFileSync(usersFilePath, 'utf8');
  const usersArray = JSON.parse(users);
  console.log(usersArray.length);
  _verify =
    usersArray.length > 0
      ? usersArray.filter(value => value.cnic === cnic)
      : false;
  console.log('Verify: ' + _verify.length);
  if (_verify.length > 0) {
    return res.status(400).json({message: 'User already exist', status: false});
  }

  next();
};

// Sign Up
app.post(
  '/user/signup',
  upload.single('image'),
  verifyUserCredentials,
  (req, res) => {
    const {cnic, password} = req.body;

    const usersArray = getData('./Users.json');

    const newUser = {cnic: cnic, password: password};
    usersArray.push(newUser);
    console.log(usersArray);

    const updatedUsersData = JSON.stringify(usersArray);
    fs.writeFileSync('./Users.json', updatedUsersData);

    return res
      .status(200)
      .json({message: 'Successful Registration', status: true});
  },
);

// Login
app.post('/user/login', (req, res) => {
  const {cnic, password} = req.body;
  const usersArray = getData('Users.json');

  let login = false;
  usersArray.forEach(element => {
    if (element.cnic === cnic && element.password === password) login = true;
  });

  if (!login)
    return res
      .status(400)
      .json({message: 'Authentication Failed', status: false});
  else
    return res
      .status(202)
      .json({message: 'Authentication Successfull', status: true});
});

// getElections
app.get('/elections', (req, res) => {
  const elections = getData('./Elections.json');

  let _election = [];
  elections.forEach(element => {
    if (element.completed === false) {
      _election.push(element.election);
    }
  });

  return res.status(202).json({elections: _election});
});

const isVoteAlreadyCasted = (filePath, userCnic, election) => {
  const voteCasted = getData(filePath);
  if (voteCasted.length === 0) return false;

  let userVoteCasted = voteCasted.filter(
    vote => vote.cnic === userCnic && vote.election === election,
  );
  if (userVoteCasted.length > 0) return true;
  else return false;
};

// user's election
app.post('/user/getelectionparties', (req, res) => {
  const {election, userCnic} = req.body;

  const user = NadraUserDatabase.filter(users => users.cnic === userCnic);
  if (isVoteAlreadyCasted('./Voting.json', userCnic, election))
    return res
      .status(404)
      .json({message: 'Vote already casted.', status: false});

  const elections = getData('./Elections.json');
  let filterElection = elections.filter(
    _election => _election.election === election,
  );

  const electorals = getData('./Electorals.json');

  let electionPartyList = [];

  for (let index = 0; index < filterElection[0].parties.length; index++) {
    let party = filterElection[0].parties[index];
    let _electoral = electorals.filter(elec => elec.abbreviation === party);
    for (let area = 0; area < _electoral[0].areas.length; area++) {
      let location = _electoral[0].areas[area];
      if (location === user[0].area) {
        electionPartyList.push(party);
        break;
      }
    }
  }
  return res
    .status(202)
    .json({electionParties: JSON.stringify(electionPartyList)});
});

// user's vote caste
app.post('/user/vote', async (req, res) => {
  const {userCnic, election, party} = req.body;

  if (isVoteAlreadyCasted('./Voting.json', userCnic, election))
    return res
      .status(404)
      .json({message: 'Vote already casted.', status: false});

  const vote = getData('./Voting.json');

  vote.push({cnic: userCnic, election, party});

  await fs.writeFile('./Voting.json', JSON.stringify(vote));

  return res
    .status(200)
    .json({message: 'Vote Casted Succesfully', status: true});
});

// election parties
app.get('/parties', (req, res) => {
  const parties = getData('./Electorals.json');

  let partiesList = [];

  parties?.forEach(party => {
    partiesList.push(party?.abbreviation);
  });

  return res.status(200).json({partiesList: JSON.stringify(partiesList)});
});

// getPartyDetails
app.get('/parties/:party', (req, res) => {
  const {party} = req.params;
  console.log(party);
  const parties = getData('./Electorals.json');
  const partyData = parties.filter(_party => _party.abbreviation === party);
  return res.status(200).json({party: partyData[0]});
});

app.get('/user/:cnic', (req, res) => {
  const {cnic} = req.params;
  const user = NadraUserDatabase.filter(value => value.cnic === cnic);
  return res.status(200).json({user: JSON.stringify(user)});
});

module.exports = app;
