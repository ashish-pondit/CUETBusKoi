import * as React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    ToastAndroid,
    Platform,
} from 'react-native';
import BusLocationCard from '../../component/BusLocationCard';
import { busData } from '../../data/busList.json';
import { colorList } from '../../config';
//import Buslocationlist from '../../component/Buslocationlist';
import Firebase from '../../config';
import { getDatabase, onValue, get, ref, child } from 'firebase/database';
import MapView from './MapView';
import { calculateLocation } from './locationCalculator';
function notifyMessage(msg: string) {
    if (Platform.OS === 'android') {
        ToastAndroid.show(msg, ToastAndroid.SHORT);
    }
}
function Locationhistory({ navigation }) {
    const [allBusData, setAllBusData] = React.useState<{ [key: string]: any }>(
        {},
    );
    const [userCount, setUserCount] = React.useState<{ [key: string]: number }>(
        {},
    );
    var dataReceiveInterval = 30000;
    var nCountRule = 3;
    var kPercentageRule = 0.5;

    get(child(ref(getDatabase(Firebase)), 'constants/')).then(snapshot => {
        var data = snapshot.val();
        dataReceiveInterval = data['dataReceiveInterval'];
        nCountRule = data['nCountRule'];
        kPercentageRule = data['kPercentageRule'];
    });

    var loaded: boolean = false;
    function setFirebaseData() {
        get(child(ref(getDatabase(Firebase)), 'buses/')).then(snapshot => {
            var arr: { [key: string]: any } = {};
            var count: { [key: string]: number } = {};
            var data = snapshot.val();
            for (var i in busData) {
                var bName = busData[i].busName;
                var latlong = [];
                if (bName in data) {
                    var cnt = 0;
                    for (var device in data[bName]) {
                        var temp = JSON.parse(data[bName][device]);
                        for (let ll = 0; ll < temp.length; ll++)
                            latlong.push(temp[ll]);
                        cnt++;
                    }
                    count[bName] = cnt;
                    if (cnt >= nCountRule) arr[bName] = latlong;
                    else {
                        /*console.log(
                            'discarded ' + bName + ' due to nCountRule',
                        );*/
                        arr[bName] = [];
                    }
                } else {
                    arr[bName] = [];
                }
            }
            setUserCount(count);
            setAllBusData(calculateLocation(arr, kPercentageRule, nCountRule));
            notifyMessage('Bus Locations Updated');
            //console.log(allBusData['মাতামুহুরি']);
            //console.log(arr);
        });
    }

    React.useEffect(() => {
        if (!loaded) {
            loaded = true;
            setFirebaseData();
        }
        const interval = setInterval(() => {
            setFirebaseData();
        }, dataReceiveInterval);
        return () => clearInterval(interval);
    }, []);

    function busList(data: any, locPress) {
        let buslocationList = [];
        for (let i = 0; i < data.length; i++) {
            buslocationList.push(
                <BusLocationCard
                    busInfo={data[i]}
                    time={-1}
                    key={i}
                    locationPress={locPress}
                />,
            );
        }
        return buslocationList;
    }
    // busData[0]
    const locationPressed = busName => {
        navigation.navigate('Locations', busName);
    };
    return (
        <View style={styles.container}>
            <ScrollView>
                {busList(allBusData, locationPressed)}
                <View style={styles.dummy} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colorList.secondary,
    },
    dummy: {
        height: 200,
        width: '100%',
        // backgroundColor: 'yellow',
    },
});

export default Locationhistory;
