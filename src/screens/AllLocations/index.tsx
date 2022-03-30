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
import Firebase, { colorList } from '../../config';
import Locationhistory from '../Locationhistory';

function AllLocations({ navigation, route }) {
    const { currentBus, allBusData } = route.params;
    console.log(allBusData);
    function locationPressed() {
        navigation.navigate('Locations', {
            currentBus: currentBus,
            data: allBusData,
        });
    }
    function busList(data: any) {
        let buslocationList = [];
        for (let i = 0; i < 5; i++) {
            buslocationList.push(
                <BusLocationCard
                    busInfo={currentBus}
                    time={i}
                    key={i}
                    locationPress={() => locationPressed()}
                    onCardPress={() => {}}
                    allBus={allBusData}
                />,
            );
        }
        return buslocationList;
    }
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

export default AllLocations;
