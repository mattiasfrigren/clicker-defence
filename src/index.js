import React from 'react';
import ReactDOM from 'react-dom';
import PlayerContext from './frontend/js/context/playerContext';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
  <PlayerContext>
    <App />
    </PlayerContext>
    </React.StrictMode>,
  document.getElementById('root')
);


