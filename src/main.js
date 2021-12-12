// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'
import axios from 'axios'
import VueLazyload from 'vue-lazyload'
// import $ from 'jquery'
Vue.config.productionTip = false

Vue.use(VueLazyload, {
  loading: require('./assets/loading.gif'),//加载中图片，一定要有，不然会一直重复加载占位图
  error: require('./assets/none.jpg')  //加载失败图片
});
// import './assets/bootstrap/bootstrap.min.css'
// import './assets/bootstrap/bootstrap.min'


axios.defaults.baseURL="http://112.74.174.104:3000"
// axios.defaults.baseURL="http://localhost:3000"

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  beforeCreate(){
    Vue.prototype.$bus = this
  } 
})
