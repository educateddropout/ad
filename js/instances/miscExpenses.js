

var tr = new Vue({

	el: '#miscExpenses',


	data: {
		
		pageCounter : 6,
		userData : {
			userId : -1,
			userName : "",
			userType : -1,
			isDentist : -1,
			allowedAccess : 0
		},
		miscData : {
			date : { value : "", error : ""},
			description : { value : "", error : ""},
			amount : { value : "", error : ""},
			paymentType : { value : -1, error : ""}
		},
		modalCtr : "",
		isShowMiscModal : false,


		currentSelectedDateHistory : 0,

		openDelete : false,
        deleteMessage : "",
        deleteConfirmation : false

	},

	methods: {

		printMiscRecords(){
			
			this.$refs.miscTable.printRecordsToPdf();

		},

		copySelectedDate(selected){
			this.currentSelectedDateHistory = selected;
        },

		copyUserData(userData){

			this.userData = userData;
			this.$refs.dateSelection.fetchInitialData(userData.userType, userData.userId);
			
		},

		sendListOfMiscs(miscLibrary,selectedDateLabel){
			
			this.$refs.miscTable.copyListOfMisc(miscLibrary,selectedDateLabel);

		},

		showEditMiscModal(misc){

			this.miscData = {

				date : { value : misc.date_charge, error : ""},
				description : { value : misc.description, error : ""},
				amount : { value : misc.amount, error : ""},
				id : { value : misc.id, error : "" },
				paymentType : { value : misc.payment_type, error : "" }

			};

			this.isShowMiscModal = true;
			this.modalCtr = 'EDIT';

		},

		showAddMiscModal(){
			
			this.miscData = {
				date : { value : "", error : ""},
				description : { value : "", error : ""},
				amount : { value : "", error : ""},
				paymentType : { value : -1, error : "" }
			};

			this.isShowMiscModal = true;
			this.modalCtr = 'ADD';

		},

		closeMiscModal(){
		 	this.isShowMiscModal = false;
		},

		updateMiscExpensesList(){
		 	this.isShowMiscModal = false;
		 	this.$refs.dateSelection.getMiscRecords(this.currentSelectedDateHistory);
		},

		deleteMiscExpense(misc){

			this.openDelete = true;
			this.deleteMessage = "This will permanently delete this misc expense. Are you sure you want to continue?";
			this.deleteConfirmation = true;

			this.miscData = {

				date : { value : misc.date_charge, error : ""},
				description : { value : misc.description, error : ""},
				amount : { value : misc.amount, error : ""},
				id : { value : misc.id, error : "" },
				paymentType : { value : -1, error : "" }

			};

		},

		deleteConfirmationClose(){
			this.openDelete = false;
		},

		proceedMiscDeletion(){

			var self = this;

            axios.post('../php/api/deleteMiscExpenses.php',{
                
                id : this.miscData.id.value
                
            })
            .then(function (response){

            	self.deleteConfirmation = false;
                if(response.data.status === "SUCCESS"){

                    self.$refs.dateSelection.getMiscRecords(self.currentSelectedDateHistory);
                    self.deleteMessage = "Successfully deleted misc expense.";

                } else {
                	self.deleteMessage = "Error deleting misc expense. Please ask for assitance";
                }

            })
            .catch(function (error) {
                console.log(error);
            });

		}

	}

});