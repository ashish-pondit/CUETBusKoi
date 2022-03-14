//import { busData } from '../../data/busList.json';

function getBusLocation(data) {
    //console.log(data);

    return [{ longitude: 'unknown', latitude: 'unknown' }, {}, {}, {}, {}];
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
        history = getBusLocation(busData);
        calculatedLocation.push({
            id: i,
            busName: bus,
            location: history,
        });
        i++;
    }
    return calculatedLocation;
};
