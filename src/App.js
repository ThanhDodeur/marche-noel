import React, { useState } from 'react';
import Accueil from './components/Accueil.js';
import Marche from './components/Marche.js';
import './App.css';

function App(props) {
  const [state, setState] = useState({ open: false });

  function updateState(updates) {
    setState({...state, ...updates});
  };

  function toggleApp() {
    setState({ open: !state.open });
  }


  return(
    <div className="page">
      <nav class="navbar">
        <div class="nav-button clickable noselect" onClick={toggleApp}>
          <span>{state.open ? 'Accueil' : 'Entrer'}</span>
        </div>
      </nav>
      {state.open ? (
        <div class="page">
          <Marche/>
        </div>
      ) : (
        <div class="page">
          <Accueil/>
        </div>
      )}
      
    </div>
  );
}

export default App;
