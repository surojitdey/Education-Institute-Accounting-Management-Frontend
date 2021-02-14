<template>
  <div class="examination pt-5">
    <!-- <span>{{students}}</span> -->
    <v-card elevation="7" class="admissionFormBorder">
      <BreadCrumb :values="breadItems"></BreadCrumb>
      <v-card-title class="">
        <span class="heading text-uppercase">Examination Fee</span>
      </v-card-title>
      <v-card-text class="py-0">
        <v-row>
          <v-col cols="12" sm="12" md="12" class="mt-0 pt-0 mr-0">
            <span>Enter Student Name or Roll Number</span>
          </v-col>
          <v-col cols="6" sm="6" md="4" class="mt-0 pt-0 mr-0">
            <v-autocomplete label="Student Name" outlined dense :items="students" v-model="input_student_name" @change="get_student_details(input_student_name, students_data)" append-icon = ''></v-autocomplete>
          </v-col>

          <v-col cols="6" sm="7" md="1" class="mt-0 pt-0 ml-0 mr-0 align-center justify-center">
            <div class="grey--text text--darken-2 mt-4 ml-5">OR</div>
          </v-col>
          <v-col cols="6" sm="6" md="4" class="mt-0 pt-0 ml-0">
            <v-text-field label="Roll Number" outlined dense v-model="input_roll_number" @change="get_student_details(input_roll_number, students_data)"></v-text-field>
          </v-col>

        </v-row>
      </v-card-text>
      <v-card-text class="pb-0">
        <v-col cols="12" sm="12" md="9" class="mt-0 px-0 pt-0">
          <v-select :items="exam_type_array" class="mt-0 pt-0 my-0 py-0" label="Examination Type" outlined v-model="exam_type" @change="examTypeChange(exam_type)" :rules= "[rules.required]" required></v-select>
          <v-select v-show="isTypeRegular" :items="ncdc_array" class="mt-0 pt-0 my-0 py-0" label="NC/DC/Regular" outlined v-model="ncdc" @change="ncdcChange(ncdc)" :rules= "[rules.required]" required></v-select>
        </v-col>
      </v-card-text>

      <v-card-text class="pb-0">
        <!-- <v-container> -->

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
              <!-- <v-select :items="semesterChoice" dense append-icon='' single-line solo label="Semester" flat v-model="semester"></v-select> -->
              <label for="semester" class="black--text">Semester:</label>
              <select id="semester" v-if="semester && !isPhd" class="black--text ml-2 semester" v-model="semester">
              <!-- <select id="semester" v-if="semester && !isPhd" class="black--text ml-2 semester" v-model="semester" @change="get_fee_details(depertment_id,depertment_name,semester,student_id, student_name, admitted_students_data, examination_fee_submit_students_data, compartmental_fee_submit_students_data, betterment_fee_submit_students_data)"> -->
                <option v-for="sem in semesterChoice" :key="sem" :value="sem">{{sem}}</option>
              </select>
              <span id="semester" v-else-if="semester && isPhd" class="black--text ml-2 semester">{{semester}}</span>
            </v-col>
            <v-col cols="6" sm="6" md="3" class="mt-0 pt-0 mr-4">
              <div class="red--text text--darken-2 welcomeMessage align-center mt-0 pt-0">Last date: <span>{{last_date}}</span></div>
            </v-col>
          </v-row>
        <!-- </v-container> -->
      </v-card-text>
    </v-card>


    <v-card elevation="7" class="feesBorder mt-4 mb-6" v-if="showFees && !isDc && exam_type">
      <v-card-title>
        <span class="heading">FEES</span>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-row justify="space-between">
          <v-col cols="12" sm="5" md="5" class="mt-0 pt-0 my-0 py-0">
            <v-select v-show="isTypeCompartmental" :items="compartmental_type_array" label="Compartmental Type" outlined v-model="compartmental_type" @change="compartmentalTypeChange(compartmental_type)" :rules= "[rules.required]" required></v-select>
            <v-select v-show="isTypeCompartmental || isTypeBetterment" :items="subject_number_array" label="Number of Subjects" outlined v-model="subject_number" @change="subjectNumberChange(subject_number)" :rules= "[rules.required]" required></v-select>
            <v-text-field label="Compartmental(Back) Fee" v-show="compartmental_type && subject_number && isTypeCompartmental" v-model="compartmental_fee" outlined dense :prepend-inner-icon="rupee_icon" readonly></v-text-field>
            <v-text-field label="Betterment Fee" v-show="isTypeBetterment && subject_number" v-model="betterment_fee" outlined dense :prepend-inner-icon="rupee_icon" readonly></v-text-field>
            <v-text-field label="Examination Fee" v-show="isTypeRegular" v-model="examination_fee" outlined dense :prepend-inner-icon="rupee_icon" readonly></v-text-field>
            <v-text-field v-show="isNc && isTypeRegular" label="Non-College Fee" v-model="nc_fee" outlined dense :prepend-inner-icon="rupee_icon" readonly></v-text-field>
          </v-col>
          <v-divider vertical></v-divider>
          <v-col cols="12" sm="5" md="5" class="mt-0 pt-0 my-0 py-0">
            <v-text-field label="Late Fee" v-model="late_fee" outlined dense :prepend-inner-icon="rupee_icon" readonly></v-text-field>
            <v-text-field label="Last Date" v-model="last_date" outlined dense prepend-inner-icon="event" readonly></v-text-field>
            <v-divider></v-divider>
            <v-row cols="6" sm="6" md="3" class="mt-0 pt-0">
              <v-col cols="12" sm="6" md="9">
                <h3 class="black--text text--darken-5 mt-0 pt-0 mx-10">
                  **Total :
                  <span class="text-right mx-0 px-0">
                    <v-icon color="black" size="19" class="mx-0 px-0 my-0">{{rupee_icon}}</v-icon>
                    {{total}}
                    <span class="red--text text--darken-2">{{msg}}</span>
                  </span>
                </h3>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-btn type="submit" color="success darken-1" width="115" :disabled="disabled" @click="save_students_details(end_point)">Save</v-btn>
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
            <!-- <v-btn color="primary" text @click="old_receipt_print">Print Receipt</v-btn> -->
            <v-btn color="primary" text @click="snackbar=false">Close</v-btn>
          </v-card-actions>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="fee_snackbar" width="600" timeout="3000">
      <v-card>
        <!-- <v-card-title class="text-uppercase" dark>Receipt for fees</v-card-title> -->
        <v-card-text class="black--text" id="receipt">
          <h2 class="text-center">
            <span class="receipt-title text-uppercase text-center black white--text font-weight-regular px-2">Receipt for fees</span>
          </h2>
          <h1 class="text-capitalize pt-2 text-center">
            <span>Jorhat Institute Of Science & Technology</span><br>
          </h1>
          <h2 class="text-center text-capitalize font-weight-medium pt-1">
            <span class="font-italic mt-1">(Formerly Science College, Jorhat)</span><br>
            <span class="mt-1">P.O. Chenijan, Sotai, </span>
            <span class="mt-1">Jorhat - 785010 (Assam)</span>
          </h2>
          <v-row class="pl-5 mt-2" no-gutters>
            <v-col cols="6" sm="6" md="6">
              <h3>
                <span class="text-capitalize">Name: <span class="text-capitalize font-weight-regular">{{student_name}}</span></span>
              </h3>
            </v-col>
            <v-col cols="6" sm="6" md="6">
              <h3>
                <span class="text-capitalize">Roll Number: <span class="text-capitalize font-weight-regular">{{roll_number}}</span></span>
              </h3>
            </v-col>
          </v-row>
          <v-row class="pl-5" no-gutters>
            <v-col cols="6" sm="6" md="6">
              <h3>
                <span class="text-capitalize">Year: <span class="text-capitalize font-weight-regular">{{depertment_short}} {{semester}}</span></span>
              </h3>
            </v-col>
            <v-col cols="6" sm="6" md="6">
              <h3>
                <span class="text-capitalize">Date: <span class="text-capitalize font-weight-regular">{{present_date}}</span></span>
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
            <v-col cols="2" sm="2" md="2">
              <h3 class="text-center">
                <span class="text-capitalize subtitle-2">{{data.sl_no}}</span>
              </h3>
            </v-col>
            <v-col cols="7" sm="7" md="7">
              <h3 class="text-center" >
                <span class="text-capitalize subtitle-2">{{data.particular}}</span>
              </h3>
            </v-col>
            <v-col cols="3" sm="3" md="3">
              <h3 class="text-center">
                <span class="subtitle-2 font-weight-regular">{{data.amount}}</span>
              </h3>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row class="pl-5" align="center" justify="center" no-gutters>
            <v-col cols="2" sm="2" md="2">
              <h3 class="text-center">
                <span class="text-capitalize subtitle-2"></span>
              </h3>
            </v-col>
            <v-col cols="7" sm="7" md="7">
              <h3 class="text-center" >
                <span class="text-capitalize subtitle-2">total</span>
              </h3>
            </v-col>
            <v-col cols="3" sm="3" md="3">
              <h3 class="text-center">
                <span class="subtitle-2 font-weight-regular">{{total}}</span>
              </h3>
            </v-col>
          </v-row>
          <v-row class="mt-12 note_signature" align="center">
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
import BreadCrumb from '@/components/breadCrumb';
import axios from 'axios';
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {
    BreadCrumb,
  },
  data() {
    return {
      isPageLoad: false,
      breadItems: [
        {
          text: 'Overview',
          exact: true,
          disabled: false,
          href: '/surojit/JIST/dist/',
          link: true,
        },
        {
          text: 'Examination',
          exact: true,
          disabled: true,
          href: '/surojit/JIST/dist/#/examination/',
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

      rules: {
        required: value => !!value || 'Required',
        // passwordMatched: value => value === this.new_password || 'Confirm Password did not matched with Password field!',
      },
      exam_type_array: ['Regular','Compartmental','Betterment'],
      exam_type: '',
      isTypeRegular: false,
      isTypeCompartmental: false,
      isTypeBetterment: false,
      ncdc_array: ['Regular','Non-College','Dis-College'],
      ncdc: '',
      isNc: false,
      isDc: false,
      isRegular: false,
      compartmental_type_array: ['Practical','Without Practical'],
      compartmental_type: '',
      isPractical: false,
      subject_number_array: ['One','Two or More'],
      subject_number: '',
      isSubjectOne: false,
      input_student_name: '',
      student_name: '',
      student_id: '',
      input_roll_number: '',
      roll_number: '',
      branch_name: '',
      branch_id: '',
      semester: '',
      entry_type: '',
      students: [],
      students_data: [],
      // full_name: `${}`,
      showFees: false,
      isLoading: false,
      isPhd: false,
      rupee_icon: "mdi-currency-inr",

      present_date: '',
      last_date: '',
      formatted_present_date: '',
      formatted_last_date: '',
      depertment_id: '',
      depertment_name: '',
      branch: '',
      fee_data: [],
      be_fee_data: [],

      examination_fee: '',
      compartmental_fee: '',
      betterment_fee: '',
      nc_fee: '0',
      late_fee: '',
      total: '',
      total_without_fine: '',
      msg: '',

      admitted_students_data: [],
      isAdmitted: false,

      errorOccure: false,
      snackbar: false, // used to show the success or error msg.
      dialog_msg: '', // Success or Error msg after form submission

      examination_fee_submit_students_data: [],
      compartmental_fee_submit_students_data: [],
      betterment_fee_submit_students_data: [],
      isExaminationFeeSubmitted: false,
      isCompartmentalFeeSubmitted: false,
      isBettermentFeeSubmitted: false,

      fee_snackbar: false,

      depertment_data: [],
      depertment_short: '',

      receipt_data: [],

      end_point: '',

      disabled: false,
      headers: {
        'Authorization':'Bearer '+ this.$store.state.token,
      },
    }
  },

  mounted() {
    document.title = "Examination"
    localStorage.setItem('last_URL','/examination')
    this.isPageLoad = true
    let date = new Date()
    // console.log(date.getMonth() + 1);
    this.present_date = `${String(date.getDate()).padStart(2,0)}/${date.getMonth() + 1}/${date.getFullYear()}`
    // console.log(this.present_date);

    new Promise((resolve, reject)=> {
      axios({url: this.$store.state.student_end_point, method: 'GET', headers: this.headers})
      .then(response => {
        for(var i=0; i<response.data.length; i++){
          var full_name = response.data[i]['first_name']+' '+response.data[i]['last_name']
          this.students.push(full_name)
          this.students_data = response.data
        }
        resolve(response)
      })
      .catch(error => {
        this.signout(error)
        reject(error)
      })

      axios({url: this.$store.state.exam_fee_end_point, method: 'GET', headers: this.headers})
      .then(response => {
        this.fee_data = response.data
        resolve(response)
      })
      .catch(error => {
        this.signout(error)
        reject(error)
      })
      // Admitted Students Details.
      axios({url:this.$store.state.admission_end_point, method: 'GET', headers: this.headers})
      .then(response=>{
        this.admitted_students_data = response.data
        resolve(response)
      })
      .catch(error=>{
        this.signout(error)
        reject(error)
      })
      // Students Details who are submitted their examination fees.
      this.fetch_examination_students_data()
      // Students Details who are submitted their compartmental fees.
      axios({url:this.$store.state.compartmental_end_point, method: 'GET', headers: this.headers})
      .then(response=>{
        this.compartmental_fee_submit_students_data = response.data
        resolve(response)
      })
      .catch(error=>{
        this.signout(error)
        reject(error)
      })
      // Students Details who are submitted their betterment fees.
      axios({url:this.$store.state.betterment_end_point, method: 'GET', headers: this.headers})
      .then(response=>{
        this.betterment_fee_submit_students_data = response.data
        resolve(response)
      })
      .catch(error=>{
        this.signout(error)
        reject(error)
      })
      // Depertment Details.
      axios({url:this.$store.state.depertment_end_point, method: 'GET', headers: this.headers})
      .then(response=>{
        this.depertment_data = response.data
        this.isPageLoad = false
        resolve(response)
      })
      .catch(error=>{
        this.signout(error)
        reject(error)
      })

    })
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
    total(){
      this.total = parseFloat(this.total).toFixed(2)
    },
    exam_type(){
      this.examTypeChange(this.exam_type)
      this.check_student_status()
    },
    isTypeRegular(){
      if(this.isTypeRegular){
        this.check_is_exam_fee_submitted(this.get_examination_students_data, this.student_id, this.semester)
        this.check_student_status()
      }
    },
    isTypeCompartmental(){
      if(this.isTypeCompartmental){
        this.check_is_back_fee_submitted(this.compartmental_fee_submit_students_data, this.student_id, this.semester)
        this.check_student_status()
      }
    },
    isTypeBetterment(){
      if(this.isTypeBetterment){
        this.check_is_betterment_fee_submitted(this.betterment_fee_submit_students_data, this.student_id, this.semester)
        this.check_student_status()
      }
    },
    semester(){
      this.exam_type = ''
      if(this.check_is_admitted(this.admitted_students_data, this.student_id, this.student_name, this.semester)){
        this.isAdmitted = true
      }
      else{
        if(this.student_name){
          this.isAdmitted = false
          this.showFees = false
          this.isLoading = false
          this.snackbar = true
          this.fee_snackbar = false
          this.errorOccure = true
          this.dialog_msg = this.student_name + ' ' +' did not pay admission fee.'
        }
        else{
          this.isAdmitted = false
          this.showFees = false
          this.isLoading = false
          this.fee_snackbar = false
        }
      }

      // this.get_fee_details(this.depertment_id, this.depertment_name, this.semester, this.student_id, this.student_name,
      //                     this.admitted_students_data, this.examination_fee_submit_students_data, this.compartmental_fee_submit_students_data,
      //                     this.betterment_fee_submit_students_data)
      this.check_student_status()
    },

    isAdmitted(){
      if(this.isAdmitted){
        this.get_fee_details(this.depertment_id, this.depertment_name, this.semester)
        this.showFees = true
      }
      else{
        this.showFees = false
      }
    }
  },

  computed: {
    ...mapGetters([
      'get_examination_students_data'
    ])
  },

  methods: {
    ...mapActions({
      fetch_examination_students_data: 'fetch_examination_students_data'
    }),
    signout(error){
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
    },
    check_student_status(){
      if(this.student_name && this.exam_type){
        if(this.exam_type=='Regular' && this.isExaminationFeeSubmitted){
          this.showFees = false
          this.isLoading = false
          this.snackbar = true
          this.fee_snackbar = false
          this.errorOccure = false
          this.disabled = true
          this.dialog_msg = this.student_name + ' ' +' already paid examination fees for '+this.semester+' '+ 'semester.'
        }
        else if(this.exam_type=='Compartmental' && this.isCompartmentalFeeSubmitted){
          this.showFees = false
          this.isLoading = false
          this.snackbar = true
          this.fee_snackbar = false
          this.errorOccure = false
          this.disabled = true
          this.dialog_msg = this.student_name + ' ' +' already paid compartmental examination fees for '+this.semester+' '+ 'semester.'
        }
        else if(this.exam_type=='Betterment' && this.isBettermentFeeSubmitted){
          this.showFees = false
          this.isLoading = false
          this.snackbar = true
          this.fee_snackbar = false
          this.errorOccure = false
          this.disabled = true
          this.dialog_msg = this.student_name + ' ' +' already paid betterment examination fees for '+this.semester+' '+ 'semester.'
        }
        else{
          this.showFees = true
          this.isLoading = false
          this.snackbar = false
          this.fee_snackbar = false
          this.errorOccure = false
          this.disabled = false
          // this.dialog_msg = this.student_name + ' ' +' already paid examination fees for '+this.semester+' '+ 'semester.'
        }
      }
    },
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
      if(this.isTypeRegular){
        return [
          { sl_no: '1', particular: 'Examination Fee', amount: this.examination_fee},
          { sl_no: '2', particular: 'Non College Fee', amount: this.nc_fee},
          { sl_no: '3', particular: 'late fee', amount: this.late_fee},
        ]
      }
      else if(this.isTypeCompartmental){
        return [
          { sl_no: '1', particular: 'Compartmental Examination Fee', amount: this.compartmental_fee},
          { sl_no: '2', particular: 'late fee', amount: this.late_fee},
        ]
      }
      else if(this.isTypeBetterment){
        return [
          { sl_no: '1', particular: 'Betterment Examination Fee', amount: this.betterment_fee},
          { sl_no: '2', particular: 'late fee', amount: this.late_fee},
        ]
      }
      else{
        return [
          { sl_no: '*', particular: '***', amount: '***'},
        ]
      }
    },
    examTypeChange(exam_type) {
      if(exam_type == 'Regular'){
        this.isTypeRegular = true
        this.isTypeCompartmental = false
        this.isTypeBetterment = false
        this.end_point = this.$store.state.examination_end_point
      }
      else if(exam_type == 'Compartmental'){
        this.isTypeRegular = false
        this.isTypeCompartmental = true
        this.isTypeBetterment = false
        this.nc_fee = ''
        this.ncdc = ''
        this.end_point = this.$store.state.compartmental_end_point
      }
      else if(exam_type == 'Betterment'){
        this.isTypeRegular = false
        this.isTypeCompartmental = false
        this.isTypeBetterment = true
        this.nc_fee = ''
        this.ncdc = ''
        this.end_point = this.$store.state.betterment_end_point
      }
      else{
        this.isTypeRegular = false
        this.isTypeCompartmental = false
        this.isTypeBetterment = false
        this.nc_fee = ''
        this.ncdc = ''
        this.end_point = ''
      }

      if(this.depertment_id && this.depertment_name && this.semester){
        this.get_fee_details(this.depertment_id, this.depertment_name, this.semester)
      }
    },
    ncdcChange(ncdc) {
      if(ncdc == 'Regular'){
        this.isRegular = true
        this.isNc = false
        this.isDc = false
      }
      else if(ncdc == 'Non-College'){
        this.isRegular = false
        this.isNc = true
        this.isDc = false
      }
      else if(ncdc == 'Dis-College'){
        this.isRegular = false
        this.isNc = false
        this.isDc = true
      }
      else{
        this.isRegular = false
        this.isNc = false
        this.isDc = false
      }
      if(this.depertment_id && this.depertment_name && this.semester){
        this.get_fee_details(this.depertment_id, this.depertment_name, this.semester)
      }
    },
    compartmentalTypeChange(compartmental_type) {
      if(compartmental_type == 'Practical'){
        this.isPractical = true
      }
      else{
        this.isPractical = false
      }
      if(this.depertment_id && this.depertment_name && this.semester){
        this.get_fee_details(this.depertment_id, this.depertment_name, this.semester)
      }
    },
    subjectNumberChange(subject_number) {
      this.ncdcChange(this.ncdc) // this line of code make the nc dc variables to invalid so that it will not change the total fees value.
      if(subject_number == 'One'){
        this.isSubjectOne = true
      }
      else{
        this.isSubjectOne = false
      }
      if(this.depertment_id && this.depertment_name && this.semester){
        this.get_fee_details(this.depertment_id, this.depertment_name, this.semester)
      }
    },
    parseInput(input) {
      if(!input){
        return Number('0.00')
      }
      else {
        input = Number(input.toString().replace(',','')).toFixed(2)
        return input
      }
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
    get_student_details(student, students_data){
      this.isLoading = true
      if(student=='' || student==null){
        this.depertment_name = ''
        this.depertment_id = ''
        this.student_name = ''
        this.student_id = ''
        this.branch_name = ''
        this.branch_id = ''
        this.roll_number = ''
        this.semester = ''
        this.last_date = ''
        this.showFees = false
        this.isLoading = false
        this.isPhd = false
      }
      else {
        for(var i=0; i<students_data.length; i++){
          if((`${students_data[i]['first_name']} ${students_data[i]['last_name']}`).toLowerCase()==student.toLowerCase()){
            this.student_id = students_data[i]['id']
            this.student_name = `${students_data[i]['first_name']} ${students_data[i]['last_name']}`
            this.branch_name = students_data[i]['branch']
            this.branch_id = students_data[i]['branch_id']
            this.roll_number = students_data[i]['roll_number']
            this.semester = students_data[i]['semester']
            this.depertment_id = students_data[i]['depertment_id']
            this.depertment_name = students_data[i]['depertment']
            this.branch = students_data[i]['branch_id']
            this.entry_type = students_data[i]['entry_type']
          }
          else if(students_data[i]['roll_number']==student){
            this.student_id = students_data[i]['id']
            this.student_name = `${students_data[i]['first_name']} ${students_data[i]['last_name']}`
            this.branch_name = students_data[i]['branch']
            this.branch_id = students_data[i]['branch_id']
            this.roll_number = students_data[i]['roll_number']
            this.semester = students_data[i]['semester']
            this.depertment_id = students_data[i]['depertment_id']
            this.depertment_name = students_data[i]['depertment']
            this.branch = students_data[i]['branch_id']
            this.entry_type = students_data[i]['entry_type']
          }
        }
        this.get_depertment_short(this.depertment_id, this.depertment_data)
        // this.get_fee_details(this.depertment_id, this.depertment_name, this.semester, this.student_id, this.student_name,
        //                     this.admitted_students_data, this.examination_fee_submit_students_data, this.compartmental_fee_submit_students_data,
        //                     this.betterment_fee_submit_students_data)
        this.isLoading = false
        if(this.depertment_name=='PhD'){
          this.isPhd = true
        }
        else{
          this.isPhd = false
        }
      }
    },
    check_is_admitted(admitted_students_data,student_id,student_name,semester){
      var match = false
      if(admitted_students_data && student_id && semester){
        for(var k=0; k<admitted_students_data.length; k++){
          if(student_id == admitted_students_data[k]['student_id'] && semester == admitted_students_data[k]['semester']){
            // this.isAdmitted = true
            match = true
            break
          }
          else{
            // this.isAdmitted = false
            match = false
          }
        }
      }
      else{
        // this.isAdmitted = false
        match = false
      }
      return match
    },
    check_is_exam_fee_submitted(get_examination_students_data,student_id,semester){
      if(get_examination_students_data && student_id && semester){
        for(var m=0; m<get_examination_students_data.length; m++){
          if(student_id == get_examination_students_data[m]['student_id'] && semester == get_examination_students_data[m]['semester']){
            this.isExaminationFeeSubmitted = true
            // this.fee_snackbar = false //***********************************************
            break
          }
          else{
            this.isExaminationFeeSubmitted = false
            // this.fee_snackbar = true //***********************************************
          }
        }
      }
      else{
        this.isExaminationFeeSubmitted = false
      }
    },
    check_is_back_fee_submitted(compartmental_fee_submit_students_data,student_id,semester){
      if(compartmental_fee_submit_students_data && student_id && semester){
        for(var m=0; m<compartmental_fee_submit_students_data.length; m++){
          if(student_id == compartmental_fee_submit_students_data[m]['student_id'] && semester == compartmental_fee_submit_students_data[m]['semester']){
            this.isCompartmentalFeeSubmitted = true
            // this.fee_snackbar = false //***********************************************
            // console.log('isCompartmentalFeeSubmitted',this.isCompartmentalFeeSubmitted);
            break
          }
          else{
            this.isCompartmentalFeeSubmitted = false
            // this.fee_snackbar = true //***********************************************
          }
        }
      }
      else{
        this.isCompartmentalFeeSubmitted = false
      }
    },
    check_is_betterment_fee_submitted(betterment_fee_submit_students_data,student_id,semester){
      if(betterment_fee_submit_students_data && student_id && semester){
        for(var m=0; m<betterment_fee_submit_students_data.length; m++){
          if(student_id == betterment_fee_submit_students_data[m]['student_id'] && semester == betterment_fee_submit_students_data[m]['semester']){
            this.isBettermentFeeSubmitted = true
            // this.fee_snackbar = false //***********************************************
            break
          }
          else{
            this.isBettermentFeeSubmitted = false
            // this.fee_snackbar = true //***********************************************
          }
        }
      }
      else{
        this.isBettermentFeeSubmitted = false
      }
    },
    get_fee_details(depertment, depertment_name, semester) {
      for(var i=0;i<this.fee_data.length;i++){
        if(depertment==this.fee_data[i]['depertment_id'] && this.fee_data[i]['semester']==this.convert_semester_to_even_odd(semester)){
          this.examination_fee = this.fee_data[i]['regular_exam_fee']
          this.last_date = this.formatDate(this.fee_data[i]['last_date'])
          if(this.isTypeCompartmental && this.compartmental_type && this.subject_number){
            this.get_compartmental_fee(this.compartmental_type, this.subject_number, this.fee_data[i])
          }
          else{
            this.compartmental_fee = ''
          }

          if(this.isTypeBetterment && this.subject_number){
            this.get_betterment_fee(this.subject_number, this.fee_data[i])
          }
          else{
            this.betterment_fee = ''
          }
          this.formatted_last_date = new Date(this.fee_data[i]['last_date'])
          this.formatted_present_date = new Date()
          if(this.formatted_present_date.getTime()>this.formatted_last_date.getTime()){
            this.late_fee = this.fee_data[i]['late_fee']
            if(this.isNc){
              this.nc_fee = this.fee_data[i]['non_college_fee']
              this.total_without_fine = (parseFloat(this.examination_fee) + parseFloat(this.nc_fee))
              this.total = (this.total_without_fine + parseFloat(this.late_fee))
            }
            else if (this.isTypeCompartmental) {
              this.nc_fee = '0.00'
              this.total_without_fine = (parseFloat(this.compartmental_fee))
              this.total = (this.total_without_fine + parseFloat(this.late_fee))
            }
            else if (this.isTypeBetterment) {
              this.nc_fee = '0.00'
              this.total_without_fine = (parseFloat(this.betterment_fee))
              this.total = (this.total_without_fine + parseFloat(this.late_fee))
            }
            else{
              this.nc_fee = '0.00'
              this.total_without_fine = (parseFloat(this.examination_fee))
              this.total = (this.total_without_fine + parseFloat(this.late_fee))
            }
            this.msg = '(**Late fee is added.)'
          }
          else {
            this.late_fee = '0.00'
            if(this.isNc){
              this.nc_fee = this.fee_data[i]['non_college_fee']
              this.total_without_fine = (parseFloat(this.examination_fee) + parseFloat(this.nc_fee))
              this.total = this.total_without_fine
            }
            else if (this.isTypeCompartmental) {
              this.nc_fee = '0.00'
              this.total_without_fine = (parseFloat(this.compartmental_fee))
              this.total = this.total_without_fine
            }
            else if (this.isTypeBetterment) {
              this.nc_fee = '0.00'
              this.total_without_fine = (parseFloat(this.betterment_fee))
              this.total = this.total_without_fine
            }
            else{
              this.nc_fee = '0.00'
              this.total_without_fine = (parseFloat(this.examination_fee))
              this.total = this.total_without_fine
            }
            this.msg = ''
          }
        }
      }
      // }
      this.receipt_data = this.initialize()
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

    get_compartmental_fee(compartmental_type, subject_number, fee_data){
      if(compartmental_type=='Practical' && subject_number=="One"){
        this.compartmental_fee = fee_data['compartmetal_exam_fee_practicle_one']
      }
      else if(compartmental_type=='Practical' && subject_number=="Two or More"){
        this.compartmental_fee = fee_data['compartmetal_exam_fee_practicle_more']
      }
      else if(compartmental_type=='Without Practical' && subject_number=="One"){
        this.compartmental_fee = fee_data['compartmetal_exam_fee_no_practicle_one']
      }
      else if(compartmental_type=='Without Practical' && subject_number=="Two or More"){
        this.compartmental_fee = fee_data['compartmetal_exam_fee_no_practicle_more']
      }
    },

    get_betterment_fee(subject_number, fee_data){
      if(subject_number=="One"){
        this.betterment_fee = fee_data['betterment_exam_fee_one']
      }
      else if(subject_number=="Two or More"){
        this.betterment_fee = fee_data['betterment_exam_fee_more']
      }
    },

    save_students_details(end_point){
      this.isPageLoad = true
      return new Promise((resolve,reject)=>{
        axios({url: end_point,
            method: 'POST',
            headers: this.headers,
            data: {
              student_id: this.student_id,
              semester: this.semester,
              roll_number: this.roll_number,
              depertment_id: this.depertment_id,
              branch_id: this.branch_id,
              fees_submit_date: this.convertDate(this.present_date),
              // admission_date: new Date(),
              amount: Number(this.total_without_fine),
              late_fee: this.parseInput(this.late_fee),
            }
        })
        .then(response=>{
          if(this.isDc){
            this.fee_snackbar = false
          }
          else{
            this.fee_snackbar = true
          }
          this.isPageLoad = false
          resolve(response)
        })
        .catch(error=>{
          this.fee_snackbar = false
          reject(error)
        })
      })
    },
    get_depertment_short(depertment_id,depertment_data){
      // console.log('*********',this.depertment_short);

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
</style>
