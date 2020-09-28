import React from 'react';
import './Marche.css';

import NavBar from '../NavBar/NavBar.js';
import PageData from '../PageData/PageData.js';
import FileInput from '../FileInput/FileInput.js';
import EventForm from '../EventForm/EventForm.js';

class Marche extends React.Component {
    constructor(props) {
        super();
        this.state = {
            files: [],
            days: [], // { customers, missedPayments }
            suppliers: {}, // { supplierId : { total } }
            resetRequested: false,
            showForm: false,
            eventAccounting: {
                room: 0,
                transaction: 0,
                insurance: 0,
                paper: 0,
                stamps: 0,
                groceries: 0,
                traiteur: 0,
                schmitz: 0,
            },
            supplierTotal: 0,
            costTotal: 0,
            eventTotal: 0,
        };
    }
    /**
    *
    * @param {blob} blob
    * @return {file}
    */
    _readFile = async (blob) => {
        const reader = new FileReader();
        reader.readAsText(blob);
        return new Promise((resolve) => {
            reader.onload = (e) => {
                resolve(reader.result);
            };
        });
    }
    _processFiles = async (files) => {
        const days = [];
        let suppliers = {};
        for (const file of files) {
            const page = await this._readFile(file);
            const result = this._computeFile(page, suppliers);
            suppliers = result.suppliers;
            days.push(result.day);
        }
        this.setState({ days, suppliers });
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
    _computeFile = (page, suppliers) => {
        const OFFSET_HEIGHT = 1; // does not include the column titles.
        const lines = page.split(/\r\n|\n/);
        for (const i of Array(OFFSET_HEIGHT)) {
            lines.shift();
        }
        const colNames = lines.shift().split(','); // removes and saves column titles.
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
                suppliers[currentLine[4]] = suppliers[currentLine[4]] || { total: 0 };
                suppliers[currentLine[4]].total += Number(currentLine[7].replace(',','.'));
            }
        }
        const { missedPayments, dailyLoss } = this._computeMissedPayments(customers);
        return {day: { customers, missedPayments, dailyLoss }, suppliers };
    }
    _computeMissedPayments = (customers) => {
        const missedPayments = {};
        let dailyLoss = 0;
        for (const customerId of Object.keys(customers)) {
            const balance = customers[customerId].suppliedTotal - customers[customerId].paidTotal;
            if (balance !== 0) {
                missedPayments[customerId] = balance;
                dailyLoss += balance;
            }
        }
        return { missedPayments, dailyLoss };
    }
    /**
    * Brief description of the function here.
    *
    * @return {Object[]} [{content, className, fa, callBack}]
    */
    _getButtons() {
        let resetButtons = [];
        if (this.state.files.length) {
            resetButtons = [{content: 'Retirer les fichiers', fa: 'fa-trash', className: 'warning', callBack: this.toggleReset}];
        }
        if (this.state.resetRequested) {
            resetButtons = [
                {content: 'Annuler', fa: 'fa-times', className: 'green', callBack: this.toggleReset},
                {content: 'Confirmer', fa: 'fa-check', className: 'alert', callBack: this.resetFiles},
            ];
        }
        const buttons = [
            {className: 'blue', fa: 'fa-upload', content: (<FileInput label={`Ajouter | jours: ${this.state.files.length}`} className="noselect" value={this.state.files} onChange={this.onFileInputChange} />)},
            {className: ((this.state.showForm ? 'active' : '') + ' purple'), fa: 'fa-eur', content: 'Comptabilité', callBack: this.toggleEventForm},
        ].concat(resetButtons);

        if (this.state.files.length && !this.state.showForm) {
            buttons.push({content: 'Calculer', fa: 'fa-plus', className: 'green', callBack: this.computeResults});
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
   onFileInputChange = async (files) => {
        this.setState({ files: [...this.state.files, ...files]});
    }
    /**
    * Handler for event form.
    */
    onEventFormSave = async (eventAccounting) => {
        let costTotal = 0;
        Object.values(eventAccounting).forEach(val => costTotal += val);
        this.setState({ eventAccounting, costTotal, showForm: false });
        this.computeResults();
    }
    /**
    * Brief description of the function here.
    *
    * @return {Object[]} [{content, className, fa, callBack}]
    */
    computeResults = async () => {
        // add up expenses
        // add up suppliers sale totals
        await this._processFiles(this.state.files);
        let supplierTotal = 0;
        Object.values(this.state.suppliers).forEach(val => supplierTotal += val.total);
        let eventTotal = supplierTotal - this.state.costTotal;
        this.setState({ eventTotal, supplierTotal });
    }
    /**
    * Brief description of the function here.
    *
    * @return {Object[]} [{content, className, fa, callBack}]
    */
    resetFiles = () => {
        this.setState({files: [], days: [], pages: []});
        this.toggleReset();
    }
    /**
    * Brief description of the function here.
    *
    * @return {Object[]} [{content, className, fa, callBack}]
    */
    toggleReset = () => {
        this.setState({ resetRequested: !this.state.resetRequested });
    }
    /**
    *
    */
    toggleEventForm = () => {
        this.setState({ showForm: !this.state.showForm });
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
            {!!this.state.showForm &&
                <EventForm eventAccounting={this.state.eventAccounting} save={this.onEventFormSave}/>
            }
            {(!!this.state.days.length && !this.state.showForm) &&
                <PageData days={this.state.days} costTotal={this.state.costTotal} eventTotal={this.state.eventTotal} supplierTotal={this.state.supplierTotal}/>
            }
        </div>
    }
}

export default Marche;
