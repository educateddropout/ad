Vue.component('treatmentUpdateModal', {
	props: ['userData', 'patientId', "dentistsLibrary"],
	template: `
		
        <div id="modal-ter" class="modal" :class="{ 'is-active': openModalUpdate }">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                <p class="modal-card-title">Treatment</p>
                <button class="delete" aria-label="close"  @click="closeModalUpdate()"></button>
                </header>
                <section class="modal-card-body">
                    <div class="content">
                        

                        <div class="row w3-center has-text-success">
                           
                        </div>

                        <br>

                        <div class="w3-row-padding">
                            <div class="w3-half">
                                <strong>Treatment Date:</strong>
                                <div class="field has-addons is-paddingless is-marginless">
                                    <span class="control">
                                        <a class="button is-static">
                                            <i class="fas fa-calendar"></i>
                                        </a>
                                    </span>
                                    <span class="control is-expanded">
                                        <input class="input"  :class="{ 'is-danger': treatment_date_validation_message_update != '' }" type="date" v-model="treatment_date_update">
                                    </span>
                                </div>
                                <p class="help has-text-danger">{{treatment_date_validation_message_update}}</p>
                            </div>
                            <div class="w3-half">
                                <strong>Tooth No./s:</strong>
                                <div class="field has-addons is-paddingless is-marginless">

                                    <span class="control">
                                        <a class="button is-static">
                                            <i class="fas fa-tooth"></i>
                                        </a>
                                    </span>

                                    <span class="control is-expanded">
                                        <input class="input" type="text" v-model="tooth_nos_update">
                                    </span>
                                    
                                </div>
                            </div>
                        </div>

                        <div class="w3-row-padding">
                            <div class="w3-row-padding">
                                <strong>Dentist:</strong>
                                <div class="field has-addons is-paddingless is-marginless">
                                    <p class="control">
                                        <a class="button is-static">
                                            <i class="fas fa-user-md"></i>
                                        </a>
                                        <p class="control is-expanded">
                                            <div class="select is-fullwidth">
                                                <div class="select is-fullwidth">
                                                    <select v-model="treatment_dentist_update" :class="{ 'is-danger': treatment_dentist_validation_message_update != '' }">
                                                        <option value="-1" disabled>Please select dentist</option>
                                                        <option v-for="dentist in dentistsLibrary" :value="dentist.id"> {{dentist.name}}
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>
                                        </p>
                                    </p>
                                </div>
                                <p class="help has-text-danger">{{treatment_dentist_validation_message_update}}</p>
                            </div>
                        </div>

                        <div class="w3-row-padding">
                            <div class="w3-row-padding">
                                <strong>Procedure:</strong>
                                <div class="field ">
                                    <span class="control">
                                            <textarea class="textarea" v-model="procedure_update" @keyup="procedure_update = procedure_update.toUpperCase()"></textarea>

                                    
                                    </span>

                                </div>
                                <p class="help has-text-danger">{{treatment_procedure_validation_message_update}}</p>
                            </div>
                        </div>

                        <div class="w3-row-padding ">
                            <div class="w3-half">
                                <strong>Amount Charge:</strong>
                                <div class="field has-addons is-paddingless is-marginless">

                                    <span class="control">
                                        <a class="button is-static">
                                            &#8369;
                                        </a>
                                    </span>
                                    <span class="control is-expanded">
                                        <input class="input has-text-info" type="text" v-model="treatment_amount_update" >
                                    </span>
                                    
                                </div>
                                <p class="help has-text-danger">{{treatment_amount_validation_message_update}}</p>
                            </div>

                            <div class="w3-half">
                                <strong>Dentist Percentage:</strong>
                                <div class="field has-addons is-paddingless is-marginless">
                                    <span class="control">
                                        <a class="button is-static">
                                            %
                                        </a>
                                    </span>
                                    <span class="control is-expanded">
                                        <input class="input has-text-info" type="text" v-model="dentist_percentage_update" maxlength="2">
                                    </span>
                                    
                                </div>
                                <p class="help has-text-danger">{{treatment_percentage_validation_message_update}}</p>
                            </div>
                        </div>

                        <div class="w3-row-padding ">
                            <div class="w3-half">
                                <strong>Laboratory Fee:</strong>
                                <div class="field has-addons is-paddingless is-marginless">
                                    <span class="control">
                                        <a class="button is-static">
                                            &#8369;
                                        </a>
                                    </span>
                                    <span class="control is-expanded">
                                        <input class="input has-text-info" type="text" v-model="laboratory_fee_update" >
                                    </span>
                                    
                                </div>
                                <p class="help has-text-danger">{{treatment_lab_fee_validation_message_update}}</p>
                            </div>

                           
                        </div>

                        <br>
                        
                        <div class="w3-row-padding">
                            <div class="w3-row-padding">
                                <div class="w3-row w3-border-top">
                                    <br>
                                    <button class="button is-success is-outlined w3-right" @click="updateTreatmentRecord()"><i class="fas fa-edit"></i>&nbsp Update</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>
                <footer class="modal-card-foot ">
                    <button class="button is-danger " @click="closeModalUpdate()">Cancel</button>
                </footer>
            </div>
        </div>
    

	`,

	data() {

		return {

            openModalUpdate : false,

            //Treatment- Records Update
            treatment_date_update: "",
            tooth_nos_update : "",
            procedure_update : "",
            treatment_dentist_update: -1,
            treatment_amount_update: 0,
            dentist_percentage_update: 0,
            laboratory_fee_update: 0,
            treatment_id: 0,

            // validation messages
            treatment_date_validation_message_update : "",
            treatment_dentist_validation_message_update : "",
            treatment_procedure_validation_message_update : "",
            treatment_amount_validation_message_update : "",
            treatment_percentage_validation_message_update : "",
            treatment_lab_fee_validation_message_update : ""

		}

	},

	methods : {

        closeModalUpdate(){

            this.openModalUpdate = false;
            this.$emit('unselect-table-row');
            
        },

		openModalTreatmentUpdate(treatment){

            this.openModalUpdate = true;
            console.log(treatment);

            this.treatment_date_update = treatment.treatment_date;
            this.tooth_nos_update = treatment.tooth;
            this.procedure_update = treatment.treatment;
            this.treatment_dentist_update = treatment.dentist_id;
            this.treatment_amount_update = treatment.treatment_amount;
            this.dentist_percentage_update = treatment.dentist_percentage;
            this.laboratory_fee_update = treatment.laboratory_fee;
            this.treatment_id = treatment.id

        },

        updateTreatmentRecord(){

            let self = this;

            this.treatment_date_validation_message_update = validateTreatmentDate(this.treatment_date_update);
            this.treatment_dentist_validation_message_update =  validateTreatmentDentist(this.treatment_dentist_update)
            this.treatment_procedure_validation_message_update = validateTreatmentProcedure(this.procedure_update)
            this.treatment_amount_validation_message_update = validateTreatmentAmountCharge(this.treatment_amount_update);
            this.treatment_percentage_validation_message_update = validateTreatmentDentistPercentage(this.dentist_percentage_update);
            this.treatment_lab_fee_validation_message_update = validateTreatmentLabFee(this.laboratory_fee_update);

            if(this.treatment_date_validation_message_update == "" && this.treatment_dentist_validation_message_update == "" && this.treatment_procedure_validation_message_update == "" &&
                this.treatment_amount_validation_message_update == "" && this.treatment_percentage_validation_message_update == "" && this.treatment_lab_fee_validation_message_update == ""){
                
                axios.post('../php/api/updateTreatmentRecord.php',{
                    
                    patient_id : this.patientId,
                    treatment_date: this.treatment_date_update,
                    tooth_nos : this.tooth_nos_update,
                    procedure : this.procedure_update,
                    treatment_amount : this.treatment_amount_update,
                    treatment_dentist: this.treatment_dentist_update,
                    dentist_percentage : this.dentist_percentage_update,
                    laboratory_fee : this.laboratory_fee_update,
                    treatment_id : this.treatment_id
                    
                })
                .then(function (response){
                    
                    console.log(response.data);

                    self.closeModalUpdate();

                    self.$emit('update-treatment-records');
                    
                })
                .catch(function (error) {
                    console.log(error);
                });
            }

        },

	},

	computed : {

		

	}

});