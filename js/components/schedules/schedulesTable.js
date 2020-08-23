Vue.component('schedulesTable', {
	props: ['userData', 'dentistsLibrary', 'timeSchedulesLibrary', 'schedulesLibrary','dateSchedule', 'patientsLibrary'],
	template: `
		<div class="row">
                        
                <div class="w3-row " style="overflow-x:auto;">
                    <table class="table w3-border is-fullwidth is-striped" >

                        <thead>
                            <tr>
                                <th class="w3-center has-background-dark has-text-white-ter" :colspan="dentistsLibrary.length+1"><i class="fa fa-calendar" aria-hidden="true"></i> &nbsp Dentist Schedules</th>
                            </tr>
                            <tr class=" has-background-white-ter">
                                <th class="w3-border-right">Time</th>
                                <th class="pointer" v-for="(dentist,index) in dentistsLibrary" @click="openAddScheduleModal(dentist.id,schedulesLibrary[index].result)">
                                    <span v-if="dentist.nickname == null ">{{dentist.name}}</span>
                                    <span v-else>{{dentist.nickname}}</span>
                                </th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            <tr v-for="(timeSchedule,index1) in timeSchedulesLibrary">
                                <th class="w3-border-right">{{timeSchedule.name}}</th>
                                <template v-for="(sched,index2) in schedulesLibrary" >
                                    <td class="w3-border-right" style="text-align:center" 
                                        v-for="s in sched.result2" 
                                        v-if="s.rowOrigin == index1" :rowspan="s.row" 
                                        :class="{'w3-pale-blue': s.detail != '' && schedDetail(s.detail,4) == undefined,
                                                    'w3-pale-red': s.detail != '' && schedDetail(s.detail,4) != undefined }"
                                        @click="cancelSchedule(s.detail,s.timeStarted,s.timeEnded, index2)">
                                        
                                        <div class="w3-row w3-center" v-if="s.detail != ''">
                                            <div class="w3-row w3-text-deep-orange"><b>{{s.timeStarted}} - {{s.timeEnded}}</b></div>
                                            <br>
                                            <div class="w3-row">
                                                <b>
                                                    Patient Name: 
                                                    
                                                </b> <span>{{schedDetail(s.detail,0)}}</span> 
                                                    | 
                                                <b>
                                                    <span class="w3-text-blue" v-if="schedDetail(s.detail,3) == 'N'">NEW</span>
                                                    <span class="w3-text-yellow" v-else="">OLD</span>
                                                </b>
                                            </div>
                                            <div class="w3-row">
                                                <b>Contact Number:</b> <span>{{schedDetail(s.detail,1)}}</span> 
                                            </div>

                                            <div class="w3-row">
                                                <b>Procedure/Treatment:</b> <span>{{schedDetail(s.detail,2)}}</span> 
                                            </div>
                                            <br>
                                            <div class="w3-row has-text-danger" v-if="schedDetail(s.detail,4) != undefined">
                                                <b>Reason of Cancellation: </b><span>{{schedDetail(s.detail,4)}}</span> 
                                            </div>
                                        </div>

                                    </td>
                                </template>
                            </tr>

                        </tbody>
                    </table>
                </div>

                <div class="modal" :class="{'is-active' : showUpdateScheduleModal}">
                    <div class="modal-background"></div>
                    <div class="modal-card">
                        <header class="modal-card-head">
                            <p class="modal-card-title">Modal title</p>
                            <button class="delete" aria-label="close" @click="closeUpdateScheduleModal"></button>
                        </header>
                        <section class="modal-card-body">

                            <div class="w3-row">
                                Dentist:
                                <div class="select is-fullwidth ">
                                    <select v-model="selectedDentist"  disabled>
                                        <option v-for="dentist in dentistsLibrary" :value="dentist.id">
                                            {{dentist.name}}
                                        </option>
                                    </select>
                                </div>
                            </div>

                            <br>
                            <div class="w3-row">
                                Date of appointment:
                                <input class="input" type="date" v-model="dateSchedule" disabled>
                            </div>
                            
                            <br>
                            <div class="w3-row">
                                Patient :
                                <div class="is-fullwidth ">
                                    <v-select 
                                        label="patient_name" :options="patientsLibrary" 
                                        class="column is-12 is-paddingless" 
                                        v-model="patient" 
                                        placeholder = "Select Patient"
                                        @input = "selectPatient"
                                    ></v-select>
                                </div>
                            </div>

                            <div class="w3-row" v-show="showNewPatient">
                                <br>
                                Patient Name
                                <div class="is-fullwidth ">
                                    <input class="input" 
                                        maxlength="55" type="text" 
                                        :class="{ 'is-danger': patientName.error != ''}" 
                                        v-model="patientName.value"
                                        @keyup="patientName.value = patientName.value.toUpperCase()"
                                        @change="validatePatientName"
                                    >
                                </div>
                                <span class="help has-text-danger">{{ patientName.error }}</span>
                            </div>
                            
                            <br>
                            <div class="w3-row">
                                Contact Number
                                <div class="is-fullwidth ">
                                    <input class="input" type="text" :class="{'is-danger' : patientContactNumber.error != ''}"
                                        v-model="patientContactNumber.value" 
                                        maxlength="11"
                                        @change = "validateContactNumber"
                                    >
                                    <p class="help is-danger">{{ patientContactNumber.error }}</p>
                                </div>
                            </div>

                            <br>
                            <div class="w3-row">
                                Treatment/Procedure/Concern
                                <div class="is-fullwidth ">
                                    <textarea 
                                        class="textarea" :class="{'is-danger' : patientProcedure.error}"
                                        maxlength="200" 
                                        v-model="patientProcedure.value" rows="2"
                                        @keyup="patientProcedure.value = patientProcedure.value.toUpperCase()"
                                        @change="validateProcedure"
                                    ></textarea> 
                                    <p class="help is-danger">{{patientProcedure.error}}</p>
                                </div>
                            </div>

                            <br>
                            <div class="w3-row w3-border-bottom" :class="{'w3-border-red' : timeScheduleError != ''}">Time Schedules:</div>
                            <div class="w3-row w3-center">
                                <p class="help is-danger"> {{timeScheduleError}} </p>
                                <br>
                            </div>
                            <div class="w3-row-padding ">
                                <div class="w3-half" v-for="(time,index) in timeSchedulesLibrary">
                                    
                                    <label>{{time.nick}}</label>
                                    <div class="w3-row">
                                        <div class="w3-col l1">
                                            <input class="w3-check" type="checkbox"  v-model="inputFields[index].checkbox" :disabled="disableCheckbox" @click="fillInput(index)">
                                        </div>
                                        <div class="w3-col l1">
                                            &nbsp
                                        </div>
                                        <div class="w3-col l10 w3-padding-left">
                                            <input class="input" 
                                                v-model="inputFields[index].input" 
                                                :class="{'is-warning' : originalInputFields[index].input != '',
                                                        'is-danger' : checkIfCancelled(originalInputFields[index].input)}"
                                            disabled>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </section>
                        <footer class="modal-card-foot">
                            <button class="button is-success" @click="updateSchedule" :disabled="disableCheckbox">Save changes</button>
                            <button class="button">Cancel</button>
                        </footer>
                    </div>
                </div>
                <modal-message
                    :is-confirmation = "isModalConfirmation"
                    :is-active = "isOpenModalMessage"
                    :message = "modalMessage"
                    :is-loading = "isModalLoading"
                    @is-confirmed = "overwriteConfirmed"
                    @close-modal = "closeModal"
                >
                </modal-message>

                <modal-cancel
                    :is-active = "showCancellationModal"
                    :detail = "cancelDetail"
                    :time-started = "cancelTimeStarted"
                    :time-ended = "cancelTimeEnded"
                    :title = "cancelTitle"
                    @close-modal = "closeCancelSchedule"
                    @proceed-cancellation = "proceedCancellation"
                    @undo-cancellation = "undoCancellation"
                >
                </modal-cancel>
                
        </div>
	`,
	data() {

		return {
            selectedDentist : '',
            selectedScheduleResult : [],
            showUpdateScheduleModal : false,
            patient : null,
            patientName : { value : '', error : '' },
            patientProcedure : { value : '', error : '' },
            patientContactNumber : { value : '', error : '' },
            showNewPatient : false,

            inputFields : [

                { input : '', checkbox : false, contact_number : '', treatment : '' }, { input : '', checkbox : false, contact_number : '', treatment : '' }, { input : '', checkbox : false, contact_number : '', treatment : '' }, { input : '', checkbox : false, contact_number : '', treatment : '' }, { input : '', checkbox : false, contact_number : '', treatment : '' },
                { input : '', checkbox : false, contact_number : '', treatment : '' }, { input : '', checkbox : false, contact_number : '', treatment : '' }, { input : '', checkbox : false, contact_number : '', treatment : '' }, { input : '', checkbox : false, contact_number : '', treatment : '' }, { input : '', checkbox : false, contact_number : '', treatment : '' },
                { input : '', checkbox : false, contact_number : '', treatment : '' }, { input : '', checkbox : false, contact_number : '', treatment : '' }, { input : '', checkbox : false, contact_number : '', treatment : '' }, { input : '', checkbox : false, contact_number : '', treatment : '' }, { input : '', checkbox : false, contact_number : '', treatment : '' },
                { input : '', checkbox : false, contact_number : '', treatment : '' }, { input : '', checkbox : false, contact_number : '', treatment : '' }, { input : '', checkbox : false, contact_number : '', treatment : '' }, { input : '', checkbox : false, contact_number : '', treatment : '' }, { input : '', checkbox : false, contact_number : '', treatment : '' },
                { input : '', checkbox : false, contact_number : '', treatment : '' }, { input : '', checkbox : false, contact_number : '', treatment : '' }, { input : '', checkbox : false, contact_number : '', treatment : '' }, { input : '', checkbox : false, contact_number : '', treatment : '' }, { input : '', checkbox : false, contact_number : '', treatment : '' }
                
            ],

            originalInputFields : [

                { input : '', checkbox : false, contact_number : '', treatment : '' }, { input : '', checkbox : false, contact_number : '', treatment : '' }, { input : '', checkbox : false, contact_number : '', treatment : '' }, { input : '', checkbox : false, contact_number : '', treatment : '' }, { input : '', checkbox : false, contact_number : '', treatment : '' },
                { input : '', checkbox : false, contact_number : '', treatment : '' }, { input : '', checkbox : false, contact_number : '', treatment : '' }, { input : '', checkbox : false, contact_number : '', treatment : '' }, { input : '', checkbox : false, contact_number : '', treatment : '' }, { input : '', checkbox : false, contact_number : '', treatment : '' },
                { input : '', checkbox : false, contact_number : '', treatment : '' }, { input : '', checkbox : false, contact_number : '', treatment : '' }, { input : '', checkbox : false, contact_number : '', treatment : '' }, { input : '', checkbox : false, contact_number : '', treatment : '' }, { input : '', checkbox : false, contact_number : '', treatment : '' },
                { input : '', checkbox : false, contact_number : '', treatment : '' }, { input : '', checkbox : false, contact_number : '', treatment : '' }, { input : '', checkbox : false, contact_number : '', treatment : '' }, { input : '', checkbox : false, contact_number : '', treatment : '' }, { input : '', checkbox : false, contact_number : '', treatment : '' },
                { input : '', checkbox : false, contact_number : '', treatment : '' }, { input : '', checkbox : false, contact_number : '', treatment : '' }, { input : '', checkbox : false, contact_number : '', treatment : '' }, { input : '', checkbox : false, contact_number : '', treatment : '' }, { input : '', checkbox : false, contact_number : '', treatment : '' }
                
            ],

            timeScheduleError : '',

            isModalLoading : false,
            isModalConfirmation : false,
            modalMessage : '',
            isOpenModalMessage : false,
            selectedIndex : -1,

            showCancellationModal : false,
            cancelDetail : '',
            cancelTimeStarted : '',
            cancelTimeEnded : '',
            cancelTitle : ''

		}

	},

    created(){

        

    },

	methods : {   

        cancelSchedule(detail,timeStarted,timeEnded,index){

            if(detail != ''){

                this.cancelDetail = detail;
                this.cancelTimeStarted = timeStarted;
                this.cancelTimeEnded = timeEnded;
                this.showCancellationModal = true;
                this.selectedDentist = this.schedulesLibrary[index].dentist_id;
                this.selectedScheduleResult = this.schedulesLibrary[index].result;

                if(this.schedDetail(detail,4) == undefined){
                    this.cancelTitle = "Cancel Appointment";
                } else {
                    this.cancelTitle = "Undo Cancellation";
                }


            }

        },

        closeCancelSchedule(){

            this.showCancellationModal = false;
        },

        proceedCancellation(reason){
            var self = this;

            this.selectedScheduleResult.forEach(function(sched,index){

                if(sched == self.cancelDetail ){
                    self.inputFields[index].input = sched + ";" + reason;
                } else {
                    self.inputFields[index].input = sched;
                }

            });


            this.showCancellationModal = false;
            this.saveSchedule();

        },

        undoCancellation(){
            var self = this;

            this.selectedScheduleResult.forEach(function(sched,index){

                if(sched == self.cancelDetail ){
                    let lastIndex = sched.lastIndexOf(";");
                    self.inputFields[index].input = sched.slice(0,lastIndex+1).slice(0,-1);
                } else {
                    self.inputFields[index].input = sched;
                }

            });

            
            this.saveSchedule();
            this.showCancellationModal = false;
        },

        updateSchedule(){

            this.timeScheduleError = validateInputSelectedTime(this.inputFields, this.computedInput);

            if(this.timeScheduleError == "" && this.patientName.error == "" && this.patientContactNumber.error == ""
                    && this.patientProcedure.error == ""){

                this.saveSchedule();
                
            }

        },

        saveSchedule(){

            var self = this;

            axios.post( '../php/api/saveSchedule.php',{

                date_of_appointment : this.dateSchedule,
                dentist_id : this.selectedDentist,
                procedure : this.patientProcedure.value,
                patient_name : this.patientName.value,
                contact_number : this.patientContactNumber.value,
                input_field : this.inputFields
                
            }).then(function(response){
                
                console.log(response.data);
                console.log(self.inputFields);
                alert("Successfully saved appointment");

                self.closeUpdateScheduleModal();
                self.$emit("update-schedule");

            })
            .catch(function(error){
                alert(error);
            });

        },

        fillInput(index){

            console.log(this.originalInputFields);
            this.selectedIndex = index;

            if( this.inputFields[index].checkbox == true){

                

                if(this.inputFields[index].input != this.computedInput){

                    event.preventDefault();
                    
                    
                } else {

                    this.inputFields[index].input = this.originalInputFields[index].input;

                }

            } 
            else{

                if(this.originalInputFields[index].input != ''){

                    event.preventDefault();
                    this.isOpenModalMessage = true;
                    this.isModalConfirmation = true;
                    this.modalMessage = "This will overwrite the time schedule of other patient. Are you sure you want to continue?";
                    
                }
                else{

                   this.inputFields[index].input = this.computedInput;

                }

            } 
        
        },

        closeModal(){
            this.isOpenModalMessage = false;
        },

        overwriteConfirmed(){
            this.inputFields[this.selectedIndex].input = this.computedInput;
            this.inputFields[this.selectedIndex].checkbox = true;
            this.closeModal();
        },

        resetSchedule(){

            var self = this;

            this.selectedScheduleResult.forEach(function(sched,index){

                self.inputFields[index].input = sched;
                self.inputFields[index].checkbox = false;

                self.originalInputFields[index].input = sched;
                self.originalInputFields[index].checkbox = false;
            });

        },

        checkIfCancelled(data){
            let retVal = false;

            if(this.schedDetail(data,4) == "N") retVal = true;

            return  retVal;
        },

        //return the specific needs
        schedDetail(detail, ctr){

            return detail.split(";")[ctr];

        },

        selectPatient(){

            this.resetSchedule();
            if(this.patient != null){
                if(this.patient.id != "0"){

                    this.showNewPatient = false;

                    if(this.patient.mobile_no != "") this.patientContactNumber.value = "0" + this.patient.mobile_no;
                    this.patientName.value = this.patient.patient_name;

                } else {

                    this.patientContactNumber.value = "";
                    this.patientName.value = "";

                    this.showNewPatient = true;
                }
            } else {
                this.patientContactNumber.value = "";
                this.patientName.value = "";

                this.showNewPatient = true;
            }

        },

        recreateTitle(procedure, number){

            if(number != null)
                return "Procedure : " + procedure + " | Contact Number : " + number;
            else return "Procedure : " + procedure + " | Contact Number : Not Available";

        },

        openAddScheduleModal(selectedDentist, selectedScheduleResult){

            this.showUpdateScheduleModal = true;
            this.selectedDentist = selectedDentist;
            this.selectedScheduleResult = selectedScheduleResult;
            this.resetSchedule();
            
 
        },

        closeUpdateScheduleModal(){

            this.patientName.value = "";
            this.patientName.error = "";
            this.patient = null;
            this.patientContactNumber.value = "";
            this.patientContactNumber.error = "";
            this.patientProcedure.value = "";
            this.patientProcedure.error = "";
            this.selectedScheduleResult = [];
            this.showUpdateScheduleModal = false;

        },

        validatePatientName(){
           this.patientName.error =  validatePatientName(this.patientName.value);
           this.resetSchedule();
        },

        validateProcedure(){

            this.patientProcedure.error = validateProcedure(this.patientProcedure.value);
            this.resetSchedule();
        },

        validateContactNumber(){

            this.patientContactNumber.error = validateContactNumber(this.patientContactNumber.value);
            this.resetSchedule();

        }
        
	},

    computed : {

        disableCheckbox(){
            let retVal = false;


            if(this.patient == null){
                if(this.patientContactNumber.value  == '' || this.patientProcedure.value == '') retVal = true
            }
            else {
                if(this.patientName.value == '' || this.patientContactNumber.value  == '' || this.patientProcedure.value == '') retVal = true;
            }

            return retVal;

        },

        computedInput(){

            let newCtr = "N";

            if(this.patient != null){ 
                if(this.patient.id != 0) newCtr = "X"; // not new
            }

            return this.patientName.value+";"+this.patientContactNumber.value+";"+this.patientProcedure.value+";"+newCtr;

        },

        dummyTimeSchedule(){

            return this.inputFields.filter(inputField =>{
                inputField.checkbox == true;
            });
        }
    }



});

function convertCheckbox(data){
    let retVal = false;

    if(data != null){
        if(data != "") retVal = true;
    }

    return retVal
}

function validatePatientName(data){

    let retVal = "";
    if(data != ""){
        if (! /^[a-zA-ZÑñ-\s]+$/.test(data)) {
            retVal = "Invalid character found. Please check!";
        }
    } else {
        retVal = "Please provide the patient name.";
    }

    return retVal;
}

function validateProcedure(data){

    let retVal = "";
    if(data != ""){
        if (! /^[a-zA-ZÑñ0-9(),.\-\s]+$/.test(data)) {
            retVal = "Invalid character found. Please check!";
        }
    } else {
        retVal = "Please provide the patient name.";
    }

    return retVal;
}

function validateContactNumber(data){

    let retVal = "";
    if(data != ""){
        if (! /^[0-9]+$/.test(data)) {
            retVal = "Invalid character found. Please check!";
        } else {
            if(!(data.length == 7 || data.length == 11)){
                retVal = "Contact number should be 7 or 11 digit number. Please check!";
            }
        }
    } else {
        retVal = "Please provide the patient name.";
    }

    return retVal;
}

function validateInputSelectedTime(inputList,computedInput){

    let retVal = "";

    let inputCount = 0;
    let pIndex = -1;
    inputList.forEach(function(input,index){

        if(input.input == computedInput){
            inputCount++;

            if(inputCount != 1){
                if((pIndex - index) != -1) retVal = "Time of schedule should be in sequence.";
            }

            pIndex = index;
        }

        

    });

    if(inputCount == 0) retVal = "Please select time of schedule.";

    return retVal;

}