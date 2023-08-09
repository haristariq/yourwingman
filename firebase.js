// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

// Your web app's Firebase configuration
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

// Function to handle logout
const logout = () => {
  signOut(auth).then(() => {
    console.log('User signed out!');
  }).catch((error) => {
    console.log('Error signing out: ', error);
  });
};

// Function to get ID token
const getIdToken = () => {
  return auth.currentUser.getIdToken();
};

export { app, auth, logout, getIdToken };