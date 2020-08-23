Vue.component('miscExpensesModal', {
	props: ['userData','modalCtr', 'miscData', 'isActive'],
	template: `
		<div class="row">

                <div class="modal" :class="{'is-active' : isActive}">
                    <div class="modal-background" @click="closeModal"></div>
                    <div class="modal-card">
                        <header class="modal-card-head">
                            <p class="modal-card-title">
                                <span v-if="modalCtr == 'ADD'"> Add Misc Expense </span>
                                <span v-else-if="modalCtr == 'EDIT'"> Update Misc Expense </span>
                            </p>
                            <button class="delete" aria-label="close" @click="closeModal"></button>
                        </header>
                        <section class="modal-card-body">
                            <div class="w3-row">
                                <label>Date:</label>
                                <input class="input" type="date" v-model="miscData.date.value" :class="{'is-danger' : miscData.date.error != ''}" @change="validateMiscExpenseDate">
                                <p class="help is-danger">{{miscData.date.error}}</p>
                            </div>
                            <br>
                            <div class="w3-row">
                                <label>Particulars:</label>
                                <textarea class="textarea" v-model="miscData.description.value" :class="{'is-danger' : miscData.description.error != ''}" @keyup="miscData.description.value = miscData.description.value.toUpperCase()" maxlength= "350" @change="validateMiscExpenseDescription"></textarea>
                                <p class="help is-danger">{{miscData.description.error}}</p>
                            </div>
                            <br>
                            <div class="w3-row">
                                <label>Amount:</label>
                                <div class="field">
                                    <p class="control has-icons-left">
                                        <input class="input" type="text" v-model="miscData.amount.value" :class="{'is-danger' : miscData.amount.error != ''}" maxlength= "15" @change="validateMiscExpenseAmount">
                                        <span class="icon is-small is-left">
                                            ₱
                                        </span>
                                    </p>
                                </div>
                                <p class="help is-danger">{{miscData.amount.error}}</p>
                            </div>

                            <div class="w3-row">
                                <label>Payment Type:</label>
                                <div class="field">
                                    <div class="select is-fullwidth" :class="{'is-danger' : miscData.paymentType.error != ''}">
                                        <select v-model="miscData.paymentType.value" @change="validateMiscExpensePaymentType">
                                            <option value="-1" disabled>Please select</option>
                                            <option v-for="paymentType in paymentTypeLib" :value="paymentType.value">{{paymentType.desc}}</option>
                                        </select>
                                    </div>
                                </div>
                                <p class="help is-danger">{{miscData.paymentType.error}}</p>
                            </div>

                        </section>
                        <footer class="modal-card-foot">
                            <button class="button is-success" @click="addMisc" v-show="modalCtr == 'ADD'">Save</button>
                            <button class="button is-success" @click="updateMisc" v-show="modalCtr == 'EDIT'">Update</button>
                            <button class="button" @click="closeModal">Cancel</button>
                        </footer>
                    </div>
                </div>

                <modal-message
                    :is-active = "showSuccess"
                    :message = "successMessage"
                    @close-modal = "closeSuccessModal"
                >
                </modal-message>
        </div>
	`,
	data() {

		return {

            showSuccess : false,
            successMessage : "",
            paymentTypeLib : [{'value' : 1, 'desc' : 'Cash'},{'value' : 2, 'desc' : 'Cheque'}]

		}

	},

	methods : {

        

        closeSuccessModal(){
            this.showSuccess = false;
        },

        validateMiscExpenseDate(){

            this.miscData.date.error = validateMiscExpenseDate(this.miscData.date.value);
        },

        validateMiscExpensePaymentType(){
            this.miscData.paymentType.error = validateMiscExpensePaymentType(this.miscData.paymentType.value);
        },

        validateMiscExpenseAmount(){

            this.miscData.amount.error = validateMiscExpenseAmount(this.miscData.amount.value);

        },

        validateMiscExpenseDescription(){

            this.miscData.description.error = validateMiscExpenseDescription(this.miscData.description.value);

        },

        validateAllMiscData(){

            let retVal = true;

            this.validateMiscExpenseDate();
            this.validateMiscExpenseAmount();
            this.validateMiscExpenseDescription();
            this.validateMiscExpensePaymentType();

            if(this.miscData.description.error == '' && this.miscData.amount.error == '' && this.miscData.date.error == '' && this.miscData.paymentType.error == '') retVal = false;

            return retVal;
        },

        addMisc(){

            var self = this;

            if(this.validateAllMiscData() == false){
                
                axios.post('../php/api/addMiscExpenses.php',{
                    
                    date : this.miscData.date.value,
                    amount : this.miscData.amount.value,
                    description : this.miscData.description.value,
                    paymentType : this.miscData.paymentType.value
                    
                })
                .then(function (response){
                    console.log(response.data);
                    if(response.data.status === "SUCCESS"){
                        self.updateMiscList();

                        self.showSuccess = true;
                        self.successMessage = "Successfully saved misc expense.";
                    }

                })
                .catch(function (error) {
                    console.log(error);
                });
            }

        },

        updateMisc(){

            var self = this;

            if(this.validateAllMiscData() == false){
                axios.post('../php/api/updateMiscExpenses.php',{
                    
                    date : this.miscData.date.value,
                    amount : this.miscData.amount.value,
                    description : this.miscData.description.value,
                    paymentType : this.miscData.paymentType.value,
                    id : this.miscData.id.value
                    
                })
                .then(function (response){

                    if(response.data.status === "SUCCESS"){
                        self.updateMiscList();

                        self.showSuccess = true;
                        self.successMessage = "Successfully updated misc expense.";

                    }

                })
                .catch(function (error) {
                    console.log(error);
                });
            }

        },

        updateMiscList(){

            this.$emit('update-misc-list');

        },

        closeModal(){

            this.$emit('close-modal');

        }

	}


});

function validateMiscExpensePaymentType(value){

    let retVal = "";

    if(value == -1){
        retVal = "Please select payment type!";
    }

    return retVal

}

function validateMiscExpenseDate(value){

    let retVal = "";
    let today = new moment(moment().toISOString(true).substring(0,10));
    let formattedDateToday = today.toISOString(true).substring(0,10);

    if(value == ""){
        retVal = "Please provide date!";
    } else {
        if(value > formattedDateToday){
            retVal = "Cannot log future dates";
        }
    }

    return retVal
}

function validateMiscExpenseDescription(value){

    let retVal = "";

    if(value == ""){
        retVal = "Please provide the Particulars!";
    }

    return retVal
}

function validateMiscExpenseAmount(value){

    let retVal = "";

    if(value == ""){
        retVal = "Please provide amount!";
    } else{
        if(! /^([0-9.]+$)/.test(value)){
            retVal = "Found invalid characters!";
        } else {

            if(occurrences(value, ".") > 1){
                retVal = "Hmm. It seems there's something wrong with the amount!";
            } else if(occurrences(value, ".") == 1){
                if(value.length - value.indexOf(".")-1 < 1 || value.length - value.indexOf(".")-1 > 2){
                    retVal = "Hmm. It seems there's something wrong with the amount!";
                }
            }
        }
    }

    return retVal

}

function occurrences(string, subString, allowOverlapping) {

    string += "";
    subString += "";
    if (subString.length <= 0) return (string.length + 1);

    var n = 0,
        pos = 0,
        step = allowOverlapping ? 1 : subString.length;

    while (true) {
        pos = string.indexOf(subString, pos);
        if (pos >= 0) {
            ++n;
            pos += step;
        } else break;
    }
    return n;
}