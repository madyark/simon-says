import {removeHighlightDisplayCircle, removeHighlightUserCircles} from "./circles.js";
import userButtonStatus from "./user-buttons-status.js";

let gameInitializer = document.getElementById("init-game");
let userButtons = document.getElementsByClassName("user-btn");

let finished = () => {
    removeHighlightDisplayCircle(); // Removing highlighted displayed circles
    removeHighlightUserCircles(); // Removing highlighted user circles
    userButtonStatus(true, userButtons); // Disabling the user buttons once the reset button has been clicked
    gameInitializer.disabled = false; // Enabling the start game button
}

export default finished;