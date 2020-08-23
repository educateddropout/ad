

var lg = new Vue({

	el: '#login',


	data: {
		
		username: "",
		password: "",
		loginErrorMessage : "",

		showForgotPasswordMessage : false,
		showForgotPasswordWarningMessage : "Ask the admin to reset your password. Please change password as soon as possible after the reset."
	},

	methods: {

		onSubmit() {

			axios.post('../php/api/loginVerify.php', {
				username: this.username,
				password: this.password
			})
			.then(function (response){

				console.log(response);

				if(response.data.success == false){

					lg.loginErrorMessage = "Please check your username or password";
					
				}
				else window.location.replace("dashboard.html");
			})
			.catch(function (error) {
				alert(error);
			});


		},

		closeForgotPasswordMessage(){
			this.showForgotPasswordMessage = false;
		},

		openForgotPasswordMessage(){
			this.showForgotPasswordMessage = true;
		}
	}

});