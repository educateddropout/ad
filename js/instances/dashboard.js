


var db = new Vue({

	el: '#dashboard',

	data: {
		
		// home page counter == 1	
		pageCounter : 1,
		userData : {
			userId : -1,
			userName : "",
			userType : -1,
			isDentist : -1,
			allowedAccess : 0
		},
		totalPatientsCount : "",
		dentistSchedules : [],
		dateToday : "",
		totalTreatmentsCount : 0,

		scheduleLibrary : [],
		timeSchedulesLibrary : [],
		hasSchedule : false
		
	},

	created(){

		let today = new moment(moment().toISOString(true).substring(0,10));

		this.dateToday = today.toISOString(true).substring(0,10);

		// Get List of Patients
		axios.get('../php/api/listOfPatients.php')
		.then(function (response){

			db.totalPatientsCount = response.data.patients_details.length;
			
		})
		.catch(function (error) {
			alert(error);
		});

		// Get List of Treatments
		axios.get('../php/api/totalTreatmentsCount.php')
		.then(function (response){

			db.totalTreatmentsCount = response.data.total_treatments_count;
			
		})
		.catch(function (error) {
			console.log(error);
		});

	},

	mounted (){

		
		this.listOfTimeSchedules();
		
	},

	methods: {

		copyUserData(userData){

			this.userData = userData;
			this.fetchScheduleOnSelectedDateByUser(userData.userId);

		},

		listOfTimeSchedules(){

			var self = this;

			// list of time schedules
			axios.get('../php/api/listOfTimeSchedules.php')
			.then(function (response){
				
				self.timeSchedulesLibrary = response.data.time_schedules;

			})
			.catch(function (error) {
				alert(error);
			});

		},

		//return the specific needs
        schedDetail(detail, ctr){

            return detail.split(";")[ctr];

        },

		fetchScheduleOnSelectedDateByUser(){
			var self = this;


			axios.post( '../php/api/fetchScheduleOnSelectedDateByUser.php',{

                dentist_id : this.userData.userId,
                date : this.dateToday
                
	        }).then(function(response){
	        	
	        	console.log(response.data);
	            self.scheduleLibrary = response.data;
	            
	            if(response.data.length > 0){
	            	self.hasSchedule = true;
		            response.data.forEach(function(sched, index){
		            	
		            	prevS = "";
		            	rowSpan = 0;
		            	rowOrigin = 0;
		            	schedObj = [];
		            	timeStarted = self.timeSchedulesLibrary[0].name;

		            	sched.result.forEach(function(s,index){

		            		if((s != prevS && index != 0) || (s == '' && index != 0)){

		            			dummyObj = {
		            				'row' : rowSpan,
		            				'rowOrigin' : rowOrigin,
		            				'detail' : prevS,
		            				'timeStarted' : timeStarted,
		            				'timeEnded' : self.timeSchedulesLibrary[index].name
		            			}

		            			timeStarted = self.timeSchedulesLibrary[index].name;
		            			rowOrigin = index;
		            			schedObj.push(dummyObj);
		            			rowSpan = 0;

		            		}

		            		rowSpan++;
		            		prevS = s;
		            	});

		            	dummyObj = {
	        				'row' : rowSpan,
	        				'rowOrigin' : rowOrigin,
	        				'detail' : prevS,
	        				'timeStarted' : timeStarted,
		            		'timeEnded' : '8:30 PM'
	        			}
	        			schedObj.push(dummyObj);

	        			Vue.set(self.scheduleLibrary[index], 'result2', schedObj);

		            });

		        }


	        })
	        .catch(function(error){
	            console.log(error);
	        });

		}

	}

});