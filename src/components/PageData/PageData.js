import React from "react";
import "./PageData.css";

import DayData from '../DayData/DayData.js';

/*
 * Represents a whole page of data for all the uploaded days.
 *
 */
function PageData({ days }) {

    return (
        <div className="content">
            {days.map((value, dayIndex) => {
                return(<DayData day={value} key={dayIndex} index={dayIndex}/>)
            })}
        </div>
    );
}

export default PageData;
