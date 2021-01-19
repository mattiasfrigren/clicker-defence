import firebase from "../data/fbconfig";

const DB = firebase.database();

const firebaseAuth = () => {
  return firebase.auth();
};

const getPlayerAttribute = (uid, attribute) => {
  return DB.ref("players/" + uid).child(attribute);
};

const getCurrentPlayer = (uid) => {
  return DB.ref("players/" + uid);
};

const create = async (data) => {
  try {
    const user = await firebase
      .auth()
      .createUserWithEmailAndPassword(data.email, data.password);
    console.log(user.user.uid);
    data.uid = user.user.uid;
    firebase
      .database()
      .ref("players/" + user.user.uid)
      .set(data)
      .catch((error) => {
        console.log(error.message);
      });
  } catch (error) {
    console.log(error.message);
  }
};

const updateItemValues =( uid,item ,data) =>{
  return DB.ref("players/" +uid).child(item).update(data);
};

const update = (uid, data) => {
  return DB.ref("players/" + uid).update(data);
};

export default {
  firebaseAuth,
  create,
  update,
  getPlayerAttribute,
  getCurrentPlayer,
  updateItemValues,
};
