import React, { useState } from "react";
import "./PageData.css";

import DataBloc from './DataBloc.js';

function PageData({ days }) {
    const [state, setState] = useState({});

    function updateState(updates) {
        setState({ ...state, ...updates });
    }

    return (
        <div className="content">
            {days.map((value, dayIndex) => {
                return (
                    <div className="day" key={dayIndex}>
                        <h1>Jour {dayIndex + 1}</h1>
                        {Object.entries(value).map((line, index) => {
                            return(
                                <DataBloc key={index} data={line[0]} value={line[1]}/>
                            )
                        })}
                    </div>
                )
            })}
        </div>
    );
}

export default PageData;
