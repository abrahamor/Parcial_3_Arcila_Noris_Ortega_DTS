import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './Home//HomeScreen';
import FontAwesome  from '@expo/vector-icons/FontAwesome';
import ProductScreen from './Product/ProductScreen';
import ServiceScreen from './Service/ServiceScreen';
import { NavigationScreenProp } from 'react-navigation';

const Tab = createBottomTabNavigator();
interface HomeNavigation {
  navigation: NavigationScreenProp<any, any>;
}
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function Tabs({navigation}: HomeNavigation) {
  return (
    <Tab.Navigator
        initialRouteName="Ventas"
        screenOptions={{
        tabBarActiveTintColor: '#2d76cf',
      }}>
        <Tab.Screen name="Sales" component={HomeScreen} options={{
          tabBarLabel: 'Sales',
          tabBarIcon: ({ color }) => <TabBarIcon name="bank" color={'#DE4726'} />,
          
        }}/>
        <Tab.Screen 
            name="Products" 
            component={ProductScreen}
            options={{
                tabBarLabel: 'Products',
                tabBarIcon: ({ color }) => <TabBarIcon name="list" color={'#DE4726'} />,
                headerRight: () => (
                  <FontAwesome name="plus" color={'#DE4726'} size={25} style={{margin:10}} onPress = {() => navigation.navigate("AddProduct")} />
                )
              }} 
        />
        <Tab.Screen 
            name="Services" 
            component={ServiceScreen} 
            options={{
                tabBarLabel: 'Services',
                tabBarIcon: ({ color }) => <TabBarIcon name="life-ring" color={'#DE4726'} />,
              }}    
        />
    </Tab.Navigator>

  );
}
