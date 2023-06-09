import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthContext from "./AuthContext";

const Settings = ({ navigation }) => {
  const { logout } = React.useContext(AuthContext);
  const [cnic, setCNIC] = useState("");
  const [isAdmin, setIsAdmin] = useState("false");

  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    const fun = async () => {
      let cnic = await AsyncStorage.getItem("cnic");
      let isAdmin = await AsyncStorage.getItem("isAdmin");
      setIsAdmin(isAdmin);
      setCNIC(cnic);
      setDataFetched(true);
    };
    fun();
  }, []);
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
        Welcome to Settings Tab
      </Text>
      {!dataFetched ? (
        <View>
          <ActivityIndicator />
        </View>
      ) : (
        <View>
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
              CNIC: {cnic}
            </Text>
          </View>
          {isAdmin === "false" && (
            <View>
              <Image
                source={{ uri: `http://192.168.0.81:6000/images/${cnic}.jpg` }}
                style={{
                  margin: 20,
                  alignSelf: "center",
                  width: 200,
                  height: 150,
                  borderRadius: 10,
                }}
              />
            </View>
          )}

          <View>
            <Button
              style={{ padding: 3 }}
              mode="contained"
              icon="logout"
              onPress={logout}
            >
              Logout
            </Button>
          </View>
        </View>
      )}
    </View>
  );
};

export default Settings;
