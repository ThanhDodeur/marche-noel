import React, { useState } from "react";
import "./HelpBox.css";

function HelpBox() {

    const [showVideo, setShowVideo] = useState(false);

    const toggleVideo = () => {
        setShowVideo(!showVideo);
    }

    return (
        <div className="help">
            <div className="help-link ml-auto">
                <a
                    className="help-text"
                    target="new"
                    href="https://docs.google.com/spreadsheets/d/1UKT38_RUa3MQ_HEGtWgaPKvedD35wYksaj7-T0sc9N8/edit?usp=sharing"
                >
                    Format accepté
                </a>
                <i className="fa fa-file-excel-o" />
            </div>
            <div className="help-link ml-auto" onClick={toggleVideo}>
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

