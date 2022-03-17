import React from 'react';
import {
    View,
    Text,
    Button,
    SafeAreaView,
    StyleSheet
} from 'react-native';
import { fontConfig, colorList, spacing } from "../../config/index"

const About = () => {
    return (
        <SafeAreaView>
            <Text>
                TTTTTTTTEEEEEEEESSSSSSTTTTT
            </Text>
        </SafeAreaView>
    );
};

export default About;

const style = StyleSheet.create({
    container: {
        flex: 1,
    },
    textStyle: {
        fontSize: fontConfig.xxlg,
        alignSelf: 'center'
    }
});