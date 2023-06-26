// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API,
  authDomain: "project-kode48.firebaseapp.com",
  projectId: "project-kode48",
  storageBucket: "project-kode48.appspot.com",
  messagingSenderId: "391756532090",
  appId: "1:391756532090:web:db057bc90a7b3dc1a7aec3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();