import utils from './frontendCode.js';

const searchBar = document.getElementById("search-bar");
const searchForm = document.getElementById("search-form");
const createContactPopup = document.getElementById("create-contact-popup-container");
const editContactPopup = document.getElementById("edit-contact-popup-container");

const editContactForm = document.getElementById("edit-contact-form");
const editContactFirstName = document.getElementById("edit-contact-firstname");
const editContactLastName = document.getElementById("edit-contact-lastname");
const editContactEmailAddress = document.getElementById("edit-contact-email");
const editContactPhoneNumber = document.getElementById("edit-contact-phone");

searchBar.addEventListener("input", function() {
    utils.loadContacts(utils.readCookie().id, searchBar.value);
});

searchForm.addEventListener("submit", function(e) {
    e.preventDefault();
});

window.openCreateContactPopup = function() {
    createContactPopup.style.display = "block";
}

window.closeCreateContactPopup = function() {
    createContactPopup.style.display = "none";
}

window.openEditContactPopup = function(contact) {
    editContactPopup.style.display = "block";
    editContactFirstName.value = contact.FirstName;
    editContactLastName.value = contact.LastName;
    editContactEmailAddress.value = contact.EmailAddress;
    editContactPhoneNumber.value = contact.PhoneNumber;
    editContactForm.dataset.CurrentContactID = contact.ContactID;
}

window.closeEditContactPopup = function() {
    editContactPopup.style.display = "none";
}

editContactForm.addEventListener("submit", function(e) {
    e.preventDefault();
    utils.doEditContact({
        FirstName: editContactFirstName.value,
        LastName: editContactLastName.value,
        EmailAddress: editContactEmailAddress.value,
        PhoneNumber: editContactPhoneNumber.value,
        ContactID: editContactForm.dataset.CurrentContactID
    });
    closeEditContactPopup();
});