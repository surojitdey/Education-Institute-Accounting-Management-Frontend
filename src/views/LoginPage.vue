<template>
  <div class="login">
    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Sign In</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form id="login_form" @submit.prevent="login">
                  <v-text-field
                    label="Username"
                    name="login"
                    prepend-icon="person"
                    type="text"
                    v-model="username"
                    :rules= "[rules.required]"
                    required
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    :append-icon="show ? 'visibility' : 'visibility_off'"
                    :type="show ? 'text' : 'password'"
                    @click:append="show = !show"
                    :rules= "[rules.required]"
                    prepend-icon="lock"
                    v-model="password"
                    required
                  ></v-text-field>
                  <v-checkbox v-model="remember_me" label="Remember Me"></v-checkbox>
                </v-form>
              </v-card-text>
              <!-- <v-progress-circular v-if="isLoading" indeterminate color="grey" :button="true"></v-progress-circular>               -->
              <v-card-text v-if="loginError">
                <span class="red--text">**Log in credentials are invalid!</span>
              </v-card-text>
              <v-card-actions>
                <v-btn type="submit" color="primary" form="login_form">
                  Sign In
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn text color="primary" router to="/register" :disabled="showRegister">Register</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    <v-overlay :value="isLoading">
      <v-progress-circular indeterminate color="grey darken-3" size="30"></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      username: localStorage.getItem('jist_username') || '',
      password: localStorage.getItem('jist_password') || '',
      show: false,
      rules: {
        required: value => !!value || 'Required',
      },
      showRegister: false,
      // errors: '',
      loginError: false,
      isLoading: false, // used for showing the loading or spin icon in the sinin in button.
      remember_me: true,
      redirect_url: this.$store.state.last_URL,
    }
  },
  watch: {
    loginError() {
      this.loginError = this.$store.state.isLoginError
    }
  },

  methods: {
    login() {
      this.isLoading = true
      var username = this.username
      var password = this.password
      var client_id = this.$store.state.client_id
      var client_secret = this.$store.state.client_secret
      // var token_end_point = this.$store.state.token_end_point
      // var signinInfo_end_point = this.$store.state.signinInfo_end_point
      this.$store.dispatch('login',{ username, password, client_id, client_secret })
      // .then(() => this.$router.push('/'))
      .then(() => {
        this.isLoading = false
        this.loginError = this.$store.state.isLoginError
        if(this.remember_me){
          localStorage.setItem('jist_username', username)
          localStorage.setItem('jist_password', password)
        }
        else{
          localStorage.removeItem('jist_username')
          localStorage.removeItem('jist_password')
        }
        this.$router.push(this.redirect_url, () => {})
      })
      .catch(error => {
        this.isLoading = false
        this.loginError = true
        // console.log('*********');
        // this.errors = error
        // localStorage.removeItem('token')
      })
    }
  },

  created() {
    // LOCAL
    axios({url: this.$store.state.user_end_point, method: 'GET'})
    // SERVER
    // axios({url: 'https://alegralabs.com:8802/api/v1/user/', method: 'GET'})
    .then(response => {
      if(response.data.length){
        this.showRegister = true
      }
    })
  },
  mounted() {
    document.title = "Sign In"
    // showRegister: this.$store.state.userExist
  }
}
</script>

<style lang="css" scoped>
</style>
