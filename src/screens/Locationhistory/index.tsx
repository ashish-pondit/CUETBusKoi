import * as React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import BusLocationCard from '../../component/BusLocationCard';
import { busData } from '../../data/busList.json';
import { colorList } from '../../config';
//import Buslocationlist from '../../component/Buslocationlist';
import Firebase from '../../config';
import { getDatabase, onValue, get, ref, child } from 'firebase/database';
import { getType } from 'react-native-device-info';
function Locationhistory() {
    const [allBusData, setAllBusData] = React.useState<{ [key: string]: any }>(
        {},
    );
    const reference = ref(getDatabase(Firebase), 'buses/');
    var loaded: boolean = false;
    var i = 0;
    function setFirebaseData() {
        get(child(ref(getDatabase(Firebase)), 'buses/')).then(snapshot => {
            var arr: { [key: string]: any } = {};
            var data = snapshot.val();
            for (var i in busData) {
                var bName = busData[i].busName;
                var latlong = [];
                if (bName in data) {
                    for (var device in data[bName]) {
                        latlong.push(data[bName][device]);
                    }
                    arr[bName] = latlong[0];
                } else {
                    arr[bName] = [];
                }
            }
            setAllBusData(arr);
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
        }, 30000);
        return () => clearInterval(interval);
    }, []);
    function busList(data: any) {
        let buslocationList = [];
        for (let i = 0; i < data.length; i++) {
            buslocationList.push(<BusLocationCard busInfo={data[i]} key={i} />);
        }
        return buslocationList;
    }
    // busData[0]
    return (
        <View style={styles.container}>
            <ScrollView>
                {busList(busData)}
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
