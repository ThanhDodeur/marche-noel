import React from "react";
import logo from "../../description/snowflake.svg";
import "./Accueil.css";

function Accueil(props) {

    return (
        <div className="accueil noselect">
            <img src={logo} className="App-logo" alt="logo" />
            <p>Marché de Noël</p>
        </div>
    );
}

export default Accueil;
