Vue.component('treatmentsTable', {
	props: ['userData'],
	template: `
		<div class="row">
                        
                <div class="w3-row " style="overflow-x:auto;">
                <table class="table w3-border is-fullwidth" >

                    <thead>
                        <tr>
                            <th class="w3-center has-background-dark has-text-white-ter" colspan="13">Treatment Records</th>
                        </tr>
                        <tr>
                            <th class="w3-center has-background-grey-lighter" colspan="13">{{selectedDateLabel}}</th>
                        </tr>
                        <tr>
                            <th>&nbsp</th>
                            <th><abbr title="Treatment Date"><i class="fas fa-calendar"></i></abbr></th>
                            <th>Patient Name</th>
                            <th><abbr title="Tooth Numbers"><i class="fas fa-tooth"></i></abbr></th>
                            <th><abbr title="Dentist Attended"><i class="fas fa-user-md"></i></abbr></th>
                            <th>Procedure</th>
                            <th>Amount Charge</th>
                            <th>Balance</th>
                            <th>Dentist Percentage</th> 
                            <th>Laboratory Fee</th>
                            <th>Payment</th>
                            <th>Payment Fees</th>
                            <th>Dentist Fee</th>
                        </tr>
                        <tr class="has-background-white-ter">
                            <th class="w3-border-right"></th>
                            <th class="w3-right-align w3-border-right" colspan="2">Total Net</th>
                            <th class="w3-left-align w3-border-right has-text-success" colspan="2">&#8369;{{totalNet.toLocaleString()}}</th>
                            <th class="w3-right-align w3-border-right">Total</th>
                            <th>&#8369;{{total_amount_charge}}</th>
                            <th class="has-text-danger" >&#8369;{{(total_amount_charge - total_payments).toLocaleString()}}</th>
                            <th>&nbsp</th>
                            <th>&#8369;{{total_laboratory_fee}}</th>
                            <th class="has-text-success">&#8369;{{total_payments.toLocaleString()}}</th>
                            <th class="has-text-danger">&#8369;{{total_payment_fees.toLocaleString()}}</th>    
                            <th class="has-text-danger">&#8369;{{total_dentist_fees.toLocaleString()}}</th>
                        </tr>
                    </thead>
                    <tfoot>
                        <tr>
                            <th class="w3-border-right"></th>
                            <th class="w3-right-align w3-border-right" colspan="2">Total Net</th>
                            <th class="w3-left-align w3-border-right has-text-success" colspan="2">&#8369;{{totalNet.toLocaleString()}}</th>
                            <th class="w3-right-align w3-border-right">Total</th>
                            <th>&#8369;{{total_amount_charge}}</th>
                            <th class="has-text-danger" >&#8369;{{(total_amount_charge - total_payments).toLocaleString()}}</th>
                            <th>&nbsp</th>
                            <th>&#8369;{{total_laboratory_fee}}</th>
                            <th class="has-text-success">&#8369;{{total_payments.toLocaleString()}}</th>
                            <th class="has-text-danger">&#8369;{{total_payment_fees.toLocaleString()}}</th>    
                            <th class="has-text-danger">&#8369;{{total_dentist_fees.toLocaleString()}}</th>
                        </tr>
                    </tfoot>
                    <tbody>
                        <tr v-for="(treatment,index) in treatmentsLibrary">
                            <th class="w3-border-right">{{index+1}}</th>
                            <td>{{treatment.treatment_date}}</td>
                            <td class="has-text-info" style="cursor: pointer;" @click="redirectToPatientProfile(treatment.patient_id)">{{treatment.patient_name}}</td>
                            <td>{{treatment.tooth}}</td>
                            <td>{{treatment.dentist_name}}</td>
                            <td>{{treatment.treatment}}</td>
                            <td>&#8369;{{treatment.treatment_amount.toLocaleString()}}</td>

                            <td class="has-text-success" v-if="treatment.payment_diff != null && treatment.payment_diff == 0">&#8369;{{convertMoney(treatment.payment_diff)}}</td>
                            <td class="has-text-info" v-else-if="treatment.payment_diff != null && treatment.payment_diff <= 0">&#8369;{{convertMoney(treatment.payment_diff)}}</td>
                            <td class="has-text-danger" v-else-if="treatment.payment_diff != null && treatment.payment_diff > 0">&#8369;{{convertMoney(treatment.payment_diff)}}</td>
                            <td class="has-text-danger" v-else>&#8369;{{treatment.treatment_amount}}</td>

                            <td v-if="treatment.dentist_percentage != null">{{treatment.dentist_percentage}}%</td>
                            <td v-else>N/A</td>
                            
                            <td>&#8369;{{treatment.laboratory_fee.toLocaleString()}}</td>

                            <td class="has-text-success" v-if="treatment.total_payment  != null">&#8369;{{convertMoney(treatment.total_payment)}}</td>
                            <td class="has-text-danger" v-else>&#8369;0</td>
                            
                            <td class="has-text-danger" v-if="treatment.total_payment_fee  != null">&#8369;{{convertMoney(treatment.total_payment_fee)}}</td>
                            <td class="has-text-danger" v-else>&#8369;0</td>

                            <td class="has-text-danger" >&#8369;{{convertMoney3(computeDentistFee(treatment, index))}}</td>

                        </tr>

                    </tbody>
                </table>
                </div>
        </div>
	`,
	data() {

		return {

			treatmentsLibrary : [],
            selectedDateLabel : "",

		}

	},

	methods : {

        redirectToPatientProfile(patientId){

            window.open('patient-treatment-records.html?id=' + patientId);

        },

        copyListOfTreatments(treatmentsLibrary,selectedDateLabel){

            this.selectedDateLabel = selectedDateLabel;
            this.treatmentsLibrary = treatmentsLibrary;

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

        convertMoney3(total_amount){

            let centavo = total_amount.substring(total_amount.length - 2, total_amount.length);
            let peso = total_amount.substring(0, total_amount.length - 3);

            return String(peso).replace(/(.)(?=(\d{3})+$)/g,'$1,') + "." + centavo;


        },

        computeDentistFee(treatment, index){
            let percentage = Number(treatment.dentist_percentage) > 0 ? Number(treatment.dentist_percentage)/100 : 0;
            let dentistFee = Number(treatment.total_payment) > Number(treatment.laboratory_fee) ? ((treatment.total_payment - treatment.laboratory_fee - treatment.total_payment_fee)*percentage).toFixed(2) : "0.00";

            treatment.dentist_fee = Number(dentistFee);
            this.$set(this.treatmentsLibrary, index, treatment)

            return dentistFee;
        }

	},

    computed : {

        total_amount_charge(){

            
            let total_amount =  this.treatmentsLibrary.reduce(function (accumulator, treatment) {
                return accumulator + Number(treatment.treatment_amount);
            }, 0);

            return total_amount;

        },

        total_payments(){

            
            let total_amount =  this.treatmentsLibrary.reduce(function (accumulator, treatment) {
                return accumulator + Number(treatment.total_payment);
            }, 0);

            return total_amount;

        },

        total_balance(){

            
            let total_amount =  this.treatmentsLibrary.reduce(function (accumulator, treatment) {
                return accumulator + Number(treatment.payment_diff);
            }, 0);

            return total_amount;

        },

        total_laboratory_fee(){

            let total_amount =  this.treatmentsLibrary.reduce(function (accumulator, treatment) {
                return accumulator + Number(treatment.laboratory_fee);
            }, 0);

            return total_amount;

        },

        total_payment_fees(){

            let total_amount =  this.treatmentsLibrary.reduce(function (accumulator, treatment) {
                return accumulator + Number(treatment.total_payment_fee);
            }, 0);

            return total_amount;

        },

        total_dentist_fees(){

            let total_amount =  this.treatmentsLibrary.reduce(function (accumulator, treatment) {
                return accumulator + treatment.dentist_fee;
            }, 0);

            return total_amount;

        },

        totalNet(){
            return this.total_payments - this.total_laboratory_fee - this.total_payment_fees - this.total_dentist_fees;
        }
        
    }



});