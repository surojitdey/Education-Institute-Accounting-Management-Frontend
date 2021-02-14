import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'

import store from './store.js'
import Overview from './views/Overview.vue'
import Student from './views/Student'
import StudentForm from './views/StudentForm'
import LoginPage from './views/LoginPage'
import Register from './views/Register'
import Password from './views/PasswordChange'
import Settings from './views/Settings'
import ExamFeeSettings from './views/exam_fee_setting'
import Admission from './views/Admission'
import Examination from './views/Examination'
import SpotAdmission from './views/spot_admission_settings'
import Report from './views/ReportGeneration'
import Prospectus from './views/forms_and_prospectus'
import HostelSettings from './views/HostelFeeSettings'
import HostelAdmission from './views/HostelAdmission'

Vue.use(Router)

let router =  new Router({
  // mode: 'history',
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/report',
      name: 'report',
      component: Report,
      meta: {
        requiresAuth: true,
        title: 'Report Generator'
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        title: 'Register'
      }
    },
    {
      path: '/signin',
      name: 'signin',
      component: LoginPage,
      meta: {
        title: 'Sign In'
      }
    },
    {
      path: '/',
      name: 'overview',
      component: Overview,
      meta: {
        requiresAuth: true,
        title: 'Overview'
      }
    },
    {
      path: '/student',
      name: 'student',
      component: Student,
      meta: {
        requiresAuth: true,
        title: 'Student'
      }
    },
    {
      path: '/studentform',
      name: 'studentform',
      component: StudentForm,
      meta: {
        requiresAuth: true,
        title: 'New Student Form'
      }
    },
    {
      path: '/password',
      name: 'password',
      component: Password,
      meta: {
        requiresAuth: true,
        title: 'Password'
      }
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings,
      meta: {
        requiresAuth: true,
        title: 'Admission Fee Setting'
      }
    },
    {
      path: '/exam_settings',
      name: 'exam_settings',
      component: ExamFeeSettings,
      meta: {
        requiresAuth: true,
        title: 'Examination Fee Setting'
      }
    },
    {
      path: '/spot_admission_setting',
      name: 'spot_admission_setting',
      component: SpotAdmission,
      meta: {
        requiresAuth: true,
        title: 'Spot Admission Fee Setting'
      }
    },
    {
      path: '/admission',
      name: 'admission',
      component: Admission,
      meta: {
        requiresAuth: true,
        title: 'Admission'
      }
    },
    {
      path: '/examination',
      name: 'examination',
      component: Examination,
      meta: {
        requiresAuth: true,
        title: 'Examination'
      }
    },
    {
      path: '/prospectus',
      name: 'prospectus',
      component: Prospectus,
      meta: {
        requiresAuth: true,
        title: 'Prospectus'
      }
    },
    {
      path: '/hostel-fee',
      name: 'hostel-fee',
      component: HostelSettings,
      meta: {
        requiresAuth: true,
        title: 'hostel-fee'
      }
    },
    {
      path: '/hostel-admission',
      name: 'hostel-admission',
      component: HostelAdmission,
      meta: {
        requiresAuth: true,
        title: 'hostel-admission'
      }
    },
    {
      path: '*',
      redirect: '/',
    },
  ]
})


router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      if(to.name){
        NProgress.start()
      }
      next()
      return
    }
    next('/signin')
  } else {
    next()
  }
})

// router.afterEach((to, from) => {
//   NProgress.done()
// })


export default router
