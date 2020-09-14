import React, { useState } from 'react';
import './Marche.css';

import NavBar from '../NavBar/NavBar.js';
import PageData from '../PageData/PageData.js';
import FileInput from '../FileInput/FileInput.js';

class Marche extends React.Component {
    constructor(props) {
        super();
        this.state = {
            files: [],
            days: [],
            resetRequested: false,
        };
    }
    /**
    *
    * @param {blob} blob
    * @return {file}
    */
    _getFile = async (blob) => {
        const reader = new FileReader();
        reader.readAsText(blob);
        return new Promise((resolve) => {
            reader.onload = (e) => {
                resolve(reader.result);
            };
        });
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
    _getDay = (page) => {
        const OFFSET_HEIGHT = 1; // does not include the column titles.
        const CLIENT_COLS = 3;
        const FOURNISSEUR_COLS = 4; // should be equal to colNames.length - CLIENT_COLS
        const lines = page.split(/\r\n|\n/);
        for (const i of Array(OFFSET_HEIGHT)) {
            lines.shift();
        }
        const colNames = lines.shift().split(','); // removes and saves column titles.
        const clients = [];
        const fournisseurs = [];
        while (lines.length) {
            const currentLine = lines.shift().split(',');
            // CLIENTS
            const client = {};
            for (let i of [...Array(CLIENT_COLS).keys()]) {
                client[colNames[i]] = currentLine[i];
            }
            // FOURNISSEURS
            const fournisseur = {};
            for (let i of [...Array(FOURNISSEUR_COLS).keys()]) {
                const index = i + CLIENT_COLS;
                fournisseur[colNames[index]] = currentLine[index];
            }
            if (currentLine[0]) { // if no client id.
                clients.push(client);
            }
            if (currentLine[CLIENT_COLS]) { // if no fournisseur id.
                fournisseurs.push(fournisseur);
            }
        }
        return { clients, fournisseurs };
    }
    /**
    * Handler for File Input onChange.
    *
    * @param {file[]} files
    * @return {void}
    */
    onFileInputChange = async (files) => {
        this.state.files = files;
        const newDays = [];
        for (const file of files) {
            const page = await this._getFile(file);
            const day = this._getDay(page);
            newDays.push(day);
        }
        const days = this.state.days.concat(newDays);
        this.setState({ days });
    }

    resetFiles = () => {
        this.setState({days: [], pages: []});
        this.toggleReset();
    }

    toggleReset = () => {
        this.setState({ resetRequested: !this.state.resetRequested });
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
        return [
            {className: 'blue', fa: 'fa-upload', content: (<FileInput label={`Ajouter | jours: ${this.state.days.length}`} className="noselect" value={this.state.files} onChange={this.onFileInputChange} />)},
        ].concat(resetButtons);
    }

    render() {
        return <div>
            <NavBar
                buttons={this._getButtons()}
            />
            {!!this.state.days.length &&
                <PageData days={this.state.days}/>
            }
        </div>
    }
}

export default Marche;
