import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  ActivityIndicator,
  Button,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
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
      <Text>Welcome to Settings Tab</Text>
      {!dataFetched ? (
        <View>
          <ActivityIndicator />
        </View>
      ) : (
        <View>
          <View>
            <Text>CNIC: {cnic}</Text>
          </View>
          {isAdmin === "false" && (
            <View>
              <Image
                source={{ uri: `http://192.168.0.108:6000/images/${cnic}.jpg` }}
                style={{ width: 200, height: 200 }}
              />
            </View>
          )}

          <View>
            <Button title="Logout" onPress={logout} />
          </View>
        </View>
      )}
    </View>
  );
};

export default Settings;
