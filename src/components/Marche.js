import React, { useState } from 'react';
import './Marche.css';

function Marche(props) {
  const [state, setState] = useState({ open: false });

  function updateState(updates) {
    setState({...state, ...updates})
  };

  return (
    <div class="noselect">
    </div>
  );
}

export default Marche;
