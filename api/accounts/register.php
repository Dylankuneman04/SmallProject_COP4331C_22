<?php

/*
** This endpoint handles user registration.
**
** Returns 400 if the request does not conform to {"FirstName": <STRING>, 
** "LastName": <STRING>, "Password": <STRING>, "Username": <STRING>}
** Returns 500 if the database is not working.
** Returns 409 if Username is already taken.
** Returns 200 and {"UserID": <NUMBER>} if registration is successful.
*/

require_once("../common.php");
require_once("../config.php");

setResponseTypeJSON();
$form = getRequestAsJSON();
$first_name = sanitizeUserString($form, "FirstName", 1, 256, SANITIZE_STRING_ALPHANUMERIC);
$last_name = sanitizeUserString($form, "LastName", 1, 256, SANITIZE_STRING_ALPHANUMERIC);
$username = sanitizeUserString($form, "Username", 1, 256, SANITIZE_STRING_ALPHANUMERIC);
$password = sanitizeUserString($form, "Password", 1, 256, SANITIZE_STRING_ANY_EXCEPT_SPACE);

if (!isset($first_name) || !isset($last_name) || !isset($username) || !isset($password)) {
    http_response_code(STATUS_MALFORMED_REQUEST);
    echoErrorMessageAsJSON("Required fields are missing or malformed");
    return;
}

$db = new mysqli(DATABASE_HOST, DATABASE_USERNAME, DATABASE_PASSWORD, DATABASE_NAME);
if ($db->connect_error) {
    http_response_code(STATUS_INTERNAL_ERROR);
    echoErrorMessageAsJSON("The server failed to communicate with the database");
    return;
}

$dup_check_stmt = $db->prepare("SELECT * FROM Users WHERE Username=?");
$dup_check_stmt->bind_param("s", $username);
$dup_check_stmt->execute();
$dup_check_res = $dup_check_stmt->get_result();
$dup_check_count = mysqli_num_rows($dup_check_res);

if ($dup_check_count >= 1) {
    http_response_code(STATUS_CONFLICT);
    echoErrorMessageAsJSON("An account with the provided username already exists");
} else {
    $register_stmt = $db->prepare("INSERT into Users (FirstName, LastName, Username, Password) VALUES (?,?,?,?)");
    $register_stmt->bind_param("ssss", $first_name, $last_name, $username, $password);
    $register_stmt->execute();
    $register_id = $db->insert_id;
    http_response_code(STATUS_SUCCESS);
    echoObjectAsJSON(array("UserID" => $register_id));
}

?>