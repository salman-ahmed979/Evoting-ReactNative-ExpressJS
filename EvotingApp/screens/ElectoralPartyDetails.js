import {useEffect, useState} from 'react';
import {FlatList, Text, View} from 'react-native';

const ElectoralPartyDetails = ({route, navigation}) => {
  const [party, setParty] = useState({});

  const fetchData = async party => {
    const response = await fetch(`http://192.168.0.108:6000/parties/${party}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    let partiesDetails = data.party;

    setParty(partiesDetails);
  };
  useEffect(() => {
    let {party} = route.params;
    navigation.setOptions({headerTitle: `${party}`});
    fetchData(party);
  }, []);

  const displayPartyAreas = itemObject => {
    const {index, item} = itemObject;
    return (
      <View>
        <Text>{item}</Text>
      </View>
    );
  };

  return (
    <View>
      <Text>Electoral Parties in Elections</Text>
      <View>
        <View>
          <Text>Party: {party.party}</Text>
        </View>
        <View>
          <Text>About: {party.description}</Text>
        </View>
        <View>
          <Text>Voting Areas</Text>
        </View>
        <View>
          <FlatList data={party.areas} renderItem={displayPartyAreas} />
        </View>
      </View>
    </View>
  );
};

export default ElectoralPartyDetails;
