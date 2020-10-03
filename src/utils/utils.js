let lastId = 0;

export { newId, times, zip, rounded }

function newId(prefix='id') {
    lastId++;
    return `${prefix}${lastId}`;
}
function times(x) {
    return (f) => {
        if (x > 0) {
            f()
            times (x - 1) (f)
        }
    }
}

function zip(arr1, arr2) {
    return arr1.map((k, i) => [k, arr2[i]]);
}

function rounded(num, decimal) {
    if (!num) return 0;
    num = Number(num);
    const exp = Math.abs(decimal);
    return Math.round((num + Number.EPSILON) * Math.pow(10, exp)) / Math.pow(10, exp);
}