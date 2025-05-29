import utils from './frontendCode.js';

handleRegistration();

function AddUserPopup() {
    const openBtn = document.getElementById('add-btn');
    const closeBtn = document.getElementById('add-btn-close');
    const popup = document.getElementById('add-popup');

    openBtn.addEventListener('click', () => {
        popup.classList.add('open');
    });

    closeBtn.addEventListener('click', () => {
        popup.classList.remove('open');
    });
}

function handleRegistration() {
    document.getElementById("register-form").addEventListener("submit", (e) => {
        e.preventDefault(); // Prevent page reload
        utils.doSignup(firstname, lastname, username, password)
        
    });
}