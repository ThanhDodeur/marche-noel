import React, { useState } from "react";
import Accueil from "./components/Accueil/Accueil.js";
import Marche from "./components/Marche/Marche.js";
import "./App.css";

function App(props) {
    const [state, setState] = useState({ open: false });
    const [light, setLight] = useState(false);

    function openApp() {
        setState({ open: true });
    }

    return (
        <div className={'page ' + (light ? 'light' : 'dark')}>
            {state.open ? (
                <Marche/>
            ) : (
                <div className="page accueil-wrapper" >
                    <div role='button' className='light-icon-wrapper clickable noselect' onClick={() => setLight(!light)}>
                    <i className={'light-icon fa ' + (light? 'fa-moon-o' : 'fa-sun-o')}></i>
                    </div>
                    <Accueil callBack={openApp}/>
                </div>
            )}
        </div>
    );
}

export default App;
