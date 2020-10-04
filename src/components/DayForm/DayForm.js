import React, { useState, useRef } from "react";
import FileInput from "../FileInput/FileInput.js";
import { times } from "../../utils/utils.js";
import "./DayForm.css";

/*
 * dayRawData = { customers: [], suppliers: [] }
 */
function DayForm({
    day,
    dayRawData = {},
    save,
    addMessage,
    dailyAccounting,
    missedTransactions,
}) {
    const [customers, setCustomers] = useState([].concat(dayRawData.customers));
    const [newCustomer, setNewCustomer] = useState([]);
    const [suppliers, setSuppliers] = useState([].concat(dayRawData.suppliers));
    const [newSupplier, setNewSupplier] = useState([]);
    const [file, setFile] = useState(undefined);
    const [dayAccounting, setDayAccounting] = useState(dailyAccounting);
    const customerFirstInput = useRef(null);
    const supplierFirstInput = useRef(null);

    ////////////////// //////// //////////////////
    ////////////////// PRIVATE ///////////////////
    ////////////////// //////// //////////////////

    /**
     *
     * @param {blob} blob
     * @return {file}
     */
    const _readFile = async (blob) => {
        try {
            const reader = new FileReader();
            reader.readAsText(blob);
            return new Promise((resolve) => {
                reader.onload = (e) => {
                    resolve(reader.result);
                };
            });
        } catch (error) {
            this._addMessage("ERREUR", error.message, "error");
            return false;
        }
    };
    /**
     *
     * @param {String} page returned by a fileReader in "reader.readAsText"
     */
    const _readPage = async (page) => {
        const OFFSET_HEIGHT = 1; // does not include the column titles.
        const lines = page.split(/\r\n|\n/);
        times(OFFSET_HEIGHT)(() => lines.shift());
        // colNames
        lines.shift().split(","); // removes and saves column titles.
        /*
         *
         * customers = { clientId: { supplied, suppliedTotal, paid, paidTotal } }
         * supplied = [ {name: 'itemName', 'price': price, 'supplierId': id } ] WHAT IS PAID
         * paid = [ {name: 'itemName', 'price': price, 'supplierId': id } ]
         *
         * suppliers = { supplierId : { total } }
         *
         */
        const newCustomers = [];
        const newSuppliers = [];
        while (lines.length) {
            const currentLine = lines.shift().split(",");

            /* DATA FILL
             *   paid
             *   currentLine[0] purchase - customerId
             *   currentLine[1] purchase - supplierId
             *   currentLine[2] purchase - item Name
             *   currentLine[3] purchase - item Price
             *   supplied
             *   currentLine[4] payment - supplierId
             *   currentLine[5] payment - customerId
             *   currentLine[6] payment - item Name
             *   currentLine[7] payment - item Price
             */

            if (currentLine[0]) {
                // CUSTOMER SIDE
                newCustomers.push([
                    Number(currentLine[0]),
                    Number(currentLine[1]),
                    currentLine[2],
                    Number(currentLine[3]),
                ]);
            }
            if (currentLine[4] && currentLine[5]) {
                // SUPPLIER SIDE
                newSuppliers.push([
                    Number(currentLine[4]),
                    Number(currentLine[5]),
                    currentLine[6],
                    Number(currentLine[7]),
                ]);
            }
        }
        return { newCustomers, newSuppliers };
    };
    /**
     *
     * @param {String} type customer or supplier
     */
    const _saveRow = async (type) => {
        let local;

        if (type === "customer") {
            const newCustomerlocal = newCustomer;
            await setNewCustomer(["", "", "", ""]);
            local = customers;
            local.push(newCustomerlocal);
            await setCustomers(local);
        }
        if (type === "supplier") {
            const newSupplierlocal = newSupplier;
            await setNewSupplier(["", "", "", ""]);
            local = suppliers;
            local.push(newSupplierlocal);
            await setSuppliers(local);
        }
        await save(day, { customers, suppliers }, dayAccounting);
    };

    ////////////////// //////// //////////////////
    ////////////////// HANDLERS //////////////////
    ////////////////// //////// //////////////////

    /**
     *
     * @param {keyEvent} e
     */
    const onCustomerGroupInputKeyDown = async (e) => {
        if (e.key === "Enter") {
            customerFirstInput.current.focus();
            await _saveRow("customer");
        }
    };
    const onCustomerLastBoxKeyDown = async (e) => {
        if (e.key === "Tab") {
            e.stopPropagation();
            e.preventDefault();
            customerFirstInput.current.focus();
            await _saveRow("customer");
        }
    }
    /**
     * Handler for File Input onChange.
     *
     * @param {file[]} files
     * @return {void}
     */
    const onFileInputChange = async (files) => {
        const file = files[0];
        if (!file.name.includes(".csv")) {
            addMessage("ERREUR", "Le fichier doit être un .csv", "error", 8000);
            return;
        }
        await setFile(file);
        const page = await _readFile(file);
        const { newCustomers, newSuppliers } = await _readPage(page);
        setCustomers(newCustomers);
        setSuppliers(newSuppliers);
        save(
            day,
            { customers: newCustomers, suppliers: newSuppliers },
            dayAccounting
        );
    };
    /**
     *
     * @param {mouseEvent} e
     */
    const onFileInputWrapperClick = (e) => {
        // allows clicking on the file input from the outside element.
        if (e.currentTarget !== e.target) {
            return;
        }
        const input = e.currentTarget.getElementsByTagName("input");
        if (input.length) {
            e.stopPropagation();
            input[0].click();
        }
    };
    /**
     *
     * @param {keyEvent} e
     */
    const onSupplierGroupInputKeyDown = async (e) => {
        if (e.key === "Enter") {
            supplierFirstInput.current.focus();
            await _saveRow("supplier");
        }
    };
    const onSupplierLastBoxKeyDown = async (e) => {
        if (e.key === "Tab") {
            e.stopPropagation();
            e.preventDefault();
            supplierFirstInput.current.focus();
            await _saveRow("supplier");
        }
    }
    /**
     *
     * @param {Number} index the index of the line
     * @param {Number} colIndex [0-3] the number within the row.
     * @param {*} value
     */
    const setCustomerValue = (index, colIndex, value) => {
        const localCustomers = customers || [];

        if (index === false) {
            const localNewCustomer = newCustomer.map((value) => value || "");
            localNewCustomer[colIndex] = value;
            setNewCustomer(localNewCustomer);
            return;
        }

        if (!localCustomers[index]) {
            localCustomers[index] = [];
        }
        localCustomers[index][colIndex] = value;
        setCustomers(localCustomers);
        save(day, { customers, suppliers }, dayAccounting);
    };
    /**
     *
     * @param {Number} index the index of the line
     * @param {Number} colIndex [0-3] the number within the row.
     * @param {*} value
     */
    const setSupplierValue = (index, colIndex, value) => {
        const localSuppliers = suppliers || [];

        if (index === false) {
            const localNewSupplier = newSupplier.map((value) => value || "");
            localNewSupplier[colIndex] = value;
            setNewSupplier(localNewSupplier);
            return;
        }

        if (!localSuppliers[index]) {
            localSuppliers[index] = [];
        }
        localSuppliers[index][colIndex] = value;
        setSuppliers(localSuppliers);
        save(day, { customers, suppliers }, dayAccounting);
    };
    /**
     *
     * @param {Number || String} val the value of the input
     */
    const setTombolaTicket = async (val) => {
        await setDayAccounting({ tombolaTickets: Number(val) });
        await save(
            day,
            { customers, suppliers },
            { tombolaTickets: Number(val) }
        );
    };

    ////////////////// //////// //////////////////
    ///////////////////// DOM ////////////////////
    ////////////////// //////// //////////////////

    return (
        <div className="content input-page noselect">
            <div className="title-area ml-10">
                <h1>{day}</h1>
                <div
                    role="button"
                    className="form-button"
                    onClick={(e) => onFileInputWrapperClick(e)}
                >
                    <FileInput
                        label="Ajouter .csv"
                        className="noselect"
                        value={file}
                        onChange={onFileInputChange}
                    />
                </div>
            </div>
            <div>
                <span className="ml-10">Tickets de tombola vendus:</span>
                <input
                    className="number-input ml-10"
                    pattern="[0-9]*"
                    type="number"
                    onChange={(event) => {
                        setTombolaTicket(event.target.value);
                    }}
                    value={dayAccounting.tombolaTickets}
                />
            </div>
            <div className="area-container">
                <div
                    className="group-input customers"
                >
                    <div className="col-titles">
                        <div className="number">Client</div>
                        <div className="number">Fournisseur</div>
                        <div className="string">Article</div>
                        <div className="number">Prix</div>
                    </div>
                    {customers.map((customer, index) => {
                        const localMissedTransactions = missedTransactions[customer[0]];
                        return (
                            <div
                                className={
                                    "customer-row row saved-row " +
                                    (!!(
                                        localMissedTransactions &&
                                        localMissedTransactions.paidSurplus &&
                                        localMissedTransactions.paidSurplus.includes(Number(customer[3]))
                                    )
                                        ? "unpaid"
                                        : "")
                                }
                                key={"customer_" + index}
                            >
                                <input
                                    className="number-input"
                                    pattern="[0-9]*"
                                    type="number"
                                    onChange={(event) => {
                                        setCustomerValue(
                                            index,
                                            0,
                                            event.target.value
                                        );
                                    }}
                                    value={customer[0]}
                                />
                                <input
                                    className="number-input"
                                    pattern="[0-9]*"
                                    type="number"
                                    onChange={(event) => {
                                        setCustomerValue(
                                            index,
                                            1,
                                            event.target.value
                                        );
                                    }}
                                    value={customer[1]}
                                />
                                <input
                                    className="string-input"
                                    onChange={(event) => {
                                        setCustomerValue(
                                            index,
                                            2,
                                            event.target.value
                                        );
                                    }}
                                    value={customer[2]}
                                />
                                <input
                                    className="number-input"
                                    pattern="[0-9]*"
                                    type="number"
                                    onChange={(event) => {
                                        setCustomerValue(
                                            index,
                                            3,
                                            event.target.value
                                        );
                                    }}
                                    value={customer[3]}
                                />
                                €
                            </div>
                        );
                    })}
                    <div className="customer-row row new-row" onKeyDown={onCustomerGroupInputKeyDown}>
                        <input
                            ref={customerFirstInput}
                            className="number-input"
                            pattern="[0-9]*"
                            type="number"
                            onChange={(event) => {
                                setCustomerValue(false, 0, event.target.value);
                            }}
                            value={newCustomer[0]}
                        />
                        <input
                            className="number-input"
                            pattern="[0-9]*"
                            type="number"
                            onChange={(event) => {
                                setCustomerValue(false, 1, event.target.value);
                            }}
                            value={newCustomer[1]}
                        />
                        <input
                            className="string-input"
                            onChange={(event) => {
                                setCustomerValue(false, 2, event.target.value);
                            }}
                            value={newCustomer[2]}
                        />
                        <input
                            className="number-input"
                            pattern="[0-9]*"
                            type="number"
                            onKeyDown={onCustomerLastBoxKeyDown}
                            onChange={(event) => {
                                setCustomerValue(false, 3, event.target.value);
                            }}
                            value={newCustomer[3]}
                        />
                        €
                    </div>
                    <div>
                        Appuier sur 'Tab' pour naviguer entre les cases.
                        Appuier sur 'Entrer' pour sauver la dernière ligne.
                    </div>
                </div>
                <div
                    className="group-input suppliers"
                >
                    <div className="col-titles">
                        <div className="number">Fournisseur</div>
                        <div className="number">Client</div>
                        <div className="string">Article</div>
                        <div className="number">Prix</div>
                    </div>
                    {suppliers.map((supplier, index) => {
                        const localMissedTransactions = missedTransactions[supplier[1]];
                        return (
                            <div
                                className={
                                    "supplier-row row saved-row " +
                                    (!!(
                                        localMissedTransactions &&
                                        localMissedTransactions.suppliedSurplus &&
                                        localMissedTransactions.suppliedSurplus.includes(Number(supplier[3]))
                                    )
                                        ? "unpaid"
                                        : "")
                                }
                                key={"supplier_" + index}
                            >
                                <input
                                    className="number-input"
                                    pattern="[0-9]*"
                                    type="number"
                                    onChange={(event) => {
                                        setSupplierValue(
                                            index,
                                            0,
                                            event.target.value
                                        );
                                    }}
                                    value={supplier[0]}
                                />
                                <input
                                    className="number-input"
                                    pattern="[0-9]*"
                                    type="number"
                                    onChange={(event) => {
                                        setSupplierValue(
                                            index,
                                            1,
                                            event.target.value
                                        );
                                    }}
                                    value={supplier[1]}
                                />
                                <input
                                    className="string-input"
                                    onChange={(event) => {
                                        setSupplierValue(
                                            index,
                                            2,
                                            event.target.value
                                        );
                                    }}
                                    value={supplier[2]}
                                />
                                <input
                                    className="number-input"
                                    pattern="[0-9]*"
                                    type="number"
                                    onChange={(event) => {
                                        setSupplierValue(
                                            index,
                                            3,
                                            event.target.value
                                        );
                                    }}
                                    value={supplier[3]}
                                />
                                €
                            </div>
                        );
                    })}
                    <div className="supplier-row row new-row" onKeyDown={onSupplierGroupInputKeyDown}>
                        <input
                            ref={supplierFirstInput}
                            className="number-input"
                            pattern="[0-9]*"
                            type="number"
                            onChange={(event) => {
                                setSupplierValue(false, 0, event.target.value);
                            }}
                            value={newSupplier[0]}
                        />
                        <input
                            className="number-input"
                            pattern="[0-9]*"
                            type="number"
                            onChange={(event) => {
                                setSupplierValue(false, 1, event.target.value);
                            }}
                            value={newSupplier[1]}
                        />
                        <input
                            className="string-input"
                            onChange={(event) => {
                                setSupplierValue(false, 2, event.target.value);
                            }}
                            value={newSupplier[2]}
                        />
                        <input
                            className="number-input"
                            pattern="[0-9]*"
                            type="number"
                            onKeyDown={onSupplierLastBoxKeyDown}
                            onChange={(event) => {
                                setSupplierValue(false, 3, event.target.value);
                            }}
                            value={newSupplier[3]}
                        />
                        €
                    </div>
                    <div>
                        Appuier sur 'Tab' pour naviguer entre les cases.
                        Appuier sur 'Entrer' pour sauver la dernière ligne.
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DayForm;
