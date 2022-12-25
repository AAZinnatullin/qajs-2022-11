// function for get sums of object values
function getScores(scores) {
    // get values of object in array
    const objValues = Object.values(scores);

    // parse all values of array to number if it possible and return array of numbers
    // also change NaN values to 0
    const formattedValues = objValues.map((value, index) => {
        if (!isNaN(objValues[index])) {
            return parseFloat(objValues[index], 10);
        } else {
            return 0;
        }
    });

    // sum all values of array formattedValues
    return formattedValues.reduce((acc, value) => acc + value, 0);
}

// object balls for every student
const scores = {
    Alla: 21,
    Nick: 20,
    Valera: 15,
    Anatoliy: '10',
    Patric: 10.4,
    Lox: "sada"
};

// log result of function getScores to console
console.log(getScores(scores));
