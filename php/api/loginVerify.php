<?php

$database = require '..\bootstrap.php';
session_start();

// setting return value
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
// /header('Content-Type: application/download; charset=utf-8');

// decoding of post data //
$data = json_decode(file_get_contents("php://input"), true);

// getting post data //
$username = $data['username'];
$password = $data['password'];
//$username = "campong";
//$password = "campong";
$returnJson = array();

$results = $database->authenticateUser($username,$password);

if($results){ //if returns true
	
	$_SESSION['ad_name'] = $results[0]['name'];
	$_SESSION['ad_user_type'] = $results[0]['user_type'];
	$_SESSION['ad_is_dentist'] = $results[0]['is_dentist'];
	$_SESSION['ad_user_id'] = $results[0]['id'];

	$returnJson['success'] = true;
}
else{

	$returnJson['success'] = false;
}

print_r(json_encode($returnJson));



?>