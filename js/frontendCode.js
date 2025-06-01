const urlBase = 'http://hopethiswork.com/api';
const extension = 'php';

let userId = 0;
let firstName = "";
let lastName = "";
const ids = []

function doLogin(){

    document.getElementById("loginErrorMessage").innerHTML = "";

    // resets logging info
    userId = 0;
    firstName = "";
    lastName = "";

    // gets login name and password that has been inputed
    let name = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    // hashes password using md5.js for security
    let hash = md5(password);

    // checks if name and password are within requirements
    if (!validLoginForm(name, password)) {
        document.getElementById("loginErrorMessage").innerHTML = "Incorrect username or password";
        return;
    }

    let tmp = {
        Username: name,
        Password: hash
    };

    // makes json file of name and password
    let jsonPayload = JSON.stringify(tmp);

    // this will make the url http://hopethiswork.com/api/accounts/login.php
    let url = urlBase + '/accounts/login.' + extension;

    
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try {
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {

                let jsonObject = JSON.parse(xhr.responseText);
                userId = jsonObject.UserID;

                if (userId < 1) {
                    document.getElementById("loginErrorMessage").innerHTML = "Invalid username or password";
                    return;
                }
                firstName = jsonObject.FirstName;
                lastName = jsonObject.LastName;

                saveCookie();
                window.location.href = "contacts.html";
            }
        };

        // sends name and password json
        xhr.send(jsonPayload);
    } catch (err) {
        document.getElementById("statusMessage").innerHTML = err.message;
    }
}

// *IMPORTANT* this info is only shown to the user logged in or registered since its private! also its used for auto-logging off after 20 min
function saveCookie() {
    // we auto-log off after 20 min set here
    let minutes = 20;
    let date = new Date();
    date.setTime(date.getTime() + (minutes * 60 * 1000));
    let expires = ";expires=" + date.toGMTString() + ";path=/";

    // documents when a user is logged or registered
    document.cookie = "firstName=" + firstName + expires;
    document.cookie = "lastName=" + lastName + expires;
    document.cookie = "userId=" + userId + expires;
}

// checks if signup is within the username and password restr
function validSignUpForm(fName, lName, user, pass) {

    let [fNameErr, lNameErr, userErr, passErr] = [true, true, true, true];

    if (fName == "") {
        console.log("FIRST NAME IS BLANK");
    }
    else {
        console.log("first name IS VALID");
        fNameErr = false;
    }

    if (lName == "") {
        console.log("LAST NAME IS BLANK");
    }
    else {
        console.log("LAST name IS VALID");
        lNameErr = false;
    }

    // checks if username is valid
    if (user == "") {
        console.log("USERNAME IS BLANK");
    }
    else {
        let regex = /(?=.*[a-zA-Z])([a-zA-Z0-9-_]).{3,18}$/;

        if (regex.test(user) == false) {
            console.log("USERNAME IS NOT VALID");
        }

        else {

            console.log("USERNAME IS VALID");
            userErr = false;
        }
    }

    // checks if password is valid
    if (pass == "") {
        console.log("PASSWORD IS BLANK");
    }
    else {
        let regex = /(?=.*\d)(?=.*[A-Za-z])(?=.*[!@#$%^&*.]).{8,32}/;

        if (regex.test(pass) == false) {
            console.log("PASSWORD IS NOT VALID");
        }

        else {

            console.log("PASSWORD IS VALID");
            passErr = false;
        }
    }

    if ((fNameErr || lNameErr || userErr || passErr) == true) {
        return false;

    }

    // if everything is valid return true
    return true;
}

function doSignup() {
    document.getElementById("registerErrorMessage").innerHTML = "";
    document.getElementById("registerSuccessMessage").innerHTML = "";

    let userId = 0;
    let firstName = "";
    let lastName = "";
    let username = "";
    let password = "";

    // add name, lastname, username and password for new account
    firstName = document.getElementById("firstName").value;
    lastName = document.getElementById("lastName").value;
    username = document.getElementById("username").value;
    password = document.getElementById("password").value;

    // checks field syntax
    if (!validSignUpForm(firstName, lastName, username, password)) {
        document.getElementById("registerErrorMessage").innerHTML = "Your password does not meet the criteria";
        return;
    }

    let hash = md5(password); 

    let tmp = {
        FirstName: firstName,
        LastName: lastName,
        Username: username,
        Password: hash
    };

    let jsonPayload = JSON.stringify(tmp);

    let url = urlBase + '/accounts/register.' + extension;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    try {
        xhr.onreadystatechange = function () {
            if (this.readyState != 4) {
                return;
            }

            // returns 409 if user exists
            if (this.status == 409) {
                document.getElementById("registerErrorMessage").innerHTML = "Username taken";
            }

            if (this.status == 200) {
                document.getElementById("registerSuccessMessage").innerHTML = "Successfully registered!";
            }
        };

        xhr.send(jsonPayload);
    } catch (err) {
        document.getElementById("signupResult").innerHTML = err.message;
    }
}

function validLoginForm(nameInput,passwordInput){

    let invalidLogin = false;

    // checks if name is blank
    if (nameInput == ""){
        console.log("Blank name!");
         invalidLogin = true;
    }
    else {
        
        let regex = /(?=.*[a-zA-Z])[a-zA-Z0-9-_]{3,18}$/;

        // checks if name is within requirements
        if (regex.test(nameInput) == false) {
            console.log("USERNAME IS NOT VALID");
            invalidLogin = true;
        }

        else {

            console.log("USERNAME IS VALID");
        }

    }

    // checks if password is blank
    if (passwordInput == ""){
        console.log("Blank password!");
        invalidLogin = true;
    }
    else {
        let regex = /(?=.*\d)(?=.*[A-Za-z])(?=.*[!@#$%^&*]).{8,32}/;

        // checks if password is within requirements
        if (regex.test(passwordInput) == false) {
            console.log("PASSWORD IS NOT VALID");
            invalidLogin = true;
        }

        else {

            console.log("PASSWORD IS VALID");
        }
    }

    if (invalidLogin == true){
        return false;
    }
    else {
        
        //returns true if name and password are valid
        return true;
    }
}

    // this function is for reading the saveCookie() function ex. firstName=Ethan,lastName=Tsillas,userId=1234;expires=Mon, 27 May 2025 14:25:00 GMT
function readCookie() {
    userId = -1;
    let data = document.cookie;

    // splits the cookie by ',' 
    let splits = data.split(";");

    for (let i = 0; i < splits.length; i++) {

        let thisOne = splits[i].trim();
        let tokens = thisOne.split("=");

        if (tokens[0] == "firstName") {
            firstName = tokens[1];
        }

        else if (tokens[0] == "lastName") {
            lastName = tokens[1];
        }

        else if (tokens[0] == "userId") {
            userId = parseInt(tokens[1].trim());
        }
    }

    // if userId is not in the cookies since it expired: GET OUT! back to start screen
    if (userId < 0) {
       //window.location.href = "/index.html";
    }

   else {
        document.getElementById("displayName").innerHTML = "Welcome, " + firstName + " " + lastName + "!";
    }

    let temp = {
        id: userId,
        firstName: firstName,
        lastName: lastName
    }

    return temp;
}

// this function just makes your info blank and sends you to login screen
function doLogout() {
    userId = 0;
    firstName = "";
    lastName = "";

    document.cookie = "firstName=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "lastName=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    window.location.href = "/index.html";
}



// adds new contact
function addContact() {

    document.getElementById("createContactError").innerHTML = "";

    let firstname = "";
    let lastname = "";
    let phonenumber = "";
    let emailaddress = "";

    firstname = document.getElementById("contactTextFirst").value;
    lastname = document.getElementById("contactTextLast").value;
    phonenumber = document.getElementById("contactTextNumber").value;
    emailaddress = document.getElementById("contactTextEmail").value;

    if (!validAddContact(firstname, lastname, phonenumber, emailaddress)) {
        document.getElementById("createContactError").innerHTML = "Please check the phone number or email";
        return;
    }

    let tmp = {
        FirstName: firstname,
        LastName: lastname,
        PhoneNumber: phonenumber,
        EmailAddress: emailaddress,
        UserID: userId
    };


    let jsonPayload = JSON.stringify(tmp);

    let url = urlBase + '/contacts/create.' + extension;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try {
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log("Contact has been added");
                loadContacts(readCookie().id, "");
                document.getElementById("create-contact-form").reset();
                document.getElementById("create-contact-popup-container").style.display = "none";
            }
        };
        xhr.send(jsonPayload);
    } catch (err) {
        console.log(err.message);
    }
}

function addContactCard(person, userID) {
    let li = document.createElement('li');
    let div = document.createElement('div');
    div.className = 'contact-card';
    div.innerHTML = `
        <h3>${person.FirstName} ${person.LastName}</h3>
        <p>Email: ${person.EmailAddress}</p>
        <p>Phone: ${person.PhoneNumber}</p>
        <div class="contact-actions">
            <button class="edit-btn" onclick="openEditContactPopup('${person.FirstName}', '${person.LastName}', '${person.EmailAddress}', '${person.PhoneNumber}', ${person.ContactID})">Edit</button>
            <button class="delete-btn" onclick="deleteContact(${userID}, ${person.ContactID})">Delete</button>
        </div>
    `;
    li.appendChild(div);
    document.getElementById('contact-list').appendChild(li);
    // Note: doNothing() is a placeholder function for now.
    // chnge doNothing() to the actual functions for editing and deleting contacts
}

    // fetches contacts and returns them
function loadContacts(userId, query) { 

    let tmp = {
    UserID: userId,
    Query: query
    };

    let jsonPayload = JSON.stringify(tmp);

    let url = urlBase + '/contacts/search.' + extension;
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    console.log("heyyyy")

    try {
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let jsonObject = JSON.parse(xhr.responseText);

                if (jsonObject.error) {
                    console.log(jsonObject.error);
                    return;
                }

                // Clear the contact list before adding current contacts
                document.getElementById('contact-list').innerHTML = '';
                for (let i = 0; i < jsonObject.length; i++) {
                    addContactCard(jsonObject[i], userId);
                }
            }
        };
        xhr.send(jsonPayload);
    } catch (err) {
        console.log(err.message);
    }
}

function edit_row(id) {
    document.getElementById("edit_button" + id).style.display = "none";
    document.getElementById("save_button" + id).style.display = "inline-block";

    let firstNameI = document.getElementById("first_Name" + id);
    let lastNameI = document.getElementById("last_Name" + id);
    let email = document.getElementById("email" + id);
    let phone = document.getElementById("phone" + id);

    let namef_data = firstNameI.innerText;
    let namel_data = lastNameI.innerText;
    let email_data = email.innerText;
    let phone_data = phone.innerText;

    firstNameI.innerHTML = "<input type='text' id='namef_text" + id + "' value='" + namef_data + "'>";
    lastNameI.innerHTML = "<input type='text' id='namel_text" + id + "' value='" + namel_data + "'>";
    email.innerHTML = "<input type='text' id='email_text" + id + "' value='" + email_data + "'>";
    phone.innerHTML = "<input type='text' id='phone_text" + id + "' value='" + phone_data + "'>"
}

function doEditContact(payload) {
    payload.UserID = readCookie().id;
    let jsonPayload = JSON.stringify(payload);

    document.getElementById("editContactError").innerHTML = "";

    let firstname = payload.FirstName;
    let lastname = payload.LastName;
    let phonenumber = payload.PhoneNumber;
    let emailaddress = payload.EmailAddress;

    if (!validAddContact(firstname, lastname, phonenumber, emailaddress)) {
        document.getElementById("editContactError").innerHTML = "Please check the phone number or email";
        return;
    }

    let url = urlBase + '/contacts/edit.' + extension;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try {
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                loadContacts(readCookie().id, "");
            }
        };
        xhr.send(jsonPayload);
    } catch (err) {
        console.log(err.message);
    }
}

// deletes contact from the DataBase
function deleteContact(userID, contactID) {
    let jsonPayload = JSON.stringify({
        UserID: userID,
        ContactID: contactID
    });

    let url = urlBase + '/contacts/delete.' + extension;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try {
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log("Contact has been deleted");
                loadContacts(readCookie().id, "");
            }
        };
        xhr.send(jsonPayload);
    } catch (err) {
        console.log(err.message);
    }
}

    // checks if contact is valid
function validAddContact(firstName, lastName, phone, email) {

    let [fNameErr, lNameErr, phoneErr, emailErr] = [true, true, true, true];

    if (firstName == "") {
        console.log("FIRST NAME IS BLANK");
    }
    else {
        console.log("first name IS VALID");
        fNameErr = false;
    }

    if (lastName == "") {
        console.log("LAST NAME IS BLANK");
    }
    else {
        console.log("LAST name IS VALID");
        lNameErr = false;
    }

    if (phone == "") {
        console.log("PHONE IS BLANK");
    }
    else {
        let regex = /^[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/;

        if (regex.test(phone) == false) {
            console.log("PHONE IS NOT VALID");
        }

        else {

            console.log("PHONE IS VALID");
            phoneErr = false;
        }
    }

    if (email == "") {
        console.log("EMAIL IS BLANK");
    }
    else {
        let regex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

        if (regex.test(email) == false) {
            console.log("EMAIL IS NOT VALID");
        }

        else {

            console.log("EMAIL IS VALID");
            emailErr = false;
        }
    }

    if ((phoneErr || emailErr || fNameErr || lNameErr) == true) {
        return false;

    }

    return true;

}

    // style stuff
function clickLogin() {
    let log = document.getElementById("login");
    let reg = document.getElementById("signup");
    let but = document.getElementById("btn");

    log.style.left = "-400px";
    reg.style.left = "0px";
    but.style.left = "130px";
}

    // style stuff
function clickRegister() {

    let log = document.getElementById("login");
    let reg = document.getElementById("signup");
    let but = document.getElementById("btn");

    reg.style.left = "-400px";
    log.style.left = "0px";
    but.style.left = "0px";

}

export default{
    doLogin,
    doSignup,
    validSignUpForm,
    validLoginForm,
    readCookie,
    doLogout,
    addContact,
    loadContacts,
    edit_row,
    doEditContact,
    deleteContact,
    validAddContact,
    clickLogin,
    clickRegister
};

