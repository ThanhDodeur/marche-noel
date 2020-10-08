import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { saveAccounting, feedCompute } from "../../store/marche.js";
import { EXPENSE_TYPES } from "../../utils/constants.js";
import "./EventForm.css";

/*
 * All the inputs to register the expenses of the event.
 */
function EventForm(props) {

    const eventExpensesState = useSelector(store => store.marche.eventExpenses);
    const ticketP = useSelector(store => store.marche.ticketPrice);
    const dispatch = useDispatch();

    async function setExpense(expense, value) {
        const accountingState = eventExpensesState;
        accountingState[expense] = value;
        dispatch(saveAccounting(accountingState));
    }

    async function setTicketPrice(value) {
        dispatch(feedCompute({ ticketPrice: Number(value) }));
    }

    function getExpenseValue(expense) {
        return eventExpensesState[expense] || 0;
    }

    function renderEventExpenses() {
        return (
            <div className="input-grid left">
                {EXPENSE_TYPES.map(expense => {
                    return (
                        <div key={'input_container_'+expense}>
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
                    <input className="accounting-input" onChange={event => { setTicketPrice(event.target.value) }} pattern="[0-9]*" type="number" value={ticketP}/>€
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
