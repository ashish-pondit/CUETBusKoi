import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Button,
    TextComponent
} from "react-native";

const BusButton = ({title}) => {
    return (
            <Button containerStyle={styles.containerStyle}  title={title} 
            onPress={() => alert("Test Alert!!")}/>
    )
}
export default BusButton;

const styles = StyleSheet.create({
    container: {
        padding: 10,
        margin: 5,
        alignments: 'right',
        fontSize: 20,
        justifyContent: 'center',
        backgroundColor: 'black'
    },
    containerStyle: {
        fontSize: 30,
        backgroundColor: 'black'
    }
})