import React, { useState, useEffect } from 'react';
import {
    Alert,
    Modal,
    StyleSheet,
    Text,
    Pressable,
    View,
    ScrollView,
} from 'react-native';
import { colorList, fontConfig, spacing } from '../../config';

import Ionicons from 'react-native-vector-icons/Ionicons';

const Termsmodal = ({ onClick, isVisible }) => {
    const [toggleCheckBox, setToggleCheckBox] = useState(false);
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                // setModalVisible(!modalVisible);
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalHeaderText}>
                        Terms & Conditions
                    </Text>
                    <View style={styles.termsContainer}>
                        <ScrollView>
                            <Text>
                                These Terms of Service reflect the way Google’s
                                business works, the laws that apply to our
                                company, and certain things we’ve always
                                believed to be true. As a result, these Terms of
                                Service help define Google’s relationship with
                                you as you interact with our services. For
                                example, these terms include the following topic
                                headings: What you can expect from us, which
                                describes how we provide and develop our
                                services What we expect from you, which
                                establishes certain rules for using our services
                                Content in Google services, which describes the
                                intellectual property rights to the content you
                                find in our services — whether that content
                                belongs to you, Google, or others In case of
                                problems or disagreements, which describes other
                                legal rights you have, and what to expect in
                                case someone violates these terms Understanding
                                these terms is important because, by using our
                                services, you’re agreeing to these terms.
                                Besides these terms, we also publish a Privacy
                                Policy. Although it’s not part of these terms,
                                we encourage you to read it to better understand
                                how you can update, manage, export, and delete
                                your information These Terms of Service reflect
                                the way Google’s business works, the laws that
                                apply to our company, and certain things we’ve
                                always believed to be true. As a result, these
                                Terms of Service help define Google’s
                                relationship with you as you interact with our
                                services. For example, these terms include the
                                following topic headings: What you can expect
                                from us, which describes how we provide and
                                develop our services What we expect from you,
                                which establishes certain rules for using our
                                services Content in Google services, which
                                describes the intellectual property rights to
                                the content you find in our services — whether
                                that content belongs to you, Google, or others
                                In case of problems or disagreements, which
                                describes other legal rights you have, and what
                                to expect in case someone violates these terms
                                Understanding these terms is important because,
                                by using our services, you’re agreeing to these
                                terms. Besides these terms, we also publish a
                                Privacy Policy. Although it’s not part of these
                                terms, we encourage you to read it to better
                                understand how you can update, manage, export,
                                and delete your information
                            </Text>
                        </ScrollView>
                    </View>

                    <Pressable
                        style={styles.continueButton}
                        onPress={() => {
                            onClick(false);
                            console.log('mu hahaha');
                        }}
                    >
                        <Text style={styles.buttontextStyle}>Continue</Text>
                        <Ionicons
                            name={'md-arrow-forward-circle-outline'}
                            size={30}
                            color={colorList.secondary}
                            style={styles.iconDesign}
                        />
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 0,
        padding: 25,
        backgroundColor: 'rgba(100,100,100,0.8)',
    },
    modalView: {
        // margin: 20,
        height: '100%',
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 20,
        // padding: 35,
        paddingTop: spacing.xlg,
        paddingLeft: spacing.lg,
        paddingRight: spacing.lg,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    buttontextStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: fontConfig.md + 5,
    },
    modalHeaderText: {
        fontSize: fontConfig.xlg,
        color: colorList.primary,
    },
    termsContainer: {
        height: '80%',
        backgroundColor: '#00002230',
    },
    continueButton: {
        width: '50%',
        height: 45,
        backgroundColor: colorList.primary,
        color: colorList.secondary,
        margin: spacing.sm,
        borderRadius: spacing.sm,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    iconDesign: {
        alignSelf: 'center',
        position: 'absolute',
        right: spacing.md,
    },
});

export default Termsmodal;
