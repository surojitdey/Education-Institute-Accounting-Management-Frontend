import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user: {},



    refresh_token: localStorage.getItem('refresh_token') || '',
    errorOccure: false,
    passwordMenu: true,
    isLoginError: false,
    last_URL: localStorage.getItem('last_URL') || '/',
    // drawer: true,

    // LOCAL
    client_id: 'cgVe4jHh7yIHrdaV6NHaUgsxTcIEdNfOpr61cLRu',
    client_secret: 'ooFnMZYuMck1buU709RZcxYURlv1Q1sHoFoHKsJFHkErXkJ4Vl1SnPveWVQY6vcXqx6NvXgbiSXBVrcg4awg7Qwf0PRMDBSpIDuTTf2YIqU4VkTf7fWV4FnRHJ4daCs4',
    // client_id: 'pTr4MjMxX0caP35a2fR71noVOlYVc5wi6XZJR7Ig',
    // client_secret: 'o6zmJrdvVuiwxjfpoKF2hwmqlNHO9NPt7cD1a3nkWWufRGtomLIBJBDsIMDBQrtmsjwpZPi4pjPktIiqmIkN02sMsfVpSq3OaU52xurzBOe1ZcqUJrgn37S3wnHK4DW6',
    // logo_url: '/dist/logo.jpg',
    logo_url: '/logo.jpg',
    login_end_point: 'http://127.0.0.1:8000/api/v1/token/',
    register_end_point: 'http://127.0.0.1:8000/api/v1/user/',
    logout_end_point: 'http://127.0.0.1:8000/api/v1/revoke_token/',
    student_end_point: 'http://127.0.0.1:8000/api/v1/student/',
    depertment_end_point: 'http://127.0.0.1:8000/api/v1/depertment/',
    branch_end_point: 'http://127.0.0.1:8000/api/v1/branch/',
    user_end_point: 'http://127.0.0.1:8000/api/v1/user/',
    password_end_point: 'http://127.0.0.1:8000/api/v1/password/',
    token_end_point: 'http://127.0.0.1:8000/api/v1/token/',
    signinInfo_end_point: 'http://127.0.0.1:8000/api/v1/signinInfo/',
    revoke_token_end_point: 'http://127.0.0.1:8000/api/v1/revoke_token/',
    odd_semester_fees_end_point: 'http://127.0.0.1:8000/api/v1/oddsemesterfee/',
    be_fees_end_point: 'http://127.0.0.1:8000/api/v1/befee/',
    admission_end_point: 'http://127.0.0.1:8000/api/v1/admission/',
    exam_fee_end_point: 'http://127.0.0.1:8000/api/v1/examfee/',
    spot_admission_fee_end_point: 'http://127.0.0.1:8000/api/v1/spotfee/',
    examination_end_point: 'http://127.0.0.1:8000/api/v1/examination/',
    compartmental_end_point: 'http://127.0.0.1:8000/api/v1/compartmental/',
    betterment_end_point: 'http://127.0.0.1:8000/api/v1/betterment/',
    transfer_end_point: 'http://127.0.0.1:8000/api/v1/transfer/',
    prospectus_end_point: 'http://127.0.0.1:8000/api/v1/prospectus/',
    get_branch_end_point: 'http://127.0.0.1:8000/api/v1/get_branch/',
    get_depertment_id_end_point: 'http://127.0.0.1:8000/api/v1/get_department_id/',
    get_studnets_end_point: 'http://127.0.0.1:8000/api/v1/get_students/',
    hostel_fee_end_point: 'http://127.0.0.1:8000/api/v1/hostel-fee-setting/',
    hostel_admission_end_point: 'http://127.0.0.1:8000/api/v1/hostel-admission/',
    odd_semester_hostel_fee: 'http://127.0.0.1:8000/api/v1/get-odd-hostel-fee/',
    even_semester_hostel_fee: 'http://127.0.0.1:8000/api/v1/get-even-hostel-fee/',
    get_depertment_details_end_point: 'http://127.0.0.1:8000/api/v1/get_department_details/',

    // spot_roll_number: localStorage.getItem('spot_admission_roll_number') || '',
    spot_roll_number: '',

    // SERVER
    // logo_url: '/surojit/JIST/dist/logo.jpg',
    // client_id: 'hwCG9o2loOFhO04d6zUP8MpzzvkMwLsbRn7eVhl7',
    // client_secret: 'ZLvWuSRIOC76xnArTNbo2EnV9bdX7e7y8A6wan5loikc45vcqbBbE1C4J3v6syKtxRYeVEyUiZb77Q4ricX4vVxmPbWC2Eq8vcpkyE6MbW0wNmhIhYwxNo9lHaoovgpt',
    // login_end_point: 'https://alegralabs.com:8802/api/v1/token/',
    // register_end_point: 'https://alegralabs.com:8802/api/v1/user/',
    // logout_end_point: 'https://alegralabs.com:8802/api/v1/revoke_token/',
    // student_end_point: 'https://alegralabs.com:8802/api/v1/student/',
    // depertment_end_point: 'https://alegralabs.com:8802/api/v1/depertment/',
    // branch_end_point: 'https://alegralabs.com:8802/api/v1/branch/',
    // user_end_point: 'https://alegralabs.com:8802/api/v1/user/',
    // password_end_point: 'https://alegralabs.com:8802/api/v1/password/',
    // token_end_point: 'https://alegralabs.com:8802/api/v1/token/',
    // signinInfo_end_point: 'https://alegralabs.com:8802/api/v1/signinInfo/',
    // revoke_token_end_point: 'https://alegralabs.com:8802/api/v1/revoke_token/',
    // odd_semester_fees_end_point: 'https://alegralabs.com:8802/api/v1/oddsemesterfee/',
    // be_fees_end_point: 'https://alegralabs.com:8802/api/v1/befee/',
    // admission_end_point: 'https://alegralabs.com:8802/api/v1/admission/',
    // exam_fee_end_point: 'https://alegralabs.com:8802/api/v1/examfee/',
    // spot_admission_fee_end_point: 'https://alegralabs.com:8802/api/v1/spotfee/',
    // examination_end_point: 'https://alegralabs.com:8802/api/v1/examination/',
    // compartmental_end_point: 'https://alegralabs.com:8802/api/v1/compartmental/',
    // betterment_end_point: 'https://alegralabs.com:8802/api/v1/betterment/',
    // transfer_end_point: 'https://alegralabs.com:8802/api/v1/transfer/',
    // prospectus_end_point: 'https://alegralabs.com:8802/api/v1/prospectus/',

    admitted_students_data: [],
    examination_students_data: [],
    student_id: '',
    hostel_fee: [],
    hostel_admission_data: [],
    odd_semester_hostel_fee_data: [],
    even_semester_hostel_fee_data: [],
    depertment_details: {},
  },

  mutations: {
    auth_request(state) {
      state.status = 'loading'
    },

    auth_success(state, token, refresh_token) {
      state.status = 'success'
      state.token = token
      state.refresh_token = refresh_token
      // state.user = user
    },

    auth_error(state) {
      state.status = 'error'
      state.isLoginError = true
    },
    logout(state) {
      state.status = ''
      state.token = ''
    },
    set_spot_roll_number(state, roll_number) {
      Vue.set(state, 'spot_roll_number', roll_number)
    },
    set_admitted_students_data(state, data) {
      Vue.set(state, 'admitted_students_data', [...data])
    },
    set_examination_students_data(state, data) {
      Vue.set(state, 'examination_students_data', [...data])
    },
    set_student_id(state, id) {
      Vue.set(state, 'student_id', id)
    },
    set_branch(state, branch) {
      Vue.set(state, 'branch', [...branch])
    },
    set_hostel_fee(state, hostel_fee) {
      Vue.set(state, 'hostel_fee', [...hostel_fee])
    },
    set_hostel_admission_data(state, hostel_admission_data) {
      Vue.set(state, 'hostel_admission_data', [...hostel_admission_data])
    },
    set_odd_semester_hostel_data(state, odd_semester_hostel_fee_data) {
      Vue.set(state, 'odd_semester_hostel_fee_data', [...odd_semester_hostel_fee_data])
    },
    set_even_semester_hostel_data(state, even_semester_hostel_fee_data) {
      Vue.set(state, 'even_semester_hostel_fee_data', [...even_semester_hostel_fee_data])
    },
    set_depertment_details(state, depertment) {
      Vue.set(state.depertment_details, 'dept_name', depertment.dept_name)
      Vue.set(state.depertment_details, 'dept_short', depertment.dept_short)
    }
  },

  actions: {
    login({commit, state}, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        // axios({url: 'http://127.0.0.1:8000/api/v1/token-auth/', data: user, method: 'POST'})
        // LOCAL
        axios({url: state.login_end_point, data: user, method: 'POST'})

        // SERVER
        // axios({url: 'https://alegralabs.com:8802/api/v1/token/', data: user, method: 'POST'})

        .then(response => {
          if(response.data.error){
            console.log('store.js in response.data.error',response.data.error);
            commit('auth_error')
            resolve(response)
          }
          else{
            const token = response.data.access_token
            const refresh_token = response.data.refresh_token

            localStorage.setItem('token', token)
            localStorage.setItem('refresh_token', refresh_token)
            axios.defaults.headers.common['Authorization'] = token
            // commit('auth_success', token, refresh_token, user)
            commit('auth_success', token, refresh_token)
            resolve(response)
          }
        })
        .catch(error => {
          // const isLoginError = true
          commit('auth_error')
          console.log(error);
          // console.log(isLoginError);
          localStorage.removeItem('token')
          reject(error)
        })
      })
    },

    register({commit, state}, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        // LOCAL
        axios({url: state.register_end_point, data: user, method: 'POST' })
        // SERVER
        // axios({url: 'https://alegralabs.com:8802/api/v1/user/', data: user, method: 'POST' })
        .then(resp => {
          console.log(resp);
          resolve(resp)
        })
        .catch(err => {
          reject(err)
        })
      })
    },

    logout({commit, state}, token) {
      return new Promise((resolve, reject) => {
        commit('logout')
        // LOCAL
        axios({url: state.logout_end_point, data: token, method: 'POST'})
        // SERVER
        // axios({url: 'https://alegralabs.com:8802/api/v1/revoke_token/', data: token, method: 'POST'})
        .then(response => {
          console.log(response);
          // const token = response.data.access_token
          // const user = response.data.user
          localStorage.removeItem('token')
          delete axios.defaults.headers.common['Authorization']
          resolve(response)
        })
        .catch(error => {
          commit('auth_error')
          localStorage.removeItem('token')
          reject(error)
        })
      })
    },

    fetch_admitted_students_data({ commit, state, getters }) {
      return axios.get(`${state.admission_end_point}`,{
        headers: {
          'Authorization': `Bearer ${getters.get_token}`
        }
      })
      .then((response)=>{
        commit('set_admitted_students_data', response.data)
      })
    },

    fetch_examination_students_data({ commit, state, getters }) {
      return axios.get(`${state.examination_end_point}`,{
        headers: {
          'Authorization': `Bearer ${getters.get_token}`
        }
      })
      .then((response)=>{
        commit('set_examination_students_data', response.data)
      })
    },
    
    fetch_branch({state, getters}, depertment) {
      return axios.get(`${state.get_branch_end_point}?depertment=${depertment}`, {
        headers: {
          'Authorization': `Bearer ${getters.get_token}`
        }
      })
    },

    fetch_depertment_id({state, getters}, depertment) {
      return axios.get(`${state.get_depertment_id_end_point}?depertment=${depertment}`, {
        headers: {
          'Authorization': `Bearer ${getters.get_token}`
        }
      })
    },

    fetch_students({state, getters}, depertment) {
      return axios.get(`${state.get_studnets_end_point}?depertment=${depertment}`, {
        headers: {
          'Authorization': `Bearer ${getters.get_token}`
        }
      })
    },
    fetch_hostel_fee({commit, state, getters}) {
      axios.get(`${state.hostel_fee_end_point}`, {
        headers: {
          'Authorization': `Bearer ${getters.get_token}`
        }
      })
      .then((response)=>{
        commit('set_hostel_fee', response.data)
      })
    },
    fetch_odd_semester_hostel_fee({commit, state, getters}) {
      axios.get(`${state.odd_semester_hostel_fee}`, {
        headers: {
          'Authorization': `Bearer ${getters.get_token}`
        }
      })
      .then((response)=>{
        commit('set_odd_semester_hostel_data', response.data)
      })
    },
    fetch_even_semester_hostel_fee({commit, state, getters}) {
      axios.get(`${state.even_semester_hostel_fee}`, {
        headers: {
          'Authorization': `Bearer ${getters.get_token}`
        }
      })
      .then((response)=>{
        commit('set_even_semester_hostel_data', response.data)
      })
    },
    save_hostel_fee({commit, dispatch, state, getters}, fee_data) {
      return axios({url: state.hostel_fee_end_point, 
                    data: fee_data, 
                    method: 'POST',
                    headers: {
                      'Authorization': `Bearer ${getters.get_token}`
                    }
                  })
                  .then((response) => {
                    dispatch('fetch_hostel_fee')
                  })
    },
    update_hostel_fee({commit, dispatch, state, getters}, fee_data) {
      return axios({url: state.hostel_fee_end_point + fee_data[1] + '/', 
                    data: fee_data[0], 
                    method: 'PUT',
                    headers: {
                      'Authorization': `Bearer ${getters.get_token}`
                    }
                  })
                  .then((response) => {
                    dispatch('fetch_hostel_fee')
                  })
    },
    fetch_hostel_admission_data({commit, state, getters}) {
      return axios.get(`${state.hostel_admission_end_point}`, {
        headers: {
          'Authorization': `Bearer ${getters.get_token}`
        }
      })
      .then((response)=>{
        commit('set_hostel_admission_data', response.data)
      })
    },
    save_hostel_admission_data({ dispatch, state, getters}, admission_data) {
      return axios({url: state.hostel_admission_end_point, 
                    data: admission_data, 
                    method: 'POST',
                    headers: {
                      'Authorization': `Bearer ${getters.get_token}`
                    }
                  })
                  .then((response) => {
                    dispatch('fetch_hostel_admission_data')
                  })
    },
    fetch_depertment_details({commit, state, getters}, depertment_id) {
      axios.get(`${state.get_depertment_details_end_point}?depertment_id=${depertment_id}`, {
        headers: {
          'Authorization': `Bearer ${getters.get_token}`
        }
      })
      .then((response)=>{
        commit('set_depertment_details', response.data[0])
      })
    },
  },

  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    isPassword: state => state.passwordMenu,
    isDrawer: state => state.drawer,
    get_spot_roll_number: state => state.spot_roll_number,
    get_token: state => state.token,
    get_admitted_students_data: state => state.admitted_students_data,
    get_examination_students_data: state => state.examination_students_data,
    get_student_id: state => state.student_id,
    get_branch: state => state.branch,
    get_hostel_fee: state => state.hostel_fee,
    get_hostel_data: state => state.hostel_admission_data,
    get_odd_semester_hostel_fee: state => state.odd_semester_hostel_fee_data,
    get_even_semester_hostel_fee: state => state.even_semester_hostel_fee_data,
    get_depertment_details: state => state.depertment_details
  }
})
