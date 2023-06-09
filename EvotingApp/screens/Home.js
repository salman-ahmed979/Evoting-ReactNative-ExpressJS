import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Election from "./Election";
import ElectoralParty from "./ElectoralParty";
import Result from "./Result";
import Map from "./Map";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AdminPanel from "./AdminPanel";
import Settings from "./Settings";

const Tab = createBottomTabNavigator();

const Home = () => {
  const [isAdmin, setIsAdmin] = useState("false");

  useEffect(() => {
    const func = async () => {
      let admin = await AsyncStorage.getItem("isAdmin");
      setIsAdmin(admin);
    };
    func();
  }, []);
  return (
    <>
      {isAdmin === "true" ? (
        <Tab.Navigator>
          <Tab.Screen name="Admin" component={AdminPanel} />
          <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
      ) : (
        <Tab.Navigator>
          <Tab.Screen name="Election" component={Election} />
          <Tab.Screen name="Parties" component={ElectoralParty} />
          <Tab.Screen name="Result" component={Result} />
          <Tab.Screen name="Map" component={Map} />
          <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
      )}
    </>
  );
};

export default Home;
