// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from './axios'

Vue.config.productionTip = false
let hostName=window.location.hostname;
let $storage = {
    save(key,value){
      localStorage.setItem(key,JSON.stringify(value));
    },
    fetch(key){
      return JSON.parse(localStorage.getItem(key)) || [];
    }
};

// let $http = axios.create({

// });


if(hostName=='caomeidd-pe.api.pengjisoft.com'){
  Vue.prototype.$globalUrl="http://caomeidd-pe.api.pengjisoft.com/shop-api/";
  Vue.prototype.$globalUrlFile="http://caomeidd-pe.api.pengjisoft.com/resource/";
  console.log('Server Mode');
}else{
  Vue.prototype.$globalUrl="http://caomeidd-pe.api.pengjisoft.com/shop-api/";
  Vue.prototype.$globalUrlFile="http://caomeidd-pe.api.pengjisoft.com/resource/";
  console.log('Debug Mode');
}

// $http.defaults.withCredentials=true;
// Vue.prototype.$http = $http;

Vue.prototype.$storage=$storage;






/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  axios,
  components: { App },
  template: '<App/>'
})
