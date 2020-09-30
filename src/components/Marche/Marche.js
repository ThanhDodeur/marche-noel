import React from 'react';
import './Marche.css';

import { newId, times } from '../../utils/utils.js';
import NavBar from '../NavBar/NavBar.js';
import Popups from '../Popups/Popups.js';
import PageData from '../PageData/PageData.js';
import FileInput from '../FileInput/FileInput.js';
import EventForm from '../EventForm/EventForm.js';

class Marche extends React.Component {
    constructor(props) {
        super();
        this.state = {
            files: {}, // { dayName: file, }
            days: [], // { dayName, customers, missedPayments, dailyLoss, customersAverage, obtainedAverage }
            suppliers: {}, // { supplierId : { total } }
            resetRequested: false, // toggle for the confirm/cancel buttons for removing files
            showForm: false, // toggle for the accounting/event input form
            eventExpenses: {}, // {expenseName: <int>amount}
            dailyAccounting: {}, // { dayName: {valuesDict} }
            supplierTotal: 0,
            costTotal: 0,
            ticketPrice: 0,
            popupIds: [],
            popups: {}, // {content, type}
        };
        this.DAYS = ['Vendredi', 'Samedi', 'Dimanche']; // const
    }
    /**
     *
     * @param {String} title
     * @param {String} content text content of the message
     * @param {String} [type] info | error
     * @param {Number} [duration] amount of ms
     */
    _addMessage = async (title, content, type, duration) => {
        duration = duration || 5000;
        type = type || 'info';
        const id = newId('message');
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
    }
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
            this._addMessage('ERREUR', error.message, 'error');
            return false;
        }
    }
    _removeFile = async (dayName) => {
        const files = Object.assign({}, this.state.files);
        delete files[dayName];
        await this.setState({ files });
    }
    /**
     * Extracts values from files.
     *
     * @param {Array} files
     * @returns {Object}
     */
    _processFiles = async (files) => {
        const days = [];
        let suppliers = {};
        let supplierTotal = 0;
        for (const [dayName, file] of Object.entries(files)) {
            const page = await this._readFile(file);
            if (!page) {
                await this._removeFile(dayName);
                continue;
            }
            const result = this._computeFile({ dayName, page, suppliers });
            suppliers = result.suppliers;
            days.push(result.day);
        }
        Object.values(suppliers).forEach(val => supplierTotal += val.total);
        return { days, suppliers, supplierTotal };
    }
    /**
     * Expected structure of page:
     *
     * ,,,,,,... // row0
     * numeroClient,Fournisseur,achat,numeroFournisseur,numeroClient,prix,total,... n-1, n // row x
     * 600,65,objet,56,576,55,110,... n-1, n // row X+1
     * x,x,x,x,x,x,... m-1, m,... n-1, n
     * x,x,x,x,x,x,... m-1, m,... n-1, n
     * . . .
     * .
     * .
     * where:
     *  x = OFFSET_HEIGHT
     *  x + 1 = column names
     *  m = CLIENT_COLS
     *  n - m = FOURNISSEUR_COLS
     *
     * @param {String} page open text file
     * @return {Object}
     */
    _computeFile = ({ dayName, page, suppliers }) => {
        const OFFSET_HEIGHT = 1; // does not include the column titles.
        const lines = page.split(/\r\n|\n/);
        times(OFFSET_HEIGHT) (() => lines.shift());
        // colNames
        lines.shift().split(','); // removes and saves column titles.
        /*
        *
        * customers = { clientId: { supplied, suppliedTotal, paid, paidTotal } }
        * supplied = [ {name: 'itemName', 'price': price, 'supplierId': id } ] WHAT IS PAID
        * paid = [ {name: 'itemName', 'price': price, 'supplierId': id } ]
        *
        * suppliers = { supplierId : { total } }
        *
        */
        const customers = {};
        while (lines.length) {
            const currentLine = lines.shift().split(',');

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

            if (currentLine[0]) { // CUSTOMER SIDE
                // creates the customer if it doesn't already exist.
                customers[currentLine[0]] = customers[currentLine[0]] || {
                    paid: [],
                    paidTotal: 0,
                    supplied: [],
                    suppliedTotal: 0,
                };
                // adds the total paid by the customer
                customers[currentLine[0]].paidTotal += Number(currentLine[3].replace(',','.'));
                // adds a line for what the customer paid
                customers[currentLine[0]].paid.push({
                    name: currentLine[2],
                    price: currentLine[3],
                    supplierId: currentLine[1],
                });
            }

            if (currentLine[4] && currentLine[5]) { // SUPPLIER SIDE
                customers[currentLine[5]] = customers[currentLine[5]] || {
                    paid: [],
                    paidTotal: 0,
                    supplied: [],
                    suppliedTotal: 0,
                };
                // adds the total paid by the customer
                customers[currentLine[5]].suppliedTotal += Number(currentLine[7].replace(',','.'));
                // adds a line for what the customer recieved (not a guarantee of payment)
                customers[currentLine[5]].supplied.push({
                    name: currentLine[6],
                    price: currentLine[7],
                    supplierId: currentLine[4],
                });
                // computes the total value of supplied by the supplier.
                suppliers[currentLine[4]] = suppliers[currentLine[4]] || { total: 0 };
                suppliers[currentLine[4]].total += Number(currentLine[7].replace(',','.'));
            }
        }
        const { missedPayments, dailyLoss, customersAverage, obtainedAverage } = this._computeDailyStats(customers);
        return {day: { dayName, customers, missedPayments, dailyLoss, customersAverage, obtainedAverage }, suppliers };
    }
    _computeDailyStats = (customers) => {
        const missedPayments = {};
        let dailyLoss = 0;
        let customersTotal = 0;
        let obtainedTotal = 0;
        const customerKeys = Object.keys(customers);
        for (const customerId of customerKeys) {
            const customerPaid = customers[customerId].paidTotal;
            const customerSupplied = customers[customerId].suppliedTotal;
            const balance =  customerSupplied - customerPaid;
            obtainedTotal += customerSupplied;
            customersTotal += customerPaid;
            if (balance !== 0) {
                missedPayments[customerId] = balance;
                dailyLoss += balance;
            }
        }
        const customersAverage = customersTotal / (customerKeys.length || 0);
        const obtainedAverage = obtainedTotal / (customerKeys.length || 0);
        return { missedPayments, dailyLoss, customersTotal, customersAverage, obtainedAverage };
    }
    /**
    * Brief description of the function here.
    *
    * @return {Object[]} [{content, className, fa, callBack}]
    */
    _getButtons() {
        let resetButtons = [];
        if (Object.keys(this.state.files).length) {
            resetButtons = [{content: 'Retirer les fichiers', fa: 'fa-trash', className: 'warning', callBack: this.toggleReset}];
        }
        if (this.state.resetRequested) {
            resetButtons = [
                {content: 'Annuler', fa: 'fa-times', className: 'green', callBack: this.toggleReset},
                {content: 'Confirmer', fa: 'fa-check', className: 'alert', callBack: this.resetFiles},
            ];
        }
        const dayButtons = [];
        for (const day of this.DAYS) {
            dayButtons.push(
                {className: (this.state.files[day] ? 'green' : 'alert'), fa: 'fa-upload', content: (<FileInput label={day} className="noselect" value={this.state.files[day]} onChange={val => {this.onFileInputChange(val, day)}} />)},
            )
        }
        const buttons = [
            {className: ((this.state.showForm ? 'active' : '') + ' purple'), fa: 'fa-eur', content: 'Comptabilité', callBack: this.toggleEventForm},
        ].concat(dayButtons, resetButtons);

        if (Object.keys(this.state.files).length && !this.state.showForm && !this.state.resetRequested) {
            buttons.push({ content: 'Calculer', fa: 'fa-plus', className: 'green', callBack: this._computeResults });
        }
        return buttons;
    }

    ////////////////// //////// //////////////////
    ////////////////// HANDLERS //////////////////
    ////////////////// //////// //////////////////

    /**
    * Handler for File Input onChange.
    *
    * @param {file[]} files
    * @return {void}
    */
   onFileInputChange = async (files, name) => {
        const file = files[0];
        if (!file.name.includes('.csv')) {
            this._addMessage('ERREUR', 'Le fichier doit être un .csv', 'error');
            return;
        }
        await this.setState({ files: Object.assign({}, this.state.files, {[name]: file})});
    }
    /**
    * Handler for event form.
    */
    onEventFormSave = async ({ eventExpenses, dailyAccounting, ticketPrice }) => {
        let costTotal = 0;
        Object.values(eventExpenses).forEach(val => costTotal += val);
        await this.setState({ eventExpenses, ticketPrice, dailyAccounting, costTotal });
    }
    /**
    * processes the files and updates the state.
    */
    _computeResults = async () => {
        const { days, suppliers, supplierTotal } = await this._processFiles(this.state.files);
        await this.setState({ days, suppliers, supplierTotal });
    }
    /**
    *
    */
    resetFiles = async () => {
        await this.setState({files: [], days: [], pages: [], supplierTotal: 0});
        this.toggleReset();
    }
    /**
    *
    */
    toggleReset = async () => {
        await this.setState({ resetRequested: !this.state.resetRequested });
    }
    /**
    *
    */
    toggleEventForm = async () => {
        const isOpen = this.state.showForm;
        await this.setState({ showForm: !isOpen });
        if (isOpen) {
            this._computeResults();
        }
    }
    /**
     * add encodage popup with button toggle
     * location salle, location bancontact et frais de transaction, assurance, papetrie, timbres, courses restaurant, traiteur, schmitz
     * form component with callback to change state here with new data.
     *
     * Add full data (all prices + price computation)
     *
     */
    render() {
        return <div>
            <NavBar
                buttons={this._getButtons()}
            />
            {!!this.state.popupIds.length &&
                <Popups messageIds={this.state.popupIds} messages={this.state.popups}/>
            }
            {!!this.state.showForm ? (
                <EventForm eventExpenses={this.state.eventExpenses} dailyAccounting={this.state.dailyAccounting} dayList={this.DAYS} ticketPrice={this.state.ticketPrice} save={this.onEventFormSave}/>
            ) : (
                <PageData days={this.state.days} dailyAccounting={this.state.dailyAccounting} ticketPrice={this.state.ticketPrice} costTotal={this.state.costTotal} supplierTotal={this.state.supplierTotal}/>
            )}
        </div>
    }
}

export default Marche;
