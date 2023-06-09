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
    fetch("http://192.168.0.81:6000/election/result", {
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
            backgroundColor: index % 2 === 0 ? "green" : "brown",
            height: 60,
            borderBottomWidth: 3,
            borderBottomColor: "black",
            padding: 8,
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: 10,
          }}
        >
          <View>
            <Text style={{ color: "#ffff", fontSize: 14 }}>
              {item.election}
            </Text>
          </View>
          <View>
            <Text style={{ color: "#ffff", fontSize: 14 }}>
              Winner: {item.winner}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View>
      <Text
        style={{
          fontSize: 25,
          fontWeight: "bold",
          fontStyle: "italic",
          backgroundColor: "navy",
          color: "#ffff",
        }}
      >
        Welcome to Evoting Result
      </Text>
      {!dataFetched ? (
        <View>
          <ActivityIndicator />
        </View>
      ) : result.length === 0 ? (
        <View>
          <Text
            style={{
              marginVertical: 50,
              fontSize: 18,
              fontWeight: "bold",
              fontStyle: "italic",
              backgroundColor: "purple",
              color: "#ffff",
            }}
          >
            No Elections Result Available
          </Text>
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
