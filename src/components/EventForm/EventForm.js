import React, { useState, useEffect } from "react";
import "./EventForm.css";

/*
 * All the inputs to register the expenses of the event.
 */
function EventForm({ eventAccounting, dailyAccounting, ticketPrice, dayList, save }) {

    const [eventAccountingState, setEventAccountingState] = useState(eventAccounting || {});
    const [ticketP, setTicketP] = useState(ticketPrice || 0);
    const [dailyAccountingState, setDailyAccountingState] = useState(dailyAccounting || {});

    const EXPENSE_TYPES = ['Salle', 'Transactions', 'Assurance', 'Papeterie', 'Timbres', 'Courses', 'Traiteur', 'Schmitz', 'Autre'];

    useEffect(() => {
        // willMount
        return () => {
            // willUnMount
            save({
                eventAccounting: eventAccountingState,
                ticketPrice: ticketP,
                dailyAccounting: dailyAccountingState,
            });
        }
    }, [eventAccountingState, ticketP, dailyAccountingState]);

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

    function setExpense(expense, value) {
        const accountingState = Object.assign({}, eventAccountingState);
        accountingState[expense] = value;
        setEventAccountingState(accountingState);
    }

    function getExpenseValue(expense) {
        return eventAccountingState[expense] || 0;
    }

    function renderEventAccounting() {
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

    return (
        <div className="content">
            <div className="form">
                {renderEventAccounting()}
                {renderDailyAccounting()}
            </div>
        </div>
    );
}

export default EventForm;
