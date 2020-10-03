import React from "react";
import "./DayData.css";
import CustomerData from '../CustomerData/CustomerData.js';
import MissedPayments from '../MissedPayments/MissedPayments.js';
import { rounded } from "../../utils/utils.js";

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
                <div>Total des paiements manqués: {rounded(day.dailyLoss, 3)}€</div>
                <div>Tickets de tombola vendus: {dayAccounting.tombolaTickets}</div>
                <div>Moyenne des dépenses des clients: {rounded((day.customersAverage || 0), 3)}€</div>
                <div>Moyenne des objets reçu par les clients: {rounded((day.obtainedAverage || 0), 3)}€</div>
                <CustomerData customers={day.customers}/>
                <MissedPayments missedPayments={day.missedPayments}/>
            </div>
        </div>
    );
}

export default DayData;
