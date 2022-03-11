import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    Pressable,
    TextComponent,
    TextPropTypes,
    Alert,
} from 'react-native';

import Geolocation from 'react-native-geolocation-service';

interface BusButtonprops {
    title: string;
}

const BusButton = ({ title }: BusButtonprops) => {
    const findLocation = async () => {
        Geolocation.getCurrentPosition(
            position => {
                console.log(
                    '88888888888888888888888888888888888888888888888888888',
                );
                console.log(position);
            },
            error => {
                console.log(error);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        );
    };

    console.table(title);
    return (
        // <Pressable style={styles.buttonStyle} onPress={() => alert("Test Alert!!")}>
        //     <Text style={styles.text}>{title}</Text>
        // </Pressable>
        <Button
            // </Button>styles={styles.buttonStyle}

            title={title}
            onPress={() => {
                findLocation();
            }}
        />
    );
};
export default BusButton;

const styles = StyleSheet.create({
    container: {
        padding: 10,
        margin: 5,
        alignments: 'right',
        fontSize: 20,
        justifyContent: 'center',
        backgroundColor: 'black',
    },
    buttonStyle: {
        fontSize: 100,
        height: 100,
        backgroundColor: '#f9f4e6',
        borderRadius: 4,
    },
    text: {
        color: '#4d0000',
        fontWeight: 'bold',
        justifyContent: 'center',
    },
});
