import React, { useState } from "react";
import "./NavBar.css";

function NavBar({ buttons=[] }) {
    const [state, setState] = useState({});

    function updateState(updates) {
        setState({ ...state, ...updates });
    }

    return (
        <nav className="navbar">
            {buttons.map((value, index) => {
                return (
                    <div key={index} className={`nav-button clickable noselect ${value.className}`} onClick={value.callBack}>
                        <span>{value.content}</span>
                    </div>
                )
            })}
            
        </nav>
    );
}

export default NavBar;
