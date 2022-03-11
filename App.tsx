import React from 'react';
import BusButton from './src/component/BusButton';
import BusList from './src/screens/BusList';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from 'react-native';

import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Routes from './src/navigation/Routes';

const App = () => {
    return (
        <View style={styles.continer}>
            {/* <BusList/> */}

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
