import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAFJLknAruBAdKI20lFaEigaoTksZB5Uh4",
    authDomain: "ahmedaluminium-edf25.firebaseapp.com",
    projectId: "ahmedaluminium-edf25",
    storageBucket: "ahmedaluminium-edf25.appspot.com",
    messagingSenderId: "237035521595",
    appId: "1:237035521595:web:078abeebcad77be7317e1e",
    measurementId: "G-V44HJ2993M"
  };
//   if (!firebase.apps.length) {
//     firebase.initializeApp({});
//  }else {
//     firebase.app(); // if already initialized, use that one
//  }
firebase.initializeApp(firebaseConfig);

export default firebase;