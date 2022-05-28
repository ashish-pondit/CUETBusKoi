import * as React from 'react';
import { Text, StyleSheet, View, Image, Alert } from 'react-native';
import { colorList } from '../../config';
import NetInfo from '@react-native-community/netinfo';

const Loadingpage = () => {
    const [noInternet, setNotInternet] = React.useState(false);
    /* React.useEffect(() => {
        NetInfo.fetch().then(state => {
            if (!state.isConnected) {
                console.log('nai');
                setNotInternet(true);
            }
        });
    });
    NetInfo.fetch().then(state => {
        if (!state.isConnected) {
            Alert.alert(
                'No Internet Connection',
                'Please Connect to WiFi or Turn on Mobile Data.',
            );
        }
    });*/
    return (
        <View style={styles.continer}>
            <Image
                style={styles.tinyImage}
                source={require('../../assets/logo.png')}
            />
            <Text style={styles.textStyle}>মামা, বাস কই...?</Text>
            {/*noInternet ? (
                <Text style={styles.infoStyle}>
                    Please Turn on Wifi or Mobile Data
                </Text>
            ) : null*/}
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
    infoStyle: {
        fontSize: 15,
        color: 'black',
    },
});

export default Loadingpage;
