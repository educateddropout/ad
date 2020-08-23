Vue.component('dentalRecord', {
	props: ['teethLabel','teethStatus','toothStatusLib','isUpper', 'updating', 'editing'],
	template: `

        <div class="w3-cell-row w3-padding-right" >
            <div class="w3-cell w3-center" v-for="(tooth,index) in teethLabel">
            	<div class="w3-row" v-if="isUpper">
                    <div class="w3-row w3-container w3-margin-bottom">
                        <div class="select">
                            <select v-model="teethStatus.status[index]" :disabled="disableSelection">
                                <option value="0"></option>
                                <option v-for="toothStatus in toothStatusLib" :value="toothStatus.code"> {{toothStatus.description}}
                                </option>
                            </select>
                        </div>
                    </div>
                	<strong>{{tooth}}</strong>
                </div>
                <div class="w3-row">
                	<div class="w3-row" v-if="!isUpper">
                    	<br>
                    </div>
                    <div id="menu">

                        <div class="item1 item" 
                            :class="{'w3-blue' : teethStatus.teeth[index].top == 1,
                                    'w3-red' : teethStatus.teeth[index].top == 2}" 
                            @click="updateToothPartTop(index)"
                        ></div>
                        <div class="item2 item" 
                            :class="{'w3-blue' : teethStatus.teeth[index].left == 1,
                                    'w3-red' : teethStatus.teeth[index].left == 2}"
                            @click="updateToothPartLeft(index)"
                        ></div>
                        <div class="item3 item" 
                            :class="{'w3-blue' : teethStatus.teeth[index].bottom == 1,
                                    'w3-red' : teethStatus.teeth[index].bottom == 2}"
                            @click="updateToothPartBottom(index)"
                        ></div>
                        <div class="item4 item" 
                            :class="{'w3-blue' : teethStatus.teeth[index].right == 1,
                                    'w3-red' : teethStatus.teeth[index].right == 2}"
                            @click="updateToothPartRight(index)"
                        ></div>
                        <div class="center" 
                            :class="{'w3-blue' : teethStatus.teeth[index].middle == 1,
                                    'w3-red' : teethStatus.teeth[index].middle == 2}"
                            @click="updateToothPartMiddle(index)"
                        ></div>

                    </div>
                    <div class="w3-row" v-if="isUpper">
                    	<br>
                    </div>
                </div>
				<div class="w3-row" v-if="!isUpper">
					<strong>{{tooth}}</strong>
                    <div class="w3-row w3-container w3-margin-top">
                        <div class="select">
                            <select v-model="teethStatus.status[index]" :disabled="disableSelection">
                                <option value="-1" disabled></option>
                                <option v-for="toothStatus in toothStatusLib" :value="toothStatus.code"> {{toothStatus.description}}
                                </option>
                            </select>
                        </div>
                    </div>
                	
                </div>
            </div>
        </div>
	`,
    computed : {
        disableSelection(){
            let retVal = true;

            if(this.editing || this.updating) retVal = false;


            return retVal;
        }
    },

	methods : {


		updateToothPartTop(index){
			
			if(this.updating || this.editing){
				this.teethStatus.teeth[index].top++;

				if(this.teethStatus.teeth[index].top > 2){
					// reset
					this.teethStatus.teeth[index].top = 0;
				}
			}
		},

		updateToothPartLeft(index){
			
			if(this.updating || this.editing){
				this.teethStatus.teeth[index].left++;

				if(this.teethStatus.teeth[index].left > 2){
					// reset
					this.teethStatus.teeth[index].left = 0;
				}
			}

		},

		updateToothPartBottom(index){

			if(this.updating || this.editing){
			
				this.teethStatus.teeth[index].bottom++;

				if(this.teethStatus.teeth[index].bottom > 2){
					// reset
					this.teethStatus.teeth[index].bottom = 0;
				}
			}

		},

		updateToothPartRight(index){
			
			if(this.updating || this.editing){
				this.teethStatus.teeth[index].right++;

				if(this.teethStatus.teeth[index].right > 2){
					// reset
					this.teethStatus.teeth[index].right = 0;
				}
			}

		},

		updateToothPartMiddle(index){

			if(this.updating || this.editing){
				this.teethStatus.teeth[index].middle++;

				if(this.teethStatus.teeth[index].middle > 2){
					// reset
					this.teethStatus.teeth[index].middle = 0;
				}
			}

		}

	}

});
