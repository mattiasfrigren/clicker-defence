import React, {  useState, useContext, useEffect  } from 'react';
import '../../css/startpage.css'
import {useHistory, NavLink} from 'react-router-dom';
import {AuthContext} from '../context/authenticatContext';

const Login = () =>{
    const [guestPlayer, setGuestPlayer] = useState({userName: "", password: "", email: ""});
    const authContext = useContext(AuthContext);
    const history = useHistory();
    const [user, setUser] = useState({userName: "", passWord: ""});
    const [errorMessage, setErrorMessage] = useState("");

    const change = (e) =>{
        setUser({...user, [e.target.name]: e.target.value});
    };

    const submit = async (e) =>{
        e.preventDefault();   
     const login ={email:user.userName, password:user.passWord}
    await authContext.getPlayer(login,setErrorMessage);
  
    }
    const playAsGuest = (e)=>{
        e.preventDefault();
        
        e.target.disabled = true;
        let guestId = Math.floor(Math.random()*10000000);
        setGuestPlayer({userName: "Guest" + guestId, password: "guest2", email: "guest@"+guestId+".com"});
    }
    async function fetchData(){
        const loginGuest = {email: guestPlayer.email, password: guestPlayer.password};
        await authContext.getPlayer(loginGuest,setErrorMessage);
        }
    useEffect(()=>{
        if( authContext.isAuthenticated)   {
            history.push("/gameplay");
         }
    },[authContext.isAuthenticated])

    useEffect(()=>{
     
        if(guestPlayer.userName!==""&& guestPlayer.password!==""){
        authContext.createNewPlayer(guestPlayer);
        setTimeout(()=>{
            fetchData();
        },2000)
        
    }
    },[guestPlayer])

    return (
        <div className="startDiv">
        <div className ="startcontainer">
            <div className="navbar">
                
        <NavLink className="startlinks" to="/register">
          To Register
        </NavLink></div>
        <h1>Clicker Defence 1.1</h1>
        <h1>Login</h1>
        <form>
            <label htmlFor="email">Email</label>
            <input
            name="userName"
            placeholder="Email"
            value={user.userName}
            onChange={change}
            >
            </input>

            <label htmlFor="password">Password</label>
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
            <button
            className="submit"
            onClick={playAsGuest}
            type="submit"
            id="guestPlayer"
            >
                Play as guest
            </button>
        {errorMessage && <p>{errorMessage}</p>}
        </div>
        <small className="creatorinfo" >Mattias Frigren <br/> mattiasfrigren@gmail.com</small>
        </div>
    )
};

export default Login;