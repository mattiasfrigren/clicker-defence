import React, { createContext, useState } from "react";
import dataService from "../../../backend/firebase/firebaseService";

export const AuthContext = createContext();

export default ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState(false);

  function createNewPlayer(data) {
    const postTemplate = {
      name: data.userName,
      password: data.password,
      email: data.email,
      uid: "",
      criticalChance: 0,
      damage: 1,
      health: 20,
      money: 20,
      lightningStrikes :5,
      highscore:1,
      upgradeValues:{
        healthMultiplyer:1.5,
        critMultiplyer:2,
        dmgMultiplyer :1.5,
        potionMultiplyer:1,
      },
      bombValues :
      { 
        damage : 2,
        damageMultiplyer: 2,
        costMultiplyer :0.5,
      },
      svenValues :{
        damage : 2,
        damageMultiplyer: 2,
        costMultiplyer: 0.5
      },
      minionValues:{
        coinWorthCostMultiplyer: 1,
        level: 1,
        coinWorthMultiplyer: 1,
      }
    };
    dataService.create(postTemplate);
  }

  function getPlayer(user, setErrorMessage) {
   if(dataService.firebaseAuth().currentUser){
     dataService.firebaseAuth().signOut();
   }
    dataService.firebaseAuth().signInWithEmailAndPassword(user.email, user.password).then((user)=>{
     if(user.user.uid===dataService.firebaseAuth().currentUser.uid){
       setAuthenticated(true)
       
     }
    }).catch((error)=>{
      setErrorMessage(error.message)
    })
  }
  
  function isSignIn() {
  if(dataService.firebaseAuth().currentUser){
    return true
  }
  else{return false}
  }
  
  function signOut(){
      dataService.firebaseAuth().signOut();
      setAuthenticated(false);
    
  }

  return (
    <div>
      <AuthContext.Provider
        value={{
          isAuthenticated,
          setAuthenticated,
          createNewPlayer,
          getPlayer,
          isSignIn,
          signOut,
        }}
      >
        {children}
      </AuthContext.Provider>
    </div>
  );
};
