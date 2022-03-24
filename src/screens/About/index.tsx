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
            <CollapsibleView
                style={styles.container}
                arrowStyling={styles.arrowStyle}
                touchableWrapperStyle={styles.wrapperStyle}
                collapsibleContainerStyle={{}}
                title={<Text style={styles.titleStyle}>How to Use</Text>}
            >
                <Text>
                    hey there! we believe that you can understand and use this
                    simple app.
                </Text>
            </CollapsibleView>

            <CollapsibleView
                style={styles.container}
                arrowStyling={styles.arrowStyle}
                touchableWrapperStyle={styles.wrapperStyle}
                collapsibleContainerStyle={{}}
                title={<Text style={styles.titleStyle}>Developer Info</Text>}
            >
                <Text>opu.nahidul@gmail.com</Text>
                <Text>ashishpondit@gmail.com</Text>
                <Text>rukon219@gmail.com</Text>
            </CollapsibleView>

            <CollapsibleView
                style={styles.container}
                arrowStyling={styles.arrowStyle}
                touchableWrapperStyle={styles.wrapperStyle}
                collapsibleContainerStyle={{}}
                title={<Text style={styles.titleStyle}>Contact</Text>}
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
                                feedback == '' && submitted ? 'red' : 'black',
                            marginBottom: 2,
                        },
                    ]}
                    multiline
                    numberOfLines={4}
                    maxLength={150}
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
        color: 'blue',
        fontSize: fontConfig.md,
        fontWeight: 'bold',
    },
    wrapperStyle: {
        //backgroundColor: 'black',
        paddingLeft: 10,
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
});
