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

$returnJson = array();
$returnJson['status'] = "ERROR";

try {
	
	$results = $database->updateMiscExpenses( $data, $userId);

	if($results > 0){
		$returnJson['payload'] = $results;
		$returnJson['status'] = "SUCCESS";
	} else {
		$returnJson['payload'] = "Error updating expenses. Please ask for assistance.";
	}

} catch (Exception $e) {

	$returnJson['payload'] = $e;

}

print_r(json_encode($returnJson));

?>