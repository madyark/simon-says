import {resetBtn} from "./reset.js";
import {clearShownButtons, initDisplay} from "./init-display.js";
import {clearSelectedButtons} from "./user-btn-select.js";

let gameInitializer = document.getElementById("init-game");

// Start game function
let startGame = () => {
    gameInitializer.disabled = true; // Disabling the start-game button to prevent overclicking
    resetBtn.disabled = false; // Enabling the reset button
    clearShownButtons(); // Clear the shown buttons array
    clearSelectedButtons(); // Clear the selectedButtons array
    initDisplay(); // Displays the buttons based on "Start game" selection
}

export {gameInitializer, startGame};