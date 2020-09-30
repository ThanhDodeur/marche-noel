let lastId = 0;

export { newId, times }

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
