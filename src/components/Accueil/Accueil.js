import React, { useState } from "react";
import logo from "../../description/snowflake.svg";
import "./Accueil.css";

function Accueil(props) {
    const [state, setState] = useState({});

    function updateState(updates) {
        setState({ ...state, ...updates });
    }

    return (
        <div className="accueil noselect">
            <img src={logo} className="App-logo" alt="logo" />
            <p>Marché de Noël</p>
        </div>
    );
}

export default Accueil;
