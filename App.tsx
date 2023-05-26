import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screens/Home/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import AddProduct from './screens/Product/AddProduct';
import EditProduct from './screens/Product/EditProduct';
import AddService from './screens/Service/AddService';
import EditService from './screens/Service/EditService';
import Tabs from './screens/Tabs';
import AddSale from './screens/Home/AddSale';
import Sale from './screens/Home/Sale';

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
              name="AddSale"
              component={AddSale}
              options={{title: 'Add Sale'}}
            />
            <Stack.Screen
              name="Sale"
              component={Sale}
              options={{title: 'Sale'}}
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
          <Stack.Screen
            name="AddService"
            component={AddService}
            options={{title: 'Add Service'}}
          />
          <Stack.Screen
            name="EditService"
            component={EditService}
            options={{title: 'Edit Service'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

export default App;

