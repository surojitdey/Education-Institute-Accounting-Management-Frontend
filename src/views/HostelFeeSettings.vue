<template>
    <div class="hostel-fee-settings">
        <v-card fluid>
            <v-card-title class="text-uppercase">
                <span class="text-center">
                Hostel Admission Fee Setting
                </span>
            </v-card-title>
        </v-card>
        <v-tabs v-model="semester_tab" background-color="white" light class="elevation-1" show-arrows centered center-active>
            <v-tabs-slider></v-tabs-slider>
            <v-tab href="#odd" class="semester_border">odd semester</v-tab>
            <v-tab href="#even" class="semester_border">even semester</v-tab>
            <v-tab-item value="odd">
                <v-card flat>
                    <v-card-text class="mt-4 pt-0 my-0 py-0">
                        <v-row justify="space-between">
                            <v-col cols="12" sm="5" md="5" class="mt-0 pt-0 my-0 py-0">
                                <v-text-field label="Security Money" v-model="odd_fee_data.security_money" outlined dense :prepend-inner-icon="rupee_icon" :rules= "[rules.number]"></v-text-field>
                                <v-text-field label="Electricity Fee" v-model="odd_fee_data.electricity_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules= "[rules.number]"></v-text-field>
                                <v-text-field label="Mess Security" v-model="odd_fee_data.mess_security" outlined dense :prepend-inner-icon="rupee_icon" :rules= "[rules.number]"></v-text-field>
                                <v-text-field label="Seat Rent" v-model="odd_fee_data.seat_rent" outlined dense :prepend-inner-icon="rupee_icon" :rules= "[rules.number]"></v-text-field>
                                <v-text-field label="Misc" v-model="odd_fee_data.misc" outlined dense :prepend-inner-icon="rupee_icon" :rules= "[rules.number]"></v-text-field>
                                <v-text-field label="Late Fee" v-model="odd_fee_data.late_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules= "[rules.number]"></v-text-field>
                                <!-- <DatePicker :menu="date_menu" :date_value="odd_fee_data.last_admission_date" :date_picker_value="date_picker_value" @menu-close="date_menu=false" @date-picked="set_date"></DatePicker> -->
                                <v-menu
                                v-model="odd_date_menu"
                                :close-on-content-click="false"
                                :nudge-right="40"
                                transition="scale-transition"
                                offset-y
                                min-width="290px"
                                >
                                <template v-slot:activator="{ on }">
                                    <v-text-field
                                    v-model="odd_fee_data.last_admission_date"
                                    label="Last Date of Admisson"
                                    append-icon="event"
                                    v-on="on"
                                    outlined
                                    ></v-text-field>
                                </template>
                                <v-date-picker v-model="odd_date_picker_value" @input="odd_date_menu = false"></v-date-picker>
                                </v-menu>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-card-actions justify="center" class="ml-2 mt-0 pt-0">
                        <div class="flex-grow-0"></div>
                        <v-btn type="submit" color="success darken-1" width="115" @click="save_odd">Save</v-btn>
                        <v-btn color="error darken-1" width="115">Reset</v-btn>
                    </v-card-actions>
                </v-card>
            </v-tab-item>
            <v-tab-item value="even">
                <v-card flat>
                    <v-card-text class="mt-4 pt-0 my-0 py-0">
                        <v-row justify="space-between">
                            <v-col cols="12" sm="5" md="5" class="mt-0 pt-0 my-0 py-0">
                                <v-text-field label="Security Money" v-model="even_fee_data.security_money" outlined dense :prepend-inner-icon="rupee_icon" :rules= "[rules.number]"></v-text-field>
                                <v-text-field label="Electricity Fee" v-model="even_fee_data.electricity_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules= "[rules.number]"></v-text-field>
                                <v-text-field label="Mess Security" v-model="even_fee_data.mess_security" outlined dense :prepend-inner-icon="rupee_icon" :rules= "[rules.number]"></v-text-field>
                                <v-text-field label="Seat Rent" v-model="even_fee_data.seat_rent" outlined dense :prepend-inner-icon="rupee_icon" :rules= "[rules.number]"></v-text-field>
                                <v-text-field label="Misc" v-model="even_fee_data.misc" outlined dense :prepend-inner-icon="rupee_icon" :rules= "[rules.number]"></v-text-field>
                                <v-text-field label="Late Fee" v-model="even_fee_data.late_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules= "[rules.number]"></v-text-field>
                                <!-- <DatePicker :menu="date_menu" :date_value="even_fee_data.last_admission_date" :date_picker_value="date_picker_value" @menu-close="date_menu=false" @date-picked="set_date"></DatePicker> -->
                                <v-menu
                                v-model="even_date_menu"
                                :close-on-content-click="false"
                                :nudge-right="40"
                                transition="scale-transition"
                                offset-y
                                min-width="290px"
                                >
                                <template v-slot:activator="{ on }">
                                    <v-text-field
                                    v-model="even_fee_data.last_admission_date"
                                    label="Last Date of Admisson"
                                    append-icon="event"
                                    v-on="on"
                                    outlined
                                    ></v-text-field>
                                </template>
                                <v-date-picker v-model="even_date_picker_value" @input="even_date_menu = false"></v-date-picker>
                                </v-menu>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-card-actions justify="center" class="ml-2 mt-0 pt-0">
                        <div class="flex-grow-0"></div>
                        <v-btn type="submit" color="success darken-1" width="115" @click="save_even">Save</v-btn>
                        <v-btn color="error darken-1" width="115">Reset</v-btn>
                    </v-card-actions>
                </v-card>
            </v-tab-item>
        </v-tabs>

        <v-dialog v-model="snackbar" width="400" timeout="3000">
            <v-card>
                <v-card-title>Status</v-card-title>
                <v-card-text>
                <v-alert v-if="errorOccure" type="error">
                    {{msg}}
                </v-alert>
                <v-alert v-else type="success">
                    {{msg}}
                </v-alert>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="snackbar=false">Close</v-btn>
                </v-card-actions>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>   
</template>
<script>
import DatePicker from '@/components/DatePicker.vue'
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
    components: {
        DatePicker
    },
    data() {
        return {
            odd: {
               semester: 'Odd',
               security_money: '',
               electricity_fee: '',
               mess_security: '',
               seat_rent: '',
               misc: '',
               late_fee: '',
               last_admission_date: '' 
            },
            even: {
               semester: 'Even',
               security_money: '',
               electricity_fee: '',
               mess_security: '',
               seat_rent: '',
               misc: '',
               late_fee: '',
               last_admission_date: '' 
            },
            headers: {
                'Authorization':'Bearer '+ this.$store.state.token,
            },
            rules: {
                // required: value => !!value || 'Required',
                number: value => (/^[0-9.]{1,50}$/.test(value)) || 'This field must be a numerical value.',
                // lastDate: () => (new Date(this.date).getTime() > this.present_date.getTime()) || 'Last Date should not be a expire date.'
            },
            rupee_icon: "mdi-currency-inr",
            odd_date_menu: false,
            odd_date_picker_value: new Date().toISOString().substr(0, 10),
            even_date_menu: false,
            even_date_picker_value: new Date().toISOString().substr(0, 10),
            semester_tab: null,
            snackbar: false,
            errorOccure: false,
            msg: ''
        }
    },
    mounted() {
        this.fetch_hostel_fee()
        this.fetch_odd_semester_hostel_fee()
        this.fetch_even_semester_hostel_fee()
        
    },
    computed: {
        ...mapGetters([
            'get_hostel_fee',
            'get_odd_semester_hostel_fee',
            'get_even_semester_hostel_fee'
        ]),
        is_odd_exist () {
            return this.get_hostel_fee.some(data => data.semester === 'Odd')
        },
        odd_data () {
            return this.get_hostel_fee.filter( data => data.semester === 'Odd')
        },
        is_even_exist () {
            return this.get_hostel_fee.some(data => data.semester === 'Even')
        },
        even_data () {
            return this.get_hostel_fee.filter( data => data.semester === 'Even')
        },
        odd_fee_data() {
            let data = this.get_odd_semester_hostel_fee[0]
            if(data) {
                data.last_admission_date = this.formatDate(data.last_admission_date)
            }
            return this.get_odd_semester_hostel_fee.length > 0 ? data : this.odd
        },
        even_fee_data() {
            let data = this.get_even_semester_hostel_fee[0]
            if(data) {
                data.last_admission_date = this.formatDate(data.last_admission_date)
            }
            return this.get_even_semester_hostel_fee.length > 0 ? data : this.even
        },
    },
    methods: {
        ...mapActions([
            'fetch_hostel_fee',
            'save_hostel_fee',
            'update_hostel_fee',
            'fetch_odd_semester_hostel_fee',
            'fetch_even_semester_hostel_fee'
        ]),
        parseInput(input) {
            if(!input) return null
            input = Number(input.toString().replace(',','')).toFixed(2)
            return input
        },
        formatDate(date) {
            if (!date) return null

            const [year, month, day] = date.split('-')
            if(year==undefined || month==undefined || day==undefined) return date
            return `${day}/${month}/${year}`
        },
        parseDate (date) {
            if (!date) return null

            const [year, month, day] = date.split('/')
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
        },
        convertDate (date) {
            if (!date) return null

            const [year, month, day] = date.split('/')
            return `${day.padStart(2, '0')}-${month.padStart(2, '0')}-${year}`
        },
        save_odd() {
            this.odd.security_money = this.parseInput(this.odd_fee_data.security_money)
            this.odd.electricity_fee = this.parseInput(this.odd_fee_data.electricity_fee)
            this.odd.mess_security = this.parseInput(this.odd_fee_data.mess_security)
            this.odd.seat_rent = this.parseInput(this.odd_fee_data.seat_rent)
            this.odd.misc = this.parseInput(this.odd_fee_data.misc)
            this.odd.late_fee = this.parseInput(this.odd_fee_data.late_fee)
            this.odd.last_admission_date = this.convertDate(this.odd_fee_data.last_admission_date)

            if(this.is_odd_exist) {
                this.update_hostel_fee([this.odd, this.odd_data[0].id])
                .then(()=>{
                    this.snackbar = true
                    this.errorOccure = false
                    this.msg = 'Successfully Updated Fees.'
                })
                .catch(() => {
                    this.errorOccure = true
                    this.snackbar = true
                    this.msg = 'Please fill the fields correctly.'
                })
            } else {
                this.save_hostel_fee(this.odd)
                .then(()=>{
                    this.snackbar = true
                    this.errorOccure = false
                    this.msg = 'Successfully Saved Fees.'
                })
                .catch(() => {
                    this.errorOccure = true
                    this.snackbar = true
                    this.msg = 'Please fill the fields correctly.'
                })
            }
        },
        save_even() {
            this.even.security_money = this.parseInput(this.even_fee_data.security_money)
            this.even.electricity_fee = this.parseInput(this.even_fee_data.electricity_fee)
            this.even.mess_security = this.parseInput(this.even_fee_data.mess_security)
            this.even.seat_rent = this.parseInput(this.even_fee_data.seat_rent)
            this.even.misc = this.parseInput(this.even_fee_data.misc)
            this.even.late_fee = this.parseInput(this.even_fee_data.late_fee)
            this.even.last_admission_date = this.convertDate(this.even_fee_data.last_admission_date)
            if(this.is_odd_exist) {
                this.update_hostel_fee([this.even, this.even_data[0].id])
                .then(()=>{
                    this.snackbar = true
                    this.errorOccure = false
                    this.msg = 'Successfully Updated Fees.'
                })
                .catch(() => {
                    this.errorOccure = true
                    this.snackbar = true
                    this.msg = 'Please fill the fields correctly.'
                })
            } else {
                this.save_hostel_fee(this.even)
                .then(()=>{
                    this.snackbar = true
                    this.errorOccure = false
                    this.msg = 'Successfully Saved Fees.'
                })
                .catch(() => {
                    this.errorOccure = true
                    this.snackbar = true
                    this.msg = 'Please fill the fields correctly.'
                })
            }
        }
    },
    watch: {
        odd_date_picker_value() {
            this.odd_fee_data.last_admission_date = this.formatDate(this.odd_date_picker_value)
        },
        even_date_picker_value() {
            this.even_fee_data.last_admission_date = this.formatDate(this.even_date_picker_value)
        }
    }
}
</script>
