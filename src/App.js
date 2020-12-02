import React from 'react';
import { Router, Route, Switch, Redirect} from 'react-router-dom';
import Map from './frontend/js/components/gamePlay';
import './frontend/css/style.css'
import Wave from './frontend/js/components/wave';
import Routes from './frontend/js/routes/Routes';

function App() {
  return (
    <div className="App">

<Routes/>
      {/**
    <Map/>
    <Wave/>

     */}
    </div>
  );
}

export default App;
