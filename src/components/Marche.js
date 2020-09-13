import React, { useState } from 'react';
import './Marche.css';

import NavBar from './NavBar.js';
import PageData from './PageData.js';
import FileInput from './FileInput.js';

function Marche(props) {
    const [state, setState] = useState({
        files: [],
        days: [],
    });

    async function updateState(updates) {
        await setState({ ...state, ...updates });
    }

    async function onInputChange(files) {
        state.files = files;
        const newDays = [];
        for (const file of files) {
            const page = await _getFile(file);
            const day = _getDay(page);
            newDays.push(day);
        }
        const days = state.days.concat(newDays);
        await updateState({ days });
    }

    async function _getFile(file) {
        const reader = new FileReader();
        reader.readAsText(file);
        return new Promise((resolve) => {
            reader.onload = (e) => {
                resolve(reader.result);
            };
        });
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
    function _getDay(page) {
        const lines = page.split(/\r\n|\n/); // remove first line
        lines.shift();
        const rowNames = lines.shift().split(','); // removes 2nd line
        const clients = [];
        const fournisseurs = [];
        while (lines.length) {
            const currentLine = lines.shift();
            const client = {
                [rowNames[0]]: currentLine[0],
                [rowNames[1]]: currentLine[1],
                [rowNames[2]]: currentLine[2],
            };
            const fournisseur = {
                [rowNames[3]]: currentLine[3],
                [rowNames[4]]: currentLine[4],
                [rowNames[5]]: currentLine[5],
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

    function resetFiles() {
        updateState({ days: [], files: [] });
    }

    return (
        <div>
            <NavBar 
                buttons={[
                    {label: '', content: (<FileInput label={`Ajouter | jours: ${state.days.length}`} className="noselect" value={state.files} onChange={onInputChange} />)},
                    {label: 'Reset Files', content: '', callBack: resetFiles},
                ]}
            />
            {!!state.days.length && 
                <PageData days={state.days}/>
            }
        </div>
    );
}

export default Marche;
