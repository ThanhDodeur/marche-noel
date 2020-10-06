import React from "react";
import logo from "../../description/snowflake.svg";
import "./Accueil.css";

function Accueil({ callBack }) {

    return (
        <div className="accueil noselect clickable" onClick={callBack}>
            <img src={logo} className="App-logo" alt="logo" />
            <p>Marché de Noël</p>
        </div>
    );
}

export default Accueil;
