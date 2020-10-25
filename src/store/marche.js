import { DAYS } from '../utils/constants.js'
import { zip, cancelArrays } from '../utils/utils.js'

const SAVE_EXPENSES = 'SAVE_EXPENSES';
const CLEAR_STORE = 'CLEAR_STORE';
const FEED_COMPUTE = 'FEED_COMPUTE';
const SET_STORE = 'SET_STORE';
const SAVE_DAY = 'SAVE_DAY';
const COMPUTE = 'COMPUTE';

    ////////////////// //////// //////////////////
    ////////////////// PRIVATE ///////////////////
    ////////////////// //////// //////////////////

const loadState = () => {
    const saved = localStorage.getItem('auto-store-save');
    let savedObject = {};
    if (saved) {
        savedObject = JSON.parse(saved) || savedObject;
    }
    return {...BLANK_STATE, ...savedObject};
}

const BLANK_STATE = {
    daysRawData: Object.fromEntries(
        zip(DAYS, Array(3).fill({ customers: [], suppliers: [] }))
    ),
    eventExpenses: {},
    dailyAccounting: Object.fromEntries(
        zip(DAYS, Array(3).fill({ tombolaTickets: 0 }))
    ),
    costTotal: 0,
    ticketPrice: 0,
    days: [], // { dayName, customers, missedPayments, missedTransactions, dailyLoss, customersAverage, obtainedAverage }
    suppliers: {}, // { supplierId : { total } }
    missedPaymentsByDay: {}, // the total amount missed by customers (negative meaning that they paid too much)
    missedTransactionsByDay: {}, // { dayName: { customerId: { paidSurplus: [], suppliedSurplus: [] } } } unresolved payments.
    supplierTotal: 0,
    supplierRealGain: 0,
}

/**
 * Extracts values from day raw data (state.daysRawData).
 *
 * @returns {Object}
 */
const _processDays = (missedPaymentsByDay, missedTransactionsByDay, daysRawData) => {
    const days = [];
    let suppliers = {};
    let supplierTotal = 0;
    let supplierRealGain = 0;
    for (const [dayName, dayRaw] of Object.entries(
        daysRawData
    )) {
        const computedDay = _computeDay({ dayName, dayRaw, suppliers });
        suppliers = computedDay.suppliers;
        missedPaymentsByDay[dayName] = computedDay.missedPayments;
        missedTransactionsByDay[dayName] = computedDay.missedTransactions;
        days.push(computedDay.day);
    }
    // computes the total gross sale revenue of the suppliers, across all days.
    Object.values(suppliers).forEach((supplier) => {
        supplierTotal += supplier.total;
        supplierRealGain += supplier.realGain;
    });
    return { days, suppliers, supplierTotal, supplierRealGain, missedPaymentsByDay, missedTransactionsByDay };
};
/**
 * Computes
 *
 * @param {Object} param0
 * @param {String} param0.dayName
 * @param {Object} param0.dayRaw
 * @param {Object} param0.suppliers
 */
const _computeDay = ({ dayName, dayRaw, suppliers }) => {
    /* DATA FILL from dayRaw
        *   paid
        *   rawCustomers[*][0] purchase - customerId
        *   rawCustomers[*][1] purchase - supplierId
        *   rawCustomers[*][2] purchase - item Name
        *   rawCustomers[*][3] purchase - item Price
        *   supplied
        *   rawSuppliers[*][0] payment - supplierId
        *   rawSuppliers[*][1] payment - customerId
        *   rawSuppliers[*][2] payment - item Name
        *   rawSuppliers[*][3] payment - item Price
        *
        *
        * suppliers = { supplierId : { total, realGain } }
        *
        */
    const rawCustomers = dayRaw.customers;
    const rawSuppliers = dayRaw.suppliers;
    const customers = {};
    /*
        * customerKeys dataStructure
        * supplied = [ {name: 'itemName', 'price': price, 'supplierId': id } ] WHAT IS PAID
        * paid = [ {name: 'itemName', 'price': price, 'supplierId': id } ]
        * paymentTransactions: Number[],
        * recievedTransactions: Number[],
        */
    const customerKeys = {
        paid: [],
        paidTotal: 0,
        paymentTransactions: [],
        recievedTransactions: [],
        supplied: [],
        suppliedTotal: 0,
    };

    for (const rawCustomer of rawCustomers) {
        if (rawCustomer[0]) {
            // CUSTOMER SIDE
            // creates the customer if it doesn't already exist.
            customers[rawCustomer[0]] = customers[rawCustomer[0]] || Object.assign({}, customerKeys);
            // adds the total paid by the customer
            const paidValue = Number(rawCustomer[3]);
            customers[rawCustomer[0]].paidTotal += paidValue || 0;
            customers[rawCustomer[0]].paymentTransactions.push(paidValue);
            // adds a line for what the customer paid
            customers[rawCustomer[0]].paid.push({
                name: rawCustomer[2],
                price: rawCustomer[3],
                supplierId: rawCustomer[1],
            });
            // computes the total value of real gain by the supplier.
            suppliers[rawCustomer[1]] = suppliers[rawCustomer[1]] || {
                total: 0,
                realGain: 0,
            };
            suppliers[rawCustomer[1]].realGain += Number(rawCustomer[3]) || 0;
        }
    }
    for (const rawSupplier of rawSuppliers) {
        if (rawSupplier[0] && rawSupplier[1]) {
            // SUPPLIER SIDE
            customers[rawSupplier[1]] = customers[rawSupplier[1]] || Object.assign({}, customerKeys);
            // adds the total paid by the customer
            const suppliedValue = Number(rawSupplier[3]);
            customers[rawSupplier[1]].suppliedTotal += suppliedValue || 0;
            customers[rawSupplier[1]].recievedTransactions.push(suppliedValue);
            // adds a line for what the customer recieved (not a guarantee of payment)
            customers[rawSupplier[1]].supplied.push({
                name: rawSupplier[2],
                price: rawSupplier[3],
                supplierId: rawSupplier[0],
            });
            // computes the total value of supplied by the supplier.
            suppliers[rawSupplier[0]] = suppliers[rawSupplier[0]] || {
                total: 0,
                realGain: 0,
            };
            suppliers[rawSupplier[0]].total += Number(rawSupplier[3]) || 0;
        }
    }

    const {
        missedPayments,
        missedTransactions,
        dailyLoss,
        customersAverage,
        obtainedAverage,
    } = _computeDailyStats(customers);
    return {
        day: {
            dayName,
            customers,
            missedPayments,
            missedTransactions,
            dailyLoss,
            customersAverage,
            obtainedAverage,
        },
        suppliers,
        missedPayments,
        missedTransactions,
    };
};
/**
 *
 * @param {Object} customers
 */
const _computeDailyStats = (customers) => {
    const missedPayments = {};
    const missedTransactions = {};
    let dailyLoss = 0;
    let customersTotal = 0;
    let obtainedTotal = 0;

    const customerEntries = Object.entries(customers)
    for (const [customerId, customer] of customerEntries) {

        // cancels the payment and receipt transactions to find out which one don't have an equivalent.
        const [paidSurplus, suppliedSurplus] = cancelArrays(customer.paymentTransactions, customer.recievedTransactions);
        missedTransactions[customerId] = { paidSurplus, suppliedSurplus };

        // amounts that customers didn't pay (can be negative, in which case, the customer is owed money).
        const customerPaid = customer.paidTotal;
        const customerSupplied = customer.suppliedTotal;
        const balance = customerSupplied - customerPaid;
        if (balance !== 0) {
            missedPayments[customerId] = balance;
            dailyLoss += balance;
        }
        // daily totals
        obtainedTotal += Number(customerSupplied);
        customersTotal += Number(customerPaid);

    }
    const customersAverage = customersTotal / (customerEntries.length || 0);
    const obtainedAverage = obtainedTotal / (customerEntries.length || 0);
    return {
        missedPayments,
        missedTransactions,
        dailyLoss,
        customersTotal,
        customersAverage,
        obtainedAverage,
    };
};

    ////////////////// //////// //////////////////
    ////////////////// REDUCER ///////////////////
    ////////////////// //////// //////////////////

const marcheReducer = (state=loadState(), action) => {
    let computeResults = {};
    switch (action.type) {

        case SAVE_EXPENSES:
            let costTotal = 0;
            const eventExpenses = action.payload;
            Object.values(eventExpenses).forEach((val) => (costTotal += val));
            return {...state, ...{ eventExpenses, costTotal }};

        case SAVE_DAY:
            const { day, data, dayAccounting } = action.payload;
            const daysRawData = {...state.daysRawData};
            const dailyAccounting = {...state.dailyAccounting, ...{
                [day]: dayAccounting,
            }};
            daysRawData[day] = data;
            computeResults = _processDays(state.missedPaymentsByDay, state.missedTransactionsByDay, daysRawData);
            return {...state, ...{ daysRawData, dailyAccounting }, ...computeResults};

        case COMPUTE:
            computeResults = _processDays(state.missedPaymentsByDay, state.missedTransactionsByDay, state.daysRawData);
            return {...state, ...computeResults};

        case FEED_COMPUTE:
            computeResults  = _processDays(state.missedPaymentsByDay, state.missedTransactionsByDay, state.daysRawData);
            return {...state, ...action.payload, ...computeResults};

        case SET_STORE:
            return {...state, ...action.payload};

        case CLEAR_STORE:
            return BLANK_STATE;

        default:
            return state;
    }
}

const saveAccounting = (value) => {
    return {
        type: SAVE_EXPENSES,
        payload: value,
    }
};

const saveDay = (value) => {
    return {
        type: SAVE_DAY,
        payload: value,
    }
};


const feedCompute = (newKeys={}) => {
    return {
        type: FEED_COMPUTE,
        payload: newKeys,
    }
}

const setStore = (newKeys={}) => {
    return {
        type: SET_STORE,
        payload: newKeys,
    }
}

const compute = () => {
    return {
        type: COMPUTE,
    }
}

const clearStore = () => {
    return {
        type: CLEAR_STORE,
    }
}

export {
    marcheReducer,
    saveAccounting,
    saveDay,
    compute,
    feedCompute,
    setStore,
    clearStore,
}
