import React, { useState, useEffect } from 'react';
import {
    Alert,
    Modal,
    StyleSheet,
    Text,
    Pressable,
    View,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { colorList, fontConfig, spacing } from '../../config';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const Termsmodal = ({ onClick, isVisible }) => {
    const [toggleCheckBox, setToggleCheckBox] = useState(false);
    const [warn, setwarn] = useState(false);

    useEffect(() => {
        if (toggleCheckBox) {
            setwarn(false);
        }
    }, [toggleCheckBox]);

    const onSubmit = () => {
        onClick();
    };

    const onCheck = () => {
        setToggleCheckBox(!toggleCheckBox);
        // if (toggleCheckBox) {
        //     setwarn(false);
        // }
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            // onRequestClose={() => {
            //     Alert.alert('Modal has been closed.');
            //     // setModalVisible(!modalVisible);
            // }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalHeaderText}>Privacy Policy</Text>
                    <View style={styles.termsContainer}>
                        <ScrollView>
                            <Text style={styles.termsText}>
                                CUETBusKoi prodives the location of CUET buses
                                based on users shared location data.
                            </Text>
                            <Text style={styles.termsText}>
                                It is a crowd source based app. So it will
                                perform better if there are more active users.
                            </Text>
                            <Text style={styles.termsText}>
                                We will collect your location data as long as
                                you share it. We don't collect anthing other
                                than location data.
                            </Text>
                        </ScrollView>
                    </View>

                    <Pressable
                        style={styles.continueButton}
                        onPress={() => {
                            // onClick(false);
                            onSubmit();
                            //console.log('mu hahaha');
                        }}
                    >
                        <Text style={styles.buttontextStyle}>CONTINUE</Text>
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
        height: '55%',
        width: '100%',
        backgroundColor: colorList.secondary,
        borderRadius: 20,
        // padding: 35,
        paddingTop: spacing.lg,
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
        fontSize: fontConfig.md + 1,
    },
    modalHeaderText: {
        fontSize: fontConfig.xlg,
        color: colorList.primary,
        fontWeight: 'bold',
    },
    termsContainer: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0.4)',
        borderWidth: 1,
        borderRadius: spacing.md,
        padding: spacing.lg,
        margin: spacing.md,
    },
    termsText: {
        textAlign: 'justify',
        fontSize: fontConfig.md + 3,
        marginTop: spacing.md,
        color: colorList.primary,
    },
    continueButton: {
        // width: '50%',
        height: 45,
        backgroundColor: colorList.primary,
        color: colorList.secondary,
        margin: spacing.md,
        borderRadius: spacing.sm,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        // position: 'relative',
        // bottom: spacing.md,
        paddingLeft: spacing.md,
        paddingRight: spacing.md,
    },
    iconDesign: {
        // alignSelf: 'center',
        // position: 'absolute',
        // right: spacing.md,
    },
    checkBoxContainer: {
        width: '90%',
        color: colorList.primary,
        flexDirection: 'row',
        // margin: spacing.md,
        marginLeft: spacing.md,
        marginRight: spacing.md,
        marginTop: spacing.md,
        marginBottom: 0,
        // padding: spacing.sm,
    },
    submitError: {
        fontSize: fontConfig.sm,
        color: colorList.warning,
        position: 'relative',
        top: 0,
    },
});

export default Termsmodal;
