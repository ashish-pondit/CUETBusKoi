import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    useColorScheme,
    View,
} from 'react-native';

import { spacing, fontConfig, colorList } from '../../config';
import Icon from 'react-native-vector-icons/Entypo';

interface BusinfoProps {
    busInfo: { id: number; busName: string; location: string };
}

const BusLocationCard = ({ busInfo }: BusinfoProps) => {
    console.log(busInfo);
    return (
        <View style={styles.continer}>
            <TouchableOpacity style={styles.containerText}>
                <Text style={styles.busNameTxt}>{busInfo.busName}</Text>
                <View style={styles.containerLoc}>
                    <Text style={styles.locationTxt}>{busInfo.location}</Text>
                    <Text style={styles.updateTimeTxt}>Updated: 2 min ago</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.locationIconBox}>
                <Icon
                    name="location"
                    size={35}
                    color={colorList.primaryXsoft}
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    continer: {
        flexDirection: 'row',
        marginLeft: spacing.lg,
        marginRight: spacing.lg,
        borderRadius: spacing.sm,
        padding: spacing.md,
        elevation: spacing.md,
        backgroundColor: colorList.primaryXsoft,
        shadowOffset: { width: 1, height: 1 },
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowRadius: 2,
        marginVertical: 10,
    },
    containerText: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flex: 1,
    },
    containerLoc: {
        flexDirection: 'column',
        marginRight: spacing.lg,
    },
    busNameTxt: {
        fontSize: fontConfig.lg,
        color: colorList.primary,
        marginRight: spacing.md,
        minWidth: '25%',
    },
    locationTxt: {
        fontSize: fontConfig.lg,
        color: colorList.primary,
    },
    updateTimeTxt: {
        fontSize: fontConfig.sm,
        color: colorList.darkSoft,
        textAlign: 'left',
    },
    locationIconBox: {
        alignSelf: 'center',
        borderWidth: 0.3,
        borderRadius: spacing.sm,
        padding: spacing.sm,
        backgroundColor: colorList.primarySoft,
    },
});

export default BusLocationCard;
