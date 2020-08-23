Vue.component('personalInformation', {
	props: ['patientInfo','patientId'],
	template: `
		
		<div class="w3-row box is-marginless">

			<div class="w3-col l3 w3-right">
                <div class="w3-row w3-center">

                    <div class="file-upload-form">
                        <input type="file" id="file" ref="file" single v-on:change="handleFileUpload()" />
                    </div>
                    
                    <div v-if="profilePicture != '' ">
                        <img  :src="profilePicture" class="w3-image" width="200" height="200" >
                    </div>
                    <div v-else="">
                    	<div v-if="patientInfo.sex == 2">
                        	<img  src="../assets/images/avatar.jpg" alt="Lights" class="w3-image" width="200" height="200" >
                    	</div>
                    	<div v-else="">
                        	<img  src="../assets/images/male_avatar.png" alt="Lights" class="w3-image" width="200" height="200" >
                    	</div>
                    </div>

                </div>
                <br>
                <div class="w3-row w3-center" v-if="true">

                    <button class="button is-outlined is-info" @click="changeProfilePicture()">Change Profile</button>&nbsp&nbsp
                    <button class="button is-outlined is-info" @click="submitProfilePicture()">Submit</button>

                </div>
                <div class="w3-row w3-center" v-if="file != ''">
                    <li>{{ file.name }} </li>
                </div>
                <br>      
            </div>

            <div class="w3-col l9">

                <div class="row">
                   <span class="is-size-4">
                        <strong>
                            {{patientInfo.last_name}}, {{patientInfo.first_name}} {{patientInfo.middle_name}}|
                            <span class="is-size-3" v-if="patientInfo.sex == 1">
                                <i class="fas fa-male w3-text-blue"></i>
                            </span>
                            <span class="is-size-3 w3-text-pink" v-if="patientInfo.sex == 2">
                                <i class="fas fa-female"></i>
                            </span>
                        </strong>
                    </span>
                    
                </div>
                <div class="row">
                    <span class="is-size-6"> {{ getAge(patientInfo.date_of_birth) }} years old | {{formattedNumber}} | </span> <span class="has-text-info">{{patientInfo.email_address}}</span>
                </div>
                <div class="row">
                    <span class="is-size-6"><i class="fas fa-map-marker-alt"></i><em> {{patientInfo.address}}</em></span>
                </div>
                <br>
                <br>
                <br>
                <div class="row">
                    <span class="is-size-6"><strong>Occupation: </strong>{{patientInfo.occupation}}</span>
                </div>
                <div class="row" v-if="patientInfo.dental_insurance == 1">
                    <span class="is-size-6"><strong>Dental Insurance: </strong>{{patientInfo.dental_insurance_name}} | {{patientInfo.dental_insurance_validity}}</span>
                </div>
                <br>
                <br>
                
                <div class="row">
                    <button class="button is-info is-outlined w3-hide-small" @click="openPatientInformationUpdateModal()"><i class="fas fa-pen"></i> &nbsp|Update Patient Personal Information</button>
                    <button class="button is-info is-outlined w3-hide-medium w3-hide-large" @click="openPatientInformationUpdateModal()"><i class="fas fa-pen"></i> &nbsp|&nbspUpdate</button>
                </div>

            </div>
			
			<update-personal-information-modal
				ref = "updatePersonalInformationModal"
				@update-patient-details = "updatePatientDetails"
			></update-personal-information-modal>

		</div>

	`,

	data() {

		return {


			file: "",
			profilePicture : ""
		
		}

	},

	created(){

		this.fetchProfilePicture();

	},

	methods : {

		updatePatientDetails(){

			this.$emit('update-patient-details');

		},

		openPatientInformationUpdateModal(){

			this.$refs.updatePersonalInformationModal.copyPatientInformationToUpdateModal(this.patientInfo, true, this.patientId);
		},

		fetchProfilePicture(){

			let self = this;

			//Patient Dental Images
			axios.get('../php/api/patientProfilePicture.php',{
				params: {
					id : this.patientId
				}
			})
			.then(function (response){
				
				console.log(response.data);
				if(response.data.profilePicture.length > 0) self.profilePicture = response.data.profilePicture[0].file_directory;
				
			})
			.catch(function (error) {
				alert(error);
			});

		},

		handleFileUpload(){
			
			this.file = this.$refs.file.files[0];
		},

		changeProfilePicture(){

			this.$refs.file.click();

		},

		submitProfilePicture(){

			let self = this;
			
			if(this.file != ""){
				/*
	                Initialize the form data
	            */
	            let formData = new FormData();

	            /*
	                Add the form data we need to submit
	            */
	            formData.append('file', this.file);
	            formData.append('patient_id', this.patientId);
	            formData.append('profile_picture', this.profilePicture);
	  
		        /*
		          Make the request to the POST /single-file URL
		        */
	            axios.post( '../php/api/uploadProfilePicture.php',
	                formData,
	                {
	                headers: {
	                    'Content-Type': 'multipart/form-data'
	                }
	              }
	            ).then(function(response){
		        	console.log(response.data);

		        	if(response.data.status === "SUCCESS"){

						alert("Successfully changed profile picture.");

						window.location.replace("patient-personal-information.html?id=" + self.patientId);

					} else {

						alert("Error uploading profile picture. " + response.data.message[0]);
					}

		        })
		        .catch(function(){
		        	console.log('FAILURE!!');
		        });

		    }

		    

		},

		// age getter //
		getAge(date_of_birth){
			var today = new Date();
			var birthDate = new Date(date_of_birth);
			var age = today.getFullYear() - birthDate.getFullYear();
			var m = today.getMonth() - birthDate.getMonth();
			if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
				age--;
			}

			return age;
		},

	},

	computed: {

		formattedNumber(){
			return (typeof this.patientInfo.mobile_no === 'undefined' ? "" : "(+63)" + this.patientInfo.mobile_no.substring(0,3) + " " + this.patientInfo.mobile_no.substring(3,11));
		}
	}




});

