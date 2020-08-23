<?php

session_start();
$database = require '..\bootstrap.php';

// setting return value
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// decoding of post data //
$data = json_decode(file_get_contents("php://input"), true);

$returnJson = array();

$dummyObj = array();
$dummyArr = array();


	$results = $database->getSchedulesByDentist($data['date'],$data['dentist_id']);

	$dummyObj['dentist_id'] =  $data['dentist_id'];
	$dummyObj['date'] = $data['date'];
	
	if(count($results) > 0){

		array_push($dummyArr,  $results[0]['t1']);
		array_push($dummyArr,  $results[0]['t2']);
		array_push($dummyArr,  $results[0]['t3']);
		array_push($dummyArr,  $results[0]['t4']);
		array_push($dummyArr,  $results[0]['t5']);
		array_push($dummyArr,  $results[0]['t6']);
		array_push($dummyArr,  $results[0]['t7']);
		array_push($dummyArr,  $results[0]['t8']);
		array_push($dummyArr,  $results[0]['t9']);
		array_push($dummyArr,  $results[0]['t10']);
		array_push($dummyArr,  $results[0]['t11']);
		array_push($dummyArr,  $results[0]['t12']);
		array_push($dummyArr,  $results[0]['t13']);
		array_push($dummyArr,  $results[0]['t14']);
		array_push($dummyArr,  $results[0]['t15']);
		array_push($dummyArr,  $results[0]['t16']);
		array_push($dummyArr,  $results[0]['t17']);
		array_push($dummyArr,  $results[0]['t18']);
		array_push($dummyArr,  $results[0]['t19']);
		array_push($dummyArr,  $results[0]['t20']);
		array_push($dummyArr,  $results[0]['t21']);
		array_push($dummyArr,  $results[0]['t22']);
		array_push($dummyArr,  $results[0]['t23']);
		array_push($dummyArr,  $results[0]['t24']);
		array_push($dummyArr,  $results[0]['t25']);

	} else {
		
		array_push($dummyArr,  "");
		array_push($dummyArr,  "");
		array_push($dummyArr,  "");
		array_push($dummyArr,  "");
		array_push($dummyArr,  "");
		array_push($dummyArr,  "");
		array_push($dummyArr,  "");
		array_push($dummyArr,  "");
		array_push($dummyArr,  "");
		array_push($dummyArr,  "");
		array_push($dummyArr,  "");
		array_push($dummyArr,  "");
		array_push($dummyArr,  "");
		array_push($dummyArr,  "");
		array_push($dummyArr,  "");
		array_push($dummyArr,  "");
		array_push($dummyArr,  "");
		array_push($dummyArr,  "");
		array_push($dummyArr,  "");
		array_push($dummyArr,  "");
		array_push($dummyArr,  "");
		array_push($dummyArr,  "");
		array_push($dummyArr,  "");
		array_push($dummyArr,  "");
		array_push($dummyArr,  "");

	}

	$dummyObj['result'] = $dummyArr;
	array_push($returnJson, $dummyObj);


print_r(json_encode($returnJson));



?>