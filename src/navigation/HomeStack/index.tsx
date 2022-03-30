import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from 'react-native';
import { colorList } from '../../config';

import { createStackNavigator } from '@react-navigation/stack';

import Locationhistory from '../../screens/Locationhistory';
import Mapview from '../../screens/Mapview';
import AllLocations from '../../screens/AllLocations';

const HStack = createStackNavigator();

function Dummy({ route }) {
    console.log('printing inside dummy screen');
    console.log(route.params);
    return (
        <View>
            <Text>What is this socary?</Text>
        </View>
    );
}

const HomeStack = () => {
    return (
        <HStack.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerStyle: {
                    backgroundColor: colorList.primary,
                },
                headerTintColor: colorList.secondary,
            }}
        >
            <HStack.Screen
                name="Home"
                component={Locationhistory}
                options={{
                    title: 'Bus Location',
                }}
            />

            <HStack.Screen name="History" component={AllLocations} />
            <HStack.Screen name="Locations" component={Mapview} />
        </HStack.Navigator>
    );
};

export default HomeStack;
