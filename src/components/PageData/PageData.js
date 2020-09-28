import React from "react";
import "./PageData.css";

import DayData from '../DayData/DayData.js';

/*
 * Represents a whole page of data for all the uploaded days.
 *
 */
function PageData({ days, costTotal, eventTotal, supplierTotal }) {

    return (
        <div className="content">
            <div>
            <h1>Marché De Noël</h1>
            <div>coût total des frais: {costTotal}€</div>
            <div>Benef des vendeurs: {supplierTotal}€</div>
            <div>Benef Net du marché: {eventTotal}€</div>
            {days.map((value, dayIndex) => {
                return(<DayData day={value} key={dayIndex} index={dayIndex}/>)
            })}
            </div>
        </div>
    );
}

export default PageData;
