import * as React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colorList } from '../../config';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BusList from '../../screens/BusInputGrid';
const Tab = createBottomTabNavigator();
import About from '../../screens/About';
import Firebase from '../../config';
import { getDatabase, get, ref, child } from 'firebase/database';
import Wrongpage from '../../screens/Wrongpage';
import Loadingpage from '../../component/Loadingpage';

import NetInfo from '@react-native-community/netinfo';
import HomeStack from '../HomeStack';

function Routes() {
    const [noInternet, setNotInternet] = React.useState(false);
    const [schedule, setschedule] = React.useState({
        ack: 0,
        nextSchedule: { start: 0, end: 0 },
    });
    const [inSchedule, setInSchedule] = React.useState(false);

    var daynum = new Date().getDay();
    var dayhour = new Date().getHours();

    var saturday = null;
    var weekday = null;
    //function to check bus schedule
    function check_schedule() {
        console.log('printing info');
        console.log('daynum : ', daynum);
        console.log('dayhour :', dayhour);
        if (daynum in [1, 2, 3, 4, 7]) {
            for (let i = 0; i < weekday.length; i++) {
                console.log('checking ');
                console.log(dayhour, weekday[i]['start'], weekday[i]['end']);
                if (
                    dayhour >= weekday[i]['start'] &&
                    dayhour <= weekday[i]['end']
                ) {
                    setInSchedule(true);
                    setschedule({
                        ack: 1,
                        nextSchedule: {
                            start: weekday[i]['start'],
                            end: weekday[i]['end'],
                        },
                    });
                    break;
                } else if (dayhour < weekday[i]['start']) {
                    setInSchedule(false);
                    setschedule({
                        ack: 1,
                        nextSchedule: {
                            start: weekday[i]['start'],
                            end: weekday[i]['end'],
                        },
                    });
                    break;
                }
            }
        } else if (daynum === 6) {
            for (let i = 0; i < saturday.length; i++) {
                console.log('checking ');
                console.log(dayhour, saturday[i]['start'], saturday[i]['end']);
                if (
                    dayhour >= saturday[i]['start'] &&
                    dayhour <= saturday[i]['end']
                ) {
                    setInSchedule(true);
                    setschedule({
                        ack: 1,
                        nextSchedule: {
                            start: saturday[i]['start'],
                            end: saturday[i]['end'],
                        },
                    });
                } else if (dayhour < saturday[i]['start']) {
                    setInSchedule(false);
                    setschedule({
                        ack: 0,
                        nextSchedule: {
                            start: saturday[i]['start'],
                            end: saturday[i]['end'],
                        },
                    });
                }
            }
        }
    }

    React.useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setNotInternet(!state.isConnected);
        });
        return () => unsubscribe();
    });

    React.useEffect(() => {
        get(child(ref(getDatabase(Firebase)), 'schedule/'))
            .then(snapshot => {
                var data = snapshot.val();

                console.log('getting data from firebase');
                console.log(data);
                // console.log(JSON.parse(data));
                console.log(data['saturday']);
                // console.log(JSON.parse(data['saturday']));
                saturday = JSON.parse(data['saturday']);
                weekday = JSON.parse(data['weekday']);

                check_schedule();
            })
            .catch(function (error) {
                console.error('Can not connect to firebase');
            });
        console.log('checking schedule again');
        console.log(schedule);
    }, [noInternet]);

    console.log('checking schedule ');
    console.log(schedule);
    // console.log('week day is: ', daydata);

    return (
        <NavigationContainer>
            <View style={styles.warnBox}>
                {noInternet ? (
                    <Text style={styles.infoStyle}>
                        Please Turn on Wifi or Mobile Data
                    </Text>
                ) : null}
            </View>
            {schedule['ack'] === 1 ? (
                <Tab.Navigator
                    initialRouteName="Homescreen"
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                            let iconName: string = 'Output';

                            if (route.name === 'Input') {
                                iconName = focused
                                    ? 'ios-bus'
                                    : 'ios-bus-outline';
                            } else if (route.name === 'Homescreen') {
                                iconName = focused
                                    ? 'ios-location'
                                    : 'ios-location-outline';
                            } else if (route.name === 'About') {
                                iconName = focused
                                    ? 'alert-circle'
                                    : 'alert-circle-outline';
                            } else if (route.name === 'Wrong') {
                                iconName = focused
                                    ? 'calendar'
                                    : 'calendar-outline';
                            }

                            return (
                                <Ionicons
                                    name={iconName}
                                    size={30}
                                    color={color}
                                />
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
                    {inSchedule ? (
                        <>
                            <Tab.Screen
                                name="Homescreen"
                                component={HomeStack}
                                options={{
                                    title: 'Bus Location',
                                    headerShown: false,
                                }}
                            />
                            <Tab.Screen
                                name="Input"
                                component={BusList}
                                options={{ title: 'Update Location' }}
                            />
                        </>
                    ) : (
                        <Tab.Screen
                            name="Wrong"
                            component={Wrongpage}
                            options={{ title: 'unscheduled time' }}
                            initialParams={schedule}
                        />
                    )}

                    <Tab.Screen
                        name="About"
                        component={About}
                        options={{
                            title: 'About',
                        }}
                    />
                </Tab.Navigator>
            ) : (
                <Loadingpage />
            )}
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    continer: {
        flex: 1,
    },

    infoStyle: {
        alignSelf: 'center',
        fontSize: 15,
        color: 'black',
        fontWeight: 'bold',
    },
    warnBox: {
        backgroundColor: 'red',
    },
});

export default Routes;
