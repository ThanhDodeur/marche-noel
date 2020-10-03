import React from "react";
import "./MissedPayments.css";
import { rounded } from "../../utils/utils.js";

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
                        <span>Argent Manquant: {rounded(missedPayments[customerId], 3)}€</span>
                    </div>
                )
            })}
        </div>
    );
}

export default MissedPayments;