

var ps = new Vue({

	el: '#pendingPatients',


	data: {
		
		// patients page counter == 2
		pageCounter : 2,
		search : "",
		userData : {
			userd : -1,
			userName : "",
			userType : -1,
			isDentist : -1,
			allowedAccess : 0
		},
		patients : [],
		totalPatientsCount : 0,
		totalPendingCount : 0
	},

	beforeCreate(){

		var self = this;

		// User Authentication
		axios.get('../php/api/userAuthentication.php')
		.then(function (response){
			
			if(response.data.allowedAccess == 0){
				window.location.replace("login.html");
				alert("You're not allowed to access this system");
			} 

			ps.userData.userId = response.data.id;
			ps.userData.userName = response.data.name;
			ps.userData.userType = response.data.userType;
			ps.userData.isDentist = response.data.isDentist;
			ps.userData.allowedAccess = response.data.allowedAccess;


		})
		.catch(function (error) {
			alert(error);
		});

		
		
		

	},

	mounted(){

		this.getListOfPendingPatients();
	},

	methods: {

		getListOfPendingPatients(){

			var self = this;

			// Get List of Pending Patients
			axios.get('../php/api/listOfPendingPatients.php')
			.then(function (response){

				self.patients = response.data.patients_details;
				self.totalPendingCount = response.data.patients_details.length;
				self.$refs.headerNav.updatePendingPatientInfo(response.data.patients_details.length);
			})
			.catch(function (error) {
				alert(error);
			});

		},

		updateTotalPendingCount(totalPendingCount){

			this.totalPendingCount = totalPendingCount;
		},

		fullName(first, middle, last){

			let name = last.trim() + ", " + first.trim() + " " + middle.trim();

			return name;
		},

		approvedPendingPatient(id){

			let self = this;
			//patient information
			axios.get('../php/api/pendingPatientApproved.php',{
				params: {
					id : id
				}
			})
			.then(function (response){
				console.log(response);
				self.getListOfPendingPatients();
				
			})
			.catch(function (error) {
				alert(error);
			});

		},

		disApprovedPendingPatient(id){

			let self = this;
			//patient information
			axios.get('../php/api/pendingPatientDisApproved.php',{
				params: {
					id : id
				}
			})
			.then(function (response){
				
				self.getListOfPendingPatients();
				
			})
			.catch(function (error) {
				alert(error);
			});

		}


	}

});