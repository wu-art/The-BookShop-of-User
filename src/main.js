// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUi);

import axios from 'axios'
Vue.prototype.$http = axios;
axios.defaults.baseURL = "http://localhost:8088/BookShop";
axios.defaults.withCredentials=true;
//请求拦截器
axios.interceptors.request.use(function(config){
	if(sessionStorage.getItem("token")){
		config.headers.common['token'] = sessionStorage.getItem("token");
	}
	return config;
},function(error){
	return Promise.reject("error");
});

Vue.config.productionTip = false

import Vuex from 'vuex'
Vue.use(Vuex);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
