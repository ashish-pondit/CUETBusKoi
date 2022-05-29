import * as React from 'react';
import { Text, StyleSheet, View, Image, Alert } from 'react-native';
import { colorList } from '../../config';
import NetInfo from '@react-native-community/netinfo';

const Loadingpage = () => {
    return (
        <View style={styles.continer}>
            <View style={styles.logoContiner}>
                <Image
                    style={styles.tinyImage}
                    source={require('../../assets/logo.png')}
                />
                <Text style={styles.textStyle}>মামা, বাস কই...?</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    continer: {
        flex: 1,
        // backgroundColor: colorList.secondary,
    },
    logoContiner: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: colorList.secondary,
    },
    tinyImage: {
        height: 300,
        width: 300,
    },
    textStyle: {
        fontSize: 30,
        color: colorList.primary,
    },
});

export default Loadingpage;
