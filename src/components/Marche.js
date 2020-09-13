import React, { useState } from 'react';
import './Marche.css';

import NavBar from './NavBar.js';
import PageData from './PageData.js';
import FileInput from './FileInput.js';

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
     * numeroClient,Fournisseur,achat,numeroFournisseur,numeroClient,prix,total // row1
     * 600,65,objet,56,576,55,110 // row2
     * x,x,x,x,x,x,
     * x,x,x,x,x,x,
     * . . .
     * .
     * .
     *
     */
    _getDay = (page) => {
        const lines = page.split(/\r\n|\n/); // remove first line
        lines.shift();
        const rowNames = lines.shift().split(','); // removes 2nd line
        const clients = [];
        const fournisseurs = [];
        while (lines.length) {
            const currentLine = lines.shift().split(',');
            const client = {
                [rowNames[0]]: currentLine[0],
                [rowNames[1]]: currentLine[1],
                [rowNames[2]]: currentLine[2],
            };
            const fournisseur = {
                [rowNames[3]]: currentLine[3],
                [rowNames[4]]: currentLine[4],
                [rowNames[5]]: currentLine[5],
                [rowNames[6]]: currentLine[6],
            };
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
        let resetButtons = [{content: 'Reset Files', className: 'warning', callBack: this._toggleReset}]
        if (this.state.resetRequested) {
            resetButtons = [
                {content: 'Cancel', className: 'green', callBack: this._toggleReset},
                {content: 'Confirm', className: 'alert', callBack: this.resetFiles},
            ];
        }
        return [
            {className: 'darker', content: (<FileInput label={`Ajouter | jours: ${this.state.days.length}`} className="noselect" value={this.state.files} onChange={this.onInputChange} />)},
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
