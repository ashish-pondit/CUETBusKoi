import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
const Tab = createBottomTabNavigator();

function HomeScreen({navigation}) {
  // console.log(navigation);
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Test Home Screen</Text>
    </View>
  );
}

function OutputPage() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Test Output page</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function Routes() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName: string = 'Home';

            if (route.name === 'Home') {
              iconName = focused ? 'ios-bus' : 'ios-bus-outline';
            } else if (route.name === 'Output') {
              iconName = focused ? 'ios-location' : 'ios-location-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          // options={{
          //   tabBarIcon: ({focused}) => {
          //     // You can return any component that you like here
          //     return <Ionicons name="ios-list" size={25} />;
          //   },
          // }}
        />
        <Tab.Screen name="Output" component={OutputPage} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  continer: {
    flex: 1,
  },
});

export default Routes;
