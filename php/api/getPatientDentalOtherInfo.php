<?php

session_start();
$database = require '..\bootstrap.php';
require '..\model\dentalChart.php';

// setting return value
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// decoding of post data //
$data = json_decode(file_get_contents("php://input"), true);

$returnValue = array();
$returnValue['status'] = "ERROR";

try {

	$results = $database->getPatientDentalOtherInfo($data['patient_id']); //
	
	$returnValue['status'] = "SUCCESS";
	$returnValue['message'] = $results;

}
catch(PDOException $e){

	$returnValue['message'] = $e;

}

print_r(json_encode($returnValue));


?>