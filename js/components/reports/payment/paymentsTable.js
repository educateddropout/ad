Vue.component('paymentsTable', {
	props: ['userData','dentistCheck', 'dentistsLibrary', 'paymentTypeLibrary', 'paymentTypeCheck', 'miscExpenses', 'cashDenomination', 'isPrintCashDenomination'],
	template: `
		<div class="row">
            <div class="w3-row " style="overflow-x:auto;">
            <table class="table w3-border is-fullwidth" >
                <thead>
                    <tr>
                        <th class="w3-center has-background-dark has-text-white-ter" colspan="11">Payment Records</th>
                    </tr>
                    <tr>
                        <th class="w3-center has-background-grey-lighter" colspan="11">{{selectedDateLabel}}</th>
                    </tr>
                    <tr>
                        <th>&nbsp</th>
                        <th><i class="fas fa-calendar"></i>&nbsp Payment Date</th>
                        <th><abbr title="Patient Name"><i class="fas fa-user-tag"></i></abbr></th>
                        <th>Procedure</th>
                        <th><abbr title="Dentist Attended"><i class="fas fa-user-md"></i></abbr></th>
                        <th><i class="fas fa-calendar"></i>&nbsp Treatment Date</th>
                        <th>Payment Type</th>
                        <th>Payment</th>
                        <th>Payment Fee</th>
                        <th class="w3-border-right">&nbsp</th>
                    </tr>
                    <tr class="has-background-white-ter">
                        <th class="w3-border-right"></th>
                        <th>&nbsp</th>
                        <th>&nbsp</th>
                        <th>&nbsp</th>
                        <th>&nbsp</th>
                        <th>&nbsp</th>
                        <th>Total:</th>
                        <th class="has-text-success">&#8369;{{convertMoney(total_payments)}}</th>
                        <th class="has-text-danger">&#8369;{{convertMoney2(total_payments_fee)}}</th>
                        <th>&nbsp</th>
                    </tr>
                    
                </thead>
                <tfoot>
                    <tr class="has-background-white-ter">
                        <th class="w3-border-right"></th>
                        <th>&nbsp</th>
                        <th>&nbsp</th>
                        <th>&nbsp</th>
                        <th>&nbsp</th>
                        <th>&nbsp</th>
                        <th>Total:</th>
                        <th class="has-text-success">&#8369;{{convertMoney(total_payments)}}</th>
                        <th class="has-text-danger">&#8369;{{convertMoney2(total_payments_fee)}}</th>
                        <th>&nbsp</th>
                    </tr>
                </tfoot>

                <tbody>
                    <tr v-for="(payment,index) in filteredPayments" :class="{'w3-pale-green' : payment.is_printed_receipt == 'Y'}">
                        <th class="w3-border-right">{{index+1}}</th>

                        <td>{{payment.payment_date}}</td>
                        
                        <td class="has-text-info"><a @click="redirectToPatientProfile(payment.patient_id)">{{payment.patient_name}}</a></td>

                        <td>{{payment.treatment}}</td>

                        <td>{{payment.dentist_name}}</td>

                        <td>{{payment.treatment_date}}</td>
                        <td>{{payment.payment_type}}</td>

                        <td class="has-text-success w3-border-right" >&#8369;&nbsp{{convertMoney(payment.payment)}}</td>

                        <td class="has-text-danger w3-border-right" >&#8369;&nbsp{{computePaymentTypeFee(payment.payment_percentage, payment.payment)}}</td>
                       
                        <td class="w3-border-right w3-center" @click="printReceipt(payment.id, payment.is_printed_receipt)"><i class="fas fa-receipt"></i></td>
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
	`,
	data() {

		return {

			paymentsLibrary : [],
            selectedDateLabel : "",

            showWarningMessage : false,
            warningMessage : "",

            selectedPaymentId : ""

		}

	},

	methods : {

        redirectToPatientProfile(patientId){

            window.open('patient-treatment-records.html?id=' + patientId);

        },

        computePaymentTypeFee(percentage, payment){

            let paymentTypeFee = Number(payment) * (Number(percentage)/100);

            return String(paymentTypeFee.toFixed(2)).replace(/(.)(?=(\d{3})+$)/g,'$1,');
            
        },

        computeDentistFee(paymentPercentage, payment, dentistPercentage){

            let dentistFee = (Number(payment) - (Number(payment) * (Number(paymentPercentage)/100))) * (Number(dentistPercentage)/100);

            return String(dentistFee.toFixed(2)).replace(/(.)(?=(\d{3})+$)/g,'$1,');
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
                location.reload();
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

        printRecordsToPdf(){
            var self = this;
            let paymentTypeLibrary = [];
            this.paymentTypeLibrary.forEach(function(paymentType,index){
                paymentTypeLibrary[index] = {
                    "type" : paymentType.name,
                    "total" : 0,
                    "percentage" : paymentType.percentage
                };
            });

            this.filteredPayments.forEach(function(payment,index){
                self.paymentTypeLibrary.forEach(function(paymentType,index){
                    if(paymentType.name == payment.payment_type){
                        paymentTypeLibrary[index].total += parseInt(payment.payment);
                    }
                });
            });

            paymentTypeLibrary.forEach(function(paymentType,index){
                paymentTypeLibrary[index] = {
                    "type" : paymentType.type,
                    "total" : paymentType.total,
                    "percentage" : paymentType.percentage,
                    "deductions" : paymentType.total*(paymentType.percentage/100)
                };
            });

            axios.post('../php/api/printPdfPaymentRecords.php', {
                records : this.filteredPayments,
                total_net : this.total_net,
                total_payments : this.total_payments,
                total_payments_fee : this.total_payments_fee,
                total_dentist_fee : this.total_dentist_fee,
                selected_date_label : this.selectedDateLabel,
                payment_type : paymentTypeLibrary,
                misc_expenses : this.miscExpenses,
                total_misc_cash : this.total_misc_cash,
                total_misc_cheque : this.total_misc_cheque,
                cash_denomination : this.cashDenomination,
                print_cash_denomination : this.isPrintCashDenomination

            })
            .then(function (response){

                console.log(response);
                window.open('../php/pdf/paymentRecords.pdf','_newtab');

            })
            .catch(function (error) {
                alert(error);
            });

        },

        convertMoney(n){

            return String(n).replace(/(.)(?=(\d{3})+$)/g,'$1,') + ".00";

        },

        convertMoney2(total_amount){

            total_amount = total_amount.toFixed(2);

            let centavo = total_amount.substring(total_amount.length - 2, total_amount.length);
            let peso = total_amount.substring(0, total_amount.length - 3);

            return String(peso).replace(/(.)(?=(\d{3})+$)/g,'$1,') + "." + centavo;


        },

        copyListOfTreatments(paymentsLibrary,selectedDateLabel){

            this.selectedDateLabel = selectedDateLabel;
            this.paymentsLibrary = paymentsLibrary;

        },
        

        filterByDentist(dentist_name){

            let ans = false;

            for (let i = 0; i < this.dentistsLibrary.length; i++) {

                if(this.dentistCheck.id[i] == true){

                    if(this.dentistsLibrary[i].name == dentist_name){
                        ans = true;
                    }


                }

            }

            return ans;
        },

        filterByPaymentType(payment_type){

            let ans = false;

            for (let i = 0; i < this.paymentTypeLibrary.length; i++) {

                if(this.paymentTypeCheck.id[i] == true){

                    if(this.paymentTypeLibrary[i].name == payment_type){
                        ans = true;
                    }


                }

            }

            return ans;
        }

	},

    computed : {

        filteredPayments(){

            return this.paymentsLibrary.filter(payment => {

                return this.filterByDentist(payment.dentist_name) && this.filterByPaymentType(payment.payment_type);

            });
            
        },

        total_misc_cash(){

            let total_amount =  0;
            this.miscExpenses.forEach(function (misc) {
                
                if(misc.payment_type == 1) total_amount += Number(misc.amount);

            });

            return total_amount.toFixed(2);

        },

        total_misc_cheque(){

            let total_amount =  0;
            this.miscExpenses.forEach(function (misc) {
                
                if(misc.payment_type == 2) total_amount += Number(misc.amount);

            });

            return total_amount.toFixed(2);

        },

        total_payments(){

            
            let total_amount =  this.filteredPayments.reduce(function (accumulator, payment) {
                return accumulator + Number(payment.payment);
            }, 0);

            return total_amount;

        },

        total_payments_fee(){

            
            let total_amount =  this.filteredPayments.reduce(function (accumulator, payment) {
                return accumulator + Number((Number(payment.payment) * (Number(payment.payment_percentage)/100)).toFixed(2));
            }, 0);

            return total_amount
        },

        total_dentist_fee(){

            
            let total_amount =  this.filteredPayments.reduce(function (accumulator, payment) {

                return accumulator + Number(((Number(payment.payment) - (Number(payment.payment) * (Number(payment.payment_percentage)/100))) * (Number(payment.dentist_percentage)/100)).toFixed(2));
            
            }, 0);

            return total_amount;

        },

        total_net(){

            return (this.total_payments - this.total_payments_fee) - this.total_dentist_fee;

        }
        
    }



});