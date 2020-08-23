Vue.component('filters', {
	props: [ 'userData', 'dentistCheck', 'dentistsLibrary', 'paymentTypeLibrary', 'paymentTypeCheck'],
	template: `
		<div class="w3-row">

			<div class="w3-row">
                <button class="button is-info is-outlined" @click="filterShow = true" v-if="!filterShow">Show Filters &nbsp<i class="fas fa-filter"></i></button>
                <button class="button is-danger is-outlined" @click="filterShow = false" v-if="filterShow">Close Filters &nbsp<i class="fas fa-filter"></i></button>

                
            </div>

            <div class="w3-row w3-border" v-show="filterShow">
                <div class="w3-row w3-container"><strong>By Dentist:</strong></div>
                <div class="w3-row">
                    <div class="w3-col l1">&nbsp</div>
                    <div class="w3-col l10">
                        <div class="w3-row-padding">
                            <span v-for="(dentist,index) in dentistsLibrary">
                                <div class="w3-col l4">
                                <input class="w3-check" type="checkbox"  v-model="dentistCheck.id[index]">
                                <label>{{dentist.name}}</label>
                                </div>
                            </span>
                        </div>
                    </div>
                    <div class="w3-col l1">&nbsp</div>
                </div>
                <hr>
                <div class="w3-row w3-container"><strong>By Payment Type:</strong></div>
                <div class="w3-row">
                    <div class="w3-col l1">&nbsp</div>
                    <div class="w3-col l10">
                        <div class="w3-row-padding">
                            <span v-for="(payment,index) in paymentTypeLibrary">
                                <div class="w3-col l4">
                                <input class="w3-check" type="checkbox"  v-model="paymentTypeCheck.id[index]">
                                <label>{{payment.name}}</label>
                                </div>
                            </span>
                        </div>
                    </div>
                    <div class="w3-col l1">&nbsp</div>
                </div>
                <br>
            </div>

		</div>

	`,

	data() {

		return {

			filterShow : false
			

		}
	}


});