const { initializeApp } = require('firebase/app');
const { getDatabase, ref, set } = require('firebase/database');

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);

function writeUserData(userId, name, email, imageUrl) {
    const db = getDatabase();
    const reference = ref(db, 'users/' + userId);

    set(reference, {
        username: name,
        email: email,
        profile_picture : imageUrl
    });
    console.log('success');
}

writeUserData('matthieu', 'matthlamenace', 'emailtest@mail.com', 'imageURL');