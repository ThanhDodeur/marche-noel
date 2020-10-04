let lastId = 0;

export { newId, times, zip, rounded, subtractArrays }

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

function subtractArrays(arr1, arr2) {
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
