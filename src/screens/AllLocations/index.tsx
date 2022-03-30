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

function AllLocations({ route }) {
    const { currentBus, allBusData } = route.params;

    const locationPressed = (curbus: any, allbus: any) => {
        route.navigate('Locations', { currentBus: curbus, data: allbus });
    };
    function busList(data: any, locPress: (curbus: any, allbus: any) => void) {
        let buslocationList = [];
        for (let i = 0; i < 5; i++) {
            buslocationList.push(
                <BusLocationCard
                    busInfo={currentBus}
                    time={i}
                    key={i}
                    locationPress={locPress}
                    onCardPress={() => {}}
                    allBus={data}
                />,
            );
        }
        return buslocationList;
    }
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

export default AllLocations;
