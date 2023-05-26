import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screens/Home/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import Tabs from './screens/Tabs';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {

  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{title: 'Login'}}
          />
          <Stack.Screen
            name="Tabs"
            component={Tabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Sales"
            component={HomeScreen}
            options={{title: 'Sales'}}
          />

        </Stack.Navigator>
      </NavigationContainer>
  );
}

export default App;

