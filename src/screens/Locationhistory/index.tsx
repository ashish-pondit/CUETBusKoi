import * as React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import BusLocationCard from '../../component/BusLocationCard';
import { busData } from '../../data/busList.json';
import { colorList } from '../../config';
import Buslocationlist from '../../component/Buslocationlist';

function Locationhistory() {
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
