import finished from "./finished.js";
import {clearSelectedButtons} from "./user-btn-select.js";
import {highlightDisplayCircle} from "./circles.js";
import selectRandomNumber from "./random.js"; // Choose a random number in range between two values
import displayChange from "./display-buttons.js"; // Add and remove highlights from display buttons

// Buttons shown by the computer 
let shownButtons = [];

// Clear shownButtons array
let clearShownButtons = () => {
    shownButtons = [];
}

// Initializing the display of the buttons
let initDisplay = () => {
    if (shownButtons.length >= 10) {
        finished();
        return; 
    }
    
    clearSelectedButtons(); // Clear the selectedButtons array

    highlightDisplayCircle(shownButtons.length + 1); // Highlights a new display circle signifying the start of a new round 

    let ranNum = selectRandomNumber(1, 9);

    let chosenBtnDiv = document.getElementById(`d-btn-${ranNum}`);
    shownButtons.push(chosenBtnDiv); // Adding the highlighted button to the shownButtons array

    
    let iterator = 0;
    displayChange(shownButtons, iterator); // Displaying the computer selected buttons from the array one by one, based on their index
}

export {shownButtons, initDisplay, clearShownButtons};