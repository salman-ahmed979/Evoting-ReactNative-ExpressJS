import { useEffect, useState } from "react";
import axios from "axios";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Result = ({ navigation }) => {
  const [result, setResult] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    fetch("http://192.168.0.108:6000/election/result", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data) {
          setResult(JSON.parse(data.result));
        }
        setDataFetched(true);
      })
      .catch((err) => console.error(err));
  }, []);
  const displayResult = (itemObject) => {
    const { index, item } = itemObject;
    return (
      <TouchableOpacity>
        <View
          style={{
            borderWidth: 1,
            flex: 1,
            height: 50,
            backgroundColor: "lightpink",
          }}
        >
          <View>
            <Text>{item.election}</Text>
          </View>
          <View>
            <Text>Winner: {item.winner}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View>
      <Text>Welcome to Evoting Result</Text>
      {!dataFetched ? (
        <View>
          <ActivityIndicator />
        </View>
      ) : result.length === 0 ? (
        <View>
          <Text>No Elections Result Available</Text>
        </View>
      ) : (
        <View>
          <FlatList data={result} renderItem={displayResult} />
        </View>
      )}
    </View>
  );
};

export default Result;
