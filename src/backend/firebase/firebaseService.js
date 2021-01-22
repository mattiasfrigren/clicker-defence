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

const resetValues =(uid) =>{
  return DB.ref("players/" + uid).update({
    criticalChance: 0,
    damage: 1,
    health: 20,
    money: 20,
    lightningStrikes :5,
    upgradeValues:{
      healthMultiplyer:1.5,
      critMultiplyer:2,
      dmgMultiplyer :1.5,
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
  }
  )
}

export default {
  resetValues,
  firebaseAuth,
  create,
  update,
  getPlayerAttribute,
  getCurrentPlayer,
  updateItemValues,
};
