import React from "react";
import "./Marche.css";

import { newId, zip, cancelArrays, download, formattedDate } from "../../utils/utils.js";
import NavBar from "../NavBar/NavBar.js";
import Popups from "../Popups/Popups.js";
import PageData from "../PageData/PageData.js";
import DayForm from "../DayForm/DayForm.js";
import EventForm from "../EventForm/EventForm.js";
import HelpBox from "../HelpBox/HelpBox.js";
import FileInput from "../FileInput/FileInput.js";

class Marche extends React.Component {
    constructor(props) {
        super();
        this.DAYS = ["Vendredi", "Samedi", "Dimanche"]; // const
        this.state = {
            daysRawData: Object.fromEntries(
                zip(this.DAYS, Array(3).fill({ customers: [], suppliers: [] }))
            ),
            dailyAccounting: Object.fromEntries(
                zip(this.DAYS, Array(3).fill({ tombolaTickets: 0 }))
            ), // { dayName: {valuesDict} }
            days: [], // { dayName, customers, missedPayments, missedTransactions, dailyLoss, customersAverage, obtainedAverage }
            eventExpenses: {}, // {expenseName: <int>amount}
            suppliers: {}, // { supplierId : { total } }
            missedPaymentsByDay: {}, // the total amount missed by customers (negative meaning that they paid too much)
            missedTransactionsByDay: {}, // { dayName: { customerId: { paidSurplus: [], suppliedSurplus: [] } } } unresolved payments.
            supplierTotal: 0,
            supplierRealGain: 0,
            costTotal: 0,
            ticketPrice: 0,
            // Buttons with confirm
            resetRequested: false, // toggle for the confirm/cancel buttons for removing files
            loadRequested: false,
            saveRequested: false,
            // Displays
            showForm: false, // toggle for the accounting/event input form
            showDayForm: false, // false or this.DAYS[*]
            showHelp: false, // toggle the "help" box
            // POPUPS
            popupIds: [],
            popups: {}, // {content, type}
        };
    }
    async componentDidMount() {
        window.addEventListener('beforeunload', this.onClose);
        await this._loadSave('saved-state-auto');
    }
    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.onClose);
    }

    ////////////////// //////// //////////////////
    ////////////////// PRIVATE ///////////////////
    ////////////////// //////// //////////////////

    /**
     * Loads the save from the localStorage.
     *
     * @param {String} saveName
     */
    _loadSave = async (saveName) => {
        const saved = localStorage.getItem(saveName);
        if (saved) {
            await this.setState(JSON.parse(saved));
        }
        await this._addMessage(
            "Chargé",
            "La dernière sauvegarde à été chargée",
            "info",
            2000
        );
        await this._computeResults();
    };
    /**
     *
     * @param {blob} blob
     * @return {file}
     */
    _readFile = async (blob) => {
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
     * Saves part of the state to the localStorage.
     *
     * @param {String} saveName
     */
    _saveState = async (saveName) => {
        localStorage.setItem(
            saveName,
            JSON.stringify({
                daysRawData: this.state.daysRawData,
                eventExpenses: this.state.eventExpenses,
                dailyAccounting: this.state.dailyAccounting,
                ticketPrice: this.state.ticketPrice,
                costTotal: this.state.costTotal,
            })
        );
        await this._addMessage(
            "Sauvegardé",
            "Les informations ont été sauvegardées",
            "info",
            3000
        );
    };
    /**
     * processes the days and updates the state.
     */
    _computeResults = async () => {
        const {
            days,
            suppliers,
            supplierTotal,
            supplierRealGain,
            missedPaymentsByDay,
            missedTransactionsByDay,
        } = await this._processDays();
        await this.setState({
            days,
            suppliers,
            supplierTotal,
            supplierRealGain,
            missedPaymentsByDay,
            missedTransactionsByDay,
        });
    };
    /**
     *
     * @param {String} title
     * @param {String} content text content of the message
     * @param {String} [type] info | error
     * @param {Number} [duration] amount of ms
     */
    _addMessage = async (title, content, type='info', duration=5000) => {
        const id = newId("message");
        await this.setState({
            popupIds: this.state.popupIds.concat(id),
            popups: Object.assign({}, this.state.popups, {
                [id]: {
                    title,
                    content,
                    type,
                },
            }),
        });
        setTimeout(async () => {
            const newPopupIds = this.state.popupIds.filter((filterId) => {
                return filterId !== id;
            });
            const newPopups = Object.assign({}, this.state.popups);
            delete newPopups[id];
            await this.setState({
                popupIds: newPopupIds,
                popups: newPopups,
            });
        }, duration);
    };
    /**
     *
     * @param {Blob} file
     */
    _openFile = async (file) => {
        if (file.type !== 'application/json') {
            this._addMessage(
                "ERREUR",
                "Le fichier n'est pas un de type .json",
                "error"
                );
            return false;
        }
        const save = await this._readFile(file);
        const saveObject = JSON.parse(save);
        if (Object.keys(saveObject).includes('daysRawData')) {
            await this.setState(saveObject);
            await this._addMessage(
                "Chargé",
                "Le fichier a bien été chargé",
                "info",
                2000
            );
            await this._computeResults();
            return true;
        } else {
            this._addMessage(
                "ERREUR",
                "Le fichier n'a pas pu être chargé",
                "error"
            );
            return false;
        }
    }
    /**
     * Extracts values from day raw data (state.daysRawData).
     *
     * @returns {Object}
     */
    _processDays = async () => {
        const days = [];
        let suppliers = {};
        let supplierTotal = 0;
        let supplierRealGain = 0;
        let missedPaymentsByDay = this.state.missedPaymentsByDay;
        let missedTransactionsByDay = this.state.missedTransactionsByDay;
        for (const [dayName, dayRaw] of Object.entries(
            this.state.daysRawData
        )) {
            const computedDay = this._computeDay({ dayName, dayRaw, suppliers });
            suppliers = computedDay.suppliers;
            missedPaymentsByDay[dayName] = computedDay.missedPayments;
            missedTransactionsByDay[dayName] = computedDay.missedTransactions;
            days.push(computedDay.day);
        }
        // computes the total gross sale revenue of the suppliers, across all days.
        Object.values(suppliers).forEach((supplier) => {
            supplierTotal += supplier.total;
            supplierRealGain += supplier.realGain;
        });
        return { days, suppliers, supplierTotal, supplierRealGain, missedPaymentsByDay, missedTransactionsByDay };
    };
    /**
     * Computes
     *
     * @param {Object} param0
     * @param {String} param0.dayName
     * @param {Object} param0.dayRaw
     * @param {Object} param0.suppliers
     */
    _computeDay = ({ dayName, dayRaw, suppliers }) => {
        /* DATA FILL from dayRaw
         *   paid
         *   rawCustomers[*][0] purchase - customerId
         *   rawCustomers[*][1] purchase - supplierId
         *   rawCustomers[*][2] purchase - item Name
         *   rawCustomers[*][3] purchase - item Price
         *   supplied
         *   rawSuppliers[*][0] payment - supplierId
         *   rawSuppliers[*][1] payment - customerId
         *   rawSuppliers[*][2] payment - item Name
         *   rawSuppliers[*][3] payment - item Price
         *
         *
         * suppliers = { supplierId : { total, realGain } }
         *
         */
        const rawCustomers = dayRaw.customers;
        const rawSuppliers = dayRaw.suppliers;
        const customers = {};
        /*
         * customerKeys dataStructure
         * supplied = [ {name: 'itemName', 'price': price, 'supplierId': id } ] WHAT IS PAID
         * paid = [ {name: 'itemName', 'price': price, 'supplierId': id } ]
         * paymentTransactions: Number[],
         * recievedTransactions: Number[],
         */
        const customerKeys = {
            paid: [],
            paidTotal: 0,
            paymentTransactions: [],
            recievedTransactions: [],
            supplied: [],
            suppliedTotal: 0,
        };

        for (const rawCustomer of rawCustomers) {
            if (rawCustomer[0]) {
                // CUSTOMER SIDE
                // creates the customer if it doesn't already exist.
                customers[rawCustomer[0]] = customers[rawCustomer[0]] || Object.assign({}, customerKeys);
                // adds the total paid by the customer
                const paidValue = Number(rawCustomer[3]);
                customers[rawCustomer[0]].paidTotal += paidValue || 0;
                customers[rawCustomer[0]].paymentTransactions.push(paidValue);
                // adds a line for what the customer paid
                customers[rawCustomer[0]].paid.push({
                    name: rawCustomer[2],
                    price: rawCustomer[3],
                    supplierId: rawCustomer[1],
                });
                // computes the total value of real gain by the supplier.
                suppliers[rawCustomer[1]] = suppliers[rawCustomer[1]] || {
                    total: 0,
                    realGain: 0,
                };
                suppliers[rawCustomer[1]].realGain += Number(rawCustomer[3]) || 0;
            }
        }
        for (const rawSupplier of rawSuppliers) {
            if (rawSupplier[0] && rawSupplier[1]) {
                // SUPPLIER SIDE
                customers[rawSupplier[1]] = customers[rawSupplier[1]] || Object.assign({}, customerKeys);
                // adds the total paid by the customer
                const suppliedValue = Number(rawSupplier[3]);
                customers[rawSupplier[1]].suppliedTotal += suppliedValue || 0;
                customers[rawSupplier[1]].recievedTransactions.push(suppliedValue);
                // adds a line for what the customer recieved (not a guarantee of payment)
                customers[rawSupplier[1]].supplied.push({
                    name: rawSupplier[2],
                    price: rawSupplier[3],
                    supplierId: rawSupplier[0],
                });
                // computes the total value of supplied by the supplier.
                suppliers[rawSupplier[0]] = suppliers[rawSupplier[0]] || {
                    total: 0,
                    realGain: 0,
                };
                suppliers[rawSupplier[0]].total += Number(rawSupplier[3]) || 0;
            }
        }

        const {
            missedPayments,
            missedTransactions,
            dailyLoss,
            customersAverage,
            obtainedAverage,
        } = this._computeDailyStats(customers);
        return {
            day: {
                dayName,
                customers,
                missedPayments,
                missedTransactions,
                dailyLoss,
                customersAverage,
                obtainedAverage,
            },
            suppliers,
            missedPayments,
            missedTransactions,
        };
    };
    /**
     *
     * @param {Object} customers
     */
    _computeDailyStats = (customers) => {
        const missedPayments = {};
        const missedTransactions = {};
        let dailyLoss = 0;
        let customersTotal = 0;
        let obtainedTotal = 0;

        const customerEntries = Object.entries(customers)
        for (const [customerId, customer] of customerEntries) {

            // cancels the payment and receipt transactions to find out which one don't have an equivalent.
            const [paidSurplus, suppliedSurplus] = cancelArrays(customer.paymentTransactions, customer.recievedTransactions);
            missedTransactions[customerId] = { paidSurplus, suppliedSurplus };

            // amounts that customers didn't pay (can be negative, in which case, the customer is owed money).
            const customerPaid = customer.paidTotal;
            const customerSupplied = customer.suppliedTotal;
            const balance = customerSupplied - customerPaid;
            if (balance !== 0) {
                missedPayments[customerId] = balance;
                dailyLoss += balance;
            }
            // daily totals
            obtainedTotal += Number(customerSupplied);
            customersTotal += Number(customerPaid);

        }
        const customersAverage = customersTotal / (customerEntries.length || 0);
        const obtainedAverage = obtainedTotal / (customerEntries.length || 0);
        return {
            missedPayments,
            missedTransactions,
            dailyLoss,
            customersTotal,
            customersAverage,
            obtainedAverage,
        };
    };

    ////////////////// //////// //////////////////
    ////////////////// HANDLERS //////////////////
    ////////////////// //////// //////////////////

    /**
     *
     */
    clearAll = async () => {
        await this.setState({
            daysRawData: Object.fromEntries(
                zip(this.DAYS, Array(3).fill({ customers: [], suppliers: [] }))
            ),
            showDayForm: false,
            eventExpenses: {},
            dailyAccounting: Object.fromEntries(
                zip(this.DAYS, Array(3).fill({ tombolaTickets: 0 }))
            ),
            supplierTotal: 0,
            costTotal: 0,
            ticketPrice: 0,
        });
        await this._computeResults();
        await this._addMessage(
            "",
            "Tout le contenu a été réinitialisé",
            "error",
            5000
        );
        await this.toggleReset();
    };
    onClickLoad = async () => {
        await this._loadSave('saved-state-manual');
        await this.toggleLoad();
    }
    onClickSave = async () => {
        await this._saveState('saved-state-manual');
        await this.toggleSave();
    }
    onClickSaveFile = async () => {
        const data = JSON.stringify({
            daysRawData: this.state.daysRawData,
            eventExpenses: this.state.eventExpenses,
            dailyAccounting: this.state.dailyAccounting,
            ticketPrice: this.state.ticketPrice,
            costTotal: this.state.costTotal,
        })
        download(
            data,
            `marche-de-noel-${formattedDate()}.json`,
            'application/json'
        );
        await this.toggleSave();
    }
    onClose = async () => {
        await this._saveState('saved-state-auto');
    }
    /**
     *
     * @param {DropEvent} event
     */
    onDrop = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        const dt = event.dataTransfer;
        if (!dt || !dt.types.includes('Files')) {
            return;
        } else {
            await this._openFile(dt.files[0]);
        }
        this.setState({ isDragHover: false });
    }
    /**
     * Handles the change in the file input that is used to load a saved .json file.
     *
     * @param {Blob} file
     */
    onFileInputChange = async (files) => {
        const file = files[0];
        const success = await this._openFile(file);
        if (success) {
            await this.toggleLoad();
        }
    }
    /**
     *
     * @param {mouseEvent} e
     */
    onFileInputWrapperClick = (e) => {
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
     * This is a handler given to the DayForm to propagate the raw daily data to here.
     *
     * @param {String} day
     * @param {Object} data
     * @param {Object} dayAccounting The additional accounting informations related to 1 single day (currently being the amount of ticket sold)
     */
    onSaveDayForm = async (day, data, dayAccounting) => {
        const daysRawData = Object.assign({}, this.state.daysRawData);
        daysRawData[day] = data;
        await this.setState({
            daysRawData,
            dailyAccounting: Object.assign(this.state.dailyAccounting, {
                [day]: dayAccounting,
            }),
        });
        await this._computeResults();
    };
    /**
     * Handler for event form.
     * @param {Object} param0
     * @param {Object} param0.eventExpenses
     * @param {Number} param0.ticketPrice
     */
    onSaveEventForm = async ({ eventExpenses, ticketPrice }) => {
        let costTotal = 0;
        Object.values(eventExpenses).forEach((val) => (costTotal += val));
        await this.setState({ eventExpenses, ticketPrice, costTotal });
    };
    /**
     *
     * @param {String} day
     */
    toggleDay = async (day) => {
        const isSameDay = this.state.showDayForm === day;
        await this.setState({ showDayForm: false, showForm: false });
        if (!isSameDay) {
            await this.setState({ showDayForm: day });
        }
    };
    toggleEventForm = async () => {
        const isOpen = this.state.showForm;
        await this.setState({ showForm: !isOpen, showDayForm: false });
        if (isOpen) {
            this._computeResults();
        }
    };
    toggleHelp = async () => {
        await this.setState({ showHelp: !this.state.showHelp });
    };
    toggleLoad = async () => {
        await this.setState({ loadRequested: !this.state.loadRequested });
    };
    toggleReset = async () => {
        await this.setState({ resetRequested: !this.state.resetRequested });
    };
    toggleSave = async () => {
        await this.setState({ saveRequested: !this.state.saveRequested });
    };

    ////////////////// //////// //////////////////
    ///////////////////// DOM ////////////////////
    ////////////////// //////// //////////////////

    /**
     * Generates the buttons to be given to the top nav-bar.
     *
     * @returns {Array} buttons
     */
    _getButtons() {
        // ACCOUNTING
        const buttons = [
            {
                className: (this.state.showForm ? "active" : "") + " purple",
                fa: "fa-eur",
                content: "Comptabilité",
                callBack: this.toggleEventForm,
            },
        ];

        // ADD DAYS
        for (const day of this.DAYS) {
            buttons.push({
                className:
                    (this.state.showDayForm === day ? "active " : "") +
                    (this.state.daysRawData[day].customers.length
                        ? "green"
                        : "alert"),
                fa: "fa-calendar",
                callBack: () => {
                    this.toggleDay(day);
                },
                content: day,
            });
        }

        // COMPUTE
        /*
        if (Object.keys(this.state.daysRawData).length && !this.state.showForm && !this.state.resetRequested) {
            buttons.push({ content: 'Calculer', fa: 'fa-plus', className: 'green', callBack: this._computeResults });
        }
        */

        // RIGHT
        buttons.push({
            content: "Aide",
            fa: "fa-info-circle",
            className: ("blue order-2 ml-auto " + (!!this.state.showHelp && 'active')),
            callBack: this.toggleHelp,
        });

        // REMOVE FILES
        if (!(this.state.saveRequested || this.state.loadRequested)) {
            let resetButtons = [
                {
                    content: "Tout effacer",
                    fa: "fa-trash",
                    className: "warning",
                    callBack: this.toggleReset,
                },
            ];
            if (this.state.resetRequested) {
                resetButtons = [
                    {
                        content: "Annuler",
                        fa: "fa-times",
                        className: "green",
                        callBack: this.toggleReset,
                    },
                    {
                        content: "Confirmer: Effacer l'encodage en cours",
                        fa: "fa-check",
                        className: "alert",
                        callBack: this.clearAll,
                    },
                ];
            }
            buttons.push(...resetButtons);
        }

        // SAVE
        let saveButtons = [
            {
                content: "Sauvegarder",
                fa: "fa-floppy-o",
                className: "green order-2",
                callBack: this.toggleSave,
            },
        ];
        if (this.state.saveRequested) {
            saveButtons = [
                {
                    content: "Annuler",
                    fa: "fa-times",
                    className: "alert",
                    callBack: this.toggleSave,
                },
                {
                    content: "Sauvegarde locale",
                    fa: "fa-cloud-download",
                    className: "warning",
                    callBack: this.onClickSave,
                },
                {
                    content: "Télécharger la sauvegarde",
                    fa: "fa-download",
                    className: "warning",
                    callBack: this.onClickSaveFile,
                },
            ];
        }
        if (!this.state.loadRequested) {
            buttons.push(...saveButtons);
        }

        // LOAD
        let loadButtons = [
            {
                content: "Charger",
                fa: "fa-upload",
                className: "green order-2",
                callBack: this.toggleLoad,
            },
        ];
        if (this.state.loadRequested) {
            loadButtons = [
                {
                    content: "Annuler",
                    fa: "fa-times",
                    className: "alert",
                    callBack: this.toggleLoad,
                },
                {
                    content: "Charger sauvegarde locale",
                    fa: "fa-cloud-upload",
                    className: "warning",
                    callBack: this.onClickLoad,
                },
                {
                    fa: "fa-upload",
                    className: "warning",
                    callBack: (e) => this.onFileInputWrapperClick(e),
                    content: (<FileInput label={`"Charger depuis un fichier .JSON"`} className="noselect" value={undefined} onChange={this.onFileInputChange} />)
                },
            ];
        }
        if (!this.state.saveRequested) {
            buttons.push(...loadButtons);
        }
        return buttons;
    }

    render() {
        return (
            <div
                className='marche-page'
                onDrop={(e) => this.onDrop(e)}
                onDragOver={
                    (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                }
            >
                <NavBar buttons={this._getButtons()} />
                {!!this.state.popupIds.length && (
                    <Popups
                        messageIds={this.state.popupIds}
                        messages={this.state.popups}
                    />
                )}
                {!!this.state.showHelp && (
                    <HelpBox/>
                )}
                {!!this.DAYS.includes(this.state.showDayForm) && (
                    <DayForm
                        day={this.state.showDayForm}
                        dayRawData={
                            this.state.daysRawData[this.state.showDayForm]
                        }
                        save={this.onSaveDayForm}
                        addMessage={this._addMessage}
                        missedTransactions={ this.state.missedTransactionsByDay[this.state.showDayForm] }
                        dailyAccounting={
                            this.state.dailyAccounting[this.state.showDayForm]
                        }
                    />
                )}
                {!!this.state.showForm && (
                    <EventForm
                        eventExpenses={this.state.eventExpenses}
                        ticketPrice={this.state.ticketPrice}
                        save={this.onSaveEventForm}
                    />
                )}
                <PageData
                    days={this.state.days}
                    dailyAccounting={this.state.dailyAccounting}
                    ticketPrice={this.state.ticketPrice}
                    costTotal={this.state.costTotal}
                    suppliers={this.state.suppliers}
                    openDay={this.state.showDayForm}
                    supplierTotal={this.state.supplierTotal}
                    supplierRealGain={this.state.supplierRealGain}
                />
            </div>
        );
    }
}

export default Marche;
