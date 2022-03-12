import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    StyleSheet,
    Button,
    View,
    SafeAreaView,
    Text,
    Linking,
    FlatList,
    Alert,
    PermissionsAndroid,
    Platform,
    ToastAndroid,
    TouchableOpacity,
    Image,
    ImageBackground,
} from 'react-native';
import { useDeviceOrientation } from '@react-native-community/hooks';
import BusButton from '../../component/BusButton';
import { busData } from '../../data/busList.json';
import { fontConfig, colorList, spacing } from '../../config';
import { getDatabase, ref, set } from 'firebase/database';
import { getUniqueId } from 'react-native-device-info';
import Geolocation from 'react-native-geolocation-service';
//const VIForegroundService = require('@voximplant/react-native-foreground-service');
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
const BusList = () => {
    const { landscape } = useDeviceOrientation();
    const [forceLocation, setForceLocation] = useState(true);
    const [highAccuracy, setHighAccuracy] = useState(true);
    const [locationDialog, setLocationDialog] = useState(true);
    const [significantChanges, setSignificantChanges] = useState(false);
    const [observing, setObserving] = useState(false);
    //const [foregroundService, setForegroundService] = useState(false);
    const [useLocationManager, setUseLocationManager] = useState(false);
    const [busName, setBusName] = useState<string>();
    const watchId = useRef<number | null>(null);
    var selectedBusName: string = '';
    const locationsArray = new Array();
    var data = {
        latitude: 0,
        longitude: 0,
        timestamp: 0,
    };
    for (var i = 0; i < 10; i = i + 1) {
        locationsArray.push(data);
    }

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

    /*
  const stopForegroundService = useCallback(() => {
    VIForegroundService.stopService().catch((err:any) => err);
  }, []);
*/
    const removeLocationUpdates = useCallback(
        () => {
            if (watchId.current !== null) {
                //stopForegroundService();
                Geolocation.clearWatch(watchId.current);
                watchId.current = null;
                setObserving(false);
            }
        },
        [
            /*stopForegroundService*/
        ],
    );

    useEffect(() => {
        return () => {
            removeLocationUpdates();
        };
    }, [removeLocationUpdates]);

    const hasPermissionIOS = async () => {
        const openSetting = () => {
            Linking.openSettings().catch(() => {
                Alert.alert('Unable to open settings');
            });
        };
        const status = await Geolocation.requestAuthorization('whenInUse');

        if (status === 'granted') {
            return true;
        }

        if (status === 'denied') {
            Alert.alert('Location permission denied');
        }

        if (status === 'disabled') {
            Alert.alert(
                `Turn on Location Services to allow BusKoi to determine your location.`,
                '',
                [
                    { text: 'Go to Settings', onPress: openSetting },
                    { text: "Don't Use Location", onPress: () => {} },
                ],
            );
        }

        return false;
    };

    const hasLocationPermission = async () => {
        if (Platform.OS === 'ios') {
            const hasPermission = await hasPermissionIOS();
            return hasPermission;
        }

        if (Platform.OS === 'android' && Platform.Version < 23) {
            return true;
        }

        const hasPermission = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        const hasPermission1 = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
        );

        if (hasPermission === true && hasPermission1 === true) {
            return true;
        } else {
            if (!hasPermission1) {
                await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
                );
            }
            if (!hasPermission) {
                await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                );
            }
        }

        const statusFG = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        const statusBG = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
        );

        if (statusBG && statusFG) {
            return true;
        } else {
            Alert.alert(
                'Location Permission',
                "You Must Provide Location Permssion to 'Allow all the time' to Use This App Properly!",
                [
                    {
                        text: 'Okay',
                        onPress: () => Linking.openSettings(),
                    },
                ],
            );
        }

        /*if (status1 === PermissionsAndroid.RESULTS.DENIED) {
            ToastAndroid.show(
                'Location permission denied by user.',
                ToastAndroid.LONG,
            );
        } else if (status1 === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
            ToastAndroid.show(
                'Location permission revoked by user.',
                ToastAndroid.LONG,
            );
        }*/

        return false;
    };

    const getLocation = async () => {
        const hasPermission = await hasLocationPermission();

        if (!hasPermission) {
            return;
        }

        Geolocation.getCurrentPosition(
            position => {
                console.log(position);
            },
            error => {
                Alert.alert(`Code ${error.code}`, error.message);
                console.log(error);
            },
            {
                accuracy: {
                    android: 'high',
                    ios: 'best',
                },
                enableHighAccuracy: highAccuracy,
                timeout: 15000,
                maximumAge: 10000,
                distanceFilter: 0,
                forceRequestLocation: forceLocation,
                forceLocationManager: useLocationManager,
                showLocationDialog: locationDialog,
            },
        );
    };

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
            /*if (Platform.OS === 'android' && foregroundService) {
      await startForegroundService();
    }*/

            watchId.current = Geolocation.watchPosition(
                position => {
                    storeLocation(position);
                    //console.log(position);
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
                    interval: 5000,
                    fastestInterval: 2000,
                    forceRequestLocation: forceLocation,
                    forceLocationManager: useLocationManager,
                    showLocationDialog: locationDialog,
                    useSignificantChanges: significantChanges,
                },
            );
        });
    };

    /*
  const startForegroundService = async () => {
    if (Platform.Version >= 26) {
      await VIForegroundService.createNotificationChannel({
        id: 'locationChannel',
        name: 'Location Tracking Channel',
        description: 'Tracks location of user',
        enableVibration: false,
      });
    }

    return VIForegroundService.startService({
      channelId: 'locationChannel',
      id: 420,
      title: 'BusKoi',
      text: 'Tracking location updates',
      icon: 'ic_launcher',
    });
  };

*/

    function storeLocation(location: any) {
        var data = {
            latitude: location['coords']['latitude'],
            longitude: location['coords']['longitude'],
            timestamp: location['timestamp'],
        };
        locationsArray.splice(0, 0, data);
        locationsArray.pop();
        //const dayId = dayjs(location.timestamp).format('HHmmss');
        const db = getDatabase(Firebase);
        const dref = ref(db, 'buses/' + selectedBusName + '/' + getUniqueId());
        set(dref, JSON.stringify(locationsArray));
    }

    function updateLocation(name: string) {
        selectedBusName = name;
        setBusName(name);
        toggleBackground(name);
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
        width: 100
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
        width: 250
    }
});
