import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    StyleSheet,
    View,
    SafeAreaView,
    Text,
    Linking,
    FlatList,
    Platform,
    TouchableOpacity,
    ImageBackground,
    Alert,
} from 'react-native';
import RNDisableBatteryOptimizationsAndroid from 'react-native-disable-battery-optimizations-android';
import NetInfo from '@react-native-community/netinfo';
import { useDeviceOrientation } from '@react-native-community/hooks';
import BusButton from '../../component/BusButton';
import { busData } from '../../data/busList.json';
import { fontConfig, colorList, spacing } from '../../config';
import { child, get, getDatabase, ref, set } from 'firebase/database';
import { getUniqueId } from 'react-native-device-info';
import Geolocation from 'react-native-geolocation-service';
import { hasLocationPermission } from './locationManager';
import BackgroundJob from 'react-native-background-actions';
import { getBackgroundConfig } from '../../config';
import Firebase from '../../config';
//import MapView from './MapView';
BackgroundJob.on('expiration', () => {
    console.log('iOS: I am being closed!');
});

Linking.addEventListener('url', handleOpenURL);
function handleOpenURL(evt: any) {
    // Will be called when the notification is pressed
}

function initLocationsArray() {
    var temp = new Array();
    var data = {
        latitude: 0,
        longitude: 0,
        timestamp: 0,
    };
    for (var i = 0; i < 10; i = i + 1) {
        temp.push(data);
    }
    return temp;
}

const BusList = () => {
    const { landscape } = useDeviceOrientation();
    const [observing, setObserving] = useState(false);
    const [busName, setBusName] = useState<string>();
    const watchId = useRef<number | null>(null);
    var forceLocation = true,
        highAccuracy = true,
        locationDialog = true,
        significantChanges = false,
        useLocationManager = false;
    var selectedBusName: string = '';
    var interval = 30000,
        fastestInterval = 25000;
    get(child(ref(getDatabase(Firebase)), 'constants/')).then(snapshot => {
        var data = snapshot.val();
        interval = data['interval'];
        fastestInterval = data['fastestInterval'];
    });
    const locationsArray = initLocationsArray();

    const toggleBackground = async (name: string) => {
        var playing = BackgroundJob.isRunning();
        playing = !playing;
        if (playing) {
            try {
                console.log('Trying to start background service');
                var options = getBackgroundConfig(name);
                await BackgroundJob.start(getLocationUpdates, options);
                console.log('Successful start!');
            } catch (e) {
                console.log('Error', e);
            }
        } else {
            console.log('Stop background service');
            removeLocationUpdates();
            await BackgroundJob.stop();
        }
    };
    const removeLocationUpdates = useCallback(() => {
        if (watchId.current !== null) {
            Geolocation.clearWatch(watchId.current);
            watchId.current = null;
            setObserving(false);
        }
    }, []);

    useEffect(() => {
        return () => {
            removeLocationUpdates();
        };
    }, [removeLocationUpdates]);

    const getLocationUpdates = async () => {
        if (Platform.OS === 'ios') {
            console.warn(
                'This task will not keep your app alive in the background by itself, use other library like react-native-track-player that use audio,',
                'geolocalization, etc. to keep your app alive in the background while you excute the JS from this library.',
            );
        }
        const hasPermission = await hasLocationPermission();

        if (!hasPermission) {
            return;
        }
        setObserving(true);

        await new Promise(async resolve => {
            watchId.current = Geolocation.watchPosition(
                position => {
                    storeLocation(position);
                },
                error => {
                    console.log(error);
                },
                {
                    accuracy: {
                        android: 'high',
                        ios: 'best',
                    },
                    enableHighAccuracy: highAccuracy,
                    distanceFilter: 0,
                    interval: interval,
                    fastestInterval: fastestInterval,
                    forceRequestLocation: forceLocation,
                    forceLocationManager: useLocationManager,
                    showLocationDialog: locationDialog,
                    useSignificantChanges: significantChanges,
                },
            );
        });
    };

    function storeLocation(location: any) {
        var data = {
            latitude: location['coords']['latitude'],
            longitude: location['coords']['longitude'],
            timestamp: location['timestamp'],
        };
        locationsArray.splice(0, 0, data);
        locationsArray.pop();
        const db = getDatabase(Firebase);
        const dref = ref(db, 'buses/' + selectedBusName + '/' + getUniqueId());
        set(dref, JSON.stringify(locationsArray));
    }

    function updateLocation(name: string) {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                RNDisableBatteryOptimizationsAndroid.isBatteryOptimizationEnabled().then(
                    (isEnabled: Boolean) => {
                        console.log('Enabled ' + isEnabled);
                        if (isEnabled) {
                            Alert.alert(
                                'Warning!',
                                'Please Disable Battery Saver. Otherwise location data will not be shared when display is off',
                                [
                                    {
                                        text: 'OK',
                                        onPress: () =>
                                            RNDisableBatteryOptimizationsAndroid.openBatteryModal(),
                                    },
                                ],
                            );
                        }
                    },
                );
                selectedBusName = name;
                setBusName(name);
                toggleBackground(name);
            } else {
                Alert.alert(
                    'No Internet Connection',
                    'Please Connect to WiFi or Turn on Mobile Data.',
                );
            }
        });
    }

    return (
        <SafeAreaView style={styles.container}>
            {observing ? (
                <View>
                    <Text
                        style={[
                            { marginTop: landscape ? 0 : 50 },
                            styles.titleStyle,
                        ]}
                    >
                        Sharing Location of {busName}
                    </Text>
                    <ImageBackground
                        source={require('../../assets/loc_share_ic.gif')}
                        style={styles.rippleContainer}
                    >
                        <TouchableOpacity
                            style={styles.buttonStyle}
                            onPress={() => toggleBackground('')}
                        >
                            <Text style={styles.buttonText}> STOP </Text>
                        </TouchableOpacity>
                    </ImageBackground>
                </View>
            ) : (
                <View>
                    <Text
                        style={[
                            { marginTop: landscape ? 0 : 50 },
                            styles.titleStyle,
                        ]}
                    >
                        Select Bus
                    </Text>
                    <FlatList
                        style={{ marginTop: landscape ? 0 : 20 }}
                        data={busData}
                        renderItem={({ item }) => (
                            <View style={styles.itemContainer}>
                                <BusButton
                                    title={item.busName}
                                    onPressButton={updateLocation}
                                />
                            </View>
                        )}
                        numColumns={2}
                        // keyExtractor={item => item.id}
                    />
                </View>
            )}
        </SafeAreaView>
    );
};

export default BusList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: spacing.md,
        backgroundColor: colorList.secondary,
    },
    itemContainer: {
        flex: 1,
        margin: 3,
        flexDirection: 'column',
    },
    titleStyle: {
        fontSize: fontConfig.xxlg,
        textAlign: 'center',
        color: colorList.primary,
        fontWeight: 'bold',
    },
    buttonStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        elevation: 8,
        borderRadius: 100,
        backgroundColor: colorList.primary,
        height: 100,
        width: 100,
    },
    buttonText: {
        fontSize: fontConfig.lg,
        color: colorList.secondary,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    rippleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 50,
        height: 250,
        width: 250,
    },
});
