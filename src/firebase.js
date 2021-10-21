import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBvifwQpOeEDiQoiUXWlNYoVA_P_wcGMd0",
  authDomain: "challenge-d0cb1.firebaseapp.com",
  projectId: "challenge-d0cb1",
  storageBucket: "challenge-d0cb1.appspot.com",
  messagingSenderId: "769264478153",
  appId: "1:769264478153:web:cad6844014405a6ff26a18",
  measurementId: "G-V7RYR4WNPZ",
};

//initialize the app
const firebaseApp = firebase.initializeApp(firebaseConfig);

//initialize the DB
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
