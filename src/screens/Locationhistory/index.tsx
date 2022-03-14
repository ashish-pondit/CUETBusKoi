import * as React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import BusLocationCard from '../../component/BusLocationCard';
import { busData } from '../../data/busList.json';
import { colorList } from '../../config';
//import Buslocationlist from '../../component/Buslocationlist';
import Firebase from '../../config';
import { getDatabase, onValue, get, ref, child } from 'firebase/database';
import { getType } from 'react-native-device-info';
import { calculateLocation } from './locationCalculator';
function Locationhistory() {
    const [allBusData, setAllBusData] = React.useState<{ [key: string]: any }>(
        {},
    );
    const [userCount, setUserCount] = React.useState<{ [key: string]: number }>(
        {},
    );
    var dataReceiveInterval = 30000;

    get(child(ref(getDatabase(Firebase)), 'constants/')).then(snapshot => {
        var data = snapshot.val();
        dataReceiveInterval = data['dataReceiveInterval'];
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
                    arr[bName] = latlong;
                } else {
                    arr[bName] = [];
                }
            }
            setUserCount(count);
            setAllBusData(calculateLocation(arr));
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
    function busList(data: any) {
        let buslocationList = [];
        for (let i = 0; i < data.length; i++) {
            buslocationList.push(
                <BusLocationCard busInfo={data[i]} time={0} key={i} />,
            );
        }
        return buslocationList;
    }
    // busData[0]
    return (
        <View style={styles.container}>
            <ScrollView>
                {busList(allBusData)}
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
