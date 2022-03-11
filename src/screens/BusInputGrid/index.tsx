import React from 'react';
import {
    StyleSheet,
    Button,
    View,
    SafeAreaView,
    Text,
    FlatList,
    Alert,
} from 'react-native';
import { useDeviceOrientation } from '@react-native-community/hooks';
import BusButton from '../../component/BusButton';
import {busData} from '../../data/busList.json'
import { fontConfig, colorList, spacing } from '../../config';

const BusList = () => {
    const {landscape} = useDeviceOrientation();
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={[{marginTop: landscape ? 0 : 50}, styles.titleStyle]}>
                    Select Bus
                </Text>
            </View>
            <FlatList
                style={{marginTop: landscape ? 0 : 20}}
                data={busData}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <BusButton title={item.busName} />
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
        padding: spacing.md,
        backgroundColor: colorList.secondary,
        
    },
    itemContainer: {
        flex: 1, 
        margin: 3,
        flexDirection: 'column'
    },
    titleStyle: {
        fontSize: fontConfig.xxlg,
        textAlign: 'center',
        color: colorList.primary,
        fontWeight: 'bold',

    }
});