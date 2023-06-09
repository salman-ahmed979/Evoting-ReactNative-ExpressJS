import React, { useState } from "react";
import { View, Text, Alert } from "react-native";
import { Button, TextInput } from "react-native-paper";
import AuthContext from "./AuthContext";

const Login = ({ navigation }) => {
  const [cnic, setCNIC] = useState(null);
  const [password, setPassword] = useState(null);

  const { login } = React.useContext(AuthContext);
  const handleLogin = () => {
    if (cnic === null || password === null) {
      Alert.alert("Login Error", "Fields are empty");
    } else {
      login(cnic, password);
    }
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
        Enter Your Login Credentials
      </Text>
      <View>
        <Text
          style={{
            marginVertical: 8,
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          CNIC
        </Text>
        <TextInput
          placeholder="8888-888888-8"
          value={cnic}
          onChangeText={(_cnic) => setCNIC(_cnic)}
        />
        <Text
          style={{
            marginVertical: 8,
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          Password
        </Text>
        <TextInput
          placeholder="******"
          value={password}
          onChangeText={(_password) => setPassword(_password)}
        />
        <View>
          <View style={{ margin: 20, marginTop: 40 }}>
            <Button icon="login" mode="contained" onPress={handleLogin}>
              Login
            </Button>
          </View>
          <View style={{ margin: 20 }}>
            <Button
              icon="account-check-outline"
              mode="contained"
              onPress={() => navigation.navigate("Signup")}
            >
              SignUp
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Login;
