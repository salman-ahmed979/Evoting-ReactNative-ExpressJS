import React, { useState } from "react";
import { View, Text, Image, Alert } from "react-native";
import { Button, TextInput } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

const SignUp = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [cnic, setCNIC] = useState(null);
  const [password, setPassword] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
      allowsEditing: false,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      console.log(result.assets[0]);
    }
  };
  const handleRegister = async () => {
    try {
      if (cnic === null || password === null || image === null) {
        Alert.alert("Signup Error", "Fields are empty");
      } else {
        const formData = new FormData();
        formData.append("cnic", cnic);
        formData.append("password", password);
        formData.append("image", {
          uri: image,
          type: "image/jpeg",
          name: "user_image.jpg",
        });

        const response = await fetch("http://192.168.0.81:6000/user/signup", {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          body: formData,
        });

        const data = await response.json();

        console.log("Registration response:", data);

        if (!data?.status) {
          Alert.alert("Signup", data.message);
          setCNIC(null);
          setPassword(null);
          setImage(null);
        } else {
          Alert.alert("Signup", data.message);
          navigation.goBack();
        }
      }
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Text
        style={{
          marginVertical: 8,
          fontSize: 18,
          fontWeight: "bold",
        }}
      >
        Enter CNIC
      </Text>
      <TextInput
        placeholder="8888-888888-8"
        onChangeText={(_cnic) => setCNIC(_cnic)}
        value={cnic}
      />
      <Text
        style={{
          marginVertical: 8,
          marginTop: 10,
          fontSize: 18,
          fontWeight: "bold",
        }}
      >
        Create Password
      </Text>
      <TextInput
        placeholder="******"
        onChangeText={(_password) => setPassword(_password)}
        value={password}
      />
      <Text
        style={{
          marginVertical: 8,
          marginTop: 20,
          fontSize: 18,
          fontWeight: "bold",
        }}
      >
        Upload Image
      </Text>
      <Button
        style={{ marginVertical: 10, marginHorizontal: 5, padding: 3 }}
        icon="camera-burst"
        mode="contained"
        onPress={pickImage}
      >
        Pick an image from camera gallery
      </Button>
      {image && (
        <Image
          source={{ uri: image }}
          style={{
            margin: 20,
            alignSelf: "center",
            width: 200,
            height: 150,
            borderRadius: 10,
          }}
        />
      )}
      <View>
        <Button
          style={{ padding: 3 }}
          mode="contained"
          icon="check"
          onPress={handleRegister}
        >
          Register
        </Button>
      </View>
    </View>
  );
};

export default SignUp;
