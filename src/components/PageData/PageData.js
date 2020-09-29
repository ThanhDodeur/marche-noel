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
        let totalCustomers = 0;
        for (const day of dailyArray) {
            totalSpendings += day.customersAverage;
            totalCustomers += Object.keys(day.customers).length;
        }
        return (
            <div>
                <div><span>Moyenne des dépenses:</span> <span>{totalSpendings / (dailyArray.length || 1)}€</span></div>
                <div><span>Tickets de tombola Vendus:</span> <span>{getTombolaSold()}</span></div>
                <div><span>Quantité de fiches payées:</span> <span>{totalCustomers}</span></div>
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

    return (
        <div className="content">
            <div className="global-stats">
                <h3>Bénéfices</h3>
                <div><span>Bénéfices des vendeurs:</span> <span>{supplierTotal}€</span></div>
                <div><span>Vente de tombola:</span></div>
                <div><span>{getTombolaSold()} x {ticketPrice}€: </span><span> {ticketPrice * (getTombolaSold())}€ </span></div>
                <div><span><i className="fa fa-minus icon"/>Total des frais:</span> <span>{costTotal}€</span></div>
                <div className="separated"><span>Bénéfices net du marché:</span> <span>{supplierTotal - costTotal}€</span></div>
                <div class="divider">_________________________________________________________</div>
                {days.map((value, dayIndex) => {
                    return(<DayData day={value} key={dayIndex} dailyAccounting={dailyAccounting} index={dayIndex}/>)
                })}
            </div>
            <div className="global-stats">
                <h3>Statistiques</h3>
                {getStats()}
                <div>_________________________</div>
            </div>
        </div>
    );
}

export default PageData;
