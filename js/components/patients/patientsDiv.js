Vue.component('patientsDiv', {
	props: ['patients', 'search', 'patientsLetter'],
	template: `
		<div>
			<div v-for="(perLetterPatient,index) in patients">
				<per-letter-patients
					:patients = "perLetterPatient"
					:search = "search"
					:patient-letter = "patientsLetter[index]"
					@select-patient = "selectPatient"
				></per-letter-patients>
	        </div>
        </div>

	`,

	

	methods : {

		selectPatient(patientId){

			this.$emit('select-patient', patientId);

		}
	}


});