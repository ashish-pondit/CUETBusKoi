import React, { useState, useEffect, useRef } from 'react';
import {
    Button,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from 'react-native';
import { colorList, spacing } from '../../config';

import RNMapView, { Circle, Marker } from 'react-native-maps';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Warningmessage = () => {
    return (
        <View>
            <Text>
                Sorry, this bus location is unknown. Please try again later.
            </Text>
        </View>
    );
};

const Mapview = ({ route }) => {
    //console.log('printing inside map view');
    ////console.log(route.params);
    const { currentBus, data } = route.params;
    //console.log(currentBus);
    //console.log('all data');
    //console.log(data[0].location[0].latitude);
    const curBusname = currentBus.busName;
    var targetBusdata;
    const mapRef = useRef(null);

    const markerList = (alldata, target) => {
        var markerArray = [];
        targetBusdata = alldata[0];
        let i = 0;
        for (i = 0; i < alldata.length; i++) {
            //console.log('why this colabary');
            //console.log(alldata[i]);

            ////console.log('printing console logic ');
            ////console.log(alldata[i].busName);
            ////console.log(alldata[i].busName === target);

            if (
                alldata[i].location[0].latitude !== 0 &&
                alldata[i].location[0].longitude !== 0
            ) {
                if (alldata[i].busName === target) {
                    targetBusdata = alldata[i];
                    // markerArray.push(
                    //     <Marker
                    //         anchor={{ x: 0.5, y: 0.65 }}
                    //         coordinate={{
                    //             latitude: alldata[i].location[0].latitude,
                    //             longitude: alldata[i].location[0].longitude,
                    //         }}
                    //         key={i}
                    //     >
                    //         <View style={styles.markerContainer}>
                    //             <View style={styles.markerNameView}>
                    //                 <Text style={styles.markerName}>
                    //                     {alldata[i].busName}
                    //                 </Text>
                    //             </View>
                    //             <View style={styles.markerJoin} />
                    //             <View style={styles.dotGreen}>
                    //                 {/* <Text>padma</Text> */}
                    //             </View>
                    //         </View>
                    //     </Marker>,
                    // );
                } else {
                    markerArray.push(
                        <Marker
                            anchor={{ x: 0.5, y: 0.65 }}
                            coordinate={{
                                latitude: alldata[i].location[0].latitude,
                                longitude: alldata[i].location[0].longitude,
                            }}
                            key={i}
                        >
                            <View style={styles.markerContainer}>
                                <View style={styles.markerNameView}>
                                    <Text style={styles.markerName}>
                                        {alldata[i].busName}
                                    </Text>
                                </View>
                                <View style={styles.markerJoin} />
                                <View style={styles.dotBlue}>
                                    {/* <Text>padma</Text> */}
                                </View>
                            </View>
                        </Marker>,
                    );
                }
            }
        }

        //console.log('printing markerlist array output');
        //console.log(markerArray);
        //console.log('checking again bus name');
        //console.log(targetBusdata);

        markerArray.unshift(
            <Marker
                anchor={{ x: 0.5, y: 0.5 }}
                coordinate={{
                    latitude: targetBusdata.location[0].latitude,
                    longitude: targetBusdata.location[0].longitude,
                }}
                key={i}
            >
                <View style={[styles.markerContainer]}>
                    <View style={styles.markerNameView}>
                        <Text style={styles.markerName}>
                            {targetBusdata.busName}
                        </Text>
                    </View>
                    <View style={styles.markerJoin} />
                    <View style={styles.dotGreen}></View>
                </View>
            </Marker>,
        );

        return markerArray;
    };
    const mrkrLst = markerList(data, curBusname);

    return (
        <View style={{ flex: 1 }}>
            {(currentBus.location[0].latitude === 0,
            currentBus.location[0].longitude === 0) ? (
                <Warningmessage />
            ) : (
                <RNMapView
                    ref={mapRef}
                    initialCamera={{
                        altitude: 500,
                        center: {
                            latitude: currentBus.location[0].latitude,
                            longitude: currentBus.location[0].longitude,
                        },
                        heading: 0,
                        pitch: 0,
                        zoom: 11,
                    }}
                    loadingEnabled
                    loadingBackgroundColor={colorList.secondary}
                    style={StyleSheet.absoluteFillObject}
                    rotateEnabled={false}
                >
                    {mrkrLst}
                </RNMapView>
            )}

            <MaterialCommunityIcons
                style={styles.gps}
                size={50}
                name="bus"
                onPress={() =>
                    mapRef.current.animateCamera({
                        center: {
                            latitude: targetBusdata.location[0].latitude,
                            longitude: targetBusdata.location[0].longitude,
                        },
                        heading: 0,
                        zoom: 16,
                    })
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    dotContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    dotBlue: {
        backgroundColor: 'rgb(0, 120, 255)',
        width: 24,
        height: 24,
        borderWidth: 2,
        borderColor: colorList.primary,
        borderRadius: 20,
        shadowColor: 'black',
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.3,
        shadowRadius: 1.5,
        elevation: 4,
    },
    dotGreen: {
        backgroundColor: 'rgb(50, 180, 50)',
        width: 24,
        height: 24,
        borderWidth: 2,
        borderColor: colorList.primary,
        borderRadius: 20,
        shadowColor: 'black',
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.3,
        shadowRadius: 1.5,
        elevation: 4,
    },

    arrow: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 6,
        borderRightWidth: 6,
        borderBottomWidth: 10,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: 'rgb(0, 120, 255)',
    },
    markerContainer: {
        alignItems: 'center',
    },
    markerNameView: {
        backgroundColor: colorList.primary,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'white',
        shadowOpacity: 0.3,
        shadowRadius: 1.5,
        elevation: 4,
    },
    markerName: {
        fontSize: 20,
        color: 'white',
        margin: spacing.sm,
    },
    markerJoin: {
        height: 10,
        width: 5,
        backgroundColor: colorList.primary,
    },
    gps: {
        position: 'absolute',
        top: 5,
        right: 5,
        borderWidth: 0.5,
        borderRadius: 5,
        backgroundColor: 'white',
        color: colorList.primary,
    },
});

export default Mapview;
