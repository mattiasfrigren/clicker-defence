import React, { useState,  useContext } from "react";
import '../../css/startpage.css'
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/authenticatContext";

const Register = () => {

    const authContext = useContext(AuthContext);

  const [user, setUser] = useState({
    userName: "",
    password: "",
    password2: "",
    email: "",
  });

  const [infoMessage, setInfoMessage] = useState("");

  const change = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
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

        authContext.createNewPlayer(data);
        setInfoMessage("account Created!")
    }
  }

  return (
    <div className="startDiv">
    <div className="startcontainer">
      <div className="navbar">
    <NavLink className="startlinks" to="/">To Login</NavLink>
    </div>
    <h1>Clicker Defence</h1>
      <h1>Register</h1>
      <form>
        <label htmlFor="uName">Username</label>
        <input
          type="text"
          name="userName"
          placeholder="username"
          value={user.userName}
          onChange={change}
        ></input>
<label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="password"
          value={user.passWord}
          onChange={change}
        ></input>
<label htmlFor="password2">Confirm Password</label>
        <input
          type="password"
          name="password2"
          placeholder="password"
          value={user.passWord2}
          onChange={change}
        ></input>
  <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          placeholder="email"
          value={user.email}
          onChange={change}
        ></input>
      
      </form>
      <button
        className="submit"
            onClick ={onRegistration}
            type="submit"
            >
              Register
            </button>
      {infoMessage && <p>{infoMessage}</p>}
      
    </div>
    <small className="creatorinfo" >Mattias Frigren <br/> mattiasfrigren@gmail.com</small>
    </div>
  );
};

export default Register;
