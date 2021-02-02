import React, {  useState, useContext, useEffect  } from 'react';
import {useHistory, NavLink} from 'react-router-dom';
import {AuthContext} from '../context/authenticatContext';

const Login = () =>{

    const authContext = useContext(AuthContext);
    const history = useHistory();
    const [user, setUser] = useState({userName: "", passWord: ""});
  
    const change = (e) =>{
        setUser({...user, [e.target.name]: e.target.value});
        console.log(user);
    };

    const submit = async (e) =>{
        e.preventDefault();   
     const login ={email:user.userName, password:user.passWord}
    await authContext.getPlayer(login);
  
    console.log(authContext.isAuthenticated)
    }

    useEffect(()=>{
        if( authContext.isAuthenticated)   {
            history.push("/gameplay");
         }
    },[authContext.isAuthenticated])

    return (
        <div className="startDiv">
        <div className ="startcontainer">
            <div className="navbar">
                
        <NavLink className="startlinks" to="/register">
          To Register
        </NavLink></div>
        <h1>Clicker Defence</h1>
        <h1>Login</h1>
        <form>
            <label for="email">Email</label>
            <input
            name="userName"
            placeholder="Email"
            value={user.userName}
            onChange={change}
            >
            </input>

            <label for ="password">Password</label>
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
        className="submit"
            onClick ={submit}
            type="submit"
            >
                Login
            </button>
        
        </div>
        </div>
    )
};

export default Login;