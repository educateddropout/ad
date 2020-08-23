Vue.component('v-select', VueSelect.VueSelect);

var sc = new Vue({

	el: '#schedules',


	data: {
		
		pageCounter : 5,
		userData : {
			userId : -1,
			userName : "",
			userType : -1,
			isDentist : -1,
			allowedAccess : 0
		},
		dentistsLibrary : [],
		selectedDate : "",
		timeSchedulesLibrary : [],
		schedulesLibrary : [],
		patientsLibrary : [],

		weekday : ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
		monthText : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
		today : {"weekday":"Saturday","date":7,"year":2019,"month":"September","completeDate":"2019-09-07"},
		tomorrow : {"weekday":"Sunday","date":8,"year":2019,"month":"September","completeDate":"2019-09-08"},
		dayAfterTomorrow : {"weekday":"Monday","date":9,"year":2019,"month":"September","completeDate":"2019-09-09"},
		yesterday : {"weekday":"Friday","date":6,"year":2019,"month":"September","completeDate":"2019-09-06"},
		dayBeforeYesterday : {"weekday":"Thursday","date":5,"year":2019,"month":"September","completeDate":"2019-09-05"}

	},

	created(){

		var self = this;

		let urlData = getUrlParameters("date");
		
		if(urlData == null) urlData = moment().toISOString(true).substring(0,10);

		let today = new moment(urlData);

		this.scheduledDateToView = today.toISOString(true).substring(0,10);

		this.today.weekday = this.weekday[today.get('day')];

		this.today.date = today.get('date');

		this.today.year = today.get('year');

		this.today.month = this.monthText[today.get('month')];

		this.today.completeDate = today.toISOString(true).substring(0,10);
		//tommorrow

		let tomorrow = today.add(1, 'days');

		this.tomorrow.weekday = this.weekday[tomorrow.get('day')];

		this.tomorrow.date = tomorrow.get('date');

		this.tomorrow.year = tomorrow.get('year');

		this.tomorrow.month = this.monthText[tomorrow.get('month')];

		
		this.tomorrow.completeDate = new moment(urlData).add(2, 'days').toISOString().substring(0,10);

		//dayAfterTomorrow
		let dayAftertomorrow = today.add(1, 'days');

		this.dayAfterTomorrow.weekday = this.weekday[dayAftertomorrow.get('day')];

		this.dayAfterTomorrow.date = dayAftertomorrow.get('date');

		this.dayAfterTomorrow.year = dayAftertomorrow.get('year');

		this.dayAfterTomorrow.month = this.monthText[dayAftertomorrow.get('month')];

		this.dayAfterTomorrow.completeDate = new moment(urlData).add(3, 'days').toISOString().substring(0,10);

		//yesterday
		let yesterday = today.add(-3, 'days');

		this.yesterday.weekday = this.weekday[yesterday.get('day')];

		this.yesterday.date = yesterday.get('date');

		this.yesterday.year = yesterday.get('year');

		this.yesterday.month = this.monthText[yesterday.get('month')];

		this.yesterday.completeDate = new moment(urlData).toISOString().substring(0,10);

		//dayBeforeYesterday
		let dayBeforeYesterday = today.add(-1, 'days');

		this.dayBeforeYesterday.weekday = this.weekday[dayBeforeYesterday.get('day')];

		this.dayBeforeYesterday.date = dayBeforeYesterday.get('date');

		this.dayBeforeYesterday.year = dayBeforeYesterday.get('year');

		this.dayBeforeYesterday.month = this.monthText[dayBeforeYesterday.get('month')];

		this.dayBeforeYesterday.completeDate = new moment(urlData).add(-1, 'days').toISOString().substring(0,10);

		this.listOfDentist();

		//this.listOfTimeSchedules();

		this.listOfPatients();
		

	},

	mounted(){
		
	},

	methods: {

		copyUserData(userData){
			this.userData = userData;
		},

		listOfDentist(){

			var self = this;

			axios.get('../php/api/listOfActiveDentist.php')
			.then(function (response){

				self.dentistsLibrary = response.data.list_of_dentists;
				self.listOfTimeSchedules();
				

			})
			.catch(function (error) {
				console.log(error);
			});

		},

		listOfPatients(){
			var self = this;

			axios.get('../php/api/listOfPatientsSchedule.php')
			.then(function (response){
				
				self.patientsLibrary = response.data.patients_details;

				self.patientsLibrary.unshift( {
					id : '0',
					patient_name : "NEW PATIENT"
				});

			})
			.catch(function (error) {
				console.log(error);
			});
		},

		listOfTimeSchedules(){

			var self = this;

			// list of time schedules
			axios.get('../php/api/listOfTimeSchedules.php')
			.then(function (response){
				
				self.timeSchedulesLibrary = response.data.time_schedules;
				self.fetchSchedulesOnSelectedDate();
				
			})
			.catch(function (error) {
				console.log(error);
			});

		},

		fetchSchedulesOnSelectedDate(){

			var self = this;

			axios.post( '../php/api/fetchSchedulesOnSelectedDate.php',{

                active_dentists : this.dentistsLibrary,
                date : this.scheduledDateToView
                
	        }).then(function(response){
	        	
	            self.schedulesLibrary = response.data;
	            

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

        			Vue.set(self.schedulesLibrary[index], 'result2', schedObj);
	            });

	        })
	        .catch(function(error){
	            console.log(error);
	        });

		},

		clickedDate(date){

			window.location.replace("schedules.html?date="+date);

		},

		selectDate(){

			window.location.replace("schedules.html?date="+this.selectedDate);
		},

		refreshSchedule(){

			this.fetchScheduleOnSelectedDate();

		}

	}

});