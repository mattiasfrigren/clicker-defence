import React from 'react';
import ReactDOM from 'react-dom';
import PlayerContext from './frontend/js/context/playerContext';
import AuthContext from './frontend/js/context/authenticatContext'

import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <AuthContext>
  <PlayerContext>
    <App />
    </PlayerContext>
    </AuthContext>
    </React.StrictMode>,
  document.getElementById('root')
);


