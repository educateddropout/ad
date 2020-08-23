

var pr = new Vue({

	el: '#paymentRecords',


	data: {
		
		// personalinfo == 1
		// patients page counter == 2
		pageCounter : 3,
		userData : {
			userId : -1,
			userName : "",
			userType : -1,
			isDentist : -1,
			allowedAccess : 0
		},
		dentistsLibrary : [],
		paymentTypeLibrary : [],
		paymentTypeCheck: {
			id : []
		},
		dentistCheck: {
			id : []
		},
		paymentsLibrary : [],
		miscExpenses : [],
		cashDenomination : [],
		isPrintCashDenomination : 0
	},

	created(){

		//list of dentist
		axios.get('../php/api/listOfDentist.php')
		.then(function (response){
			console.log(response.data);
			pr.dentistsLibrary = response.data.list_of_dentists;

			for(let i = 0; i < response.data.list_of_dentists.length; i++){
				pr.dentistCheck.id[i] = true;
			}

		})
		.catch(function (error) {
			alert(error);
		});

		//list of payment types
		axios.get('../php/api/listOfPaymentTypes.php')
		.then(function (response){
			console.log(response.data);
			pr.paymentTypeLibrary = response.data.list_of_payment_types;

			for(let i = 0; i < response.data.list_of_payment_types.length; i++){
				pr.paymentTypeCheck.id[i] = true;
			}

		})
		.catch(function (error) {
			alert(error);
		});

	},

	methods: {

		copyUserData(userData){

			this.userData = userData;
			this.$refs.dateSelection.fetchInitialData(userData.userType, userData.userId);
			
		},

		sendListOfPayments(paymentsLibrary,selectedDateLabel){

			this.$refs.paymentsTable.copyListOfTreatments(paymentsLibrary, selectedDateLabel);
			
		},

		printPaymentRecords(){
			
			this.$refs.paymentsTable.printRecordsToPdf();

		},

		getListOfMisc(selected, df, dt, sd){

			let date_from = df;
			let date_to = dt;

			let month = sd.month() + 1;
			let year = sd.format("Y");

			if(selected == 0){
				date_from = sd.toISOString(true).substring(0,10);
				date_to = sd.toISOString(true).substring(0,10);

				this.getCashDenominationToday(date_to);
				this.isPrintCashDenomination = 1; // to print
			}
			else if(selected == 1){
				date_from = year + "-" + month + "-01";
				date_to = year + "-" + month + "-" + getLastDayOfTheMonth(month,year);

				this.isPrintCashDenomination = 0; // dont print
			}
			else if(selected == 2){
				date_from = year + "-01-01";
				date_to = year + "-12-31";
				this.isPrintCashDenomination = 0; // dont print
			} else if(selected == 5){
				if(date_from == date_to){
					this.getCashDenominationToday(date_to);
					this.isPrintCashDenomination = 1; // to print
				}
			}

			this.getListOfMiscs(date_from, date_to, this.userData.userType, this.userData.userId);

		},

		getCashDenominationToday(date){

        	var self = this;

        	axios.post('../php/api/getCashDenomination.php', {
                date : date

            })
            .then(function (response){

                console.log(response);
                if(response.data.status === "SUCCESS"){

                	if(response.data.payload.length > 0){
                		let cd = response.data.payload[0];


                		self.cashDenomination[0] = { pieces : Number(cd.m1), label : '1000' };
                		self.cashDenomination[1] = { pieces : Number(cd.m2), label : '500' };
                		self.cashDenomination[2] = { pieces : Number(cd.m10), label : '200' };
                		self.cashDenomination[3] = { pieces : Number(cd.m3), label : '100' };
                		self.cashDenomination[4] = { pieces : Number(cd.m4), label : '50' };
                		self.cashDenomination[5] = { pieces : Number(cd.m5), label : '20' };
                		self.cashDenomination[6] = { pieces : Number(cd.m6), label : '10' };
                		self.cashDenomination[7] = { pieces : Number(cd.m7), label : '5' };
                		self.cashDenomination[8] = { pieces : Number(cd.m8), label : '1' };
                		self.cashDenomination[9] = { pieces : Number(cd.m9), label : '.25' };

                	} else{

                		self.cashDenomination = [];

                	}

                }
                //window.open('../php/pdf/paymentRecords.pdf','_newtab');

            })
            .catch(function (error) {
                alert(error);
            });

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

					self.miscExpenses = response.data.payload;
				}

			})
			.catch(function (error) {
				alert(error);
			});

		}

	}

});