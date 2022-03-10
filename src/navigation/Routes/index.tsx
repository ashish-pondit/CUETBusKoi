import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import colorlist from '../../config/colorlist';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Locationhistory from '../../screens/Locationhistory';
const Tab = createBottomTabNavigator();

// function HomeScreen({navigation}) {
//   // console.log(navigation);
//   return (
//     <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//       <Text>Test Home Screen</Text>
//     </View>
//   );
// }

function OutputPage() {
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

            // You can return any component that you like here!
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
          component={OutputPage}
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
