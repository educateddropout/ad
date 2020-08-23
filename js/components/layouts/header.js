Vue.component('headerNav', {
	props: ['pageCounter'],
	template: `

		<nav class="navbar is-dark" role="navigation" aria-label="main navigation ">
	        <div class="navbar-brand">
	            <a class="navbar-item" >
	                <img src="../assets/images/ad_logo.png" width="120" height="100">
	            </a>

	            <a role="button" class="navbar-burger" :class="{'is-active' : showNavbarMobile}" aria-label="menu" aria-expanded="false" @click="toggleNavbarMobile">
				  <span aria-hidden="true"></span>
				  <span aria-hidden="true"></span>
				  <span aria-hidden="true"></span>
				</a>
	        </div>

	        <div id="navbarBasicExample" class="navbar-menu" :class="{'is-active' : showNavbarMobile}">
	            <div class="navbar-start">

	                <a class="navbar-item" :class="{'is-active' : pageCounter == 1}" href="dashboard.html">
	                    <span class="has-text-link"><i class="fas fa-home"></i></span> &nbsp Home
	                </a>

	                <a class="navbar-item" :class="{'is-active' : pageCounter == 2}" href="patients.html">
	                    <span class="has-text-link"><i class="fas fa-user-alt"></i></span> &nbsp Patients 
	                    	<span v-show="pendingPatientInfo != 0">({{pendingPatientInfo}})</span>
	                </a>

	                <div class="navbar-item has-dropdown is-hoverable">
	                    <a class="navbar-link" :class="{'is-active' : pageCounter == 3}">
	                        <span class="has-text-link"><i class="fas fa-file-alt"></i></span> &nbsp Reports
	                    </a>

	                    <div class="navbar-dropdown">
	                        <a class="navbar-item" href="treatment-records.html">
	                            <i class="fas fa-file-invoice"></i> &nbsp Treatment Records
	                        </a>
	                        <a class="navbar-item" href="payment-records.html">
	                            <i class="fas fa-file-invoice-dollar"></i> &nbsp Payments
	                        </a>
	                    </div>
	                </div>

	                <div class="navbar-item has-dropdown is-hoverable " v-if="userData.userType != 2">
	                    <a class="navbar-link" :class="{'is-active' : pageCounter == 4}">
	                        <span class="has-text-link"><i class="fas fa-tasks"></i></span> &nbsp Manage
	                    </a>

	                    <div class="navbar-dropdown">
	                        <a class="navbar-item" href="manage-libraries.html">
	                            <i class="fas fa-book-reader"></i> &nbsp Libraries
	                        </a>
	                        <a class="navbar-item" href="manage-users.html">
	                            <i class="fas fa-users"></i> &nbsp Users
	                        </a>
	                        <a class="navbar-item">
	                            <i class="fas fa-user-md"></i> &nbsp Dentist
	                        </a>
	                        <hr class="navbar-divider">
	                        <a class="navbar-item">
	                        Report an issue
	                        </a>
	                    </div>
	                </div>

	                <a class="navbar-item" :class="{'is-active' : pageCounter == 5}" href="schedules.html">
	                    <span class="has-text-link"><i class="fas fa-calendar-alt"></i></span> &nbsp Schedules
	                </a>

	                <div class="navbar-item has-dropdown is-hoverable " v-if="userData.userType != 2">
	                    <a class="navbar-link" :class="{'is-active' : pageCounter == 6}">
	                        <span class="has-text-link"><i class="fas fa-tags"></i></span> &nbsp Misc 
	                    </a>

	                    <div class="navbar-dropdown">
	                        <a class="navbar-item" href="misc-expenses.html">
	                            <span class="has-text-link"><i class="fas fa-credit-card"></i></span> &nbsp Misc Expenses 
	                        </a>
	                        <a class="navbar-item" href="cash-denomination.html">
	                            <span class="has-text-link"><i class="fas fa-wallet"></i></span> &nbsp Cash Denomination 
	                        </a>
	                    </div>
	                </div>

	            </div>

	            <div class="navbar-end">
	            <div class="navbar-item">
					
					<div class="navbar-item has-dropdown is-hoverable">
		            	<a class="navbar-link" :class="{'is-active' : pageCounter == 5}">
	                        <span class="has-text-link"><i class="fas fa-cog"></i></span> &nbsp
	                    </a>

	                    <div class="navbar-dropdown">
	                        <a class="navbar-item" href="change-password.html">
	                            <i class="fas fa-key"></i> &nbsp Change Password
	                        </a>
	                    </div>
	                </div>

					<a class="w3-padding w3-border-right w3-hover-purple w3-hide-small w3-hide-medium" href="register-w-o-sig.html">
	                    Register a patient without signature?
	                </a>
	                <a class="w3-padding w3-border-right w3-hover-purple w3-hide-small w3-hide-medium" href="register.html">
	                    Register a patient?
	                </a>
	                <br>
	                <div class="buttons">
	                    &nbsp&nbsp
	                    <a class="button is-light" @click="signOut">
	                        <i class="fas fa-sign-out-alt"></i> &nbsp Sign out
	                    </a>
	                </div>
	            </div>
	            </div>
	        </div>
	    </nav>

	`,

	data(){

		return {
			pendingPatientInfo : 0,
			userData : {
				userId : -1,
				userName : "",
				userType : -1,
				isDentist : -1,
				allowedAccess : 0
			},
			showNavbarMobile : false
		}

	},
	created(){
		this.authentication();
	},

	mounted(){

		this.totalPendingPatientCount();

	},

	methods : {

		toggleNavbarMobile(){

			if(this.showNavbarMobile == true) this.showNavbarMobile = false;
			else this.showNavbarMobile = true;
		},

		signOut(){

			axios.get('../php/api/logout.php')
			.then(function (response){

				window.location.replace("login.html");

			})
			.catch(function (error) {
				alert(error);
			});

		},

		authentication(){
			var self = this;

			axios.get('../php/api/userAuthentication.php')
			.then(function (response){
				//alert(response.data);
				if(response.data.allowedAccess == 0){
					window.location.replace("login.html");
					alert("You're not allowed to access this system");
				} 

				let userData = {
					userId : response.data.id,
					userName : response.data.name,
					userType : response.data.userType,
					isDentist : response.data.isDentist,
					allowedAccess : response.data.allowedAccess
				};

				self.userData = userData;
				self.$emit("copy-user-data", self.userData);
				


			})
			.catch(function (error) {
				alert(error);
			});

		},

		totalPendingPatientCount(){

			var self = this;

			//list of dentist
			axios.get('../php/api/totalPendingPatientCount.php')
			.then(function (response){

				self.pendingPatientInfo = response.data.total_pending_count;
				self.$emit('send-total-pending-count', response.data.total_pending_count);

			})
			.catch(function (error) {
				alert(error);
			});

		},

		updatePendingPatientInfo(totalPendingCount){

			this.pendingPatientInfo = totalPendingCount;
		}

	}


});