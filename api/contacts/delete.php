<?php

/*
** This endpoint handles a user deleting one of their contacts.
**
** Returns 400 if the request does not conform to {"UserID": <NUMBER>, "ContactID": <NUMBER>}
** Returns 500 if the database is not working.
** Returns 200 if the delete is successful.
** Returns 404 if the user id or contact id does not exist.
*/

require_once("../common.php");
require_once("../config.php");

setResponseTypeJSON();
$form = getRequestAsJSON();
$user_id = sanitizeUserNumber($form, "UserID", 0, 2147483647);
$contact_id = sanitizeUserNumber($form, "ContactID", 0, 2147483647);

if (!isset($user_id) || !isset($contact_id)) {
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

$delete_stmt = $db->prepare("DELETE FROM Contacts WHERE UserID=? AND ID=?");
$delete_stmt->bind_param("ii", $user_id, $contact_id);
$delete_stmt->execute();
http_response_code(($delete_stmt->affected_rows == 1) ? STATUS_SUCCESS : STATUS_MISSING);

?>