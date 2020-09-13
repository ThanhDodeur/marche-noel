import React, { useState } from 'react';
import './Marche.css';

import NavBar from './NavBar.js';
import FileInput from './FileInput.js';

function Marche(props) {
    const [state, setState] = useState({
        files: [],
        pages: [], // pages corresponding to CSV files.
    });

    async function updateState(updates) {
        await setState({ ...state, ...updates });
    }

    async function onInputChange(files) {
        state.files = files;
        const newPages = [];
        for (const file of files) {
            const page = await _addFile(file);
            newPages.push(page);
        }
        const pages = state.pages.concat(newPages);
        await updateState({ pages });
    }

    async function _addFile(file) {
        const reader = new FileReader();
        reader.readAsText(file);
        return new Promise((resolve) => {
            reader.onload = (e) => {
                resolve(reader.result);
            };
        });
        
    }

    function resetFiles() {
        updateState({ pages: [], files: [] });
    }

    return (
        <div>
            <NavBar 
                buttons={[
                    {label: '', content: (<FileInput label={`Upload Page [${state.pages.length}]`} className="noselect" value={state.files} onChange={onInputChange} />)},
                    {label: 'Reset Files', content: '', callBack: resetFiles},
                ]}
            />
            <div>
            </div>
        </div>
    );
}

export default Marche;
