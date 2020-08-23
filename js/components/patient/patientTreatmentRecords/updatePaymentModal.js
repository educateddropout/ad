Vue.component('updatePaymentModal', {
	props: ['userData', 'patientId', 'paymentTypeLibrary'],
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

                        <div class="w3-row">
                            <div class="w3-row">
                                <div class="w3-row ">
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
                                        <button class="button is-success is-outlined w3-right" @click="updatePayment()"><i class="fas fa-cash-register"></i>&nbsp Proceed Payment</button>
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
            this.$emit('unselect-payment-table-row');

            this.payment_amount = "";
            this.payment_type = -1;
            this.payment_date = "";
            this.payment_id = "";
            this.payment_percentage = "";

            this.payment_date_validation_message = "";
            this.payment_amount_validation_message = "";
            this.payment_type_validation_message = "";

        },

        selectedPaymentToUpdate(payment){

        	this.payment_amount = payment.payment;
            this.payment_type = payment.payment_type_id;
            this.payment_date = payment.payment_date;
            this.payment_percentage = payment.payment_percentage;

            this.payment_id = payment.id;

        },

        openUpdatePaymentModal(payment){

            this.openModal = true;

            this.selectedPaymentToUpdate(payment);

        },

        updatePayment(){

            let self = this;

            this.payment_date_validation_message = validatePaymentDate(this.payment_date);
            this.payment_amount_validation_message = validatePaymentAmount(this.payment_amount);
            this.payment_type_validation_message = validatePaymentType(this.payment_type);

             
            if(this.payment_date_validation_message == "" && this.payment_amount_validation_message == "" && this.payment_type_validation_message == ""){

                let confirmation = true;

                if(Number(this.payment_amount) > Number(this.balance_for_payment)){

                    confirmation = confirm("Payment amount is greater than balance. Are you sure you want to proceed payment?");

                }

                if(confirmation == true){

                    axios.post('../php/api/updatePayment.php',{
                        
                        payment_id : this.payment_id,
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