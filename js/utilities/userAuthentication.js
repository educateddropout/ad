function userAuthentication(){

	let userData = {};

	axios.get('../php/api/userAuthentication.php')
	.then(function (response){

		userData.userId = response.data.id;
		userData.userName = response.data.name;
		userData.userType = response.data.userType;
		userData.isDentist = response.data.isDentist;
		userData.allowedAccess = response.data.allowedAccess;

	})
	.catch(function (error) {
		alert(error);
	});

	return userData;

}