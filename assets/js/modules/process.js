import {shownButtons} from "./init-display.js";
import {selectedButtons} from "./user-btn-select.js";
import checkArrayEquality from "./arrays.js"; // Ensure two arrays hold the same values in the same order 
import lostGame from "./lost.js"; // Execute after a failed attempt from the user

// Process user selections 
let processUserSelections = () => {
    let displayedButtonsID = []; // Stores the values of the buttons the computer displayed
    shownButtons.forEach(function(button) {
        displayedButtonsID.push(button.id.charAt(button.id.length - 1)); // Pushing the last character of the id name (a number between 1 and 9) to the array
    });

    let selectedButtonsName = []; // Stores the values of the buttons the user selected
    selectedButtons.forEach(function(button) {
        selectedButtonsName.push(button.name.charAt(button.name.length - 1)); // Pushing the last character of the name (a number between 1 and 9) to the array
    });

    let equalityAnswer = checkArrayEquality(displayedButtonsID, selectedButtonsName); // Check if the two arrays are equal and store the answer in a variable

    if (equalityAnswer) {
        return;
    } else {
        lostGame(); // If the two arrays are not equal, execute the lostGame() function
    }
}

export default processUserSelections;