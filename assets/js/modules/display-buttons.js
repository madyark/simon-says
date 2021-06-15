import {resetStatus} from "./reset.js";
import {userButtons} from "./user-btn-select.js";
import userButtonStatus from "./user-btn-status.js"; // Change the disabled status of user buttons

// Highlight display button
let highlightDisplay = specificButton => {
    specificButton.innerHTML = `<button class="display-btn display-btn-highlight" disabled></button>`;
}

// Remove highlight on the button 
let removeHighlight = specificButton => {
    specificButton.innerHTML = `<button class="display-btn" disabled></button>`
}

// Add and remove the highlight on the specific button
let displayChange = (buttonsArray, i) => {
    if (resetStatus === true) { // Quick function exit if the reset button has been clicked
        return;
    }

    userButtonStatus(true, userButtons); // Disabling the user buttons before the highlight immediately
    
    setTimeout(function() {
        highlightDisplay(buttonsArray[i]); // Add the button highlight
    }, 150);

    setTimeout(function() { 
        removeHighlight(buttonsArray[i]); // Remove the button highlight
    }, 400);

    setTimeout(function() {
        i++;

        if (i === buttonsArray.length) {
            userButtonStatus(false, userButtons); // Enabling the user buttons after the removal of all the highlights
            return; // Function escape
        } else {
            displayChange(buttonsArray, i); // Function recall for the rest of the buttonsArray
        }
    }, 600);
}

export default displayChange;