<template>
  <v-app>
    <v-content class="mx-4">
      <!-- <Header></Header> -->
      <Navbar></Navbar>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
// import Header from '@/components/header'
import Navbar from '@/components/navbar'
export default {
  name: 'App',
  // delimiters: ['[[',']]'],
  components: {
    // Header,
    Navbar,
  },
  data: () => ({
    //
  }),

  created: function() {
    this.$http.interceptors.response.use(undefined, function (err) {
      return new Promise(function () {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch('logout')
        }
        throw err;
      });
    });
  },

  watch: {
    $route(to, from){
      document.title = to.meta.title || 'Jist';
    }
  }
};
</script>
