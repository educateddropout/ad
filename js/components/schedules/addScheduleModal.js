Vue.component('addScheduleModal', {
	props: ['userData', 'dentistsLibrary','timeSchedulesLibrary'],
	template: `
		<div class="w3-row">
			<div clas="row">
	            <button class="button w3-right is-success" @click="openScheduleModal()"><i class="fas fa-plus"></i> &nbsp Add Appointment</button>
	        </div>
			<div id="modal-ter" class="modal" :class="{ 'is-active': openModal}">
			    <div class="modal-background"></div>
			    <div class="modal-card">
			        <header class="modal-card-head">
			        <p class="modal-card-title">Schedule an Appointment</p>
			        <button class="delete" aria-label="close"  @click="closeScheduleModal()"></button>
			        </header>
			        <section class="modal-card-body">
			            <div class="content">
			                

			                <div class="row w3-center has-text-success">
			                    {{successMessage}}
			                </div>
			                
			                <br>
			                <div class="w3-row">
			                    Dentist:
			                    <div class="select is-fullwidth ">
			                        <select v-model="dentist"  @change="onChangeInputBoxes1()">
			                            <option value="-1" disabled>Select Dentist</option>
			                            <option v-for="dentist in dentistsLibrary" :value="dentist.id">
			                                {{dentist.name}}
			                            </option>
			                        </select>
			                    </div>
			                </div>

			                <br>
			                <div class="w3-row">
			                    Please select date of appointment:
			                    <input class="input" type="date" v-model="dateOfAppointment" @change="onChangeInputBoxes1()" >
			                </div>

			                <hr>
			                <div v-show="form2Show">
				                <div class="w3-row">
				                    Patient :
				                    <div class="is-fullwidth ">
				                    	<v-select 
			                                label="patient_name" :options="patientsLibrary" 
			                                class="column is-12 is-paddingless" 
			                                v-model="patient" 
			                                placeholder = "Select Patient"
			                            ></v-select>
				                    </div>
				                </div>

				                <div class="w3-row" v-show="showNewPatient">
				                	<br>
				                    Patient Name
				                    <div class="is-fullwidth ">
				                        <input class="input" id="patient_name" type="text" :class="{ 'is-danger': patientNameErrorMessage != ''}" v-model="patientName" maxlength = "100" @keyup="patientName = patientName.toUpperCase()">
				                    </div>
				                    <span class="help has-text-danger">{{patientNameErrorMessage}}</span>
				                </div>

				                <div class="w3-row">
				                	<br>
				                    Contact Number
				                    <div class="is-fullwidth ">
				                        <input class="input" type="text" v-model="patientContactNumber" maxlength="11">
				                    </div>
				                </div>



				                <div class="w3-row">
				                    Treatment/Procedure/Concern
				                    <div class="is-fullwidth ">
				                        <textarea class="textarea" id="patient_procedure" :class="{ 'is-danger': patientProcedureErrorMessage != ''}" v-model="patientProcedure" rows="2" @keyup="patientProcedure = patientProcedure.toUpperCase()"></textarea> 
				                    </div>
				                    <span class="help has-text-danger">{{patientProcedureErrorMessage}}</span>
				                </div>
				                
				                <hr>
				                <div class="w3-row-padding">
				                    <strong>*To cancel an appointment</strong>. Press the occupied input box you wish to cancel.
				                </div>
				                <br>
				                <div class="w3-row-padding">
				                    <div class="w3-half" v-for="(dentistSchedule,index) in dentistSchedules">
				                        <label><strong>{{dentistSchedule.name}}</strong></label>
				                        <div class="w3-row">
				                            <div class="w3-col l1">
				                                <input class="w3-check" type="checkbox" v-model="dentistInputs.check[index]" :disabled="patient == -1 || dentistInputs.status[index] == 1" @click="inputSchedule(index)">
				                            </div>
				                            <div class="w3-col l1">
				                                &nbsp
				                            </div>
				                            <div class="w3-col l10 w3-padding-left" @click="clickInput(dentistInputs.schedule_id[index])">
				                                <input class="input" :class="{ 'is-success': dentistInputs.status[index] == 0, 'is-info': dentistInputs.status[index] == 1, 'is-warning': dentistInputs.status[index] == 2}" type="text" v-model="dentistInputs.input[index]" disabled>
				                            </div>
				                        
				                        </div>
				                    </div>
				                </div>
				                <hr>

				                <div class="w3-row w3-right">
				                	<button class="button is-info is-outlined" @click="saveSchedule()"><i class="fa fa-calendar" aria-hidden="true"></i> &nbsp Save Appointment</button>
				                </div>
							</div>


			            </div>
			        </section>
			        <footer class="modal-card-foot ">
			            <button class="button is-danger " @click="closeScheduleModal()">Cancel</button>
			        </footer>
			    </div>
			</div>

			<div id="modal-ter" class="modal" :class="{ 'is-active': openCancelledRemarks}">
			    <div class="modal-background"></div>
			    <div class="modal-card">
			        <header class="modal-card-head">
			        <p class="modal-card-title">Remarks on cancelled appointment</p>
			        
			        </header>
			        <section class="modal-card-body">
			            <div class="content">
			                
			                <br>
			                <div class="w3-row">
			                	<br>
			                    Remarks
			                    <div class="is-fullwidth ">
			                        <input class="input" type="text" v-model="cancelledRemarks" >
			                    </div>
			                </div>
							
							<br>
			                <div class="w3-row w3-right">
			                	<button class="button is-info is-outlined" @click="proceedCancellation()"> Proceed </button>
			                </div>


			            </div>
			        </section>
			        <footer class="modal-card-foot ">
			            <button class="button is-danger " @click="closeCancelledRemarks()">Cancel</button>
			        </footer>
			    </div>
			</div>
		</div>
	`,
	data(){

		return {

			openModal : false,
			openCancelledRemarks : false,
			form2Show : false,
			patientsLibrary : [],
			dentist : -1,
			dateOfAppointment : "",
			patient : { id : 'dc28ef68-a7a5-4459-bf58-cfc7919a0466'},
			patientName : "",
			patientContactNumber : "",
			patientProcedure : "",
			successMessage : "",
			dentistInputs: {
				check : [],
				input : [],
				status : [],
				schedule_id : []
			},
			prevDentistInputs : {
				check : [],
				input : [],
				status : [],
				schedule_id : []
			},
			dentistSchedules: [],
			cancelledRemarks : "",
			schedule_id : "",
			errorMessage : "",
			patientNameErrorMessage : "",
			patientProcedureErrorMessage : ""


		}

	},

	created(){

		var self = this;

		axios.get('../php/api/listOfPatientsSchedule.php')
		.then(function (response){
			
			self.patientsLibrary = response.data.patients_details;

			self.patientsLibrary.unshift( {
				id : '0',
				patient_name : "NEW PATIENT"
			});

		})
		.catch(function (error) {
			alert(error);
		});

		

	},

	computed : {

		patient_name_computed(){

			let patient_name = "";

			if(this.patient != -1 && this.patient != -2){

				patient_name = this.patientsLibrary.filter(patient => {

					return patient.id == this.patient;

				});
			}

			return patient_name;
		},

		showNewPatient(){
			let retVal = false;

			if(this.patient != null){
				if(this.patient.id == 0) retVal = true;
			}

			return retVal;
		}

	},

	methods : {

		onChangePatientSelect(){

			this.dentistInputs = JSON.parse(JSON.stringify(self.prevDentistInputs));
			this.patientName = "";
			this.patientContactNumber = "";

			if(this.patient != -1 && this.patient != -2){

				let patient_info = this.patientsLibrary.filter(patient => {

					return patient.id == this.patient;

				});

				this.patientName = patient_info[0].last_name + ', ' + patient_info[0].first_name + " " + patient_info[0].middle_name;
				
				if(patient_info[0].mobile_no != "") this.patientContactNumber = "0" + patient_info[0].mobile_no;

			}

		},

		saveSchedule(){

			let timeList = [];

			this.dentistInputs.check.forEach(function(check, index){

				if(check == true){

					timeList.push(index+1);

				}	

			});

			this.saveAppointment(timeList);

			

		},

		saveAppointment(timeList){

			var self = this;

			axios.post( '../php/api/saveSchedule.php',{

				time_list : timeList,
				date_of_appointment : this.dateOfAppointment,
				dentist_id : this.dentist,
				patient_id : this.patient,
				procedure : this.patientProcedure,
				patient_name : this.patientName,
				contact_number : this.patientContactNumber
				
			}).then(function(response){
				
				console.log(response.data);
				
				alert("Successfully saved appointment");

				self.closeScheduleModal();

			})
			.catch(function(error){
				alert(error);
			});

		},

		inputSchedule(index){
			this.patientProcedureErrorMessage = "";
			this.patientNameErrorMessage = "";

			if(this.patientProcedure.trim() == "") this.patientProcedureErrorMessage = "This is required";
			if(this.patientName.trim() == "") this.patientNameErrorMessage = "This is required";

			if(this.patientNameErrorMessage != "" || this.patientProcedureErrorMessage != ""){

				event.preventDefault();

			}
			else {
				this.dentistInputs.input[index] = this.patientName;
			}


			if(this.patientNameErrorMessage != "") document.getElementById("patient_name").focus();
			else if(this.patientProcedureErrorMessage != "") document.getElementById("patient_procedure").focus();


		},

		closeScheduleModal() {

			this.$emit('refresh-schedule');

			this.openModal = false;


		},

		openScheduleModal(){

			this.openModal = true;

		},

		onChangeInputBoxes1(){

			this.resetFields();

			if(this.dentist != -1 && this.dateOfAppointment != "" ){

				this.form2Show = true;

				this.disableSaveScheduleButton = false;

				this.scheduleMessage = "Checking availability... Please wait!!!";

				this.getScheduleByDentist(this.dentist, this.dateOfAppointment);

			}
			else {
				this.form2Show = false;
			}

		},

		getScheduleByDentist(dentistId, date){

			var self = this;

			axios.post( '../php/api/getSchedulesByDentist.php',{
				dentist_id : dentistId,
				date : date
				
			}).then(function(response){
				
				self.dentistSchedules = response.data.schedule_of_dentist;
				console.log(response.data.schedule_of_dentist);

				self.dentistSchedules.forEach(function(sched,index){

					Vue.set(self.dentistInputs.check, index, false);
					Vue.set(self.dentistInputs.input, index, "");
					Vue.set(self.dentistInputs.status, index, 0);
					Vue.set(self.dentistInputs.schedule_id, index, sched.sched_id);

					//self.dentistInputs.check[index] = false;
					//self.dentistInputs.input[index] = "";
					//self.dentistInputs.status[index] = 0; // available
					//self.dentistInputs.schedule_id[index] = sched.sched_id; 

					if(sched.time_schedule != null){ 

						Vue.set(self.dentistInputs.input, index, sched.patient_name);
						Vue.set(self.dentistInputs.status, index, 1);
						//self.dentistInputs.status[index] = 1; // occupied then 2 means changed
						//self.dentistInputs.input[index] = sched.patient_name;
					}


				});

				this.prevDentistInputs = JSON.parse(JSON.stringify(self.dentistInputs));

			})
			.catch(function(error){
				alert(error);
			});

		},

		resetFields(){

			this.patient = null;
			this.patientName = "";
			this.patientProcedure = "";
			this.patientContactNumber = "";

		},

		clickInput(schedule_id){

			if(schedule_id != null){
				
				let confirmation = confirm("Are you sure you want to cancel this appointment?");

				if(confirmation){

					this.schedule_id = schedule_id
					this.openModal = false;
					this.openCancelledRemarks = true;

				}
			}

		},

		closeCancelledRemarks(){

			this.openModal = true;
			this.openCancelledRemarks = false;

		},

		proceedCancellation(){

			this.cancelAppointment();

			this.closeCancelledRemarks();

		},


		cancelAppointment(){

			var self = this;

			axios.post( '../php/api/cancelSchedule.php',{

				schedule_id : this.schedule_id,
				remarks : this.cancelledRemarks


			}).then(function(response){
				
				console.log(response.data);
				//self.closeScheduleModal();
				self.getScheduleByDentist(self.dentist, self.dateOfAppointment);
				

			})
			.catch(function(error){
				alert(error);
			});

		}

	}


});