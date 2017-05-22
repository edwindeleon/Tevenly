import * as firebase from "firebase";
const config = {
    apiKey: "AIzaSyDRCDSrADpRSP-s7HIVhOT7h8dmeaFZJKE",
    authDomain: "tevenly-c0c2d.firebaseapp.com",
    databaseURL: "https://tevenly-c0c2d.firebaseio.com",
    projectId: "tevenly-c0c2d",
    storageBucket: "tevenly-c0c2d.appspot.com",
    messagingSenderId: "982065063886"
  };
  firebase.initializeApp(config);


  export const firebaseAuth = firebase.auth();
  export const firebaseDatabase = firebase.database();

  export default firebase