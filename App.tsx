import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screens/Home/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import AddProduct from './screens/Product/AddProduct';
import EditProduct from './screens/Product/EditProduct';
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
          <Stack.Screen
            name="AddProduct"
            component={AddProduct}
            options={{title: 'Add Product'}}
          />
          <Stack.Screen
            name="EditProduct"
            component={EditProduct}
            options={{title: 'Edit User'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

export default App;

