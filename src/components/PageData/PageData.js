import React from "react";
import "./PageData.css";
import { rounded } from "../../utils/utils.js";

import DayData from '../DayData/DayData.js';

/*
 * Represents a whole page of data for all the uploaded days.
 *
 */
function PageData({ days, costTotal, suppliers, openDay, supplierTotal, supplierRealGain, dailyAccounting, ticketPrice }) {

    function getContent() {
        let soldTickets = 0;
        const supplierTuples = Object.entries(suppliers);
        supplierTuples.sort((a, b) => {
            if (a[1].realGain < b[1].realGain) {
                return 1;
            }
            if (a[1].realGain > b[1].realGain) {
                return -1;
            }
            return 0;
        });
        for (const value of Object.values(dailyAccounting)) {
            soldTickets += Number(value.tombolaTickets) || 0;
        }
        return(
            <div className="content">
                {getBenefices(soldTickets)}
                {getStats(soldTickets)}
                {!!supplierTuples.length && getSupplierLadder(supplierTuples)}
                {getDayData()}
            </div>
        )
    }

    function getDayData() {
        return(
            <div>
                {days.map((value, dayIndex) => {
                    if (!(openDay && openDay !== value.dayName)) {
                        return(<DayData day={value} key={dayIndex} dayAccounting={dailyAccounting[value.dayName]} index={dayIndex}/>);
                    } else {
                        return(<div key={'empty_'+dayIndex}/>)
                    }
                })}
            </div>)
    }

    function getSupplierLadder(supplierTuples) {
        return (
            <div className="global-stats">
            <h3><i class="fa fa-trophy spaced"/> Classement des fournisseurs</h3>
                {supplierTuples && supplierTuples.map((tuple, index) => {
                    return(
                        <div className="ladder-entry">
                            <span>{index+1}.</span>
                            <span>[{tuple[0]}]</span>
                            <span className="value">{rounded(tuple[1].realGain, 3)}€</span>
                        </div>
                    )
                })}
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
                <h3><i class="fa fa-bar-chart spaced"/> Statistiques (sur {days.length} jour(s))</h3>
                <div className="daily-stats">
                    <div><span>Moyenne payée par les clients:</span> <span className="value-display">{rounded((totalSpendings / (dailyArray.length || 1)), 3)}€</span></div>
                    <div><span>Moyenne des articles reçu:</span> <span className="value-display">{rounded((totalObtained / (dailyArray.length || 1)), 3)}€</span></div>
                    <div><span>Tickets de tombola Vendus:</span> <span className="value-display">{soldTickets}</span></div>
                    <div><span>Quantité de fiches payées:</span> <span className="value-display">{totalCustomers}</span></div>
                </div>
            </div>
        )
    }

    function getBenefices(soldTickets) {
        return (
            <div className="global-stats profits">
                <h3><i class="fa fa-line-chart spaced"/> Bénéfices</h3>
                <div><span>Bénéfices des vendeurs:</span> <span className="value-display">{rounded(supplierTotal, 3)}€</span></div>
                <div><span>Payements manquants:</span> <span className="value-display">{rounded(-(supplierTotal-supplierRealGain), 3)}€</span></div>
                <div><span>Vente de tombola:</span></div>
                <div><span>{soldTickets} x {ticketPrice}€: </span><span className="value-display">{rounded(ticketPrice * (soldTickets), 3)}€ </span></div>
                <div><span>Total des frais: </span><span className="value-display">{rounded(-(costTotal), 3)}€</span></div>
                <div className="separated"><span>Bénéfices net du marché: </span><span className="value-display">{rounded(computeTotal(soldTickets), 3)}€</span></div>
            </div>
        )
    }

    function computeTotal(soldTickets) {
        return (supplierRealGain + (ticketPrice * (soldTickets))) - costTotal;
    }

    return (
        <div>{getContent()}</div>
    );
}

export default PageData;
