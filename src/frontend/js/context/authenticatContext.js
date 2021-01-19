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
      income: 0,
      money: 20,
      bombValues :
      { 
        damage : 2,
        damageMultiplyer: 2,
        costMultiplyer :1.5,
      }
    };
    dataService.create(postTemplate);
  }

  function getPlayer(user) {
   if(dataService.firebaseAuth().currentUser){
     dataService.firebaseAuth().signOut();
     console.log(dataService.firebaseAuth().currentUser)
   }
   console.log(dataService.firebaseAuth().currentUser)
   
    dataService.firebaseAuth().signInWithEmailAndPassword(user.email, user.password).then((user)=>{
     if(user.user.uid===dataService.firebaseAuth().currentUser.uid){
       setAuthenticated(true)
       
     }
    }).catch((error)=>{
      console.log(error.message)
      return error.message;
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
