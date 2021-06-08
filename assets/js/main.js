// Declaring required variables
let shownButtons = [];

// Selecting DOM attributes
let displayButtons = document.getElementsByClassName("display-btn");
let userButtons = document.getElementsByClassName("user-btn");
console.log(userButtons);
let gameInitializer = document.getElementById("init-game");

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
    if (shownButtons.length >= 10) {
        buttonDisableStatus(userButtons, true) // Disabling the user buttons once the game is finished
        return; // A function escape after the appearance of 10 buttons
    } 

    let ranNum = selectRandomNumber(1, 9);
    let chosenBtnDiv = document.getElementById(`d-btn-${ranNum}`);

    // Adding the highlighted button to the shownButtons array
    shownButtons.push(chosenBtnDiv.id); 

    highlightDisplay(chosenBtnDiv);
    setTimeout(function() { // Removes the button highlight after two seconds
        removeHighlight(chosenBtnDiv); 
        initDisplay();
    }, 500);
}

gameInitializer.addEventListener("click", function() {
    buttonDisableStatus(userButtons, false); // Enabling the user buttons
    shownButtons = []; // Ensures that the array is clear
    initDisplay(); // Displays the buttons based on "Start game" selection
});

