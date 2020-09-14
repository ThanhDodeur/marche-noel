import React from "react";
import "./DayData.css";

import DataBloc from '../DataBloc/DataBloc.js';

/*
 * Represents a single day (1 customer list, 1 vendor list).
 *
 */
function DayData({ day, index }) {

    return (
        <div className="day" key={index}>
            <h1>Jour {index + 1}</h1>
            {Object.entries(day).map((line, lineIndex) => {
                return(
                    <DataBloc key={lineIndex} groupName={line[0]} content={line[1]}/>
                )
            })}
        </div>
    );
}

export default DayData;
