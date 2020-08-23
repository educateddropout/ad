Vue.component('input-div', {

		template: `
			<div class="row">
				<div class="columns">
					<div class="column is-one-quarter is-size-5">
						<strong><slot name="fieldName"></slot></strong>
					</div>
					<div class="column">
						<div class="columns">
							<div class="column is-two-thirds">
								<div class="field">
									<slot></slot>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		`

});

Vue.component('input-div2', {

		template: `
			<div class="row">
				<div class="columns">
					<div class="column is-one-quarter is-size-5">
						<slot name="fieldName"></slot>
					</div>
					<div class="column">
						<div class="columns">
							<div class="column is-two-thirds">
								<div class="field">
									<slot></slot>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		`

});

Vue.component('input-div3', {

		template: `
			<div class="row">
				<div class="columns">
					<div class="column is-8 is-size-5">
						<strong><slot name="fieldName"></slot></strong>
					</div>
					<div class="column">
						<div class="field ">
							<slot></slot>
						</div>
					</div>
				</div>
			</div>
		`

});

Vue.component('q13-checkboxes', {

		template: `
			<div class="row">
				<div class="column is-10 is-offset-1">
					<div class="columns">
						<div class="column is-4">
							<div class="field">
								<slot name="column1"></slot>
							</div>
						</div>
						<div class="column is-4">
							<div class="field">
								<slot name="column2"></slot>
							</div>
						</div>
						<div class="column is-4">
							<div class="field">
								<slot name="column3"></slot>
							</div>
						</div>
					</div>
				</div>
			</div>
		`

});

Vue.component('sub-input', {

		template: `
			<div class="row">
				<div class="column is-offset-1 is-11">
					<div class="columns">
						<div class="column is-5 is-size-5"><li><slot name="question"></slot></li></div>
						<div class="column is-4">
							<slot></slot>
						</div>
					</div>
				</div>
			</div>
		`

});


var rg = new Vue ({

	el: '#root',

	data: {

		stepCounter : 1,
		step1Done : false,
		first_name :  "",
		first_name_err :  false,
		last_name : "",
		last_name_err : false,
		middle_name : "",
		sex_radio : 1,
		date_of_birth : "",
		date_of_birth_err : false,
		mobile_no : "",
		email : "",
		address : "",
		address_err : false,
		occupation : "",
		referral : -1,
		reason_for_dental : "",
		dental_insurance : false,
		dental_insurance_name : "",
		dental_insurance_name_err : "",
		dental_insurance_validity : "",
		dental_insurance_validity_err : "",
		previous_dentist : "",
		last_visit : "",
		physician_name : "",
		physician_specialty : "",
		physician_address : "",
		physician_number : "",
		q1 : -1,
		q2 : -1,
		q2_2 : "",
		q3 : -1,
		q3_2 : "",
		q4 : -1,
		q4_2 : "",
		q5 : -1,
		q5_2 : "",
		q6 : -1,
		q7 : -1,
		q8_1 : false,
		q8_2 : false,
		q8_3 : false,
		q8_4 : false,
		q8_5 : false,
		q8_6 : false,
		q8_6Other : "",
		q9 : "",
		q10_1: -1,
		q10_2: -1,
		q10_3: -1,
		q11 : "",
		q12 : "",
		q13_1 : false,
		q13_2 : false,
		q13_3 : false,
		q13_4 : false,
		q13_5 : false,
		q13_6 : false,
		q13_7 : false,
		q13_8 : false,
		q13_9 : false,
		q13_10 : false,
		q13_11 : false,
		q13_12 : false,
		q13_13 : false,
		q13_14 : false,
		q13_15 : false,
		q13_16 : false,
		q13_16Other : "",
		q13_6Other : "",
		canvas : "",
		signaturePad : {}
		

	},

	mounted(){

		this.signaturePad = new SignaturePad(document.getElementById("signature"));
		//var signaturePad = new SignaturePad(canvas);
	},

	methods : {

		clearSignature(){
			this.signaturePad.clear();
		},

		onNext() {

			this.first_name_err = validateRequired(this.first_name);
			this.last_name_err = validateRequired(this.last_name);
			this.date_of_birth_err = validateRequired(this.date_of_birth);
			this.address_err = validateRequired(this.address);


			this.dental_insurance_name_err = validateInsuranceName(this.dental_insurance_name,this.dental_insurance);
			this.dental_iinsurance_validity_err = validateInsuranceValidity(this.dental_insurance_validity,this.dental_insurance);
			

			if(!this.first_name_err && !this.last_name_err && !this.date_of_birth_err && !this.address_err && !this.insurance_name_err && !this.insurance_validity_err){
				this.firstPage = false;
				this.secondPage = true;
			}
			else{
				alert("Please provide necessary input to the required fields.");
			}
			

		},

		onNextStep(stepNumber){
			//alert(stepNumber);
			

			if(stepNumber == 1){

				this.first_name_err = validateRequired(this.first_name);
				this.last_name_err = validateRequired(this.last_name);
				this.date_of_birth_err = validateRequired(this.date_of_birth);
				this.address_err = validateRequired(this.address);

				this.dental_insurance_name_err = validateInsuranceName(this.dental_insurance_name,this.dental_insurance);
				this.dental_insurance_validity_err = validateInsuranceValidity(this.dental_insurance_validity,this.dental_insurance);

				if(!this.first_name_err && !this.last_name_err && !this.date_of_birth_err && !this.address_err && !this.dental_insurance_name_err && !this.dental_insurance_validity_err){
					this.stepCounter = stepNumber + 1;
				}
				else{
					alert("Please provide necessary input to the required fields.");
				}

				
			}

			if(stepNumber == 2){

				this.stepCounter = stepNumber + 1;

			}

			if(stepNumber == 3){

				if(!this.signaturePad.isEmpty()){
					$("#dummyImage").attr("src",this.signaturePad.toDataURL());

					let signaturePad = (document.getElementById("dummyImage").src).replace(/^data:image\/(png|jpg);base64,/,"");

					axios.post( '../php/api/registerPatient.php',{
						first_name : this.first_name,
						last_name : this.last_name,
						middle_name : this.middle_name,
						sex : this.sex_radio,
						date_of_birth : this.date_of_birth,
						mobile_no : this.mobile_no,
						email_address : this.email,
						address : this.address,
						occupation : this.occupation,
						referral : this.referral,
						reason_for_dental : this.reason_for_dental,
						dental_insurance : translateBoolean(this.dental_insurance),
						dental_insurance_name : this.dental_insurance_name,
						dental_insurance_validity : this.dental_insurance_validity,
						previous_dentist : this.previous_dentist,
						last_visit : this.last_visit,
						physician_name : this.physician_name,
						physician_address : this.physician_address,
						physician_specialty : this.physician_specialty,
						physician_number : this.physician_number,
						q1 : this.q1,
						q2 : this.q2,
						q2_2 : this.q2_2,
						q3 : this.q3,
						q3_2 : this.q3_2,
						q4 : this.q4,
						q4_2 : this.q4_2,
						q5 : this.q5,
						q5_2 : this.q5_2,
						q6 : this.q6,
						q7 : this.q7,
						q8_1 : translateBoolean(this.q8_1),
						q8_2 : translateBoolean(this.q8_2),
						q8_3 : translateBoolean(this.q8_3),
						q8_4 : translateBoolean(this.q8_4),
						q8_5 : translateBoolean(this.q8_5),
						q8_6 : translateBoolean(this.q8_6),
						q8_6Other : this.q8_6Other,
						q9 : this.q9,
						q10_1 : this.q10_1,
						q10_2 : this.q10_2,
						q10_3 : this.q10_3,
						q11 : this.q11,
						q12 : this.q12,
						q13_1 : translateBoolean(this.q13_1),
						q13_2 : translateBoolean(this.q13_2),
						q13_3 : translateBoolean(this.q13_3),
						q13_4 : translateBoolean(this.q13_4),
						q13_5 : translateBoolean(this.q13_5),
						q13_6 : translateBoolean(this.q13_6),
						q13_7 : translateBoolean(this.q13_7),
						q13_8 : translateBoolean(this.q13_8),
						q13_9 : translateBoolean(this.q13_9),
						q13_10 : translateBoolean(this.q13_10),
						q13_11 : translateBoolean(this.q13_11),
						q13_12 : translateBoolean(this.q13_12),
						q13_13 : translateBoolean(this.q13_13),
						q13_14 : translateBoolean(this.q13_14),
						q13_15 : translateBoolean(this.q13_15),
						q13_16 : translateBoolean(this.q13_16),
						q13_16Other : this.q13_16Other,
						signature : signaturePad

					}).then(function(response){
						console.log(response.data);
					})
					.catch(function(){
						console.log('FAILURE!!');
					});

					this.stepCounter = stepNumber + 1;
					
				} else {
					alert("Please provide your signature");
				}

			}

			if(stepNumber == 4){
				location.reload();
			}

		},

		onPreviousStep(stepNumber){

			this.stepCounter = stepNumber - 1;

		},

		clearSignature(){
			this.signaturePad.clear();
			
		}


	}

});

function validateRequired(field) {

	if(field == "")
		return true;

	return false;
}

function validateInsuranceName(field, hasDentalInsurance){

	let retVal = "";

	if(hasDentalInsurance == true){
		
		if(field == "") retVal = "This is required";
	}

	return retVal;
}

function validateInsuranceValidity(field, hasDentalInsurance){

	let retVal = "";

	if(hasDentalInsurance == true){
		if(field == "") retVal = "This is required";
	}

	return retVal;
}