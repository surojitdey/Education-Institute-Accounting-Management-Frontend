<template>
  <div class="overview pt-5">

    <v-card elevation="7" class="studentFormBorder">
      <!-- <span>depertment_id:{{depertment_id}}</span><br>
      <span>branch_id:{{branch_id}}</span><br>
      <span>branch_data:{{branch_data}}</span> -->
      <!-- <span>branch_accronym:{{branch_short}}</span><br> -->
      <!-- <span>student_count:{{student_count}}</span><br>
      <span>roll_number:{{roll_number}}</span> -->

      <v-row>
        <BreadCrumb :values="breadItems"></BreadCrumb>
        <v-spacer></v-spacer>
        <v-switch label="Lateral Admission" class="mx-5 dark--text" v-model="isLateral"></v-switch>
        <v-switch label="Spot Admission" class="mx-5 dark--text" v-model="spot_admission_switch"></v-switch>
      </v-row>
      <v-card-title class="mt-0 pt-0">
        <span class="heading">Add New Student</span>
      </v-card-title>
      <v-card-text class="pb-0 pt-0 mt-0">
        <!-- <v-container> -->
          <v-row justify="space-between">
            <!-- <v-form id="student_form" @submit.prevent="postStudentDetails">
            </v-form> -->
            <v-col cols="12" sm="6" md="6" class="mt-0 pt-0 my-0 py-0">
              <v-select :items="session_array" class="mt-0 pt-0 my-0 py-0" label="Session" outlined v-model="year_session" :rules= "[rules.required]" required></v-select>
              <v-text-field label="First Name" outlined height="35px" dense v-model="first_name" class="mt-n3 pt-0 my-0 py-0" :rules= "[rules.required, rules.name]" required></v-text-field>
              <v-text-field label="Last Name" outlined dense v-model="last_name" class="mt-n3 pt-0 my-0 py-0" :rules= "[rules.required, rules.name]" required></v-text-field>
              <v-select :items="dept_array" class="mt-n3 pt-0 my-0 py-0" label="Department" outlined v-model="depertment" :readonly="depertment_readonly" :loading="isDeptLoading" :disabled="isDeptDisable" :rules= "[rules.required]" required></v-select>
              <v-select :items="branch_array" class="mt-n3 pt-0 my-0 py-0" label="Branch" outlined v-model="branch" @change="get_branch_id(branch)" :loading="isBranchLoading" :disabled="isBranchDisable" :rules= "[rules.required]" required></v-select>
              <v-text-field label="Roll Number" outlined dense v-model="roll_number" class="mt-n3 pt-0 my-0 py-0" :rules= "[rules.required]" :error="roll_number_error" :error-messages="error_message" :loading="isRollLoading" required></v-text-field>
              <v-select :items="casteChoice" class="mt-n3 pt-0 my-0 py-0" label="Caste" outlined v-model="caste" :rules= "[rules.required]" required></v-select>
              <v-menu
                v-model="menu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
                >
                <template v-slot:activator="{ on }">
                  <v-text-field
                  class="mt-n3 pt-0 my-0 py-0"
                  v-model="date_of_birth"
                  label="Date Of Birth"
                  append-icon="event"
                  v-on="on"
                  outlined
                  :rules= "[rules.required, rules.futureDate]"
                  required
                  ></v-text-field>
                </template>
                <v-date-picker v-model="date" @input="menu = false"></v-date-picker>
              </v-menu>
              <v-select class="mt-n3 pt-0 my-0 py-0" :items="semesterChoice" label="Semester" outlined v-model="semester" :disabled="disableSemester" :readonly="readonly" :rules= "[rules.required]" required></v-select>
            </v-col>
            <v-divider vertical></v-divider>
            <v-col cols="12" sm="6" md="5" class="mt-0 pt-0 my-0 py-0" v-show="!show_parents_info">
              <v-text-field class="mt-0 pt-0 my-0 py-0" label="Father Name" outlined dense v-model="father_name" :rules= "[rules.name]"></v-text-field>
              <v-text-field class="mt-n3 pt-0 my-0 py-0" label="Mother Name" outlined dense v-model="mother_name" :rules= "[rules.name]"></v-text-field>
              <v-text-field class="mt-n3 pt-0 my-0 py-0" label="Parent's Phone Number" outlined dense v-model="parents_phone_number" :rules= "[rules.phoneNumber]"></v-text-field>
              <v-textarea class="mt-n3 pt-0 my-0 py-0" label="Address" outlined auto-grow v-model="address"></v-textarea>
            </v-col>
          </v-row>
        <!-- </v-container> -->
      </v-card-text>
      <v-card-actions v-if="!spot_admission_switch" justify="center" class="ml-2 mt-n3 pt-0">
        <div class="flex-grow-0"></div>
        <v-btn type="submit" color="success darken-1" width="115" @click="postStudentDetails">Save</v-btn>

        <v-btn color="error darken-1" width="115" @click="reset">Reset</v-btn>
      </v-card-actions>
      <v-card-actions v-else justify="center" class="ml-2 mt-n3 pt-0">
        <div class="flex-grow-0"></div>
        <v-btn type="submit" color="success darken-1" width="115" @click="postSpotAdmissionStudentDetails">Save</v-btn>

        <v-btn color="error darken-1" width="115" @click="reset">Reset</v-btn>
      </v-card-actions>
    </v-card>

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

    <v-dialog v-model="spot_admission_snackbar" width="400">
      <v-card>
        <v-card-title>Do you want to open spot admission?</v-card-title>
        <v-card-actions>
          <v-btn color="primary" text @click="spot_yes">Yes</v-btn>
          <!-- <v-btn color="primary" text @click="spot_admission_switch==true">Yes</v-btn> -->
          <v-spacer></v-spacer>
          <v-btn color="grey" text @click="spot_cancel">Cancel</v-btn>
          <!-- <v-btn color="grey" text @click="spot_admission_switch==false">Cancel</v-btn> -->
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- <v-divider></v-divider> -->
  </div>
</template>

<script>
import BreadCrumb from '@/components/breadCrumb'
import axios from 'axios'
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  components: {
    BreadCrumb,
  },
  data() {
    return {
      valid: true,
      year_session: '',
      session_array: [],
      first_name: '',
      last_name: '',
      depertment: '',
      depertment_id: '',
      branch: '',
      branch_id: '',
      caste: '',
      date_of_birth: '',
      present_date: '',
      semester: 'NULL',
      father_name: '',
      mother_name: '',
      address: '',
      parents_phone_number: '',
      entry_type: 'Regular',
      errors: [],
      errorOccure: false,
      date: new Date().toISOString().substr(0, 10),
      rules: {
        required: value => !!value || 'Required',
        // semester_required: value => (!!value || (this.depertment=='PhD')) || 'Required',
        name: value => (/^[a-zA-Z ]{1,50}$/.test(value)) || 'This field must be an alphabetical string.',
        futureDate: () => (new Date(this.date).getTime() < new Date(this.present_date).getTime()) || 'Date of birth should not be a future date.',
        // passwordMatched: value => value === this.new_password || 'Confirm Password did not matched with Password field!',
        phoneNumber: val => (/^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{3})[-. ]?([0-9]{3})$/.test(val) || /^\(?([0-9]{4})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})$/.test(val)) || 'Phone Number Must be valid',
      },
      // phoneNumberRules: [
      //   val => (/^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{3})[-. ]?([0-9]{3})$/.test(val) || /^\(?([0-9]{4})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})$/.test(val)) || 'Phone Number Must be valid',
      // ],
      menu: false,
      modal: false,
      dept_array: [],
      dept: [
        'Bachelor of Science',
        'Bachelor of Science in Information Technology',
        'Master of Science',
        'Bachelor of Engineering',
        'PhD'
      ],
      branch_array: [],
      branchChoice: [
        'Physics',
        'Chemistry',
        'Mathematics',
        'B.Sc.(IT)',
        'Power Electronics & Instrumentation Engineering',
        'Electronics & Telecommunication Engineering',
        'Civil Engineering',
        'Mechanical Engineering'
      ],
      casteChoice: [
        'General',
        'OBC',
        'MOBC',
        'SC',
        'ST',
        'ST(H)'
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
      breadItems: [
        {
          text: 'Overview',
          exact: true,
          disabled: false,
          href: '/surojit/JIST/dist/',
          link: true,
        },
        {
          text: 'Students',
          exact: true,
          disabled: false,
          href: '/surojit/JIST/dist/#/student',
          link: true,
        },
        {
          text: 'Add Student',
          exact: true,
          disabled: true,
          href: '/surojit/JIST/dist/#/studentform',
          link: true,
        },
      ],
      // dept_data: '',
      branch_data: [],
      roll_number: '',
      branch_short: '',
      student_array: [],
      student_count: '',
      isDeptLoading: false,
      isDeptDisable: false,
      isBranchLoading: false,
      isBranchDisable: true,
      dept_name_roll_number: '',
      snackbar: false, // used to show the success or error msg.
      msg: '', // Success or Error msg after form submission
      disableSemester: false, // show the semester field on the form.

      spot_admission_switch: false, // Switch to spot admission section.
      spot_admission_snackbar: false,
      readonly: false,
      show_parents_info: false,
      headers: {
        'Authorization':'Bearer '+ this.$store.state.token,
      },

      roll_number_error: false,
      error_message: '',
      isRollLoading: false,
      isLateral: false,
      lateral_roll_number: '',
      depertment_readonly: false,
      spot_admission_flag: false,
    }
  },

  computed: {
    ...mapGetters([
      'get_spot_roll_number',
      'get_branch'
      ]),
    computedDateFormatted() {
      return this.formatDate(this.date)
    },

    current_year() {
      var date = new Date()
      return date.getFullYear()
    },
  },

  watch: {
    date() {
      this.date_of_birth = this.formatDate(this.date)
    },

    spot_admission_snackbar(){
      if(!this.spot_admission_snackbar && (this.semester=='NULL' || this.semester=='Third')){
        this.spot_admission_switch = false
      }
    },

    spot_admission_switch(){
      if(this.spot_admission_switch){
        this.spot_admission_snackbar = true
        // this.show_parents_info = true
        this.isLateral = false
      }
      else{
        // this.spot_admission_switch = false
        this.spot_admission_snackbar = false
        this.show_parents_info = false
        this.readonly = false
        this.depertment_readonly = false
        if(this.semester && !this.isLateral){
          // this.semester = ''
          this.readonly = false
        }
        else{
          this.readonly = true
        }
      }
    },

    depertment(){
      this.get_depertment_id(this.depertment)
      this.branch = ''
      this.branch_short = ''
      if(this.depertment == "Bachelor of Science" || this.depertment == "Bachelor of Science in Information Technology" || this.depertment == "Bachelor of Engineering"){
        this.dept_name_roll_number = 'B'
      }
      else if(this.depertment == "Master of Science"){
        this.dept_name_roll_number = 'M'
      }
      else if(this.depertment == "PhD"){
        this.dept_name_roll_number = 'P'
        this.semester = 'NULL'
        // this.rules = ''
        if(this.spot_admission_switch){
          this.semester = 'NULL'
        }
      }

      var date = new Date()
      console.log('year session', this.year_session.split('-')[0].substr(2, 2))
      this.roll_number = `${this.dept_name_roll_number}-${this.branch_short}/${this.year_session.split('-')[0].substr(2, 2)}/${this.lateral_roll_number}`
    },

    roll_number(){
      this.isRollLoading = true
      axios({url: this.$store.state.student_end_point, method: 'GET', headers: this.headers})
      .then(response => {
        for(var i=0; i < response.data.length; i++){
          if(response.data[i]['roll_number'] == this.roll_number){
            this.roll_number_error = true
            break
          }
          else{
            this.roll_number_error = false
          }
        }
        this.isRollLoading = false
      })
    },

    roll_number_error(){
      if(this.roll_number_error){
        this.error_message = 'This roll number is already taken.'
      }
      else{
        this.error_message = ''
      }
    },

    isLateral(){
      if(this.isLateral){
        this.lateral_roll_number = '-L'
        this.depertment = 'Bachelor of Engineering'
        this.semester = 'Third'
        this.entry_type = 'Lateral'
        this.readonly = true
        this.depertment_readonly = true
        this.spot_admission_switch = false
      }
      else{
        this.lateral_roll_number = ''
        // this.semester = ''
        // this.depertment = ''
        this.depertment_readonly = false
        this.readonly = false
        this.entry_type = 'Regular'
      }
    },

    lateral_roll_number(){
      var date = new Date()
      this.roll_number = `${this.dept_name_roll_number}-${this.branch_short}/${this.year_session.split('-')[0].substr(2, 2)}/${this.lateral_roll_number}`
    },

    snackbar(){
      if(!this.snackbar){
        location.reload()
      }
    }
  },

  methods: {
    ...mapMutations([
      'set_spot_roll_number'
    ]),
    ...mapActions([
      'fetch_branch',
      'fetch_depertment_id'
    ]),
    spot_yes(){
      this.spot_admission_switch = true
      this.spot_admission_snackbar = false
      this.depertment = 'Bachelor of Engineering'
      this.semester = 'First'
      this.isLateral = false
      this.depertment_readonly = true
      this.readonly = true
      this.show_parents_info = true
    },
    spot_cancel(){
      this.spot_admission_switch = false
      this.spot_admission_snackbar = false
      this.show_parents_info = false
      // this.semester = ''
      this.depertment_readonly = false
      this.readonly = false
    },
    reset() {
      this.first_name = ''
      this.last_name = ''
      this.depertment = ''
      this.branch = ''
      this.caste = ''
      this.date_of_birth = ''
      this.semester = 'NULL'
      this.session = ''
      this.father_name = ''
      this.mother_name = ''
      this.parents_phone_number = ''
      this.address = ''
      this.roll_number = ''
      // this.entry_type = ''
    },

    postStudentDetails() {
      if(this.roll_number_error){
        this.roll_number = ''
      }
      else {
        axios
        .post(this.$store.state.student_end_point, {
          first_name: this.first_name,
          last_name: this.last_name,
          depertment_id: this.depertment_id,
          branch_id: this.branch_id,
          caste: this.caste,
          date_of_birth: this.date,
          semester: this.semester,
          roll_number: this.roll_number,
          session: this.year_session,
          father_name: this.father_name,
          mother_name: this.mother_name,
          parents_phone_number: this.parents_phone_number,
          address: this.address,
          entry_type: this.entry_type,
        },
        {
          headers: this.headers
        })
        .then(() => {
          this.errorOccure = false
          this.snackbar = true
          this.msg = 'Successfully Add New Student.'
          // location.reload()
          this.reset()
          // this.$router.push({name: "admission"})
          // this.$router.push('/student')
        })
        .catch(error => {
          this.errorOccure = true
          this.snackbar = true
          this.msg = 'There is some field missing or wrongly filled.'
          this.errors = error
        })
      }
    },

    postSpotAdmissionStudentDetails() {
      axios
        .post(this.$store.state.student_end_point, {
          first_name: this.first_name,
          last_name: this.last_name,
          depertment_id: this.depertment_id,
          branch_id: this.branch_id,
          caste: this.caste,
          date_of_birth: this.date,
          semester: this.semester,
          roll_number: this.roll_number,
          session: this.year_session,
          entry_type: this.entry_type,
        },
        {
          headers: this.headers
        })
        .then((response) => {
          this.errorOccure = false
          this.snackbar = true
          this.msg = 'Successfully Add New Student.'
          this.reset()
          this.set_spot_roll_number(response.data['roll_number'])
          console.log('spot_roll_number', this.get_spot_roll_number)
          // this.$store.state.spot_roll_number = response.data['roll_number']
          this.$router.push({name: "admission"})
          // this.$router.push('/student')
        })
        .catch(error => {
          this.errorOccure = true
          this.snackbar = true
          this.msg = 'There is some field missing or wrongly filled.'
          this.errors = error
        })
    },

    get_depertment_id(depertment){
      this.isBranchDisable = true
      this.isBranchLoading = true
      if(depertment == 'PhD'){
        this.disableSemester = true
      }
      else{
        this.disableSemester = false
      }
      this.fetch_depertment_id(depertment)
      .then(response => {
        this.depertment_id = response.data[0]['id']
        this.fetch_branch(this.depertment_id).then((response) => {
          this.branch_array = []
          for(var i = 0; i < response.data.length; i++){
            this.branch_array.push(response.data[i]['branch_name'])
          }
          this.isBranchLoading = false
          this.isBranchDisable = false
        })
      })
    },

    get_branch_id(branch){
      axios({url: this.$store.state.branch_end_point, method: 'GET', headers: this.headers})
      .then(response => {
          for(var i = 0; i < response.data.length; i++){
            if(response.data[i]['branch_name'] == branch){
              this.branch_id = response.data[i]['id']
              this.branch_short = response.data[i]['branch_accronym']
            }
          }

          this.roll_number = `${this.dept_name_roll_number}-${this.branch_short}/${this.year_session.split('-')[0].substr(2, 2)}/${this.lateral_roll_number}`
      })
    },

    generate_roll_number(count) {
      if(this.depertment == "Bachelor of Science" || this.depertment == "Bachelor of Science in Information Technology" || this.depertment == "Bachelor of Engineering"){
        this.dept_name_roll_number = 'B'
      }
      else if(this.depertment == "Master of Science"){
        this.dept_name_roll_number = 'M'
      }
      else if(this.depertment == "PhD"){
        this.dept_name_roll_number = 'P'
      }
      var date = new Date()
      count = count + 1

      return `${this.dept_name_roll_number}-${this.branch_short}/${this.year_session.split('-')[0].substr(2, 2)}/${String(count).padStart(3,0)}`
    },

    zeroPad(num, places) {
      return String(num).padStart(places, '0')
    },

    formatDate(date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },

    parseDate (date) {
      if (!date) return null

      const [year, month, day] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    }
  },

  mounted() {
    document.title = "New Student Form"
    localStorage.setItem('last_URL','/studentform')
    this.present_date = new Date()

    axios({url: this.$store.state.depertment_end_point, method: 'GET', headers: this.headers})
    .then(response => {
        for(var i = 0; i < response.data.length; i++){
          this.dept_array.push(response.data[i]['dept_name'])
        }
    })
    .catch(error=>{
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
    })

    // Add session array values.
    var currentYear = new Date()
    var i = currentYear.getFullYear()
    var lastYearValue = i + 5
    for(i=i-2; i<lastYearValue; i++){
      this.session_array.push(i.toString() + '-' + (i+1).toString())
    }
  }
}
</script>

<style lang="css" scoped>
  .v-card.studentFormBorder {
    border-top: 4px solid #1976d2;
  }
</style>
