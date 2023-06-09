import { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

const ElectoralParty = ({ route, navigation }) => {
  const [parties, setParties] = useState([]);

  const fetchData = async () => {
    const response = await fetch("http://192.168.0.81:6000/parties", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
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

  const displayParties = (itemObject) => {
    const { index, item } = itemObject;
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("PartyDetails", {
            party: item,
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
        Electoral Parties in Elections
      </Text>
      <View style={{ marginVertical: 20 }}>
        <FlatList data={parties} renderItem={displayParties} />
      </View>
    </View>
  );
};

export default ElectoralParty;
