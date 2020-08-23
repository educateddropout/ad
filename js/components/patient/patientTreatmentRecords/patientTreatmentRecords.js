Vue.component('patientTreatmentRecords', {
	props: ['userData', 'patientId'],
	template: `
		<div class="row">
            <div class="column is-10 is-offset-1">
                <div class="w3-row " style="overflow-x:auto;">
                <table class="table w3-border is-fullwidth" >
                    <thead>
                        <tr>
                            <th class="w3-center w3-xlarge has-background-dark has-text-white-ter" colspan="13">Treatment Records</th>
                        </tr>
                        <tr class="has-background-grey-lighter">
                            <th>&nbsp</th>
                            <th><abbr title="Treatment Date"><i class="fas fa-calendar"></i></abbr></th>
                            <th><abbr title="Tooth Numbers"><i class="fas fa-tooth"></i></abbr></th>
                            <th><abbr title="Dentist Attended"><i class="fas fa-user-md"></i></abbr></th>
                            <th>Procedure</th>
                            <th>Amount Charge</th>
                            <th>Dentist Percentage</th>
                            <th>Laboratory Fee</th>
                            <th>Payment</th>
                            <th>Balance</th>
                            <th>&nbsp</th>
                            <th>&nbsp</th>
                            <th>&nbsp</th>
                        </tr>
                        <tr class="has-background-white-ter">
                            <th class="w3-border-right">Total</th>
                            <th></th>
                            <th>&nbsp</th>
                            <th>&nbsp</th>
                            <th>&nbsp</th>
                            <th>&#8369;{{total_amount_charge}}</th>
                            <th>&nbsp</th>
                            <th>&nbsp</th>
                            <th class="has-text-success">&#8369;{{total_payments}}</th>
                            <th class="has-text-danger" >&#8369;{{total_balance}}</th>
                            <th >&nbsp</th>
                            <th>&nbsp</th>
                            <th>&nbsp</th>
                        </tr>
                    </thead>
                    <tfoot>
                        <tr>
                            <th class="w3-border-right">Total</th>
                            <th></th>
                            <th>&nbsp</th>
                            <th>&nbsp</th>
                            <th>&nbsp</th>
                            <th>&#8369;{{total_amount_charge}}</th>
                            <th>&nbsp</th>
                            <th>&nbsp</th>
                            <th class="has-text-success">&#8369;{{total_payments}}</th>
                            <th class="has-text-danger" >&#8369;{{total_balance}}</th>
                            <th >&nbsp</th>
                            <th>&nbsp</th>
                            <th>&nbsp</th>
                        </tr>
                    </tfoot>
                    <tbody>
                        <tr v-for="(treatment,index) in treatmentLibrary" :class="{'is-selected': (index == selectedRow)}">
                            <th class="w3-border-right">{{index+1}}</th>

                            <td>{{treatment.treatment_date}}</td>
                            <td>{{treatment.tooth}}</td>

                            <td v-if="userData.userType == 3 || userData.userType == 1 || userData.userType.userId == treatment.dentist_id">{{treatment.dentist_name}}</td>
                            <td v-else="">&nbsp</td>

                            <td>{{treatment.treatment}}</td>
                            <td>&#8369;{{treatment.treatment_amount}}</td>

                            <td v-if="treatment.dentist_percentage != null">{{treatment.dentist_percentage}}%</td>
                            <td v-else>N/A</td>
                            
                            <td>&#8369;{{treatment.laboratory_fee}}</td>

                            <td class="has-text-success" v-if="treatment.total_payment  != null">&#8369;{{treatment.total_payment}}</td>
                            <td class="has-text-danger" v-else>&#8369;0</td>
                            
                            <td class="has-text-success" v-if="treatment.payment_diff != null && treatment.payment_diff == 0">
                                &#8369;{{treatment.payment_diff}}
                            </td>
                            <td class="has-text-danger" v-else-if="treatment.payment_diff != null && treatment.payment_diff != 0">
                                &#8369;{{treatment.payment_diff}}
                            </td>

                            <td class="has-text-danger" v-else>&#8369;{{treatment.treatment_amount}}</td>

                            <td class="w3-border-left w3-text-brown" @click="selectedTreatmentUpdate(treatment,index)"><abbr title="Update Treatment Record"><i class="far fa-edit"></i></abbr></td>
                            
                            <td class="w3-border-left " @click="selectedTreatmentForPayment(treatment,index)"><abbr title="Add Payment"><i class="fas fa-cash-register"></i></abbr></td>

                            <td class="w3-border-left " @click="selectedTreatmentForDeletion(treatment.id,index)"><abbr title="Delete Treatment"><i class="far fa-trash-alt has-text-danger"></i></abbr></td>
                        
                        </tr>

                    </tbody>
                </table>
                </div>
            </div>
        </div>
	`,

	data() {

		return {

			treatmentLibrary : [],
			selectedRow : -1

		}

	},

	created (){

		this.getListOfTreatments();

	},

	methods : {

		selectedTreatmentUpdate(treatment,index){

			this.selectedRow = index;
			this.$emit('open-treatment-update-modal', treatment);

		},

		selectedTreatmentForPayment(treatment,index){
			
			this.selectedRow = index;
			this.$emit('open-payment-modal', treatment);

		},

        selectedTreatmentForDeletion(treatmentId,index){
            
            this.selectedRow = index;
            this.$emit('open-delete-treatment', treatmentId);

        },

		getListOfTreatments(){

			let self = this;

			//list of treatments
			axios.post('../php/api/listOfTreatments.php',{
				patient_id : this.patientId
			})
			.then(function (response){
				
				console.log(response.data);
				self.treatmentLibrary = response.data.list_of_treatments;
				
			})
			.catch(function (error) {
				console.log(error);
			});

		},

		updateTreatmentRecords(){

			this.unSelectTableRow();
			this.getListOfTreatments();

		},

        unSelectTableRow(){

            this.selectedRow = -1;

        }

	},

	computed : {

		total_amount_charge(){

			
			let total_amount =  this.treatmentLibrary.reduce(function (accumulator, treatment) {
				return accumulator + Number(treatment.treatment_amount);
			}, 0);

			return total_amount;

		},

		total_payments(){

			
			let total_amount =  this.treatmentLibrary.reduce(function (accumulator, treatment) {
				return accumulator + Number(treatment.total_payment);
			}, 0);

			return total_amount;

		},

		total_balance(){

			
			let total_amount =  this.treatmentLibrary.reduce(function (accumulator, treatment) {
				return accumulator + Number(treatment.payment_diff);
			}, 0);

			return total_amount;

		}

	}

});