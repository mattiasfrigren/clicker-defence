import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firebase-storage";
import "firebase/database";

 const firebaseConfig = {

    apiKey: "AIzaSyCGdYOXZqlihBex57LVEO-Qh6BS8xNhbyk",
    authDomain: "clicker-defence.firebaseapp.com",
    databaseURL: "https://clicker-defence-default-rtdb.europe-west1.firebasedatabase.app/",
    projectId: "clicker-defence",
    storageBucket: "clicker-defence.appspot.com",
    messagingSenderId: "258589122181",
    appId: "1:258589122181:web:8003f9cbdf8f09cfa393ec",
    measurementId: "G-E862P0JVXL"
};


firebase.initializeApp(firebaseConfig);

export default firebase.database();