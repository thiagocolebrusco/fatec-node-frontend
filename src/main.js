import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import VueRouter from 'vue-router'
import router from './router'
import axios from 'axios'

let my_axios = axios.create({
  baseURL: "http://localhost:8000"
})


my_axios.interceptors.request.use(config => {
  config.headers.common.token = localStorage.token
  return config;
}, error => {
  return Promise.reject(error);
});


my_axios.interceptors.response.use((response) => {
    return response;
  }, 
  (error) => {
  if (error.response){
      let status = error.response.status;

      if(status == 401) {
          router.push("/login");
      } 
  }
  
  return Promise.reject(error);
});

Vue.prototype.$http = my_axios


Vue.use(VueRouter)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
