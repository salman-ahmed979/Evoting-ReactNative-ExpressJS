import {useEffect, useState} from 'react';
import axios from 'axios';
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Election = ({navigation}) => {
  const [elections, setElections] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    fetch('http://192.168.0.108:6000/elections', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data) {
          setElections(data.elections);
        }
        setDataFetched(true);
      })
      .catch(err => console.error(err));
  }, []);
  const displayElections = itemObject => {
    const {index, item} = itemObject;
    console.log("023i2")
    return (
      <TouchableOpacity>
        <View>
          <Text
            onPress={() => {
              navigation.navigate('Vote', {
                election: item,
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
      <Text>Welcome to Evoting</Text>
      {!dataFetched ? (
        <View>
          <ActivityIndicator />
        </View>
      ) : elections.length === 0 ? (
        <View>
          <Text>No Elections Available</Text>
        </View>
      ) : (
        <View>
          <FlatList data={elections} renderItem={displayElections} />
        </View>
      )}
    </View>
  );
};

export default Election;
