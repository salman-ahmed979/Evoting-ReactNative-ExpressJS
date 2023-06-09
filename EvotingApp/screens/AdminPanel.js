import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "react-native-paper";

const AdminPanel = ({ navigation }) => {
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

  const handleResult = async (item) => {
    let elec = elections;
    elec.splice(elec.indexOf(item), 1);
    const response = await fetch("http://192.168.0.81:6000/admin/result", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ election: item }),
    });
    const data = await response.json();
    console.log("Notifications Send ----- ", data);

    Alert.alert("Election Result", `${item} Result Announced to users`, [
      {
        text: "OK",
        onPress: async () => {
          const res = await fetch("http://192.168.0.81:6000/elections", {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          });
          const d = await res.json();
          setElections(d.elections);
        },
      },
    ]);
  };

  const displayElections = (itemObject) => {
    const { index, item } = itemObject;
    return (
      <TouchableOpacity>
        <View
          style={{
            backgroundColor: index % 2 === 0 ? "green" : "brown",
            height: 100,
            borderBottomWidth: 3,
            borderBottomColor: "black",
            padding: 8,
            flexDirection: "column",
            justifyContent: "space-between",
            marginVertical: 10,
          }}
        >
          <Text style={{ color: "#ffff", fontSize: 17 }}>{item}</Text>
          <Button
            icon="check"
            mode="contained"
            style={{ marginHorizontal: 70, marginTop: 8 }}
            onPress={() => handleResult(item)}
          >
            Generate Result
          </Button>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View>
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          fontStyle: "italic",
          backgroundColor: "navy",
          color: "#ffff",
        }}
      >
        Welcome to Evoting - Admin Panel
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

export default AdminPanel;
