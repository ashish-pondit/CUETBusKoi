import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from 'react-native';

import Routes from './src/navigation/Routes';
import Termsmodal from './src/screens/Termsmodal';
const App = () => {
    const [modalVisible, setModalVisible] = useState(true);
    return (
        <View style={styles.continer}>
            {/* <BusList/> */}
            <Termsmodal onClick={setModalVisible} isVisible={modalVisible} />
            <Routes />
        </View>
    );
};

const styles = StyleSheet.create({
    continer: {
        flex: 1,
    },
});

export default App;
