<template>
  <nav>
    <v-app-bar flat app color="accent-4" clipped-left elevation="2">
      <v-btn icon @click="drawer = !drawer">
        <v-icon>menu</v-icon>
      </v-btn>
      <v-spacer></v-spacer>

      <div class="grey--text text--darken-2 welcomeMessage" v-if="isLoggedIn">Welcome <span class="font-weight-bold">Admin</span></div>
      <v-divider vertical class="pr-4"></v-divider>


      <!-- <v-btn text nuxt> -->
      <v-btn text nuxt v-if="isLoggedIn" @click="logout">
        <span text-capitalize>Sign Out</span>
        <v-icon right>exit_to_app</v-icon>
      </v-btn>
    </v-app-bar>

    <div v-if="isLoggedIn">
      <v-navigation-drawer app clipped class="navDrawerBorder" v-model="drawer">
        <v-list>
          <v-list-item class="navDrawerItem" v-for="link in links" :key="link.text" router :to="link.route">
            <v-list-item-action>
              <v-icon class="grey--text text--darken-2">{{ link.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="grey--text text--darken-2 text-uppercase">{{ link.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-group
          v-for="group_item in list_group"
          :key="group_item.title"
          :prepend-icon="group_item.action"
          append-icon="expand_more"
          :value="active"
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title v-text="group_item.title" class="text-uppercase"></v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item class="navDrawerItem" v-for="link in group_item.items" :key="link.text" router :to="link.route">
              <v-list-item-icon>
                <v-icon class="grey--text text--darken-2">{{ link.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="grey--text text--darken-2 text-uppercase">{{ link.text }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </v-list>
      </v-navigation-drawer>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      logo_url: '',
      drawer: this.$store.state.drawer,
      links: [
        { icon: 'dashboard', text: 'Overview', route: '/'},
        { icon: 'person', text: 'Students', route: '/student'},
        { icon: 'book', text: 'examination', route: '/examination'},
        { icon: 'person_add', text: 'Admission', route: '/admission'},
        { icon: 'apartment', text: 'Hostel Admission', route: '/hostel-admission'},
        { icon: 'notes', text: 'Forms and Prospectus', route: '/prospectus'},
        { icon: 'report', text: 'Report Generation', route: '/report'},
      ],
      account_links: [
        { icon: 'lock', text: 'Password', route: '/password'},
      ],
      settings_links: [
        { icon: 'person_add', text: 'Admission Fee', route: '/settings'},
        { icon: 'mdi-library-books', text: 'Examination Fee', route: '/exam_settings'},
        { icon: 'apartment', text: 'Hostel Fee', route: '/hostel_fee_setting'},
        { icon: 'person_add', text: 'Spot Admission Fee', route: '/spot_admission_setting'},
      ],
      setting_active: false,
      account_active: false,
      active: false,

      list_group: [
        {
          action: 'settings',
          active: false,
          title: 'Settings',
          items: [
            { icon: 'person_add', text: 'Admission Fee', route: '/settings'},
            { icon: 'book', text: 'Examination Fee', route: '/exam_settings'},
            { icon: 'apartment', text: 'Hostel Fee', route: '/hostel-fee'},
            { icon: 'person_add', text: 'Spot Admission Fee', route: '/spot_admission_setting'},
          ]
        },
        {
          action: 'account_circle',
          title: 'Account',
          items: [
            { icon: 'lock', text: 'Password', route: '/password'},
          ]
        },
      ],
    }
  },

  mounted() {
    this.logo_url = this.$store.state.logo_url
  },

  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn
    },
    isPassword: function() {
      return this.$store.getters.isPassword
    },
  },

  watch: {
    setting_active(){
      if(this.account_active){
        this.account_active = false
      }
    },
    account_active(){
      if(this.setting_active){
        this.setting_active = false
      }
    },
  },

  methods: {
    logout() {
      var token = this.$store.state.token
      var client_id = this.$store.state.client_id
      var client_secret = this.$store.state.client_secret
      localStorage.setItem('last_URL','/')
      this.$store.dispatch('logout',{token, client_id, client_secret})
      .then(() => {
        this.$router.push('/signin')
      })
    }
  },

}
</script>

<style lang="css" scoped>
 .welcomeMessage {
   font-size: 16px;
 }
 .navDrawerItem.v-list-item--active {
   border-right: 4px solid #1976d2;
 }
</style>
