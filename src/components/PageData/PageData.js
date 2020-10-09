import React from "react";
import "./PageData.css";
import { rounded, percent } from "../../utils/utils.js";
import { useSelector } from 'react-redux';

import DayData from '../DayData/DayData.js';

/*
 * Represents a whole page of data for all the uploaded days.
 *
 */
function PageData({ openDay }) {

    const dailyAccounting = useSelector(store => store.marche.dailyAccounting);
    const days = useSelector(store => store.marche.days);
    const supplierTotal = useSelector(store => store.marche.supplierTotal);
    const supplierRealGain = useSelector(store => store.marche.supplierRealGain);
    const suppliers = useSelector(store => store.marche.suppliers);
    const ticketPrice = useSelector(store => store.marche.ticketPrice);
    const costTotal = useSelector(store => store.marche.costTotal);

    function getContent() {
        let soldTickets = 0;
        const supplierTuples = Object.entries(suppliers);
        supplierTuples.sort((a, b) => {
            return b[1].realGain - a[1].realGain;
        });
        for (const value of Object.values(dailyAccounting)) {
            soldTickets += Number(value.tombolaTickets) || 0;
        }
        return(
            <div className="content global-content">
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
        const max = supplierTuples[0] && supplierTuples[0][1] && supplierTuples[0][1].realGain;
        return (
            <div className="global-stats">
            <h3><i className="fa fa-trophy spaced"/> Classement des fournisseurs</h3>
                {supplierTuples && supplierTuples.map((tuple, index) => {
                    return(
                        <div key={'ladder_'+index} className="ladder-entry">
                            <div className="progress-bar" style={{width: percent(tuple[1].realGain, max) + '%'}}/>
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
        let obtainedPercentage = percent(totalSpendings, totalObtained);
        return (
            <div className="global-stats">
                <h3><i className="fa fa-bar-chart spaced"/> Statistiques (sur {days.length} jour(s))</h3>
                <div className="daily-stats">
                    <div><span>Moyenne payée par les clients:</span> <span className="value-display">{rounded((totalSpendings / (dailyArray.length || 1)), 3)}€</span></div>
                    <div><span>Moyenne des articles reçu:</span> <span className="value-display">{rounded((totalObtained / (dailyArray.length || 1)), 3)}€</span></div>
                    <div><span>Taux de paiement:</span> <span className="value-display">{obtainedPercentage}%</span></div>
                    <div><span>Tickets de tombola Vendus:</span> <span className="value-display">{soldTickets}</span></div>
                    <div><span>Quantité de fiches payées:</span> <span className="value-display">{totalCustomers}</span></div>
                </div>
            </div>
        )
    }

    function getBenefices(soldTickets) {
        return (
            <div className="global-stats profits">
                <h3><i className="fa fa-line-chart spaced"/> Bénéfices</h3>
                <div><span>Bénéfices des vendeurs:</span> <span className="value-display">{rounded(supplierTotal, 3)}€</span></div>
                <div><span>Paiements manquants:</span> <span className="value-display">{rounded(-(supplierTotal-supplierRealGain), 3)}€</span></div>
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
