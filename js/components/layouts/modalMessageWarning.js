Vue.component('modalMessageWarning', {
	props: ['isActive','message', 'isConfirmation', 'isLoading'],
	template: `
		
		<div >

			<div class="modal" :class="{ 'is-active': isActive }">
				<div class="modal-background"></div>
				<div class="modal-content box">
					<!-- Any other Bulma elements you want -->
					<div class="w3-row" v-if="isConfirmation">
						<span class='w3-right has-text-warning'><i class="fas fa-exclamation-triangle fa-2x"></i></span>
					</div>
					<div class="w3-row " v-else="">
						<span class='w3-right has-text-warning' v-if="!isLoading"><i class="fas fa-exclamation-triangle fa-2x"></i></span>
						<span class='w3-right ' v-else="">
							<i class="fas fa-spinner fa-2x"></i>
						</span>
					</div>
					<hr>
					<div class="w3-row">
						{{message}}
					</div>
					<br>
					<div class="w3-row w3-center">
						<div class="w3-row" v-if="isConfirmation">

							<button class="w3-margin-right button is-warning" @click="isConfirmed">&nbspYes&nbsp</button>
							<button class=" button is-danger" @click="closeModal">&nbspNo&nbsp</button>

						</div>
						<div class="w3-row" v-else="">
						
						</div>
					</div>
				</div>
				<button class="modal-close is-large" aria-label="close"  @click="closeModal" :disabled="isLoading"></button>
			</div>

		</div>

	`,

	data(){

		return{
			isDisableSaveButton : false
		}

	},

	methods : {

		closeModal(){
			this.$emit("close-modal");
		},

		isConfirmed(){
			this.$emit("is-confirmed");
		}
	}

});

