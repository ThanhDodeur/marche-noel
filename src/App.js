import React, { useState } from "react";
import { useDarkMode } from "./utils/hooks.js";
import Accueil from "./components/Accueil/Accueil.js";
import Marche from "./components/Marche/Marche.js";
import "./App.css";

function App(props) {
    const [state, setState] = useState({ open: false });
    const [mode, setMode] = useDarkMode();

    function openApp() {
        setState({ open: true });
    }

    return (
        <div className={`page ${mode}`}>
            {state.open ? (
                <Marche/>
            ) : (
                <div className="page accueil-wrapper" >
                    <div role='button' className='light-icon-wrapper clickable noselect' onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}>
                    <i className={'light-icon fa ' + (mode === 'light' ? 'fa-moon-o' : 'fa-sun-o')}></i>
                    </div>
                    <Accueil callBack={openApp}/>
                </div>
            )}
        </div>
    );
}

export default App;
