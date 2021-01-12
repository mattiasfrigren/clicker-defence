import React, { useState,  useContext } from "react";
import { NavLink } from "react-router-dom";
import {PlayerContext} from '../context/playerContext';

const Register = () => {

    const playerContext = useContext(PlayerContext);

  const [user, setUser] = useState({
    userName: "",
    password: "",
    password2: "",
    email: "",
  });

  const [infoMessage, setInfoMessage] = useState("");

  const change = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log(user);
  };

  const onRegistration =(e)=>{
    e.preventDefault();
    if(user.password!==user.password2){
        setInfoMessage("Both passwords must be exactly the same")
        return;
    }
    if(!user.userName || !user.password || !user.password2 || !user.email){
        setInfoMessage("all fields must be filled out");
        return;
    }

    else {
        const data ={
            userName: user.userName,
            password : user.password,
            email: user.email,
        }

        playerContext.createNewPlayer(data);
        setInfoMessage("account Created!")
    }
console.log(e);
  }

  return (
    <div>
      <h1>Register</h1>
      <form>
        <input
          type="text"
          name="userName"
          placeholder="UserName"
          value={user.userName}
          onChange={change}
        ></input>

        <input
          type="password"
          name="password"
          placeholder="PassWord"
          value={user.passWord}
          onChange={change}
        ></input>

        <input
          type="password"
          name="password2"
          placeholder="PassWord2"
          value={user.passWord2}
          onChange={change}
        ></input>

        <input
          type="text"
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={change}
        ></input>
        <button
            onClick ={onRegistration}
            type="submit"
            >
            </button>
      </form>
      {infoMessage && <p>{infoMessage}</p>}
      <NavLink to="/">To Login</NavLink>
    </div>
  );
};

export default Register;
