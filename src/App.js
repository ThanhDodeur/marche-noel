import React, { useState, useEffect } from "react";
import Accueil from "./components/Accueil/Accueil.js";
import Marche from "./components/Marche/Marche.js";
import "./App.css";

function App(props) {
    const [state, setState] = useState({ open: false });
    const [clear, setClear] = useState(false);

    function openApp() {
        setState({ open: true });
    }

    useEffect(() => {
        setTimeout(async () => {
            //setState({ open: true });
        }, 15000);
        // willMount
        return () => {
            // willUnMount
        }
    }, [setState]);

    return (
        <div className={'page ' + (clear ? 'clear' : 'dark')}>
            {state.open ? (
                <Marche/>
            ) : (
                <div className="page accueil-wrapper" >
                    <i className={'light-icon clickable fa ' + (clear? 'fa-sun-o' : 'fa-moon-o')} onClick={() => setClear(!clear)}></i>
                    <Accueil callBack={openApp}/>
                </div>
            )}
        </div>
    );
}

export default App;
