Vue.component('updateMedicalHistoryInformationModal', {
	props: [],
	template: `

		<div class="modal" :class="{ 'is-active' : openModalMedicalHistoryInformationUpdate }">
		    <div class="modal-background"></div>
		    <div class="modal-card">
		        <header class="modal-card-head w3-hide-small">
		        <p class="modal-card-title">Update Medical History</p>
		        <button class="delete" aria-label="close"  @click="openModalMedicalHistoryInformationUpdate = false"></button>
		        </header>
		        <div class="w3-row w3-hide-large w3-hide-medium">
		            <button class="delete w3-red" aria-label="close"  @click="openModalMedicalHistoryInformationUpdate = false"></button>
		        </div>
		        <section class="modal-card-body">

		            <div class="content">
		                <div class="w3-hide-large w3-hide-medium">
		                    <div class="w3-row">
		                        <strong>Update Medical History</strong>

		                    </div>
		                    <hr>
		                </div>

		                <div class="row w3-center has-text-success">
		                   
		                </div>

		                <br>

		                <div class="w3-row">
		                    <div class="w3-row-padding">
		                        <strong>Physician Name</strong>
		                    </div>
		                    <div class="w3-row">
		                        <input class="input" type="text" v-model="physician_name" placeholder="Physician Name" maxlength="120" @keyup="physician_name = physician_name.toUpperCase()">
		                    </div>
		                </div>
		                
		                <br>
		                <div class="w3-row">
		                    <div class="w3-row-padding">
		                        <strong>Physician Specialty</strong>
		                    </div>
		                    <div class="w3-row">
		                        <input class="input" type="text" v-model="physician_specialty" placeholder="Specialty" maxlength="60" @keyup="physician_specialty = physician_specialty.toUpperCase()">
		                    </div>
		                </div>
		                
		                <br>
		                <div class="w3-row">
		                    <div class="w3-row-padding">
		                        <strong>Physician Office Address</strong>
		                    </div>
		                    <div class="w3-row">
		                        <input class="input" type="text" v-model="physician_address" placeholder="Office Address" maxlength="80" @keyup="physician_address = physician_address.toUpperCase()">
		                    </div>
		                </div>
		                
		                <br>
		                <div class="w3-row">
		                    <div class="w3-row-padding">
		                        <strong>Physician Office Number</strong>
		                    </div>
		                    <div class="w3-row">
		                        <input class="input" type="text" :class="{ 'is-danger': physician_number_validation_message != '' }" id="physician_number" v-model="physician_number" placeholder="Office Number" maxlength="11">
		                        <p class="help has-text-danger">{{physician_number_validation_message}}</p>
		                    </div>
		                </div>

		                <br>
		                <div class="w3-row">
		                    <div class="w3-row-padding">
		                        <strong>1. Are you in good health?</strong>
		                    </div>
		                    <div class="w3-row-padding">
		                        <input class="w3-radio" type="radio"  name="q1" value ="1" v-model="q1">
		                        <label>Yes</label>

		                        <input class="w3-radio" type="radio"  name="q1" value ="2" v-model="q1">
		                        <label>No</label>

		                        <input class="w3-radio" type="radio"  name="q1" value ="-1" v-model="q1">
		                        <label>No Answer</label>
		                    </div>
		                </div>

		                <br>
		                <div class="w3-row">
		                    <div class="w3-row-padding">
		                        <strong>2. Are you under medical treatment now?</strong>
		                    </div>
		                    <div class="w3-row-padding">
		                        <input class="w3-radio" type="radio"  name="q2" value ="1" v-model="q2">
		                        <label>Yes</label>

		                        <input class="w3-radio" type="radio"  name="q2" value ="2" v-model="q2" @click="q2_2 = ''">
		                        <label>No</label>

		                        <input class="w3-radio" type="radio" value ="-1" v-model="q2" @click="q2_2 = ''">
		                        <label>No Answer</label>
		                    </div>
		                    <br>
		                    <div class="w3-row-padding">
		                        <div class="w3-half">
		                            What is the condition being treated?
		                        </div>
		                        <div class="w3-half">
		                            <input type="text" class="input" v-model="q2_2" maxlength="60" :disabled="q2 != 1"  @keyup="q2_2 = q2_2.toUpperCase()">
		                        </div>
		                    </div>
		                </div>

		                <br>
		                <div class="w3-row">
		                    <div class="w3-row-padding">
		                        <strong>3. Have you ever had serious illness or surgical operation?</strong>
		                    </div>
		                    <div class="w3-row-padding">
		                        <input class="w3-radio" type="radio"  name="q3" value ="1" v-model="q3">
		                        <label>Yes</label>

		                        <input class="w3-radio" type="radio"  name="q3" value ="2" v-model="q3" @click="q3_2 = ''">
		                        <label>No</label>

		                        <input class="w3-radio" type="radio"  name="q3" value ="-1" v-model="q3" @click="q3_2 = ''">
		                        <label>No Answer</label>
		                    </div>
		                    <br>
		                    <div class="w3-row-padding">
		                        <div class="w3-half">
		                            What illness or operation?
		                        </div>
		                        <div class="w3-half">
		                            <input type="text" class="input" v-model="q3_2" maxlength="60" :disabled="q3 != 1"  @keyup="q3_2 = q3_2.toUpperCase()">
		                        </div>
		                    </div>
		                </div>

		                <br>
		                <div class="w3-row">
		                    <div class="w3-row-padding">
		                        <strong>4. Have you ever been hospitalized?</strong>
		                    </div>
		                    <div class="w3-row-padding">
		                        <input class="w3-radio" type="radio"  name="q4" value ="1" v-model="q4">
		                        <label>Yes</label>

		                        <input class="w3-radio" type="radio"  name="q4" value ="2" v-model="q4" @click="q4_2 = ''">
		                        <label>No</label>

		                        <input class="w3-radio" type="radio"  name="q4" value ="-1" v-model="q4" @click="q4_2 = ''">
		                        <label>No Answer</label>
		                    </div>
		                    <br>
		                    <div class="w3-row-padding">
		                        <div class="w3-half">
		                            When and why?
		                        </div>
		                        <div class="w3-half">
		                            <input type="text" class="input" v-model="q4_2" maxlength="60" :disabled="q4 != 1"  @keyup="q4_2 = q4_2.toUpperCase()">
		                        </div>
		                    </div>
		                </div>
		                
		                <br>
		                <div class="w3-row">
		                    <div class="w3-row-padding">
		                        <strong>5. Are you taking prescription/non-prescription medication?</strong>
		                    </div>
		                    <div class="w3-row-padding">
		                        <input class="w3-radio" type="radio"  name="q5" value ="1" v-model="q5">
		                        <label>Yes</label>

		                        <input class="w3-radio" type="radio"  name="q5" value ="2" v-model="q5" @click="q5_2 = ''">
		                        <label>No</label>

		                        <input class="w3-radio" type="radio"  name="q5" value ="-1" v-model="q5" @click="q5_2 = ''">
		                        <label>No Answer</label>
		                    </div>
		                    <br>
		                    <div class="w3-row-padding">
		                        <div class="w3-half">
		                            When and why?
		                        </div>
		                        <div class="w3-half">
		                            <input type="text" class="input" v-model="q5_2" maxlength="60" :disabled="q5 != 1"  @keyup="q5_2 = q5_2.toUpperCase()">
		                        </div>
		                    </div>
		                </div>

		                <br>
		                <div class="w3-row">
		                    <div class="w3-row-padding">
		                        <strong>6. Do you use tobacco products?</strong>
		                    </div>
		                    <div class="w3-row-padding">
		                        <input class="w3-radio" type="radio"  name="q6" value ="1" v-model="q6">
		                        <label>Yes</label>

		                        <input class="w3-radio" type="radio"  name="q6" value ="2" v-model="q6">
		                        <label>No</label>

		                        <input class="w3-radio" type="radio"  name="q6" value ="-1" v-model="q6">
		                        <label>No Answer</label>
		                    </div>
		                </div>

		                <br>
		                <div class="w3-row">
		                    <div class="w3-row-padding">
		                        <strong>7. Do you use alcohol, coccaine or other dangerous drugs?</strong>
		                    </div>
		                    <div class="w3-row-padding">
		                        <input class="w3-radio" type="radio"  name="q7" value ="1" v-model="q7">
		                        <label>Yes</label>

		                        <input class="w3-radio" type="radio"  name="q7" value ="2" v-model="q7">
		                        <label>No</label>

		                        <input class="w3-radio" type="radio"  name="q7" value ="-1" v-model="q7">
		                        <label>No Answer</label>
		                    </div>
		                </div>

		                <br>
		                <div class="w3-row">
		                    <div class="w3-row-padding">
		                        <strong>8. Are you allergic to any of the following:</strong>
		                    </div>
		                    <div class="w3-row-padding">
		                        <div class="w3-third">
		                            <input class="w3-check" type="checkbox"  name="q8_1" value ="1" v-model="q8_1">
		                            <label>Local Anesthetic</label>
		                        </div>
		                        <div class="w3-third">
		                            <input class="w3-check" type="checkbox"  name="q8_2" value ="2" v-model="q8_2">
		                            <label>Antibiotic</label>
		                        </div>
		                        <div class="w3-third">
		                            <input class="w3-check" type="checkbox"  name="q8_3" value ="-1" v-model="q8_3">
		                            <label>Sulfa Drugs</label>
		                        </div>
		                    </div>
		                    <div class="w3-row-padding">
		                        <div class="w3-third">
		                            <input class="w3-check" type="checkbox"  name="q8_4" value ="1" v-model="q8_4">
		                            <label>Aspirin</label>
		                        </div>
		                        <div class="w3-third">
		                            <input class="w3-check" type="checkbox"  name="q8_5" value ="2" v-model="q8_5">
		                            <label>Latex</label>
		                        </div>
		                    </div>
		                    <br>
		                    <div class="w3-row-padding">
		                        <div class="w3-third">
		                            <input class="w3-check" type="checkbox"  name="q8_6" value ="1" v-model="q8_6" @click="q8_6Other = ''">
		                            <label>Others</label>
		                        </div>
		                        <div class="w3-twothird">
		                            <input type="text" class="input" v-model="q8_6Other" maxlength="60" :disabled="q8_6 != true"  @keyup="q8_6Other = q8_6Other.toUpperCase()">
		                        </div>
		                    </div>
		                </div>

		                <br>
		                <div class="w3-row">
		                    <div class="w3-row-padding">
		                        <strong>9. Bleeding Time</strong>
		                    </div>
		                    <div class="w3-row">
		                        <input class="input" type="text" v-model="q9" maxlength="80" @keyup="q9 = q9.toUpperCase()">
		                    </div>
		                </div>

		                <br>
		                <div class="w3-row">
		                    <div class="w3-row-padding">
		                        <strong>10. For Women Only</strong>
		                    </div>
		                    <br>
		                    <div class="w3-row">
		                        <div class="w3-half">
		                            <div class="w3-row">
		                                <li>Are you pregnant?</li>
		                            </div>
		                        </div>
		                        <div class="w3-half">
		                            <input class="w3-radio" type="radio"  name="q10_1" value ="1" v-model="q10_1">
		                            <label>Yes</label>

		                            <input class="w3-radio" type="radio"  name="q10_1" value ="2" v-model="q10_1">
		                            <label>No</label>

		                            <input class="w3-radio" type="radio"  name="q10_1" value ="-1" v-model="q10_1">
		                            <label>No Answer</label>
		                        </div>
		                    </div>
		                    
		                    <br>
		                    <div class="w3-row">
		                        <div class="w3-half">
		                            <li>Are you nursing?</li>
		                        </div>
		                        <div class="w3-half">
		                            <input class="w3-radio" type="radio"  name="q10_2" value ="1" v-model="q10_2">
		                            <label>Yes</label>

		                            <input class="w3-radio" type="radio"  name="q10_2" value ="2" v-model="q10_2">
		                            <label>No</label>

		                            <input class="w3-radio" type="radio"  name="q10_2" value ="-1" v-model="q10_2">
		                            <label>No Answer</label>
		                        </div>
		                    </div>
		                    
		                    <br>
		                    <div class="w3-row">
		                        <div class="w3-half">
		                            <div class="w3-row">
		                                <li>Are you taking birth control pills?</li>
		                            </div>
		                        </div>
		                        <div class="w3-half">
		                            <input class="w3-radio" type="radio"  name="q10_3" value ="1" v-model="q10_3">
		                            <label>Yes</label>

		                            <input class="w3-radio" type="radio"  name="q10_3" value ="2" v-model="q10_3">
		                            <label>No</label>

		                            <input class="w3-radio" type="radio"  name="q10_3" value ="-1" v-model="q10_3">
		                            <label>No Answer</label>
		                        </div>
		                    </div>
		                </div>



		                <br>
		                <div class="w3-row">
		                    <div class="w3-row-padding">
		                        <strong>11.Blood Type</strong>
		                    </div>
		                    <div class="w3-row">
		                        <input class="input" type="text" v-model="q11" maxlength="60" @keyup="q11 = q11.toUpperCase()">
		                    </div>
		                </div>

		                <br>
		                <div class="w3-row">
		                    <div class="w3-row-padding">
		                        <strong>12. Blood Pressure</strong>
		                    </div>
		                    <div class="w3-row">
		                        <input class="input" type="text" v-model="q12" maxlength="60" @keyup="q12 = q12.toUpperCase()">
		                    </div>
		                </div>

		                <br>
		                <div class="w3-row">
		                    <div class="w3-row-padding">
		                        <strong>8. Are you allergic to any of the following:</strong>
		                    </div>
		                    <div class="w3-row-padding">
		                        <div class="w3-third">
		                            <input class="w3-check" type="checkbox"  name="q13_1" value ="1" v-model="q13_1">
		                            <label>High Blood Pressure</label>
		                        </div>
		                        <div class="w3-third">
		                            <input class="w3-check" type="checkbox"  name="q13_2" value ="2" v-model="q13_2">
		                            <label>Heart Disease</label>
		                        </div>
		                        <div class="w3-third">
		                            <input class="w3-check" type="checkbox"  name="q13_3" value ="-1" v-model="q13_3">
		                            <label>Cancer / Tumors</label>
		                        </div>
		                    </div>
		                    <div class="w3-row-padding">
		                        <div class="w3-third">
		                            <input class="w3-check" type="checkbox"  name="q13_4" value ="1" v-model="q13_4">
		                            <label>Low Blood Pressure</label>
		                        </div>
		                        <div class="w3-third">
		                            <input class="w3-check" type="checkbox"  name="q13_5" value ="2" v-model="q13_5">
		                            <label>Heart Murmur</label>
		                        </div>
		                        <div class="w3-third">
		                            <input class="w3-check" type="checkbox"  name="q13_6" value ="2" v-model="q13_6">
		                            <label>Anemia</label>
		                        </div>
		                    </div>
		                    <div class="w3-row-padding">
		                        <div class="w3-third">
		                            <input class="w3-check" type="checkbox"  name="q13_7" value ="1" v-model="q13_7">
		                            <label>Epilepsy / Convulsion</label>
		                        </div>
		                        <div class="w3-third">
		                            <input class="w3-check" type="checkbox"  name="q13_8" value ="2" v-model="q13_6">
		                            <label>Hepatitis / Liver Disease</label>
		                        </div>
		                        <div class="w3-third">
		                            <input class="w3-check" type="checkbox"  name="q13_9" value ="2" v-model="q13_9">
		                            <label>Angina</label>
		                        </div>
		                    </div>
		                    <div class="w3-row-padding">
		                        <div class="w3-third">
		                            <input class="w3-check" type="checkbox"  name="q13_10" value ="1" v-model="q13_10">
		                            <label>AIDS or HIV Infection</label>
		                        </div>
		                        <div class="w3-third">
		                            <input class="w3-check" type="checkbox"  name="q13_11" value ="2" v-model="q13_11">
		                            <label>Rheumatic Fever</label>
		                        </div>
		                        <div class="w3-third">
		                            <input class="w3-check" type="checkbox"  name="q13_12" value ="2" v-model="q13_12">
		                            <label>Asthma</label>
		                        </div>
		                    </div>
		                    <div class="w3-row-padding">
		                        <div class="w3-third">
		                            <input class="w3-check" type="checkbox"  name="q13_13" value ="1" v-model="q13_13">
		                            <label>Sexually Transmitted Disease</label>
		                        </div>
		                        <div class="w3-third">
		                            <input class="w3-check" type="checkbox"  name="q13_14" value ="2" v-model="q13_14">
		                            <label>Hay Fever / Allergies</label>
		                        </div>
		                        <div class="w3-third">
		                            <input class="w3-check" type="checkbox"  name="q13_15" value ="2" v-model="q13_15">
		                            <label>Emphysema</label>
		                        </div>
		                    </div>
		                    <br>
		                    <div class="w3-row-padding">
		                        <div class="w3-third">
		                            <input class="w3-check" type="checkbox"  name="q13_16" value="1"  v-model="q13_16" @click="q13_16Other = ''">
		                            <label>Others</label>
		                        </div>
		                        <div class="w3-twothird">
		                            <input type="text" class="input" v-model="q13_16Other" maxlength="60" :disabled="q13_16 != true"  @keyup="q13_16Other = q13_16Other.toUpperCase()">
		                        </div>
		                    </div>
		                </div>

		                <br>
		                <div class="w3-row-padding ">
		                    <button class="button is-success is-outlined w3-right" @click="updateMedicalHistory()"><i class="fas fa-pen"></i>&nbsp Update Medical History</button>
		                </div>

		            </div>
		        </section>
		    </div>
		</div>
	`,

	data () {
		return {

			openModalMedicalHistoryInformationUpdate : false,
			patientId : "",
			patientInfo : [],

			//Update Medical History
			physician_name : "",
			physician_specialty : "",
			physician_address : "",
			physician_number : "",
			physician_number_validation_message : "",
			q1 : -1,
			q2 : -1,
			q2_2 : "",
			q3 : -1,
			q3_2 : "",
			q4 : -1,
			q4_2 : "",
			q5 : -1,
			q5_2 : "",
			q6 : -1,
			q7 : -1,
			q8_1 : false,
			q8_2 : false,
			q8_3 : false,
			q8_4 : false,
			q8_5 : false,
			q8_6 : false,
			q8_6Other : "",
			q9 : "",
			q10_1: -1,
			q10_2: -1,
			q10_3: -1,
			q11 : "",
			q12 : "",
			q13_1 : false,
			q13_2 : false,
			q13_3 : false,
			q13_4 : false,
			q13_5 : false,
			q13_6 : false,
			q13_7 : false,
			q13_8 : false,
			q13_9 : false,
			q13_10 : false,
			q13_11 : false,
			q13_12 : false,
			q13_13 : false,
			q13_14 : false,
			q13_15 : false,
			q13_16 : false,
			q13_16Other : ""

		}
	},

	methods : {

		copyPatientInformationToUpdateModal(patientInfo, openModalCounter, patientId){

			this.openModalMedicalHistoryInformationUpdate = openModalCounter;
			this.patientInfo = JSON.parse(JSON.stringify(patientInfo));
			this.patientId = patientId;

			this.updateModalModels();


		},

		updateModalModels(){

			this.physician_number_validation_message =  validateMobileNumber(this.patientInfo.office_no);

			//Update Medical History
			this.physician_name  = this.patientInfo.physician_name;
			this.physician_specialty = this.patientInfo.physician_specialty;
			this.physician_address = this.patientInfo.office_address;
			this.physician_number = this.patientInfo.office_no;
			this.q1 = this.patientInfo.q1;
			this.q2 = this.patientInfo.q2;
			this.q2_2 = this.patientInfo.q2_ans;
			this.q3 = this.patientInfo.q3;
			this.q3_2 = this.patientInfo.q3_ans;
			this.q4 = this.patientInfo.q4;
			this.q4_2 = this.patientInfo.q4_ans;
			this.q5 = this.patientInfo.q5;
			this.q5_2 = this.patientInfo.q5_ans;
			this.q6 = this.patientInfo.q6;
			this.q7 = this.patientInfo.q7;
			this.q8_1 = translateBoolean2(this.patientInfo.q8_1);
			this.q8_2 = translateBoolean2(this.patientInfo.q8_2);
			this.q8_3 = translateBoolean2(this.patientInfo.q8_3);
			this.q8_4 = translateBoolean2(this.patientInfo.q8_4);
			this.q8_5 = translateBoolean2(this.patientInfo.q8_5); 
			this.q8_6 = translateBoolean2(this.patientInfo.q8_6);
			this.q8_6Other =  this.patientInfo.q8_6Other;
			this.q9  = this.patientInfo.q9;
			this.q10_1 = this.patientInfo.q10_1;
			this.q10_2 = this.patientInfo.q10_2;
			this.q10_3 = this.patientInfo.q10_3;
			this.q11 = this.patientInfo.q11;
			this.q12 = this.patientInfo.q12;
			this.q13_1 = translateBoolean2(this.patientInfo.q13_1);
			this.q13_2 = translateBoolean2(this.patientInfo.q13_2); 
			this.q13_3 = translateBoolean2(this.patientInfo.q13_3);
			this.q13_4 = translateBoolean2(this.patientInfo.q13_4);
			this.q13_5 = translateBoolean2(this.patientInfo.q13_5);
			this.q13_6 = translateBoolean2(this.patientInfo.q13_6);
			this.q13_7 = translateBoolean2(this.patientInfo.q13_7);
			this.q13_8 = translateBoolean2(this.patientInfo.q13_8);
			this.q13_9 = translateBoolean2(this.patientInfo.q13_9);
			this.q13_10 = translateBoolean2(this.patientInfo.q13_10);
			this.q13_11 = translateBoolean2(this.patientInfo.q13_11);
			this.q13_12 = translateBoolean2(this.patientInfo.q13_12);
			this.q13_13 = translateBoolean2(this.patientInfo.q13_13);
			this.q13_14 = translateBoolean2(this.patientInfo.q13_14);
			this.q13_15 = translateBoolean2(this.patientInfo.q13_15);
			this.q13_16 = translateBoolean2(this.patientInfo.q13_16);
			this.q13_16Other = this.patientInfo.q13_16Other;

		},

		updateMedicalHistory(){

			let self = this;

			this.physician_number_validation_message =  validatePhysicianNumber(this.physician_number);

			if(this.physician_number_validation_message == ""){

				axios.post('../php/api/updateMedicalHistory.php',{
					
					patient_id : this.patientId,
					physician_name : this.physician_name,
					physician_specialty : this.physician_specialty,
					physician_address : this.physician_address,
					physician_number : this.physician_number,
					q1 : this.q1,
					q2 : this.q2, 
					q2_ans : this.q2_2, 
					q3 : this.q3,
					q3_ans : this.q3_2, 
					q4 : this.q4,
					q4_ans : this.q4_2, 
					q5 : this.q5,
					q5_ans : this.q5_2, 
					q6 : this.q6,
					q7 : this.q7,
					q8_1 : translateBoolean(this.q8_1),
					q8_2 : translateBoolean(this.q8_2),
					q8_3 : translateBoolean(this.q8_3),
					q8_4 : translateBoolean(this.q8_4),
					q8_5 : translateBoolean(this.q8_5),
					q8_6 : translateBoolean(this.q8_6),
					q8_6Other : this.q8_6Other, 
					q9 : this.q9, 
					q10_1 : this.q10_1,
					q10_2 : this.q10_2,
					q10_3 : this.q10_3,
					q11 : this.q11,
					q12 : this.q12,
					q13_1 : translateBoolean(this.q13_1),
					q13_2 : translateBoolean(this.q13_2),
					q13_3 : translateBoolean(this.q13_3),
					q13_4 : translateBoolean(this.q13_4),
					q13_5 : translateBoolean(this.q13_5),
					q13_6 : translateBoolean(this.q13_6),
					q13_7 : translateBoolean(this.q13_7),
					q13_8 : translateBoolean(this.q13_8),
					q13_9 : translateBoolean(this.q13_9),
					q13_10 : translateBoolean(this.q13_10),
					q13_11 : translateBoolean(this.q13_11),
					q13_12 : translateBoolean(this.q13_12),
					q13_13 : translateBoolean(this.q13_13),
					q13_14 : translateBoolean(this.q13_14),
					q13_15 : translateBoolean(this.q13_15),
					q13_16 : translateBoolean(this.q13_16),
					q13_16Other : this.q13_16Other
					
				})
				.then(function (response){
					
					console.log(response.data);
					alert("Successfully updated patient information");

					self.openModalMedicalHistoryInformationUpdate = false;

					self.$emit('update-patient-medical-history');

					
				})
				.catch(function (error) {
					console.log(error);
				});

			}
			else{

				if(this.physician_number_validation_message != "") document.getElementById("physician_number").focus();

			}

		}

	}


});

