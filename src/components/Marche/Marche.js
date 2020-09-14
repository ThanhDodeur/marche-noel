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

    _getFile = async (file) => {
        const reader = new FileReader();
        reader.readAsText(file);
        return new Promise((resolve) => {
            reader.onload = (e) => {
                resolve(reader.result);
            };
        });
    }

    onInputChange = async (files) => {
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
    /*
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
            const client = {};
            for (let i of [...Array(CLIENT_COLS).keys()]) {
                client[colNames[i]] = currentLine[i];
            }
            const fournisseur = {};
            for (let i of [...Array(FOURNISSEUR_COLS).keys()]) {
                const index = i + CLIENT_COLS;
                fournisseur[colNames[index]] = currentLine[index];
            }
            if (currentLine[0]) {
                clients.push(client);
            }
            if (currentLine[3]) {
                fournisseurs.push(fournisseur);
            }
        }
        return { clients, fournisseurs };
    }

    resetFiles = () => {
        this.setState({days: [], pages: []});
        this._toggleReset();
    }

    _toggleReset = () => {
        this.setState({ resetRequested: !this.state.resetRequested });
    }

    _getButtons() {
        let resetButtons = [{content: 'Reset Files', fa: 'fa-trash', className: 'warning', callBack: this._toggleReset}]
        if (this.state.resetRequested) {
            resetButtons = [
                {content: 'Cancel', fa: 'fa-times', className: 'green', callBack: this._toggleReset},
                {content: 'Confirm', fa: 'fa-check', className: 'alert', callBack: this.resetFiles},
            ];
        }
        return [
            {className: 'darker', fa: 'fa-upload', content: (<FileInput label={`Ajouter | jours: ${this.state.days.length}`} className="noselect" value={this.state.files} onChange={this.onInputChange} />)},
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
