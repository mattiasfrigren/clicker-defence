import React, { useContext } from 'react';
import { BrowserRouter, Route} from 'react-router-dom';
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


<Route exact={true} path="/" component={Login} />

<Route exact={true} path="/register" component={Register} />

<ProtectedRoute exact={true} path="/gameplay" component={GamePlay} />

<Route exact={true} path="/404" component={FourOFour} />

    </div>
    
    </BrowserRouter>

)
};
export default Routes;