<?php

$database = require '..\bootstrap.php';

//require '..\controller\patientDentalPicDetails.php';

session_start();

// setting return value
header("Access-Control-Allow-Origin: *");
//header("Content-Type: application/json; charset=UTF-8");
header('Content-Type: application/download; charset=utf-8');
//header('Content-Type: text/plain; charset=utf-8');

// decoding of post data //
$data = json_decode(file_get_contents("php://input"), true);

define ('SITE_ROOT', realpath(dirname(__FILE__)));

// getting post data //
$signature = $data['signature'];

$patientId = guidv4();

$data_uri = $signature;
$decoded_image = base64_decode($signature);
$fileName = "./uploads/patient/{$patientId}_signature.png";
file_put_contents($fileName, $decoded_image);

//print_r($data);
$results = $database->savePatientDetails($patientId, $data, $fileName);


?>