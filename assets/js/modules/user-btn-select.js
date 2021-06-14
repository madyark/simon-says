let userButtons = document.getElementsByClassName("user-btn");
let selectedButtons = [];

let clearSelectedButtons = () => {
    selectedButtons = [];
}

export {userButtons, selectedButtons, clearSelectedButtons};