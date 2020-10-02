import React from "react";
import "./PageData.css";

import DayData from '../DayData/DayData.js';

/*
 * Represents a whole page of data for all the uploaded days.
 *
 */
function PageData({ days, costTotal, supplierTotal, dailyAccounting, ticketPrice }) {

    function getContent() {
        let soldTickets = 0;
        for (const value of Object.values(dailyAccounting)) {
            soldTickets += Number(value.tombolaTickets) || 0;
        }
        return(
            <div className="content">
                {getBenefices(soldTickets)}
                {getStats(soldTickets)}
            </div>
        )
    }

    function getStats(soldTickets) {
        const dailyArray = Object.values(days);
        let totalSpendings = 0;
        let totalObtained = 0;
        let totalCustomers = 0;
        for (const day of dailyArray) {
            totalSpendings += day.customersAverage || 0;
            totalObtained += day.obtainedAverage || 0;
            totalCustomers += Object.keys(day.customers).length;
        }
        return (
            <div className="global-stats">
                <h3>Statistiques (sur {days.length} jour(s))</h3>
                <div className="daily-stats">
                    <div><span>Moyenne payée par les clients:</span> <span className="value-display">{(totalSpendings / (dailyArray.length || 1)).toFixed(3)}€</span></div>
                    <div><span>Moyenne des articles reçu:</span> <span className="value-display">{(totalObtained / (dailyArray.length || 1)).toFixed(3)}€</span></div>
                    <div><span>Tickets de tombola Vendus:</span> <span className="value-display">{soldTickets}</span></div>
                    <div><span>Quantité de fiches payées:</span> <span className="value-display">{totalCustomers}</span></div>
                </div>
            </div>
        )
    }

    function getBenefices(soldTickets) {
        return (
            <div className="global-stats">
                <h3>Bénéfices</h3>
                <div><span>Bénéfices des vendeurs:</span> <span className="value-display">{supplierTotal}€</span></div>
                <div><span>Vente de tombola:</span></div>
                <div><span>{soldTickets} x {ticketPrice}€: </span><span className="value-display">{ticketPrice * (soldTickets)}€ </span></div>
                <div><span><i className="fa fa-minus icon"/>Total des frais: </span><span className="value-display">{costTotal}€</span></div>
                <div className="separated"><span>Bénéfices net du marché: </span><span className="value-display">{computeTotal(soldTickets)}€</span></div>
                {!!days.length &&
                    <span className="divider">_________________________________________________________</span>
                }
                {days.map((value, dayIndex) => {
                    return(<DayData day={value} key={dayIndex} dayAccounting={dailyAccounting[value.dayName]} index={dayIndex}/>)
                })}
            </div>
        )
    }

    function computeTotal(soldTickets) {
        return (supplierTotal + (ticketPrice * (soldTickets))) - costTotal;
    }

    return (
        <div>{getContent()}</div>
    );
}

export default PageData;
