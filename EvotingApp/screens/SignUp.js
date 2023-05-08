import React, {useState} from 'react';
import {View, Text, TextInput, Image, Button} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const SignUp = ({navigation}) => {
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

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>CNIC</Text>
      <TextInput
        placeholder="8888-888888-8"
        onChangeText={_cnic => setCNIC(_cnic)}
      />
      <Text>Create Password</Text>
      <TextInput
        placeholder="******"
        onChangeText={_password => setPassword(_password)}
      />
      <Text>Upload Image</Text>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && (
        <Image source={{uri: image}} style={{width: 200, height: 200}} />
      )}
      <View>
        <Button
          title="Register"
          onPress={() => {
            navigation.goBack();
          }}
        />
      </View>
    </View>
  );
};

export default SignUp;
