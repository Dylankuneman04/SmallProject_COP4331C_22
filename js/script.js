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

        const firstName = document.getElementById("firstname").value.trim();
        const lastName = document.getElementById("lastname").value.trim();
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value;

        const isValid = utils.validSignUpForm(firstName, lastName, username, password);

        const errorDiv = document.getElementById("errorDiv");
        if (!isValid) {
            errorDiv.textContent = "Some Fields Are Invalid.";
        } else {
            errorDiv.textContent = "";
            // Optionally: send data to server or continue app logic
        }
    });
}