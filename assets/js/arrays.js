// Checking if the values of two arrays are equal
let checkArrayEquality = (array1, array2) => {
    if (array1.length === array2.length) { // Ensuring the two arrays have the same length
        let trueOrFalse = [];

        for (let i = 0; i < array1.length; i++) {
            if (array1[i] === array2[i]) { // Each value should be equal in the corresponding index
                trueOrFalse.push(true);
            } else {
                trueOrFalse.push(false); // If one of the matching values are not equal, then push a boolean value of false
            }
        }

        if (trueOrFalse.includes(false)) {
            return false; 
        } else {
            return true; // Only return true if the boolean value false is not in the trueOrFalse array
        }
    } else {
        return false;
    }
}

export {checkArrayEquality};