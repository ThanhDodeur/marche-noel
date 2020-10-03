import React, { useState, useEffect } from "react";
import Accueil from "./components/Accueil/Accueil.js";
import Marche from "./components/Marche/Marche.js";
import "./App.css";

function App(props) {
    const [state, setState] = useState({ open: false });

    function openApp() {
        setState({ open: true });
    }

    useEffect(() => {
        setTimeout(async () => {
            setState({ open: true });
        }, 15000);
        // willMount
        return () => {
            // willUnMount
        }
    }, [setState]);

    return (
        <div className="page">
            {state.open ? (
                <div className="page">
                    <Marche menu=""/>
                </div>
            ) : (
                <div className="page clickable" onClick={openApp}>
                    <Accueil/>
                </div>
            )}
        </div>
    );
}

export default App;
