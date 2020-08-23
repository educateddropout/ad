<?php

$database = require '..\bootstrap.php';

session_start();

// setting return value
header("Access-Control-Allow-Origin: *");
//header("Content-Type: application/json; charset=UTF-8");
header('Content-Type: application/download; charset=utf-8');
//header('Content-Type: text/plain; charset=utf-8');

$returnJson["status"] = "SUCCESS"; 
$messages = array();

$userId = $_SESSION['ad_user_id'];

// decoding of post data //
$data = json_decode(file_get_contents("php://input"), true);

//print_r($data['patient_id']);
$results = $database->updatePaymentType( $data, $userId);

if($results < 1){

	$returnJson["status"] = "ERROR";
	array_push($messages, "Error updating data!");

}

$returnJson['message'] = $messages;
print_r(json_encode($returnJson));

?>