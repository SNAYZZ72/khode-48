import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDQKcZCvHteJEttXaQ8fTncuK_x83nCuDQ",
  authDomain: "project-kode48.firebaseapp.com",
  projectId: "project-kode48",
  storageBucket: "project-kode48.appspot.com",
  messagingSenderId: "391756532090",
  appId: "1:391756532090:web:db057bc90a7b3dc1a7aec3"
};

firebase.initializeApp(firebaseConfig);

export const storage = firebase.storage();

export const db = firebase.firestore();

export const auth = firebase.auth();

export const database = firebase.database();

export default firebase;