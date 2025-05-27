const urlBase = 'http://hopethiswork.com/api';
const extension = 'php';



let userId = 0;
let firstName = "";
let lastName = "";
const ids = []

function doLogin(){

    // resets logging info
    let userId = 0;
    let firstName = "";
    let lastName = "";

    // gets login name and password that has been inputed
    let name = document.getElementById("loginName").value;
    let password = document.getElementById("loginPassword").value;

    // hashes password using md5.js for security
    var hash = md5(password);

    // checks if name and password are within requirements
    if (!validLoginForm(name, password)) {
        document.getElementById("loginResult").innerHTML = "invalid username or password";
        return;
    }

    document.getElementById("loginResult").innerHTML = "";

    let tmp = {
        login: name,
        password: hash
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
                userId = jsonObject.id;

                if (userId < 1) {
                    document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
                    return;
                }
                firstName = jsonObject.firstName;
                lastName = jsonObject.lastName;

                saveCookie();
                window.location.href = "contacts.html";
            }
        };

        // sends name and password json
        xhr.send(jsonPayload);
    } catch (err) {
        document.getElementById("loginResult").innerHTML = err.message;
    }
}



function saveCookie() {
    let minutes = 20;
    let date = new Date();
    date.setTime(date.getTime() + (minutes * 60 * 1000));

    document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userId + ";expires=" + date.toGMTString();
}

// checks if signup is within the username and password restr
function validSignUpForm(fName, lName, user, pass) {

    var fNameErr = lNameErr = userErr = passErr = true;

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

    if (user == "") {
        console.log("USERNAME IS BLANK");
    }
    else {
        var regex = /(?=.*[a-zA-Z])([a-zA-Z0-9-_]).{3,18}$/;

        if (regex.test(user) == false) {
            console.log("USERNAME IS NOT VALID");
        }

        else {

            console.log("USERNAME IS VALID");
            userErr = false;
        }
    }

    if (pass == "") {
        console.log("PASSWORD IS BLANK");
    }
    else {
        var regex = /(?=.*\d)(?=.*[A-Za-z])(?=.*[!@#$%^&*]).{8,32}/;

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

    return true;
}

function doSignup() {

    // add name, lastname, username and password for new account
    firstName = document.getElementById("firstName").value;
    lastName = document.getElementById("lastName").value;

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    // check if an account with this information exists already
    if (!validSignUpForm(firstName, lastName, username, password)) {
        document.getElementById("signupResult").innerHTML = "invalid signup";
        return;
    }

    var hash = md5(password);

    document.getElementById("signupResult").innerHTML = "";

    let tmp = {
        firstName: firstName,
        lastName: lastName,
        login: username,
        password: hash
    };

    let jsonPayload = JSON.stringify(tmp);

    let url = urlBase + '/SignUp.' + extension;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    try {
        xhr.onreadystatechange = function () {

            if (this.readyState != 4) {
                return;
            }

            if (this.status == 409) {
                document.getElementById("signupResult").innerHTML = "User already exists";
                return;
            }

            if (this.status == 200) {

                let jsonObject = JSON.parse(xhr.responseText);
                userId = jsonObject.id;
                document.getElementById("signupResult").innerHTML = "User added";
                firstName = jsonObject.firstName;
                lastName = jsonObject.lastName;
                saveCookie();
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
        
        var regex = /(?=.*[a-zA-Z])[a-zA-Z0-9-_]{3,18}$/;

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
        var regex = /(?=.*\d)(?=.*[A-Za-z])(?=.*[!@#$%^&*]).{8,32}/;

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

export default {
    doLogin,
    doSignup,
    validLoginForm,
    validSignUpForm,
    saveCookie
};