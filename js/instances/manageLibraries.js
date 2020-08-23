

var ps = new Vue({

	el: '#manageLibraries',


	data: {
		
		// patients page counter == 2
		pageCounter : 4,
		search : "",
		userData : {
			userId : -1,
			userName : "",
			userType : -1,
			isDentist : -1,
			allowedAccess : 0
		},
		paymentTypes : [],
		totalPatientsCount : 0,
		totalPendingCount : 0,
		isOpenAddPaymentTypeBox : false,
		paymentTypeName : { value : '', error : ''},
		paymentTypePercentage : { value : '', error : ''}
	},

	created(){

		this.getListOfPaymentTypes();
		
	},

	methods: {

		togglePaymentTypeBox(){
			this.paymentTypeName.value = "";
	        this.paymentTypePercentage.value = "";
			if(this.isOpenAddPaymentTypeBox == false) this.isOpenAddPaymentTypeBox = true;
			else this.isOpenAddPaymentTypeBox = false;
		},

		copyUserData(userData){

			this.userData = userData;
		},

		getListOfPaymentTypes(){

			var self = this;

			//list of payment types
			axios.get('../php/api/listOfPaymentTypes.php')
			.then(function (response){
				console.log(response.data);
				self.paymentTypes = response.data.list_of_payment_types;

				self.paymentTypes.forEach(function(paymentType,index){

					self.paymentTypes[index].forEdit = false;
					self.paymentTypes[index].nameError = "";
					self.paymentTypes[index].percentageError = "";

				});

			})
			.catch(function (error) {
				alert(error);
			});


		},

		updateForEditToTrue(index){

			let dummyObject = this.paymentTypes[index];

			dummyObject.forEdit = true;

			Vue.set(this.paymentTypes, index, dummyObject);

		},

		saveChanges(index){


			let dummyObject = this.paymentTypes[index];

			dummyObject.nameError = validatePaymentTypeName(dummyObject.name);
			dummyObject.percentageError = validatePaymentTypePercentage(dummyObject.percentage);

			Vue.set(this.paymentTypes, index, dummyObject);

			if(dummyObject.nameError == "" && dummyObject.percentageError == ""){
				this.updatePaymentType(dummyObject.id, dummyObject.name, dummyObject.percentage);
			}
			

		},

		updatePaymentType(id, name, percentage){

			let self = this;

			axios.post('../php/api/updatePaymentType.php', {
                id : id,
                name : name,
                percentage : percentage

            })
            .then(function (response){

            	if(response.data.status == "SUCCESS"){
            		self.getListOfPaymentTypes();
            		alert("Successfully updated!");
            	} 

            })
            .catch(function (error) {
                alert(error);
            });

		},

		addPaymentType(){

			let self = this;

			this.paymentTypeName.error = validatePaymentTypeName(this.paymentTypeName.value);
			this.paymentTypePercentage.error = validatePaymentTypePercentage(this.paymentTypePercentage.value);

			if(this.paymentTypeName.error == "" && this.paymentTypePercentage.error == ""){

				axios.post('../php/api/savePaymentType.php', {

	                name : this.paymentTypeName.value,
	                percentage : this.paymentTypePercentage.value

	            })
	            .then(function (response){
	            	console.log(response);
	            	if(response.data.status == "SUCCESS"){
	            		self.getListOfPaymentTypes();
	            		self.togglePaymentTypeBox();
	            		alert("Successfully Added a payment type!");

	            	} 

	            })
	            .catch(function (error) {
	                alert(error);
	            });

	        }

		}




	}

});

function validatePaymentTypeName(data){

	let retVal = "";
	if(data == ""){
		retVal = 'This is required!';
	} else {
		if (! /^[a-zA-ZÑñ0-9\-\s]+$/.test(data)) {
			retVal = 'Found invalid character...';
		}
	}

	return retVal;

}

function validatePaymentTypePercentage(data){
	
	let retVal = "";

	if(data == ""){
		retVal = 'This is required!';
	} else {
		if (! /^[0-9.]+$/.test(data)) {
			retVal = 'Should be number only...';
		} else {
			if(data < 0 || data > 99) retVal = 'Should be 0 to 99 percent only...';
		}
	}

	return retVal;

}