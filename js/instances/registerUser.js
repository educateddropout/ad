

var ps = new Vue({

	el: '#registerUser',


	data: {
		

		input : [false,false,false],
		input1 : false,

		inputModel : [  {value : '', error : '' },
						{value : '', error : '' },
						{value : '', error : '' },
						],
		isDentist : false,

		showSuccess : false,
		successMessage : "",
		messageLoading : true,
		disableButton : false,

		usernameStatus : ""

	},

	created(){

		// /this.getListOfUsers();

		
	},

	methods: {

		copyUserData(userData){

			this.userData = userData;
		},

		validateInput(index){

			var self = this;

			if(this.inputModel[index].value == ""){
				Vue.set(this.input, index, false);

				if (index == 2){ 
					this.usernameStatus = "";
					this.inputModel[index].error = "";
				}

			} else {

				if(index == 0){ //* full name *//

					this.inputModel[index].error =  validateFullName(this.inputModel[index].value);

					
				} else if (index == 1){ //* Nickname *//

					this.inputModel[index].error =  validateNickname(this.inputModel[index].value);

				} else if (index == 2) { //* confirm new password *//

					this.inputModel[index].error = "";
					
					this.checkIfUsernameExist(index);
				}
			
			}

		},

		inputFocus(index){

			Vue.set(this.input, index, true);

		},

		checkIfUsernameExist(index){

			var self = this;
			this.usernameStatus = "loading";

			axios.post( '../php/api/checkIfUsernameExist.php',{
        
		        username : this.inputModel[index].value
		        
		    }).then(function(response){


		        console.log(response.data);
		        if(response.data.status = "SUCCESS"){

		        	if(response.data.message > 0){
		        		self.inputModel[index].error =  "Username already exist.";
		        		self.usernameStatus = "match";
		        	} else {
		        		self.usernameStatus = "nomatch";
		        	}
		        }


		    })
		    .catch(function(error){
		        alert(error);
		    });

		},

		registerUser(){

			var self = this;
			this.disableButton = true;

			if(this.inputModel[0].error == "" && this.inputModel[1].error == "" && this.inputModel[2].error == ""){

				this.showSuccess = true;
				this.successMessage = "Saving data requirements";

				
				axios.post('../php/api/saveUser.php', {

	                fullname : this.inputModel[0].value,
	                nickname : this.inputModel[1].value,
	                username : this.inputModel[2].value,
	                isDentist : this.isDentist == false ? 0 : 1

	            })
	            .then(function (response){
	            	console.log(response);
	            	if(response.data.status == "SUCCESS"){

	            		if(response.data.message != 0){ 

	            			self.messageLoading = false;
	            			self.successMessage = "Congrats! You can now access the system. Use 'ampongdental' as password.";
	            		}
	            	} 

	            })
	            .catch(function (error) {
	                alert(error);
	            });

			}

		},

		closeSuccessModal(){
			this.showSuccess = false;
			this.disableButton = false;
			window.location.replace("login.html");
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


function validateFullName(data){

	let retVal = "";

	if(data != ""){
		if (! /^[a-zA-ZÑñ0-9\-\s]+$/.test(data)) {
			retVal = 'Found invalid character...';
		}
	} else {
		retVal = 'Please provide your full name.';
	}

	return retVal;

}

function validateNickname(data){

	let retVal = "";
	
	if(data != ""){
		if (! /^[a-zA-ZÑñ0-9\-\s]+$/.test(data)) {
			retVal = 'Found invalid character...';
		}
	} else {
		retVal = 'Please provide your full name.';
	}

	return retVal;

}