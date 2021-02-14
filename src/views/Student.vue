<template lang="html">
  <div class="student pt-5">
    <div v-if="errorOccure" class="error">
      {{ errors }}
    </div>
    <v-card flat elevation="7" class="studentBorder pa-0 ma-0">
      <v-data-table
      :headers="headers"
      :items="students"
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
          <v-row>
            <BreadCrumb :values="breadItems" class="pl-3"></BreadCrumb>
            <div class="flex-grow-1"></div>
            <v-btn color="primary" dark class="mt-3 mr-5" router to="/studentform">
              <span class="caption text-camelCase">Add Student</span>
              <v-icon right small>add</v-icon>
            </v-btn>
          </v-row>
          <v-toolbar flat color="white">
            <v-toolbar-title>STUDENTS</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
            <v-divider
              class="mx-4"
              inset
              vertical
            ></v-divider>
            <div class="flex-grow-1"></div>

          </v-toolbar>
        </template>
        <template v-slot:item.action="{ item }">
          <v-icon
            small
            class="ml-n2 mr-2"
            @click="editItem(item)"
          >
            edit
          </v-icon>
          <v-icon
            small
            class="mr-2"
            @click="viewItem(item)"
          >
            visibility
          </v-icon>
          <v-icon
            small
            class="mr-2"
            @click="student_transfer(item)"
          >
            swap_horiz
          </v-icon>
          <v-icon
            small
            class="mr-2"
            @click="remove_student_details(item)"
          >
            delete
          </v-icon>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field v-model="editedItem.roll_number" label="Roll Number" :error="isRollNumberValid" :error-messages="rollNumberValidationMessage"  :readonly="roll_number_edit || readonly" :append-icon="!roll_number_edit && !readonly ? 'edit_off' : 'edit'" @click:append="roll_number_edit = !roll_number_edit"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field v-model="editedItem.admission_year" label="Admission Year" :readonly="readonly"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field v-model="editedItem.first_name" label="First Name" :readonly="readonly"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field v-model="editedItem.last_name" label="Last Name" :readonly="readonly"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <!-- <v-text-field v-model="editedItem.session" label="Session" :readonly="readonly"></v-text-field> -->
                <v-select :items="session_array" label="Session" v-model="editedItem.session" :readonly="readonly" :rules= "[rules.required]" required></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-select :items="entryChoice" label="Entry Type" v-model="editedItem.entry_type" :readonly="readonly" :rules= "[rules.required]" required></v-select>
                <!-- <v-text-field v-model="editedItem.entry_type" label="Entry Type" :readonly="readonly"></v-text-field> -->
              </v-col>
              <v-col cols="12" sm="6" md="12">
                <!-- <v-text-field v-model="editedItem.depertment" label="Depertment" :readonly="readonly"></v-text-field> -->
                <v-select :items="dept_array" label="Department" v-model="editedItem.depertment" :disabled="!readonly" :readonly="readonly"></v-select>
                <!-- <v-select :items="dept_array" label="Department" v-model="editedItem.depertment" @change="get_depertment_id(editedItem.depertment)" :disabled="!readonly" :readonly="readonly"></v-select> -->
              </v-col>
              <v-col cols="12" sm="6" md="12">
                <!-- <v-text-field v-model="editedItem.branch" label="Branch" :readonly="readonly"></v-text-field> -->
                <v-select :items="branch_array" label="Branch" v-model="editedItem.branch" :disabled="!readonly" :readonly="readonly"></v-select>
                <!-- <v-select :items="branch_array" label="Branch" v-model="editedItem.branch" @change="get_branch_id(editedItem.branch)" :loading="isBranchLoading" :disabled="isBranchDisable" :readonly="readonly"></v-select> -->
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <!-- <v-text-field v-model="editedItem.caste" label="Caste" :readonly="readonly"></v-text-field> -->
                <v-select :items="casteChoice" label="Caste" v-model="editedItem.caste" :readonly="readonly"></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <!-- <v-text-field v-model="editedItem.date_of_birth" label="Date of Birth" :readonly="readonly" v-if="isEdit"></v-text-field> -->
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
                      v-model="editedItem.date_of_birth"
                      label="Date Of Birth"
                      append-icon="event"
                      @blur="date = parseDate(editedItem.date_of_birth)"
                      v-on="on"
                      :readonly="readonly"
                      v-if="isEdit"
                    ></v-text-field>
                    <v-text-field
                      v-model="editedItem.date_of_birth"
                      label="Date Of Birth"
                      append-icon="event"
                      @blur="date = parseDate(editedItem.date_of_birth)"
                      :readonly="readonly"
                      v-else
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="date" @input="menu = false"></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <!-- <v-text-field v-model="editedItem.semester" label="Semester" :readonly="readonly"></v-text-field> -->
                <v-select :items="semesterChoice" label="Semester" v-model="editedItem.semester" :disabled="disableSemester" :readonly="readonly"></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field v-model="editedItem.father_name" label="Father's Name" :readonly="readonly"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field v-model="editedItem.mother_name" label="Mother's Name" :readonly="readonly"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field v-model="editedItem.parents_phone_number" label="Parent's Phone Number" :readonly="readonly" :rules= "[rules.phoneNumber]"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="12">
                <v-textarea label="Address" auto-grow v-model="editedItem.address" :readonly="readonly" outlined></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions v-show="isEdit">
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="transfer_dialogbox" max-width="500px">
      <v-card>
        <v-card-title>Enter the Insitute Name</v-card-title>
        <v-card-text>
          <v-text-field v-model="transfered_institute_name" label="Institute Name"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="cancel_student_tranfer">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="save_student_tranfer">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="remove_student_dialog" max-width="500px">
      <v-card>
        <v-card-title>Delete this student details?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="remove_student_dialog=false">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="remove_student">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>
import BreadCrumb from '@/components/breadCrumb';
import axios from 'axios';
// import {HTTP} from '@/components/http-common'
export default {
  components: {
    BreadCrumb,
  },
  data() {
    return {
      // info: 'a',
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
          // { text: 'Caste', value: 'caste' },
          // { text: 'Date Of Birth', value: 'date_of_birth' },
          { text: 'Semester', value: 'semester' },
          { text: 'Actions', value: 'action', sortable: false, width: 130 },
        ],
      students: [],
      errorOccure: false,
      errors: [],
      token: '',
      editedIndex: -1,
      editedItem: {
        session: '',
        roll_number: '',
        first_name: '',
        last_name: '',
        depertment: '',
        depertment_id: '',
        branch: '',
        branch_id: '',
        caste: '',
        date_of_birth: '',
        semester: '',
        admission_year: '',
        father_name: '',
        mother_name: '',
        parents_phone_number: '',
        address: '',
        entry_type: '',
      },
      defaultItem: {
        roll_number: '',
        first_name: '',
        last_name: '',
        depertment: '',
        branch: '',
        // caste: '',
        // date_of_birth: '',
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
      entryChoice: [
        'Regular',
        'Lateral',
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

      dept_array: [],
      branch_array: [],
      session_array: [],
      depertment_id: '',
      branch_id: '',
      isBranchDisable: false,
      isBranchLoading: false,
      disableSemester: false,
      date: new Date().toISOString().substr(0, 10),
      // dateFormatted: '',
      menu: false,
      token_headers: {
        'Authorization':'Bearer '+ this.$store.state.token,
      },
      // roll_number_disable: false,
      roll_number_edit: false,
      transfer_dialogbox: false,
      transfered_institute_name: '',
      student_details: [],
      present_date: '',
      remove_student_dialog: false
    }
  },
  mounted() {
    document.title = "Student"
    localStorage.setItem('last_URL','/student')
    var date = new Date()
    this.present_date = `${String(date.getDate()).padStart(2,0)}/${date.getMonth() + 1}/${date.getFullYear()}`// Add session array values.
    var i = date.getFullYear()
    var lastYearValue = i + 5
    for(i=i-2; i<lastYearValue; i++){
      this.session_array.push(i.toString() + '-' + (i+1).toString())
    }
  },

  computed: {
      isRollNumberValid() {
        if(this.readonly) {
          return false
        } else {
          return this.students.some((student) => {
                  let isValid = false
                  if(student.roll_number == this.editedItem.roll_number && student.id != this.editedItem.id) {
                    isValid = true
                  } else {
                    isValid = false
                  }
                  return isValid
                })
        }
      },
      rollNumberValidationMessage() {
        if(this.isRollNumberValid) {
          return 'This roll number is already taken.'
        } else {
          return ''
        }
      }
  },

  watch: {
      dialog (val) {
        val || this.close()
      },

      date() {
        this.editedItem.date_of_birth = this.formatDate(this.date)
      },
    },

  created () {
    return new Promise(()=>{
      axios
      // LOCAL
      .get(this.$store.state.student_end_point,{headers: this.token_headers})
      // SERVER
      // .get('https://alegralabs.com:8802/api/v1/student/',{headers:{'Authorization':'Bearer '+ this.$store.state.token}})
      .then(response => {
        this.errorOccure = false
        this.students = response.data
        this.isSuccess = true
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

          // var refresh_token = this.$store.state.refresh_token
          // var client_id = this.$store.state.client_id
          // var client_secret = this.$store.state.client_secret
          // console.log(refresh_token)
          // axios({url: 'http://127.0.0.1:8000/api/v1/refresh_token/', data: {refresh_token, client_id, client_secret}, method: 'POST'})
          // .then(response => {
          //   console.log(response.data)
          //   const token = response.data.access_token
          //   localStorage.setItem('token', token)
          // })
          // .catch(error=>{
          //   console.log(error);
          // })
        }
      })
    })
  },

  methods: {
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

    student_transfer(item){
      this.transfer_dialogbox = true
      this.editedItem = Object.assign({}, item)
    },

    cancel_student_tranfer(){
      this.transfered_institute_name = ''
      this.transfer_dialogbox = false
    },
    save_student_tranfer(){
      this.editedItem.transfered_institute_name = this.transfered_institute_name
      this.editedItem.transfer_date = this.convertDate(this.present_date)

      if(this.editedItem['id']){
        new Promise((resolve,reject)=>{
          axios({url: this.$store.state.transfer_end_point,
            method: 'POST',
            data: this.editedItem,
            headers: this.token_headers
          })
          .then(response => {
            // console.log(response);
            axios({url: this.$store.state.student_end_point + this.editedItem['id']+'/',
              method: 'DELETE',
              headers: this.token_headers
            })
            .then((response)=>{
              // this.$router.push('/student')
              // this.$router.push({name: "student"})
              location.reload()
              resolve(response)
            })
            resolve(response)
          })
          .catch(error => {
            // console.log(error);
            reject(error)
          })
        })
      }
      this.cancel_student_tranfer()
    },

    remove_student_details(item) {
      this.remove_student_dialog = true
      this.editedItem = Object.assign({}, item)
      // console.log('details', this.editItem)
    },

    remove_student() {
      console.log('working', this.editedItem)
      if(this.editedItem['id']) {
        console.log('details', this.editedItem)
        new Promise((resolve)=>{
          axios({url: this.$store.state.student_end_point + this.editedItem['id']+'/',
            method: 'DELETE',
            headers: this.token_headers
          })
          .then((response)=>{
            location.reload()
            console.log('deleted')
            resolve(response)
          })
        })
        this.remove_student_dialog = false
      }
    },

    editItem (item) {
      this.roll_number_edit = true
      this.editedIndex = this.students.indexOf(item)
      this.formTitle = 'Edit Student'
      this.editedItem = Object.assign({}, item)
      this.editedItem.date_of_birth = this.formatDate(this.editedItem.date_of_birth)
      this.branch_array.push(this.editedItem.branch)
      if(this.editedItem.depertment == 'PhD'){
        this.disableSemester = true
      }
      else{
        this.disableSemester = false
      }
      this.dialog = true
      this.readonly = false
      this.isEdit = true

      axios({url: this.$store.state.depertment_end_point, method: 'GET', headers: this.token_headers})
      .then(response => {
          this.dept_array = []
          for(var i = 0; i < response.data.length; i++){
            this.dept_array.push(response.data[i]['dept_name'])
            // this.depertment_id = response.data[i]['id']
            if(response.data[i]['dept_name'] == this.editedItem.depertment){
              this.depertment_id = response.data[i]['id']
              // this.editedItem.depertment_id = response.data[i]['id']
            }
          }
      })
      axios({url: this.$store.state.branch_end_point, method: 'GET', headers: this.token_headers})
      .then(response => {
          for(var i = 0; i < response.data.length; i++){
            if(response.data[i]['branch_name'] == this.editedItem.branch){
              this.branch_id = response.data[i]['id']
              // this.editedItem.branch_id = response.data[i]['id']
            }
          }
      })

      // if(!(this.editedItem.depertment_id && this.editedItem.branch_id)){
      //   this.get_depertment_id(this.editedItem.depertment)
      //   this.get_branch_id(this.editedItem.branch)
      // }
    },

    viewItem (item) {
      this.formTitle = 'View Student'
      this.editedIndex = this.students.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.editedItem.date_of_birth = this.formatDate(this.editedItem.date_of_birth)
      this.dept_array.push(this.editedItem.depertment)
      this.branch_array.push(this.editedItem.branch)
      if(this.editedItem.depertment == 'PhD'){
        this.disableSemester = true
      }
      else{
        this.disableSemester = false
      }
      this.dialog = true
      this.readonly = true
      this.isEdit = false
    },

    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    save () {
      // console.log(this.editedItem);
      // console.log(this.editedItem.date_of_birth);
      // console.log(this.editedIndex);

      if (this.editedIndex > -1) {
        Object.assign(this.students[this.editedIndex], this.editedItem)
      } else {
        this.students.push(this.editedItem)
      }
      if(this.editedItem['id']){
        this.editedItem.date_of_birth = this.convertDate(this.editedItem.date_of_birth)
        this.editedItem.depertment_id = this.depertment_id
        this.editedItem.branch_id = this.branch_id
        axios({url: this.$store.state.student_end_point +this.editedItem['id']+'/',
              method: 'PUT',
              data: this.editedItem,
              headers: this.token_headers
            })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        })
      }
      this.close()
    },


    get_depertment_id(depertment){
      // this.isDeptLoading = true
      // this.branch_array.push(this.editedItem.branch)
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
    },


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
  .v-card.studentBorder {
    border-top: 4px solid #1976d2;
  }
</style>
