Vue.component('tableContentSchedule', {
	props: ['userData'],
	template: `
        <div class="content">
            <table class="table is-fullwidth is-striped">
                <tbody>
                </tbody>
            </table>
        </div>
	`,
	data() {

		return {

            dateToday : ""

		}

	},

    created(){

        let today = new moment(moment().toISOString(true).substring(0,10));

        this.dateToday = today.toISOString(true).substring(0,10);

    },

    mounted(){

        alert(this.userData.userId);
        this.getScheduleByDentist(this.userData.userId, this.dateToday);

    },

    methods : {

        getScheduleByDentist(dentistId, date){
            var self = this;

            axios.post( '../php/api/getSchedulesByDentist.php',{
                dentist_id : dentistId,
                date : date
                
            }).then(function(response){

                console.log(response.data);

                self.dentistSchedules = response.data.schedule_of_dentist;

            })
            .catch(function(error){
                alert(error);
            });

        }

    }




});