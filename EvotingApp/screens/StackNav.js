import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './Login';
import SignUp from './SignUp';
import Home from './Home';
import {ActivityIndicator} from 'react-native/types';
import AuthContext from './AuthContext';
import Result from './Result';
import Election from './Election';
import ElectoralParty from './ElectoralParty';

const Stack = createStackNavigator();
const AuthStack = createStackNavigator();

const StackNav = () => {
  const [userToken, setUserToken] = useState(null);

  const authContext = React.useMemo(() => {
    return {
      login: () => {
        setUserToken('null');
      },
      signUp: () => {
        setUserToken('null');
      },
    };
  }, []);
  return (
    <>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          {userToken ? (
            <Stack.Navigator>
              <Stack.Screen
                name="Home"
                component={Home}
                options={{headerShown: false}}
              />
              <Stack.Screen name="Result" component={Result} />
              <Stack.Screen name="Election" component={Election} />
              <Stack.Screen name="Parties" component={ElectoralParty} />
            </Stack.Navigator>
          ) : (
            <AuthStack.Navigator>
              <AuthStack.Screen name="Login" component={Login} />
              <AuthStack.Screen name="Signup" component={SignUp} />
            </AuthStack.Navigator>
          )}
        </NavigationContainer>
      </AuthContext.Provider>
    </>
  );
};

export default StackNav;
