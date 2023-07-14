import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCuBAIQ0gGIO4ts4ucaTMmneCoObhhH1s4",
    authDomain: "kode-48-373e9.firebaseapp.com",
    databaseURL: "https://kode-48-373e9-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "kode-48-373e9",
    storageBucket: "kode-48-373e9.appspot.com",
    messagingSenderId: "180923264231",
    appId: "1:180923264231:web:3c9ab9546d2805441a0642",
    measurementId: "G-1XXYPWBFHM"
  };

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

export const database = firebase.database();

export const firestore = firebase.firestore();

export const storage = firebase.storage();

export default firebase;