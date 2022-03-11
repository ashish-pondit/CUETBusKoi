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
import BusButton from '../../component/BusButton';
import {busData} from '../../data/buslist.json'

const BusList = () => {
    return (
        <SafeAreaView>
            <FlatList
                data={busData}
                renderItem={({ item }) => (
                    <View style={styles.container}>
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
        margin: 3,
        fontSize: 50,
        flexDirection: 'column',
    },
    containerStyle: {
        fontSize: 30,
        backgroundColor: 'black',
    },
});
