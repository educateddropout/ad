

var pdr = new Vue({

	el: '#patientDentalRecords',


	data: {
		
		// personalinfo == 1
		currentTab : 2,
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
		updating : false,
		editing : false,
		upperRightTeethLabel : ["18","17","16","15","14","13","12","11"],
		upperLeftTeethLabel : ["21","22","23","24","25","26","27","28"],
		lowerRightTeethLabel : ["48","47","46","45","44","43","42","41"],
		lowerLeftTeethLabel : ["31","32","33","34","35","36","37","38"],
		toothStatusLib : [
			{ "code" : 1, "description" : "A"},
			{ "code" : 2, "description" : "AP"},
			{ "code" : 3, "description" : "CA"},
			{ "code" : 4, "description" : "CD"},
			{ "code" : 5, "description" : "CO"},
			{ "code" : 6, "description" : "CP"},
			{ "code" : 7, "description" : "CT"},
			{ "code" : 8, "description" : "FL"},
		],
		dentalRecordDate : {
			"value" : "" , "error" : ""
		},

		teethObject : teethObject(),

		dentalRecords : [],
		saveSuccessMessage : "",
		saveSuccessModal : false,
		saveSuccessLoading : false,
		isConfirmation : false,

		selectedRecord : "",
		previousSelectedRecord : "",
		

	},

	created(){

		this.patientId = getUrlParameters("id");

	},

	mounted(){

		this.fetchPatientDentalRecords();

	},

	methods: {

		fetchPatientDentalRecords(){
			let self = this;

			axios.post( '../php/api/getPatientDentalRecords.php',{
				patient_id : this.patientId
			})
			.then(function (response){

				if(response.data.status == "SUCCESS"){

					self.dentalRecords = response.data.message;

					// displays the most recent dental records
					//self.teethObject = populateTeethData(response.data.message[0]);
					if(response.data.message.length > 0){
						self.selectRecord(response.data.message[0].id);
					}

				} else {
					console.log(response.data.message.errorInfo);
				}

			})
			.catch(function (error) {
				alert(error);
			});

		},

		closeSaveModal(){
			this.saveSuccessModal = false;
		},

		copyUserData(userData){
			this.userData = userData;
		},

		toggleUpdating(){

			if(this.updating == true){ 
				this.updating = false;

				// copy the previous for viewing
				this.selectRecord(this.previousSelectedRecord);
			}
			else{ 
				
				this.teethObject = teethObject();

				this.dentalRecordDate.value = ""; this.dentalRecordDate.error = "";
				this.previousSelectedRecord = this.selectedRecord;
				this.selectedRecord = "";
				this.updating = true;
			}

			
		},

		toggleEditing(){

			if(this.editing == true){ 
				this.editing = false;
				this.selectRecord(this.selectedRecord);
			}
			else{
				this.editing = true;
			}
		},

		saveDentalRecord(){

			let self = this;
			this.dentalRecordDate.error = validateDentalRecord(this.dentalRecordDate.value, this.dentalRecords,this.editing);

			let upperRightTeeth = combineTeethData(this.teethObject.upperRightTeeth);
			let upperLeftTeeth = combineTeethData(this.teethObject.upperLeftTeeth);
			let lowerRightTeeth = combineTeethData(this.teethObject.lowerRightTeeth);
			let lowerLeftTeeth = combineTeethData(this.teethObject.lowerLeftTeeth);

			

			if(this.dentalRecordDate.error == ""){

				this.saveSuccessModal = true;
				this.saveSuccessLoading = true;
				this.saveSuccessMessage = "Saving dental record data. Please wait...";
				let uuid = uuidv4();

				axios.post( '../php/api/saveDentalRecord.php',{
					patient_id : this.patientId,
					uuid : uuid,
					upper_right_teeth : upperRightTeeth,
					upper_left_teeth : upperLeftTeeth,
					lower_right_teeth : lowerRightTeeth,
					lower_left_teeth : lowerLeftTeeth,
					date_added : this.dentalRecordDate.value

				}).then(function(response){


					if(response.data.status == "SUCCESS"){
						self.saveSuccessLoading = false;
						self.saveSuccessMessage = "Successfully save dental record.";

						let addedDentalRecord = addCopyToDentalRecords(uuid,self.dentalRecordDate.value,upperRightTeeth,upperLeftTeeth,lowerRightTeeth,lowerLeftTeeth)
						self.updating = false;
						self.dentalRecords.push(addedDentalRecord);

						self.dentalRecords = _.orderBy(self.dentalRecords, ['date_added'], ['desc']);
						self.selectRecord(addedDentalRecord.id);

					} else {
						self.saveSuccessMessage = "Error saving dental record. Please report to the administrator. Thank you!";
						console.log(response.data.message);
					}

				})
				.catch(function(error){
					console.log(error);
				});

			}
			
		},

		updateDentalRecord(){

			let self = this;
			this.dentalRecordDate.error = validateDentalRecord(this.dentalRecordDate.value, this.dentalRecords, this.editing, this.selectedRecord);

			let upperRightTeeth = combineTeethData(this.teethObject.upperRightTeeth);
			let upperLeftTeeth = combineTeethData(this.teethObject.upperLeftTeeth);
			let lowerRightTeeth = combineTeethData(this.teethObject.lowerRightTeeth);
			let lowerLeftTeeth = combineTeethData(this.teethObject.lowerLeftTeeth);

			

			if(this.dentalRecordDate.error == ""){

				this.saveSuccessModal = true;
				this.saveSuccessLoading = true;
				this.saveSuccessMessage = "Updating dental record data. Please wait...";

				axios.post( '../php/api/updateDentalRecord.php',{
					id : this.selectedRecord,
					upper_right_teeth : upperRightTeeth,
					upper_left_teeth : upperLeftTeeth,
					lower_right_teeth : lowerRightTeeth,
					lower_left_teeth : lowerLeftTeeth,
					date_added : this.dentalRecordDate.value

				}).then(function(response){
					console.log(response.data);

					if(response.data.status == "SUCCESS"){
						self.saveSuccessLoading = false;
						self.saveSuccessMessage = "Successfully updated dental record.";

						let updatedDentalRecord = addCopyToDentalRecords(self.selectedRecord,self.dentalRecordDate.value,upperRightTeeth,upperLeftTeeth,lowerRightTeeth,lowerLeftTeeth)
						
						self.editing = false;
						
						self.dentalRecords[_.findIndex(self.dentalRecords, function(o) { return o.id == self.selectedRecord; })] = updatedDentalRecord;

						self.dentalRecords = _.orderBy(self.dentalRecords, ['date_added'], ['desc']);
						self.selectRecord(updatedDentalRecord.id);


					} else {
						self.saveSuccessMessage = "Error updating dental record. Please report to the administrator. Thank you!";
					}

				})
				.catch(function(error){
					console.log(error);
				});

			}

		},

		removeDentalRecordWarning(){

			this.saveSuccessMessage = "This will permanently delete the dental record of '"+ this.dentalRecordDate.value +"'.. Are you sure you want to delete it?";
			this.isConfirmation = true;
			this.saveSuccessModal = true;

		},

		removeDentalRecord(){

			let self = this;

			this.isConfirmation = false;
			this.saveSuccessMessage = "Deleting dental record..";

			this.saveSuccessModal = true;
			this.saveSuccessLoading = true;

			axios.post( '../php/api/deleteDentalRecord.php',{
				id : this.selectedRecord
			}).then(function(response){
				console.log(response.data);

				if(response.data.status == "SUCCESS"){

					self.saveSuccessLoading = false;
					self.saveSuccessMessage = "Successfully deleted dental record.";

					//self.dentalRecords[_.findIndex(self.dentalRecords, function(o) { return o.id == self.selectedRecord; })] = updatedDentalRecord;

					self.dentalRecords.splice(_.findIndex(self.dentalRecords, function(o) { return o.id == self.selectedRecord; }), 1);

					self.dentalRecords = _.orderBy(self.dentalRecords, ['date_added'], ['desc']);

					self.selectedRecord = "";
					self.teethObject = teethObject();


				} else {
					self.saveSuccessMessage = "Error updating dental record. Please report to the administrator. Thank you!";
				}

			})
			.catch(function(error){
				console.log(error);
			});


		},

		selectRecord(selectedRecord){

			if(this.updating) this.updating = false;
			if(this.editing) this.editing = false;

			this.selectedRecord = selectedRecord;
			//let dentalRecord = this.dentalRecords.filter(dentalRecord => dentalRecord.id == selectedRecord);
			
			let selectedRecordObject = this.dentalRecords.filter(dentalRecord => dentalRecord.id == selectedRecord)[0];
			
			this.teethObject = populateTeethData(
				selectedRecordObject
			);

			this.dentalRecordDate.value = selectedRecordObject.date_added;
		}

	}

});

function combineTeethData(teeth){
	let retVal = [];

	teeth.teeth.forEach(function(tooth,index){

		combinedTeeth = String(tooth.top) + String(tooth.left) + String(tooth.bottom) + String(tooth.right) + String(tooth.middle) + "-" + String(teeth.status[index]);
		retVal.push(combinedTeeth);

	});

	return retVal;

}

function populateTeethData(teethFromDatabase){
	

	let retVal = {
			upperRightTeeth : segregateToothStatus(teethFromDatabase.t18,teethFromDatabase.t17,teethFromDatabase.t16,teethFromDatabase.t15,teethFromDatabase.t14,teethFromDatabase.t13,teethFromDatabase.t12,teethFromDatabase.t11),
			upperLeftTeeth : segregateToothStatus(teethFromDatabase.t21,teethFromDatabase.t22,teethFromDatabase.t23,teethFromDatabase.t24,teethFromDatabase.t25,teethFromDatabase.t26,teethFromDatabase.t27,teethFromDatabase.t28),
			lowerRightTeeth : segregateToothStatus(teethFromDatabase.t48,teethFromDatabase.t47,teethFromDatabase.t46,teethFromDatabase.t45,teethFromDatabase.t44,teethFromDatabase.t43,teethFromDatabase.t42,teethFromDatabase.t41),
			lowerLeftTeeth : segregateToothStatus(teethFromDatabase.t31,teethFromDatabase.t32,teethFromDatabase.t33,teethFromDatabase.t34,teethFromDatabase.t35,teethFromDatabase.t36,teethFromDatabase.t37,teethFromDatabase.t38)
		}

	
	return retVal;
}

function segregateToothStatus(t1,t2,t3,t4,t5,t6,t7,t8){

	return {
				"status" : [t1.substring(6, 7),
								t2.substring(6, 7),
								t3.substring(6, 7),
								t4.substring(6, 7),
								t5.substring(6, 7),
								t6.substring(6, 7),
								t7.substring(6, 7),
								t8.substring(6, 7)
							],
				"teeth" : [
					{ "top" : t1.substring(0, 1), "left" : t1.substring(1, 2), "bottom" : t1.substring(2, 3), "right" : t1.substring(3, 4), "middle" : t1.substring(4, 5)},
					{ "top" : t2.substring(0, 1), "left" : t2.substring(1, 2), "bottom" : t2.substring(2, 3), "right" : t2.substring(3, 4), "middle" : t2.substring(4, 5)},
					{ "top" : t3.substring(0, 1), "left" : t3.substring(1, 2), "bottom" : t3.substring(2, 3), "right" : t3.substring(3, 4), "middle" : t3.substring(4, 5)},
					{ "top" : t4.substring(0, 1), "left" : t4.substring(1, 2), "bottom" : t4.substring(2, 3), "right" : t4.substring(3, 4), "middle" : t4.substring(4, 5)},
					{ "top" : t5.substring(0, 1), "left" : t5.substring(1, 2), "bottom" : t5.substring(2, 3), "right" : t5.substring(3, 4), "middle" : t5.substring(4, 5)},
					{ "top" : t6.substring(0, 1), "left" : t6.substring(1, 2), "bottom" : t6.substring(2, 3), "right" : t6.substring(3, 4), "middle" : t6.substring(4, 5)},
					{ "top" : t7.substring(0, 1), "left" : t7.substring(1, 2), "bottom" : t7.substring(2, 3), "right" : t7.substring(3, 4), "middle" : t7.substring(4, 5)},
					{ "top" : t8.substring(0, 1), "left" : t8.substring(1, 2), "bottom" : t8.substring(2, 3), "right" : t8.substring(3, 4), "middle" : t8.substring(4, 5)},
				]
			};
}

function addCopyToDentalRecords(uuid, date, upperRightTeeth, upperLeftTeeth, lowerRightTeeth, lowerLeftTeeth){

	return {
		id : uuid,
		date_added : date,
		t18 : upperRightTeeth[0], t17 : upperRightTeeth[1], t16 : upperRightTeeth[2], t15 : upperRightTeeth[3],
		t14 : upperRightTeeth[4], t13 : upperRightTeeth[5], t12: upperRightTeeth[6], t11 : upperRightTeeth[7],

		t48 : lowerRightTeeth[0], t47 : lowerRightTeeth[1], t46 : lowerRightTeeth[2], t45 : lowerRightTeeth[3],
		t44 : lowerRightTeeth[4], t43 : lowerRightTeeth[5], t42: lowerRightTeeth[6], t41 : lowerRightTeeth[7],

		t21 : upperLeftTeeth[0], t22 : upperLeftTeeth[1], t23 : upperLeftTeeth[2], t24 : upperLeftTeeth[3],
		t25 : upperLeftTeeth[4], t26 : upperLeftTeeth[5], t27: upperLeftTeeth[6], t28 : upperLeftTeeth[7],

		t31 : upperLeftTeeth[0], t32 : upperLeftTeeth[1], t33 : upperLeftTeeth[2], t34 : upperLeftTeeth[3],
		t35 : upperLeftTeeth[4], t36 : upperLeftTeeth[5], t37: upperLeftTeeth[6], t38 : upperLeftTeeth[7]

	}

}

function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  )
}

function teethObject(){

	return {
				upperRightTeeth : {
					"status" : [0,0,0,0,0,0,0,0],
					"teeth" : [
						{ "top" : 0, "left" : 0, "right" : 0, "bottom" : 0, "middle" : 0},
						{ "top" : 0, "left" : 0, "right" : 0, "bottom" : 0, "middle" : 0},
						{ "top" : 0, "left" : 0, "right" : 0, "bottom" : 0, "middle" : 0},
						{ "top" : 0, "left" : 0, "right" : 0, "bottom" : 0, "middle" : 0},
						{ "top" : 0, "left" : 0, "right" : 0, "bottom" : 0, "middle" : 0},
						{ "top" : 0, "left" : 0, "right" : 0, "bottom" : 0, "middle" : 0},
						{ "top" : 0, "left" : 0, "right" : 0, "bottom" : 0, "middle" : 0},
						{ "top" : 0, "left" : 0, "right" : 0, "bottom" : 0, "middle" : 0}
					]
				},
				upperLeftTeeth : {
					"status" : [0,0,0,0,0,0,0,0],
					"teeth" : [
						{ "top" : 0, "left" : 0, "right" : 0, "bottom" : 0, "middle" : 0},
						{ "top" : 0, "left" : 0, "right" : 0, "bottom" : 0, "middle" : 0},
						{ "top" : 0, "left" : 0, "right" : 0, "bottom" : 0, "middle" : 0},
						{ "top" : 0, "left" : 0, "right" : 0, "bottom" : 0, "middle" : 0},
						{ "top" : 0, "left" : 0, "right" : 0, "bottom" : 0, "middle" : 0},
						{ "top" : 0, "left" : 0, "right" : 0, "bottom" : 0, "middle" : 0},
						{ "top" : 0, "left" : 0, "right" : 0, "bottom" : 0, "middle" : 0},
						{ "top" : 0, "left" : 0, "right" : 0, "bottom" : 0, "middle" : 0}
					]
				},
				lowerLeftTeeth : {
					"status" : [0,0,0,0,0,0,0,0],
					"teeth" : [
						{ "top" : 0, "left" : 0, "right" : 0, "bottom" : 0, "middle" : 0},
						{ "top" : 0, "left" : 0, "right" : 0, "bottom" : 0, "middle" : 0},
						{ "top" : 0, "left" : 0, "right" : 0, "bottom" : 0, "middle" : 0},
						{ "top" : 0, "left" : 0, "right" : 0, "bottom" : 0, "middle" : 0},
						{ "top" : 0, "left" : 0, "right" : 0, "bottom" : 0, "middle" : 0},
						{ "top" : 0, "left" : 0, "right" : 0, "bottom" : 0, "middle" : 0},
						{ "top" : 0, "left" : 0, "right" : 0, "bottom" : 0, "middle" : 0},
						{ "top" : 0, "left" : 0, "right" : 0, "bottom" : 0, "middle" : 0}
					]
				},
				lowerRightTeeth : {
					"status" : [0,0,0,0,0,0,0,0],
					"teeth" : [
						{ "top" : 0, "left" : 0, "right" : 0, "bottom" : 0, "middle" : 0},
						{ "top" : 0, "left" : 0, "right" : 0, "bottom" : 0, "middle" : 0},
						{ "top" : 0, "left" : 0, "right" : 0, "bottom" : 0, "middle" : 0},
						{ "top" : 0, "left" : 0, "right" : 0, "bottom" : 0, "middle" : 0},
						{ "top" : 0, "left" : 0, "right" : 0, "bottom" : 0, "middle" : 0},
						{ "top" : 0, "left" : 0, "right" : 0, "bottom" : 0, "middle" : 0},
						{ "top" : 0, "left" : 0, "right" : 0, "bottom" : 0, "middle" : 0},
						{ "top" : 0, "left" : 0, "right" : 0, "bottom" : 0, "middle" : 0}
					]
				}
			}
}