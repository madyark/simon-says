// Declaring module imports
import {gameInitializer, startGame} from "./modules/start.js";
import {resetBtn, reset} from "./modules/reset.js";

// Start button event listener
gameInitializer.addEventListener("click", function() {
    startGame();
});

// Reset button event listener
resetBtn.addEventListener("click", function() {
    reset();
});