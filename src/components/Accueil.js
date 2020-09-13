import React, { useState } from 'react';
import logo from '../description/snowflake.svg';
import './Accueil.css';

function Accueil(props) {
  const [state, setState] = useState({ open: false });

  function updateState(updates) {
    setState({...state, ...updates})
  };

  return (
    <div class="accueil noselect">
        <img src={logo} className="App-logo" alt="logo"/>
        <p>
        Marché de Noël
        </p>
    </div>
  );
}

export default Accueil;
