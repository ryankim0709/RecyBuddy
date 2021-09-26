import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyBgPXroPoEIketXV4OykI3HqeLVLWLvFts",
    authDomain: "climacool2-7a5c6.firebaseapp.com",
    databaseURL: "https://climacool2-7a5c6-default-rtdb.firebaseio.com",
    projectId: "climacool2-7a5c6",
    storageBucket: "climacool2-7a5c6.appspot.com",
    messagingSenderId: "148730733442",
    appId: "1:148730733442:web:eccca1096f8d037eeb259b",
    measurementId: "G-23CW2Q91Q9"
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
 }
 
export default firebase.database();