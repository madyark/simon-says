// Declaring imports
import {highlightDisplayCircle, removeHighlightDisplayCircle, highlightUserCircles, removeHighlightUserCircles} from "./modules/circles.js";
import {selectRandomNumber} from "./modules/random.js";
import {checkArrayEquality} from "./modules/arrays.js";
import userButtonStatus from "./modules/user-buttons.js";

// Declaring required variables
let shownButtons = [];
let selectedButtons = [];
let resetStatus = false;

// Selecting DOM attributes
let userButtons = document.getElementsByClassName("user-btn");
let gameInitializer = document.getElementById("init-game");
let resetBtn = document.getElementById("reset-game");

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

// Initializing the display of the buttons
let initDisplay = () => {
    if (shownButtons.length >= 10 || resetStatus === true) {
        gameInitializer.disabled = false;
        removeHighlightDisplayCircle(); // Removing highlighted display circles
        removeHighlightUserCircles(); // Removing highlighted user circles
        userButtonStatus(true, userButtons); // Disabling the user buttons once the game is finished
        return; 
    }
    
    selectedButtons = []; // Clear the user selected buttons

    highlightDisplayCircle(shownButtons.length + 1); // Highlights a new display circle signifying the start of a new round 

    let ranNum = selectRandomNumber(1, 9);

    let chosenBtnDiv = document.getElementById(`d-btn-${ranNum}`);
    shownButtons.push(chosenBtnDiv); // Adding the highlighted button to the shownButtons array

    
    let iterator = 0;
    displayChange(shownButtons, iterator); // Displaying the computer selected buttons from the array one by one, based on their index
}

// User selected button highlight 
let userSelection = selectedButton => { // Adds and removes a highlight of the user selected button
    selectedButtons.push(selectedButton);
    selectedButton.id = `user-btn-highlight`;

    setTimeout(function() {
        selectedButton.id = ``;
    }, 150);
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

// Failed attempt
let lostGame = () => {
    alert("You've lost");
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

// Start button event listener
gameInitializer.addEventListener("click", function() {
    gameInitializer.disabled = true; // Disabling the start-game button to prevent overclicking
    resetBtn.disabled = false; // Enabling the reset button
    shownButtons = []; // Ensures that the shown buttons array is clear
    selectedButtons = []; // Clears the user selected buttons
    initDisplay(); // Displays the buttons based on "Start game" selection
});

// Reset button event listener
resetBtn.addEventListener("click", function() {
    resetStatus = true;
    resetBtn.disabled = true;
    removeHighlightDisplayCircle(); // Removing highlighted displayed circles
    removeHighlightUserCircles(); // Removing highlighted user circles
    userButtonStatus(true, userButtons); // Disabling the user buttons once the reset button has been clicked

    setTimeout(function() {
        resetStatus = false; // Passing on the false value to the resetStatus again
        gameInitializer.disabled = false;
    }, 500);
});