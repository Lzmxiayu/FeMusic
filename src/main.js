// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
// import $ from 'jquery'
Vue.config.productionTip = false

// import './assets/bootstrap/bootstrap.min.css'
// import './assets/bootstrap/bootstrap.min'


axios.defaults.baseURL="http://112.74.174.104:3000"

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  beforeCreate(){
    Vue.prototype.$bus = this
  } 
})
