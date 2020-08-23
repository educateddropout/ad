Vue.component('patientTabSelection', {
	props: ['currentTab', 'userData', 'patientId'],
	template: `
		<div class="tabs is-centered is-boxed">
		    <ul>
		        <li @click="onClickTab(1)" :class="{'is-active' : currentTab == 1}">
		            <a>
		                <span class="icon is-small"><i class="fas fa-user-circle"></i></span>
		                <span class="w3-hide-small">Personal Information</span>
		            </a>
		        </li>
		        <li  @click="onClickTab(2) " :class="{'is-active' : currentTab == 2}" v-if="userData.isDentist == 1">
		            <a>
		                <span class="icon is-small"><i class="fas fa-tooth"></i></span>
		                <span class="w3-hide-small">Dental Records</span>
		            </a>
		        </li>
		        <li  @click="onClickTab(3)" :class="{'is-active' : currentTab == 3}">
		            <a>
		                <span class="icon is-small"><i class="fas fa-receipt"></i></span>
		                <span class="w3-hide-small">Treatment Records</span>
		            </a>
		        </li>
		        <li  @click="onClickTab(4)" :class="{'is-active' : currentTab == 4}">
		            <a>
		                <span class="icon is-small"><i class="far fa-image" aria-hidden="true"></i></span>
		                <span class="w3-hide-small">Pictures</span>
		            </a>
		        </li>
		        <li  @click="onClickTab(5)" :class="{'is-active' : currentTab == 5}">
		            <a>
		                <span class="icon is-small"><i class="fas fa-file-pdf"></i></span>
		                <span class="w3-hide-small">Other Files</span>
		            </a>
		        </li>
		    </ul>
		</div>

	`,

	methods : {

		onClickTab(index){

			if(index == 1){ 
							window.location.replace("patient-personal-information.html?id=" + this.patientId);}

			else if (index == 2) window.location.replace("patient-dental-records.html?id=" + this.patientId);

			else if (index == 3) window.location.replace("patient-treatment-records.html?id=" + this.patientId);
			
			else if (index == 4) window.location.replace("patient-dental-pictures.html?id=" + this.patientId);

			else if (index == 5) window.location.replace("patient-dental-other-info.html?id=" + this.patientId);


		}
	}


});