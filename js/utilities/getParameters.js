function getUrlParameters(parameterName){

	var url_string = window.location.href;
	var url = new URL(url_string);
	var data = url.searchParams.get(parameterName);

	
	return data;
}