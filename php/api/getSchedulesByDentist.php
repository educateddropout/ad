<?php

session_start();
$database = require '..\bootstrap.php';

// setting return value
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// decoding of post data //
$data = json_decode(file_get_contents("php://input"), true);

$returnJson = array();

	$results = $database->getSchedulesByDentist($data);

	$returnJson["schedule_of_dentist"] = $results;

	print_r(json_encode($returnJson));


?>