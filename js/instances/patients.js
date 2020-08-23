

var ps = new Vue({

	el: '#patients',


	data: {
		
		// patients page counter == 2
		pageCounter : 2,
		search : "",
		userData : {
			userid : -1,
			userName : "",
			userType : -1,
			isDentist : -1,
			allowedAccess : 0
		},
		patients : [],
		patientsLetter : [
			'A',
			'B',
			'C',
			'D',
			'E',
			'F',
			'G',
			'H',
			'I',
			'J',
			'K',
			'L',
			'M',
			'N',
			'O',
			'P',
			'Q',
			'R',
			'S',
			'T',
			'U',
			'V',
			'W',
			'X',
			'Y',
			'Z',
		],
		totalPatientsCount : 0,
		totalPendingCount : 0
	},

	created(){

		// Get List of Patients
		axios.get('../php/api/listOfPatients.php')
		.then(function (response){
			
			let index = 0;

			console.log(response.data);
			ps.patients_info = response.data.patients_details;
			ps.totalPatientsCount = response.data.patients_details.length;
			ps.patients = groupPatients(response.data.patients_details); 
			

			
		})
		.catch(function (error) {
			alert(error);
		});
		
		

	},

	watch : {

		search(){
			
			this.patients = groupPatients(this.filteredPatients); 
		}

	},

	computed : {

		filteredPatients(){

			return this.patients_info.filter(patient => {
				let fullName = patient.first_name + patient.middle_name + patient.last_name;

				return fullName.toUpperCase().includes(this.search.toUpperCase());

			});

		}

	},

	methods: {

		copyUserData(userData){
			this.userData = userData;
		},

		selectedPatient(patientId) {

			window.location.href = 'patient-personal-information.html?id='+ patientId;

		},

		updateTotalPendingCount(totalPendingCount){

			this.totalPendingCount = totalPendingCount;
		},

		goToPendingPatients(){

			if(this.totalPendingCount > 0) window.open('pending-patient-records.html', "_self");

		}

	}

});

function groupPatients(patients_info){

	let patients = [];
	let index = 0;

	patients[index] = patients_info.filter((patient) => {
		return patient.last_name.substr(0,1).toUpperCase() == "A";
	});

	patients[++index] = patients_info.filter((patient) => {
		return patient.last_name.substr(0,1).toUpperCase() == "B";
	});

	patients[++index] = patients_info.filter((patient) => {
		return patient.last_name.substr(0,1).toUpperCase() == "C";
	});

	patients[++index] = patients_info.filter((patient) => {
		return patient.last_name.substr(0,1).toUpperCase() == "D";
	});

	patients[++index] = patients_info.filter((patient) => {
		return patient.last_name.substr(0,1).toUpperCase() == "E";
	});

	patients[++index] = patients_info.filter((patient) => {
		return patient.last_name.substr(0,1).toUpperCase() == "F";
	});

	patients[++index] = patients_info.filter((patient) => {
		return patient.last_name.substr(0,1).toUpperCase() == "G";
	});

	patients[++index] = patients_info.filter((patient) => {
		return patient.last_name.substr(0,1).toUpperCase() == "H";
	});

	patients[++index] = patients_info.filter((patient) => {
		return patient.last_name.substr(0,1).toUpperCase() == "I";
	});

	patients[++index] = patients_info.filter((patient) => {
		return patient.last_name.substr(0,1).toUpperCase() == "J";
	});

	patients[++index]= patients_info.filter((patient) => {
		return patient.last_name.substr(0,1).toUpperCase() == "K";
	});

	patients[++index] = patients_info.filter((patient) => {
		return patient.last_name.substr(0,1).toUpperCase() == "L";
	});

	patients[++index] = patients_info.filter((patient) => {
		return patient.last_name.substr(0,1).toUpperCase() == "M";
	});

	patients[++index] = patients_info.filter((patient) => {
		return patient.last_name.substr(0,1).toUpperCase() == "N";
	});

	patients[++index] = patients_info.filter((patient) => {
		return patient.last_name.substr(0,1).toUpperCase() == "O";
	});

	patients[++index] = patients_info.filter((patient) => {
		return patient.last_name.substr(0,1).toUpperCase() == "P";
	});

	patients[++index] = patients_info.filter((patient) => {
		return patient.last_name.substr(0,1).toUpperCase() == "Q";
	});

	patients[++index] = patients_info.filter((patient) => {
		return patient.last_name.substr(0,1).toUpperCase() == "R";
	});

	patients[++index] = patients_info.filter((patient) => {
		return patient.last_name.substr(0,1).toUpperCase() == "S";
	});

	patients[++index] = patients_info.filter((patient) => {
		return patient.last_name.substr(0,1).toUpperCase() == "T";
	});

	patients[++index] = patients_info.filter((patient) => {
		return patient.last_name.substr(0,1).toUpperCase() == "U";
	});

	patients[++index] = patients_info.filter((patient) => {
		return patient.last_name.substr(0,1).toUpperCase() == "V";
	});

	patients[++index] = patients_info.filter((patient) => {
		return patient.last_name.substr(0,1).toUpperCase() == "W";
	});

	patients[++index] = patients_info.filter((patient) => {
		return patient.last_name.substr(0,1).toUpperCase() == "X";
	});

	patients[++index] = patients_info.filter((patient) => {
		return patient.last_name.substr(0,1).toUpperCase() == "Y";
	});

	patients[++index] = patients_info.filter((patient) => {
		return patient.last_name.substr(0,1).toUpperCase() == "Z";
	});

	return patients;

}