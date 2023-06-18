// Import the functions you need from the SDKs you need
import firebase from "@firebase/app";
import "@firebase/auth";
import "@firebase/storage";
import "@firebase/firestore";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAvZbSvWR_xiBP14Vn_875woJd5z4MD2H0",
  authDomain: "fir-auth-26ac4.firebaseapp.com",
  projectId: "fir-auth-26ac4",
  storageBucket: "fir-auth-26ac4.appspot.com",
  messagingSenderId: "1032800074058",
  appId: "1:1032800074058:web:e99454a2e03845b14169b3",
  measurementId: "G-DJWWJQ8CXD",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const firestore = firebase.firestore(); // database
const fireStorage = firebase.storage(); // storage
// const fireAuth = firebase.auth(); // Authentication

export { firestore, fireStorage };
