<?php

session_start();
$database = require '..\bootstrap.php';

// setting return value
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
// /header('Content-Type: application/download; charset=utf-8');

$returnJson = array();

$results = $database->getPatientsDetails(); // patients

$returnJson["patients_details"] = $results;

print_r(json_encode($returnJson));

?>