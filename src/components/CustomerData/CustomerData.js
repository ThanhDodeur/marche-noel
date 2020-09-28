import React from "react";
import "./CustomerData.css";

/*
 *
 * customers = { clientId: { supplied , paid, total } }
 * supplied = [ {name: 'itemName', 'price': price, 'supplierId': id } ] WHAT IS PAID
 * paid = [ {name: 'itemName', 'price': price, 'supplierId': id } ]
 */
function CustomerData({ customers }) {

    return (
        <div>
            <h2>Liste Client:</h2>
            {Object.keys(customers).map(customerId => {
                return (
                    <div className="entry" key={'cust_'+customerId}>
                        <span>[client: {customerId}] - </span>
                        <span>total payé: {customers[customerId].paidTotal}€</span>
                        <span> | </span>
                        <span>a reçu pour un total de: {customers[customerId].suppliedTotal}€</span>
                    </div>
                )
            })}
        </div>
    );
}

export default CustomerData;