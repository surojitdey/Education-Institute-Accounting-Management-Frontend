import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
// import 'material-design-icons/iconfont/material-icons.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import NProgress from 'nprogress'
import VueHtmlToPaper from 'vue-html-to-paper'
import excel from 'vue-excel-export'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use(excel)

const options = {
  name: '_blank',
  specs: [
    'fullscreen=no',
    'titlebar=no',
    'scrollbars=no'
  ],
  styles: [
    'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
    // 'https://unpkg.com/kidlat-css/css/kidlat.css',
    'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900',
    'https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.min.css',
    'https://cdn.jsdelivr.net/npm/@mdi/font@4.x/css/materialdesignicons.min.css',
    'css/recipt.css',
  ]
}
Vue.use(VueHtmlToPaper, options)
// Vue.prototype.$http = require('axios');
// const token = localStorage.getItem('token')

// if (token) {
//   // Vue.prototype.$http.defaults.headers.common['Authorization'] = token
// }

new Vue({
  router,
  store,
  vuetify,
  NProgress,
  render: h => h(App)
}).$mount('#app')
