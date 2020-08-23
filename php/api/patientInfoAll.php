<?php

session_start();
$database = require '..\bootstrap.php';

// setting return value
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
// /header('Content-Type: application/download; charset=utf-8');

$patientId = $_GET["id"];
//$patientId = "1";
$returnJson = array();

$results = $database->getUserDetails($patientId);

$returnJson["patients_details"] = $results;
//$returnJson["total_rows"] = count($results);
//$returnJson["total_pages"] = ceil(count($results)/10);

print_r(json_encode($returnJson));

?>