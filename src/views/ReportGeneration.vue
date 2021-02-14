<template>
  <div class="report_generate">
    <v-content class="mt-n12">
      <v-container fluid class="fill-height">
        <v-row justify="start" align="center">
          <v-col col="12" sm="8" md="6">
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat>
                <v-toolbar-title class="text-center">Report Generation</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-select :items="reportChoice" label="Report Type" outlined v-model="report_type" @change="get_report_data(report_type)"></v-select>
                <v-select :items="admissionFeeList" label="Admission Fee List" v-show="report_type=='Admission'" outlined v-model="admission_fee_type"></v-select>
                <v-select :items="year_array" label="Transfer Year" v-show="report_type=='Transfer'" outlined v-model="transfer_year"></v-select>
                <v-select :items="year_array_form_and_prospectus" label="Choose a Year" v-show="report_type=='Form and Prospectus'" outlined v-model="form_and_prospectus_year"></v-select>
                <v-select :items="dept_array" label="Department" v-show="report_type!='Transfer'" outlined v-model="depertment" @change="get_depertment_id(depertment,dept_data,branch_data)" :loading="isDeptLoading" :disabled="isDeptDisable"></v-select>
                <v-select :items="branch_array" label="Branch" v-show="report_type!='Transfer'" outlined v-model="branch" @change="update_branch(branch)" :loading="isBranchLoading" :disabled="isBranchDisable"></v-select>
                <v-select class="mt-n3 pt-0 my-0 py-0" :items="semesterChoice" v-show="report_type!='Transfer' && report_type!='Form and Prospectus'" label="Semester" outlined v-model="semester" :disabled="disableSemester"></v-select>
              </v-card-text>
              <v-card-actions class="mt-n8">
                <v-row justify="center">
                  <v-btn color="primary darken-1" @click="report_generate(depertment,branch,semester,report_data)">Generate Report</v-btn>
                </v-row>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>

    <v-dialog v-model="snackbar" width="400" timeout="3000">
      <v-card>
        <v-card-title>
          <span class="subtitle-1">Are you sure you want to generate report?</span>
        </v-card-title>
        <v-card-actions v-if="report_type=='Admission'">
          <export-excel
              class   = "btn btn-default"
              :data   = "json_data"
              :fields = "admission_fee_json_fields"
              worksheet = "Admission Worksheet"
              :title= "file_title"
              type = "xls"
              :name    = "file_name"
              :before-generate = "startDownloading"
              :before-finish = "finishDownloading">
              <v-btn color="success" text @click="snackbar=false">Yes</v-btn>
          </export-excel>
          <!-- <v-spacer></v-spacer> -->
          <v-btn color="error" text @click="snackbar=false">No</v-btn>
        </v-card-actions>
        <v-card-actions v-else-if="report_type=='Transfer'">
          <export-excel
              class   = "btn btn-default"
              :data   = "json_data"
              :fields = "transfer_students_json_fields"
              worksheet = "Transfer Worksheet"
              :title= "file_title"
              type = "xls"
              :name    = "file_name"
              :before-generate = "startDownloading"
              :before-finish = "finishDownloading">
              <v-btn color="success" text @click="snackbar=false">Yes</v-btn>
          </export-excel>
          <!-- <v-spacer></v-spacer> -->
          <v-btn color="error" text @click="snackbar=false">No</v-btn>
        </v-card-actions>
        <v-card-actions v-else-if="report_type=='Form and Prospectus'">
          <export-excel
              class   = "btn btn-default"
              :data   = "json_data"
              :fields = "form_and_prospectus_json_fields"
              worksheet = "Transfer Worksheet"
              :title= "file_title"
              type = "xls"
              :name    = "file_name"
              :before-generate = "startDownloading"
              :before-finish = "finishDownloading">
              <v-btn color="success" text @click="snackbar=false">Yes</v-btn>
          </export-excel>
          <!-- <v-spacer></v-spacer> -->
          <v-btn color="error" text @click="snackbar=false">No</v-btn>
        </v-card-actions>
        <v-card-actions v-else>
          <export-excel
              class   = "btn btn-default"
              :data   = "json_data"
              :fields = "json_fields"
              worksheet = "Fee Worksheet"
              :title= "file_title"
              type = "xls"
              :name    = "file_name"
              :before-generate = "startDownloading"
              :before-finish = "finishDownloading">
              <v-btn color="success" text @click="snackbar=false">Yes</v-btn>
          </export-excel>
          <!-- <v-spacer></v-spacer> -->
          <v-btn color="error" text @click="snackbar=false">No</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="empty_snackbar" width="400" timeout="3000">
      <v-card>
        <v-card-title>Status</v-card-title>
        <v-card-text>
          <v-alert type="error">
            {{msg}}
          </v-alert>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="empty_snackbar=false">Close</v-btn>
          </v-card-actions>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-overlay :value="isPageLoading">
      <v-progress-circular indeterminate color="grey darken-3" size="30"></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data(){
    return{
      dept_array: ['All',],
      dept_data: [],
      depertment: '',
      depertment_id: '',
      branch_array: [],
      branch_data: [],
      branch: '',
      isDeptLoading: false,
      isDeptDisable: true,
      isBranchLoading: false,
      isBranchDisable: true,
      disableSemester: true,
      semester: '',
      admission_data: [],
      examination_data: [],
      compartmental_data: [],
      betterment_data: [],
      report_data: [],
      semesterChoice: [
        'All',
        'First',
        'Second',
        'Third',
        'Fourth',
        'Fifth',
        'Sixth',
        'Seventh',
        'Eighth'
      ],
      reportChoice: [
        'Admission',
        'Examination',
        'Compartmental',
        'Betterment',
        'Transfer',
        'Form and Prospectus'
      ],
      report_type: '',
      admissionFeeList: [
        'Total Fee',
        'Govt. Dues',
        'Tuition Fee',
        'Identity Card Fee',
        'Examination Fee',
        'Student Union Fee',
        'Games and Sports Fee',
        'Magazine Fee',
        'Laboratory Fee',
        'University Registration Fee',
        'Enrollment Fee',
        'Electricity Fee',
        'Group Insurance Fee',
        'Scout and Guide Fee',
        'Internet Fee',
        'Welfare Fee',
        'College Development Fee',
        'Library Caution Fee',
        'Transport Fee',
        'ISTE Fee',
        'Training and Placement Fee',
        'College Festival Fee',
        'Medical Fee',
        'Late Fee',
      ],
      admission_fee_type: '',
      json_fields: {
        'Roll Number': 'roll_number',
        'Student Name': 'student',
        'Department': 'depertment',
        'Branch': 'branch',
        'Semester': 'semester',
        'Fees': 'amount',
        'Late Fee': 'late_fee'
      },
      admission_fee_json_fields: {
        'Roll Number': 'roll_number',
        'Student Name': 'student',
        'Department': 'depertment',
        'Branch': 'branch',
        'Semester': 'semester',
        'Fees': 'amount',
        // 'Late Fee': 'late_fee'
      },
      transfer_students_json_fields: {
        'First Name': 'first_name',
        'Last Name': 'last_name',
        'Roll Number': 'roll_number',
        'Date of Birth': 'date_of_birth',
        'Department': 'depertment',
        'Branch': 'branch',
        'Caste': 'caste',
        'Semester': 'semester',
        'Session': 'session',
        'Transfer From': 'transfer_from',
        'Transfer To': 'transfered_institute_name',
        'Transfer Date': 'transfer_date',
      },
      form_and_prospectus_json_fields: {
        'Student Name': 'student_name',
        'Depertment': 'depertment',
        'Branch': 'branch',
        'Prospectus Fee': 'prospectus_fee',
        'Purchase Date': 'purchase_date',
      },
      json_data: [],
      file_name: '',
      file_title: '',

      snackbar: false,
      isPageLoading: false,
      headers: {
        'Authorization':'Bearer '+ this.$store.state.token,
      },

      empty_snackbar: false, // used to show the success or error msg.
      msg: '', // Success or Error msg after form submission

      transferDate: [],
      year_array: ['All',],
      year_array_form_and_prospectus: ['All',],
      transfer_year: '',
      form_and_prospectus_year: '',
    }
  },
  mounted(){
    document.title = "Report Generation"
    localStorage.setItem('last_URL','/report')
    this.isPageLoading = true
    this.isDeptLoading = true
    return new Promise((resolve,reject)=>{
      axios({url: this.$store.state.depertment_end_point, method: 'GET', headers: this.headers})
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

      axios({url: this.$store.state.branch_end_point, method: 'GET', headers: this.headers})
      .then(response=>{
        this.branch_data = response.data
        this.isPageLoading = false
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
    })
  },

  watch: {
    snackbar(){
      if(!this.snackbar && this.json_data.length==0){
        this.empty_snackbar = true
        this.msg = 'Student list is Empty!'
      }
      else{
        this.empty_snackbar = false
      }
    },

    empty_snackbar(){
      if(!this.empty_snackbar){
        this.isPageLoading = false
      }
    },

    report_type(){
      if(this.report_type){
        this.isDeptDisable = false
        this.disableSemester = false
      }
      else{
        this.isDeptDisable = true
        this.disableSemester = true
      }
    },

    admission_fee_type(){
      if(this.admission_fee_type=='Total Fee'){
        this.admission_fee_json_fields.Fees = 'amount'
      }
      else if (this.admission_fee_type=='Govt. Dues') {
        this.admission_fee_json_fields.Fees = 'govt_dues'
      }
      else if (this.admission_fee_type=='Tuition Fee') {
        this.admission_fee_json_fields.Fees = 'tuition_fee'
      }
      else if (this.admission_fee_type=='Identity Card Fee') {
        this.admission_fee_json_fields.Fees = 'identity_fee'
      }
      else if (this.admission_fee_type=='Examination Fee') {
        this.admission_fee_json_fields.Fees = 'examination_fee'
      }
      else if (this.admission_fee_type=='Student Union Fee') {
        this.admission_fee_json_fields.Fees = 'student_union_fee'
      }
      else if (this.admission_fee_type=='Games and Sports Fee') {
        this.admission_fee_json_fields.Fees = 'game_sports_fee'
      }
      else if (this.admission_fee_type=='Magazine Fee') {
        this.admission_fee_json_fields.Fees = 'magazine_fee'
      }
      else if (this.admission_fee_type=='Laboratory Fee') {
        this.admission_fee_json_fields.Fees = 'laboratory_fee'
      }
      else if (this.admission_fee_type=='University Registration Fee') {
        this.admission_fee_json_fields.Fees = 'university_registration_fee'
      }
      else if (this.admission_fee_type=='Enrollment Fee') {
        this.admission_fee_json_fields.Fees = 'enrolment_fee'
      }
      else if (this.admission_fee_type=='Electricity Fee') {
        this.admission_fee_json_fields.Fees = 'electricity_fee'
      }
      else if (this.admission_fee_type=='Group Insurance Fee') {
        this.admission_fee_json_fields.Fees = 'group_insurance_fee'
      }
      else if (this.admission_fee_type=='Scout and Guide Fee') {
        this.admission_fee_json_fields.Fees = 'scout_guide_fee'
      }
      else if (this.admission_fee_type=='Internet Fee') {
        this.admission_fee_json_fields.Fees = 'internet_fee'
      }
      else if (this.admission_fee_type=='Welfare Fee') {
        this.admission_fee_json_fields.Fees = 'welfare_fee'
      }
      else if (this.admission_fee_type=='College Development Fee') {
        this.admission_fee_json_fields.Fees = 'development_fee'
      }
      else if (this.admission_fee_type=='Library Caution Fee') {
        this.admission_fee_json_fields.Fees = 'library_caution_fee'
      }
      else if (this.admission_fee_type=='Transport Fee') {
        this.admission_fee_json_fields.Fees = 'transport_fee'
      }
      else if (this.admission_fee_type=='ISTE Fee') {
        this.admission_fee_json_fields.Fees = 'iste_fee'
      }
      else if (this.admission_fee_type=='Training and Placement Fee') {
        this.admission_fee_json_fields.Fees = 'training_placement_fee'
      }
      else if (this.admission_fee_type=='College Festival Fee') {
        this.admission_fee_json_fields.Fees = 'college_festival_fee'
      }
      else if (this.admission_fee_type=='Medical Fee') {
        this.admission_fee_json_fields.Fees = 'medical_fee'
      }
      else if (this.admission_fee_type=='Late Fee') {
        this.admission_fee_json_fields.Fees = 'late_fee'
      }
      else {
        this.admission_fee_json_fields.Fees = 'amount'
      }
    },

    depertment() {
      if(this.depertment === 'PhD' || this.depertment === 'All') {
        this.isBranchDisable = true
      } else {
        this.isBranchDisable = false
      }
    }
  },

  methods: {
    startDownloading(){
      this.isPageLoading = true
    },
    finishDownloading(){
      this.isPageLoading = false
    },
    get_report_data(report_type){
      this.isPageLoading = true
      return new Promise((resolve,reject)=>{
        if(report_type=='Admission'){
          this.file_name = 'admission_report.xls'
          axios({url: this.$store.state.admission_end_point, method: 'GET', headers: this.headers})
          .then(response => {
            this.report_data = response.data
            this.isPageLoading = false
            resolve(response)
          })
          .catch(error => {
            this.isPageLoading = false
            reject(error)
          })
        }
        else if (report_type=='Examination') {
          this.file_name = 'examination_report.xls'
          axios({url: this.$store.state.examination_end_point, method: 'GET', headers: this.headers})
          .then(response => {
            this.report_data = response.data
            this.isPageLoading = false
            resolve(response)
          })
          .catch(error => {
            this.isPageLoading = false
            reject(error)
          })
        }
        else if (report_type=='Compartmental') {
          this.file_name = 'compartmental_report.xls'
          axios({url: this.$store.state.compartmental_end_point, method: 'GET', headers: this.headers})
          .then(response => {
            this.report_data = response.data
            this.isPageLoading = false
            resolve(response)
          })
          .catch(error => {
            this.isPageLoading = false
            reject(error)
          })
        }
        else if (report_type=='Betterment') {
          this.file_name = 'betterment_report.xls'
          axios({url: this.$store.state.betterment_end_point, method: 'GET', headers: this.headers})
          .then(response => {
            this.report_data = response.data
            this.isPageLoading = false
            resolve(response)
          })
          .catch(error => {
            this.isPageLoading = false
            reject(error)
          })
        }
        else if (report_type=='Transfer') {
          this.file_name = 'transfer_students_report.xls'
          axios({url: this.$store.state.transfer_end_point, method: 'GET', headers: this.headers})
          .then(response => {
            this.report_data = response.data
            for(var i=0; i<this.report_data.length; i++){
              this.report_data[i].transfer_from = 'Jorhat Institute of Science and Technology'
              this.year_array.push(new Date(this.report_data[i].transfer_date).getFullYear())
            }
            this.isPageLoading = false
            this.year_array = this.year_array.filter((v,i,a)=> a.indexOf(v)===i) // For unique values
            resolve(response)
          })
          .catch(error => {
            this.isPageLoading = false
            reject(error)
          })
        }
        else if (report_type=='Form and Prospectus') {
          this.file_name = 'form_and_prospectus.xls'
          axios({url: this.$store.state.prospectus_end_point, method: 'GET', headers: this.headers})
          .then(response => {
            this.report_data = response.data
            console.log(this.report_data);

            for(var j=0; j<this.report_data.length; j++){
              this.year_array_form_and_prospectus.push(new Date(this.report_data[j].purchase_date).getFullYear())
            }
            this.isPageLoading = false
            this.year_array_form_and_prospectus = this.year_array_form_and_prospectus.filter((v,i,a)=> a.indexOf(v)===i) // For unique values
            resolve(response)
          })
          .catch(error => {
            this.isPageLoading = false
            reject(error)
          })
        }
      })
    },
    get_depertment_id(depertment,dept_data,branch_data){
      this.isBranchDisable = true
      this.isBranchLoading = true
      if(depertment == 'PhD'){
        this.disableSemester = true
      }
      else{
        this.disableSemester = false
      }
      for(var i = 0; i < dept_data.length; i++){
        if(dept_data[i]['dept_name'] == depertment){
          this.depertment_id = dept_data[i]['id']
        }
      }
      this.get_brach_according_to_depertment(this.depertment_id, branch_data)
    },
    get_brach_according_to_depertment(depertment_id,branch_data){
      this.branch_array = ['All']
      for(var i = 0; i < branch_data.length; i++){
        for(var j=0; j < branch_data[i]['depertment'].length; j++){
          if(branch_data[i]['depertment'][j] == depertment_id){
            this.branch_array.push(branch_data[i]['branch_name'])
          }
        }
      }
      this.isBranchLoading = false
      this.isBranchDisable = false
    },

    report_generate(depertment,branch,semester,data){
      this.json_data = []
      if(this.report_type!='Transfer' && this.report_type!='Form and Prospectus'){
        this.file_title = this.report_type+' '+semester+' semester '+depertment+' depertment '+branch+' branch'
        if(!(semester=='All' || semester=='')){
          if(!(depertment=='All' || depertment=='')){
            // If semester, depertment and branch given.
            if(!(branch=='All' || branch=='')){
              for(var i=0;i<data.length;i++){
                if(data[i]['semester']==semester
                && data[i]['depertment']==depertment
                && data[i]['branch']==branch){
                  this.json_data.push(data[i])
                }
              }
            }
            // If semester and depertment given but not branch.
            else{
              for(i=0;i<data.length;i++){
                if(data[i]['semester']==semester
                && data[i]['depertment']==depertment){
                  this.json_data.push(data[i])
                }
              }
            }
          }
          // If only semester given.
          else{
            for(i=0;i<data.length;i++){
              if(data[i]['semester']==semester){
                this.json_data.push(data[i])
              }
            }
          }
        }
        else if(!(depertment=='All' || depertment=='')){
          // If only depertment and branch given but not semester.
          if(!(branch=='All' || branch=='')){
            for(i=0;i<data.length;i++){
              if(data[i]['depertment']==depertment  && data[i]['branch']==branch){
                this.json_data.push(data[i])
              }
            }
          }
          // If only depertment given but not semester and branch.
          else{
            for(i=0;i<data.length;i++){
              if(data[i]['depertment']==depertment){
                this.json_data.push(data[i])
              }
            }
          }
        }
        else{
          // this.json_data.transfer_to = ''
          this.json_data = data
        }
      }
      else if(this.report_type=='Transfer') {
        this.file_title = 'Transfer Students Details of'+' '+this.transfer_year+' '+'Year'
        if(this.transfer_year=='All'){
          this.json_data = data
        }
        else {
          for(var j=0; j<data.length; j++){
            var year = new Date(data[j].transfer_date).getFullYear()
            if(this.transfer_year==year){
              this.json_data.push(data[j])
            }
          }
        }
      }
      else if(this.report_type=='Form and Prospectus') {
        this.file_title = 'Form and Prospectus sell report of the year'+' '+this.form_and_prospectus_year
        if(this.form_and_prospectus_year=='All'){
          if(depertment=="All"){
            if(branch=="All"){
              this.json_data = data
            }
            else{
              for(var k=0; k<data.length;k++){
                if(data[k]['branch']==branch){
                  this.json_data.push(data[k])
                }
              }
            }
          }
          else{
            if(branch=="All"){
              for(k=0;k<data.length;k++){
                if(data[k]['depertment']==depertment){
                  this.json_data.push(data[k])
                }
              }
            }
            else{
              for(k=0; k<data.length;k++){
                if(data[k]['branch']==branch && data[k]['depertment']==depertment){
                  this.json_data.push(data[k])
                }
              }
            }
          }
        }
        else {
          for(j=0; j<data.length; j++){
            var year_from_data = new Date(data[j].form_and_prospectus_year).getFullYear()
            if(this.form_and_prospectus_year==year_from_data){
              if(depertment=="All"){
                if(branch=="All"){
                  this.json_data.push(data[j])
                }
                else if(data[j]['branch']==branch){
                  this.json_data.push(data[j])
                }
              }
              else {
                if(data[j]['depertment']==depertment && branch=="All"){
                  this.json_data.push(data[j])
                }
                else if (data[j]['depertment']==depertment && data[j]['branch']==branch) {
                  this.json_data.push(data[j])
                }
              }
            }
          }
        }
      }
      this.snackbar = true
    },

    update_branch(branch){
      this.branch = branch
    }
  }
}
</script>

<style lang="css" scoped>
</style>
