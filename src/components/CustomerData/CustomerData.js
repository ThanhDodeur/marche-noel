import React from "react";
import "./CustomerData.css";
import { rounded } from "../../utils/utils.js";

/*
 *
 * customers = { clientId: { supplied , paid, total } }
 * supplied = [ {name: 'itemName', 'price': price, 'supplierId': id } ] WHAT IS PAID
 * paid = [ {name: 'itemName', 'price': price, 'supplierId': id } ]
 */
function CustomerData({ customers }) {

    return (
        <div>
            <h2><i class="fa fa-user spaced"/> Liste Client:</h2>
            {Object.keys(customers).map(customerId => {
                return (
                    <div className="entry" key={'cust_'+customerId}>
                        <span>[client: {customerId}] - </span>
                        <span>total payé: {rounded(customers[customerId].paidTotal, 3)}€</span>
                        <span> | </span>
                        <span>a reçu pour un total de: {rounded(customers[customerId].suppliedTotal, 3)}€</span>
                    </div>
                )
            })}
        </div>
    );
}

export default CustomerData;