import userSelection from "./user-btn-highlight.js";
import {highlightUserCircles, removeHighlightUserCircles} from "./circles.js";// Add and remove highlights from user circles
import {shownButtons, initDisplay} from "./init-display.js";
import processUserSelections from "./process.js";

let userButtons = document.getElementsByClassName("user-btn");
let selectedButtons = [];

let clearSelectedButtons = () => {
    selectedButtons = [];
}

// User buttons event listeners
for (let i = 0; i < userButtons.length; i++) { // Adding an event listener for each of the user buttons
    userButtons[i].addEventListener("click", function() {
        userSelection(userButtons[i]);
        highlightUserCircles(selectedButtons.length); // Highlight the number of user circles based on the amount of buttons selected

        if (selectedButtons.length === shownButtons.length) { // Execute the function after a small time to allow the user to see the changes in highlights
            setTimeout(function() {
                removeHighlightUserCircles(); // Removing the user circle highlights
                processUserSelections(); // Checking if the user selections were correct
                initDisplay(); // Initialize the display of buttons only if the user selected enough buttons
            }, 100);
        }
    });
}

export {userButtons, selectedButtons, clearSelectedButtons};