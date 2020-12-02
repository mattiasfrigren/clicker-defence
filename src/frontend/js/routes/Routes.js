import React from 'react'
import { BrowserRouter, Router, Route, Switch, Redirect} from 'react-router-dom'
import Map from '../components/gamePlay'
import Wave from '../components/wave'

function Routes()  {
    
    return(

    <BrowserRouter>
    <div>

<Redirect to="/gameplay"/>

<Route exact={true} path="/gameplay" component={Map} />

    </div>
    
    </BrowserRouter>

)
};
export default Routes;