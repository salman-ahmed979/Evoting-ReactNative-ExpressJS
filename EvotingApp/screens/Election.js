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

const Election = ({ navigation }) => {
  const [elections, setElections] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    fetch("http://192.168.0.81:6000/elections", {
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
          setElections(data.elections);
        }
        setDataFetched(true);
      })
      .catch((err) => console.error(err));
  }, []);
  const displayElections = (itemObject) => {
    const { index, item } = itemObject;
    console.log("023i2");
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Vote", {
            election: item,
          });
        }}
      >
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
          <Text style={{ color: "white", fontSize: 17 }}>{item}</Text>
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
        Welcome to Evoting
      </Text>
      {!dataFetched ? (
        <View>
          <ActivityIndicator />
        </View>
      ) : elections.length === 0 ? (
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
            No Elections Available
          </Text>
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
