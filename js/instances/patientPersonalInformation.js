

var pps = new Vue({

	el: '#patientPersonalInformation',


	data: {
		
		// personalinfo == 1
		currentTab : 1,
		// patients page counter == 2
		pageCounter : 2,
		userData : {
			userd : -1,
			userName : "",
			userType : -1,
			isDentist : -1,
			allowedAccess : 0
		},
		patientId : "",
		noSignatureImg : "../php/api/uploads/patient/No_Signature.jpg",
		isUpdateSignatureModalActive : false,

		showArchiveConfirmation : false,
		archiveConfirmationMessage : 'This will permenantly remove the profile.. Are you sure you want to archive this patient record?'
	},

	created(){

		this.patientId = getUrlParameters("id");

	},

	methods: {

		copyUserData(userData){
			this.userData = userData;
		},

		imageUrlAlt(event) {
		    event.target.src = this.noSignatureImg;
		},

		openPatientUpdateSignatureModal(){

			this.isUpdateSignatureModalActive = true;

		},

		closePatientUpdateSignatureModal(){
			this.isUpdateSignatureModalActive = false;
		},

		refreshPage(){

			window.location.replace("patient-personal-information.html?id=" + self.patientId);
			
		},

		openArchiveConfirmation(){
			this.showArchiveConfirmation = true;
		},

		closeArchiveConfirmation(){
			this.showArchiveConfirmation = false;
		},

		archivePatientProfile(){

			let self = this;

			axios.post( '../php/api/archivePatientProfile.php',{

				patient_id : this.patientId

			}).then(function(response){

				if(response.data.status == "SUCCESS") window.location.replace("patients.html");
				else {
					alert("Error archiving patient profile");
				}

			})
			.catch(function(){
				console.log('FAILURE!!');
			});

		}


	},

	computed: {

		signatureImg(){

			return "../php/api/uploads/patient/"+this.patientId+"_signature.png";

		}

	}

});

function getUrlParameters(parameterName){

	var url_string = window.location.href;
	var url = new URL(url_string);
	var data = url.searchParams.get(parameterName);

	
	return data;
}