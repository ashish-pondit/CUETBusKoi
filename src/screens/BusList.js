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
import BusButton from '../component/BusButton';
const DATA = [
    {
        id: 1,
        busName: 'মাতামুহুরি',
    },
    {
        id: 2,
        busName: 'সুরমা',
    },
    {
        id: 3,
        busName: 'হালদা',
    },
    {
        id: 4,
        busName: 'পদ্মা',
    },
    {
        id: 5,
        busName: 'মেঘনা',
    },
    {
        id: 6,
        busName: 'যমুনা',
    },
    {
        id: 7,
        busName: 'ব্রহ্মপুত্র',
    },
    {
        id: 8,
        busName: 'বুড়িগঙ্গা',
    },
];

const BusList = () => {
    function updateLocation(name) {
        Alert.alert('Hello ' + name);
    }
    return (
        <SafeAreaView>
            <FlatList
                data={DATA}
                renderItem={({ item }) => (
                    <View style={styles.container}>
                        <BusButton
                            title={item.busName}
                            onPressButton={updateLocation}
                        />
                    </View>
                )}
                numColumns={2}
                keyExtractor={item => item.id}
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
