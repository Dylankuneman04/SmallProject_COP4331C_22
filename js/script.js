import utils from './frontendCode.js';

function openAddUserPopup() {
    const popup = document.getElementById('add-popup');
    popup.classList.add('open');
}
window.openAddUserPopup = openAddUserPopup;

function closeAddUserPopup() {
    const popup = document.getElementById('add-popup');
    popup.classList.remove('open');
}
window.closeAddUserPopup = closeAddUserPopup;

function handleRegistration() {
    document.getElementById("register-form").addEventListener("submit", (e) => {
        e.preventDefault(); // Prevent page reload 
        utils.doSignup();
    });
}
window.handleRegistration = handleRegistration;

function handleLogin() {

    document.getElementById("login-form").addEventListener("submit", (e) => {
        e.preventDefault(); // Prevent page reload 
        utils.doLogin();
    });
}
window.handleLogin = handleLogin;

function addUser() {
    document.getElementById("add-contact").addEventListener("submit", (e) => {
        e.preventDefault(); // Prevent page reload 
        utils.addContact();
    });
}
window.addUser = addUser;