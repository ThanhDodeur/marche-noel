let lastId = 0;

export { newId, times, zip }

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
