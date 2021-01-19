import React, { useContext } from 'react'
import {Route, Redirect} from 'react-router-dom';
import {AuthContext} from '../context/authenticatContext'

const ProtectedRoute = ({component:Component, ...rest}) =>{

    const authContext = useContext(AuthContext);

    

    return(
        <Route {...rest} render={
        (props) =>{
            
            if(authContext.isAuthenticated){
            return <Component {...props} />}
            else{ return( <Redirect to='/' />) }
        }
        }/>
        
    )
}

export default ProtectedRoute;
