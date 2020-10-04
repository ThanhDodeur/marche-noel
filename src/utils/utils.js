let lastId = 0;

export { newId, times, zip, rounded, cancelArrays }

/**
 * generates a unique new id combining the prefix with a new <Number>, numbers are consecutive.
 *
 * @param {*} [prefix]
 * @returns {String}
 */
function newId(prefix='id') {
    lastId++;
    return `${prefix}${lastId}`;
}
/**
 * times(10) (() => console.log('a')) this call will call console.log('a') 10 times.
 * @param {Number} x the amount of time to call the callback function 'f'
 * @returns {function} the function takes a callback 'f' as argument to be called x times.
 */
function times(x) {
    return (f) => {
        if (x > 0) {
            f()
            times (x - 1) (f)
        }
    }
}
/**
 *
 * Equivalent to Python's Zip function, useful to merge two arrays into an array of Tuples to feed an Object.fromEntries()
 * @param {*} arr1
 * @param {*} arr2
 * @returns {Array<Tuples>} [[arr1[0], arr2[0]], [arr1[1], arr2[1]], [arr1[2], arr2[2]], [...]]
 */
function zip(arr1, arr2) {
    return arr1.map((k, i) => [k, arr2[i]]);
}
/**
 * rounded(456, 3) => 456
 * rounded(234.1235632, 3) => 234.124
 * Essentially a toFixed() that doesn't generate unnecessary 0's.
 *
 * @param {Number} num the <Number> to round.
 * @param {Number} [decimal] the amount of decimal digits, defaults to 3.
 * @returns {Number} returns num rounded to the 3rd decimal, if necessary.
 */
function rounded(num, decimal=3) {
    if (!num) return 0;
    num = Number(num);
    const exp = Math.abs(decimal);
    return Math.round((num + Number.EPSILON) * Math.pow(10, exp)) / Math.pow(10, exp);
}
/**
 * function used to cancel two arrays, the values uniquely in common between the two arrays are removed from both arrays.
 *
 * @param {Array} arr1
 * @param {Array} arr2
 * @returns {Array<Array>} [arr1, arr2]
 */
function cancelArrays(arr1, arr2) {
    const lowestLength = Math.min(arr1.length, arr2.length);
    const arrs = [arr1, arr2];
    const newArrs = [[...arr1], [...arr2]];
    const ascSortedArrs = arrs[0].length === lowestLength ? [0, 1] : [1, 0];
    const lowIndex = ascSortedArrs[0];
    const highIndex = ascSortedArrs[1];
    for (let i = 0; i < lowestLength; i++) {
        const element = arrs[lowIndex][i];
        if (arrs[highIndex].includes(element)) {
            newArrs[0].splice(newArrs[0].indexOf(element), 1);
            newArrs[1].splice(newArrs[1].indexOf(element), 1);
        }
    }
    return newArrs;
}
