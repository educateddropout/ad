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
$patientId = $_GET["id"];

//print_r($data['patient_id']);
$results = $database->disApprovedPendingPatient( $patientId, $userId);


?>