import React, { useCallback, useState, useContext  } from 'react';
import {useHistory, NavLink} from 'react-router-dom';
import {PlayerContext} from '../context/playerContext';

const Login = (props) =>{

    const playerContext = useContext(PlayerContext);
    const history = useHistory();
    const [user, setUser] = useState({userName: "", passWord: ""});


    const change = (e) =>{
        setUser({...user, [e.target.name]: e.target.value});
        console.log(user);
       
    };

    const submit = async (e) =>{
        e.preventDefault();   
     const login ={email:user.userName, password:user.passWord}
     playerContext.getPlayer(login);
     if( await playerContext.isSignIn())   {
        history.push("/gameplay",user);
     }
        else{
        console.log("wrong pw or email")
    }
    }

    return (
        <div>
        <h1>Login</h1>
        <form>
            <input
            name="userName"
            placeholder="UserName"
            value={user.userName}
            onChange={change}
            >
            </input>

            <input
            type="password"
            name="passWord"
            placeholder="PassWord"
            value={user.passWord}
            onChange={change}
            >
            </input>

            
        </form>
        <button
            onClick ={submit}
            type="submit"
            >

            </button>
        <NavLink to="/register">
            Register
        </NavLink>
        </div>
    )
};

export default Login;