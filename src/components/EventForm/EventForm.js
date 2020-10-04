import React, { useState, useEffect } from "react";
import "./EventForm.css";

/*
 * All the inputs to register the expenses of the event.
 */
function EventForm({ eventExpenses, ticketPrice, save }) {

    const [eventExpensesState, setEventExpensesState] = useState(eventExpenses || {});
    const [ticketP, setTicketP] = useState(ticketPrice || 0);

    // the names are only relevant in this context, the parent component will just make a sum of all those expenses.
    const EXPENSE_TYPES = ['Salle', 'Transactions', 'Assurance', 'Papeterie', 'Timbres', 'Courses', 'Traiteur', 'Schmitz', 'Autre'];

    useEffect(() => {
        // willMount
        return () => {
            // willUnMount
            save({
                eventExpenses: eventExpensesState,
                ticketPrice: ticketP,
            });
        }
    }, [save, eventExpensesState, ticketP]);


    function setExpense(expense, value) {
        const accountingState = Object.assign({}, eventExpensesState);
        accountingState[expense] = value;
        setEventExpensesState(accountingState);
    }

    function getExpenseValue(expense) {
        return eventExpensesState[expense] || 0;
    }

    function renderEventExpenses() {
        return (
            <div className="input-grid left">
                {EXPENSE_TYPES.map(expense => {
                    return (
                        <div>
                            <span className="accounting-span">{expense}: </span>
                            <input className="accounting-input" onChange={event => { setExpense(expense, Number(event.target.value)) }} pattern="[0-9]*" type="number" value={getExpenseValue(expense)}/> €
                        </div>
                    )
                })}
            </div>
        )
    }

    function renderDailyAccounting() {
        return (
            <div className="input-grid right">
                <div>
                    <span className="accounting-span"> Prix des tickets: </span>
                    <input className="accounting-input" onChange={event => { setTicketP(Number(event.target.value)) }} pattern="[0-9]*" type="number" value={ticketP}/>€
                </div>
            </div>
        )
    }

    return (
        <div className="content">
            <div className="form noselect">
                {renderEventExpenses()}
                {renderDailyAccounting()}
            </div>
        </div>
    );
}

export default EventForm;
