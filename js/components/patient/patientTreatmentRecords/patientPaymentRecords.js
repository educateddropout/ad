Vue.component('patientPaymentRecords', {
	props: ['userData', 'patientId'],
	template: `
		<div class="row">
            <div class="column is-10 is-offset-1">
                <div class="w3-row " style="overflow-x:auto;">
                <table class="table w3-border is-fullwidth" >
                    <thead>
                        <tr>
                            <th class="w3-center w3-xlarge has-background-dark has-text-white-ter" colspan="12">Payment Records</th>
                        </tr>
                        <tr class="has-background-grey-lighter">
                            <th>&nbsp</th>
                            <th><i class="fas fa-calendar "></i>&nbsp Payment Date</th>
                            <th><abbr title="Dentist Attended"><i class="fas fa-user-md"></i></abbr></th>
                            <th>Procedure</th>
                            <th><i class="fas fa-calendar"></i>&nbsp Treatment Date</th>
                            <th>Payment Type</th>
                            <th>Payment</th>
                            <th class="">&nbsp</th>
                            <th class="">&nbsp</th>
                            <th class="w3-border-right">&nbsp</th>
                        </tr>
                        
                    </thead>
                    <tfoot>
                    </tfoot>
                    <tbody>
                        <tr v-for="(payment,index) in paymentsLibrary" 
                                :class="{'is-selected': (index == selectedRow), 'w3-pale-green' : payment.is_printed_receipt == 'Y'}">
                            <th class="w3-border-right">{{index+1}}</th>

                            <td>{{payment.payment_date}}</td>

                            <td v-if="userData.userType == 3 || userData.userType == 1 || userData.userId == payment.dentist_id">{{payment.dentist_name}}</td>
                            <td v-else="">&nbsp</td>

                            <td>{{payment.treatment}}</td>
                            <td>{{payment.treatment_date}}</td>
                            <td>{{payment.payment_type}}</td>

                            <td class="has-text-success" v-if="payment.payment  != null">&#8369;{{payment.payment}}</td>
                            <td class="has-text-danger" v-else>&#8369;</td>
                        
                            <td class="w3-border-left w3-border-right" :class="{'w3-text-brown' : payment.is_printed_receipt == 'N'}" @click="selectedPaymentUpdate(payment,index)"><abbr title="Update Payment Record"><i class="far fa-edit"></i></abbr></td>
                            
                            <td class="w3-border-left w3-border-right has-text-dark" @click="printReceipt(payment.id, payment.is_printed_receipt)"><abbr title="Print Payment Receipt"><i class="fas fa-receipt"></i></abbr></td>
                            
                            <td class="w3-border-left w3-border-right has-text-dark" @click="deletePayment(payment.id, index)"><abbr title="Delete Payment"><i class="far fa-trash-alt has-text-danger"></i></abbr></td>

                        </tr>

                    </tbody>
                </table>
                </div>

                <modal-message
                    :is-active = "showWarningMessage"
                    :message = "warningMessage"
                    :is-confirmation = "true"
                    @close-modal = "closeWarningMessage"
                    @is-confirmed = "confirmedPrintReceipt"

                >
                </modal-message>
            </div>
        </div>
	`,

	data() {

		return {

			paymentsLibrary : [],
			selectedRow : -1,

            showWarningMessage : false,
            warningMessage : "",

            selectedPaymentId : ""


		}

	},

	created (){

		this.getListOfPayments();

	},

	methods : {

        getListOfPayments(){

            let self = this;

            //list of payments
            axios.post('../php/api/listOfPayments.php',{
                patient_id : this.patientId
            })
            .then(function (response){
                
                console.log(response.data);
                self.paymentsLibrary = response.data.list_of_payments;
                
            })
            .catch(function (error) {
                console.log(error);
            });

        },

        selectedPaymentUpdate(payment,index){

            if(this.userData.userType == "3" || (this.userData.userType == "1" && payment.is_printed_receipt == "N")){
                this.selectedRow = index;
                this.$emit('open-update-payment-modal',payment);
            }

        },

        deletePayment(paymentId,index){

            this.selectedRow = index;
            this.$emit('open-delete-payment',paymentId);

        },

        printReceipt(paymentId, isPrintedReceipt){

            this.selectedPaymentId = paymentId;

            if(isPrintedReceipt == "Y"){
                this.callPrintReceipt();
            } else {
                this.showWarningMessage = true;
                this.warningMessage = "You can no longer edit this payment after printing the receipt. Do you want to continue?";
            }

        },

        callPrintReceipt(){

            var self = this;

            axios.post('../php/api/printReceipt.php', {
                payment_id : this.selectedPaymentId,
            })
            .then(function (response){

                console.log(response);
                self.getListOfPayments();
                window.open('../php/pdf/receipt.pdf','_newtab');

            })
            .catch(function (error) {
                alert(error);
            });

        },

        confirmedPrintReceipt(){

            this.showWarningMessage = false;
            this.callPrintReceipt();

        },

        closeWarningMessage(){
            
            this.showWarningMessage = false;

        },

        unSelectPaymentTableRow(){

            this.selectedRow = -1;

        }

	},

	computed : {

	}

});