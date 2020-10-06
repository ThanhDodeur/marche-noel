import React, { useState } from "react";
import "./NavBar.css";

function NavBar({ buttons=[] }) {

    const [burgerOpen, setBurgerOpen] = useState(true);


    return (
        <nav className="navbar">
            <div className="hamburger" onClick={() => {setBurgerOpen(!burgerOpen)}}>
                <div className="line"/>
                <div className="line"/>
                <div className="line"/>
            </div>
            <div className={"nav-buttons " + (burgerOpen? 'open' : '')}>
            {buttons.map((value, index) => {
                return (
                    <div role="button" key={index} className={`nav-button clickable noselect ${value.className}`} onClick={value.callBack}>
                        <span>{value.fa && <i className={`fa ${value.fa} inline spaced`}/>}<span className="inline">{value.content}</span></span>
                    </div>
                )
            })}
            </div>
        </nav>
    );
}

export default NavBar;
