function validateFirstName(data){

	var ans = "";

	if(data.trim() == ""){
		ans = "This is required!";
	}

	return ans;

}

function validateLastName(data){

	var ans = "";

	if(data.trim() == ""){
		ans = "This is required!";
	}

	return ans;

}

function validateMobileNumber(data){

	var ans = "";

	if(isNaN(data)){
		ans = "Invalid Cellphone Number!";
	}

	return ans;

}

function validateBirthday(data){

	var ans = "";

	if(data.trim() == ""){
		ans = "This is required!";
	}

	return ans;

}

function validateAddress(data){

	var ans = "";

	if(data.trim() == ""){
		ans = "This is required!";
	}

	return ans;

}

function validatePhysicianNumber(data){

	var ans = "";

	if(isNaN(data)){
		ans = "Invalid Cellphone Number!";
	}

	return ans;

}