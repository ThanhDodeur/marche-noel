import React, { useState } from 'react';
import logo from './snowflake.svg';
import './App.css';

function App(props) {
  const [state, setState] = useState({ open: false });

  function updateState(updates) {
    setState({...state, ...updates})
  };

  function toggleApp() {
    setState({ open: !state.open });
  }

  return (
    <div className="page">
      <header/>
      {state.open ? (
        <div>
          <p onClick={toggleApp}>
            retour
          </p>
        </div>
      ) : (
        <div class="page">
          <img src={logo} className="App-logo" alt="logo" />
          <p onClick={toggleApp}>
            Marché de Noel
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
