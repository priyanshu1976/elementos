// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { Firestore, getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCE84TN7i3mC_5OJm4vsjrpzwb9zH7CiSI",
  authDomain: "elementos-website.firebaseapp.com",
  projectId: "elementos-website",
  storageBucket: "elementos-website.firebasestorage.app",
  messagingSenderId: "629613660492",
  appId: "1:629613660492:web:a5d010d08e021ed0c6e7e9",
  measurementId: "G-8K1MYEJ6QE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
