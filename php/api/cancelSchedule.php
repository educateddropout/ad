<?php

$database = require '..\bootstrap.php';

session_start();

// setting return value
header("Access-Control-Allow-Origin: *");
//header("Content-Type: application/json; charset=UTF-8");
header('Content-Type: application/download; charset=utf-8');
//header('Content-Type: text/plain; charset=utf-8');

$userId = $_SESSION['ad_user_id'];

// decoding of post data //
$data = json_decode(file_get_contents("php://input"), true);

$uuid = guidV4();

$returnValue = array();
$returnValue["status"] = "ERROR";
$timeSchedules = array();


try {

	//$results = $database->hasExistingDentistSchedule( $data['date_of_appointment'], $data['dentist_id']);

	foreach ($data['input_field'] as $timeSchedule) {
		if($timeSchedule['input'] != '') array_push($timeSchedules, $timeSchedule['input']);
		else array_push($timeSchedules, "");
	}

	$returnValue["status"] = "SUCCESS";
	$results = $database->updateDentistSchedule( $data['date_of_appointment'], $data['dentist_id'], $userId, $timeSchedules, $results[0]['id']);


	if(count($results) != 0){
		$results = $database->updateCancelledSchedule( $data['date_of_appointment'], $data['dentist_id'], $userId, $timeSchedules);
	} else {
		$results = $database->createCancelledSchedule( $data['date_of_appointment'], $data['dentist_id'], $userId, $timeSchedules);
	}

}
catch(PDOException $e){

	$returnValue['message'] = $e;

}

print_r(json_encode($returnValue));


?>