Vue.component('paymentModal', {
	props: ['userData', 'patientId', "dentistsLibrary", 'paymentTypeLibrary'],
	template: `
        <div class="modal " :class="{ 'is-active' : openModal }">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                <p class="modal-card-title">Add Payment</p>
                <button class="delete" aria-label="close"  @click="closeModalForPayment()"></button>
                </header>
                <section class="modal-card-body">
                    <div class="content">
                        

                        <div class="row w3-center has-text-success">
                           
                        </div>

                        <br>

                        <div class="w3-row-padding">
                            <div class="w3-half">
                                <strong>Treatment Date:</strong>
                                <div class="field has-addons">
                                    <p class="control">
                                        <a class="button is-static">
                                            <i class="fas fa-calendar"></i>
                                        </a>
                                        <p class="control is-expanded">
                                            <input class="input" type="date" v-model="treatment_date_for_payment" disabled>
                                        </p>
                                    </p>
                                </div>

                            </div>
                            <div class="w3-half">
                                <strong>Tooth No./s:</strong>
                                <div class="field has-addons">
                                    <p class="control">
                                        <a class="button is-static">
                                            <i class="fas fa-tooth"></i>
                                        </a>
                                        <p class="control is-expanded">
                                            <input class="input" type="text" v-model="tooth_nos_for_payment" disabled>
                                        </p>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div class="w3-row-padding">
                            <div class="w3-row-padding">
                                <strong>Dentist:</strong>
                                <div class="field has-addons">
                                    <p class="control">
                                        <a class="button is-static">
                                            <i class="fas fa-user-md"></i>
                                        </a>
                                        <p class="control is-expanded">
                                            <div class="select is-fullwidth">
                                                <div class="select is-fullwidth">
                                                    <select v-model="treatment_dentist_for_payment" disabled>
                                                        <option value="-1" disabled>Please select dentist</option>
                                                        <option v-for="dentist in dentistsLibrary" :value="dentist.id"> {{dentist.name}}
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>
                                        </p>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div class="w3-row-padding">
                            <div class="w3-row-padding">
                                <strong>Procedure:</strong>
                                <div class="field has-addons">
                                    <p class="control">
                                        <p class="control is-expanded">
                                            <textarea class="textarea" v-model="procedure_for_payment" rows="2" disabled></textarea>
                                        </p>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div class="w3-row-padding ">
                            <div class="w3-half">
                                <strong>Amount Charge:</strong>
                                <div class="field has-addons">
                                    <p class="control">
                                        <a class="button is-static">
                                            &#8369;
                                        </a>
                                        <p class="control is-expanded">
                                            <input class="input has-text-info" type="text" v-model="treatment_amount_for_payment" disabled>
                                        </p>
                                    </p>
                                </div>
                            </div>
                            <div class="w3-half">
                                <strong>Balance:</strong>
                                <div class="field has-addons">
                                    <p class="control">
                                        <a class="button is-static">
                                            &#8369;
                                        </a>
                                        <p class="control is-expanded" v-if="balance_for_payment != 0">
                                            <input class="input has-text-danger" type="text" v-model="balance_for_payment" disabled>
                                        </p>
                                         <p class="control is-expanded" v-else="">
                                            <input class="input has-text-success" type="text" v-model="balance_for_payment" disabled>
                                        </p>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <br>


                        
                        <div class="w3-row">
                            <div class="w3-row">
                                <div class="w3-row w3-border-top">
                                    <br>
                                    <div class="w3-row-padding ">
                                        <div class="w3-half">
                                            <strong>Payment Date</strong>
                                            <div class="field has-addons">
                                                <span class="control">

                                                    <a class="button is-static">
                                                        <i class="fas fa-calendar"></i>
                                                    </a>

                                                </span>

                                                <span class="control is-expanded">
                                                    <input class="input" :class="{ 'is-danger': payment_date_validation_message != '' }" type="date" v-model="payment_date">
                                                </span>

                                                
                                            </div>
                                            <p class="help has-text-danger">{{payment_date_validation_message}}</p>
                                        </div>

                                        <div class="w3-half">
                                            <strong>Payment</strong>
                                            <div class="field has-addons">
                                                <span class="control">
                                                    <a class="button is-static">
                                                        &#8369;
                                                    </a>
                                                </span>
                                                <span class="control is-expanded ">
                                                    <input class="input has-text-info" :class="{ 'is-danger': payment_amount_validation_message != '' }" type="text" v-model="payment_amount" >
                                                </span>
                                                
                                            </div>
                                            <p class="help has-text-danger">{{payment_amount_validation_message}}</p>
                                        </div>

                                    </div>
                                    <br>
                                    <div class="w3-row-padding ">
                                        
                                        <div class="w3-half">
                                            <strong>Payment Type</strong>
                                            <div class="select is-fullwidth">
                                                <div class="select is-fullwidth" :class="{ 'is-danger': payment_type_validation_message != '' }">
                                                    <select v-model="payment_type" @change="fillUpPercentage()">

                                                        <option value="-1" disabled>Please select payment type</option>
                                                        <option v-for="paymentType in paymentTypeLibrary" :value="paymentType.id" >{{paymentType.name}}</option>
    
                                                    </select>
                                                </div>
                                            </div>
                                            <p class="help has-text-danger">{{payment_type_validation_message}}</p>
                                        </div>

                                        <div class="w3-half">
                                            <strong>Payment Type Percentage</strong>
                                            <div class="field has-addons">
                                                <span class="control">
                                                    <a class="button is-static">
                                                        %
                                                    </a>
                                                </span>
                                                <span class="control is-expanded ">
                                                    <input class="input has-text-info" type="text" v-model="payment_percentage" readonly>
                                                </span>
                                                
                                            </div>
                                        </div>

                                    </div>
                                    <br>
                                    <div class="w3-row-padding ">
                                        <button class="button is-success is-outlined w3-right" @click="addPayment()"><i class="fas fa-cash-register"></i>&nbsp Proceed Payment</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>
            </div>
        </div>

	`,

	data() {

		return {

            openModal : false,

            //Treatment- Records Payment
            treatment_date_for_payment: "",
            tooth_nos_for_payment : "",
            procedure_for_payment : "",
            treatment_dentist_for_payment: -1,
            treatment_amount_for_payment: 0,
            balance_for_payment: 0,
            payment_amount : "",
            payment_type: -1,
            payment_date: "",
            treatment_id : "",
            payment_percentage : "",

            // validation messages
            payment_date_validation_message : "",
            payment_amount_validation_message : "",
            payment_type_validation_message : ""

		}

	},

	methods : {

        fillUpPercentage(){

            this.payment_percentage = this.paymentTypeLibrary[this.payment_type].percentage;

        },

        closeModalForPayment(){

            this.openModal = false;
            this.$emit('unselect-table-row');

            this.payment_amount = "";
            this.payment_type = -1;
            this.payment_date = "";
            this.treatment_id = "";
            this.payment_percentage = "";

            this.payment_date_validation_message = "";
            this.payment_amount_validation_message = "";
            this.payment_type_validation_message = "";

        },

        selectedTreatmentForPayment(treatment){

            if(treatment.payment_diff == 0){
                let confirmation = true;

                confirmation = confirm("This is fully paid. Are you sure you want to add payment?"); 
                
                if(confirmation){
      
                    this.openModal = true;

                    this.treatment_date_for_payment = treatment.treatment_date;
                    this.tooth_nos_for_payment = treatment.tooth;
                    this.procedure_for_payment = treatment.treatment;
                    this.treatment_dentist_for_payment = treatment.dentist_id;
                    this.treatment_amount_for_payment = treatment.treatment_amount;
                    this.balance_for_payment = treatment.payment_diff;
                    this.treatment_id = treatment.id

                }
                else {

                    this.closeModalForPayment();
                }

            }
            else{

                
                this.openModal = true;

                this.treatment_date_for_payment = treatment.treatment_date;
                this.tooth_nos_for_payment = treatment.tooth;
                this.procedure_for_payment = treatment.treatment;
                this.treatment_dentist_for_payment = treatment.dentist_id;
                this.treatment_amount_for_payment = treatment.treatment_amount;

                if(treatment.total_payment == null) this.balance_for_payment = treatment.treatment_amount;
                else this.balance_for_payment = treatment.payment_diff;

    
                this.treatment_id = treatment.id

            }

        },

        openPaymentModal(treatment){

            this.openModal = true;

            this.selectedTreatmentForPayment(treatment);

        },

        addPayment(){

            let self = this;
            
            this.payment_date_validation_message = validatePaymentDate(this.payment_date);
            this.payment_amount_validation_message = validatePaymentAmount(this.payment_amount, this.balance_for_payment, this.treatment_amount_for_payment);
            this.payment_type_validation_message = validatePaymentType(this.payment_type);

             
            if(this.payment_date_validation_message == "" && this.payment_amount_validation_message == "" && this.payment_type_validation_message == ""){

                let confirmation = true;

                if(Number(this.payment_amount) > Number(this.balance_for_payment)){

                    confirmation = confirm("Payment amount is greater than balance. Are you sure you want to proceed payment?");

                }

                if(confirmation == true){

                    axios.post('../php/api/savePayment.php',{
                        
                        patient_id : this.patientId,
                        treatment_id : this.treatment_id,
                        payment_amount: this.payment_amount,
                        payment_type: this.payment_type,
                        payment_date: this.payment_date,
                        payment_percentage : this.payment_percentage

                        
                    })
                    .then(function (response){
                        
                        console.log(response.data);

                        self.closeModalForPayment();

                        self.$emit('update-payment-records');
                        self.$emit('update-treatment-records');

                        //alert("Successfully saved record");

                        //window.location.replace("patient-treatment-records.php?id=" + pi.urlData);
                        
                    })
                    .catch(function (error) {
                        console.log(error);

                    });

                }

            }

        }

        
	}

});