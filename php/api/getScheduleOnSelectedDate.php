<?php

session_start();
$database = require '..\bootstrap.php';

// setting return value
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// decoding of post data //
$data = json_decode(file_get_contents("php://input"), true);

$date = $data['date'];
$args['date'] = $date;

$returnJson = array();

$activeDentist = $database->listOfActiveDentist();

foreach ($activeDentist as $dentist) {
	# code...
	$args['dentist_id'] = $dentist['id'];
	$results = $database->getSchedulesByDentist($args);

	array_push($returnJson, $results);
}

//print_r($returnJson);
//$results = $database->getSchedulesByDentist($data);

//$returnJson["schedule_of_dentist"] = $results;

print_r(json_encode($returnJson));


?>