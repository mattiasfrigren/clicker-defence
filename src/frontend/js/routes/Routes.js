import React, { useContext } from 'react';
import { BrowserRouter, Switch, Redirect} from 'react-router-dom';
import GamePlay from '../routeSites/gamePlay';
import Login from '../routeSites/login';
import Register from '../routeSites/register';
import FourOFour from '../routeSites/404';
import ProtectedRoute from './ProtectedRoute';
import {AuthContext} from '../context/authenticatContext';


function Routes()  {

    const authContext = useContext(AuthContext);

    return(

    <BrowserRouter>
    <div>



<ProtectedRoute exact={true} path="/login" component={Login} />

<ProtectedRoute exact={true} path="/register" component={Register} />

<ProtectedRoute exact={true} path="/gameplay" component={GamePlay} />

<ProtectedRoute exact={true} path="/404" component={FourOFour} />

    </div>
    
    </BrowserRouter>

)
};
export default Routes;