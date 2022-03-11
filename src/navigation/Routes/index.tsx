import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import colorlist from '../../config/colorlist';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Locationhistory from '../../screens/Locationhistory';
const Tab = createBottomTabNavigator();

// dummary update location screen
function UpdateLocation() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Test update location page</Text>
    </View>
  );
}

function Routes() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Homescreen"
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName: string = 'Output';

            if (route.name === 'Input') {
              iconName = focused ? 'ios-bus' : 'ios-bus-outline';
            } else if (route.name === 'Homescreen') {
              iconName = focused ? 'ios-location' : 'ios-location-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: colorlist.primarySoft,
          tabBarInactiveTintColor: 'gray',
        })}>
        <Tab.Screen
          name="Homescreen"
          component={Locationhistory}
          options={{title: 'Bus Location'}}
        />
        <Tab.Screen
          name="Input"
          component={UpdateLocation}
          options={{title: 'Update Location'}}
        />
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
