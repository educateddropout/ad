<?php

session_start();
$database = require '..\bootstrap.php';

// setting return value
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
// /header('Content-Type: application/download; charset=utf-8');

$returnJson = array();

$results = $database->listOfPaymentTypes();

$returnJson["list_of_payment_types"] = $results;

print_r(json_encode($returnJson));

?>