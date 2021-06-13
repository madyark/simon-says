// Declaring imports
import {selectRandomNumber} from "./random.js";

// Declaring required variables
let shownButtons = [];
let selectedButtons = [];
let resetStatus = false;
let highlightedDisplayCircles = [];
let highlightedUserCircles = [];

// Selecting DOM attributes
let displayButtons = document.getElementsByClassName("display-btn");
let userButtons = document.getElementsByClassName("user-btn");
let gameInitializer = document.getElementById("init-game");
let resetBtn = document.getElementById("reset-game");

// Changing the disable property and background color from user buttons (based on the arguement)
let userButtonStatus = (status) => {
    for (let i = 0; i < userButtons.length; i++) {
        userButtons[i].disabled = status;
        userButtons[i].classList = `user-btn user-btn-disabled-${status} hidden-keys`;
    }
}

// Add user instructions when hovering over the button containers

// Display circle highlight
let highlightDisplayCircle = number => {
    let circle = document.getElementById(`d-circle-${number}`);
    highlightedDisplayCircles.push(circle)
    setTimeout(function() {
        circle.classList = `circular-btn circle-on`;
    }, 100);
}

// Remove display circle highlight 
let removeHighlightDisplayCircle = () => {
    highlightedDisplayCircles.forEach(function(circle) {
        circle.classList = `circular-btn circle-off`;
    });

    highlightedDisplayCircles = []; // Clearing the array
}

// User circles highlights
let highlightUserCircles = () => {
    for (let i = 0; i < selectedButtons.length; i++) {
        let circle = document.getElementById(`u-circle-${i+1}`);  // Highlight circles based on the number of buttons pressed
        circle.classList = `circular-btn circle-on`;
        highlightedUserCircles.push(circle);
    }
}

// Remove highlights from user circles
let removeHighlightUserCircles = () => {
    highlightedUserCircles.forEach(function(circle) {
        circle.classList = `circular-btn circle-off`;
    });

    highlightedUserCircles = []; // Clearing the array after the removal of highlights
}

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
            return true; // If boolean false is not in the trueOrFalse array, return true
        }
    } else {
        return false;
    }
}

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

    userButtonStatus(true); // Disabling the user buttons before the highlight immediately
    
    setTimeout(function() {
        highlightDisplay(buttonsArray[i]); // Add the button highlight
    }, 150);

    setTimeout(function() { 
        removeHighlight(buttonsArray[i]); // Remove the button highlight
    }, 400);

    setTimeout(function() {
        i++;

        if (i === buttonsArray.length) {
            userButtonStatus(false); // Enabling the user buttons after the removal of all the highlights
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
        userButtonStatus(true); // Disabling the user buttons once the game is finished
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

// User lost the game
let lostGame = () => {
    alert("You've lost");
}

// User buttons event listeners
for (let i = 0; i < userButtons.length; i++) { // Adding an event listener for each of the user buttons
    userButtons[i].addEventListener("click", function() {
        userSelection(userButtons[i]);
        highlightUserCircles();

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
    userButtonStatus(true); // Disabling the user buttons once the reset button has been clicked

    setTimeout(function() {
        resetStatus = false; // Passing on the false value to the resetStatus again
        gameInitializer.disabled = false;
    }, 500);
});