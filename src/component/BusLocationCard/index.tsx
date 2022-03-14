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
    busInfo: { id: number; busName: string; location: any };
    time: number;
}

function getPlaceName(busData: any, time: number) {
    var loc = busData.location;
    if (time != -1) {
        //return loc['longitude'] + ' ' + loc['latitude'];
        if (loc[time]['longitude'] == 0 || loc[time]['latitude'] == 0)
            return 'Unknown';
        else return loc[time]['longitude'] + ' ' + loc[time]['latitude'];
    } else {
        for (let i = 0; i < loc.length; i++) {
            if (loc[i]['longitude'] != 0 && loc[i]['latitude'] != 0) {
                time = i;
                return loc[i]['longitude'] + ' ' + loc[i]['latitude'];
            }
        }
        return 'Unknown';
    }
}

function getLastTime(busData: any, time: number) {
    var loc = busData.location;
    if (time != -1) {
        if (time == 0) return 'now';
        else return 'update ' + time + ' min ago';
        return time;
    } else {
        for (let i = 0; i < loc.length; i++) {
            if (loc[i]['longitude'] != 0 && loc[i]['latitude'] != 0) {
                if (i == 0) return 'now';
                else return 'update ' + i + ' min ago';
            }
        }
    }
}

const BusLocationCard = ({ busInfo, time }: BusinfoProps) => {
    // console.log(busInfo);
    return (
        <View style={styles.continer}>
            <TouchableOpacity style={styles.containerText}>
                <Text style={styles.busNameTxt}>{busInfo.busName}</Text>
                <View style={styles.containerLoc}>
                    <Text style={styles.locationTxt}>
                        {getPlaceName(busInfo, time)}
                    </Text>
                    {time == 0 ? (
                        <Text style={styles.updateTimeTxt}> now</Text>
                    ) : (
                        <Text style={styles.updateTimeTxt}>
                            {getLastTime(busInfo, time)}
                        </Text>
                    )}
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
