Vue.component('perLetterPatients', {
	props: ['patients','search','patientLetter'],
	template: `
		
		
        <div class="w3-row" v-if="patients.length != 0">
            <div class="w3-col l12">
                <div class="w3-row-padding">
                    <div class="w3-row-padding w3-border-bottom w3-border-top" :id="patientLetter">
                        <span class="w3-large"><strong>{{patientLetter}}</strong></span>
                        <span class="w3-small w3-text-grey">&nbsp&nbsp{{patients.length}} </span>
                        <span class="w3-small w3-text-grey" v-if="patients.length > 1">registered patients</span>
                        <span class="w3-small w3-text-grey" v-else="">registered patient</span>
                    </div>
                    <div class="w3-row">
                        <div class="w3-row-padding" v-for="n in numberOfRows ">

                            <div class="w3-col l4 " 
                                v-for="(patient,index) in patients" 
                                v-if="index < n*3 && index >= (n*3)-3"
                                @click="onPatientSelect(patient.id)"
                            >
                                <div class="w3-row w3-leftbar w3-panel pointer w3-border w3-card" style="height: 75px;">
                                    <div class="w3-row">
                                        <i class="w3-serif w3-large"><strong>{{patient.last_name}},&nbsp</strong></i><i class="w3-serif w3-large">{{patient.first_name}} {{patient.middle_name}}</i>
                                    </div>
                                    <p class="w3-tiny"><strong><span class="w3-text-blue">Date of Birth:</span> &nbsp</strong>{{patient.date_of_birth}}</p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


	`,

    computed : {


        numberOfRows() {

            return Math.ceil(this.patients.length/3);

        }

    },

	methods : {

		onPatientSelect(patientId){

			this.$emit('select-patient', patientId);

		}
	}


});