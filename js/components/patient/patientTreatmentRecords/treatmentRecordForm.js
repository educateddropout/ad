Vue.component('treatmentRecordForm', {
	props: ['userData', 'patientId', 'dentistsLibrary'],
	template: `
		<div class="row " >
		    <div class="column is-10 is-offset-1">
		        <div class="row">
		            <button class="button is-info" @click="openTreatmentRecordForm" v-if="!showTreatmentRecordForm"> Open Treatment Record Form </button>
		            <button class="button is-danger" @click="closeTreatmentRecordForm" v-else="showTreatmentRecordForm"> Close Treatment Record Form </button>
		        </div>
		        
		        <div class="row box is-marginless" v-if="showTreatmentRecordForm">
		            <div class="column is-10 is-offset-1">
		                <div class="row">
		                    <div class="columns">
		                        <div class="column is-4">
		                        		
		                            <div class="w3-row ">
		                                <strong>Date</strong>
		                        		<div class="field is-expanded">
		                                    <div class="field has-addons ">
		                                        <span class="control">
		                                            <a class="button is-static">
		                                            	<i class="fas fa-calendar"></i>
		                                            </a>
		                                        </span>
		                                        <span class="control is-expanded" >
		                                            <input class="input" :class="{ 'is-danger': treatment_date_validation_message != '' }" type="date" id="treatment_date" v-model="treatment_date">
	                                            	
		                                        </span>

		                                    </div>
		                                    <p class="help has-text-danger">{{treatment_date_validation_message}}</p>
		                                </div>
		                            </div>

		                        </div>

		                        <div class="column is-4">
									
									<div class="row">
		                                <strong>Tooth No/s</strong>
		                        		<div class="field is-expanded">
		                                    <div class="field has-addons ">
		                                        <span class="control">
		                                            <a class="button is-static">
		                                            	<i class="fas fa-tooth"></i>
		                                            </a>
		                                        </span>
		                                        <span class="control is-expanded" >
	                                            	<input class="input" type="text" v-model="tooth_nos" maxlength="30">
		                                        </span>

		                                    </div>
		                                </div>
		                            </div>

		                        </div>

		                        <div class="column is-4">
									
									<div class="row">
		                                <strong>Dentist</strong>
		                        		<div class="field is-expanded">
		                                    <div class="field has-addons ">
		                                        <span class="control">
		                                            <a class="button is-static">
		                                            	<i class="fas fa-user-md"></i>
		                                            </a>
		                                        </span>
		                                        <span class="control is-expanded" >

	                                            	<div class="select is-fullwidth">
		                                                <div class="select is-fullwidth">
		                                                    <select v-model="treatment_dentist" :disabled="userData.userType == 2" :class="{ 'is-danger': treatment_dentist_validation_message != '' }">
		                                                        <option value="-1" disabled>Please select dentist</option>
		                                                        <option v-for="dentist in dentistsLibrary" :value="dentist.id"> {{dentist.name}}
		                                                        </option>
		                                                    </select>
		                                                </div>
		                                            </div>

		                                        </span>
		                                    </div>
											<p class="help has-text-danger">{{treatment_dentist_validation_message}}</p>
		                                </div>
		                            </div>

		                        </div>

		                        
		                    </div>
		                </div>
		                <br>
		                <div class="row">
		                    <div class="columns">
		                        
		                        <div class="column is-12">

		                            <div class="row">
		                                <strong>Procedure:</strong>
		                                <div class="field has-addons">
		                                    <p class="control">
		                                        <p class="control is-expanded">
		                                            <textarea class="textarea" :class="{ 'is-danger': treatment_procedure_validation_message != '' }" v-model="procedure" maxlength="300" @keyup="procedure = procedure.toUpperCase()"></textarea>
		                                        </p>
		                                    </p>
		                                </div>
		                                <p class="help has-text-danger">{{treatment_procedure_validation_message}}</p>
		                            </div>

		                        </div>
		                    </div>
		                </div>
		                <br>
		                <div class="row">
		                    <div class="columns">
		                        <div class="column is-4">

		                        	<div class="row">
		                                <strong>Amount Charge</strong>
		                        		<div class="field is-expanded">
		                                    <div class="field has-addons ">
		                                        <span class="control">
		                                            <a class="button is-static">
		                                            	&#8369;
		                                            </a>
		                                        </span>
		                                        <span class="control is-expanded" >
	                                            	<input class="input" type="text" :class="{ 'is-danger': treatment_amount_validation_message != '' }"  v-model="treatment_amount" maxlength="30">
		                                        </span>

		                                    </div>
		                                    <p class="help has-text-danger">{{treatment_amount_validation_message}}</p>
		                                </div>
		                            </div>

		                        </div>

		                        <div class="column is-4">

		                        	<div class="row">
		                                <strong>Dentist Percentage</strong>
		                        		<div class="field is-expanded">
		                                    <div class="field has-addons ">
		                                        <span class="control">
		                                            <a class="button is-static">
		                                            	%
		                                            </a>
		                                        </span>
		                                        <span class="control is-expanded" >
	                                            	<input class="input" type="text" :class="{ 'is-danger': treatment_percentage_validation_message != '' }"  v-model="dentist_percentage" maxlength="30">
		                                        </span>

		                                    </div>
		                                    <p class="help has-text-danger">{{treatment_percentage_validation_message}}</p>
		                                </div>
		                            </div>


		                        </div>

		                        <div class="column is-4">

		                        	<div class="row">
		                                <strong>Laboratory Fee</strong>
		                        		<div class="field is-expanded">
		                                    <div class="field has-addons ">
		                                        <span class="control">
		                                            <a class="button is-static">
		                                            	&#8369;
		                                            </a>
		                                        </span>
		                                        <span class="control is-expanded" >
	                                            	<input class="input" type="text" :class="{ 'is-danger': treatment_lab_fee_validation_message != '' }"  v-model="laboratory_fee" maxlength="30">
		                                        </span>

		                                    </div>
		                                    <p class="help has-text-danger">{{treatment_lab_fee_validation_message}}</p>
		                                </div>
		                            </div>
		                            
		                        </div>

		                    </div>
		                </div>
		                <br>
		                <br>
		                <div class="row has-text-right">
		                    <button class="button is-info is-outlined" @click="saveTreatmentRecord">Save Treatment Record</button>
		                </div>
		                
		            </div>
		        </div>
		    </div>
		</div>
	`,

	data() {

		return {

			showTreatmentRecordForm : false,
			treatment_date : "",
			tooth_nos : "",
			treatment_dentist : -1,
			procedure : "",
			treatment_amount : "",
			dentist_percentage : "",
			laboratory_fee : "",

			//validation routines
			treatment_date_validation_message : "",
			treatment_dentist_validation_message : "",
			treatment_procedure_validation_message : "",
			treatment_amount_validation_message : "",
			treatment_percentage_validation_message : "",
			treatment_lab_fee_validation_message : ""
		}

	},

	created(){
	},

	methods : {

		openTreatmentRecordForm(){

			this.showTreatmentRecordForm = true;

			if(this.userData.userType){
				this.treatment_dentist = this.userData.userId;
			}

		},

		closeTreatmentRecordForm(){

			this.showTreatmentRecordForm = false;

		},

		saveTreatmentRecord(){

			var self = this;

			this.treatment_date_validation_message = validateTreatmentDate(this.treatment_date);
			this.treatment_dentist_validation_message =  validateTreatmentDentist(this.treatment_dentist)
			this.treatment_procedure_validation_message = validateTreatmentProcedure(this.procedure)
			this.treatment_amount_validation_message = validateTreatmentAmountCharge(this.treatment_amount);
			this.treatment_percentage_validation_message = validateTreatmentDentistPercentage(this.dentist_percentage);
			this.treatment_lab_fee_validation_message = validateTreatmentLabFee(this.laboratory_fee);

			if(this.treatment_date_validation_message == "" && this.treatment_dentist_validation_message == "" 
				&& this.treatment_procedure_validation_message == "" && this.treatment_amount_validation_message == "" 
				&& this.treatment_percentage_validation_message == "" && this.treatment_lab_fee_validation_message == ""){

				axios.post('../php/api/saveTreatmentRecord.php',{
					
					patient_id : this.patientId,
					treatment_date: this.treatment_date,
					tooth_nos : this.tooth_nos,
					procedure : this.procedure,
					treatment_amount : this.treatment_amount,
					treatment_dentist: this.treatment_dentist,
					dentist_percentage : this.dentist_percentage,
					laboratory_fee : this.laboratory_fee
					
				})
				.then(function (response){
					
					console.log(response.data);
					alert("Successfully saved record");

					//update table
					self.$emit('update-treatment-records');
					
				})
				.catch(function (error) {
					console.log('FAILURE!!');
				});

			}

		}

	}

});