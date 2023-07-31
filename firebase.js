// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBkm8VhvmJHxiyDiUfKBl8Xl2cyFr1Pwa4",
    authDomain: "yourwingman.firebaseapp.com",
    projectId: "yourwingman",
    storageBucket: "yourwingman.appspot.com",
    messagingSenderId: "746469587091",
    appId: "1:746469587091:web:1c0d5b4c935dc398187566",
    measurementId: "G-5Z8QS97EDD"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };

