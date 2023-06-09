import {useEffect, useState} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';

const ElectoralParty = ({route, navigation}) => {
  const [parties, setParties] = useState([]);

  const fetchData = async () => {
    const response = await fetch('http://192.168.0.108:6000/parties', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    let _parties = JSON.parse(data.partiesList);
    if (_parties?.length === 0) return;

    setParties([..._parties]);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const displayParties = itemObject => {
    const {index, item} = itemObject;
    return (
      <TouchableOpacity>
        <View>
          <Text
            onPress={() => {
              navigation.navigate('PartyDetails', {
                party: item,
              });
            }}>
            {item}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <Text>Electoral Parties in Elections</Text>
      <View>
        <FlatList data={parties} renderItem={displayParties} />
      </View>
    </View>
  );
};

export default ElectoralParty;
