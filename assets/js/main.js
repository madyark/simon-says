// Declaring required variables
let shownButtons = [];

// Selecting DOM attributes
let displayButtons = document.getElementsByClassName("display-btn");

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
    }, 2000);
}

initDisplay();
console.log(shownButtons);