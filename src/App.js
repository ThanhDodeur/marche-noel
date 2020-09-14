import React, { useState } from "react";
import Accueil from "./components/Accueil/Accueil.js";
import Marche from "./components/Marche/Marche.js";
import "./App.css";

function App(props) {
    const [state, setState] = useState({ open: false });

    function updateState(updates) {
        setState({ ...state, ...updates });
    }

    function toggleApp() {
        setState({ open: !state.open });
    }

    return (
        <div className="page">
            {state.open ? (
                <div className="page">
                    <Marche menu=""/>
                </div>
            ) : (
                <div className="page clickable" onClick={toggleApp}>
                    <Accueil/>
                </div>
            )}
        </div>
    );
}

export default App;
