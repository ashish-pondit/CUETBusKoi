import React, { useEffect, useState } from 'react';
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

import Firebase from '../../config';
import { getDatabase, set, get, ref, child } from 'firebase/database';

function storeLocationNameFb(latlon: string, street: string, place: string) {
    latlon = latlon.replace('.', '_');
    latlon = latlon.replace('.', '_');
    var data = {
        place: place,
        street: street,
    };
    const db = getDatabase(Firebase);
    const dref = ref(db, 'ReverseGeocoding/' + latlon);
    set(dref, data);
}

interface BusinfoProps {
    busInfo: { id: number; busName: string; location: any };
    time: number;
    locationPress: any;
    allBus: any;
    onCardPress: any;
}

var isMapAvailable = false;
function getLastTime(busData: any, time: number) {
    var loc = busData.location;
    if (time != -1) {
        if (time == 0) {
            isMapAvailable = true;
            return 'now';
        } else {
            isMapAvailable = false;
            return 'updated ' + time + ' min ago';
        }
    } else {
        for (let i = 0; i < loc.length; i++) {
            if (loc[i]['longitude'] != 0 && loc[i]['latitude'] != 0) {
                if (i == 0) {
                    isMapAvailable = true;
                    return 'now';
                } else {
                    isMapAvailable = false;
                    return 'updated ' + i + ' min ago';
                }
            }
        }
    }
}

const BusLocationCard = ({
    busInfo,
    time,
    locationPress,
    allBus,
    onCardPress,
}: BusinfoProps) => {
    function getPlaceNameFromAPI(lat: number, lon: number) {
        //console.log('wating for Firebase');
        var latlon = lat.toPrecision(6) + ',' + lon.toPrecision(6);
        latlon = latlon.replace('.', '_');
        latlon = latlon.replace('.', '_');

        get(
            child(ref(getDatabase(Firebase)), 'ReverseGeocoding/' + latlon),
        ).then(snapshot => {
            var data = snapshot.val();
            try {
                var placename = data['street'] + ',' + data['place'];
                setPlaceName(placename);
                setPlaceFound(true);
                //console.log('Reverse Geocoding using Firebase');
            } catch {
                //console.log('not found on Firebase. Reverse Geocoding using geoapify');
                var requestOptions = {
                    method: 'GET',
                };
                fetch(
                    'https://api.geoapify.com/v1/geocode/reverse?lat=' +
                        lat +
                        '&lon=' +
                        lon +
                        '&apiKey=64f418d0c9284a559d444979fa4435b4',
                    requestOptions,
                )
                    .then(response => response.json())
                    .then(result => {
                        setPlaceFound(true);
                        var place = result['features'][0]['properties'];
                        //console.log(place['street'] + ', ' + place['name']);
                        setPlaceName(place['street'] + ', ' + place['name']);
                        storeLocationNameFb(
                            lat.toPrecision(6) + ',' + lon.toPrecision(6),
                            place['street'],
                            place['name'],
                        );
                    })
                    .catch(error => {
                        setPlaceName(
                            lat.toFixed(4) +
                                String.fromCharCode(176) +
                                'N, ' +
                                lon.toFixed(4) +
                                String.fromCharCode(176) +
                                'E',
                        );
                        setPlaceFound(true);
                    });
            }
        });
    }

    function getPlaceName(busData: any, time: number) {
        var loc = busData.location;
        if (time != -1) {
            //return loc['longitude'] + ' ' + loc['latitude'];
            if (loc[time]['longitude'] === 0 || loc[time]['latitude'] === 0) {
                setPlaceName('Unknown');
                setPlaceFound(true);
                return;
            } else {
                getPlaceNameFromAPI(
                    loc[time]['latitude'],
                    loc[time]['longitude'],
                );
                return;
            }
        } else if (time === -1) {
            var i = 0;
            for (; i < loc.length; i++) {
                if (loc[i]['longitude'] != 0 && loc[i]['latitude'] != 0) {
                    time = i;
                    getPlaceNameFromAPI(
                        loc[time]['latitude'],
                        loc[time]['longitude'],
                    );
                    return;
                }
            }
            if (i == 5) {
                setPlaceName('Unknown');
                setPlaceFound(true);
            }
        }
    }

    const [placeFound, setPlaceFound] = useState<boolean>(false);
    const [placeName, setPlaceName] = useState<string>('Unknown');
    useEffect(() => {
        getPlaceName(busInfo, time);
    }, [busInfo]);
    ////console.log(busInfo);
    return (
        <View style={styles.continer}>
            <TouchableOpacity
                style={styles.containerText}
                onPress={() => {
                    //console.log(allBus);
                    onCardPress(busInfo, allBus);
                }}
            >
                <Text style={styles.busNameTxt}>{busInfo.busName}</Text>
                <View style={styles.containerLoc}>
                    <Text style={styles.locationTxt}>
                        {placeFound ? placeName : 'Unknown'}
                    </Text>

                    <Text style={styles.updateTimeTxt}>
                        {getLastTime(busInfo, time)}
                    </Text>
                </View>
            </TouchableOpacity>
            {isMapAvailable == true && placeName != 'Unknown' ? (
                <TouchableOpacity
                    style={styles.locationIconBox}
                    onPress={() => {
                        locationPress(busInfo, allBus);
                    }}
                >
                    <Icon
                        name="location"
                        size={35}
                        color={colorList.primaryXsoft}
                    />
                </TouchableOpacity>
            ) : null}
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
        maxWidth: '85%',
        minWidth: '85%',
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
