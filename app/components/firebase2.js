import * as firebase from "firebase";
const config = {
    apiKey: "xxx",
    authDomain: "xxx",
    databaseURL: "xxx",
    projectId: "xxx",
    storageBucket: "xxxxxx"
  };
  firebase.initializeApp(config);


  export const firebaseAuth = firebase.auth();
  export const firebaseDatabase = firebase.database();

  export default firebase