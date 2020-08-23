function validateDentalRecord(date, dentalRecords, isEditing, id){

	
	let retVal = "";
	let dateToday = new Date().toJSON().slice(0,10).replace(/-/g,'');
	let date_added = date;
	date = date.replace(/-/g,'');

	if(date == ""){
		retVal = "Please provide date..";
	} else {

		if(date > dateToday) retVal = "Error.. Should not be future date!";
		else {
			if(isEditing){
				
				if(!(dentalRecords.filter(dentalRecord => dentalRecord.id == id)[0].date_added == date_added)){

					if(dentalRecords.filter(dentalRecord => dentalRecord.date_added == date_added).length > 0){
						retVal = "This date has a record already. Please check and update the existing one!";
					}
				}

			}
			else {
				if(dentalRecords.filter(dentalRecord => dentalRecord.date_added == date_added).length > 0){
					retVal = "This date has a record already. Please check!";
				}
			}
		}
	}

	return retVal;

}