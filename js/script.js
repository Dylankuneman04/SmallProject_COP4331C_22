import utils from './frontendCode.js';

let path = window.location.pathname;

if (path.endsWith('contacts.html')) {
    // moved to contacts.js
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

function doNothing(){return;}
window.doNothing = doNothing;

function deleteContact(userID, contactID) {
    if (confirm("Are you sure you want to delete this contact?")) {
        utils.deleteContact(userID, contactID);
    }
}
window.deleteContact = deleteContact;

window.editContact = function(contactFirstname, contactLastname, contactEmail, contactPhone, contactId) {
    utils.doEditContact(contactFirstname, contactLastname, contactEmail, contactPhone, contactId);
}