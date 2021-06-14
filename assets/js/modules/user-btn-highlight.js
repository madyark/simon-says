// User selected button highlight 
let userSelection = selectedButton => { // Adds and removes a highlight of the user selected button
    selectedButtons.push(selectedButton);
    selectedButton.id = `user-btn-highlight`;

    setTimeout(function() {
        selectedButton.id = ``;
    }, 150);
}

export default userSelection;