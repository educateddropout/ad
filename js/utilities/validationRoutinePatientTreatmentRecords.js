function validateTreatmentDate(selectedTreatmentDate){

	let ans = "";
	let today = new moment(moment().toISOString(true).substring(0,10));
	let formattedDateToday = today.toISOString(true).substring(0,10);

	if(selectedTreatmentDate == ""){
		ans = "Please provide date";
	}
	else {
		if(selectedTreatmentDate > formattedDateToday){
			ans = "Cannot log future dates";
		}
	}

	return ans;

}

function validateTreatmentDentist(selectedDentist){

	let ans = "";

	if(selectedDentist == -1){
		ans = "Please select attending dentist";
	}

	return ans;

}

function validateTreatmentProcedure(procedure){

	let ans = "";

	if(procedure.trim() == ""){
		ans = "Please provide the procedure made";
	}

	return ans;

}

function validateTreatmentAmountCharge(amount){

	let ans = "";

	if(amount.trim() != ""){

		if(amount < 0){
			ans = "Invalid Amount!";
		}

		if(isNaN(amount)){
			ans = "Please enter numbers only.";
		}

	}
	else {
		ans = "Please provide amount!";
	}

	return ans;

}

function validateTreatmentDentistPercentage(percentage){

	let ans = "";

	if(percentage.trim() != ""){

		if(percentage < 0 || percentage > 100){
			ans = "Invalid Percentage!";
		}

		if(isNaN(percentage)){
			ans = "Please enter numbers only.";
		}

	} else {
		ans = "Please provide dentist percentage!";
	}

	return ans;

}

function validateTreatmentLabFee(labFee){

	let ans = "";

	if(labFee.trim() != ""){

		if(labFee < 0){
			ans = "Invalid Amount!";
		}

		if(isNaN(labFee)){
			ans = "Please enter numbers only.";
		}

	} else {
		ans = "Please provide laboratory fee. (0 if NONE)";
	}

	return ans;

}

function validatePaymentAmount(amount, balance, totalAmount){

	let ans = "";

	if(amount.trim() != ""){

		if(amount < 0){
			ans = "Invalid Amount!";
		}

		if(isNaN(amount)){
			ans = "Please enter numbers only.";
		}


		/*if(balance == totalAmount){

			if(amount < (totalAmount / 2)) ans = "First Payment should be 50% of the total amount cost.";
		}*/

	}
	else {
		ans = "Please provide amount!";
	}

	return ans;

}

function validatePaymentDate(selectedPaymentDate){

	let ans = "";
	let today = new moment(moment().toISOString(true).substring(0,10));
	let formattedDateToday = today.toISOString(true).substring(0,10);

	if(selectedPaymentDate == ""){
		ans = "Please provide date";
	}
	else {
		if(selectedPaymentDate > formattedDateToday){
			ans = "Cannot log future dates";
		}
	}

	return ans;

}

function validatePaymentType(paymentType){

	let ans = "";

	if(paymentType == -1){
		ans = "Please select payment type!";
	}

	return ans;

}