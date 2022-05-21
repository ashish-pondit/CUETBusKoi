import React from 'react';
import {
    View,
    Text,
    Button,
    TextInput,
    SafeAreaView,
    StyleSheet,
    Alert,
    ToastAndroid,
    SectionList,
    ScrollView,
} from 'react-native';
import Firebase, { fontConfig, colorList, spacing } from '../../config/index';
import CollapsibleView from '@eliav2/react-native-collapsible-view';
import { getDatabase, ref, set } from 'firebase/database';
import { getUniqueId } from 'react-native-device-info';
import BusButton from '../../component/BusButton';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Wrongpage = ({ route, navigation }) => {
    const { nextSchedule } = route.params;
    console.log('printing received parameter');
    console.log(nextSchedule);
    return (
        <View style={styles.body}>
            <FontAwesome5
                name="sad-tear"
                size={200}
                color={colorList.primary}
            />
            <Text style={styles.textDesign}>
                Sorry, there is no bus scheduled at the moment.
            </Text>
            {nextSchedule['start'] ? (
                <Text style={styles.textSecondary}>
                    The next bus scheduled is at: {nextSchedule['start'] % 12}{' '}
                    {nextSchedule['start'] > 12 ? 'PM' : 'AM'}
                </Text>
            ) : null}

            {/* (
                <Text style={styles.textSecondary}>
                    No more bus scheduled for today.
                </Text>
            ) */}
        </View>
    );
};

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: colorList.secondary,
        padding: spacing.lg,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textDesign: {
        fontSize: 20,
        color: colorList.darkSoft,
        marginTop: spacing.lg,
    },
    textSecondary: {
        fontSize: 18,
        color: colorList.warning,
    },
});

export default Wrongpage;
