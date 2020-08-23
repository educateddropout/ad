Vue.component('patientPersonalInformationDiv', {
	props: [],
	template: `
		<div class="w3-row ">
			<div class="w3-col l1">&nbsp</div>
			<div class="w3-col l10">
				
				<personal-information
					:patientInfo = "patientInfo"
					:patient-id="patientId"
					@update-patient-details = "updatePatientDetails"
				></personal-information>
				<br>
				<medical-history-information
					:patientInfo = "patientInfo"
					:patient-id="patientId"
					@update-patient-medical-history = "updatePatientDetails"
				></medical-history-information>

			</div>
			<div class="w3-col l1">&nbsp</div>
        </div>

	`,

	data() {

		return {

			patientId : "",
			patientInfo : {},
			file: "",
			profilePicture : [],
		
		}

	},

	created() {

		this.patientId = getUrlParameters("id");
		

	},

	beforeMount(){

		this.fetchPatientDetails();

	},

	methods : {

		updatePatientDetails(){

			this.fetchPatientDetails();

		},

		fetchPatientDetails(){

			let self = this;
			//patient information
			axios.get('../php/api/patientInfoAll.php',{
				params: {
					id : this.patientId
				}
			})
			.then(function (response){
				
				self.patientInfo = response.data.patients_details[0];
				//console.log(response.data.patients_details[0]);

			})
			.catch(function (error) {
				alert(error);
			});

		}

	}


});

