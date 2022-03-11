import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    StyleSheet,
    Button,
    View,
    SafeAreaView,
    Text,Linking,
    FlatList,
    Alert,
    PermissionsAndroid,
    Platform,
    ToastAndroid,
} from 'react-native';
import {getDatabase, ref, set} from 'firebase/database';
import { getUniqueId } from 'react-native-device-info';
import BusButton from '../../component/BusButton';
import {busData} from '../../data/busList.json'
import Geolocation from 'react-native-geolocation-service';
const VIForegroundService = require('@voximplant/react-native-foreground-service');
import Firebase from '../../config/firebase';
//import MapView from './MapView';

const BusList = () => {
    
  const [forceLocation, setForceLocation] = useState(true);
  const [highAccuracy, setHighAccuracy] = useState(true);
  const [locationDialog, setLocationDialog] = useState(true);
  const [significantChanges, setSignificantChanges] = useState(false);
  const [observing, setObserving] = useState(false);
  const [foregroundService, setForegroundService] = useState(false);
  const [useLocationManager, setUseLocationManager] = useState(false);
  const watchId = useRef<number|null>(null);
  const locationsArray = new Array();
  var data = {
    latitude: 0,
    longitude: 0,
    timestamp: 0
  };
  for(var i=0;i<10;i=i+1)
  {
    locationsArray.push(data);
  }

  const stopForegroundService = useCallback(() => {
    VIForegroundService.stopService().catch((err:any) => err);
  }, []);

  const removeLocationUpdates = useCallback(() => {
    if (watchId.current !== null) {
      stopForegroundService();
      Geolocation.clearWatch(watchId.current);
      watchId.current = null;
      setObserving(false);
    }
  }, [stopForegroundService]);

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

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        'Location permission denied by user.',
        ToastAndroid.LONG,
      );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        'Location permission revoked by user.',
        ToastAndroid.LONG,
      );
    }

    return false;
  };

  const getLocation = async () => {
    const hasPermission = await hasLocationPermission();

    if (!hasPermission) {
      return;
    }

    Geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
      },
      (error) => {
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

  const getLocationUpdates = async (busName:string) => {
    const hasPermission = await hasLocationPermission();

    if (!hasPermission) {
      return;
    }

    if (Platform.OS === 'android' && foregroundService) {
      await startForegroundService();
    }

    setObserving(true);

    watchId.current = Geolocation.watchPosition(
      (position) => {
        storeLocation(busName,position);
        //console.log(position);
      },
      (error) => {
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
  };


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



  
  function storeLocation(id:string, location:any){
    var data = {
      latitude: location['coords']['latitude'],
      longitude: location['coords']['longitude'],
      timestamp: location['timestamp']
    };
    locationsArray.splice(0,0,data);
    locationsArray.pop();
        //const dayId = dayjs(location.timestamp).format('HHmmss');
    const db = getDatabase(Firebase);
    const dref = ref(db, 'buses/'+id+'/'+getUniqueId());
    set(dref,JSON.stringify(locationsArray));
  };



    function updateLocation(name: string)
    {
        Alert.alert('Updating location for '+ name+' on firebase');
        getLocationUpdates(name);
    }

    return (
        <SafeAreaView>
            <FlatList
                data={busData}
                renderItem={({ item }) => (
                    <View style={styles.container}>
                        <BusButton title={item.busName} onPressButton={updateLocation} />
                    </View>
                )}
                numColumns={2}
                // keyExtractor={item => item.id}
            />
        </SafeAreaView>
    );
};

export default BusList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 3,
        fontSize: 50,
        flexDirection: 'column',
    },
    containerStyle: {
        fontSize: 30,
        backgroundColor: 'black',
    },
});