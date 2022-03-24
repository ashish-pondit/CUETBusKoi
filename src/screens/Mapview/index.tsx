import React, { useState, useEffect, useRef } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from 'react-native';
import { colorList } from '../../config';

import RNMapView, { Circle, Marker } from 'react-native-maps';

const Mapview = ({ route }) => {
    console.log('printing inside map view');
    // console.log(route.params);
    const { currentBus, data } = route.params;
    console.log(currentBus);
    console.log('all data');
    console.log(data[0].location[0].latitude);
    const curBusname = currentBus.busName;

    const mapRef = useRef(null);

    const markerList = (alldata, target) => {
        var markerArray = [];

        for (let i = 0; i < alldata.length; i++) {
            console.log('whay this colabary');
            console.log(alldata[i]);
            // console.log(alldata[i].location[i].latitude);
            // console.log(alldata[i].location[i].longitude);
            var lt = alldata[i].location[0].latitude;
            var lg = alldata[i].location[0].longitude;
            // if (lt + lg !== 0) {
            // }
            if (alldata[i].busName === target) {
                markerArray.push(
                    <Marker
                        anchor={{ x: 0.5, y: 0.6 }}
                        coordinate={{
                            latitude: alldata[i].location[0].latitude,
                            longitude: alldata[i].location[0].longitude,
                        }}
                        key={i}
                    >
                        <View style={styles.dotGreen}>
                            {/* <Text>padma</Text> */}
                        </View>
                    </Marker>,
                );
            } else {
                markerArray.push(
                    <Marker
                        anchor={{ x: 0.5, y: 0.6 }}
                        coordinate={{
                            latitude: alldata[i].location[0].latitude,
                            longitude: alldata[i].location[0].longitude,
                        }}
                        key={i}
                    >
                        <View style={styles.dotBlue}>
                            {/* <Text>padma</Text> */}
                        </View>
                    </Marker>,
                );
            }
        }

        return markerArray;
    };

    return (
        <View style={{ flex: 1 }}>
            <RNMapView
                ref={mapRef}
                initialCamera={{
                    altitude: 1500,
                    center: {
                        latitude: 22.4616622,
                        longitude: 91.969816,
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
                {/* {markerList(data, curBusname)} */}
                <Marker
                    anchor={{ x: 0.5, y: 0.6 }}
                    coordinate={{
                        latitude: 22.4616622,
                        longitude: 91.969816,
                    }}
                >
                    <View style={styles.dotBlue}>
                        {/* <Text>padma</Text> */}
                    </View>
                </Marker>
                {/* <Marker
                    anchor={{ x: 0.5, y: 0.6 }}
                    coordinate={{
                        latitude: 22.4616622,
                        longitude: 91.969816,
                    }}
                >
                    <View style={styles.dotGreen}></View>
                </Marker> */}
            </RNMapView>
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
        borderWidth: 3,
        borderColor: 'white',
        borderRadius: 12,
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
});

export default Mapview;
