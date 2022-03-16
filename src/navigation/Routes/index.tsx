import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colorList } from '../../config';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Locationhistory from '../../screens/Locationhistory';
import BusList from '../../screens/BusInputGrid';
const Tab = createBottomTabNavigator();
import MapView from '../../screens/Locationhistory/MapView';
//dummy screens

const About = () => {
    return (
        <MapView
            coords={{
                longitude: 91.969816,
                latitude: 22.4616622,
                accuracy: 90,
                heading: -1,
            }}
        />
    );
};

function Routes() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName="Homescreen"
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName: string = 'Output';

                        if (route.name === 'Input') {
                            iconName = focused ? 'ios-bus' : 'ios-bus-outline';
                        } else if (route.name === 'Homescreen') {
                            iconName = focused
                                ? 'ios-location'
                                : 'ios-location-outline';
                        } else if (route.name === 'About') {
                            iconName = focused
                                ? 'alert-circle'
                                : 'alert-circle-outline';
                        }

                        return (
                            <Ionicons name={iconName} size={30} color={color} />
                        );
                    },

                    tabBarActiveTintColor: colorList.primarySoft,
                    tabBarInactiveTintColor: 'gray',
                    tabBarActiveBackgroundColor: '#FFEDDB',
                    tabBarInactiveBackgroundColor: '#FFEDDB',

                    headerTintColor: colorList.secondary,
                    headerStyle: { backgroundColor: colorList.primary },
                    tabBarShowLabel: false,
                    tabBarStyle: {
                        height: 60,
                        // margin: 20,
                        // position: 'absolute',
                        // bottom: 16,
                        // right: 16,
                        // left: 16,
                        borderRadius: 15,
                    },
                    // tabBarStyle: {
                    //     height: 60,
                    //     position: 'absolute',
                    //     bottom: 0,
                    //     margin: 20,
                    // },
                })}
            >
                <Tab.Screen
                    name="Homescreen"
                    component={Locationhistory}
                    options={{ title: 'Bus Location' }}
                />
                <Tab.Screen
                    name="Input"
                    component={BusList}
                    options={{ title: 'Update Location' }}
                />

                <Tab.Screen
                    name="About"
                    component={About}
                    options={{
                        title: 'About',
                    }}
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
