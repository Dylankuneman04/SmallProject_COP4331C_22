<?php

/*
** This endpoint handles a user editing an existing project.
**
** Returns 400 if the request does not conform to {"UserID": <NUMBER>, "ContactID": <NUMBER>, 
** "FirstName": <STRING>, "LastName": <STRING>, "PhoneNumber": <STRING>, "EmailAddress": <STRING>}
** Returns 500 if the database is not working.
** Returns 200 if edit was successful.
** Returns 404 if the user id or contact id does not exist.
*/

require_once("../common.php");
require_once("../config.php");

setResponseTypeJSON();
$form = getRequestAsJSON();
$user_id = sanitizeUserNumber($form, "UserID", 0, 2147483647);
$contact_id = sanitizeUserNumber($form, "ContactID", 0, 2147483647);
$first_name = sanitizeUserString($form, "FirstName", 1, 256, SANITIZE_STRING_ALPHANUMERIC);
$last_name = sanitizeUserString($form, "LastName", 1, 256, SANITIZE_STRING_ALPHANUMERIC);
$phone_number = sanitizeUserString($form, "PhoneNumber", 1, 256, SANITIZE_STRING_ANY_EXCEPT_SPACE);
$email_address = sanitizeUserString($form, "EmailAddress", 1, 256, SANITIZE_STRING_ANY_EXCEPT_SPACE);

if (!isset($user_id) || !isset($first_name) || !isset($last_name) || !isset($phone_number) 
    || !isset($email_address) || !isset($contact_Id)) {
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

$create_stmt = $db->prepare("UPDATE Contacts SET FirstName=?, LastName=?, Phone=?, Email=? WHERE UserID=?");
$create_stmt->bind_param("ssssi", $first_name, $last_name, $phone_number, $email_address, $contact_id);
$create_stmt->execute();
http_response_code(($create_stmt->affected_rows == 1) ? STATUS_SUCCESS : STATUS_MISSING);;

?>