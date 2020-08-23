
function translateBoolean(data){

	var ans = 0;

	if(data == true){
		ans = 1;
	}

	return ans;

}

function translateBoolean2(data){

	var ans = false;

	if(data != 0){
		ans = true;
	}

	return ans;

}