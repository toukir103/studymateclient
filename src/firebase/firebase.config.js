// Import the functions you need from the SDKs you need


import { getAuth, GoogleAuthProvider } from "firebase/auth";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAb1aP6e6F7V-LZNLyyTl2SWZGKWBRKfKU",
  authDomain: "toytopia-db33e.firebaseapp.com",
  projectId: "toytopia-db33e",
  storageBucket: "toytopia-db33e.firebasestorage.app",
  messagingSenderId: "184940836573",
  appId: "1:184940836573:web:5765074338edb62cd64d34"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();