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
    Image,
} from 'react-native';
import Firebase, { fontConfig, colorList, spacing } from '../../config/index';
import CollapsibleView from '@eliav2/react-native-collapsible-view';
import { getDatabase, ref, set } from 'firebase/database';
import { getUniqueId } from 'react-native-device-info';
import BusButton from '../../component/BusButton';

const About = () => {
    const [name, setName] = React.useState('');
    const [feedback, setFeedback] = React.useState('');
    const [submitted, setSubmitted] = React.useState(false);

    function submitFeedback() {
        var tempName;

        if (feedback == '') {
            setSubmitted(true);
            setName('');
            return;
        }

        tempName = name == '' ? 'Anonymous' : name;
        const db = getDatabase(Firebase);
        const dref = ref(db, 'feedback/' + Date.now());
        set(dref, { name: tempName, feedback: feedback });
        ToastAndroid.show('Feedback Submitted', ToastAndroid.SHORT);
        setFeedback('');
        setName('');
        setSubmitted(false);
    }

    return (
        <SafeAreaView>
            <ScrollView>
                <CollapsibleView
                    style={styles.container}
                    arrowStyling={styles.arrowStyle}
                    touchableWrapperStyle={styles.wrapperStyle}
                    collapsibleContainerStyle={{}}
                    title={<Text style={styles.titleStyle}>How to Use</Text>}
                >
                    <View style={{ paddingLeft: 15, paddingBottom: 10 }}>
                        <SectionList
                            sections={[
                                {
                                    title: 'To View CUET Bus Location-',
                                    data: [
                                        'You can find the list of last known locations of CUET buses in the Homepage',
                                        'Tap on specific bus name to view the location history of that bus',
                                        'Tap on the location icon to view the location on google map',
                                        'You must have an active internet connection to view bus locations',
                                    ],
                                },
                                {
                                    title: 'To Share CUET Bus Location-',
                                    data: [
                                        'Go to the Update Location Page',
                                        'Tap on the bus name to share its location',
                                        'To stop sharing, tap the stop button',
                                        'You must have location sharing enabled & active internet connection to share bus location',
                                    ],
                                },
                            ]}
                            renderItem={({ item }) => (
                                <Text style={styles.howtoStyle}>
                                    {'\u2023' + ' '} {item}
                                </Text>
                            )}
                            renderSectionHeader={({ section }) => (
                                <Text style={styles.devName}>
                                    {'\u25AA' + ' '}
                                    {section.title}{' '}
                                </Text>
                            )}
                        />
                    </View>
                </CollapsibleView>

                <CollapsibleView
                    style={styles.container}
                    arrowStyling={styles.arrowStyle}
                    touchableWrapperStyle={styles.wrapperStyle}
                    collapsibleContainerStyle={{}}
                    title={
                        <Text style={styles.titleStyle}>Developer Info</Text>
                    }
                >
                    <View style={{ paddingLeft: 15, paddingBottom: 10 }}>
                        <SectionList
                            sections={[
                                {
                                    title: 'Md. Nahidul Islam Opu',
                                    data: [
                                        "CSE '16, CUET",
                                        'Email: opu.nahidul@gmail.com',
                                    ],
                                },
                                {
                                    title: 'Ashish Pondit',
                                    data: [
                                        "CSE '16, CUET",
                                        'Email: ashishpondit@gmail.com',
                                    ],
                                },
                                {
                                    title: 'Muhammad Eshaque Ali Rukon',
                                    data: [
                                        "CSE '16, CUET",
                                        'Email: rukon219@yahoo.com',
                                    ],
                                },
                            ]}
                            renderItem={({ item }) => (
                                <Text style={{}}>{item}</Text>
                            )}
                            renderSectionHeader={({ section }) => (
                                <Text style={styles.devName}>
                                    {section.title}
                                </Text>
                            )}
                        />
                    </View>
                </CollapsibleView>

                <CollapsibleView
                    style={styles.container}
                    arrowStyling={styles.arrowStyle}
                    touchableWrapperStyle={styles.wrapperStyle}
                    collapsibleContainerStyle={{}}
                    title={<Text style={styles.titleStyle}>Contact Us</Text>}
                >
                    <TextInput
                        style={[styles.nameInputStyle]}
                        maxLength={40}
                        textAlignVertical="top"
                        placeholder="Name (Optional)"
                        placeholderTextColor={'gray'}
                        onChangeText={text => setName(text)}
                        value={name}
                    />

                    <TextInput
                        style={[
                            styles.textInputStyle,
                            {
                                borderColor:
                                    feedback == '' && submitted
                                        ? 'red'
                                        : 'black',
                                marginBottom: 2,
                            },
                        ]}
                        multiline
                        numberOfLines={4}
                        maxLength={1000}
                        textAlignVertical="top"
                        placeholder="Feedback"
                        placeholderTextColor={'gray'}
                        onChangeText={text => setFeedback(text)}
                        value={feedback}
                    />
                    {feedback == '' && submitted ? (
                        <Text style={{ color: 'red' }}>
                            {' '}
                            *You must fill this field to submit !
                        </Text>
                    ) : null}
                    <View style={styles.buttonStyle}>
                        <Button
                            //disabled={(feedback == "" ? true : false)}
                            color={colorList.primary}
                            title="Submit"
                            onPress={submitFeedback}
                        />
                    </View>
                </CollapsibleView>

                <CollapsibleView
                    style={styles.container}
                    arrowStyling={styles.arrowStyle}
                    touchableWrapperStyle={styles.wrapperStyle}
                    collapsibleContainerStyle={{}}
                    title={<Text style={styles.titleStyle}>Bus Schedule</Text>}
                >
                    <Image
                        style={styles.soon}
                        source={require('../../assets/coming_soon.png')}
                    />
                </CollapsibleView>
            </ScrollView>
        </SafeAreaView>
    );
};

export default About;

const styles = StyleSheet.create({
    container: {
        paddingLeft: 50,
        textAlign: 'left',
        alignItems: 'flex-start',
        backgroundColor: colorList.secondary,
    },
    textStyle: {
        fontSize: fontConfig.xxlg,
        alignSelf: 'center',
    },
    arrowStyle: {
        color: colorList.primary,
        thickness: 2,
    },
    titleStyle: {
        color: colorList.primary,
        fontSize: fontConfig.md,
        fontWeight: 'bold',
    },
    wrapperStyle: {
        //backgroundColor: 'black',
        paddingLeft: 10,
        paddingRight: 10,
    },
    textInputStyle: {
        margin: 10,
        padding: 10,
        borderWidth: 1,
        height: 100,
        backgroundColor: 'white',
    },
    nameInputStyle: {
        margin: 10,
        padding: 10,
        borderWidth: 1,
        height: 40,
        backgroundColor: 'white',
    },
    buttonStyle: {
        marginTop: 20,
        padding: 10,
    },
    devName: {
        fontWeight: 'bold',
        fontSize: fontConfig.md + 2,
        color: 'black',
        marginTop: spacing.md,
    },
    howtoTitle: {
        fontSize: fontConfig.lg,
        marginBottom: spacing.sm,
    },
    howtoStyle: {
        paddingLeft: spacing.xlg,
        marginTop: spacing.sm,
    },
    soon: {
        height: 200,
        width: 200,
        margin: spacing.lg,
        alignSelf: 'center',
    },
});
