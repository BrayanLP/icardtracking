
import firebase from 'firebase/firebase';
// import firestore from 'firebase/firestore'
// const settings = { timestampsInSnapshots: true };
const config = {
   apiKey: "AIzaSyDdtDDNW2_Fd5zYNAyL4h7A8fdbmVA59uo",
   authDomain: "icardtracking.firebaseapp.com",
   databaseURL: "https://icardtracking.firebaseio.com",
   projectId: "icardtracking",
   storageBucket: "",
   messagingSenderId: "829952057729",
   appId: "1:829952057729:web:bf6b86990560ae14"
};
// console.log(firebase.apps)
// if (!firebase.apps.length) {
// }
firebase.initializeApp(config);
// firebase.firestore().settings(settings);
// const auth = firebase.auth();
const Database = firebase.database();
const Firestore = firebase.firestore();

export {
   // auth,
   Database,
   Firestore
}