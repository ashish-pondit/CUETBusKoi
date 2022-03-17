import React from 'react';
import {
    View,
    Text,
    Button,
    SafeAreaView,
    StyleSheet
} from 'react-native';
import { fontConfig, colorList, spacing } from "../../config/index"
import CollapsibleView from "@eliav2/react-native-collapsible-view";

const About = () => {
    return (
        <SafeAreaView>
            <CollapsibleView
                style={styles.container}
                arrowStyling={styles.arrowStyle}
                touchableWrapperStyle={styles.wrapperStyle}
                // titleStyle={styles.titleStyle}
                title={<Text style={styles.titleStyle}>How to Use</Text>}
                collapsibleContainerStyle={{}}
            >
                <Text>hey there! we believe that you can understand and use this simple app.</Text>
            </CollapsibleView>


            <CollapsibleView
                arrowStyling={styles.arrowStyle}
                title={<Text style={styles.titleStyle}>Developer Info</Text>}
            >
                <Text>.........</Text>
            </CollapsibleView>

            <CollapsibleView
                arrowStyling={styles.arrowStyle}
                title={<Text style={styles.titleStyle}>Contact</Text>}
            >
                <Text>u1604071@student.cuet.ac.bd</Text>
                <Text>u1604073@student.cuet.ac.bd</Text>
                <Text>u1604023@student.cuet.ac.bd</Text>
            </CollapsibleView>
        </SafeAreaView>

    );
};

export default About;

const styles = StyleSheet.create({
    container: {
        paddingLeft: 50,
        textAlign: 'left',
        alignItems: 'flex-start',
        backgroundColor: colorList.secondary
    },
    textStyle: {
        fontSize: fontConfig.xxlg,
        alignSelf: 'center'
    },
    arrowStyle: {
        color: colorList.primary,
        thickness: 2,
    },
    titleStyle: {
        color: 'blue',
        fontSize: fontConfig.md,
        fontWeight: 'bold',
    },
    wrapperStyle: {
        //backgroundColor: 'black',
        paddingLeft: 10
    }
});