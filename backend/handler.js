const fs = require('fs');

const getData = filePath => {
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
};

module.exports = getData;
