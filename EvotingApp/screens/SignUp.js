import React, { useState } from "react";
import { View, Text, TextInput, Image, Button, Alert } from "react-native";
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
      const formData = new FormData();
      formData.append("cnic", cnic);
      formData.append("password", password);
      formData.append("image", {
        uri: image,
        type: "image/jpeg",
        name: "user_image.jpg",
      });

      const response = await fetch('http://192.168.0.108:6000/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
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
      }
      else
      {
        Alert.alert("Signup", data.message);
        navigation.goBack();
      }
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>CNIC</Text>
      <TextInput
        style={{ borderColor: "black", borderWidth: 2, borderRadius: 10 }}
        placeholder="8888-888888-8"
        onChangeText={(_cnic) => setCNIC(_cnic)}
        value={cnic}
      />
      <Text>Create Password</Text>
      <TextInput
        style={{ borderColor: "black", borderWidth: 2, borderRadius: 10 }}
        placeholder="******"
        onChangeText={(_password) => setPassword(_password)}
        value={password}
      />
      <Text>Upload Image</Text>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
      <View>
        <Button title="Register" onPress={handleRegister} />
      </View>
    </View>
  );
};

export default SignUp;
