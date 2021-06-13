let highlightedDisplayCircles = [];
let highlightedUserCircles = [];

// Display circle highlight
let highlightDisplayCircle = number => {
    let circle = document.getElementById(`d-circle-${number}`);
    highlightedDisplayCircles.push(circle)
    setTimeout(function() {
        circle.classList = `circular-btn circle-on`; // Highlight the circle
    }, 100);
}

// Remove display circle highlight 
let removeHighlightDisplayCircle = () => {
    highlightedDisplayCircles.forEach(function(circle) {
        circle.classList = `circular-btn circle-off`; // Unhighlight the circle
    });

    highlightedDisplayCircles = []; // Clearing the array
}

// User circles highlights
let highlightUserCircles = (selectionNumber) => {
    for (let i = 0; i < selectionNumber; i++) { // Highlight circles based on the number of buttons pressed
        let circle = document.getElementById(`u-circle-${i+1}`); 
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


export {highlightDisplayCircle, removeHighlightDisplayCircle, highlightUserCircles, removeHighlightUserCircles};