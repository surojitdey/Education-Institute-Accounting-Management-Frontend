<template>
  <div class="overview pt-5">
    <div v-if="errorOccure" class="error">
      {{ errors }}
    </div>
    <v-tabs
      v-model="tab"
      background-color="white"
      class="elevation-2"
      show-arrows
    >
      <v-tabs-slider></v-tabs-slider>
      <v-tab href="#academicEnrollment">Academic Enrollment</v-tab>
      <v-tab href="#jistStudnet">JIST Studnets</v-tab>
      <v-tab-item value="academicEnrollment">
        <v-card flat elevation="7" class="studentBorder pa-0 ma-0 mb-5 overflow-y-auto">
          <v-toolbar flat color="white">
              <v-toolbar-title class="text-uppercase">Academic Enrolment</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn text icon :disabled="previousDisabled" @click="previousClick()">
                <v-icon>navigate_before</v-icon>
              </v-btn>
              <span>{{year}}</span>
              <v-btn text icon :disabled="nextDisabled" @click="nextClick()">
                <v-icon>navigate_next</v-icon>
              </v-btn>
          </v-toolbar>
          <v-divider></v-divider>
          <v-card-text v-for="item in depertment_branch_array" :key="item.depertment">
            <!-- <span class="subtitle-1 black--text">{{item.depertment}}</span> -->
            <v-subheader class="title font-weight-bold">{{item.depertment}}</v-subheader>
            <v-list dense>
              <v-list-item-group>
                <v-list-item v-for="(branch_name, i) in item.brances" :key="i">
                  <v-list-item-icon>
                    <v-icon>arrow_forward</v-icon>
                    <!-- <v-divider></v-divider> -->
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>
                      <v-row justify="center">
                        <v-col class="py-0 my-0">
                          <span class="subtitle-2">{{branch_name.name}}</span>
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-col class="py-0 my-0">
                          <span class="subtitle-2">{{branch_name.value}}</span>
                          <v-progress-circular v-if="isLoading" class="ml-5" indeterminate color="grey darken-3" size="15"></v-progress-circular>
                        </v-col>
                      </v-row>
                      <!-- <div class="flex-grow-1"></div> -->
                      <!-- <v-spacer></v-spacer> -->
                    </v-list-item-title>
                    <!-- <v-divider></v-divider> -->
                  </v-list-item-content>
                </v-list-item>
                <!-- <v-divider></v-divider> -->
              </v-list-item-group>
            </v-list>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item value="jistStudnet">
        <v-card flat elevation="7" class="studentBorder pa-0 ma-0 overflow-y-auto">
          <v-data-table
          :headers="headers"
          :items="admitted_students_data"
          :items-per-page="5"
          :search="search"
          class="elevation-1"
          calculate-widths
          :loading="!isSuccess"
          loading-text="Loading... Please wait"
          :footer-props="{
            showFirstLastPage: true,
            prevIcon: 'navigate_before',
            nextIcon: 'navigate_next'
          }"
          >
            <template v-slot:top>
              <v-toolbar flat color="white">
                  <v-toolbar-title>JIST STUDENTS</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-btn icon  @click="showList=true">
                    <v-icon>save_alt</v-icon>
                  </v-btn>
              </v-toolbar>
              <v-row class="mx-1 my-n5" justify="space-around">
                <v-col col="3" sm="3" md="3" class="mb-n4">
                  <v-select class="inputFields body-2" :items="dept_array" label="All Department" outlined v-model="depertment" :loading="isDeptLoading" :disabled="isDeptDisable"></v-select>
                </v-col>
                <v-col col="3" sm="3" md="3" class="mb-n4">
                  <v-select class="inputFields body-2" :items="branch_array" label="All Branch" outlined v-model="branch" :loading="isBranchLoading" :disabled="isBranchDisable"></v-select>
                </v-col>
                <v-col col="3" sm="3" md="3" class="mb-n4">
                  <v-select class="inputFields body-2" :items="semesterChoice" label="All Semester" outlined v-model="semester" :disabled="disableSemester"></v-select>
                </v-col>
                <v-col col="3" sm="3" md="3" class="mb-n4">
                  <v-select class="inputFields body-2" :items="casteChoice" label="All Caste" outlined v-model="caste"></v-select>
                </v-col>
              </v-row>
            </template>
          </v-data-table>
        </v-card>
      </v-tab-item>
    </v-tabs>
    <v-dialog v-model="showList" width="1000" timeout="3000">
      <StudentList 
        :admitted_student_data="admitted_students_data" 
        :depertment="depertment" 
        :branch="branch" 
        :semester="semester"
        @close-list="showList=false">
      </StudentList>
    </v-dialog>
  </div>
</template>

<script>
import axios from 'axios';
import StudentList from '@/components/studentList'
export default {
  components: {
    StudentList
  },
  data() {
    return {
      showList: false,
      tab: null,
      items: [
        'Academic Enrollment',
        'JIST Students'
      ],
      temp_flag: false,
      year: new Date().getFullYear(),
      year_array: [],
      nextDisabled: true,
      previousDisabled: false,
      rules: {
        required: value => !!value || 'Required',
        // passwordMatched: value => value === this.new_password || 'Confirm Password did not matched with Password field!',
        phoneNumber: val => (/^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{3})[-. ]?([0-9]{3})$/.test(val) || /^\(?([0-9]{4})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})$/.test(val)) || 'Phone Number Must be valid',
      },
      isSuccess: false,
      dialog: false,
      readonly: false,
      formTitle: '',
      isEdit: false,
      search: '',
      headers: [
          {
            text: 'Roll Number',
            align: 'left',
            sortable: false,
            value: 'roll_number',
          },
          {
            text: 'First Name',
            // align: 'left',
            // sortable: false,
            value: 'first_name',
          },
          { text: 'Last Name', value: 'last_name' },
          { text: 'Department', value: 'depertment' },
          { text: 'Branch', value: 'branch' },
          { text: 'Caste', value: 'caste' },
          // { text: 'Date Of Birth', value: 'date_of_birth' },
          { text: 'Semester', value: 'semester' },
          // { text: 'Actions', value: 'action', sortable: false },
        ],
      students: [],
      errorOccure: false,
      errors: [],
      token: '',
      editedIndex: -1,
      defaultItem: {
        roll_number: '',
        first_name: '',
        last_name: '',
        depertment: '',
        branch: '',
        semester: '',
      },
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
          disabled: true,
          href: '/surojit/JIST/dist/',
          link: false,
        },
        {
          text: 'Students',
          exact: true,
          disabled: true,
          href: '/surojit/JIST/dist/#/student',
          link: true,
        }
      ],

      depertment_branch_array: [
        {
          depertment: 'Bachelor of Science',
          brances: [
            {name:'Physics', value: ''},
            {name:'Chemistry', value: ''},
            {name:'Mathematics', value: ''},
          ]
        },
        {
          depertment: 'Bachelor of Science in Information Technology',
          brances: [
            {name:'Information Technology', value: ''},
          ]
        },
        {
          depertment: 'Bachelor of Engineering',
          brances: [
            {name:'Power Electronics & Instrumentation Engineering', value: ''},
            {name:'Electronics & Telecommunication Engineering', value: ''},
            {name:'Civil Engineering', value: ''},
            {name:'Mechanical Engineering', value: ''},
          ]
        },
        {
          depertment: 'Master of Science',
          brances: [
            {name:'Physics', value: ''},
            {name:'Chemistry', value: ''},
            {name:'Mathematics', value: ''},
          ]
        },
        {
          depertment: 'PhD',
          brances: [
            {name:'Physics', value: ''},
            {name:'Chemistry', value: ''},
            {name:'Mathematics', value: ''},
          ]
        },
      ],

      dept_array: [],
      dept_data: [],
      isDeptDisable: false,
      isDeptLoading: true,
      depertment_id: '',
      depertment: '',

      session_array: [],

      branch_array: [],
      branch_data: [],
      isBranchDisable: true,
      isBranchLoading: false,
      branch_id: '',
      branch: '',

      semester: '',

      disableSemester: false,
      date: new Date().toISOString().substr(0, 10),
      // dateFormatted: '',
      menu: false,
      token_headers: {
        'Authorization':'Bearer '+ this.$store.state.token,
      },

      admission_data: [],
      admitted_students_data: [],
      duplicate_admitted_students_data: [],
      temp_admitted_students_data: [],
      temp_admitted_students_data_branch: [],
      temp_admitted_students_data_semester: [],

      isLoading: false,

      caste: '',
    }
  },
  created () {
    return new Promise((resolve,reject)=>{
      axios
      .get(this.$store.state.student_end_point,{headers: this.token_headers})
      .then(response => {
        this.errorOccure = false
        this.students = response.data
        // console.log(this.students);

        axios({url:this.$store.state.admission_end_point, method: 'GET', headers: this.token_headers})
        .then(response => {
          // console.log('admission data',response.data);
          this.admission_data = response.data
          for(var i=0;i<this.admission_data.length;i++){
            for(var j=0;j<this.students.length;j++){
              if(this.admission_data[i]['student_id']==this.students[j]['id']){
                var student_info = {
                  'student_id': this.students[j]['id'],
                  'roll_number': this.students[j]['roll_number'],
                  'first_name': this.students[j]['first_name'],
                  'last_name': this.students[j]['last_name'],
                  'depertment': this.students[j]['depertment'],
                  'branch': this.students[j]['branch'],
                  'caste': this.students[j]['caste'],
                  'semester': this.admission_data[i]['semester'],
                  'admission_year': this.students[j]['admission_year']
                }
                // this.students[j]['semester'] = this.admission_data[i]['semester']
                this.admitted_students_data.push(student_info)
              }
            }
          }
          this.duplicate_admitted_students_data = this.admitted_students_data
          this.get_number_of_students(this.duplicate_admitted_students_data, this.year)
          resolve(response)
        })
        .catch(error=>{
          console.log(error);
          reject(error)
        })

        this.isSuccess = true
        resolve(response)
      })
      .catch((error) => {
        this.errors = error
        // this.$store.state.errorOccure = true
        this.errorOccure = true

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

      axios({url: this.$store.state.depertment_end_point, method: 'GET', headers: this.token_headers})
      .then(response => {
        for(var i = 0; i < response.data.length; i++){
          this.dept_array.push(response.data[i]['dept_name'])
        }
        this.isDeptLoading = false
        this.dept_data = response.data
        resolve(response)
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
        reject(error)
      })

      axios({url: this.$store.state.branch_end_point, method: 'GET', headers: this.token_headers})
      .then(response=>{
        this.branch_data = response.data
        // this.isPageLoading = false
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
    })
  },
  mounted() {
    document.title = "Overview"
    localStorage.setItem('last_URL','/')
    this.isLoading = true
    this.previousDisabled = this.isPreviousDisabled()
    // console.log('***',this.admitted_students_data);
    // Add session array values.
    var currentYear = new Date()
    var i = currentYear.getFullYear()
    var lastYearValue = i + 5
    for(i=i-2; i<lastYearValue; i++){
      this.session_array.push(i.toString() + '-' + (i+1).toString())
    }
  },

  computed: {
      formDate(date){
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${day}/${month}/${year}`
      }
  },

  watch: {
    showList () {
      if(!this.showList) {
        location.reload()
      }
    },
    search(){
      this.search = this.search.toUpperCase()
    },
    year(){
      this.previousDisabled = this.isPreviousDisabled()
      if(this.year < new Date().getFullYear()){
        this.nextDisabled = false
      }
      else{
        this.nextDisabled = true
      }
      this.get_number_of_students(this.duplicate_admitted_students_data, this.year)
    },
    dialog (val) {
        val || this.close()
    },

    date() {
      this.editedItem.date_of_birth = this.formatDate(this.date)
    },

    depertment(){
      if(this.depertment=="PhD"){
        this.disableSemester = true
      }
      else {
        this.disableSemester = false
      }
      if(this.admitted_students_data.length!=this.admission_data){
        this.admitted_students_data = []
        for(var i=0; i<this.admission_data.length; i++){
          for(var j=0; j<this.students.length; j++){
            if(this.admission_data[i]['student_id'] == this.students[j]['id']){
              var student_info = {
                'student_id': this.students[j]['id'],
                'roll_number': this.students[j]['roll_number'],
                'first_name': this.students[j]['first_name'],
                'last_name': this.students[j]['last_name'],
                'depertment': this.students[j]['depertment'],
                'branch': this.students[j]['branch'],
                'caste': this.students[j]['caste'],
                'semester': this.admission_data[i]['semester'],
                'admission_year': this.students[j]['admission_year']
              }
              this.admitted_students_data.push(student_info)
            }
          }
        }
      }
      this.get_depertment_id(this.depertment, this.admitted_students_data)
    },

    branch(){
      if(this.admitted_students_data.length < this.temp_admitted_students_data.length){
        this.admitted_students_data = this.temp_admitted_students_data
      }
      this.get_branch_wise_students(this.admitted_students_data, this.branch)
    },

    semester(){
      if(!(this.depertment) && this.admitted_students_data.length!=this.admission_data){
        this.admitted_students_data = []
        for(var i=0; i<this.admission_data.length; i++){
          for(var j=0; j<this.students.length; j++){
            if(this.admission_data[i]['student_id'] == this.students[j]['id']){
              var student_info = {
                'student_id': this.students[j]['id'],
                'roll_number': this.students[j]['roll_number'],
                'first_name': this.students[j]['first_name'],
                'last_name': this.students[j]['last_name'],
                'depertment': this.students[j]['depertment'],
                'branch': this.students[j]['branch'],
                'caste': this.students[j]['caste'],
                'semester': this.admission_data[i]['semester'],
                'admission_year': this.students[j]['admission_year']
              }
              this.admitted_students_data.push(student_info)
            }
          }
        }
      }
      else if(this.depertment) {
        if(!this.branch && this.admitted_students_data.length < this.temp_admitted_students_data.length){
          this.admitted_students_data = this.temp_admitted_students_data
        }
        else if(this.branch && this.admitted_students_data.length < this.temp_admitted_students_data_branch.length) {
          this.admitted_students_data = this.temp_admitted_students_data_branch
        }
      }
      this.get_semester_wise_students(this.admitted_students_data, this.semester)
    },

    caste(){
      // console.log('Caste change::',this.admitted_students_data[1]['caste']);
      if(!(this.depertment) && !(this.semester) && this.admitted_students_data.length!=this.admission_data){
        this.admitted_students_data = []
        for(var i=0; i<this.admission_data.length; i++){
          for(var j=0; j<this.students.length; j++){
            if(this.admission_data[i]['student_id'] == this.students[j]['id']){
              var student_info = {
                'student_id': this.students[j]['id'],
                'roll_number': this.students[j]['roll_number'],
                'first_name': this.students[j]['first_name'],
                'last_name': this.students[j]['last_name'],
                'depertment': this.students[j]['depertment'],
                'branch': this.students[j]['branch'],
                'caste': this.students[j]['caste'],
                'semester': this.admission_data[i]['semester'],
                'admission_year': this.students[j]['admission_year']
              }
              this.admitted_students_data.push(student_info)
            }
          }
        }
      }
      else if(this.depertment && this.semester) {
        // if(!this.branch && this.admitted_students_data.length < this.temp_admitted_students_data.length && this.admitted_students_data.length < this.temp_admitted_students_data_semester.length){
        if(!this.branch){
          if (this.temp_admitted_students_data_semester.length < this.temp_admitted_students_data.length) {
            this.admitted_students_data = this.temp_admitted_students_data
          }
          else {
            this.admitted_students_data = this.temp_admitted_students_data_semester
          }
        }
        else if(this.branch && this.admitted_students_data.length < this.temp_admitted_students_data_branch.length) {
          this.admitted_students_data = this.temp_admitted_students_data_branch
        }
      }
      //**********************************************************
      // let data = this.admitted_students_data
      // this.admitted_students_data = []
      // for(let i=0; i<data.length; i++){
      //   if(data[i]['caste']==this.caste){
      //     var student_info = {
      //       'student_id': data[i]['id'],
      //       'roll_number': data[i]['roll_number'],
      //       'first_name': data[i]['first_name'],
      //       'last_name': data[i]['last_name'],
      //       'depertment': data[i]['depertment'],
      //       'branch': data[i]['branch'],
      //       'caste': data[i]['caste'],
      //       'semester': data[i]['semester'],
      //       'admission_year': data[i]['admission_year']
      //     }
      //     this.admitted_students_data.push(student_info)
      //   }
      // }
      this.get_caste_wise_students(this.admitted_students_data, this.caste)

    }
  },

  methods: {
    previousClick(){
      this.year = this.year - 1
    },
    nextClick(){
      this.year = this.year + 1
    },
    isPreviousDisabled(){
      var flag = false
      // console.log('Studnets::',this.students);
      for(var i=0; i < this.students.length; i++){
        if(this.students[i]['admission_year'] > this.year){
          flag = true
          break
        }
        else{
          flag = false
        }
      }
      return flag
    },
    formatDate(date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      if(month && day){
        return `${day}/${month}/${year}`
      }
      else {
        return year
      }
    },
    convertDate (date) {
      if (!date) return null

      const [year, month, day] = date.split('/')
      return `${day.padStart(2, '0')}-${month.padStart(2, '0')}-${year}`
    },
    parseDate (date) {
      if (!date) return null

      const [year, month, day] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
    counting_students_brach_wise(data, depertment, branch, year) {
      let std_count = data.filter((obj) => obj['admission_year'] == year && obj['depertment'] == depertment && obj['branch'] == branch)
      let total_std = std_count.map((std) => std['student_id'])
      this.isLoading = false
      return total_std.filter((x,i,a) => a.indexOf(x)==i).length
    },
    get_number_of_students(data,year){
      this.depertment_branch_array.forEach((d, di) => {
        this.depertment_branch_array[di]['brances'].forEach((b, bi) => {
          this.depertment_branch_array[di]['brances'][bi]['value'] = this.counting_students_brach_wise(data, this.depertment_branch_array[di]['depertment'], this.depertment_branch_array[di]['brances'][bi]['name'], year)
        })
      })
    },
    get_depertment_id(depertment, data){
      this.isBranchDisable = true
      this.isBranchLoading = true
      if(depertment == 'PhD'){
        this.disableSemester = true
      }
      axios({url: this.$store.state.depertment_end_point, method: 'GET', headers: this.token_headers})
      .then(response => {
          for(var i = 0; i < response.data.length; i++){
            if(response.data[i]['dept_name'] == depertment){
              this.depertment_id = response.data[i]['id']
            }
          }
      })

      axios({url: this.$store.state.branch_end_point, method: 'GET', headers: this.token_headers})
      .then(response => {
          this.branch_array = []
          for(var i = 0; i < response.data.length; i++){
            for(var j=0; j < response.data[i]['depertment'].length; j++){
              if(response.data[i]['depertment'][j] == this.depertment_id){
                this.branch_array.push(response.data[i]['branch_name'])
              }
            }
          }
          this.isBranchLoading = false
          this.isBranchDisable = false
      })
      this.get_depertment_wise_students(depertment, data)
    },

    get_depertment_wise_students(depertment, data){
      this.admitted_students_data = []
      for(var i=0; i<data.length; i++){
        if(data[i]['depertment']==depertment){
          this.admitted_students_data.push(data[i])
        }
      }
      this.temp_admitted_students_data = this.admitted_students_data
    },

    get_branch_wise_students(data, branch){
      this.admitted_students_data = []
      for(var i=0; i<data.length; i++){
        if(data[i]['branch']==branch){
          this.admitted_students_data.push(data[i])
        }
      }
      this.temp_admitted_students_data_branch = this.admitted_students_data
    },

    get_semester_wise_students(data, semester){
      this.admitted_students_data = []
      for(var i=0; i<data.length; i++){
        if(data[i]['semester']==semester){
          this.admitted_students_data.push(data[i])
        }
      }
      this.temp_admitted_students_data_semester = this.admitted_students_data
    },

    get_caste_wise_students(data, caste){
      this.admitted_students_data = []
      for(var i=0; i<data.length; i++){
        if(data[i]['caste']==caste){
          this.admitted_students_data.push(data[i])
        }
      }
    },

    get_branch_id(branch){
      axios({url: this.$store.state.branch_end_point, method: 'GET', headers: this.token_headers})
      .then(response => {
          for(var i = 0; i < response.data.length; i++){
            if(response.data[i]['branch_name'] == branch){
              this.branch_id = response.data[i]['id']
            }
          }
      })
    }
  }
}
</script>

<style lang="css" scoped>
  .std.cse {
    border-left: 4px solid #3cd1c2;
  }
  .std.me {
    border-left: 4px solid orange;
  }
  .std.ete {
    border-left: 4px solid tomato;
  }
  .v-breadcrumbs__item:hover {
    text-decoration: underline;
  }
  .inputFields.v-input__control.v-input_slot.v-select__slot.v-select__selections input{
    padding-top: 5px;
    padding-bottom: 10px;
  }
</style>
