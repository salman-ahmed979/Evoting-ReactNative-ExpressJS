import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import RadioForm from "react-native-simple-radio-button";
import { ActivityIndicator, Alert, Text, View } from "react-native";

import { Button, RadioButton } from "react-native-paper";

const Vote = ({ route, navigation }) => {
  const [electionParties, setElectionParties] = useState([]);
  const [elections, setElections] = useState("");
  const [vote, setVote] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const { election } = route.params;
    setElections(election);
    console.log(`Elections ${election}`);

    const fetchData = async () => {
      try {
        const cnic = await AsyncStorage.getItem("cnic");
        console.log("cnic is above=============" + cnic);

        const response = await fetch(
          "http://192.168.0.81:6000/user/getelectionparties",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userCnic: cnic,
              election: election,
            }),
          }
        );

        const data = await response.json();
        console.log("Data-------- ", data);
        if (data.status) {
          const value = JSON.parse(data.electionParties);
          console.log(value);
          setElectionParties([...value]);
          console.log(electionParties);
        }
      } catch (err) {
        console.error(err);
      } finally {
        console.log("Loading finished");
        setIsLoading(true);
      }
    };

    fetchData();
  }, []);

  const radioItems = electionParties.map((value, index) => {
    return <RadioButton.Item key={index} label={value} value={value} />;
  });

  const handleRadioPress = (value) => setVote(value);

  const handleVotePress = async () => {
    const cnic = await AsyncStorage.getItem("cnic");
    const response = await fetch("http://192.168.0.81:6000/user/vote", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userCnic: cnic,
        election: elections,
        party: vote,
      }),
    });

    const data = await response.json();

    Alert.alert("Vote Cast", data.message);
    navigation.goBack();
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
        Welcome to Evoting - Vote Now
      </Text>
      {!isLoading ? (
        <View>
          <ActivityIndicator />
        </View>
      ) : electionParties.length === 0 ? (
        <View>
          <Text
            style={{
              marginVertical: 40,
              fontSize: 18,
              fontWeight: "bold",
              fontStyle: "italic",
              backgroundColor: "purple",
              color: "#ffff",
            }}
          >
            Vote Already Casted
          </Text>
        </View>
      ) : (
        <View>
          <View
            style={{
              borderWidth: 2,
              marginVertical: 30,
              backgroundColor: "#d6ccde",
            }}
          >
            <RadioButton.Group onValueChange={handleRadioPress} value={vote}>
              <View>{radioItems}</View>
            </RadioButton.Group>
          </View>
          <View>
            <Button mode="contained" onPress={handleVotePress}>
              Vote Caste
            </Button>
          </View>
        </View>
      )}
    </View>
  );
};

export default Vote;
