

var tr = new Vue({

	el: '#treatmentRecords',


	data: {
		
		// personalinfo == 1
		// patients page counter == 2
		pageCounter : 3,
		userData : {
			userId : -1,
			userName : "",
			userType : -1,
			isDentist : -1,
			allowedAccess : 0
		},
		dentistsLibrary : [],
		dentistCheck: {
			id : []
		}

	},

	created(){
		let self = this;
		//list of dentist
		axios.get('../php/api/listOfDentist.php')
		.then(function (response){
			console.log(response.data);
			self.dentistsLibrary = response.data.list_of_dentists;

			for(let i = 0; i < response.data.list_of_dentists.length; i++){
				self.dentistCheck.id[i] = true;
			}

		})
		.catch(function (error) {
			alert(error);
		});

	},

	methods: {

		copyUserData(userData){

			this.userData = userData;
			this.$refs.dateSelection.fetchInitialData(userData.userType, userData.userId);
			
		},

		sendListOfTreatments(treatmentsLibrary,selectedDateLabel){

			this.$refs.treatmentsTable.copyListOfTreatments(treatmentsLibrary,selectedDateLabel);

		}

	}

});