// Declaring module imports
import {highlightDisplayCircle, removeHighlightDisplayCircle, highlightUserCircles, removeHighlightUserCircles} from "./modules/circles.js"; // Add and remove highlights from display and user circles
import selectRandomNumber from "./modules/random.js"; // Choose a random number in range between two values
import checkArrayEquality from "./modules/arrays.js"; // Ensure two arrays hold the same values in the same order 
import userButtonStatus from "./modules/user-btn-status.js"; // Change the disabled status of user buttons
import displayChange from "./modules/display-buttons.js"; // Add and remove highlights from display buttons
import lostGame from "./modules/lost.js"; // Execute after a failed attempt from the user
import {resetStatus, resetBtn, reset} from "./modules/reset.js";
import finished from "./modules/finished.js";
import userSelection from "./modules/user-btn-highlight.js";
import {userButtons, selectedButtons, clearSelectedButtons} from "./modules/user-btn-select.js";
import {gameInitializer} from "./modules/start.js";

// Declaring required variables
let shownButtons = [];

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

// Start game function
let startGame = () => {
    gameInitializer.disabled = true; // Disabling the start-game button to prevent overclicking
    resetBtn.disabled = false; // Enabling the reset button
    shownButtons = []; // Ensures that the shown buttons array is clear
    clearSelectedButtons(); // Clear the selectedButtons array
    initDisplay(); // Displays the buttons based on "Start game" selection
}

// Start button event listener
gameInitializer.addEventListener("click", function() {
    startGame();
});

// Reset button event listener
resetBtn.addEventListener("click", function() {
    reset();
});