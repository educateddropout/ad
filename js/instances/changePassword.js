

var ps = new Vue({

	el: '#changePassword',


	data: {
		
		// patients page counter == 2
		pageCounter : 5,
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

		input : [false,false,false],
		input1 : false,

		inputModel : [  {value : '', error : '' },
						{value : '', error : '' },
						{value : '', error : '' },
						],

		showSuccess : false,
		successMessage : "",
		messageLoading : true,
		disableButton : false

	},

	created(){

		// /this.getListOfUsers();

		
	},

	methods: {

		copyUserData(userData){

			this.userData = userData;
		},

		validatePassword(index){

			var self = this;

			if(this.inputModel[index].value == ""){
				Vue.set(this.input, index, false);
			} else {

				if(index == 0){ //* current password *//

					this.inputModel[index].error =  "";

					this.checkCurrentPassword(index);

					
				} else if (index == 1){ //* new password *//

					this.inputModel[index].error = validateNewPassword(this.inputModel[index].value,this.inputModel[0].value);

					if(this.inputModel[2].value.length != 0) {

						this.inputModel[2].error = validateConfirmPassword(this.inputModel[index].value,this.inputModel[2].value);

					}

				} else if (index == 2) { //* confirm new password *//

					this.inputModel[index].error = validateConfirmPassword(this.inputModel[1].value,this.inputModel[index].value);

				}
			
			}

		},

		inputFocus(index){
			//alert("sakalsdjh");
			Vue.set(this.input, index, true);
			//this.input1 = true;
			//$(this).parents('.form-group').addClass('focused');
		},

		checkCurrentPassword(index){

			var self = this;

			axios.post( '../php/api/checkCurrentPassword.php',{
        
		        password : this.inputModel[index].value
		        
		    }).then(function(response){


		        console.log(response.data);
		        if(response.data.status = "SUCCESS"){

		        	if(response.data.message == 0){
		        		self.inputModel[index].error =  "Invalid Password";
		        	}
		        	
		        }


		    })
		    .catch(function(error){
		        alert(error);
		    });

		},

		changePassword(){


			this.disableButton = true;

			if(this.inputModel[0].error == "" && this.inputModel[1].error == "" && this.inputModel[2].error == ""){
				
				var self = this;
				this.showSuccess = true;
				this.successMessage = "Changing your password. Please wait!";

				axios.post( '../php/api/changePassword.php',{
	        
			        password : this.inputModel[1].value // new password
			        
			    }).then(function(response){
			    	console.log(response.data);
			        if(response.data.status = "SUCCESS"){

			        	if(response.data.message > 0){
			        		self.messageLoading = false;
							self.successMessage = "Successfuly changed password. Thank you!";

							self.inputModel[0].value = "";
							self.inputModel[1].value = "";
							self.inputModel[2].value = "";
			        	}

			        }


			    })
			    .catch(function(error){
			        alert(error);
			    });

			}

		},

		closeSuccessModal(){
			this.showSuccess = false;
			this.disableButton = false;
		}

	},

	computed : {

		disableChangeButton(){
			let retVal = false;

			if(this.inputModel[0].value == "" || this.inputModel[1].value == "" || this.inputModel[2].value == "") retVal = true;

			if(this.inputModel[0].error != "" || this.inputModel[1].error != "" || this.inputModel[2].error != "") retVal = true;

			if(this.disableButton == true) retVal = true;

			return retVal;
		}
	}

});


function validateNewPassword(data,currentPassword){

	let retVal = "";

	if(data.length == 0) retVal = "Please provide your new password..";
	
	else {
		if(currentPassword == data) retVal = "Hmmm.. New password should not be your currently using password.";
		else {
			if(data.length < 8) retVal = "Should be 8 character long..";
		}
	}

	return retVal;

}

function validateConfirmPassword(newPassword, confirmPassword){

	let retVal = "";

	if(newPassword != confirmPassword) retVal = "Make sure it is the same..";
	

	return retVal;

}