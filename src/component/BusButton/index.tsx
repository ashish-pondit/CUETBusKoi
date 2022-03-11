import LinearGradient from 'react-native-linear-gradient';
import React from 'react';
import { colorList, fontConfig, spacing } from '../../config';
import {
    View,
    Text,
    StyleSheet,
    Button,
    Pressable,
    TextComponent,
    TextPropTypes,
    Alert,
    TouchableOpacity,
} from 'react-native';

interface BusButtonprops {
    title: string;
    onPressButton: (name: string) => void;
}

const BusButton = ({ title, onPressButton }: BusButtonprops) => {
    return (
        <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => onPressButton(title)}
        >
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
};
export default BusButton;

const styles = StyleSheet.create({
    buttonText: {
        fontSize: fontConfig.lg,
        color: colorList.secondary,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
        borderRadius: 7,
        backgroundColor: colorList.primary,
        paddingVertical: 2,
        paddingHorizontal: 2,
        height: 100,
    },
});
