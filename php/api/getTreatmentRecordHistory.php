<?php

session_start();
$database = require '..\bootstrap.php';
require '..\model\dentalChart.php';

// setting return value
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// decoding of post data //
$data = json_decode(file_get_contents("php://input"), true);

$returnJson = array();

if($data['selectedHistory'] == 0) $results = $database->listOfTreatmentRecordToday($data['date_from'],$data['user_type'],$data['user_id']); //
else if($data['selectedHistory'] == 1) $results = $database->listOfTreatmentRecordThisMonth($data['date_from'], $data['date_to'],$data['user_type'],$data['user_id']); //
else if($data['selectedHistory'] == 2) $results = $database->listOfTreatmentRecordThisYear($data['date_from'],$data['user_type'],$data['user_id']); //
else if($data['selectedHistory'] == 5) $results = $database->listOfTreatmentRecordFromTo($data['date_from'], $data['date_to'],$data['user_type'],$data['user_id']); //

$returnJson['list_of_treatments'] = $results;

print_r(json_encode($returnJson));


?>