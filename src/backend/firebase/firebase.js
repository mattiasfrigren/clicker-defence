import dataService from './firebaseService';
import firebase from "firebase/app";
import {useContext} from 'react';
import "firebase/auth";
import "firebase/firebase-storage";
import "firebase/database";
import PlayerContext from '../../frontend/js/context/playerContext';
import playerContext from '../../frontend/js/context/playerContext';



 function SetDamage() {

    const playerContext = useContext(PlayerContext);

 let damage =1;
  console.log(damage)
   dataService.getAll().child("admin").child("damage").on("value").then(function(snap){
       console.log(snap.val()) 
       
   })
console.log(damage)
}


