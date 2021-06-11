// Declaring required variables
let shownButtons = [];
let resetStatus = false;
let highlightedDisplayCircles = [];
let highlightedUserCircles = [];
let selectedButtons = [];

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

// Random number selector
let selectRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min; 
    // Returns a number between the included min, max range
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

    userButtonStatus(true); // Disabling the user buttons before the highlight
    highlightDisplay(buttonsArray[i]); // Add the button highlight

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

// User selected button highlight 
let userSelection = selectedButton => { // Adds and removes a highlight of the user selected button
    selectedButtons.push(selectedButton);
    selectedButton.id = `user-btn-highlight`;

    setTimeout(function() {
        selectedButton.id = ``;
    }, 200);
}

// Initializing the display of the buttons
let initDisplay = () => {
    if (shownButtons.length >= 10 || resetStatus === true) {
        gameInitializer.disabled = false;
        removeHighlightDisplayCircle(); // Removing highlighted display circles
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

for (let i = 0; i < userButtons.length; i++) { // Adding an event listener for each of the user buttons
    userButtons[i].addEventListener("click", function() {
        userSelection(userButtons[i]);

        if (selectedButtons.length === shownButtons.length) {
            setTimeout(function() {
                initDisplay(); // Initialize the display of buttons only if the user selected enough buttons
            }, 400);
        }
    });
}

gameInitializer.addEventListener("click", function() {
    gameInitializer.disabled = true; // Disabling the start-game button to prevent overclicking
    resetBtn.disabled = false; // Enabling the reset button
    shownButtons = []; // Ensures that the shown buttons array is clear
    selectedButtons = []; // Clears the user selected buttons
    initDisplay(); // Displays the buttons based on "Start game" selection
});

resetBtn.addEventListener("click", function() {
    resetStatus = true;
    resetBtn.disabled = true;
    removeHighlightDisplayCircle(); // Removing highlighted displayed circles

    setTimeout(function() {
        resetStatus = false; // Passing on the false value to the resetStatus again
        gameInitializer.disabled = false;
    }, 500);
});