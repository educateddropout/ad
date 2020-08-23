Vue.component('updatePersonalInformationModal', {
	props: [],
	template: `

		<div class="modal" :class="{ 'is-active' : openModalPatientInformationUpdate }">
		    <div class="modal-background"></div>
		    <div class="modal-card">
		        <header class="modal-card-head w3-hide-small">
		        <p class="modal-card-title">Update Patient Personal Information</p>
		        <button class="delete" aria-label="close"  @click="openModalPatientInformationUpdate = false"></button>
		        </header>
		        <div class="w3-row w3-hide-large w3-hide-medium">
		            <button class="delete w3-red" aria-label="close"  @click="openModalPatientInformationUpdate = false"></button>
		        </div>
		        <section class="modal-card-body">

		            <div class="content">
		                <div class="w3-hide-large w3-hide-medium">
		                    <div class="w3-row">
		                        <strong>Update Patient Personal Information</strong>

		                    </div>
		                    <hr>
		                </div>

		                <div class="row w3-center has-text-success">
		                   
		                </div>

		                <br>

		                <div class="w3-row">
		                    <div class="w3-row-padding">
		                        <strong>Name</strong>
		                    </div>
		                    <div class="w3-row">
		                        <div class="w3-col l4 w3-padding-small">
		                            <input class="input" :class="{ 'is-danger': first_name_validation_message != '' }" type="text" id="first_name" v-model="patientInfo.first_name" placeholder="First Name" maxlength="60" @keyup="patientInfo.first_name = patientInfo.first_name.toUpperCase()">
		                            <p class="help has-text-danger">{{first_name_validation_message}}</p>
		                        </div>
		                        <div class="w3-col l4  w3-padding-small">
		                            <input class="input" type="text" v-model="patientInfo.middle_name" placeholder="Middle Name" maxlength="60" @keyup="patientInfo.middle_name = patientInfo.middle_name.toUpperCase()">
		                        </div>
		                        <div class="w3-col l4  w3-padding-small">
		                            <input class="input" :class="{ 'is-danger': last_name_validation_message != '' }" type="text" id="last_name" v-model="patientInfo.last_name" placeholder="Last Name" maxlength="60" @keyup="patientInfo.last_name = patientInfo.last_name.toUpperCase()">
		                            <p class="help has-text-danger">{{last_name_validation_message}}</p>
		                        </div>
		                    </div>
		                </div>
		                
		                <br>
		                <div class="w3-row">
		                    <div class="w3-row-padding">
		                        <strong>Sex</strong>
		                    </div>
		                    <div class="w3-row-padding">
		                        <input class="w3-radio" type="radio"  name="sex" value ="1" v-model="patientInfo.sex">
		                        <label>Male</label>

		                        <input class="w3-radio" type="radio"  name="sex" value ="2" v-model="patientInfo.sex">
		                        <label>Female</label>

		                    </div>
		                </div>

		                <br>
		                <div class="w3-row">
		                    <div class="w3-row-padding">
		                        <strong>Date of Birth</strong>
		                    </div>
		                    <div class="w3-row-padding">
		                        <input class="input" type="date" v-model="patientInfo.date_of_birth" id="birthdate" :class="{ 'is-danger': birthdate_validation_message != '' }">
		                        <p class="help has-text-danger">{{birthdate_validation_message}}</p>
		                    </div>
		                </div>

		                <br>
		                <div class="w3-row">
		                    <div class="w3-row-padding">
		                        <strong>Mobile Number</strong>
		                    </div>
		                    <div class="w3-row-padding">
		                        <div class="field is-horizontal">
		                            <div class="field-body">
		                                <div class="field is-expanded">
		                                    <div class="field has-addons ">
		                                        <span class="control">
		                                            <a class="button is-static">
		                                            +63
		                                            </a>
		                                        </span>
		                                        <span class="control is-expanded" >
		                                            <input class="input" :class="{ 'is-danger': mobile_no_validation_message != '' }" type="tel" placeholder="Your phone number" maxlength="10" id="mobile_no" v-model="patientInfo.mobile_no">
		                                            
		                                        </span>

		                                    </div>
		                                    <p class="help has-text-danger">{{mobile_no_validation_message}}</p>
		                                </div>
		                            </div>
		                        </div>
		                    </div>
		                </div>
						
						<br>
		                <div class="w3-row">
		                    <div class="w3-row-padding">
		                        <strong>Email Address</strong>
		                    </div>
		                    <div class="w3-row-padding">
		                        <input class="input" type="email" v-model="patientInfo.email_address">
		                    </div>
		                </div>

		                <br>
		                <div class="w3-row">
		                    <div class="w3-row-padding">
		                        <strong>Address</strong>
		                    </div>
		                    <div class="w3-row-padding">
		                        <textarea class="textarea" id="address" v-model="patientInfo.address" rows="2" @keyup="patientInfo.address = patientInfo.address.toUpperCase()" :class="{ 'is-danger': address_validation_message != '' }"></textarea>
		                        <p class="help has-text-danger">{{address_validation_message}}</p>
		                    </div>
		                </div>
		                
		                <br>
		                <div class="w3-row">
		                    <div class="w3-row-padding">
		                        <strong>Occupation</strong>
		                    </div>
		                    <div class="w3-row-padding">
		                        <input class="input" type="text" v-model="patientInfo.occupation" maxlength="60" @keyup="patientInfo.occupation = patientInfo.occupation.toUpperCase()">
		                    </div>
		                </div>

		                <br>
		                <div class="w3-row">
		                    <div class="w3-row-padding">
		                        <strong>Dental Insurance</strong>
		                    </div>
		                    <div class="w3-row-padding">
		                        <input class="w3-radio" type="radio"  name="dental_insurance" value ="1" v-model="patientInfo.dental_insurance">
		                        <label>Yes</label>

		                        <input class="w3-radio" type="radio"  name="dental_insurance" value ="2" v-model="patientInfo.dental_insurance">
		                        <label>No</label>

		                        <input class="w3-radio" type="radio"  name="dental_insurance" value ="-1" v-model="patientInfo.dental_insurance">
		                        <label>No Answer</label>

		                    </div>
		                </div>

		                <br>
		                <div class="w3-row">
		                    <div class="w3-row-padding">
		                        <strong>How did you know AmpongDental?</strong>
		                    </div>
		                    <div class="w3-row-padding">
		                        <div class="select is-fullwidth">
		                            <select v-model="patientInfo.referred_by" >
		                                <option value="-1" disabled>Please select</option>
		                                <option value="1" >FACEBOOK</option>
		                                <option value="2" >TWITTER</option>
		                                <option value="3" >INSTAGRAM</option>
		                                <option value="4" >FRIENDS</option>
		                                <option value="5" >N/A</option>
		                                </option>
		                            </select>
		                        </div>
		                    </div>
		                </div>

		                <br>
		                <div class="w3-row">
		                    <div class="w3-row-padding">
		                        <strong>What is your reason for dental consultation?</strong>
		                    </div>
		                    <div class="w3-row-padding">
		                        <input class="input" type="text" v-model="patientInfo.reason" @keyup="patientInfo.reason = patientInfo.reason.toUpperCase()">
		                    </div>
		                </div>
		                
		                <br>
		                <div class="w3-row-padding ">
		                    <button class="button is-success is-outlined w3-right" @click="updatePersonalInformation()"><i class="fas fa-pen"></i>&nbsp Update Personal Information</button>
		                </div>

		            </div>
		        </section>
		    </div>
		</div>

	`,

	data () {
		return {

			openModalPatientInformationUpdate : false,
			patientId : "",
			patientInfo : [],
			first_name_validation_message : "",
			last_name_validation_message : "",
			birthdate_validation_message : "",
			mobile_no_validation_message : "",
			address_validation_message : "",

		}
	},

	methods : {

		copyPatientInformationToUpdateModal(patientInfo, openModalCounter, patientId){

			this.openModalPatientInformationUpdate = openModalCounter;
			this.patientInfo = JSON.parse(JSON.stringify(patientInfo));
			this.patientId = patientId;

		},

		updatePersonalInformation(){
			
			let self = this;

			this.first_name_validation_message = validateFirstName(this.patientInfo.first_name);
			this.last_name_validation_message = validateLastName(this.patientInfo.last_name);
			this.mobile_no_validation_message =  validateMobileNumber(this.patientInfo.mobile_no);
			this.birthdate_validation_message = validateBirthday(this.patientInfo.date_of_birth);
			this.address_validation_message = validateAddress(this.patientInfo.address);

			if(this.first_name_validation_message == "" && this.last_name_validation_message == "" && 
				this.birthdate_validation_message == "" && this.address_validation_message == "" && 
				this.mobile_no_validation_message == ""){
				
				axios.post('../php/api/updatePersonalInformation.php',{
					
					patient_id : this.patientId,
					first_name : this.patientInfo.first_name,
					middle_name: this.patientInfo.middle_name,
					last_name : this.patientInfo.last_name,
					sex : this.patientInfo.sex,
					birthdate : this.patientInfo.date_of_birth,
					mobile_no: this.patientInfo.mobile_no,
					email_address : this.patientInfo.email_address,
					address : this.patientInfo.address,
					occupation : this.patientInfo.occupation,
					dental_insurance : this.patientInfo.dental_insurance,
					referral : this.patientInfo.referred_by,
					reason_for_dental : this.patientInfo.reason
					
				})
				.then(function (response){
					
					console.log(response.data);
					alert("Successfully updated patient information");

					self.openModalPatientInformationUpdate = false;

					self.$emit('update-patient-details');

					//window.location.replace("patient-personal-information.php?id=" + pi.urlData);
					
				})
				.catch(function (error) {
					console.log(error);
				});
			}
			else{
 
				if(this.first_name_validation_message != "") document.getElementById("first_name").focus();
				else if(this.last_name_validation_message != "") document.getElementById("last_name").focus();
				else if(this.birthdate_validation_message != "") document.getElementById("birthdate").focus();
				else if(this.mobile_no_validation_message != "") document.getElementById("mobile_no").focus();
				else if(this.address_validation_message != "") document.getElementById("address").focus();
			}

		}
	}


});

