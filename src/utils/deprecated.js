/**
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
 * @param {String} page open text file
 * @return {Object}
 */
_computeDay = ({ dayName, page, suppliers }) => {
    const OFFSET_HEIGHT = 1; // does not include the column titles.
    const lines = page.split(/\r\n|\n/);
    times(OFFSET_HEIGHT) (() => lines.shift());
    // colNames
    lines.shift().split(','); // removes and saves column titles.
    /*
    *
    * customers = { clientId: { supplied, suppliedTotal, paid, paidTotal } }
    * supplied = [ {name: 'itemName', 'price': price, 'supplierId': id } ] WHAT IS PAID
    * paid = [ {name: 'itemName', 'price': price, 'supplierId': id } ]
    *
    * suppliers = { supplierId : { total } }
    *
    */
    const customers = {};
    while (lines.length) {
        const currentLine = lines.shift().split(',');

        /* DATA FILL
        *   paid
        *   currentLine[0] purchase - customerId
        *   currentLine[1] purchase - supplierId
        *   currentLine[2] purchase - item Name
        *   currentLine[3] purchase - item Price
        *   supplied
        *   currentLine[4] payment - supplierId
        *   currentLine[5] payment - customerId
        *   currentLine[6] payment - item Name
        *   currentLine[7] payment - item Price
        */

        if (currentLine[0]) { // CUSTOMER SIDE
            // creates the customer if it doesn't already exist.
            customers[currentLine[0]] = customers[currentLine[0]] || {
                paid: [],
                paidTotal: 0,
                supplied: [],
                suppliedTotal: 0,
            };
            // adds the total paid by the customer
            customers[currentLine[0]].paidTotal += Number(currentLine[3].replace(',','.'));
            // adds a line for what the customer paid
            customers[currentLine[0]].paid.push({
                name: currentLine[2],
                price: currentLine[3],
                supplierId: currentLine[1],
            });
        }

        if (currentLine[4] && currentLine[5]) { // SUPPLIER SIDE
            customers[currentLine[5]] = customers[currentLine[5]] || {
                paid: [],
                paidTotal: 0,
                supplied: [],
                suppliedTotal: 0,
            };
            // adds the total paid by the customer
            customers[currentLine[5]].suppliedTotal += Number(currentLine[7].replace(',','.'));
            // adds a line for what the customer recieved (not a guarantee of payment)
            customers[currentLine[5]].supplied.push({
                name: currentLine[6],
                price: currentLine[7],
                supplierId: currentLine[4],
            });
            // computes the total value of supplied by the supplier.
            suppliers[currentLine[4]] = suppliers[currentLine[4]] || { total: 0 };
            suppliers[currentLine[4]].total += Number(currentLine[7].replace(',','.'));
        }
    }
    const { missedPayments, dailyLoss, customersAverage, obtainedAverage } = this._computeDailyStats(customers);
    return {day: { dayName, customers, missedPayments, dailyLoss, customersAverage, obtainedAverage }, suppliers };
}
/**
*
* @param {blob} blob
* @return {file}
*/
_readFile = async (blob) => {
    try {
        const reader = new FileReader();
        reader.readAsText(blob);
        return new Promise((resolve) => {
            reader.onload = (e) => {
                resolve(reader.result);
            };
        });
    } catch (error) {
        this._addMessage('ERREUR', error.message, 'error');
        return false;
    }
}
_removeFile = async (dayName) => {
    const files = Object.assign({}, this.state.files);
    delete files[dayName];
    await this.setState({ files });
}