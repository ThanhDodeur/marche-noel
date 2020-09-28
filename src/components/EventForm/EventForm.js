import React, { useRef, useState } from "react";
import "./EventForm.css";

/*
 * Represents a whole page of data for all the uploaded days.
 * eventAccounting: {
        room: 0,
        transaction: 0,
        insurance: 0,
        paper: 0,
        stamps: 0,
        groceries: 0,
        traiteur: 0,
        schmitz: 0,
    },
 */
function EventForm({ eventAccounting, save }) {

    const [room, setRoom] = useState( eventAccounting.room );
    const [transaction, setTransaction] = useState( eventAccounting.transaction );
    const [insurance, setInsurance] = useState( eventAccounting.insurance );
    const [paper, setPaper] = useState( eventAccounting.paper );
    const [stamps, setStamps] = useState( eventAccounting.stamps );
    const [groceries, setGroceries] = useState( eventAccounting.groceries );
    const [traiteur, setTraiteur] = useState( eventAccounting.traiteur );
    const [schmitz, setSchmitz] = useState( eventAccounting.schmitz );

    function process() {
        save({
            room,
            transaction,
            insurance,
            paper,
            stamps,
            groceries,
            traiteur,
            schmitz,
        });
    }
    return (
        <div className="content">
            <div className="form">
                <div className="input-grid">
                    <div>
                        <span>Salle: </span>
                        <input onChange={(event) => { setRoom(Number(event.target.value))}} pattern="[0-9]*" type="number" value={room}/> €
                    </div>
                    <div>
                        <span>Transactions: </span>
                        <input onChange={(event) => { setTransaction(Number(event.target.value))}} pattern="[0-9]*" type="number" value={transaction}/> €
                    </div>
                    <div>
                        <span>Assurance: </span>
                        <input onChange={(event) => { setInsurance(Number(event.target.value))}} pattern="[0-9]*" type="number" value={insurance}/> €
                    </div>
                    <div>
                        <span>Papeterie: </span>
                        <input onChange={(event) => { setPaper(Number(event.target.value))}} pattern="[0-9]*" type="number" value={paper}/> €
                    </div>
                    <div>
                        <span>Timbres: </span>
                        <input onChange={(event) => { setStamps(Number(event.target.value))}} pattern="[0-9]*" type="number" value={stamps}/> €
                    </div>
                    <div>
                        <span>Courses: </span>
                        <input onChange={(event) => { setGroceries(Number(event.target.value))}} pattern="[0-9]*" type="number" value={groceries}/> €
                    </div>
                    <div>
                        <span>Traiteur: </span>
                        <input onChange={(event) => { setTraiteur(Number(event.target.value))}} pattern="[0-9]*" type="number" value={traiteur}/> €
                    </div>
                    <div>
                        <span>Schmitz: </span>
                        <input onChange={(event) => { setSchmitz(Number(event.target.value))}} pattern="[0-9]*" type="number" value={schmitz}/> €
                    </div>
                </div>
                <div className="form-button" onClick={process}>
                    <span>ENREGISTRER</span>
                </div>
            </div>
        </div>
    );
}

export default EventForm;
