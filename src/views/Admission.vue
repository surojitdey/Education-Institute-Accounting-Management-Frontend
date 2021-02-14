<template>
  <div class="admission pt-5">
    <v-card elevation="7" class="admissionFormBorder">
      <BreadCrumb :values="breadItems"></BreadCrumb>
      <v-card-title class="">
        <span class="heading">ADMISSION</span>
      </v-card-title>
      <v-card-text>
        <span>Enter Student Name or Roll Number</span>
      </v-card-text>
      <v-card-text class="pb-0">
        <v-row>
          <v-col cols="6" sm="6" md="4" class="mt-0 pt-0 mr-4">
            <v-autocomplete label="Student Name" outlined dense :items="students" v-model="input_student_name" @change="get_student_details(input_student_name)" append-icon = ''></v-autocomplete>
          </v-col>

          <v-col cols="6" sm="7" md="1" class="mt-0 pt-0 ml-0 mr-n8 align-center justify-center">
            <div class="grey--text text--darken-2 mt-4">OR</div>
          </v-col>
          <v-col cols="6" sm="6" md="4" class="mt-0 pt-0 ml-0">
            <v-text-field label="Roll Number" outlined dense v-model="input_roll_number" @change="get_student_details(input_roll_number)"></v-text-field>
          </v-col>

        </v-row>
        <v-row>
          <v-col cols="6" sm="6" md="3" class="mt-0 pt-0 mr-4">
            <div class="black--text text--darken-2 welcomeMessage align-center mt-0 pt-0">
              Name:
              <span>
                {{student_name}}
                <v-progress-circular v-if="isLoading" class="ml-5" indeterminate color="grey darken-3" size="15"></v-progress-circular>
              </span>
            </div>
          </v-col>
          <v-col cols="6" sm="6" md="3" class="mt-0 pt-0 mr-4">
            <div class="black--text text--darken-2 welcomeMessage align-center mt-0 pt-0">
              Branch:
              <span>
                {{branch_name}}
                <v-progress-circular v-if="isLoading" class="ml-5" indeterminate color="grey darken-3" size="15"></v-progress-circular>
              </span>
            </div>
          </v-col>
          <v-col cols="6" sm="6" md="3" class="mt-0 pt-0 mr-4">
            <div class="black--text text--darken-2 welcomeMessage align-center mt-0 pt-0">Today: <span>{{present_date}}</span></div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6" sm="6" md="3" class="mt-0 pt-0 mr-4">
            <div class="black--text text--darken-2 welcomeMessage align-center mt-0 pt-0">
              Roll Number:
              <span>
                {{roll_number}}
                <v-progress-circular v-if="isLoading" class="ml-5" indeterminate color="grey darken-3" size="15"></v-progress-circular>
              </span>
            </div>
          </v-col>
          <v-col cols="6" sm="6" md="3" class="mt-0 pt-0 mr-4">
            <label for="semester" class="black--text">Semester:</label>
            <select id="semester" v-if="!isPhd" class="black--text ml-2 semester" v-model="semester" @change="get_fee_details(depertment_id,depertment_name,branch,semester,student_id,student_name)">
              <option v-for="sem in semesterChoice" :key="sem" :value="sem">{{sem}}</option>
            </select>
            <span id="semester" v-else-if="isPhd" class="black--text ml-2 semester">{{semester}}</span>
          </v-col>
          <v-col cols="6" sm="6" md="3" class="mt-0 pt-0 mr-4">
            <div class="red--text text--darken-2 welcomeMessage align-center mt-0 pt-0">Last date of admission: <span>{{last_date}}</span></div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>


    <v-card elevation="7" class="feesBorder mt-4 mb-6" v-if="showFees && semester">
      <v-card-title>
        <span class="heading">FEES</span>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-row justify="space-between" v-if="!isSpotAdmission">
          <v-col cols="12" sm="5" md="5" class="mt-0 pt-0 my-0 py-0">
            <v-text-field label="Govt. Dues" v-model="govt_dues" outlined dense :prepend-inner-icon="currency_inr" readonly></v-text-field>
            <v-text-field label="Tuition Fee" v-model="tuition_fee" v-show="depertment_name!='Bachelor of Engineering'" outlined dense :prepend-inner-icon="currency_inr" readonly></v-text-field>
            <v-text-field label="Identity Card" v-model="identity_fee" outlined dense :prepend-inner-icon="currency_inr" readonly></v-text-field>
            <v-text-field label="Examination Fee" v-model="examination_fee" outlined dense :prepend-inner-icon="currency_inr" readonly></v-text-field>
            <v-text-field label="Student Union Fee" v-model="student_union_fee" outlined dense :prepend-inner-icon="currency_inr" readonly></v-text-field>
            <v-text-field label="Gamse and Sports" v-model="game_sports_fee" outlined dense :prepend-inner-icon="currency_inr" readonly></v-text-field>
            <v-text-field label="Magazine Fee" v-model="magazine_fee" outlined dense :prepend-inner-icon="currency_inr" readonly></v-text-field>
            <v-text-field label="Laboratory Fee" v-model="laboratory_fee" outlined dense :prepend-inner-icon="currency_inr" readonly></v-text-field>
            <v-text-field label="University Registration Fee" v-model="university_registration_fee" outlined dense :prepend-inner-icon="currency_inr" readonly></v-text-field>
            <v-text-field label="Enrolment Fee" v-model="enrolment_fee" outlined dense :prepend-inner-icon="currency_inr" readonly></v-text-field>
            <v-text-field label="Electricity" v-model="electricity_fee" outlined dense :prepend-inner-icon="currency_inr" readonly></v-text-field>
            <v-text-field label="Group Insurance" v-model="group_insurance_fee" outlined dense :prepend-inner-icon="currency_inr" readonly></v-text-field>
            <v-text-field label="Scout & Guide" v-model="scout_guide_fee" outlined dense :prepend-inner-icon="currency_inr" readonly></v-text-field>
            <v-text-field label="Intenet Service" v-model="internet_fee" outlined dense :prepend-inner-icon="currency_inr" readonly></v-text-field>
            <v-text-field label="Student Welfare Fund" v-model="welfare_fee" outlined dense :prepend-inner-icon="currency_inr" readonly></v-text-field>
            <v-text-field label="College Development" v-model="development_fee" outlined dense :prepend-inner-icon="currency_inr" readonly></v-text-field>
            <v-text-field label="Library & Lab. Caution Money" v-model="library_caution_fee" outlined dense :prepend-inner-icon="currency_inr" readonly></v-text-field>
            <v-text-field label="Transport Fee" v-model="transport_fee" outlined dense :prepend-inner-icon="currency_inr" readonly></v-text-field>
            <v-text-field label="ISTE Fee" v-model="iste_fee" v-show="depertment_name=='Bachelor of Engineering'" outlined dense :prepend-inner-icon="currency_inr" readonly></v-text-field>
            <v-text-field label="Training & Placement" v-model="training_placement_fee" outlined dense :prepend-inner-icon="currency_inr" readonly></v-text-field>
            <v-text-field label="College Festival" v-model="college_festival_fee" outlined dense :prepend-inner-icon="currency_inr" readonly></v-text-field>
            <v-text-field label="Medical Fee" v-model="medical_fee" outlined dense :prepend-inner-icon="currency_inr" readonly></v-text-field>
          </v-col>
          <v-divider vertical></v-divider>
          <v-col cols="12" sm="5" md="5" class="mt-0 pt-0 my-0 py-0">
            <v-text-field label="Late Fee" v-model="late_fee" outlined dense :prepend-inner-icon="currency_inr" readonly></v-text-field>
            <v-text-field label="Last Date of Admission" v-model="last_date" outlined dense prepend-inner-icon="event" readonly></v-text-field>
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
                <v-btn type="submit" color="success darken-1" width="115" :disabled="isAdmitted" @click="save_student_to_admission_table">Save</v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <!-- SPOT ADMISSION -->
        <v-row justify="space-between" v-else>
          <v-col cols="12" sm="5" md="5" class="mt-0 pt-0 my-0 py-0">
            <v-text-field label="Govt. Dues" v-model="govt_dues" outlined dense :prepend-inner-icon="currency_inr" readonly></v-text-field>
            <v-text-field label="Tuition Fee" v-model="tuition_fee" v-show="depertment_name!='Bachelor of Engineering'" outlined dense :prepend-inner-icon="currency_inr" readonly></v-text-field>
            <v-text-field label="Identity Card" v-model="identity_fee" outlined dense :prepend-inner-icon="currency_inr" readonly></v-text-field>
            <v-text-field label="Examination Fee" v-model="examination_fee" outlined dense :prepend-inner-icon="currency_inr" readonly></v-text-field>
            <v-text-field label="Student Union Fee" v-model="student_union_fee" outlined dense :prepend-inner-icon="currency_inr" readonly></v-text-field>
            <v-text-field label="Gamse and Sports" v-model="game_sports_fee" outlined dense :prepend-inner-icon="currency_inr" readonly></v-text-field>
            <v-text-field label="Magazine Fee" v-model="magazine_fee" outlined dense :prepend-inner-icon="currency_inr" readonly></v-text-field>
            <v-text-field label="Laboratory Fee" v-model="laboratory_fee" outlined dense :prepend-inner-icon="currency_inr" readonly></v-text-field>
            <v-text-field label="University Registration Fee" v-model="university_registration_fee" outlined dense :prepend-inner-icon="currency_inr" readonly></v-text-field>
            <v-text-field label="Enrolment Fee" v-model="enrolment_fee" outlined dense :prepend-inner-icon="currency_inr" readonly></v-text-field>
            <v-text-field label="Electricity" v-model="electricity_fee" outlined dense :prepend-inner-icon="currency_inr" readonly></v-text-field>
            <v-text-field label="Group Insurance" v-model="group_insurance_fee" outlined dense :prepend-inner-icon="currency_inr" readonly></v-text-field>
            <v-text-field label="Scout & Guide" v-model="scout_guide_fee" outlined dense :prepend-inner-icon="currency_inr" readonly></v-text-field>
            <v-text-field label="Intenet Service" v-model="internet_fee" outlined dense :prepend-inner-icon="currency_inr" readonly></v-text-field>
            <v-text-field label="Student Welfare Fund" v-model="welfare_fee" outlined dense :prepend-inner-icon="currency_inr" readonly></v-text-field>
            <v-text-field label="College Development" v-model="development_fee" outlined dense :prepend-inner-icon="currency_inr" readonly></v-text-field>
            <v-text-field label="Library & Lab. Caution Money" v-model="library_caution_fee" outlined dense :prepend-inner-icon="currency_inr" readonly></v-text-field>
            <v-text-field label="Transport Fee" v-model="transport_fee" outlined dense :prepend-inner-icon="currency_inr" readonly></v-text-field>
            <v-text-field label="ISTE Fee" v-model="iste_fee" v-show="depertment_name=='Bachelor of Engineering'" outlined dense :prepend-inner-icon="currency_inr" readonly></v-text-field>
            <v-text-field label="Training & Placement" v-model="training_placement_fee" outlined dense :prepend-inner-icon="currency_inr" readonly></v-text-field>
            <v-text-field label="College Festival" v-model="college_festival_fee" outlined dense :prepend-inner-icon="currency_inr" readonly></v-text-field>
            <v-text-field label="Medical Fee" v-model="medical_fee" outlined dense :prepend-inner-icon="currency_inr" readonly></v-text-field>
          </v-col>
          <v-divider vertical></v-divider>
          <v-col cols="12" sm="5" md="5" class="mt-0 pt-0 my-0 py-0">
            <v-text-field label="Forms and Prospectus Fee" v-model="form_and_prospectus_fee" outlined dense :prepend-inner-icon="currency_inr" readonly></v-text-field>
            <v-text-field label="Counselling Fee" v-model="counselling_fee" outlined dense :prepend-inner-icon="currency_inr" readonly></v-text-field>
            <v-text-field label="Hostel Admission Fee" v-model="hostel_admission_fee" outlined dense :prepend-inner-icon="currency_inr" readonly></v-text-field>
            <v-text-field label="Spot Amission Fine" v-model="spot_admission_fine" outlined dense :prepend-inner-icon="currency_inr" readonly></v-text-field>
            <v-divider></v-divider>
            <v-row cols="6" sm="6" md="3" class="mt-0 pt-0" justify="space-between" align="center">
              <v-col cols="12" sm="6" md="9">
                <h3 class="black--text text--darken-5 mt-0 pt-0 ml-0">
                  **Total :
                  <span class="text-right mx-0 px-0">
                    <v-icon color="black" size="19" class="mx-0 px-0 my-0">{{currency_inr}}</v-icon>
                    {{total}}
                  </span>
                </h3>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-btn type="submit" color="success darken-1" width="115" :disabled="isAdmitted" @click="save_student_to_admission_table">Save</v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-dialog v-model="snackbar" width="400" timeout="3000">
      <v-card>
        <v-card-title>Status</v-card-title>
        <v-card-text>
          <v-alert v-if="errorOccure" type="error">
            {{dialog_msg}}
          </v-alert>
          <v-alert v-else type="success">
            {{dialog_msg}}
          </v-alert>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" v-if="!errorOccure" text @click="old_receipt_print">Print Receipt</v-btn>
            <v-btn color="primary" text @click="snackbar=false">Close</v-btn>
          </v-card-actions>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="fee_snackbar" width="600" timeout="3000">
      <v-card>
        <v-card-text class="black--text" id="receipt">
          <h2 class="text-center">
            <span class="receipt-title text-uppercase text-center black white--text font-weight-regular px-2">Receipt for fees</span>
          </h2>
          <h1 class="text-capitalize pt-2 text-center">
            <span>Jorhat Institute Of Science & Technology</span><br>
          </h1>
          <h3 class="text-center text-capitalize font-weight-medium pt-1">
            <span class="font-italic mt-1">(Formerly Science College, Jorhat)</span><br>
            <span class="mt-1">P.O. Chenijan, Sotai, </span>
            <span class="mt-1">Jorhat - 785010 (Assam)</span>
          </h3>
          <v-row class="pl-5 mt-2" justify="center" no-gutters>
            <v-col cols="6" sm="6" md="6">
              <h3>
                <span class="text-capitalize">Name: <span class="text-capitalize font-weight-regular thin_text">{{student_name}}</span></span>
              </h3>
            </v-col>
            <v-col cols="6" sm="6" md="6">
              <h3>
                <span class="text-capitalize">Roll Number: <span class="text-capitalize font-weight-regular thin_text">{{roll_number}}</span></span>
              </h3>
            </v-col>
          </v-row>
          <v-row class="pl-5" no-gutters>
            <v-col cols="6" sm="6" md="6">
              <h3>
                <span class="text-capitalize">Year: <span class="text-capitalize font-weight-regular thin_text">{{depertment_short}} {{semester}}</span></span>
              </h3>
            </v-col>
            <v-col cols="6" sm="6" md="6">
              <h3>
                <span class="text-capitalize">Date: <span class="text-capitalize font-weight-regular thin_text">{{admission_date}}</span></span>
              </h3>
            </v-col>
          </v-row>
          <v-divider class="mt-2"></v-divider>
          <v-row class="pl-5" align="center" justify="center" no-gutters>
            <v-col cols="2" sm="2" md="2">
              <h3 class="text-center">
                <span class="text-capitalize subtitle-2">Sl. No.</span>
              </h3>
            </v-col>
            <v-col cols="7" sm="7" md="7">
              <h3 class="text-center" >
                <span class="text-uppercase subtitle-2">Particulars</span>
              </h3>
            </v-col>
            <v-col cols="3" sm="3" md="3">
              <h3 class="text-center">
                <span class="text-capitalize subtitle-2">Amount</span>
              </h3>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row class="pl-5" align="center" justify="center" no-gutters v-for="data in receipt_data" :key="data.sl_no">
            <v-col cols="2" sm="2" md="2" class="text-center">
              <span class="text-capitalize">{{data.sl_no}}</span>
            </v-col>
            <v-col cols="7" sm="7" md="7" class="text-center">
              <span class="text-capitalize">{{data.particular}}</span>
            </v-col>
            <v-col cols="3" sm="3" md="3" class="text-center">
              <span>{{data.amount}}</span>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row class="pl-5" align="center" justify="center" no-gutters>
            <v-col cols="2" sm="2" md="2">
              <h3 class="text-center">
                <span class="text-capitalize subtitle-2"></span>
              </h3>
            </v-col>
            <v-col cols="7" sm="7" md="7" class="text-center">
              <h3 class="text-center" >
                <span class="text-capitalize subtitle-2">total</span>
              </h3>
            </v-col>
            <v-col cols="3" sm="3" md="3" class="text-center">
              <span class="">{{admitted_student_data['amount']}}</span>
            </v-col>
          </v-row>
          <br><br><br>
          <v-row class="note_signature" align="center">
            <v-col cols="7" sm="7" md="7" class="caption">
              <span class="">N.B.: This receipt must be produce at the time of next payment.</span>
              <span> No payment should be made without receipt.</span>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="3" sm="3" md="3">
              <span class="text-capitalize font-weight-medium">Collector's Signature</span>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn color="primary" text @click="print_receipt('receipt')">Print</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="close_receipt">Close</v-btn>
          </v-card-actions>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-overlay :value="isPageLoad">
      <v-progress-circular indeterminate color="grey darken-3" size="30"></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
import BreadCrumb from '@/components/breadCrumb'
import axios from 'axios'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import currency_inr from '@/assets/currency-inr.svg'
export default {
  components: {
    BreadCrumb,
  },
  data() {
    return {
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
          text: 'Addmission',
          exact: true,
          disabled: true,
          href: '/dist/#/admission/',
          link: true,
        },
      ],
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


      first_name: '',
      last_name: '',
      caste: '',
      date_of_birth: '',
      admission_year: '',
      session: '',
      father_name: '',
      mother_name: '',
      address: '',
      parents_phone_number: '',
      entry_type: '',

      input_student_name: '',
      student_name: '',
      student_id: '',
      roll_number: '',
      semester: '',
      students: [],
      showFees: false,
      isLoading: false,
      isPhd: false,
      isAdmissionSuccessful: false,
      // currency_inr: "currency_inr",

      present_date: '',
      admission_date: '',
      last_date: '',
      formatted_present_date: '',
      formatted_last_date: '',
      depertment_id: '',
      depertment_name: '',
      branch: '',
      branch_name:'',
      fee_data: [],
      be_fee_data: [],
      spot_admission_fee_data: [],

      admission_fee: '',
      govt_dues: '',
      tuition_fee: '',
      identity_fee: '',
      examination_fee: '',
      student_union_fee: '',
      game_sports_fee: '',
      magazine_fee: '',
      laboratory_fee: '',
      university_registration_fee: '',
      enrolment_fee: '',
      electricity_fee: '',
      group_insurance_fee: '',
      scout_guide_fee: '',
      internet_fee: '',
      welfare_fee: '',
      development_fee: '',
      library_caution_fee: '',
      transport_fee: '',
      training_placement_fee: '',
      college_festival_fee: '',
      medical_fee: '',
      iste_fee: '',
      late_fee: '',
      total: '',
      total_without_fine: '',
      msg: '',

      errorOccure: false,
      snackbar: false, // used to show the success or error msg.
      dialog_msg: '', // Success or Error msg after form submission

      // Spot admission data.
      form_and_prospectus_fee: '',
      counselling_fee: '',
      hostel_admission_fee: '',
      spot_admission_fine: '',
      spot_admission_total: '',
      isSpotAdmission: false,

      // Admitted Student Data.
      admitted_student_data: {},
      isAdmitted: false,

      fee_snackbar: false,

      depertment_data: [],
      depertment_short: '',

      headers: {
        'Authorization':'Bearer '+ this.$store.state.token,
      },
      isPageLoad: false,

      examination_fee_submit_students_data: []
    }
  },

  mounted() {
    document.title = "Admission"
    localStorage.setItem('last_URL','/admission')
    this.isPageLoad = true
    let date = new Date()
    this.present_date = `${String(date.getDate()).padStart(2,0)}/${date.getMonth() + 1}/${date.getFullYear()}`

    return new Promise((resolve, reject)=> {
      // Admission fee details from database through api call.
      axios({url: this.$store.state.odd_semester_fees_end_point, method: 'GET', headers: this.headers})
      .then(response => {
        this.fee_data = response.data
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
      // BE admission fee details from database through api call.
      axios({url: this.$store.state.be_fees_end_point, method: 'GET', headers: this.headers})
      .then(response => {
        this.be_fee_data = response.data
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
      // Spot admission fee details from database through api call.
      axios({url: this.$store.state.spot_admission_fee_end_point, method: 'GET', headers: this.headers})
      .then(response => {
        this.spot_admission_fee_data = response.data
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
      // Admitted Students Details.
      this.fetch_admitted_students_data()

      // Depertment Details.
      axios({url:this.$store.state.depertment_end_point, method: 'GET', headers: this.headers})
      .then(response=>{
        this.depertment_data = response.data
        this.isPageLoad = false
        resolve(response)
      })
      .catch(error=>{
        reject(error)
      })
      // Students Details who are submitted their examination fees.
      axios({url:this.$store.state.examination_end_point, method: 'GET', headers: this.headers})
      .then(response=>{
        this.examination_fee_submit_students_data = response.data
        resolve(response)
      })
      .catch(error=>{
        reject(error)
      })
      // Students details from database through api.
      axios({url: this.$store.state.student_end_point, method: 'GET', headers: this.headers})
      .then(response => {
        for(var i=0; i<response.data.length; i++){
          var full_name = response.data[i]['first_name']+' '+response.data[i]['last_name']
          this.students.push(full_name)
        }

        // For Spot Admission.
        if(this.get_spot_roll_number){
          for(var j=0; j<response.data.length; j++){
            if(response.data[j]['roll_number']==this.$store.state.spot_roll_number){
              this.student_name = `${response.data[j]['first_name']} ${response.data[j]['last_name']}`
              this.student_id = response.data[j]['id']
              this.branch_name = response.data[j]['branch']
              this.branch = response.data[j]['branch_id']
              this.roll_number = response.data[j]['roll_number']
              this.semester = response.data[j]['semester']
              this.depertment_id = response.data[j]['depertment_id']
              this.depertment_name = response.data[j]['depertment']
            }
          }
          this.isSpotAdmission = true
          this.get_spot_admission_fee_details()
          this.showFees = true
          this.isLoading = false
          if(this.depertment_name=='PhD'){
            this.isPhd = true
          }
          else{
            this.isPhd = false
          }
        }
        else{
          this.showFees = false
          this.isSpotAdmission = false
        }
        resolve(response)
      })
      .catch(error => {
        if(error.response && error.response.status==401){
          // Logout user if the token is invalid.
          var token = this.$store.state.token
          var client_id = this.$store.state.client_id
          var client_secret = this.$store.state.client_secret
          this.$store.dispatch('logout',{token, client_id, client_secret})
          .then(() => {
            this.$router.push('/signin')
          })
        }
        reject(error)
      })
    })
  },

  computed: {
    ...mapGetters([
      'get_spot_roll_number',
      'get_admitted_students_data',
      'get_student_id'
    ]),

    input_roll_number () {
      if(this.get_spot_roll_number) {
        return this.get_spot_roll_number
      }
      else{
        return ''
      }
    },

    receipt_data(){
      return this.initialize()
    }
  },

  watch: {
    entry_type(){
      if(this.entry_type=='Lateral'){
        this.semesterChoice = [
          'Third',
          'Fourth',
          'Fifth',
          'Sixth',
          'Seventh',
          'Eighth'
        ]
      }
      else {
        this.semesterChoice = [
          'First',
          'Second',
          'Third',
          'Fourth',
          'Fifth',
          'Sixth',
          'Seventh',
          'Eighth'
        ]
      }
    },
    semester(){
      if(this.semester!=''){
        if(this.semester!='First' && !(this.semester=='Third' && this.entry_type=='Lateral')){
          if(this.get_student_examination_fee_status(this.semester,this.student_id,this.examination_fee_submit_students_data)){
            this.showFees = true
            this.errorOccure = false
            this.snackbar = false
            if(!this.isSpotAdmission){
              this.get_fee_details(this.depertment_id,this.depertment_name,this.branch,
                this.semester, this.student_id, this.student_name, this.entry_type)
            }
          }
          else{
            this.showFees = false
            this.errorOccure = true
            this.fee_snackbar = false
            this.snackbar = true
            this.dialog_msg = this.student_name + ' did not submit his/her '+this.semester_decrement(this.semester)+' semester examination fee.'
          }
        }
        else {
          this.showFees = true
          this.errorOccure = false
          this.snackbar = false
          if(!this.isSpotAdmission) {
            this.get_fee_details(this.depertment_id,this.depertment_name,this.branch,
              this.semester, this.student_id, this.student_name, this.entry_type)
          }
        }
      }
    },

    fee_snackbar(){
      if(!this.fee_snackbar){
        location.reload()
      }
    },

    student_id(){
      if(this.student_id){
        this.set_student_id(this.student_id)
      }
    }
  },

  methods: {
    ...mapActions({
      fetch_admitted_students_data: 'fetch_admitted_students_data'
    }),
    ...mapMutations([
      'set_student_id'
    ]),
    print_receipt(divName){
      let w=window.open();
      var printContents = "<html>"
      printContents += document.getElementById(divName).innerHTML
      printContents += "</html>"
      w.document.write('<link rel="stylesheet" href="css/bootstrap.min.css" type="text/css" />')
      w.document.write('<link rel="stylesheet" href="css/recipt.css" type="text/css" />')
      w.document.write(printContents)
      w.document.close()
      w.focus()
      w.print()
      this.isPageLoad = false
    },
    close_receipt(){
      this.fee_snackbar = false
      location.reload()
    },
    old_receipt_print(){
      this.fee_snackbar = true
    },
    initialize(){
      if(!this.isAdmitted){
        for(var k=0; k<this.get_admitted_students_data.length; k++){
          if(this.student_id == this.get_admitted_students_data[k]['student_id'] && this.semester == this.get_admitted_students_data[k]['semester']){
            this.admitted_student_data = this.get_admitted_students_data[k]
            break
          }
        }
      }
      this.admission_date = this.formatDate(this.admitted_student_data['admission_date'])
      if(this.isSpotAdmission || (this.depertment_name==='Bachelor of Engineering' && this.semester==='First')){
        this.admitted_student_data['form_and_prospectus_fee'] = this.spot_admission_fee_data[0]['form_and_prospectus_fee']
        this.admitted_student_data['counselling_fee'] = this.spot_admission_fee_data[0]['counselling_fee']
        this.admitted_student_data['hostel_admission_fee'] = this.spot_admission_fee_data[0]['hostel_admission_fee']
        this.admitted_student_data['spot_admission_fine'] = this.spot_admission_fee_data[0]['spot_admission_fine']
        return [
          { sl_no: '1', particular: 'Govt. dues', amount: this.admitted_student_data['govt_dues']},
          { sl_no: '2', particular: 'identity card', amount: this.admitted_student_data['identity_fee']},
          { sl_no: '3', particular: 'Examination Fee', amount: this.admitted_student_data['examination_fee']},
          { sl_no: '4', particular: 'student union Fee', amount: this.admitted_student_data['student_union_fee']},
          { sl_no: '5', particular: 'Games and Sports', amount: this.admitted_student_data['game_sports_fee']},
          { sl_no: '6', particular: 'magazine fee', amount: this.admitted_student_data['magazine_fee']},
          { sl_no: '7', particular: 'laboratory fee', amount: this.admitted_student_data['laboratory_fee']},
          { sl_no: '8', particular: 'university registration fee', amount: this.admitted_student_data['university_registration_fee']},
          { sl_no: '9', particular: 'enrolment fee', amount: this.admitted_student_data['enrolment_fee']},
          { sl_no: '10', particular: 'electricity', amount: this.admitted_student_data['electricity_fee']},
          { sl_no: '11', particular: 'group insurance', amount: this.admitted_student_data['group_insurance_fee']},
          { sl_no: '12', particular: 'scout & guide', amount: this.admitted_student_data['scout_guide_fee']},
          { sl_no: '13', particular: 'internet service', amount: this.admitted_student_data['internet_fee']},
          { sl_no: '14', particular: 'student welfare fund', amount: this.admitted_student_data['welfare_fee']},
          { sl_no: '15', particular: 'college Development', amount: this.admitted_student_data['development_fee']},
          { sl_no: '16', particular: 'library & caution money', amount: this.admitted_student_data['library_caution_fee']},
          { sl_no: '17', particular: 'transport fee', amount: this.admitted_student_data['transport_fee']},
          { sl_no: '18', particular: 'ISTE', amount: this.admitted_student_data['iste_fee']},
          { sl_no: '19', particular: 'training & placement', amount: this.admitted_student_data['training_placement_fee']},
          { sl_no: '20', particular: 'college festival', amount: this.admitted_student_data['college_festival_fee']},
          { sl_no: '21', particular: 'Forms and Prospectus', amount: this.admitted_student_data['form_and_prospectus_fee']},
          { sl_no: '22', particular: 'counselling', amount: this.admitted_student_data['counselling_fee']},
          { sl_no: '23', particular: 'hostel admission fees', amount: this.admitted_student_data['hostel_admission_fee']},
          { sl_no: '24', particular: 'Others', amount: this.admitted_student_data['spot_admission_fine']},
          { sl_no: '25', particular: 'medical fees', amount: this.admitted_student_data['medical_fee']},
          { sl_no: '26', particular: 'late fee', amount: this.admitted_student_data['late_fee']},
        ]
      }
      else if(this.depertment_name!='Bachelor of Engineering'){
        return [
          { sl_no: '1', particular: 'Govt. dues', amount: this.admitted_student_data['govt_dues']},
          { sl_no: '2', particular: 'tuition fee', amount: this.admitted_student_data['tuition_fee']},
          { sl_no: '3', particular: 'identity card', amount: this.admitted_student_data['identity_fee']},
          { sl_no: '4', particular: 'Examination Fee', amount: this.admitted_student_data['examination_fee']},
          { sl_no: '5', particular: 'student union Fee', amount: this.admitted_student_data['student_union_fee']},
          { sl_no: '6', particular: 'Games and Sports', amount: this.admitted_student_data['game_sports_fee']},
          { sl_no: '7', particular: 'magazine fee', amount: this.admitted_student_data['magazine_fee']},
          { sl_no: '8', particular: 'laboratory fee', amount: this.admitted_student_data['laboratory_fee']},
          { sl_no: '9', particular: 'university registration fee', amount: this.admitted_student_data['university_registration_fee']},
          { sl_no: '10', particular: 'enrolment fee', amount: this.admitted_student_data['enrolment_fee']},
          { sl_no: '11', particular: 'electricity', amount: this.admitted_student_data['electricity_fee']},
          { sl_no: '12', particular: 'group insurance', amount: this.admitted_student_data['group_insurance_fee']},
          { sl_no: '13', particular: 'scout & guide', amount: this.admitted_student_data['scout_guide_fee']},
          { sl_no: '14', particular: 'internet service', amount: this.admitted_student_data['internet_fee']},
          { sl_no: '15', particular: 'student welfare fund', amount: this.admitted_student_data['welfare_fee']},
          { sl_no: '16', particular: 'college Development', amount: this.admitted_student_data['development_fee']},
          { sl_no: '17', particular: 'library & caution money', amount: this.admitted_student_data['library_caution_fee']},
          { sl_no: '18', particular: 'transport fee', amount: this.admitted_student_data['transport_fee']},
          { sl_no: '19', particular: 'training & placement', amount: this.admitted_student_data['training_placement_fee']},
          { sl_no: '20', particular: 'college festival', amount: this.admitted_student_data['college_festival_fee']},
          { sl_no: '21', particular: 'medical fees', amount: this.admitted_student_data['medical_fee']},
          { sl_no: '22', particular: 'late fee', amount: this.admitted_student_data['late_fee']},
        ]
      }
      else{
        return [
          { sl_no: '1', particular: 'Govt. dues', amount: this.admitted_student_data['govt_dues']},
          { sl_no: '2', particular: 'identity card', amount: this.admitted_student_data['identity_fee']},
          { sl_no: '3', particular: 'Examination Fee', amount: this.admitted_student_data['examination_fee']},
          { sl_no: '4', particular: 'student union Fee', amount: this.admitted_student_data['student_union_fee']},
          { sl_no: '5', particular: 'Games and Sports', amount: this.admitted_student_data['game_sports_fee']},
          { sl_no: '6', particular: 'magazine fee', amount: this.admitted_student_data['magazine_fee']},
          { sl_no: '7', particular: 'laboratory fee', amount: this.admitted_student_data['laboratory_fee']},
          { sl_no: '8', particular: 'university registration fee', amount: this.admitted_student_data['university_registration_fee']},
          { sl_no: '9', particular: 'enrolment fee', amount: this.admitted_student_data['enrolment_fee']},
          { sl_no: '10', particular: 'electricity', amount: this.admitted_student_data['electricity_fee']},
          { sl_no: '11', particular: 'group insurance', amount: this.admitted_student_data['group_insurance_fee']},
          { sl_no: '12', particular: 'scout & guide', amount: this.admitted_student_data['scout_guide_fee']},
          { sl_no: '13', particular: 'internet service', amount: this.admitted_student_data['internet_fee']},
          { sl_no: '14', particular: 'student welfare fund', amount: this.admitted_student_data['welfare_fee']},
          { sl_no: '15', particular: 'college Development', amount: this.admitted_student_data['development_fee']},
          { sl_no: '16', particular: 'library & caution money', amount: this.admitted_student_data['library_caution_fee']},
          { sl_no: '17', particular: 'transport fee', amount: this.admitted_student_data['transport_fee']},
          { sl_no: '18', particular: 'ISTE', amount: this.admitted_student_data['iste_fee']},
          { sl_no: '19', particular: 'training & placement', amount: this.admitted_student_data['training_placement_fee']},
          { sl_no: '20', particular: 'college festival', amount: this.admitted_student_data['college_festival_fee']},
          { sl_no: '21', particular: 'medical fees', amount: this.admitted_student_data['medical_fee']},
          { sl_no: '22', particular: 'late fee', amount: this.admitted_student_data['late_fee']},
        ]
      }
    },
    parseInput(input) {
      if(!input) return null

      input =
      input = Number(input.toString().replace(',','')).toFixed(2)
      return input
    },
    formatDate(date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
    ReverseformatDate(date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${year}-${month}-${day}`
    },
    convertDate (date) {
      if (!date) return null

      const [year, month, day] = date.split('/')
      return `${day.padStart(2, '0')}-${month.padStart(2, '0')}-${year}`
    },
    get_student_details(student){
      this.isLoading = true
      this.semester = ''
      axios({url: this.$store.state.student_end_point, method: 'GET', headers: this.headers})
      .then(response => {
        if(student=='' || student==null){
          this.student_name = ''
          this.branch_name = ''
          this.roll_number = ''
          this.semester = ''
          this.last_date = ''
          this.first_name = ''
          this.last_name = ''
          this.caste = ''
          this.date_of_birth = ''
          this.admission_year = ''
          this.session = ''
          this.father_name = ''
          this.mother_name = ''
          this.address = ''
          this.parents_phone_number = ''
          this.showFees = false
          this.isLoading = false
          this.isPhd = false
        }
        else {
          for(var i=0; i<response.data.length; i++){
            if((`${response.data[i]['first_name']} ${response.data[i]['last_name']}`).toLowerCase()==student.toLowerCase()){
              this.student_name = `${response.data[i]['first_name']} ${response.data[i]['last_name']}`
              this.student_id = response.data[i]['id']
              this.branch_name = response.data[i]['branch']
              this.branch = response.data[i]['branch_id']
              this.roll_number = response.data[i]['roll_number']
              this.depertment_id = response.data[i]['depertment_id']
              this.depertment_name = response.data[i]['depertment']
              this.first_name = response.data[i]['first_name']
              this.last_name = response.data[i]['last_name']
              this.caste = response.data[i]['caste']
              this.date_of_birth = response.data[i]['date_of_birth']
              this.admission_year = response.data[i]['admission_year']
              this.session = response.data[i]['session']
              this.father_name = response.data[i]['father_name']
              this.mother_name = response.data[i]['mother_name']
              this.address = response.data[i]['address']
              this.parents_phone_number = response.data[i]['parents_phone_number']
              this.entry_type = response.data[i]['entry_type']
            }
            else if(response.data[i]['roll_number']==student){
              this.student_name = `${response.data[i]['first_name']} ${response.data[i]['last_name']}`
              this.student_id = response.data[i]['id']
              this.branch_name = response.data[i]['branch']
              this.branch = response.data[i]['branch_id']
              this.roll_number = response.data[i]['roll_number']
              this.depertment_id = response.data[i]['depertment_id']
              this.depertment_name = response.data[i]['depertment']
              this.first_name = response.data[i]['first_name']
              this.last_name = response.data[i]['last_name']
              this.caste = response.data[i]['caste']
              this.date_of_birth = response.data[i]['date_of_birth']
              this.admission_year = response.data[i]['admission_year']
              this.session = response.data[i]['session']
              this.father_name = response.data[i]['father_name']
              this.mother_name = response.data[i]['mother_name']
              this.address = response.data[i]['address']
              this.parents_phone_number = response.data[i]['parents_phone_number']
              this.entry_type = response.data[i]['entry_type']
            }
          }
          this.get_depertment_short(this.depertment_id, this.depertment_data)
          this.isLoading = false
          if(this.depertment_name=='PhD'){
            this.isPhd = true
          }
          else{
            this.isPhd = false
          }
        }
      })
    },
    semester_decrement(semester){
      for(var i=0;i<this.semesterChoice.length;i++){
        if(this.semesterChoice[i]==semester){
          return this.semesterChoice[i-1]
        }
      }
    },
    get_student_examination_fee_status(semester, student_id, data){
      var match = false
      var sem = this.semester_decrement(semester)
      for(var i=0;i<data.length;i++){
        if((data[i]['student_id']==student_id && data[i]['semester']==sem)){
          match = true
          break
        }
        else {
          match = false
        }
      }
      return match
    },
    get_fee_details(depertment, depertment_name, branch, semester, student_id, student_name) {
      if(this.get_admitted_students_data && this.student_id && this.semester){
        for(var k=0; k<this.get_admitted_students_data.length; k++){
          if(this.student_id == this.get_admitted_students_data[k]['student_id'] && this.semester == this.get_admitted_students_data[k]['semester']){
            this.isAdmitted = true
            this.admitted_student_data = this.get_admitted_students_data[k]
            this.snackbar = true
            this.errorOccure = false
            this.showFees = false
            this.dialog_msg = student_name + ' ' +'Admitted'
            break
          }
          else{
            this.isAdmitted = false
          }
        }
      }
      else{
        this.isAdmitted = false
      }

      if(depertment_name!='Bachelor of Engineering') {
        for(var i=0;i<this.fee_data.length;i++) {
          let branchIds = this.fee_data[i]['branch']
          if(depertment==this.fee_data[i]['depertment_id'] && this.fee_data[i]['semester']==this.convert_semester_to_even_odd(semester) && branchIds.includes(branch)) {
            this.govt_dues = this.fee_data[i]['govt_dues']
            this.tuition_fee = this.fee_data[i]['tuition_fee']
            this.identity_fee = this.fee_data[i]['identity_fee']
            this.examination_fee = this.fee_data[i]['examination_fee']
            this.student_union_fee = this.fee_data[i]['student_union_fee']
            this.game_sports_fee = this.fee_data[i]['game_sports_fee']
            this.magazine_fee = this.fee_data[i]['magazine_fee']
            this.laboratory_fee = this.fee_data[i]['laboratory_fee']
            this.university_registration_fee = this.fee_data[i]['university_registration_fee']
            this.enrolment_fee = this.fee_data[i]['enrolment_fee']
            this.electricity_fee = this.fee_data[i]['electricity_fee']
            this.group_insurance_fee = this.fee_data[i]['group_insurance_fee']
            this.scout_guide_fee = this.fee_data[i]['scout_guide_fee']
            this.internet_fee = this.fee_data[i]['internet_fee']
            this.welfare_fee = this.fee_data[i]['welfare_fee']
            this.development_fee = this.fee_data[i]['development_fee']
            this.library_caution_fee = this.fee_data[i]['library_caution_fee']
            this.transport_fee = this.fee_data[i]['transport_fee']
            this.iste_fee = '0.00'
            this.training_placement_fee = this.fee_data[i]['training_placement_fee']
            this.college_festival_fee = this.fee_data[i]['college_festival_fee']
            this.medical_fee = this.fee_data[i]['medical_fee']
            this.last_date = this.formatDate(this.fee_data[i]['last_admission_date'])
            this.formatted_last_date = new Date(this.fee_data[i]['last_admission_date'])
            this.formatted_present_date = new Date()
            if(this.isSpotAdmission){
              this.late_fee = '0.00'
              this.total_without_fine = (Number(this.govt_dues) + Number(this.tuition_fee) + Number(this.identity_fee) + Number(this.examination_fee)
                + Number(this.student_union_fee) + Number(this.game_sports_fee) + Number(this.magazine_fee) + Number(this.laboratory_fee)
                + Number(this.university_registration_fee) + Number(this.enrolment_fee) + Number(this.electricity_fee) + Number(this.group_insurance_fee)
                + Number(this.scout_guide_fee) + Number(this.internet_fee) + Number(this.welfare_fee) + Number(this.development_fee) + Number(this.library_caution_fee)
                + Number(this.transport_fee) + Number(this.training_placement_fee) + Number(this.college_festival_fee) + Number(this.medical_fee))
              this.total = Number(this.total_without_fine) + Number(this.late_fee)
              this.msg = ''
            }
            else if(this.formatted_present_date.getTime()>this.formatted_last_date.getTime()){
              this.late_fee = this.fee_data[i]['late_fee']
              this.total_without_fine = (Number(this.govt_dues) + Number(this.tuition_fee) + Number(this.identity_fee) + Number(this.examination_fee)
                + Number(this.student_union_fee) + Number(this.game_sports_fee) + Number(this.magazine_fee) + Number(this.laboratory_fee)
                + Number(this.university_registration_fee) + Number(this.enrolment_fee) + Number(this.electricity_fee) + Number(this.group_insurance_fee)
                + Number(this.scout_guide_fee) + Number(this.internet_fee) + Number(this.welfare_fee) + Number(this.development_fee) + Number(this.library_caution_fee)
                + Number(this.transport_fee) + Number(this.training_placement_fee) + Number(this.college_festival_fee) + Number(this.medical_fee))
              this.total = Number(this.total_without_fine) + Number(this.late_fee)
              this.msg = '(**Late fee is added.)'
            }
            else {
              this.late_fee = '0.00'
              this.total_without_fine = (Number(this.govt_dues) + Number(this.tuition_fee) + Number(this.identity_fee) + Number(this.examination_fee)
                + Number(this.student_union_fee) + Number(this.game_sports_fee) + Number(this.magazine_fee) + Number(this.laboratory_fee)
                + Number(this.university_registration_fee) + Number(this.enrolment_fee) + Number(this.electricity_fee) + Number(this.group_insurance_fee)
                + Number(this.scout_guide_fee) + Number(this.internet_fee) + Number(this.welfare_fee) + Number(this.development_fee) + Number(this.library_caution_fee)
                + Number(this.transport_fee) + Number(this.training_placement_fee) + Number(this.college_festival_fee) + Number(this.medical_fee))
              this.total = Number(this.total_without_fine) + Number(this.late_fee)
              this.msg = ''
            }
          }
        }
      }
      else{
        for(var j=0;j<this.be_fee_data.length;j++){
          if(depertment==this.be_fee_data[j]['depertment_id'] && this.be_fee_data[j]['semester']==this.convert_semester_to_even_odd(semester)){
            this.govt_dues = this.be_fee_data[j]['govt_dues']
            this.tuition_fee = '0.00'
            this.identity_fee = this.be_fee_data[j]['identity_fee']
            this.examination_fee = this.be_fee_data[j]['examination_fee']
            this.student_union_fee = this.be_fee_data[j]['student_union_fee']
            this.game_sports_fee = this.be_fee_data[j]['game_sports_fee']
            this.magazine_fee = this.be_fee_data[j]['magazine_fee']
            this.laboratory_fee = this.be_fee_data[j]['laboratory_fee']
            this.university_registration_fee = this.be_fee_data[j]['university_registration_fee']
            this.enrolment_fee = this.be_fee_data[j]['enrolment_fee']
            this.electricity_fee = this.be_fee_data[j]['electricity_fee']
            this.group_insurance_fee = this.be_fee_data[j]['group_insurance_fee']
            this.scout_guide_fee = this.be_fee_data[j]['scout_guide_fee']
            this.internet_fee = this.be_fee_data[j]['internet_fee']
            this.welfare_fee = this.be_fee_data[j]['welfare_fee']
            this.development_fee = this.be_fee_data[j]['development_fee']
            this.library_caution_fee = this.be_fee_data[j]['library_caution_fee']
            this.transport_fee = this.be_fee_data[j]['transport_fee']
            this.iste_fee = this.be_fee_data[j]['iste_fee']
            this.training_placement_fee = this.be_fee_data[j]['training_placement_fee']
            this.college_festival_fee = this.be_fee_data[j]['college_festival_fee']
            this.medical_fee = this.be_fee_data[j]['medical_fee']
            this.last_date = this.formatDate(this.be_fee_data[j]['last_admission_date'])
            this.formatted_last_date = new Date(this.be_fee_data[j]['last_admission_date'])
            this.formatted_present_date = new Date()
            if(this.isSpotAdmission){
              this.late_fee = '0.00'
              this.total_without_fine = (Number(this.govt_dues) + Number(this.iste_fee) + Number(this.identity_fee) + Number(this.examination_fee)
                + Number(this.student_union_fee) + Number(this.game_sports_fee) + Number(this.magazine_fee) + Number(this.laboratory_fee)
                + Number(this.university_registration_fee) + Number(this.enrolment_fee) + Number(this.electricity_fee) + Number(this.group_insurance_fee)
                + Number(this.scout_guide_fee) + Number(this.internet_fee) + Number(this.welfare_fee) + Number(this.development_fee) + Number(this.library_caution_fee)
                + Number(this.transport_fee) + Number(this.training_placement_fee) + Number(this.college_festival_fee) + Number(this.medical_fee))
              this.total = Number(this.total_without_fine) + Number(this.late_fee)
              this.msg = ''
            }
            else if(this.formatted_present_date.getTime()>this.formatted_last_date.getTime()){
              this.late_fee = this.be_fee_data[j]['late_fee']
              this.total_without_fine = (Number(this.govt_dues) + Number(this.iste_fee) + Number(this.identity_fee) + Number(this.examination_fee)
                + Number(this.student_union_fee) + Number(this.game_sports_fee) + Number(this.magazine_fee) + Number(this.laboratory_fee)
                + Number(this.university_registration_fee) + Number(this.enrolment_fee) + Number(this.electricity_fee) + Number(this.group_insurance_fee)
                + Number(this.scout_guide_fee) + Number(this.internet_fee) + Number(this.welfare_fee) + Number(this.development_fee) + Number(this.library_caution_fee)
                + Number(this.transport_fee) + Number(this.training_placement_fee) + Number(this.college_festival_fee) + Number(this.medical_fee))
              this.total = Number(this.total_without_fine) + Number(this.late_fee)
              this.msg = '(**Late fee is added.)'
            }
            else {
              this.late_fee = '0.00'
              this.total_without_fine = (Number(this.govt_dues) + Number(this.iste_fee) + Number(this.identity_fee) + Number(this.examination_fee)
                + Number(this.student_union_fee) + Number(this.game_sports_fee) + Number(this.magazine_fee) + Number(this.laboratory_fee)
                + Number(this.university_registration_fee) + Number(this.enrolment_fee) + Number(this.electricity_fee) + Number(this.group_insurance_fee)
                + Number(this.scout_guide_fee) + Number(this.internet_fee) + Number(this.welfare_fee) + Number(this.development_fee) + Number(this.library_caution_fee)
                + Number(this.transport_fee) + Number(this.training_placement_fee) + Number(this.college_festival_fee) + Number(this.medical_fee))
              this.total = Number(this.total_without_fine) + Number(this.late_fee)
              this.msg = ''
            }
          }
        }
      }
    },

    get_spot_admission_fee_details() {
      for(var i=0;i<this.spot_admission_fee_data.length;i++){
          this.govt_dues = this.spot_admission_fee_data[i]['govt_dues']
          this.tuition_fee = '0.00'
          this.identity_fee = this.spot_admission_fee_data[i]['identity_fee']
          this.examination_fee = this.spot_admission_fee_data[i]['examination_fee']
          this.student_union_fee = this.spot_admission_fee_data[i]['student_union_fee']
          this.game_sports_fee = this.spot_admission_fee_data[i]['game_sports_fee']
          this.magazine_fee = this.spot_admission_fee_data[i]['magazine_fee']
          this.laboratory_fee = this.spot_admission_fee_data[i]['laboratory_fee']
          this.university_registration_fee = this.spot_admission_fee_data[i]['university_registration_fee']
          this.enrolment_fee = this.spot_admission_fee_data[i]['enrolment_fee']
          this.electricity_fee = this.spot_admission_fee_data[i]['electricity_fee']
          this.group_insurance_fee = this.spot_admission_fee_data[i]['group_insurance_fee']
          this.scout_guide_fee = this.spot_admission_fee_data[i]['scout_guide_fee']
          this.internet_fee = this.spot_admission_fee_data[i]['internet_fee']
          this.welfare_fee = this.spot_admission_fee_data[i]['welfare_fee']
          this.development_fee = this.spot_admission_fee_data[i]['development_fee']
          this.library_caution_fee = this.spot_admission_fee_data[i]['library_caution_fee']
          this.transport_fee = this.spot_admission_fee_data[i]['transport_fee']
          this.iste_fee = this.spot_admission_fee_data[i]['iste_fee']
          this.training_placement_fee = this.spot_admission_fee_data[i]['training_placement_fee']
          this.college_festival_fee = this.spot_admission_fee_data[i]['college_festival_fee']
          this.form_and_prospectus_fee = this.spot_admission_fee_data[i]['form_and_prospectus_fee']
          this.counselling_fee = this.spot_admission_fee_data[i]['counselling_fee']
          this.hostel_admission_fee = this.spot_admission_fee_data[i]['hostel_admission_fee']
          this.spot_admission_fine = this.spot_admission_fee_data[i]['spot_admission_fine']
          this.medical_fee = this.spot_admission_fee_data[i]['medical_fee']
          this.total_without_fine = (Number(this.govt_dues) + Number(this.iste_fee) + Number(this.identity_fee) + Number(this.examination_fee)
                + Number(this.student_union_fee) + Number(this.game_sports_fee) + Number(this.magazine_fee) + Number(this.laboratory_fee)
                + Number(this.university_registration_fee) + Number(this.enrolment_fee) + Number(this.electricity_fee) + Number(this.group_insurance_fee)
                + Number(this.scout_guide_fee) + Number(this.internet_fee) + Number(this.welfare_fee) + Number(this.development_fee) + Number(this.library_caution_fee)
                + Number(this.transport_fee) + Number(this.training_placement_fee) + Number(this.college_festival_fee) + Number(this.medical_fee)
                + Number(this.form_and_prospectus_fee) + Number(this.counselling_fee) + Number(this.hostel_admission_fee) + Number(this.spot_admission_fine))
          this.late_fee = '0.00'
          this.total = this.total_without_fine + Number(this.late_fee)
      }
    },

    convert_semester_to_even_odd(semester){
      if(semester=='First'||semester=='Third'||semester=='Fifth'||semester=='Seventh'){
        return 'Odd'
      }
      else if(semester=='Second'||semester=='Fourth'||semester=='Sixth'||semester=='Eighth'){
        return 'Even'
      }
      else{
        return 'NULL'
      }
    },

    save_student_to_admission_table(){
      this.isPageLoad = true
      return new Promise((resolve,reject)=>{
        axios({url: this.$store.state.admission_end_point,
          method: 'POST',
          headers: this.headers,
          data: {
            student_id: this.student_id,
            semester: this.semester,
            depertment_id: this.depertment_id,
            branch_id: this.branch,
            admission_date: this.convertDate(this.present_date),
            govt_dues: this.govt_dues,
            tuition_fee: this.parseInput(this.tuition_fee),
            identity_fee: this.identity_fee,
            examination_fee: this.examination_fee,
            student_union_fee: this.student_union_fee,
            game_sports_fee: this.game_sports_fee,
            magazine_fee: this.magazine_fee,
            laboratory_fee: this.laboratory_fee,
            university_registration_fee: this.university_registration_fee,
            enrolment_fee: this.enrolment_fee,
            electricity_fee: this.electricity_fee,
            group_insurance_fee: this.group_insurance_fee,
            scout_guide_fee: this.scout_guide_fee,
            internet_fee: this.internet_fee,
            welfare_fee: this.welfare_fee,
            development_fee: this.development_fee,
            library_caution_fee: this.library_caution_fee,
            transport_fee: this.transport_fee,
            iste_fee: this.iste_fee,
            training_placement_fee: this.training_placement_fee,
            college_festival_fee: this.college_festival_fee,
            medical_fee: this.medical_fee,
            amount: this.total_without_fine,
            late_fee: this.parseInput(this.late_fee),
          }
        })
        .then((response)=>{
          console.log(response);
          this.isAdmissionSuccessful = true
          this.update_student_details_in_student_table()
          this.fetch_admitted_students_data()
          this.errorOccure = false
          this.fee_snackbar = true
          resolve(response)
        })
        .catch(error=>{
          this.isPageLoading = false
          this.isAdmissionSuccessful = false
          this.errorOccure = true
          this.snackbar = false
          this.fee_snackbar = false
          this.dialog_msg = 'Some error has been occur.'
          reject(error)
        })
      })
    },

    get_depertment_short(depertment_id,depertment_data){
      if(depertment_data && depertment_id){
        for(var i=0; i<depertment_data.length;i++){
          if(depertment_id==depertment_data[i]['id']){
            this.depertment_short = depertment_data[i]['dept_short']
            break
          }
          else {
            this.depertment_short = ''
          }
        }
      }
    },

    update_student_details_in_student_table(){
      if(this.isSpotAdmission){
        this.isPageLoad = false
      }
      else {
        return new Promise((resolve,reject)=>{
          axios({url: this.$store.state.student_end_point+this.student_id+'/',
          method: 'PUT',
          headers: this.headers,
          data: {
            first_name: this.first_name,
            last_name: this.last_name,
            depertment_id: this.depertment_id,
            branch_id: this.branch,
            caste: this.caste,
            date_of_birth: this.date_of_birth,
            semester: this.semester,
            roll_number: this.roll_number,
            session: this.session,
            father_name: this.father_name,
            mother_name: this.mother_name,
            parents_phone_number: this.parents_phone_number,
            address: this.address,
            admission_year: this.admission_year,
            entry_type: this.entry_type,
          },
        })
        .then(response=>{
          this.isPageLoad = false
          resolve(response)
        })
        .catch(error=>{
          reject(error)
        })
      })
      }
    },

    semester_increment(semester,depertment_short){
      if(depertment_short=='BE'){
        for(var h=0;h<this.semesterChoice.length;h++){
          if(h+1>=this.semesterChoice.length){
            this.semester = this.semesterChoice[h]
            break
          }
          else if(this.semesterChoice[h]==semester){
            this.semester = this.semesterChoice[h+1]
            break
          }
        }
      }
      else{
        for(h=0;h<this.semesterChoice.length;h++){
          if(h+1>=6){
            this.semester = this.semesterChoice[h]
            break
          }
          else if(this.semesterChoice[h]==semester){
            this.semester = this.semesterChoice[h+1]
            break
          }
        }
      }
    },
  }
}
</script>

<style lang="css" scoped>
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

@media print {
  .note_signature{
    padding-top: 50px;
  }
  .thin_text{
    font-weight: 300;
  }
}
</style>
