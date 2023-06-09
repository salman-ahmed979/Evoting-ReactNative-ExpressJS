import React, { useState } from "react";
import { Button, TextInput, View, Text } from "react-native";
import AuthContext from "./AuthContext";

const Login = ({ navigation }) => {
  const [cnic, setCNIC] = useState(null);
  const [password, setPassword] = useState(null);

  const { login } = React.useContext(AuthContext);

  return (
    <View>
      <Text>Login</Text>
      <View>
        <Text>CNIC</Text>
        <TextInput
          style={{ borderWidth: 3, margin: 7 }}
          placeholder="8888-888888-8"
          onChangeText={(_cnic) => setCNIC(_cnic)}
        />
        <Text>Create Password</Text>
        <TextInput
          style={{ borderWidth: 3, margin: 7 }}
          placeholder="******"
          onChangeText={(_password) => setPassword(_password)}
        />
        <View>
          <View style={{ margin: 10 }}>
            <Button title="Login" onPress={() => login(cnic, password)} />
          </View>
          <View style={{ margin: 10 }}>
            <Button
              title="SignUp"
              onPress={() => navigation.navigate("Signup")}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Login;
