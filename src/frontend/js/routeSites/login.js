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
            history.push("/gameplay",user);
         }
    },[authContext.isAuthenticated])

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