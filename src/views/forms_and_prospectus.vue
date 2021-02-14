<template lang="html">
  <div class="form_and_prospectus pt-5">
    <v-card elevation="7" class="form_and_prospectus_border">
      <BreadCrumb :values="breadItems"></BreadCrumb>
      <v-card-title>
        <span class="heading">Forms And Prospectus</span>
      </v-card-title>
      <v-card-text>
        <span>Enter Student Details</span>
      </v-card-text>
      <v-card-title class="pb-0">
        <v-row>
          <v-col cols="6" sm="6" md="4" class="mt-0 pt-0 mr-0">
            <v-text-field label="Student Name" outlined dense v-model="student_name" class="" required :rules= "[rules.required]" :error="student_name_empty"></v-text-field>
          </v-col>
          <v-col cols="1" sm="1" md="1" class="">
            <!-- Used as a seperator or divider -->
          </v-col>
          <v-col cols="6" sm="6" md="4" class="mt-0 pt-0 mr-0">
            <v-select :items="dept_array" class="mt-0 pt-0 my-0 py-0" label="Department" outlined v-model="depertment" required :rules= "[rules.required]" :error="depertment_empty"></v-select>
          </v-col>
          <v-col cols="6" sm="6" md="9" class="mt-0 pt-0 mr-4">
            <v-select :items="branch_array" class="mt-0 pt-0 my-0 py-0" label="Branch" outlined v-model="branch" :loading="isBranchLoading" :disabled="isBranchDisable" required :rules= "[rules.required]" :error="branch_empty"></v-select>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-actions justify="center" class="ml-2 mt-n3 pt-0">
        <!-- <div class="flex-grow-1"></div> -->
        <v-btn type="submit" color="success darken-1" width="115" @click="submit">Submit</v-btn>
        <!-- <v-btn color="error darken-1" width="115">Reset</v-btn> -->
      </v-card-actions>
    </v-card>


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
                <span class="text-capitalize">Date: <span class="text-capitalize font-weight-regular thin_text">{{present_date}}</span></span>
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
          <v-row class="pl-5" align="center" justify="center" no-gutters>
            <v-col cols="2" sm="2" md="2" class="text-center">
              <!-- <h3 class="text-center"> -->
                <span class="text-capitalize">1</span>
              <!-- </h3> -->
            </v-col>
            <v-col cols="7" sm="7" md="7" class="text-center">
              <!-- <h3 class="text-center" > -->
                <span class="text-capitalize">Form and Prospectus</span>
              <!-- </h3> -->
            </v-col>
            <v-col cols="3" sm="3" md="3" class="text-center">
              <!-- <h3 class="text-center"> -->
                <span>{{prospectus_fee}}</span>
              <!-- </h3> -->
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
              <!-- <h3 class="text-center" v-if="isSpotAdmission"> -->
                <!-- <span class="" v-if="isSpotAdmission">{{spot_admission_total}}</span> -->
              <!-- </h3> -->
              <!-- <h3 class="text-center" v-else> -->
                <span class="">{{prospectus_fee}}</span>
              <!-- </h3> -->
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
import BreadCrumb from '@/components/breadCrumb';
import axios from 'axios';
export default {
  components: {
    BreadCrumb,
  },
  data(){
    return{
      breadItems: [
        {
          text: 'Overview',
          exact: true,
          disabled: false,
          // href: '/surojit/JIST/dist/',
          href: '/',
          link: true,
        },
        {
          text: 'Forms And Prospectus',
          exact: true,
          disabled: true,
          // href: '/surojit/JIST/dist/#/admission/',
          href: '/prospectus/',
          link: true,
        },
      ],

      rules: {
        required: value => !!value || 'Required',
        // semester_required: value => (!!value || (this.depertment=='PhD')) || 'Required',
        name: value => (/^[a-zA-Z ]{1,50}$/.test(value)) || 'This field must be an alphabetical string.',
        futureDate: () => (new Date(this.date).getTime() < new Date(this.present_date).getTime()) || 'Date of birth should not be a future date.',
        // passwordMatched: value => value === this.new_password || 'Confirm Password did not matched with Password field!',
        phoneNumber: val => (/^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{3})[-. ]?([0-9]{3})$/.test(val) || /^\(?([0-9]{4})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})$/.test(val)) || 'Phone Number Must be valid',
      },

      student_name: '',
      depertment: '',
      dept_array: [],
      branch: '',
      branch_array: [],
      present_date: '',
      // purchase_date: '',
      depertment_id: '',
      isBranchLoading: false,
      isBranchDisable: true,
      isPageLoad: false,
      roll_number: '',
      depertment_short: '',
      semester: '',
      prospectus_fee: '',

      fee_snackbar: false,
      spot_admission_fee_data: [],
      headers: {
        'Authorization':'Bearer '+ this.$store.state.token,
      },

      student_name_empty: false,
      depertment_empty: false,
      branch_empty: false,
    }
  },
  mounted(){
    document.title = "Forms And Prospectus"
    localStorage.setItem('last_URL','/prospectus')
    let date = new Date()
    this.present_date = `${String(date.getDate()).padStart(2,0)}/${date.getMonth() + 1}/${date.getFullYear()}`
    // this.purchase_date = `${date.getFullYear()}/${date.getMonth() + 1}/${String(date.getDate()).padStart(2,0)}`

    this.isPageLoad = true
    return new Promise((resolve, reject)=>{

      axios({url: this.$store.state.depertment_end_point, method: 'GET', headers: this.headers})
      .then(response => {
        for(var i = 0; i < response.data.length; i++){
          this.dept_array.push(response.data[i]['dept_name'])
        }
        this.isPageLoad = false
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

      // Spot admission fee details from database through api call.
      axios({url: this.$store.state.spot_admission_fee_end_point, method: 'GET', headers: this.headers})
      .then(response => {
        this.spot_admission_fee_data = response.data
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
    })
  },
  watch: {
    depertment(){
      this.get_depertment_id(this.depertment)
    },
    fee_snackbar(){
      if(!this.fee_snackbar){
        location.reload()
      }
    },
  },
  methods: {
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
      // location.reload()
    },
    close_receipt(){
      this.fee_snackbar = false
      location.reload()
    },
    submit(){
      if(this.student_name && this.depertment && this.branch){
        // this.fee_snackbar = true
        this.get_spot_admission_fee_details(this.spot_admission_fee_data)
        this.save_data_into_database_table(this.student_name, this.depertment, this.branch, this.prospectus_fee)
      }
      else{
        if(!this.student_name){
          this.student_name_empty = true
        }
        else{
          this.student_name_empty = false
        }
        if(!this.depertment){
          this.depertment_empty = true
        }
        else{
          this.depertment_empty = false
        }
        if(!this.branch){
          this.branch_empty = true
        }
        else{
          this.branch_empty = false
        }
      }
    },

    save_data_into_database_table(student_name, depertment, branch, prospectus_fee){
      let date = new Date()
      let purchase_date = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2,0)}-${String(date.getDate()).padStart(2,0)}`
      console.log(purchase_date);
      return new Promise((resolve, reject)=>{
        axios({url: this.$store.state.prospectus_end_point,
          method: 'POST',
          headers: this.headers,
          data: {
            student_name: student_name,
            depertment: depertment,
            branch: branch,
            prospectus_fee: prospectus_fee,
            purchase_date: purchase_date,
          }
        })
        .then(response => {
          this.fee_snackbar = true
          resolve(response)
        })
        .catch(error => {
          this.fee_snackbar = false
          reject(error)
        })
      })
    },

    get_spot_admission_fee_details(data) {
      for(var i=0;i<data.length;i++){
          this.prospectus_fee = data[i]['form_and_prospectus_fee']
      }
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
      axios({url: this.$store.state.depertment_end_point, method: 'GET', headers: this.headers})
      .then(response => {
          for(var i = 0; i < response.data.length; i++){
            if(response.data[i]['dept_name'] == depertment){
              this.depertment_id = response.data[i]['id']
            }
          }
      })

      axios({url: this.$store.state.branch_end_point, method: 'GET', headers: this.headers})
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
    },
  }
}
</script>

<style lang="css" scoped>
.v-card.form_and_prospectus_border, .v-card.feesBorder {
  border-top: 4px solid #1976d2;
}
</style>
