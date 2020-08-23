<?php

session_start();

// setting return value
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
// /header('Content-Type: application/download; charset=utf-8');

$returnJson = array();

if(isset($_SESSION['ad_name'])){
	$returnJson['name'] = $_SESSION['ad_name'];
	$returnJson['userType'] = $_SESSION['ad_user_type'];
	$returnJson['isDentist'] = $_SESSION['ad_is_dentist'];
	$returnJson['id'] = $_SESSION['ad_user_id'];
	$returnJson['allowedAccess'] = 1; // true
}
else{
	$returnJson['allowedAccess'] = 0; //false
}

print_r(json_encode($returnJson));


?>