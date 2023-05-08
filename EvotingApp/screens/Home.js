import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Election from './Election';
import ElectoralParty from './ElectoralParty';
import Result from './Result';

const Tab = createBottomTabNavigator();
const ElectionStack = createStackNavigator();
const ElectoralPartyStack = createStackNavigator();
const ResultStack = createStackNavigator();

const ElectionScreen = () => {
  <ElectionStack.Navigator>
    <ElectionStack.Screen name="Election" component={Election} />
  </ElectionStack.Navigator>;
};
const ElectoralPartyScreen = () => {
  <ElectoralPartyStack.Navigator>
    <ElectoralPartyStack.Screen
      name="ElectoralParty"
      component={ElectoralParty}
    />
  </ElectoralPartyStack.Navigator>;
};
const ResultScreen = () => {
  <ResultStack.Navigator>
    <ResultStack.Screen name="Result" component={Result} />
  </ResultStack.Navigator>;
};

const Home = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Election" component={Election} />
      <Tab.Screen name="Parties" component={ElectoralParty} />
      <Tab.Screen name="Result" component={Result} />
    </Tab.Navigator>
  );
};

export default Home;
