

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
		}
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