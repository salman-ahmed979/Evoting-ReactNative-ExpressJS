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

import MatIcons from "react-native-vector-icons/MaterialIcons";

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
          <Tab.Screen
            name="Admin"
            component={AdminPanel}
            options={{
              tabBarIcon: (tabInfo) => {
                return (
                  <MatIcons
                    name="person"
                    size={24}
                    color={tabInfo.focused ? "purple" : "#8e8e93"}
                  />
                );
              },
            }}
          />
          <Tab.Screen
            name="Settings"
            component={Settings}
            options={{
              tabBarIcon: (tabInfo) => {
                return (
                  <MatIcons
                    name="settings"
                    size={24}
                    color={tabInfo.focused ? "purple" : "#8e8e93"}
                  />
                );
              },
            }}
          />
        </Tab.Navigator>
      ) : (
        <Tab.Navigator>
          <Tab.Screen
            name="Election"
            component={Election}
            options={{
              tabBarIcon: (tabInfo) => {
                return (
                  <MatIcons
                    name="verified-user"
                    size={24}
                    color={tabInfo.focused ? "#006600" : "#8e8e93"}
                  />
                );
              },
            }}
          />
          <Tab.Screen
            name="Parties"
            component={ElectoralParty}
            options={{
              tabBarIcon: (tabInfo) => {
                return (
                  <MatIcons
                    name="assistant"
                    size={24}
                    color={tabInfo.focused ? "lightblue" : "#8e8e93"}
                  />
                );
              },
            }}
          />
          <Tab.Screen
            name="Result"
            component={Result}
            options={{
              tabBarIcon: (tabInfo) => {
                return (
                  <MatIcons
                    name="check"
                    size={24}
                    color={tabInfo.focused ? "navy" : "#8e8e93"}
                  />
                );
              },
            }}
          />
          <Tab.Screen
            name="Map"
            component={Map}
            options={{
              tabBarIcon: (tabInfo) => {
                return (
                  <MatIcons
                    name="map"
                    size={24}
                    color={tabInfo.focused ? "#006600" : "#8e8e93"}
                  />
                );
              },
            }}
          />
          <Tab.Screen
            name="Settings"
            component={Settings}
            options={{
              tabBarIcon: (tabInfo) => {
                return (
                  <MatIcons
                    name="settings"
                    size={24}
                    color={tabInfo.focused ? "purple" : "#8e8e93"}
                  />
                );
              },
            }}
          />
        </Tab.Navigator>
      )}
    </>
  );
};

export default Home;
