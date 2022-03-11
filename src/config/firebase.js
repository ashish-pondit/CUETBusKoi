import firebase from "firebase/compat/app";

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
