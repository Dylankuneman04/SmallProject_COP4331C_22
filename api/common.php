<?php

define("STATUS_SUCCESS", 200);              // Everything worked as intended
define("STATUS_MALFORMED_REQUEST", 400);    // User request is malformed
define("STATUS_INTERNAL_ERROR", 500);       // Something went wrong that is not the user's fault
define("STATUS_UNAUTHORIZED", 401);         // Incorrect login credentials
define("STATUS_FORBIDDEN", 403);            // Insufficient privileges
define("STATUS_CONFLICT", 409);             // An identifier is already taken, such as a username
define("STATUS_MISSING", 404);              // Resource or identifier does not exist

function getRequestAsJSON() {
    $raw_post_data = file_get_contents("php://input");
    if (empty($raw_post_data)) return json_decode("{}", true);
    $post_data_as_json = json_decode($raw_post_data, true);
    if (empty($post_data_as_json)) return json_decode("{}", true);
    return $post_data_as_json;
}

function setResponseTypeJSON() {
    header("Content-Type: application/json; charset=utf-8");
}

function echoErrorMessageAsJSON($message) {
    echoObjectAsJSON(array("error" => $message));
}

function echoObjectAsJSON($array) {
    echo json_encode($array);
}

define("SANITIZE_STRING_ALPHANUMERIC", 0);      // Only characters a-z, A-Z, and 0-9 allowed.
define("SANITIZE_STRING_ANY", 1);               // All characters allowed.
define("SANITIZE_STRING_ANY_EXCEPT_SPACE", 2);  // All characters except for space/tabs allowed.

function sanitizeUserString($object, $key, $minlen, $maxlen, $mode) {
    if (isset($object[$key]) == false) return null;
    $str = $object[$key];
    if (gettype($str) != "string" && gettype($str) != "integer") return null;
    $strlen = strlen($str);
    if ($strlen < $minlen || $strlen > $maxlen) return null;
    if ($mode == SANITIZE_STRING_ALPHANUMERIC && !preg_match("/^[A-Za-z0-9]*$/", $str)) return null;
    if ($mode == SANITIZE_STRING_ANY_EXCEPT_SPACE && preg_match("/\\s/", $str)) return null;
    return $str;
}

function sanitizeUserNumber($object, $key, $min, $max) {
    if (isset($object[$key]) == false) return null;
    $num = $object[$key];
    if (gettype($num) != "integer") return null;
    if ($num < $min || $num > $max) return null;
    return $num;
}

?>