import { useEffect, useState } from "react";
import {
  ActivityIndicator,
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
    fetch("http://192.168.0.108:6000/elections", {
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
    const response = await fetch("http://192.168.0.108:6000/admin/result", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ election: item }),
    });
    const data = await response.json();
    console.log("Notifications Send ----- ",data);
    setElections(elec);
};

  const displayElections = (itemObject) => {
    const { index, item } = itemObject;
    return (
      <TouchableOpacity>
        <View
          style={{ height: 80, borderWidth: 2, backgroundColor: "lightblue" }}
        >
          <Text>{item}</Text>
          <Button onPress={() => handleResult(item)}>Generate Result</Button>
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

export default AdminPanel;
