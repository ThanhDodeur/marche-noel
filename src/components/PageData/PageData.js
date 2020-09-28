import React from "react";
import "./PageData.css";

import DayData from '../DayData/DayData.js';

/*
 * Represents a whole page of data for all the uploaded days.
 *
 */
function PageData({ days, costTotal, supplierTotal }) {

    return (
        <div className="content">
            <div className="daily-result">
                <h1>Marché De Noël</h1>
                <div><span>Bénéfices des vendeurs:</span> <span>{supplierTotal}€</span></div>
                <div><span><i className="fa fa-minus"/>Coût total des frais:</span> <span>{costTotal}€</span></div>
                <div>_________________________</div>
                <div><span>Bénéfices net du marché:</span> <span>{supplierTotal - costTotal}€</span></div>
                {days.map((value, dayIndex) => {
                    return(<DayData day={value} key={dayIndex} index={dayIndex}/>)
                })}
            </div>
        </div>
    );
}

export default PageData;
