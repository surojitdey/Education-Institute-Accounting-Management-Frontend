<template>
  <div class="register">
    <v-content>
      <v-container fluid class="fill-height">
        <v-row justify="center" align="center">
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat>
                <v-toolbar-title>User Registration</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
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
                    prepend-icon="lock"
                    v-model="password"
                    ref="password"
                    :append-icon="show1 ? 'visibility' : 'visibility_off'"
                    :type="show1 ? 'text' : 'password'"
                    @click:append="show1 = !show1"
                    :rules= "[rules.required]"
                    required
                  ></v-text-field>

                  <v-text-field
                    id="confirm_password"
                    label="Confirm Password"
                    name="confirm_password"
                    prepend-icon="lock"
                    v-model="confirm_password"
                    :append-icon="show2 ? 'visibility' : 'visibility_off'"
                    :type="show2 ? 'text' : 'password'"
                    @click:append="show2 = !show2"
                    :rules= "[rules.required, rules.passwordMatched]"
                    required
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn color="primary" @click="register">Register</v-btn>
                <v-spacer></v-spacer>
                <v-btn text color="primary" router to="/signin">Sign in</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      confirm_password: '',
      // isPasswordGiven: false,
      show1: false,
      show2: false,
      rules: {
        required: value => !!value || 'Required',
        passwordMatched: value => value === this.password || 'Confirm Password did not matched with Password field!',
      }
    }
  },
  methods: {
    register() {
      var username = this.username
      var password = this.password
      var confirm_password = this.confirm_password
      var is_superuser = true
      var is_staff = true
      if(password === confirm_password){
        this.$store.dispatch('register',{ username, password, is_superuser, is_staff})
        .then(() => this.$router.push('/signin'))
        .catch(error => console.log(error))
      }
    }
  },
  created() {
    // console.log(passwordMatched);
  },
  mounted() {
    document.title = "Register"
  }
}
</script>

<style lang="css" scoped>
</style>
