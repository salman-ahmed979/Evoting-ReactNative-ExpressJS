import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Login from "./Login";
import axios from "axios";
import SignUp from "./SignUp";
import Home from "./Home";
import { Alert, Button } from "react-native";
import AuthContext from "./AuthContext";
import Result from "./Result";
import Election from "./Election";
import ElectoralParty from "./ElectoralParty";
import Vote from "./Vote";
import ElectoralPartyDetails from "./ElectoralPartyDetails";
import Map from "./Map";

import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useRef, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import AdminPanel from "./AdminPanel";
import Settings from "./Settings";

const Stack = createStackNavigator();
const AuthStack = createStackNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// Can use this function below OR use Expo's Push Notification Tool from: https://expo.dev/notifications
async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: "default",
    title: "Original Title",
    body: "And here is the body!",
    data: { someData: "goes here" },
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}

const StackNav = () => {
  const [userToken, setUserToken] = useState(null);

  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const nav = useNavigation();

  useEffect(() => {
    registerForPushNotificationsAsync().then(async (token) => {
      setExpoPushToken(token);
      await AsyncStorage.setItem("expoToken", token);
    });

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
        nav.navigate("Result");
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const authContext = React.useMemo(() => {
    return {
      login: (cnic, password) => {
        console.log("user-----", cnic, password);
        AsyncStorage.getItem("expoToken").then((token) => {
          fetch("http://192.168.0.108:6000/user/login", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              cnic: cnic,
              password: password,
              expoToken: token,
            }),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              if (data.status) {
                AsyncStorage.setItem("cnic", cnic).then(() =>
                  console.log("CNIC saved in Storage")
                );
                AsyncStorage.setItem("isAdmin", data.isAdmin.toString()).then(() =>
                  console.log("IsAdmin ", data.isAdmin)
                );
                setUserToken("null");
              } else {
                Alert.alert("Login Failed", data.message);
              }
            })
            .catch((err) => console.error(err));
        });
      },
      logout: () => {
        setUserToken(null);
      },
    };
  }, []);

  return (
    <>
      <AuthContext.Provider value={authContext}>
        {/* <NavigationContainer> */}
        {userToken ? (
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Admin" component={AdminPanel} />
            <Stack.Screen name="Result" component={Result} />
            <Stack.Screen name="Election" component={Election} />
            <Stack.Screen name="Vote" component={Vote} />
            <Stack.Screen name="Parties" component={ElectoralParty} />
            <Stack.Screen
              name="PartyDetails"
              component={ElectoralPartyDetails}
            />
            <Stack.Screen
              name="Map"
              component={Map}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Settings" component={Settings} />
          </Stack.Navigator>
        ) : (
          <AuthStack.Navigator>
            <AuthStack.Screen name="Login" component={Login} />
            <AuthStack.Screen name="Signup" component={SignUp} />
          </AuthStack.Navigator>
        )}
        {/* </NavigationContainer> */}
      </AuthContext.Provider>
    </>
  );
};

export default StackNav;
