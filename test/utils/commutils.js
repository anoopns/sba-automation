
function containsAnArray (array, target) {
    return target.every(targetElem => array.includes(targetElem));
}

exports.containsAnArray = containsAnArray;
