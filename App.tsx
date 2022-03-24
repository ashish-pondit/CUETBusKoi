import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Routes from './src/navigation/Routes';
import Termsmodal from './src/screens/Termsmodal';
const App = () => {
    const [accepted, setaccepted] = useState(true);

    const agreementOnclick = () => {
        //console.log('click hoise sssssssssss');
        setaccepted(true);
        saveAgreement();
    };

    const saveAgreement = async () => {
        try {
            //console.log('baaaaalllllllllllll');
            await AsyncStorage.setItem('policy', 'true');
        } catch (e) {
            ///console.log('errorrrrrrrrrrrrrrrr');
            console.log(e);
        }
    };

    const loadAgreement = async () => {
        try {
            const savedData = await AsyncStorage.getItem('policy');
            if (savedData) {
                //console.log('printing save data');
                //console.log(savedData);
                if (savedData === 'true') {
                    //console.log('yes bro');
                    //console.log(accepted);
                    setaccepted(true);
                } else {
                    //console.log('no bro');
                }
                // setaccepted(savedData);
            } else {
                setaccepted(false);
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        //console.log('call hoy nai');
        loadAgreement();
    }, []);

    return (
        <View style={styles.continer}>
            <Routes />
            {accepted ? null : (
                <Termsmodal onClick={agreementOnclick} isVisible={!accepted} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    continer: {
        flex: 1,
    },
});

export default App;
