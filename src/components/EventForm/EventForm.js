import React, { useState } from "react";
import "./EventForm.css";

/*
 * All the inputs to register the expenses of the event.
 */
function EventForm({ eventAccounting, dailyAccounting, ticketPrice, dayList, save }) {

    const [room, setRoom] = useState( eventAccounting.room || 0 );
    const [transaction, setTransaction] = useState( eventAccounting.transaction || 0 );
    const [insurance, setInsurance] = useState( eventAccounting.insurance || 0 );
    const [paper, setPaper] = useState( eventAccounting.paper || 0 );
    const [stamps, setStamps] = useState( eventAccounting.stamps || 0 );
    const [groceries, setGroceries] = useState( eventAccounting.groceries || 0 );
    const [traiteur, setTraiteur] = useState( eventAccounting.traiteur || 0 );
    const [schmitz, setSchmitz] = useState( eventAccounting.schmitz || 0 );
    const [other, setOther] = useState( eventAccounting.other || 0 );
    const [ticketP, setTicketP] = useState(ticketPrice || 0);

    const [dailyAccountingState, setDailyAccountingState] = useState(dailyAccounting || {});

    function process() {
        save({
            eventAccounting: {
                room,
                transaction,
                insurance,
                paper,
                stamps,
                groceries,
                traiteur,
                schmitz,
                other,
            },
            ticketPrice: ticketP,
            dailyAccounting: dailyAccountingState,
        });
    }

    function renderDailyAccounting() {
        return (
            <div className="input-grid right">
                <div>
                    <span className="accounting-span"> Prix des tickets: </span>
                    <input className="accounting-input" onChange={event => { setTicketP(Number(event.target.value)) }} pattern="[0-9]*" type="number" value={ticketP}/>€
                </div>
                {dayList.map(day => {
                    return(<div>
                        <h3>{day}</h3>
                        <div>
                            <span className="accounting-span"> Tickets de tombola: </span>
                            <input className="accounting-input" onChange={event => { setTombolaTickets(day, Number(event.target.value)) }} pattern="[0-9]*" type="number" value={getTombolaTicketValue(day)}/>
                        </div>
                    </div>
                )})}
            </div>
        )
    }

    function setTombolaTickets(day, value) {
        const dailyState = Object.assign({}, dailyAccountingState);
        if (!dailyState[day]) {
            dailyState[day] = {};
        }

        dailyState[day].tombolaTickets = value;
        setDailyAccountingState(dailyState);
    }

    function getTombolaTicketValue(day) {
        if (dailyAccountingState && dailyAccountingState[day]) {
            return dailyAccountingState[day].tombolaTickets || 0;
        } else {
            return 0;
        }
    }

    return (
        <div className="content">
            <div className="form">
                <div className="input-grid left">
                    <div>
                        <span className="accounting-span">Salle: </span>
                        <input className="accounting-input" onChange={event => { setRoom(Number(event.target.value))}} pattern="[0-9]*" type="number" value={room}/> €
                    </div>
                    <div>
                        <span className="accounting-span">Transactions: </span>
                        <input className="accounting-input" onChange={event => { setTransaction(Number(event.target.value))}} pattern="[0-9]*" type="number" value={transaction}/> €
                    </div>
                    <div>
                        <span className="accounting-span">Assurance: </span>
                        <input className="accounting-input" onChange={event => { setInsurance(Number(event.target.value))}} pattern="[0-9]*" type="number" value={insurance}/> €
                    </div>
                    <div>
                        <span className="accounting-span">Papeterie: </span>
                        <input className="accounting-input" onChange={event => { setPaper(Number(event.target.value))}} pattern="[0-9]*" type="number" value={paper}/> €
                    </div>
                    <div>
                        <span className="accounting-span">Timbres: </span>
                        <input className="accounting-input" onChange={event => { setStamps(Number(event.target.value))}} pattern="[0-9]*" type="number" value={stamps}/> €
                    </div>
                    <div>
                        <span className="accounting-span">Courses: </span>
                        <input className="accounting-input" onChange={event => { setGroceries(Number(event.target.value))}} pattern="[0-9]*" type="number" value={groceries}/> €
                    </div>
                    <div>
                        <span className="accounting-span">Traiteur: </span>
                        <input className="accounting-input" onChange={event => { setTraiteur(Number(event.target.value))}} pattern="[0-9]*" type="number" value={traiteur}/> €
                    </div>
                    <div>
                        <span className="accounting-span">Schmitz: </span>
                        <input className="accounting-input" onChange={event => { setSchmitz(Number(event.target.value))}} pattern="[0-9]*" type="number" value={schmitz}/> €
                    </div>
                    <div>
                        <span className="accounting-span">Autre: </span>
                        <input className="accounting-input" onChange={event => { setOther(Number(event.target.value))}} pattern="[0-9]*" type="number" value={other}/> €
                    </div>
                </div>
                {renderDailyAccounting()}
                <div className="form-button noselect clear" onClick={process}>
                    <span>ENREGISTRER</span>
                </div>
            </div>
        </div>
    );
}

export default EventForm;
