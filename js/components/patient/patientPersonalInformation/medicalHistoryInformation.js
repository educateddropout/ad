Vue.component('medicalHistoryInformation', {
	props: ['patientInfo','patientId'],
	template: `
		<!-- Medical Information -->
        <div class="row box is-marginless">

            <div class="row">
                <span class="is-size-4">
                    <strong>
                        Medical Information
                    </strong>
                </span>
            </div>
            <hr>

            <div class="row ">
                <div class="columns">
                    <div class="column is-6 padding-top-bottom-0">
                        <span >
                            <strong>
                                Physician Name:
                            </strong>
                            {{patientInfo.physician_name}}
                        </span>
                    </div>
                    <div class="column is-6 padding-top-bottom-0">
                        <span >
                            <strong>
                                Physician Specialty:
                            </strong>
                            {{patientInfo.physician_specialty}}
                        </span>
                    </div>
                </div>
                <div class="columns">
                    <div class="column is-6 padding-top-bottom-0">
                        <span >
                            <strong>
                                Office address:
                            </strong>
                            {{patientInfo.office_address}}
                        </span>
                    </div>
                    <div class="column is-6 padding-top-bottom-0">
                        <span >
                            <strong>
                                Office number:
                            </strong>
                            {{patientInfo.office_no}}
                        </span>
                    </div>
                </div>
            </div>

            <br>
            <hr>
            
            <div class="row">
                <div class="columns">
                    <div class="column is-9">
                        <span class="is-size-6">
                            1. In good health?
                        </span>
                    </div>
                    <div class="column is-3">
                        <strong>{{q1Ans}}</strong>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="columns">
                    <div class="column is-9">
                        <span class="is-size-6">
                            2. Under medical treatment now?
                        </span>
                    </div>
                    <div class="column is-3">
                        <strong>{{q2Ans}}</strong>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="columns">
                    <div class="column is-9">
                        <span class="is-size-6">
                            3. Had serious illness or surgical operation?
                        </span>
                    </div>
                    <div class="column is-3">
                        <strong>{{q3Ans}}</strong>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="columns">
                    <div class="column is-9">
                        <span class="is-size-6">
                            4. Have been hospitalized?
                        </span>
                    </div>
                    <div class="column is-3">
                        <strong>{{q4Ans}}</strong>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="columns">
                    <div class="column is-9">
                        <span class="is-size-6">
                            5. Taking prescription/non-prescription medication?
                        </span>
                    </div>
                    <div class="column is-3">
                       <strong>{{q5Ans}}</strong>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="columns">
                    <div class="column is-9">
                        <span class="is-size-6">
                            6. Using tobacco products?
                        </span>
                    </div>
                    <div class="column is-3">
                        <strong>{{q6Ans}}</strong>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="columns">
                    <div class="column is-9">
                        <span class="is-size-6">
                            7. Using alcohol, coccaine or other dangerous drugs?
                        </span>
                    </div>
                    <div class="column is-3">
                        <strong>{{q7Ans}}</strong>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="columns">
                    <div class="column is-9">
                        <span class="is-size-6">
                            8. Allergic to any of the following:
                        </span>
                    </div>
                    <div class="column is-3">
                        <strong>{{q8Ans}}</strong>
                    </div>
                </div>
            </div>
            <div class="row" >
                <div class="columns">
                    <div class="column is-9">
                        <span class="is-size-6" v-if="patientInfo.sex == 2">
                            9. Bleeding Time:
                        </span>
                        <span class="is-size-6 has-text-danger" v-else="">
                            <del>9. Bleeding Time:</del>
                        </span>
                    </div>
                    <div class="column is-3">
                        <strong>{{q9Ans}}</strong>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="row">
                    <div class="columns">
                        <div class="column is-9">
                            <span class="is-size-6" v-if="patientInfo.sex == 2">
                                10. For Women Only:
                            </span>
                            <span class="is-size-6 has-text-danger" v-else="">
                                <del>10. For Women Only:</del>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="columns">
                        <div class="column is-8 is-offset-1">
                            <span class="is-size-6" v-if="patientInfo.sex == 2">
                                10A. Is Pregnant?
                            </span>
                            <span class="is-size-6 has-text-danger" v-else="">
                                <del>10A. Is Pregnant?</del>
                            </span>
                        </div>
                        <div class="column is-3">
                            <strong>{{q10_1Ans}}</strong>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="columns">
                        <div class="column is-8 is-offset-1">
                            <span class="is-size-6" v-if="patientInfo.sex == 2">
                                10B. Is Nursing?
                            </span>
                            <span class="is-size-6 has-text-danger" v-else="">
                                <del>10B. Is Nursing?</del>
                            </span>
                        </div>
                        <div class="column is-3">
                            <strong>{{q10_2Ans}}</strong>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="columns">
                        <div class="column is-8 is-offset-1">
                            <span class="is-size-6" v-if="patientInfo.sex == 2">
                                10C. Is taking Birth Control Pill?
                            </span>
                            <span class="is-size-6 has-text-danger" v-else="">
                                <del> 10C. Is taking Birth Control Pill?</del>
                            </span>
                        </div>
                        <div class="column is-3">
                            <strong>{{q10_3Ans}}</strong>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="columns">
                    <div class="column is-9">
                        <span class="is-size-6">
                            11. Blood Type:
                        </span>
                    </div>
                    <div class="column is-3">
                        <strong>{{q11Ans}}</strong>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="columns">
                    <div class="column is-9">
                        <span class="is-size-6">
                            12. Blood Pressure:
                        </span>
                    </div>
                    <div class="column is-3">
                        <strong>{{q12Ans}}</strong>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="columns">
                    <div class="column is-9">
                        <span class="is-size-6">
                            13. Have the following medical condition/s:
                        </span>
                    </div>
                    <div class="column is-3">
                        <strong>{{q13Ans}}</strong>
                    </div>
                </div>

            </div>
            <br>
            <br>
            <div class="row">
                <button class="button is-info is-outlined w3-hide-small" @click="openMedicalHistoryUpdateModal"><i class="fas fa-pen"></i> &nbsp|Update Patient Medical Information</button>
                <button class="button is-info is-outlined w3-hide-large w3-hide-medium" @click="openMedicalHistoryUpdateModal"><i class="fas fa-pen"></i> &nbsp|&nbspUpdate</button>
            </div>

            <update-medical-history-information-modal
            	ref = "updateMedicalHistoryInformationModal"
            	@update-patient-medical-history = "updatePatientMedicalHistory"
            >
            </update-medical-history-information-modal>

        </div>
		

	`,

	data() {

		return {

		
		}

	},

	methods : {

		openMedicalHistoryUpdateModal(){

			this.$refs.updateMedicalHistoryInformationModal.copyPatientInformationToUpdateModal(this.patientInfo, true, this.patientId);

		},

		updatePatientMedicalHistory(){

			this.$emit('update-patient-medical-history');

		}

	},

	computed : {

		q1Ans(){
			ans = "";

			if(this.patientInfo.q1 == 1) ans = "Yes";
			else ans = "No";

			return ans;
		},

		q2Ans(){
			ans = "";

			if(this.patientInfo.q2 == 1){
				ans = "Yes | " + this.patientInfo.q2_ans;
			}
			else ans = "No";

			return ans;
		},

		q3Ans(){
			ans = "";

			if(this.patientInfo.q3 == 1){
				ans = "Yes | " + this.patientInfo.q3_ans;
			}
			else ans = "No";

			return ans;
		},

		q4Ans(){
			ans = "";

			if(this.patientInfo.q4 == 1){
				ans = "Yes | " + this.patientInfo.q4_ans;
			}
			else ans = "No";

			return ans;
		},

		q5Ans(){
			ans = "";

			if(this.patientInfo.q5 == 1){
				ans = "Yes | " + this.patientInfo.q5_ans;
			}
			else ans = "No";

			return ans;
		},

		q6Ans(){
			ans = "";

			if(this.patientInfo.q1 == 1) ans = "Yes";
			else ans = "No";

			return ans;
		},

		q7Ans(){
			ans = "";

			if(this.patientInfo.q1 == 1) ans = "Yes";
			else ans = "No";

			return ans;
		},

		q8Ans(){
			ans = "";

			if(this.patientInfo.q8_1 == 1) ans += "Local Anesthetic | ";

			if(this.patientInfo.q8_2 == 1) ans += "Antibiotic | ";

			if(this.patientInfo.q8_3 == 1) ans += "Sulfa Drugs | ";

			if(this.patientInfo.q8_4 == 1) ans += "Aspirin | ";

			if(this.patientInfo.q8_5 == 1) ans += "Latex | ";

			if(this.patientInfo.q8_6 == 1){ 
				ans = ans + this.patientInfo.q8_6Other + " | ";
			}

			if(ans == ""){
				ans = "--";
			}
			else{
				ans = ans.slice(0,-3)
			}

			return ans;
		},

		q9Ans(){
			ans = "";

			if(this.patientInfo.q9 == ""){
				ans = "--";
			} else {
				ans = this.patientInfo.q9;
			}

			return ans;
		},

		q10_1Ans(){
			ans = "";

			if(this.patientInfo.q10_1 == 1) ans = "Yes";
			else ans = "No";

			return ans;
		},

		q10_2Ans(){
			ans = "";

			if(this.patientInfo.q10_2 == 1) ans = "Yes";
			else ans = "No";

			return ans;
		},

		q10_3Ans(){
			ans = "";

			if(this.patientInfo.q10_3 == 1) ans = "Yes";
			else ans = "No";

			return ans;
		},

		q11Ans(){
			ans = "";

			if(this.patientInfo.q11 == ""){
				ans = "--";
			} else {
				ans = this.patientInfo.q11;
			}

			return ans;
		},

		q12Ans(){
			ans = "";

			if(this.patientInfo.q12 == ""){
				ans = "--";
			} else {
				ans = this.patientInfo.q12;
			}

			return ans;
		},


		q13Ans(){
			ans = "";

			if(this.patientInfo.q13_1 == 1) ans += "High Blood Pressure | ";

			if(this.patientInfo.q13_2 == 1) ans += "Heart Disease | ";

			if(this.patientInfo.q13_3 == 1) ans += "Cancer / Tumors | ";

			if(this.patientInfo.q13_4 == 1) ans += "Low Blood Pressure | ";

			if(this.patientInfo.q13_5 == 1) ans += "Heart Murmur | ";

			if(this.patientInfo.q13_6 == 1) ans += "Anemia | ";

			if(this.patientInfo.q13_7 == 1) ans += "Epilepsy / Convulsion | ";

			if(this.patientInfo.q13_8 == 1) ans += "Hepatitis / Liver Disease | ";

			if(this.patientInfo.q13_9 == 1) ans += "Angina | ";

			if(this.patientInfo.q13_10 == 1) ans += "AIDS or HIV Infection | ";

			if(this.patientInfo.q13_11 == 1) ans += "Rheumatic Fever | ";

			if(this.patientInfo.q13_12 == 1) ans += "Asthma | ";

			if(this.patientInfo.q13_13 == 1) ans += "Sexually Transmitted Disease | ";

			if(this.patientInfo.q13_14 == 1) ans += "Hay Fever / Allergies | ";

			if(this.patientInfo.q13_15 == 1) ans += "Emphysema | ";

			if(this.patientInfo.q13_16 == 1){ 
				ans = ans + this.patientInfo.q13_16Other + " | ";
			}

			if(ans == ""){
				ans = "--";
			}
			else{
				ans = ans.slice(0,-3)
			}

			return ans;
		}
	}



});

