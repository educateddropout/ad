<?php

session_start();
$database = require '..\bootstrap.php';

// setting return value
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
// /header('Content-Type: application/download; charset=utf-8');

$patientId = $_GET["id"];
//$patientId = "0000005";
	
$dummy = array();

$results = $database->getProfilePicture($patientId);

$returnJson["profilePicture"] = $results;

print_r(json_encode($returnJson));


?>