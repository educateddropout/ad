

var pps = new Vue({

	el: '#patientDentalPictures',

	data: {
		
		// personalinfo == 1
		currentTab : 5,
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
		pdfFileName : { value : "", error : ""},

		dentalFiles : [],

		selectedSlide : 0,

		isOpenTeethViewer : false,
		showDeleteWarningMessage : false,
		deletedMessage : "This will be deleted permanently. Are you sure you want to continue?",

		fileToDeleteId : "",
		fileToDeleteDirectory : ""

	},

	created(){

		this.patientId = getUrlParameters("id");
		this.fetchPatientDentalOtherInfo();

	},

	computed: {
		caption(){
			let retVal = "";

			if(this.dentalImages.length > 0) retVal = this.dentalImages[this.selectedSlide].date_taken;

			return retVal;
		}
	},

	methods: {

		deletePdf(){

			let self = this;

			axios.post( '../php/api/deleteDentalOtherInfo.php',{
				fileId : this.fileToDeleteId,
				fileDirectory : this.fileToDeleteDirectory
			})
			.then(function (response){

				console.log(response.data);
				if(response.data.status == "SUCCESS"){

					self.fetchPatientDentalOtherInfo();
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

		fetchPatientDentalOtherInfo(){
			let self = this;

			axios.post( '../php/api/getPatientDentalOtherInfo.php',{
				patient_id : this.patientId
			})
			.then(function (response){

				if(response.data.status == "SUCCESS"){

					self.dentalFiles = response.data.message;

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

	            this.pdfFileName.error = validatePdfFileName(this.pdfFileName.value);

	            /*
	                Add the form data we need to submit
	            */
	            formData.append('file', this.file);
	            formData.append('patient_id', this.patientId);
	            formData.append('dental_picture', this.profilePicture);
	            formData.append('pdfFileName', this.pdfFileName.value);
	  			

	  			if(this.pdfFileName.error == ""){
			        /*
			          Make the request to the POST /single-file URL
			        */
		            axios.post( '../php/api/uploadDentalOtherInfo.php',
		                formData,
		                {
		                headers: {
		                    'Content-Type': 'multipart/form-data'
		                }
		              }
		            ).then(function(response){
			        	console.log(response.data);

			        	if(response.data.status === "SUCCESS"){

							alert("Successfully added pdf file.");
							//self.fetchPatientDentalOtherInfo();
							window.location.replace("patient-dental-other-info.html?id=" + self.patientId);

						} else {

							alert("Error uploading pdf file. " + response.data.message[0]);
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

		goToPdf(directory){
			
			window.open(directory, '_blank');
		}

	}

});

function validatePdfFileName(pdfFileName){
	let retVal = "";

	if(pdfFileName.trim() == ""){
		retVal = "Please provide Description."
	}

	return retVal;
}