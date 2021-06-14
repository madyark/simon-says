import finished from "./finished.js";

let resetStatus = false;
let resetBtn = document.getElementById("reset-game");

// Reset function
let reset = () => {
    resetStatus = true;
    resetBtn.disabled = true;
    finished();

    setTimeout(function() {
        resetStatus = false; // Passing on the false value to the resetStatus again
    }, 500);
}

export {resetStatus, resetBtn, reset};