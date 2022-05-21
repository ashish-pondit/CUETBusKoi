import * as React from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';
import { colorList } from '../../config';

const Loadingpage = () => {
    return (
        <View style={styles.continer}>
            <Image
                style={styles.tinyImage}
                source={require('../../assets/logo.png')}
            />
            <Text style={styles.textStyle}>মামা, বাস কই...?</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    continer: {
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
