

var tr = new Vue({

	el: '#cashDenomination',


	data: {
		
		pageCounter : 6,
		userData : {
			userId : -1,
			userName : "",
			userType : -1,
			isDentist : -1,
			allowedAccess : 0
		},
		selectedDate : {
			day : '01',
			monthName : 'January',
			dayName : 'Sunday',
			year : '2019',
			completeDate : '2019-01-01'
		},
		cashDenomination : [
			{label : '1000', pieces : 0, error : ""},
			{label : '500', pieces : 0, error : ""},
			{label : '200', pieces : 0, error : ""},
			{label : '100', pieces : 0, error : ""},
			{label : '50', pieces : 0, error : ""},
			{label : '20', pieces : 0, error : ""},
			{label : '10', pieces : 0, error : ""},
			{label : '5', pieces : 0, error : ""},
			{label : '1', pieces : 0, error : ""},
			{label : '0.25', pieces : 0, error : ""}
		],
		cashDenominationId : '',
		weekday : ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
		monthText : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
		toSave : 0, // 0 = true, 1 = for updating only

		modalMessage : "Updating cash denomination... Please wait!",
		showModal : false

	},

	created(){

		let today = new moment(moment().toISOString(true).substring(0,10));
		//this.selectedDate = today;

		this.selectedDate.dayName = this.weekday[today.get('day')];

		this.selectedDate.day = today.get('date');

		this.selectedDate.year = today.get('year');

		this.selectedDate.monthName = this.monthText[today.get('month')];

		this.selectedDate.completeDate = today._i;

	},

	mounted(){
		this.getCashDenominationToday();
	},

	methods: {

		copyUserData(userData){

			this.userData = userData;
			
		},

		computeAmount(pieces,cash){


			return this.convertMoney(pieces*cash);

		},

		convertMoney(n){

            return String(n).replace(/(.)(?=(\d{3})+$)/g,'$1,');

        },

        convertMoney2(total_amount){

            total_amount = total_amount.toFixed(2);

            let centavo = total_amount.substring(total_amount.length - 2, total_amount.length);
            let peso = total_amount.substring(0, total_amount.length - 3);

            return String(peso).replace(/(.)(?=(\d{3})+$)/g,'$1,') + "." + centavo;


        },

        changeDenomination(index){
        	
        	this.cashDenomination[index].error = validateCashDenomination(this.cashDenomination[index].pieces);

        	if(this.cashDenomination[index].error == ""){
        		
        		this.updateCashDenomination();
        	};

        },

        updateCashDenomination(){

        	var self = this;
        	//this.showModal = true;

        	axios.post('../php/api/updateCashDenomination.php', {
                date : this.selectedDate.completeDate,
                toSave : this.toSave,
            	m1 : this.cashDenomination[0].pieces,
            	m2 : this.cashDenomination[1].pieces,
            	m10 : this.cashDenomination[2].pieces,
            	m3 : this.cashDenomination[3].pieces,
            	m4 : this.cashDenomination[4].pieces,
            	m5 : this.cashDenomination[5].pieces,
            	m6 : this.cashDenomination[6].pieces,
            	m7 : this.cashDenomination[7].pieces,
            	m8 : this.cashDenomination[8].pieces,
            	m9 : this.cashDenomination[9].pieces

            })
            .then(function (response){

            	console.log(response.data);
            	self.toSave = 1;
                //self.showModal = false;

            })
            .catch(function (error) {
                alert(error);
            });

        },

        getCashDenominationToday(){

        	var self = this;

        	axios.post('../php/api/getCashDenomination.php', {
                date : this.selectedDate.completeDate

            })
            .then(function (response){

                console.log(response);
                if(response.data.status === "SUCCESS"){

                	if(response.data.payload.length > 0){
                		let cd = response.data.payload[0];

                		self.cashDenominationId = cd.id;
                		self.cashDenomination[0].pieces = Number(cd.m1);
                		self.cashDenomination[1].pieces = Number(cd.m2);
                		self.cashDenomination[2].pieces = Number(cd.m10); // 200
                		self.cashDenomination[3].pieces = Number(cd.m3);
                		self.cashDenomination[4].pieces = Number(cd.m4);
                		self.cashDenomination[5].pieces = Number(cd.m5);
                		self.cashDenomination[6].pieces = Number(cd.m6);
                		self.cashDenomination[7].pieces = Number(cd.m7);
                		self.cashDenomination[8].pieces = Number(cd.m8);
                		self.cashDenomination[9].pieces = Number(cd.m9);

                		self.toSave = 1;
                	}

                }
                //window.open('../php/pdf/paymentRecords.pdf','_newtab');

            })
            .catch(function (error) {
                alert(error);
            });

        }

	},

	computed: {
		totalCash(){

			let total = 0;

			this.cashDenomination.forEach(function(cash){
				total += (Number(cash.label) * cash.pieces);
			});

			return	this.convertMoney2(total);
		},
	}

});

function validateCashDenomination(denomination){
	let retVal = "";

	if(denomination == ""){
		retVal = "Please dont leave this blank";
	} else {
		if(! /^([0-9.]+$)/.test(denomination)){
			retVal = "Found invalid characters!";
		}
	}

	return retVal;
}