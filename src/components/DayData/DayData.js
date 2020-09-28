import React from "react";
import "./DayData.css";
import CustomerData from '../CustomerData/CustomerData.js';
import MissedPayments from '../MissedPayments/MissedPayments.js';

/*
 * Represents a single day.
 *
 */
function DayData({ day, index }) {

    return (
        <div className="day" key={index}>
            <h1>Jour {index + 1}</h1>
            <div className="day-data">
                <div>total des paiements manqués: {day.dailyLoss}€</div>
                <CustomerData customers={day.customers}/>
                <MissedPayments missedPayments={day.missedPayments}/>
            </div>
        </div>
    );
}

export default DayData;
