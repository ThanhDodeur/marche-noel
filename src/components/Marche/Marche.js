import React, { useState } from 'react';
import './Marche.css';

import NavBar from '../NavBar/NavBar.js';
import FileInput from '../FileInput/FileInput.js';

class Marche extends React.Component {
    constructor(props) {
        super();
        this.state = {
            files: [],
            days: [], // { customers, missedPayments }
            suppliers: {}, // { supplierId : { total } }
            resetRequested: false,
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
        const newDays = [];
        let suppliers = Object.assign({}, this.state.suppliers);
        for (const file of files) {
            const page = await this._readFile(file);
            const result = this._computeFile(page, suppliers);
            suppliers = result.suppliers;
            newDays.push(result.day);
        }
        const days = this.state.days.concat(newDays);
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
        * customers = { clientId: { supplied , paid } }
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

            if (currentLine[0]) {
                // creates the customer if it doesn't already exist.
                customers[currentLine[0]] = customers[currentLine[0]] || {
                    supplied: [],
                    paid: [],
                };
                // adds a line for what the customer paid
                customers[currentLine[0]].paid.push({
                    name: currentLine[2],
                    price: currentLine[3],
                    supplierId: currentLine[1],
                });
            }

            if (currentLine[4] && currentLine[5]) {
                customers[currentLine[5]] = customers[currentLine[5]] || {
                    supplied: [],
                    paid: [],
                };
                // adds a line for what the customer paid
                customers[currentLine[5]].supplied.push({
                    name: currentLine[6],
                    price: currentLine[7],
                    supplierId: currentLine[4],
                });
                suppliers[currentLine[4]] = suppliers[currentLine[4]] || { total: 0 };
                suppliers[currentLine[4]].total += Number(currentLine[7].replace(',','.'));
            }
        }
        const missedPayments = this._computeMissedPayments(customers);
        return {day: { customers, missedPayments }, suppliers };
    }
    _computeMissedPayments = (customers) => {
        return [];
    }
    /**
    * Brief description of the function here.
    *
    * @return {Object[]} [{content, className, fa, callBack}]
    */
    _getButtons() {
        let resetButtons = [{content: 'Reset Files', fa: 'fa-trash', className: 'warning', callBack: this.toggleReset}]
        if (this.state.resetRequested) {
            resetButtons = [
                {content: 'Cancel', fa: 'fa-times', className: 'green', callBack: this.toggleReset},
                {content: 'Confirm', fa: 'fa-check', className: 'alert', callBack: this.resetFiles},
            ];
        }
        const buttons = [
            {className: 'blue', fa: 'fa-upload', content: (<FileInput label={`Ajouter | jours: ${this.state.days.length}`} className="noselect" value={this.state.files} onChange={this.onFileInputChange} />)},
        ].concat(resetButtons);

        if (this.state.days) {
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
        this.state.files = files;
        await this._processFiles(files);
    }
    /**
    * Brief description of the function here.
    *
    * @return {Object[]} [{content, className, fa, callBack}]
    */
    computeResults = () => {
        // add up expenses
        // add up suppliers sale totals
        return;
    }
    /**
    * Brief description of the function here.
    *
    * @return {Object[]} [{content, className, fa, callBack}]
    */
    resetFiles = () => {
        this.setState({days: [], pages: []});
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
        </div>
    }
}

export default Marche;
