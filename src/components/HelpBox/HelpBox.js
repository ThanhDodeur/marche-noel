import React, { useState } from "react";
import "./HelpBox.css";

function HelpBox({ loadDemo }) {

    const [showVideo, setShowVideo] = useState(false);
    const [promptDemo, setPromptDemo] = useState(false);

    const toggleVideo = () => {
        setShowVideo(!showVideo);
    }

    return (
        <div className="help noselect">
            <div className="help-button ml-auto">
                {!!promptDemo ? (
                        <span>
                            Vos entrées non sauvegardées seront perdues:
                            <i className="fa clickable fa-check" onClick={() => { setPromptDemo(false); loadDemo(); }}></i>
                            <i className="fa clickable fa-times" onClick={() => setPromptDemo(false)}></i>
                        </span>
                    ) : (
                        <span className="clickable" onClick={() => setPromptDemo(true)}>Charger démo</span>
                    )
                }
                <i className="fa fa-desktop" />
            </div>
            <div className="help-link clickable ml-auto">
                <a
                    className="help-text"
                    target="new"
                    href="https://docs.google.com/spreadsheets/d/1UKT38_RUa3MQ_HEGtWgaPKvedD35wYksaj7-T0sc9N8/edit?usp=sharing"
                >
                    Table pour csv
                </a>
                <i className="fa fa-file-excel-o" />
            </div>
            <div className="help-link clickable ml-auto" onClick={toggleVideo}>
                <u>Vidéo d'explication</u>
                <i className="fa fa-play" />
            </div>
            {!!showVideo &&
                (
                    <iframe title="help video" src="https://drive.google.com/file/d/1hk40AsnzUJ7gUevslwSnfZGkSvyJ0OKu/preview" width="900" height="500"/>
                )
            }
        </div>
    );
}

export default HelpBox;

