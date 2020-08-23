<?php

$database = require '..\bootstrap.php';

session_start();

// setting return value
header("Access-Control-Allow-Origin: *");
//header("Content-Type: application/json; charset=UTF-8");
header('Content-Type: application/download; charset=utf-8');
//header('Content-Type: text/plain; charset=utf-8');

$userId = $_SESSION['ad_user_id'];

$returnValue = array();
$returnValue["status"] = "ERROR";

// decoding of post data //
$data = json_decode(file_get_contents("php://input"), true);

try{

	$results = $database->saveDentalRecord( $data, $userId);
	$returnValue["status"] = "SUCCESS";
	
}
catch(PDOException $e){

	$returnValue['message'] = $e;

}

print_r(json_encode($returnValue));

?>