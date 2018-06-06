import 'es5-shim'
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import './assets/element/index.css'
import '~static/cnd/font_1/iconfont.css'
import '@/assets/css/tags.scss'
import 'animate.css'
import '@/assets/css/animate.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import {dateInit} from '@/util/util'
dateInit() // 格式化日期注册
axios.defaults.baseURL = 'https://jurongtest.foxconn.com/sit'
Vue.use(VueAxios, axios)
Vue.config.productionTip = false
Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
