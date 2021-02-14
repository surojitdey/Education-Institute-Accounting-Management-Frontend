<template>
  <div class="spot_admission_fee">

    <v-card flat>
      <v-card-title class="text-uppercase">
        <span class="text-center">
          Spot Admission Fee Setting
        </span>
      </v-card-title>
      <v-card-text class="mt-4 pt-0 my-0 py-0">
        <v-row justify="space-between">
            <v-col cols="12" sm="5" md="5" class="mt-0 pt-0 my-0 py-0">
              <v-text-field label="Govt Dues" v-model="govt_dues" outlined dense :prepend-inner-icon="rupee_icon" :rules= "[rules.number]"></v-text-field>
              <v-text-field label="Identity Card" v-model="identity_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules= "[rules.number]"></v-text-field>
              <v-text-field label="Examination Fees" v-model="examination_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules= "[rules.number]"></v-text-field>
              <v-text-field label="Student Union Fees" v-model="student_union_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules= "[rules.number]"></v-text-field>
              <v-text-field label="Games and Sports" v-model="game_sports_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules= "[rules.number]"></v-text-field>
              <v-text-field label="Magazine Fee" v-model="magazine_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules= "[rules.number]"></v-text-field>
              <v-text-field label="Laboratory Fees" v-model="laboratory_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules= "[rules.number]"></v-text-field>
              <v-text-field label="University Registration Fee" v-model="university_registration_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules= "[rules.number]"></v-text-field>
              <v-text-field label="Enrollment Fee" v-model="enrolment_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules= "[rules.number]"></v-text-field>
              <v-text-field label="Electricity" v-model="electricity_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules= "[rules.number]"></v-text-field>
              <v-text-field label="Group Insurance" v-model="group_insurance_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules= "[rules.number]"></v-text-field>
              <v-text-field label="Scout & Guide" v-model="scout_guide_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules= "[rules.number]"></v-text-field>
              <v-text-field label="Internet Service" v-model="internet_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules= "[rules.number]"></v-text-field>
              <v-text-field label="Student Welfare Fund" v-model="welfare_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules= "[rules.number]"></v-text-field>
              <v-text-field label="College Development" v-model="development_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules= "[rules.number]"></v-text-field>
              <v-text-field label="Library & Lab. Caution Money" v-model="library_caution_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules= "[rules.number]"></v-text-field>
              <v-text-field label="Transport Fee" v-model="transport_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules= "[rules.number]"></v-text-field>
              <v-text-field label="ISTE" v-model="iste_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules= "[rules.number]"></v-text-field>
              <v-text-field label="Training & Placement" v-model="training_placement_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules= "[rules.number]"></v-text-field>
              <v-text-field label="College Festival" v-model="college_festival_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules= "[rules.number]"></v-text-field>
              <v-text-field label="Forms and Prospectus Fee" v-model="form_and_prospectus_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules= "[rules.number]"></v-text-field>
              <v-text-field label="Counselling Fee" v-model="counselling_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules= "[rules.number]"></v-text-field>
              <v-text-field label="Hostel Admission Fee" v-model="hostel_admission_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules= "[rules.number]"></v-text-field>
              <v-text-field label="Medical Fee" v-model="medical_fee" outlined dense :prepend-inner-icon="rupee_icon" :rules= "[rules.number]"></v-text-field>
              <v-text-field label="Others" v-model="spot_admission_fine" outlined dense :prepend-inner-icon="rupee_icon" :rules= "[rules.number]"></v-text-field>
            </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions justify="center" class="ml-2 mt-0 pt-0">
        <div class="flex-grow-0"></div>
        <v-btn type="submit" color="success darken-1" width="115" @click="save">Save</v-btn>
        <v-btn color="error darken-1" width="115">Reset</v-btn>
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

    <v-overlay :value="isPageLoad">
      <v-progress-circular indeterminate color="grey darken-3" size="30"></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data(){
    return{
      isPageLoad: false,
      table_id: '',

      govt_dues: '',
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
      iste_fee: '',
      training_placement_fee: '',
      college_festival_fee: '',
      medical_fee: '',
      form_and_prospectus_fee: '',
      counselling_fee: '',
      hostel_admission_fee: '',
      spot_admission_fine: '',

      rupee_icon: "mdi-currency-inr",

      spot_fee_data: [],

      errorOccure: false,
      snackbar: false, // used to show the success or error msg.
      msg: '', // Success or Error msg after form submission
      headers: {
        'Authorization':'Bearer '+ this.$store.state.token,
      },
      rules: {
        // required: value => !!value || 'Required',
        number: value => (/^[0-9.]{1,50}$/.test(value)) || 'This field must be a numerical value.',
        // lastDate: () => (new Date(this.date).getTime() > this.present_date.getTime()) || 'Last Date should not be a expire date.',
      },
    }
  },

  mounted() {
    document.title = "Spot Admission Fee Setting"
    localStorage.setItem('last_URL','/spot_admission_setting')
    this.isPageLoad = true
    new Promise((resolve, reject)=>{
      axios({url: this.$store.state.spot_admission_fee_end_point, method: 'GET', headers: this.headers})
      .then(response=>{
        console.log(response.data);
        this.spot_fee_data = response.data
        this.get_spot_fee(this.spot_fee_data)
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
    })
  },
  methods: {
    parseInput(input) {
      if(!input) return null

      input =
      input = Number(input.toString().replace(',','')).toFixed(2)
      return input
    },
    save(){
      this.isPageLoad = true
      if(this.form_and_prospectus_fee || this.counselling_fee || this.hostel_admission_fee || this.spot_admission_fine || this.medical_fee){
        new Promise((resolve,reject)=>{
          if(this.spot_fee_data.length==0){
            axios({url: this.$store.state.spot_admission_fee_end_point, method: 'POST',
              headers: this.headers,
              data: {
                govt_dues: this.parseInput(this.govt_dues),
                identity_fee: this.parseInput(this.identity_fee),
                examination_fee: this.parseInput(this.examination_fee),
                student_union_fee: this.parseInput(this.student_union_fee),
                game_sports_fee: this.parseInput(this.game_sports_fee),
                magazine_fee: this.parseInput(this.magazine_fee),
                laboratory_fee: this.parseInput(this.laboratory_fee),
                university_registration_fee: this.parseInput(this.university_registration_fee),
                enrolment_fee: this.parseInput(this.enrolment_fee),
                electricity_fee: this.parseInput(this.electricity_fee),
                group_insurance_fee: this.parseInput(this.group_insurance_fee),
                scout_guide_fee: this.parseInput(this.scout_guide_fee),
                internet_fee: this.parseInput(this.internet_fee),
                welfare_fee: this.parseInput(this.welfare_fee),
                development_fee: this.parseInput(this.development_fee),
                library_caution_fee: this.parseInput(this.library_caution_fee),
                transport_fee: this.parseInput(this.transport_fee),
                iste_fee: this.parseInput(this.iste_fee),
                training_placement_fee: this.parseInput(this.training_placement_fee),
                college_festival_fee: this.parseInput(this.college_festival_fee),
                form_and_prospectus_fee: this.parseInput(this.form_and_prospectus_fee),
                counselling_fee: this.parseInput(this.counselling_fee),
                hostel_admission_fee: this.parseInput(this.hostel_admission_fee),
                spot_admission_fine: this.parseInput(this.spot_admission_fine),
                medical_fee: this.parseInput(this.medical_fee)
              }
            })
            .then(response=>{
              console.log(response);
              this.errorOccure = false
              this.snackbar = true
              this.msg = 'All fields are successfully updated'
              resolve(response)
            })
            .catch(error=>{
              console.log(error);
              reject(error)
            })
          }
          else{
            axios({url: this.$store.state.spot_admission_fee_end_point + this.table_id + '/', method: 'PUT',
              headers: this.headers,
              data: {
                govt_dues: this.parseInput(this.govt_dues),
                identity_fee: this.parseInput(this.identity_fee),
                examination_fee: this.parseInput(this.examination_fee),
                student_union_fee: this.parseInput(this.student_union_fee),
                game_sports_fee: this.parseInput(this.game_sports_fee),
                magazine_fee: this.parseInput(this.magazine_fee),
                laboratory_fee: this.parseInput(this.laboratory_fee),
                university_registration_fee: this.parseInput(this.university_registration_fee),
                enrolment_fee: this.parseInput(this.enrolment_fee),
                electricity_fee: this.parseInput(this.electricity_fee),
                group_insurance_fee: this.parseInput(this.group_insurance_fee),
                scout_guide_fee: this.parseInput(this.scout_guide_fee),
                internet_fee: this.parseInput(this.internet_fee),
                welfare_fee: this.parseInput(this.welfare_fee),
                development_fee: this.parseInput(this.development_fee),
                library_caution_fee: this.parseInput(this.library_caution_fee),
                transport_fee: this.parseInput(this.transport_fee),
                iste_fee: this.parseInput(this.iste_fee),
                training_placement_fee: this.parseInput(this.training_placement_fee),
                college_festival_fee: this.parseInput(this.college_festival_fee),
                form_and_prospectus_fee: this.parseInput(this.form_and_prospectus_fee),
                counselling_fee: this.parseInput(this.counselling_fee),
                hostel_admission_fee: this.parseInput(this.hostel_admission_fee),
                spot_admission_fine: this.parseInput(this.spot_admission_fine),
                medical_fee: this.parseInput(this.medical_fee)
              }
            })
            .then(response=>{
              console.log(response);
              this.errorOccure = false
              this.snackbar = true
              this.msg = 'All fields are successfully updated'
              resolve(response)
            })
            .catch(error=>{
              console.log(error);
              reject(error)
            })
          }
        })
      }
      else{
        this.errorOccure = true
        this.snackbar = true
        this.msg = 'All fields can not be empty!'
      }
      this.isPageLoad = false
    },
    get_spot_fee(data){
      for(var i=0; i<data.length; i++){
        this.table_id = data[i]['id']
        this.govt_dues = data[i]['govt_dues']
        this.identity_fee = data[i]['identity_fee']
        this.examination_fee = data[i]['examination_fee']
        this.student_union_fee = data[i]['student_union_fee']
        this.game_sports_fee = data[i]['game_sports_fee']
        this.magazine_fee = data[i]['magazine_fee']
        this.laboratory_fee = data[i]['laboratory_fee']
        this.university_registration_fee = data[i]['university_registration_fee']
        this.enrolment_fee = data[i]['enrolment_fee']
        this.electricity_fee = data[i]['electricity_fee']
        this.group_insurance_fee = data[i]['group_insurance_fee']
        this.scout_guide_fee = data[i]['scout_guide_fee']
        this.internet_fee = data[i]['internet_fee']
        this.welfare_fee = data[i]['welfare_fee']
        this.development_fee = data[i]['development_fee']
        this.library_caution_fee = data[i]['library_caution_fee']
        this.transport_fee = data[i]['transport_fee']
        this.iste_fee = data[i]['iste_fee']
        this.training_placement_fee = data[i]['training_placement_fee']
        this.college_festival_fee = data[i]['college_festival_fee']
        this.form_and_prospectus_fee = data[i]['form_and_prospectus_fee']
        this.counselling_fee = data[i]['counselling_fee']
        this.hostel_admission_fee = data[i]['hostel_admission_fee']
        this.spot_admission_fine = data[i]['spot_admission_fine']
        this.medical_fee = data[i]['medical_fee']
      }
    }
  }
}
</script>

<style lang="css" scoped>
</style>
