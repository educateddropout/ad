Vue.component('updateModalSignature', {
	props: ['patientId','isUpdateSignatureModalActive'],
	template: `
		
		<div >

			<div class="modal" :class="{ 'is-active': isUpdateSignatureModalActive }">
				<div class="modal-background"></div>
				<div class="modal-card">
					<header class="modal-card-head">
						<p class="modal-card-title">Modal title</p>
						<button class="delete" aria-label="close" @click="closeModal"></button>
					</header>
					<section class="modal-card-body">
						<br>
						<div class="row has-text-centered ">
							<br>
							<canvas class="is-fullwidth" id="signature" style="border: 1px solid #ddd;"></canvas>
							<br>
							
							<img id="dummyImage" src="" hidden>
							<button class="button is-danger is-outlined" @click="clearSignature"><i class="fas fa-trash-alt"></i>&nbsp Clear</button>
						</div>
						<br>
					</section>
					<footer class="modal-card-foot ">
						<button class="button is-success" @click="updateSignature" :disabled="isDisableSaveButton">Save changes</button>
						<button class="button" @click="closeModal">Cancel</button>
					</footer>
				</div>
			</div>
			
			<modal-message
				:is-active = "showSuccess"
				:message = "successMessage"
				@close-modal = "closeSuccessModal"
			>
			</modal-message>
		</div>

	`,

	data(){
		return{
			signaturePad : {},
			isDisableSaveButton : false,
			showSuccess : false,
			successMessage : ""
		}
	},

	mounted(){

		this.signaturePad = new SignaturePad(document.getElementById("signature"));
		//var signaturePad = new SignaturePad(canvas);
	},

	methods : {

		clearSignature(){
			this.signaturePad.clear();
		},

		updateSignature(){
			let self = this;

			this.isDisableSaveButton = true;

			if(!this.signaturePad.isEmpty()){
					$("#dummyImage").attr("src",this.signaturePad.toDataURL());

					let signaturePad = (document.getElementById("dummyImage").src).replace(/^data:image\/(png|jpg);base64,/,"");

					axios.post( '../php/api/updateSignature.php',{
						patientId : this.patientId,
						signature : signaturePad

					}).then(function(response){

						self.showSuccess = true;
						self.successMessage = "Successfully updated signature";

						//window.location.replace("patient-personal-information.html?id=" + self.patientId);

					})
					.catch(function(){
						console.log('FAILURE!!');
					});

			}
			else {
				this.isDisableSaveButton = false;
				alert("It so empty....");
			}
		},

		closeModal(){
			
			this.$emit('close-update-signature-modal');

		},

		closeSuccessModal(){

			window.location.replace("patient-personal-information.html?id=" + this.patientId);

		}

	}

});

