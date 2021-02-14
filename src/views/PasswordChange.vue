<template>
  <div class="account">
    <v-content>
      <v-container fluid class="fill-height">
        <v-row justify="start" align="center">
          <v-col
            cols="12"
            sm="8"
            md="6"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat>
                <v-toolbar-title>Password Change</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form id="password_change_form" @submit.prevent="change">
                  <v-text-field
                    label="Current Password"
                    name="old_password"
                    prepend-icon="lock"
                    :append-icon="show ? 'visibility' : 'visibility_off'"
                    :type="show ? 'text' : 'password'"
                    @click:append="show = !show"
                    v-model="old_password"
                    :rules= "[rules.required]"
                    required
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    label="New Password"
                    name="new_password"
                    prepend-icon="lock"
                    v-model="new_password"
                    ref="password"
                    :append-icon="show1 ? 'visibility' : 'visibility_off'"
                    :type="show1 ? 'text' : 'password'"
                    @click:append="show1 = !show1"
                    :rules= "[rules.required]"
                    required
                  ></v-text-field>

                  <v-text-field
                    id="confirm_password"
                    label="Confirm New Password"
                    name="confirm_new_password"
                    prepend-icon="lock"
                    v-model="confirm_new_password"
                    :append-icon="show2 ? 'visibility' : 'visibility_off'"
                    :type="show2 ? 'text' : 'password'"
                    @click:append="show2 = !show2"
                    :rules= "[rules.required, rules.passwordMatched]"
                    required
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-text v-if="ismsg" class="ml-1">
                <!-- <span v-if="isSuccess" class="success--text">{{ msg }}</span> -->
                <v-alert v-if="isSuccess" type="success">
                  {{msg}}
                </v-alert>
                <v-alert v-if="isError" type="error">
                  {{msg}}
                </v-alert>
                <!-- <span v-else-if="isError" class="error--text">{{ msg }}</span> -->
              </v-card-text>
              <v-card-actions>
                <v-btn type="submit" color="success" @click="change" form="password_change_form">Save</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="error" @click="reset">Reset</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      old_password: '',
      new_password: '',
      confirm_new_password: '',
      // isPasswordGiven: false,
      show: false,
      show1: false,
      show2: false,
      rules: {
        required: value => !!value || 'Required',
        passwordMatched: value => value === this.new_password || 'Confirm Password did not matched with Password field!',
      },
      msg: '',
      ismsg: false,
      isSuccess: false,
      isError: false,
      headers: {
        'Authorization':'Bearer '+ this.$store.state.token,
      },
    }
  },

  watch:{
    isSuccess(){
      if(this.isSuccess){
        this.isError = false
      }
    },
    isError(){
      if(this.isError){
        this.isSuccess = false
      }
    },
  },

  methods: {
    change() {
      var o_password = this.old_password
      var n_password = this.new_password
      var confirm_new_password = this.confirm_new_password
      // var token = this.$store.state.token
      if(n_password === confirm_new_password){

        if(n_password === o_password){
          this.msg = "Current password and new password can not be same!"
          this.ismsg = true
          this.isError = true
        }
        else{
          axios
          .put(this.$store.state.password_end_point, {
            old_password: this.old_password,
            new_password: this.new_password
          },
          {
            headers: this.headers
          })
          .then(response => {
            console.log(response)
            this.msg = response.data
            this.ismsg = true
            this.isSuccess = true
            // this.$router.push('/')
          })
          .catch(error => {
            console.log(error)
            this.ismsg = true
            this.isError = true
            this.msg = "**Invalid Current Password"
          })
        }
      }
    },

    reset() {
      this.old_password = ''
      this.new_password = ''
      this.confirm_new_password = ''
    }
  },

  mounted() {
    document.title = "Password Change"
    localStorage.setItem('last_URL','/password')
    // this.$store.state.drawer = true
  }
}
</script>

<style lang="css" scoped>
</style>
