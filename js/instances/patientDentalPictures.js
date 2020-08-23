

var pps = new Vue({

	el: '#patientDentalPictures',

	data: {
		
		// personalinfo == 1
		currentTab : 4,
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
		file: "",
		dentalPicture : "",
		dateTaken : { value : "", error : ""},

		dentalImages : [],

		selectedSlide : 0,

		isOpenTeethViewer : false,
		showDeleteWarningMessage : false,
		deletedMessage : "This will be deleted permanently. Are you sure you want to continue?",

		fileToDeleteId : "",
		fileToDeleteDirectory : ""

	},

	created(){

	this.patientId = getUrlParameters("id");

		this.fetchPatientDentalRecords();

	},

	computed: {
		caption(){
			let retVal = "";

			if(this.dentalImages.length > 0) retVal = this.dentalImages[this.selectedSlide].date_taken;

			return retVal;
		}
	},

	methods: {

	deleteImage(){

			let self = this;

			axios.post( '../php/api/deleteDentalImage.php',{
				fileId : this.fileToDeleteId,
				fileDirectory : this.fileToDeleteDirectory
			})
			.then(function (response){

				console.log(response.data);
				if(response.data.status == "SUCCESS"){

					self.fetchPatientDentalRecords();
					self.showDeleteWarningMessage = false;

				} else {
					console.log(response.data.message.errorInfo);
				}

			})
			.catch(function (error) {
				alert(error);
			});

		},

		closeDeleteWarningMessage(){
			this.showDeleteWarningMessage = false;
		},

		deleteFile(id, fileDirectory){
			
			this.fileToDeleteId = id;
			this.fileToDeleteDirectory = fileDirectory;
			this.showDeleteWarningMessage = true;
			

		},

		copyUserData(userData){
			this.userData = userData;
		},

		fetchPatientDentalRecords(){
			let self = this;

			axios.post( '../php/api/getPatientDentalImages.php',{
				patient_id : this.patientId
			})
			.then(function (response){

				if(response.data.status == "SUCCESS"){

					self.dentalImages = response.data.message;

					// displays the most recent dental records
					//self.teethObject = populateTeethData(response.data.message[0]);
					/*if(response.data.message.length > 0){
						self.selectRecord(response.data.message[0].id);
					}*/

				} else {
					console.log(response.data.message.errorInfo);
				}

			})
			.catch(function (error) {
				alert(error);
			});

		},


		changeDentalPicture(){

			this.$refs.file.click();

		},

		handleFileUpload(){
			this.file = this.$refs.file.files[0];

		},

		submitDentalPicture(){

			let self = this;

			if(this.file != ""){
				/*
	                Initialize the form data
	            */
	            let formData = new FormData();

	            this.dateTaken.error = validateDateTaken(this.dateTaken.value);

	            /*
	                Add the form data we need to submit
	            */
	            formData.append('file', this.file);
	            formData.append('patient_id', this.patientId);
	            formData.append('dental_picture', this.profilePicture);
	            formData.append('date_taken', this.dateTaken.value);
	  
	  			if(this.dateTaken.error == ""){

			        /*
			          Make the request to the POST /single-file URL
			        */
		            axios.post( '../php/api/uploadDentalPictures.php',
		                formData,
		                {
		                headers: {
		                    'Content-Type': 'multipart/form-data'
		                }
		              }
		            ).then(function(response){
			        	console.log(response.data);

			        	if(response.data.status === "SUCCESS"){

							alert("Successfully added dental picture.");

							window.location.replace("patient-dental-pictures.html?id=" + self.patientId);

						} else {

							alert("Error uploading dental picture. " + response.data.message[0]);
						}

			        })
			        .catch(function(){
			        	console.log('FAILURE!!');
			        });
			    }

		    }
		},

		changeDisplay(index){

			this.selectedSlide = index;

		},

		deductSelectedSlide(){

			if(this.selectedSlide > 0) this.selectedSlide--;
		},

		addSelectedSlide(){

			if(this.selectedSlide < this.dentalImages.length) this.selectedSlide++;
		},

		closeTeethViewer(){
			
			this.isOpenTeethViewer = false;
		},

		openTeethViewer(index){

			this.isOpenTeethViewer = true;
			this.selectedSlide = index;
		}

	}

});

function validateDateTaken(date){
	let retVal = "";

	if(date == ""){
		retVal = "Please provide date taken."
	}

	return retVal;
}