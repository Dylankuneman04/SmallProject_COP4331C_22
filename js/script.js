import utils from './frontendCode.js';

let path = window.location.pathname;

if (path.endsWith('contacts.html')) {
    let user = utils.readCookie();

    utils.loadContacts(user.id);

    document.getElementById("popup").addEventListener("submit", (e) => {
        e.preventDefault(); // Prevent page reload 
        utils.addContact();
    });       

    // make a function to display contacts on server based on user.id
}

else if (path.endsWith('login.html')) {
    document.getElementById("login-form").addEventListener("submit", (e) => {
        e.preventDefault(); // Prevent page reload 
        utils.doLogin();
    });
}

else if (path.endsWith('register.html')) {
    document.getElementById("register-form").addEventListener("submit", (e) => {
        e.preventDefault(); // Prevent page reload 
        utils.doSignup();
    });
}

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

function doNothing(){return;}
window.doNothing = doNothing;

function deleteContact(userID, contactID) {
    if (confirm("Are you sure you want to delete this contact?")) {
        utils.deleteFromDB(userID, contactID);
    } else {
        doNothing();
    }
}
window.deleteContact = deleteContact