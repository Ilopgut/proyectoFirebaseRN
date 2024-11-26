// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCnvbwtVUNera0oKPhKZaQx52XIA05trvg",
  authDomain: "rnbddam-63076.firebaseapp.com",
  projectId: "rnbddam-63076",
  storageBucket: "rnbddam-63076.firebasestorage.app",
  messagingSenderId: "105486781699",
  appId: "1:105486781699:web:f194892ba471f7cdc32d36",
  measurementId: "G-DV00RKP7BY"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_ANALYTICS = getAnalytics(FIREBASE_APP);