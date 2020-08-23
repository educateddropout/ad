

var pps = new Vue({

	el: '#patientTreatmentRecords',


	data: {
		
		// personalinfo == 1
		currentTab : 3,
		// patients page counter == 2
		pageCounter : 2,
		userData : {
			userd : -1,
			userName : "",
			userType : -1,
			isDentist : -1,
			allowedAccess : 0
		},
		patientId : "",
		dentistsLibrary : [],
		paymentTypeLibrary : [],

		isOpenDelete : false,
		deleteMessage : "",
		isDeleteConfirmation : false,
		isDeleteLoading : false,

		isOpenDeletePayment : false,
		deleteMessagePayment : "",
		isDeleteConfirmationPayment : false,
		isDeleteLoadingPayment : false,

		treatmentToDelete : '',
		paymentToDelete : '',
	},

	created(){

		this.patientId = getUrlParameters("id");

		//list of dentist
		axios.get('../php/api/listOfDentist.php')
		.then(function (response){
			console.log(response.data);
			pps.dentistsLibrary = response.data.list_of_dentists;

		})
		.catch(function (error) {
			alert(error);
		});

		//list of payment types
		axios.get('../php/api/listOfPaymentTypes.php')
		.then(function (response){
			console.log(response.data);
			pps.paymentTypeLibrary = response.data.list_of_payment_types;

		})
		.catch(function (error) {
			alert(error);
		});

	},

	methods: {

		copyUserData(userData){
			this.userData = userData;
		},

		openTreatmentUpdateModal(treatment){

			this.$refs.treatmentUpdateModal.openModalTreatmentUpdate(treatment);

		},

		updateTreatmentRecords(){

			this.$refs.patientTreatmentRecords.updateTreatmentRecords();

		},

		openPaymentModal(treatment){
			
			this.$refs.paymentModal.openPaymentModal(treatment);

		},

		openUpdatePaymentModal(payment){

			this.$refs.updatePaymentModal.openUpdatePaymentModal(payment);

		},

		unSelectTableRow(){

			this.$refs.patientTreatmentRecords.unSelectTableRow();

		},

		unSelectPaymentTableRow(){

			this.$refs.patientPaymentRecords.unSelectPaymentTableRow();

		},

		updatePaymentRecords(){

			this.$refs.patientPaymentRecords.getListOfPayments();

		},

		closeDeleteModal(){

			this.isOpenDelete = false;
			this.unSelectTableRow();

		},

		closeDeleteModalPayment(){

			this.isOpenDeletePayment = false;
			this.unSelectPaymentTableRow();
		},

		deleteTreatmentConfirmation(treatmentId){

			this.treatmentToDelete = treatmentId;
			this.isOpenDelete = true;
			this.deleteMessage = "Deleting this treatment record, will delete payments under it aswell.. Are you sure you want to proceed deletion?";
			this.isDeleteConfirmation = true;

		},

		proceedTreatmentDeletion(){
			var self = this;

			this.isDeleteConfirmation = false;
			this.isDeleteLoading = true;
			this.deleteMessage = "Deleting treatment record. Please wait!";

			axios.post('../php/api/deleteTreatmentRecord.php',{
				treatment_id : this.treatmentToDelete
			})
			.then(function (response){

				self.isDeleteLoading = false;
				self.deleteMessage = "Successfully deleted treatment record.";
				self.$refs.patientTreatmentRecords.getListOfTreatments();
				self.updatePaymentRecords();
				
			})
			.catch(function (error) {
				console.log(error);
			});

		},

		deletePaymentConfirmation(paymentId){

			this.paymentToDelete = paymentId;
			this.isOpenDeletePayment = true;
			this.deleteMessagePayment = "This will permenently delete this payment record. Are you sure you want to continue?";
			this.isDeleteConfirmationPayment = true;

		},

		proceedPaymentDeletion(){
			var self = this;

			this.isDeleteConfirmationPayment = false;
			this.isDeleteLoadingPayment = true;
			this.deleteMessagePayment = "Deleting payment record. Please wait!";

			axios.post('../php/api/deletePaymentRecord.php',{
				paymentId : this.paymentToDelete
			})
			.then(function (response){

				self.isDeleteLoadingPayment = false;
				self.deleteMessagePayment = "Successfully deleted payment record.";
				self.$refs.patientTreatmentRecords.getListOfTreatments();
				self.updatePaymentRecords();
				
			})
			.catch(function (error) {
				console.log(error);
			});

		},


	}

});