Vue.component('datesSelection', {
	props: ['userData'],
	template: `
		<div class="row">
                        
            <input class="w3-radio" type="radio" name="selectedHistory" value="2" v-model="selectedHistory" @click="getMiscRecords(2)">
            <label>This Year</label>

            <input class="w3-radio" type="radio" name="selectedHistory" value="1" v-model="selectedHistory" @click="getMiscRecords(1)">
            <label>This Month</label>

            <input class="w3-radio" type="radio"  name="selectedHistory" value ="0" v-model="selectedHistory" @click="getMiscRecords(0)">
            <label>Today</label>

            <input class="w3-radio" type="radio"  name="selectedHistory" value ="5" v-model="selectedHistory">
            <label>Select Dates</label>
            
            <div class="row" v-show="selectedHistory == 5">
                <br>
                <div class="columns">
                    <div class="column is-3">
                        <div class="row">
                            <div class="field has-addons">
                                <p class="control">
                                    <a class="button is-static">
                                        From
                                    </a>
                                    <p class="control is-expanded">
                                        <input class="input" type="date" v-model="date_from">
                                    </p>
                                </p>
                            </div>
                            <p class="help has-text-danger">{{date_from_validation_message}}</p>
                        </div>
                    </div>
                    <div class="column is-3">
                        <div class="row">
                            <div class="field has-addons">
                                <p class="control">
                                    <a class="button is-static">
                                        To
                                    </a>
                                    <p class="control is-expanded">
                                        <input class="input" type="date" v-model="date_to">
                                    </p>
                                </p>
                            </div>
                            <p class="help has-text-danger">{{date_to_validation_message}}</p>
                        </div>
                    </div>
                    <div class="column is-3">
                        <button class="button is-outlined is-dark" @click="getMiscRecords(5)">Proceed</button>
                    </div>
                </div>
            </div>

        </div>
	`,
	data() {

		return {

			selectedHistory : -1,
			selectedDate : "",
			date_to : "",
			date_from : "",
			date_to_validation_message : "",
			date_from_validation_message : ""


		}

	},

	created(){

		let today = new moment(moment().toISOString(true).substring(0,10));
		
		this.selectedDate = today;

	},

	methods : {

		// today list of data || will be triggered update getting userdata
		fetchInitialData(userType, userId){
			let selected = 0;
			date_from = this.selectedDate.toISOString(true).substring(0,10);
			date_to = this.selectedDate.toISOString(true).substring(0,10);
			this.selectedHistory = 0;

			this.getListOfMiscs( date_from, date_to, userType, userId);
		},

		getListOfMiscs( date_from, date_to, user_type, user_id){

			var self = this;

			axios.post('../php/api/getMiscRecordHistory.php',{
				
				date_from: date_from,
				date_to : date_to,
				user_type : user_type,
				user_id : user_id
				
			})
			.then(function (response){
				if(response.data.status === "SUCCESS"){
					self.$emit('get-list-of-miscs', response.data.payload, self.convertedSelectedDate);
				}

			})
			.catch(function (error) {
				alert(error);
			});

		},

		getMiscRecords(selected){

			this.$emit("send-selected-date", selected);

			let date_from = "";
			let date_to = ""; // leave blank
			let month = this.selectedDate.month() + 1;
			let year = this.selectedDate.format("Y");

			if(selected == 0){
				date_from = this.selectedDate.toISOString(true).substring(0,10);
				date_to = this.selectedDate.toISOString(true).substring(0,10);
			}
			else if(selected == 1){
				date_from = year + "-" + month + "-01";
				date_to = year + "-" + month + "-" + getLastDayOfTheMonth(month,year);
			}
			else if(selected == 2){
				date_from = year + "-01-01";
				date_to = year + "-12-31";
			} else if(selected == 5){

				this.date_to_validation_message = validateDateTo(this.date_from,this.date_to);
				this.date_from_validation_message = validateDateFrom(this.date_from);
				date_from = this.date_from;
				date_to = this.date_to;
			}

			if(this.date_from_validation_message == "" && this.date_from_validation_message == ""){
				this.getListOfMiscs(date_from, date_to, this.userData.userType, this.userData.userId);
			}

		}

	},

	computed : {

		convertedSelectedDate(){

			let date = "";

			if(this.selectedHistory == 0) date = this.selectedDate.toISOString(true).substring(0,10) + " | " + this.selectedDate.format("dddd");
			else if(this.selectedHistory == 1) date = this.selectedDate.format("MMMM") + " " + this.selectedDate.format("Y");
			else if(this.selectedHistory == 2) date = this.selectedDate.format("Y");
			else if(this.selectedHistory == 5 && this.date_from != "" && this.date_to != ""){
				if(this.date_to_validation_message == "" && this.date_from_validation_message == ""){
					date = "From: " + this.date_from + " - To: " + this.date_to; 
				}
			}

			return date;
		}

	}



});

function getLastDayOfTheMonth(month, year){
	let retVal = 0;

	if(month == '1' || month == '3' || month == '5' || month == '7' || month == '8' || month == '10' || month == '12') retVal = "31";
	else if( month == '4' || month == '6' || month == '9' || month == '11') retVal = "30";
	else if( month == '2'){
		if((year%4) == 0) retVal = "29";
		else retVal = "28";
	}

	return retVal;
}