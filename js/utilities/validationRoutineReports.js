
function validateDateFrom(selectedDateFrom){

	let ans = "";
	let today = new moment(moment().toISOString(true).substring(0,10));
	let formattedDateToday = today.toISOString(true).substring(0,10);

	if(selectedDateFrom == ""){
		ans = "Please provide date";
	}
	else {
		if(selectedDateFrom > formattedDateToday){
			ans = "Cannot log future dates";
		}
	}

	return ans;

}

function validateDateTo(selectedDateFrom,selectedDateTo){

	let ans = "";
	let today = new moment(moment().toISOString(true).substring(0,10));
	let formattedDateToday = today.toISOString(true).substring(0,10);

	if(selectedDateTo == ""){
		ans = "Please provide date";
	}
	else {
		if(selectedDateTo > formattedDateToday){
			ans = "Cannot log future dates";
		}

		if(selectedDateFrom != ""){
			if(selectedDateTo < selectedDateFrom){
				ans = "Date To must not be greater than Date From";
			}
		}
	}

	return ans;

}