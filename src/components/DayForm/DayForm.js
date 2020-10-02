import React, { useState, useEffect } from "react";
import "./DayForm.css";

/*
 * dayRawData = { customers: [], suppliers: [] }
 */
function DayForm({ day, dayRawData = {}, save }) {

    const [customers, setCustomers] = useState([].concat(dayRawData.customers));
    const [newCustomer, setNewCustomer] = useState([]);
    const [suppliers, setSuppliers] = useState([].concat(dayRawData.suppliers));
    const [newSupplier, setNewSupplier] = useState([]);

    useEffect(() => {
        // willMount
        return () => {
            // willUnMount
            //save(day, { customers, suppliers });
        }
    }, [save, day, customers, suppliers]);

    const saveRow = (type) => {
        let local;

        if (type === 'customer') {
            const newCustomerlocal = newCustomer;
            setNewCustomer(['', '', '', '']);
            local = customers;
            local.push(newCustomerlocal)
            setCustomers(local);
        }
        if (type === 'supplier') {
            const newSupplierlocal = newSupplier;
            setNewSupplier(['', '', '', '']);
            local = suppliers;
            local.push(newSupplierlocal)
            setSuppliers(local);
        }
        save(day, { customers, suppliers });
    }

    const setCustomerValue = (index, colIndex, value) => {
        const localCustomers = customers || [];

        if (index === false) {
            const localNewCustomer = newCustomer.map(value => value || '');
            localNewCustomer[colIndex] = value;
            setNewCustomer(localNewCustomer)
            return;
        }

        if (!localCustomers[index]) {
            localCustomers[index] = [];
        }
        localCustomers[index][colIndex] = value;
        setCustomers(localCustomers);
        save(day, { customers, suppliers });
    }

    const setSupplierValue = (index, colIndex, value) => {
        const localSuppliers = suppliers || [];

        if (index === false) {
            const localNewSupplier = newSupplier.map(value => value || '');;
            localNewSupplier[colIndex] = value;
            setNewSupplier(localNewSupplier)
            return;
        }

        if (!localSuppliers[index]) {
            localSuppliers[index] = [];
        }
        localSuppliers[index][colIndex] = value;
        setSuppliers(localSuppliers);
        save(day, { customers, suppliers });
    }

    const cKeyDownHandler = (e) => {
        if (e.key === 'Enter') {
            saveRow('customer');
        }
    }

    const sKeyDownHandler = (e) => {
        if (e.key === 'Enter') {
            saveRow('supplier');
        }
    }

    return (
        <div className="content input-page">
            <h1>{day}</h1>
            <div className="area-container">
                <div onKeyDown={cKeyDownHandler} className="group-input customers">
                    <div className="col-titles">
                        <div className="number">Client</div><div className="number">Fournisseur</div><div className="string">Article</div><div className="number">Prix</div>
                    </div>
                    {customers.map((customer, index) => {
                        return (
                            <div className="customer-row row" key={'customer_'+index}>
                                <input className="number-input" pattern="[0-9]*" type="number" onChange={event => { setCustomerValue(index, 0, event.target.value) }} value={customer[0]}/>
                                <input className="number-input" pattern="[0-9]*" type="number" onChange={event => { setCustomerValue(index, 1, event.target.value) }} value={customer[1]}/>
                                <input className="string-input" onChange={event => { setCustomerValue(index, 2, event.target.value) }} value={customer[2]}/>
                                <input className="number-input" pattern="[0-9]*" type="number" onChange={event => { setCustomerValue(index, 3, event.target.value) }} value={customer[3]}/>€
                            </div>
                        )
                    })}
                    <div className="customer-row row">
                        <input className="number-input" pattern="[0-9]*" type="number" onChange={event => { setCustomerValue(false, 0, event.target.value) }} value={newCustomer[0]}/>
                        <input className="number-input" pattern="[0-9]*" type="number" onChange={event => { setCustomerValue(false, 1, event.target.value) }} value={newCustomer[1]}/>
                        <input className="string-input" onChange={event => { setCustomerValue(false, 2, event.target.value) }} value={newCustomer[2]}/>
                        <input className="number-input" pattern="[0-9]*" type="number" onChange={event => { setCustomerValue(false, 3, event.target.value) }} value={newCustomer[3]}/>€
                    </div>
                    <div>
                        appuiez sur 'Entrer' pour sauver la dernière ligne.
                    </div>
                </div>
                <div onKeyDown={sKeyDownHandler} className="group-input suppliers">
                    <div className="col-titles">
                        <div className="number">Fournisseur</div><div className="number">Client</div><div className="string">Article</div><div className="number">Prix</div>
                    </div>
                    {suppliers.map((supplier, index) => {
                        return (
                            <div className="supplier-row row" key={'supplier_'+index}>
                                <input className="number-input" pattern="[0-9]*" type="number" onChange={event => { setSupplierValue(index, 0, event.target.value) }} value={supplier[0]}/>
                                <input className="number-input" pattern="[0-9]*" type="number" onChange={event => { setSupplierValue(index, 1, event.target.value) }} value={supplier[1]}/>
                                <input className="string-input" onChange={event => { setSupplierValue(index, 2, event.target.value) }} value={supplier[2]}/>
                                <input className="number-input" pattern="[0-9]*" type="number" onChange={event => { setSupplierValue(index, 3, event.target.value) }} value={supplier[3]}/>€
                            </div>
                        )
                    })}
                    <div className="supplier-row row">
                        <input className="number-input" pattern="[0-9]*" type="number" onChange={event => { setSupplierValue(false, 0, event.target.value) }} value={newSupplier[0]}/>
                        <input className="number-input" pattern="[0-9]*" type="number" onChange={event => { setSupplierValue(false, 1, event.target.value) }} value={newSupplier[1]}/>
                        <input className="string-input" onChange={event => { setSupplierValue(false, 2, event.target.value) }} value={newSupplier[2]}/>
                        <input className="number-input" pattern="[0-9]*" type="number" onChange={event => { setSupplierValue(false, 3, event.target.value) }} value={newSupplier[3]}/>€
                    </div>
                    <div>
                        appuiez sur 'Entrer' pour sauver la dernière ligne.
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DayForm;