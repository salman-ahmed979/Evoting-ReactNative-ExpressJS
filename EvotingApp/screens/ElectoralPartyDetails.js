import { useEffect, useState } from "react";
import { FlatList, SafeAreaView, ScrollView, Text, View } from "react-native";

const ElectoralPartyDetails = ({ route, navigation }) => {
  const [party, setParty] = useState({});

  const fetchData = async (party) => {
    const response = await fetch(`http://192.168.0.81:6000/parties/${party}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    let partiesDetails = data.party;

    setParty(partiesDetails);
  };
  useEffect(() => {
    console.log("here");
    let { party } = route.params;
    navigation.setOptions({ headerTitle: `${party}` });
    fetchData(party);
  }, []);

  const displayPartyAreas = (itemObject) => {
    const { index, item } = itemObject;
    return (
      <View
        style={{
          borderWidth: 3,
          margin: 8,
          padding: 3,
          backgroundColor: "#7c3aab",
        }}
      >
        <Text style={{ color: "#ffff" }}>{item}</Text>
      </View>
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
      <View>
        <View style={{ marginVertical: 16, backgroundColor: "lightblue" }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            {party.party}
          </Text>
        </View>
        <View style={{ marginVertical: 16, backgroundColor: "lightgreen" }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            {party.description}
          </Text>
        </View>
        <View style={{ marginVertical: 16, backgroundColor: "brown" }}>
          <Text style={{ fontSize: 15, fontWeight: "bold", color: "#ffff" }}>
            Voting Areas
          </Text>
        </View>
        <View>
          <FlatList data={party.areas} renderItem={displayPartyAreas} />
        </View>
      </View>
    </View>
  );
};

export default ElectoralPartyDetails;
