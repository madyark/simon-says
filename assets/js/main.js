// Declaring required variables
let shownButtons = [];
let resetStatus = false;

// Selecting DOM attributes
let displayButtons = document.getElementsByClassName("display-btn");
let userButtons = document.getElementsByClassName("user-btn");
console.log(userButtons);
let gameInitializer = document.getElementById("init-game");
let resetBtn = document.getElementById("reset-game");

// Removing and add the disable property from user or display buttons (based on the arguements)
let buttonDisableStatus = (buttonClass, status) => {
    for (let i = 0; i < 9; i++) { // For each button selected with that specific class
        userButtons[i].disabled = status;
    }
}

// Add user instructions when hovering over the button containers

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

// Initializing the display of the buttons
let initDisplay = () => {
    if (shownButtons.length >= 10 || resetStatus === true) {
        buttonDisableStatus(userButtons, true); // Disabling the user buttons once the game is finished
        gameInitializer.disabled = false; // Enabling the start-game button
        return; 
    } 

    let ranNum = selectRandomNumber(1, 9);

    let chosenBtnDiv = document.getElementById(`d-btn-${ranNum}`);

    // Adding the highlighted button to the shownButtons array
    shownButtons.push(chosenBtnDiv.id); 

    highlightDisplay(chosenBtnDiv);

    setTimeout(function() { // Removes the button highlight and restarts the function
        removeHighlight(chosenBtnDiv); 
    }, 400);

    setTimeout(function() {
        initDisplay(); // Function recall
    }, 800)
}

gameInitializer.addEventListener("click", function() {
    gameInitializer.disabled = true; // Disabling the start-game button to prevent overclicking
    buttonDisableStatus(userButtons, false); // Enabling the user buttons
    shownButtons = []; // Ensures that the array is clear
    initDisplay(); // Displays the buttons based on "Start game" selection
});

resetBtn.addEventListener("click", function() {
    resetStatus = true;
    resetBtn.disabled = true;

    setTimeout(function() {
        resetBtn.disabled = false;
        resetStatus = false; // Passing on the false value to the resetStatus again
    }, 500);
});

