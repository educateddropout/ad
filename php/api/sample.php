<?php
	
	$database = require '..\bootstrap.php';
	
	$listOfPaymentTypes = $database->listOfPaymentTypes();
	
	$index = 0
	foreach ($listOfPaymentTypes as $paymentType) {	
		print_r($paymentType['id']);
		$index++;
	}
?>