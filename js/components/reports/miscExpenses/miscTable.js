Vue.component('miscTable', {
	props: ['userData'],
	template: `
		<div class="row">
                        
                <div class="w3-row " style="overflow-x:auto;">
                <table class="table w3-border w3-border is-fullwidth" >

                    <thead>
                        <tr>
                            <th class="w3-center has-background-dark has-text-white-ter w3-border-right" colspan="7">Misc Expense Records</th>
                        </tr>
                        <tr>
                            <th class="w3-center has-background-grey-lighter" colspan="7">{{selectedDateLabel}}</th>
                        </tr>
                        <tr>
                            <th>&nbsp</th>
                            <th><abbr title="Misc Expense Date"><i class="fas fa-calendar"></i></abbr></th>
                            <th>Particulars</th>
                            <th>Amount</th>
                            <th>Payment Type</th>
                            <th colspan="2" class="w3-center">Action</th>
                        </tr>
                        <tr class="has-background-white-ter">
                            <th class="w3-border-right"></th>
                            <th>Total</th>
                            <th>&nbsp</th>
                            <th class="has-text-danger" >&#8369; {{convertMoney2(total_amount_charge)}}</th>
                            <th>&nbsp</th>
                            <th>&nbsp</th>
                            <th>&nbsp</th>
                        </tr>
                    </thead>
                    <tfoot>
                        <tr class="has-background-white-ter">
                            <th class="w3-border-right"></th>
                            <th>Total</th>
                            <th>&nbsp</th>
                            <th class="has-text-danger" >&#8369; {{convertMoney2(total_amount_charge)}}</th>
                            <th>&nbsp</th>
                            <th>&nbsp</th>
                            <th>&nbsp</th>
                        </tr>
                    </tfoot>
                    <tbody>

                        <tr v-for="(misc,index) in miscLibrary">
                            <th class="w3-border-right w3-center">{{index+1}}</th>
                            <td>{{misc.date_charge}}</td>
                            <td>{{misc.description}}</td>
                            <td class="has-text-danger" >&#8369; {{convertMoney2(misc.amount)}}</td>
                            <td >{{convertPaymentType(misc.payment_type)}}</td>
                            <td class="pointer w3-border-right has-text-info w3-border-left w3-center" @click="editMiscExpenses(index)"><i class="fas fa-edit"></i></td>
                            <td class="pointer w3-center has-text-danger" @click="deleteMiscExpenses(index)"><i class="far fa-trash-alt" ></i></td>
                        </tr>

                    </tbody>
                </table>
                </div>
        </div>
	`,
	data() {

		return {

			miscLibrary : [],
            selectedDateLabel : ""

		}

	},

	methods : {

        copyListOfMisc(miscLibrary,selectedDateLabel){

            this.selectedDateLabel = selectedDateLabel;
            this.miscLibrary = miscLibrary;

        },

        convertMoney2(total_amount){

            let centavo = total_amount.substring(total_amount.length - 2, total_amount.length);
            let peso = total_amount.substring(0, total_amount.length - 3);

            //return "ES";
            return String(peso).replace(/(.)(?=(\d{3})+$)/g,'$1,') + "." + centavo;


        },

        convertPaymentType(payment_type){

            let retVal = "";

            if(payment_type == 1) retVal = "CASH";
            else retVal = "CHEQUE";

            return retVal;


        },

        editMiscExpenses(index){

            this.$emit('edit-misc-expense',this.miscLibrary[index]);

        },

        deleteMiscExpenses(index){
            this.$emit('delete-misc-expense',this.miscLibrary[index]);
        },

        printRecordsToPdf(){
            var self = this;

            axios.post('../php/api/printMiscRecords.php', {
                misc_expenses : this.miscLibrary

            })
            .then(function (response){

                console.log(response);
                window.open('../php/pdf/miscRecords.pdf','_newtab');

            })
            .catch(function (error) {
                alert(error);
            });

        }

	},

    computed : {

        total_amount_charge(){

            
            let total_amount =  this.miscLibrary.reduce(function (accumulator, misc) {

                return accumulator + Number(misc.amount);
            }, 0);

            return total_amount.toFixed(2);

        }
        
    }



});