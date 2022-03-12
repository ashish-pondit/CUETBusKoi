export const fontConfig = {
    sm: 10,
    md: 15,
    lg: 25,
    xlg: 30,
    xxlg: 35,
};

export const colorList = {
    primary: '#4d0000',
    primarySoft: '#800000',
    secondary: '#f9f4e6',
    darkSoft: '#8a8f8a',
    primaryXsoft: '#FFEDDB',
    primaryMsoft: '#ffcccc',
};

export const spacing = {
    sm: 5,
    md: 10,
    lg: 15,
    xlg: 25,
    xxlg: 35,
};

export const getBackgroundConfig = busName => {
    const backgroundConfig = {
        taskName: 'BusKoi',
        taskTitle: 'BusKoi',
        taskDesc: 'Sharing Your Location (' + busName + ')',
        taskIcon: {
            name: 'ic_launcher',
            type: 'mipmap',
        },
        color: '#ff00ff',
        linkingURI: 'CUET-BusKoi://MainActivity',
        parameters: {
            delay: 1000,
        },
    };
    return backgroundConfig;
};

import firebase from 'firebase/compat/app';

// Initialize Firebase
const firebaseConfig = {
    apiKey: 'AIzaSyAPhZapMsiQVMsIGHPBK3B4qSaq8FuxXZk',
    authDomain: 'buskoi-4a80b.firebaseapp.com',
    databaseURL: 'https://buskoi-4a80b-default-rtdb.firebaseio.com/',
    projectId: 'buskoi-4a80b',
    storageBucket: 'buskoi-4a80b.appspot.com',
    messagingSenderId: '724557794793',
    appId: '1:724557794793:android:518a64dbd302e74d374f78',
};
const Firebase = firebase.initializeApp(firebaseConfig);

export default Firebase;
