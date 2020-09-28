import React from "react";
import "./MissedPayments.css";

/*
 *
 */
function MissedPayments({ missedPayments }) {

    return (
        <div>
            <h2>Paiements incorrectes:</h2>
            {Object.keys(missedPayments).map(customerId => {
                return (
                    <div className="entry" key={'missed_'+customerId}>
                        <span>[client: {customerId}] - </span>
                        <span>Argent Manquant: {missedPayments[customerId]}€</span>
                    </div>
                )
            })}
        </div>
    );
}

export default MissedPayments;