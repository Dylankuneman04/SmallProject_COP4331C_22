<?php

/*
** This endpoint handles a user seaching through their contacts.
**
** Returns 400 if the request does not conform to {"UserID": <NUMBER>, "Query": <STRING>}
** Returns 500 if the database is not working.
** Returns 200 and an array of {"ContactID": <NUMBER>, "EmailAddress": <STRING>,
** "PhoneNumber": <STRING>, "FirstName": <STRING>, "LastName": <STRING>} if the search is successful.
*/

require_once("../common.php");
require_once("../config.php");

setResponseTypeJSON();
$form = getRequestAsJSON();
$user_id = sanitizeUserNumber($form, "UserID", 0, 2147483647);
$query = sanitizeUserString($form, "Query", 1, 256, SANITIZE_STRING_ALPHANUMERIC);

if (!isset($user_id) || !isset($query)) {
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

$search_stmt = $db->prepare("SELECT * FROM Contacts WHERE UserID=? AND (FirstName LIKE ? OR LastName LIKE ?)");
$search_stmt->bind_param("iss", $user_id, $query, $query);
$search_stmt->execute();
$search_res = $search_stmt->get_result();

$search_res_collection = [];
while ($row = $search_res->fetch_assoc()) {
    $contact = array("ContactID" => $row["ID"], "FirstName" => $row["FirstName"], 
    "LastName" => $row["LastName"], "PhoneNumber" => $row["Phone"], "EmailAddress" => $row["Email"]);
    array_push($search_res_collection, $contact);
}
http_response_code(STATUS_SUCCESS);
echoObjectAsJSON($search_res_collection);

?>