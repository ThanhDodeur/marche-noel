import React from "react";
import "./DayData.css";
import CustomerData from '../CustomerData/CustomerData.js';
import MissedPayments from '../MissedPayments/MissedPayments.js';

/*
 * Represents a single day.
 *
 */
function DayData({ day, index, dailyAccounting }) {

    function getTicketSold(day) {
        return dailyAccounting[day] && dailyAccounting[day].tombolaTickets;
    }

    return (
        <div className="day" key={index}>
            <h1>{day.dayName}</h1>
            <div className="day-data">
                <div>Total des paiements manqués: {day.dailyLoss}€</div>
                <div>Tickets de tombola vendus: {getTicketSold(day.dayName)}</div>
                <div>Moyenne de dépense des clients: {day.customersAverage}€</div>
                <CustomerData customers={day.customers}/>
                <MissedPayments missedPayments={day.missedPayments}/>
            </div>
        </div>
    );
}

export default DayData;
