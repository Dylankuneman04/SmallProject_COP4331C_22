<?php

/*
** This endpoint handles user login.
**
** Returns 400 if the request does not conform to {"Username": <STRING>, "Password": <STRING>}
** Returns 500 if the database is not working.
** Returns 401 if login fails due to incorrect credentials.
** Returns 200 and {"UserID": <NUMBER>, "FirstName": <STRING>, "LastName": <STRING>} if login is succcesful.
*/

require_once("../common.php");
require_once("../config.php");

setResponseTypeJSON();
$form = getRequestAsJSON();
$username = sanitizeUserString($form, "Username", 1, 256, SANITIZE_STRING_ALPHANUMERIC);
$password = sanitizeUserString($form, "Password", 1, 256, SANITIZE_STRING_ALPHANUMERIC);

if (!isset($username) || !isset($password)) {
    http_response_code(STATUS_MALFORMED_REQUEST);
    echoErrorMessageAsJSON(ERROR_MESSAGE_MALFORMED_REQUEST);
    return;
}

$db = new mysqli(DATABASE_HOST, DATABASE_USERNAME, DATABASE_PASSWORD, DATABASE_NAME);
if ($db->connect_error) {
    http_response_code(STATUS_INTERNAL_ERROR);
    echoErrorMessageAsJSON(ERROR_MESSAGE_DATABASE_UNAVAILABLE);
    return;
}

$login_stmt = $db->prepare("SELECT ID, FirstName, LastName FROM Users WHERE Username=? AND Password=?");
$login_stmt->bind_param("ss", $username, $password);
$login_stmt->execute();
$login_result = $login_stmt->get_result();

if ($row = $login_result->fetch_assoc()) {
    http_response_code(STATUS_SUCCESS);
    echoObjectAsJSON(array("UserID" => $row["ID"], "FirstName" => $row["FirstName"], "LastName" => $row["LastName"]));
} else {
    http_response_code(STATUS_UNAUTHORIZED);
    echoErrorMessageAsJSON("Incorrect login credentials");
}

?>