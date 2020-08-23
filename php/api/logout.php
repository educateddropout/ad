<?php

session_start();

// setting return value
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
// /header('Content-Type: application/download; charset=utf-8');

	unset($_SESSION['ad_name']);
	unset($_SESSION['ad_user_type']);
	unset($_SESSION['ad_is_dentist']);
	unset($_SESSION['ad_user_id']);

?>