<template>
    <div class="hostel-admission pt-5">
        <v-card elevation="7" class="admissionFormBorder">
            <BreadCrumb :values="breadItems"></BreadCrumb>
            <v-card-title>
                <span class="heading">HOSTEL ADMISSION</span>
            </v-card-title>
            <v-card-text>
                <span>Enter Student Name or Roll Number</span>
            </v-card-text>
            <v-card-text class="pb-0">
                <v-row>
                    <v-col cols="6" sm="6" md="4" class="mt-0 pt-0 mr-4">
                        <v-autocomplete outlined dense label="Student Name" :items="get_admitted_students_data" :item-text="studentsName" :item-value="studentId" v-model="inputStudentName"></v-autocomplete>
                    </v-col>
                    <v-col cols="6" sm="7" md="1" class="mt-0 pt-0 ml-0 mr-n8 align-center justify-center">
                        <div class="grey--text text--darken-2 mt-4">OR</div>
                    </v-col>
                    <v-col cols="6" sm="6" md="4" class="mt-0 pt-0 ml-0">
                        <v-text-field label="Roll Number" outlined dense v-model="inputRollNumber" @change="getStudentDetails(inputRollNumber)"></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="6" sm="6" md="3" class="mt-0 pt-0 mr-4">
                        <div class="black--text text--darken-2 welcomeMessage align-center mt-0 pt-0">
                            Name:
                            <span>
                                {{inputStudentName.student}}
                            </span>
                            <v-progress-circular v-if="isLoading" class="ml-5" indeterminate color="grey darken-3" size="15"></v-progress-circular>
                        </div>
                    </v-col>
                    <v-col cols="6" sm="6" md="3" class="mt-0 pt-0 mr-4">
                        <div class="black--text text--darken-2 welcomeMessage align-center mt-0 pt-0">
                            Branch:
                            <span>
                                {{inputStudentName.branch}}
                            </span>
                            <v-progress-circular v-if="isLoading" class="ml-5" indeterminate color="grey darken-3" size="15"></v-progress-circular>
                        </div>
                    </v-col>
                    <v-col cols="6" sm="6" md="3" class="mt-0 pt-0 mr-4">
                        <div class="black--text text--darken-2 welcomeMessage align-center mt-0 pt-0">Today: <span>{{presentDate}}</span></div>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="6" sm="6" md="3" class="mt-0 pt-0 mr-4">
                        <div class="black--text text--darken-2 welcomeMessage align-center mt-0 pt-0">
                        Roll Number:
                        <span>
                            {{inputStudentName.roll_number}}
                            <v-progress-circular v-if="isLoading" class="ml-5" indeterminate color="grey darken-3" size="15"></v-progress-circular>
                        </span>
                        </div>
                    </v-col>
                    <v-col cols="6" sm="6" md="3" class="mt-0 pt-0 mr-4">
                        <label for="semester" class="black--text">Semester:</label>
                        <select id="semester" class="black--text ml-2 semester" v-model="semester">
                            <option v-for="sem in semesterChoice" :key="sem" :value="sem">{{sem}}</option>
                        </select>
                    </v-col>
                    <v-col cols="6" sm="6" md="3" class="mt-0 pt-0 mr-4">
                        <div class="red--text text--darken-2 welcomeMessage align-center mt-0 pt-0">Last date of admission: <span>{{formatDate(hostelFee.last_admission_date)}}</span></div>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>

        <v-card elevation="7" class="feesBorder mt-4 mb-6" v-if="inputStudentName.student_id && semester">
            <v-card-title>
                <span class="heading">FEES</span>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <v-row justify="space-between">
                    <v-col cols="12" sm="5" md="5" class="mt-0 pt-0 my-0 py-0">
                        <v-text-field label="Security Money" v-model="hostelFee.security_money" outlined dense :prepend-inner-icon="currency_inr" readonly></v-text-field>
                        <v-text-field label="Electricity Fee" v-model="hostelFee.electricity_fee" outlined dense :prepend-inner-icon="currency_inr" readonly></v-text-field>
                        <v-text-field label="Mess Security" v-model="hostelFee.mess_security" outlined dense :prepend-inner-icon="currency_inr" readonly></v-text-field>
                        <v-text-field label="Seat Rent" v-model="hostelFee.seat_rent" outlined dense :prepend-inner-icon="currency_inr" readonly></v-text-field>
                        <v-text-field label="Misc" v-model="hostelFee.misc" outlined dense :prepend-inner-icon="currency_inr" readonly></v-text-field>
                    </v-col>
                    <v-divider vertical></v-divider>
                    <v-col cols="12" sm="5" md="5" class="mt-0 pt-0 my-0 py-0">
                        <v-text-field label="Late Fee" v-model="hostelFee.late_fee" outlined dense :prepend-inner-icon="currency_inr" readonly></v-text-field>
                        <v-text-field label="Last Admission Date" v-model="hostelFee.last_admission_date" outlined dense :prepend-inner-icon="currency_inr" readonly></v-text-field>
                        <v-divider></v-divider>
                        <v-row cols="6" sm="6" md="3" class="mt-0 pt-0" justify="space-between" align="center">
                            <v-col cols="12" sm="6" md="9">
                                <h3 class="black--text text--darken-5 mt-0 pt-0 ml-0">
                                **Total :
                                <span class="text-right mx-0 px-0">
                                    <v-icon color="black" size="19" class="mx-0 px-0 my-0">{{currency_inr}}</v-icon>
                                    {{total}}
                                    <span class="red--text text--darken-2">{{msg}}</span>
                                </span>
                                </h3>
                            </v-col>
                            <v-col cols="12" sm="6" md="3">
                                <v-btn type="submit" color="success darken-1" width="115" @click="saveHostelAdmissionData" :disabled="!isPaymentValid">Save</v-btn>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>

        <v-dialog v-model="statusSnakbar" width="400" timeout="3000">
            <v-card>
                <v-card-title>Status</v-card-title>
                <v-card-text>
                <v-alert v-if="errorOccure" type="error">
                    {{dialogMsg}}
                </v-alert>
                <v-alert v-else type="success">
                    {{dialogMsg}}
                </v-alert>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" v-if="!errorOccure" text @click="oldReceiptPrint">Print Receipt</v-btn>
                    <v-btn color="primary" text @click="statusSnakbar=false, viewReceipt=false">Close</v-btn>
                </v-card-actions>
                </v-card-text>
            </v-card>
        </v-dialog>
        <Receipt 
        :viewReceipt="viewReceipt" 
        @hide-receipt="viewReceipt=false"
        :studentDetails="inputStudentName"
        :hostelFee="hostelFee"
        :receiptData="receiptData">
        </Receipt>
    </div>
</template>
<script>
import BreadCrumb from '@/components/breadCrumb'
import Receipt from '@/components/receipt'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import currency_inr from '@/assets/currency-inr.svg'
export default {
    components: {
        BreadCrumb,
        Receipt
    },
    data: () => ({
        currency_inr,
        breadItems: [
            {
            text: 'Overview',
            exact: true,
            disabled: false,
            href: '/dist/',
            link: true,
            },
            {
            text: 'Hostel Admission',
            exact: true,
            disabled: true,
            href: '/dist/#/hostel-admission/',
            link: true,
            },
        ],
        inputStudentName: {},
        inputRollNumber: '',
        branchName: '',
        presentDate: '',
        isLoading: false,
        semester: '',
        semesterChoice: [
            'First',
            'Second',
            'Third',
            'Fourth',
            'Fifth',
            'Sixth',
            'Seventh',
            'Eighth'
        ],
        lastDate: '',
        hostelFee: {},
        msg: '',
        statusSnakbar: false,
        dialogMsg: '',
        errorOccure: false,
        viewReceipt: false,
    }),
    mounted() {
        document.title = "Hostel Admission"
        localStorage.setItem('last_URL','/hostel-admission')
        let date = new Date()
        this.presentDate = `${String(date.getDate()).padStart(2,0)}/${String(date.getMonth() + 1).padStart(2,0)}/${date.getFullYear()}`
        this.fetch_admitted_students_data()
        this.fetch_odd_semester_hostel_fee()
        this.fetch_even_semester_hostel_fee()
        this.fetch_hostel_admission_data()
    },
    computed: {
        ...mapGetters([
            'get_admitted_students_data',
            'get_odd_semester_hostel_fee',
            'get_even_semester_hostel_fee',
            'get_hostel_data'
        ]),
        students() {
            let data = this.get_admitted_students_data.map((student) => {
                return student.student
            })
            return data
        },
        total() {
            if(this.hostelFee) {
                return this.sumObjectValues(this.hostelFee)
            } else {
                return null
            }
        },
        isPaymentValid() {
            let data = this.get_hostel_data.filter((data) => {
                return data.student_id == this.inputStudentName.student_id
            })

            if(data.length != 0) {
                return data.some((dat) => {
                                let isValid = false
                                if(this.semesterChoice.indexOf(this.semester) == 0 || this.semesterChoice.indexOf(this.semester) <= (this.semesterChoice.indexOf(dat.semester) + 1)) {
                                    isValid = true
                                } else {
                                    isValid =  false
                                }
                                return isValid
                            })
            } else {
                return true
            }

        },
        receiptData() {
            if(typeof this.hostelFee.electricity_fee != "undefined") {
                return [
                    { sl_no: "1", particular: "Electricity Fee", amount: this.hostelFee.electricity_fee },
                    { sl_no: "2", particular: "Mess Security", amount: this.hostelFee.mess_security },
                    { sl_no: "3", particular: "Seat Rent", amount: this.hostelFee.seat_rent },
                    { sl_no: "4", particular: "Security Money", amount: this.hostelFee.security_money },
                    { sl_no: "5", particular: "Misc", amount: this.hostelFee.misc }
                ]
            } else {
                return [
                    { sl_no: "1", particular: "", amount: ""},
                    { sl_no: "2", particular: "", amount: ""},
                    { sl_no: "3", particular: "", amount: ""},
                    { sl_no: "4", particular: "", amount: ""},
                    { sl_no: "5", particular: "", amount: ""}
                ]
            }
        }
    },
    watch: {
        semester() {
            if(this.convertSemesterToEvenOdd(this.semester) === 'Odd') {
                let { id, semester, ...partialObject} = this.get_odd_semester_hostel_fee[0]
                this.hostelFee = partialObject
            } else if(this.convertSemesterToEvenOdd(this.semester) === 'Even') {
                let { id, semester, ...partialObject} = this.get_even_semester_hostel_fee[0]
                this.hostelFee = partialObject
            }

            if(!this.isPaymentValid && this.inputStudentName.student_id) {
                this.statusSnakbar = true
                this.errorOccure = true
                this.dialogMsg = this.semesterChoice[this.semesterChoice.indexOf(this.semester) - 1] + ' semester hostel fee is not paid'
            }
        }
    },
    methods: {
        ...mapActions([
            'fetch_admitted_students_data',
            'fetch_odd_semester_hostel_fee',
            'fetch_even_semester_hostel_fee',
            'fetch_hostel_admission_data',
            'save_hostel_admission_data'
        ]),
        oldReceiptPrint() {
            this.viewReceipt = true
        },
        sumObjectValues(obj) {
            let sum = 0
            if(new Date(this.presentDate) > new Date(obj['last_admission_date'])) {
                delete obj.late_fee
            } else {
                this.msg = '(**Late fee is added.)'
            }
            for(let el in obj) {
                if(obj.hasOwnProperty(el) && this.parseInput(obj[el]) !== 'NaN') {
                    sum += Number(obj[el])
                }
            }
            return sum
        },
        parseInput(input) {
            if(!input) return null
            input = Number(input.toString().replace(',','')).toFixed(2)
            return input
        },
        formatDate(date) {
            if (!date) return null

            const [year, month, day] = date.split('-')
            return `${day}/${month}/${year}`
        },
        convertDate (date) {
            if (!date) return null

            const [year, month, day] = date.split('/')
            return `${day.padStart(2, '0')}-${month.padStart(2, '0')}-${year}`
        },
        studentsName: student => student.student,
        studentId: student => student,
        getStudentDetails(rollNumber) {
            let data = this.get_admitted_students_data.filter((student) => {
                return student.roll_number === rollNumber
            })
            this.inputStudentName = data[0]
        },
        convertSemesterToEvenOdd(semester){
            if(semester=='First'||semester=='Third'||semester=='Fifth'||semester=='Seventh'){
                return 'Odd'
            }
            else if(semester=='Second'||semester=='Fourth'||semester=='Sixth'||semester=='Eighth'){
                return 'Even'
            }
            else{
                return null
            }
        },
        saveHostelAdmissionData() {
            if(this.isPaymentValid) {
                this.hostelFee.semester = this.semester
                this.hostelFee.student = this.inputStudentName.student
                this.hostelFee.student_id = this.inputStudentName.student_id
                this.hostelFee.roll_number = this.inputStudentName.roll_number
                this.hostelFee.admission_date = this.convertDate(this.presentDate)
                this.hostelFee.total = this.total
                delete this.hostelFee.last_admission_date
                this.save_hostel_admission_data(this.hostelFee)
                .then(() => {
                    console.log('saved')
                })
                .catch((error) => {
                    this.errorOccure = false
                    this.statusSnakbar = true
                    this.dialogMsg = error.response.data.non_field_errors[0]
                })
            }
        }
    }
}
</script>
<style scoped>
.v-card.admissionFormBorder, .v-card.feesBorder {
  border-top: 4px solid #1976d2;
}
select {
  -webkit-appearance: menulist !important;
  /*webkit browsers */
  -moz-appearance: menulist !important;
  /*Firefox */
  appearance: menulist !important;
  border-radius: 1px;
  border-width: 10px;
}
</style>
