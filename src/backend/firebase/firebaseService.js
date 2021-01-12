import firebase from "../data/fbconfig";


const db = firebase.database().ref().child("players");

const DB = firebase.database();

const signInPlayer = (user) => {
  if(firebase.auth().currentUser){
    firebase.auth().signOut();
    console.log(firebase.auth().currentUser)
  }
  console.log(firebase.auth().currentUser.uid)
  firebase.auth().signInWithEmailAndPassword(user.email, user.password).then((user)=>{
    
  return getCurrentPlayer(user.user.uid);
  
  }).catch((error)=>{
    console.log(error.message)
    return error.message;
  })

  console.log(firebase.auth().currentUser.uid)
  isPlayerOnline();
};

const getPlayerAttribute = (key, attribute) => {
  return db.child(key).child(attribute);
};

const getCurrentPlayer = (uid) =>{
  DB.ref("players/" +uid).once("value").then((snap)=>{
    console.log(snap.val());
    const currentPlayerValues =snap.val();
    console.log(currentPlayerValues)
    return currentPlayerValues;
  })
}
const isPlayerOnline = () =>{
  firebase.auth().onAuthStateChanged(user =>{
    if(user){
      return true;
    }
  })
}

const create = async (data) => {

  try{
    const user = await firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
    console.log(user.user.uid)
    data.uid = user.user.uid;
    firebase.database().ref("players/" + user.user.uid).set(data).catch(error=>{
      console.log(error.message)
    });
    
  } catch(error){
    console.log(error.message)
  }

};


const update = (key, data) => {
  return db.child(key).update(data);
};

const remove = (key) => {
  return db.child(key).remove();
};

const removeAll = () => {
  return db.remove();
};

export default {
  signInPlayer,
  create,
  update,
  remove,
  removeAll,
  getPlayerAttribute,
  isPlayerOnline,
};