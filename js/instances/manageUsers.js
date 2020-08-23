

var ps = new Vue({

	el: '#manageUsers',


	data: {
		
		// patients page counter == 2
		pageCounter : 4,
		search : "",
		userData : {
			userId : -1,
			userName : "",
			userType : -1,
			isDentist : -1,
			allowedAccess : 0
		},
		users : [],
		totalPatientsCount : 0,
		totalPendingCount : 0,
		isOpenAddUserBox : true,
		fullName : { value : '', error : ''},
		username : { value : '', error : ''},
		usertype : { value : '-1', error : ''},
		isDentist : { value : '-1', error : ''},

		showPendingUsers : false,

		showModal : false,
		modalMessage : "",
		modalLoadingCtr : false
	},

	created(){

		this.getListOfUsers();
		
	},

	methods: {

		togglePendingTable(){

			if(this.showPendingUsers == false){
				if(this.pendingListOfUser.length > 0) this.showPendingUsers = true;
			} 
			else this.showPendingUsers = false;

		},

		copyUserData(userData){

			this.userData = userData;
		},

		getListOfUsers(){

			var self = this;

			//list of payment types
			axios.get('../php/api/listOfUsers.php')
			.then(function (response){
				console.log(response.data);
				self.users = response.data.list_of_users;

				if(self.pendingListOfUser.length < 1) self.showPendingUsers = false;

			})
			.catch(function (error) {
				alert(error);
			});


		},

		approveUser(index){

			var self = this;
			this.modalLoadingCtr = true;
			this.modalMessage = "Authenticating. Please Wait!";
			this.showModal = true;

			axios.post( '../php/api/approveUser.php',{
        
		        userId : this.pendingListOfUser[index].id
		        
		    }).then(function(response){
		    	console.log(response.data);
		        if(response.data.status = "SUCCESS"){

		        	if(response.data.message > 0){
		        		self.modalLoadingCtr = false;
		        		self.modalMessage = "Successfully approved '" +  self.pendingListOfUser[index].name + "' registration request.";
		        		self.getListOfUsers();


		        	}

		        }


		    })
		    .catch(function(error){
		        alert(error);
		    });

		},

		disApproveUser(index){

			var self = this;
			this.modalLoadingCtr = true;
			this.modalMessage = "Authenticating. Please Wait!";
			this.showModal = true;

			axios.post( '../php/api/disApproveUser.php',{
        
		        userId : this.pendingListOfUser[index].id
		        
		    }).then(function(response){

		        if(response.data.status = "SUCCESS"){

		        	if(response.data.message > 0){
		        		self.modalLoadingCtr = false;
		        		self.modalMessage = "Successfully declined '" + self.pendingListOfUser[index].name + "' registration request.";
		        		self.getListOfUsers();


		        	}

		        }


		    })
		    .catch(function(error){
		        alert(error);
		    });

		},

		lockUser(index){

			var self = this;
			this.modalLoadingCtr = true;
			this.modalMessage = "Authenticating. Please Wait!";
			this.showModal = true;

			axios.post( '../php/api/lockUser.php',{
        
		        userId : this.activeLockedListOfUser[index].id,
		        
		    }).then(function(response){

		        if(response.data.status = "SUCCESS"){

		        	if(response.data.message > 0){
		        		self.modalLoadingCtr = false;
		        		self.modalMessage = "Successfully locked user '" + self.activeLockedListOfUser[index].name + "' account.";
		        		self.getListOfUsers();


		        	}

		        }


		    })
		    .catch(function(error){
		        alert(error);
		    });

		},

		unlockUser(index){

			var self = this;
			this.modalLoadingCtr = true;
			this.modalMessage = "Authenticating. Please Wait!";
			this.showModal = true;

			axios.post( '../php/api/unlockUser.php',{
        
		        userId : this.activeLockedListOfUser[index].id,
		        
		    }).then(function(response){

		        if(response.data.status = "SUCCESS"){

		        	if(response.data.message > 0){
		        		self.modalLoadingCtr = false;
		        		self.modalMessage = "Successfully unlocked user '" + self.activeLockedListOfUser[index].name + "' account.";
		        		self.getListOfUsers();


		        	}

		        }


		    })
		    .catch(function(error){
		        alert(error);
		    });

		},

		resetUserPassword(index){

			var self = this;
			this.modalLoadingCtr = true;
			this.modalMessage = "Authenticating. Please Wait!";
			this.showModal = true;

			axios.post( '../php/api/resetUserPassword.php',{
        
		        userId : this.activeLockedListOfUser[index].id,
		        
		    }).then(function(response){

		        if(response.data.status = "SUCCESS"){

		        	if(response.data.message > 0){
		        		self.modalLoadingCtr = false;
		        		self.modalMessage = "'" + self.activeLockedListOfUser[index].name + "' password is now default.";
		        		self.getListOfUsers();


		        	}

		        }


		    })
		    .catch(function(error){
		        alert(error);
		    });

		},

		demoteUser(index){

			var self = this;
			this.modalLoadingCtr = true;
			this.modalMessage = "Authenticating. Please Wait!";
			this.showModal = true;

			axios.post( '../php/api/demoteUser.php',{
        
		        userId : this.activeLockedListOfUser[index].id,
		        isDentist : this.activeLockedListOfUser[index].is_dentist
		        
		    }).then(function(response){

		        if(response.data.status = "SUCCESS"){

		        	if(response.data.message > 0){
		        		self.modalLoadingCtr = false;
		        		self.modalMessage = "Successfully demoted '" + self.activeLockedListOfUser[index].name + "'.";
		        		self.getListOfUsers();


		        	}

		        }


		    })
		    .catch(function(error){
		        alert(error);
		    });

		},

		promoteUser(index){

			var self = this;
			this.modalLoadingCtr = true;
			this.modalMessage = "Authenticating. Please Wait!";
			this.showModal = true;

			axios.post( '../php/api/promoteUser.php',{
        
		        userId : this.activeLockedListOfUser[index].id,
		        isDentist : this.activeLockedListOfUser[index].is_dentist
		        
		    }).then(function(response){

		        if(response.data.status = "SUCCESS"){

		        	if(response.data.message > 0){
		        		self.modalLoadingCtr = false;
		        		self.modalMessage = "Successfully promoted '" + self.activeLockedListOfUser[index].name + "'.";
		        		self.getListOfUsers();


		        	}

		        }


		    })
		    .catch(function(error){
		        alert(error);
		    });

		},

		closeModal(){
			this.showModal = false;
		}




	},

	computed : {

		activeLockedListOfUser(){

			return this.users.filter((user) => { return user.archive == 0 || user.archive == 1; });

		},

		pendingListOfUser(){

			return this.users.filter((user) => { return user.archive == 2 });

		},

		showPendingUserButtonText(){

			let retVal = this.pendingListOfUser.length == 1 ? "Show Pending User" : "Show Pending Users";

			if(this.showPendingUsers == true) retVal = this.pendingListOfUser.length == 1 ? "Hide Pending User" : "Hide Pending Users";
			if(this.pendingListOfUser.length < 1) retVal = "No Pending User Registration";

			return retVal;
		}

	}

});

function validateUserFullName(data){

	let retVal = "";
	if(data == ""){
		retVal = 'This is required!';
	} else {
		if (! /^[a-zA-ZÑñ0-9\-\s]+$/.test(data)) {
			retVal = 'Found invalid character...';
		}
	}

	return retVal;

}

function validateUsername(data){
	
	let retVal = "";

	if(data == ""){
		retVal = 'This is required!';
	} else {
		if (! /^[a-zA-ZÑñ0-9\-]+$/.test(data)) {
			retVal = 'Should be alphanumeric only...';
		}
	}

	return retVal;

}

function validateUsertype(data){

	let retVal = "";

	if(data == -1){
		retVal = 'This is required!';
	}

	return retVal;

}

function validateIsDentist(data){

	let retVal = "";

	if(data == -1){
		retVal = 'This is required!';
	}

	return retVal;

}