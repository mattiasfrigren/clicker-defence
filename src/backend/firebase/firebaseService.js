import firebase from "../data/fbconfig";


const db = firebase.ref().child("players");

const getPlayer = (key) => {
  return db.child(key);
};

const getPlayerAttribute = (key, attribute) => {
  return db.child(key).child(attribute);
};

const create = (data) => {
  return db.push(data);
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
  getPlayer,
  create,
  update,
  remove,
  removeAll,
  getPlayerAttribute,
};