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

$patientId = $_POST['patient_id'];
$profilePicture = $_POST['profile_picture'];
$userId = $_SESSION['ad_user_id'];
$fileDirectory = "/uploads/profilePicture/";
$uploadCtr = 0; // okay to upload


	//$fileName = $fileDirectory . basename($_FILES["fileToUpload"]["name"]);
 	$fileType = $_FILES["file"]["type"];
	$fileSize = $_FILES["file"]["size"];
	$fileTmpName = $_FILES["file"]["tmp_name"];

	
	$returnJson["status"] = "SUCCESS"; 
	$messages = array();

	$imageFileType = strtolower(pathinfo(basename($_FILES["file"]["name"]),PATHINFO_EXTENSION));

	$fileName = $fileDirectory . $patientId. "." . $imageFileType;
	// Allow certain file formats
	if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
	&& $imageFileType != "gif" ) {

	    array_push($messages, "Sorry, only JPG, JPEG, PNG & GIF files are allowed.");

	    $uploadCtr = 1;
	}

	// Check file size
	if ($fileSize > 2000000) {
		
	    array_push($messages, "Sorry, your file is too large.");
	    $uploadCtr = 1;

	}

	// Check if $uploadOk is set to 0 by an error
	if ($uploadCtr == 1) {
		
		$returnJson["status"] = "ERROR"; 

	}
	else {
	    if (move_uploaded_file($fileTmpName, SITE_ROOT.$fileName)) {

	        array_push($messages, "The file ". basename( $fileName. " has been uploaded."));

	        $fileName = "../php/api".$fileName;
	        if($profilePicture != ""){
				$database->updateProfilePicture($patientId, $_FILES["file"]["name"], $fileName, $userId);
			}
			else{
				$database->saveProfilePicture($patientId, $_FILES["file"]["name"], $fileName, $userId);
			}

	    }
	    else {

	    	$returnJson["status"] = "ERROR"; 
	        array_push($messages, "Sorry, an error occured during uploading.");

	    }
	}

	$returnJson['message'] = $messages;
	print_r(json_encode($returnJson));

	




?>