import React from "react";
import "./DayData.css";
import CustomerData from '../CustomerData/CustomerData.js';
import MissedPayments from '../MissedPayments/MissedPayments.js';

/*
 * Represents a single day.
 *
 */
function DayData({ day, index, dayAccounting }) {
    if (!Object.keys(day.customers).length) {
        return (<div></div>);
    }
    return (
        <div className="day" key={index}>
            <h1>{day.dayName}</h1>
            <div className="day-data">
                <div>Total des paiements manqués: {day.dailyLoss}€</div>
                <div>Tickets de tombola vendus: {dayAccounting.tombolaTickets}</div>
                <div>Moyenne des dépenses des clients: {(day.customersAverage || 0).toFixed(3)}€</div>
                <div>Moyenne des objets reçu par les clients: {(day.obtainedAverage || 0).toFixed(3)}€</div>
                <CustomerData customers={day.customers}/>
                <MissedPayments missedPayments={day.missedPayments}/>
            </div>
        </div>
    );
}

export default DayData;
