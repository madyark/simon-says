// Changing the disable property and background color from user buttons (based on the arguement)
let userButtonStatus = (status, userButtonsContainer) => {
    for (let i = 0; i < userButtonsContainer.length; i++) {
        userButtonsContainer[i].disabled = status;
        userButtonsContainer[i].classList = `user-btn user-btn-disabled-${status} hidden-keys`;
    }
}

export default userButtonStatus;