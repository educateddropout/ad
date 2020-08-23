Vue.component('modalCancel', {
	props: ['isActive', 'detail', 'timeStarted', 'timeEnded', 'title'],
	template: `
		
		<div >

			<div class="modal" :class="{'is-active' : isActive}">
				<div class="modal-background"></div>
				<div class="modal-card">
					<header class="modal-card-head">
						<p class="modal-card-title">{{title}}</p>
						<button class="delete" aria-label="close"  @click="closeModal"></button>
					</header>
					<section class="modal-card-body">
						<!-- Content ... -->
						<div class="w3-row">
							<div class="w3-row ">
                                <div class="w3-row w3-container w3-text-deep-orange w3-center"><b>{{timeStarted}} - {{timeEnded}}</b></div>
                                <br>
                                <div class="w3-row w3-container">
                                	<div class="w3-col l4">
	                                    <b>
	                                        Patient Name: 
	                                    </b>
                                    </div>
                                    <div class="w3-col l8">
                                    	<span>{{schedDetail(detail,0)}}</span> | 
	                                    <b>
	                                        <span class="w3-text-blue" v-if="schedDetail(detail,3) == 'N'">NEW PATIENT</span>
	                                        <span class="w3-text-yellow" v-else="">OLD PATIENT</span>
	                                    </b>
	                                </div>
                                </div>

                                <div class="w3-row w3-container">
                                	<div class="w3-col l4">
                                		<b>Contact Number:</b> 
                                	</div>
                                	<div class="w3-col l8">
                                		<span>{{schedDetail(detail,1)}}</span> 
                                	</div>
                                </div>
                                <div class="w3-row w3-container">
                                	<div class="w3-col l4">
                                		<b>Procedure/Treatment:</b>
                                	</div>
                                	<div class="w3-col l8">
                                		<span>{{schedDetail(detail,2)}}</span> 
                                	</div>
                                </div>
                                
                            	<div class="w3-row w3-container" v-if="title == 'Cancel Appointment'">
	                            	<br>
	                                <br>
                            		Reason of Cancellation?
                            		<textarea class="textarea" 
                            			:class="{'is-danger':reason.error != ''}"
                            			rows="3" v-model="reason.value"
                            			@change = "validateReason"
                            		></textarea>
                            		<p class="help is-danger">{{reason.error}}</p>
                            	</div>
                            	<br>
                            	<br>
                            </div>
						</div>
					</section>
					<footer class="modal-card-foot">
						<button class="button is-success" @click="proceedCancellation" v-if="title == 'Cancel Appointment'">Proceed Cancellation</button>
						<button class="button is-success" @click="undoCancellation" v-else="" >Undo Cancellation</button>
					
					</footer>
				</div>
			</div>

		</div>

	`,

	data(){

		return{
			isDisableSaveButton : false,
			reason : { value : '', error : ''},
		}

	},

	methods : {

		closeModal(){
			this.$emit("close-modal");
		},

		proceedCancellation(){

			this.validateReason();

			if(this.reason.error == "") this.$emit("proceed-cancellation", this.reason.value);

		},

		undoCancellation(){

			this.$emit("undo-cancellation");
			
		},

		//return the specific needs
        schedDetail(detail, ctr){

            return detail.split(";")[ctr];

        },

        validateReason(){

        	if(this.reason.value == ""){
        		this.reason.error = "Please provide the reason of cancellation.";
        	} else {
        		this.reason.error = "";
        	}

        }
	}

});

