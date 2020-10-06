import React, { useState } from "react";
import Accueil from "./components/Accueil/Accueil.js";
import Marche from "./components/Marche/Marche.js";
import "./App.css";

function App(props) {
    const [state, setState] = useState({ open: false });
    const [clear, setClear] = useState(false);

    function openApp() {
        setState({ open: true });
    }

    return (
        <div className={'page ' + (clear ? 'clear' : 'dark')}>
            {state.open ? (
                <Marche/>
            ) : (
                <div className="page accueil-wrapper" >
                    <div className='light-icon-wrapper clickable noselect' onClick={() => setClear(!clear)}>
                    <i className={'light-icon fa ' + (clear? 'fa-moon-o' : 'fa-sun-o')}></i>
                    </div>
                    <Accueil callBack={openApp}/>
                </div>
            )}
        </div>
    );
}

export default App;
