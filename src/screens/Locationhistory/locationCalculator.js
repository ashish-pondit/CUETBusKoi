//import { busData } from '../../data/busList.json';
import { locationIntervals } from '../../config';
import geocluster from './geocluster';

function getBusLocation(data) {
    var result = geocluster(data, 1.5);
    var mxL = 0,
        indx = -1;
    for (let i = 0; i < result.length; i++) {
        if (result[i]['elements'].length > mxL) {
            mxL = result[i]['elements'].length;
            indx = i;
        }
    }
    if (indx == -1)
        return [
            {
                longitude: 0,
                latitude: 0,
            },
        ];
    else {
        result[indx]['centroid'];
        return [
            {
                longitude: result[indx]['centroid'][1],
                latitude: result[indx]['centroid'][0],
            },
        ];
    }
}

function getBusLocationHistory(data) {
    locaitons = [[], [], [], [], []];
    var curr = Date.now();
    for (let i = 0; i < data.length; i++) {
        var dif = Math.abs(data[i]['timestamp'] - curr) / 1000;
        for (let t = 1; t < locationIntervals.length; t++) {
            if (
                locationIntervals[t - 1] <= dif &&
                dif <= locationIntervals[t] &&
                data[i]['latitude'] != 0
            ) {
                locaitons[t - 1].push([
                    data[i]['latitude'],
                    data[i]['longitude'],
                ]);
                break;
            }
        }
    }

    var result = [];
    for (let i = 0; i < locaitons.length; i++) {
        result.push(getBusLocation(locaitons[i])[0]);
    }
    return result;
    //return [{ longitude: 'unknown', latitude: 'unknown' }, {}, {}, {}, {}];
}

export const calculateLocation = locationData => {
    var calculatedLocation = [];
    /*for (let i = 0; i < busData.length; i++) {
        calculatedLocation.push({
            id: i,
            busName: busData[i]['busName'],
            location: 'ksdas',
        });
    }*/
    var i = 0;
    for (var bus in locationData) {
        var busData = locationData[bus];
        history = getBusLocationHistory(busData);
        calculatedLocation.push({
            id: i,
            busName: bus,
            location: history,
        });
        i++;
    }
    return calculatedLocation;
};
