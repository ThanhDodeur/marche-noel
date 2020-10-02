import React from "react";
import "./PageData.css";

import DayData from '../DayData/DayData.js';

/*
 * Represents a whole page of data for all the uploaded days.
 *
 */
function PageData({ days, costTotal, supplierTotal, dailyAccounting, ticketPrice }) {

    function getStats() {
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
            <div className="daily-stats">
                <div><span>Moyenne payée par les clients:</span> <span className="value-display">{(totalSpendings / (dailyArray.length || 1)).toFixed(3)}€</span></div>
                <div><span>Moyenne des articles reçu:</span> <span className="value-display">{(totalObtained / (dailyArray.length || 1)).toFixed(3)}€</span></div>
                <div><span>Tickets de tombola Vendus:</span> <span className="value-display">{getTombolaSold()}</span></div>
                <div><span>Quantité de fiches payées:</span> <span className="value-display">{totalCustomers}</span></div>
            </div>
        )
    }

    function getTombolaSold() {
        let soldTickets = 0;
        for (const value of Object.values(dailyAccounting)) {
            soldTickets += value.tombolaTickets || 0;
        }
        return soldTickets;
    }

    function computeTotal() {
        return (supplierTotal + (ticketPrice * (getTombolaSold()))) - costTotal;
    }

    return (
        <div className="content">
            <div className="global-stats">
                <h3>Bénéfices</h3>
                <div><span>Bénéfices des vendeurs:</span> <span className="value-display">{supplierTotal}€</span></div>
                <div><span>Vente de tombola:</span></div>
                <div><span>{getTombolaSold()} x {ticketPrice}€: </span><span className="value-display">{ticketPrice * (getTombolaSold())}€ </span></div>
                <div><span><i className="fa fa-minus icon"/>Total des frais: </span><span className="value-display">{costTotal}€</span></div>
                <div className="separated"><span>Bénéfices net du marché: </span><span className="value-display">{computeTotal()}€</span></div>
                {!!days.length &&
                    <span className="divider">_________________________________________________________</span>
                }
                {days.map((value, dayIndex) => {
                    return(<DayData day={value} key={dayIndex} dailyAccounting={dailyAccounting} index={dayIndex}/>)
                })}
            </div>
            <div className="global-stats">
            <h3>Statistiques (sur {days.length} jour(s))</h3>
                {getStats()}
            </div>
        </div>
    );
}

export default PageData;
