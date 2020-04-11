// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vant from 'vant';
import 'vant/lib/index.css';
import { Toast } from 'vant';
import axios from 'axios'
import http from "./assets/js/http";



Vue.config.productionTip = false
axios.defaults.withCredentials=true
Vue.prototype.$axios = http;
Vue.prototype.Toast = Toast;
Vue.use(Vant);

router.beforeEach((to, from, next) => {
  Toast.loading({mask: true,message: '加载中...',duration:800});
  setTimeout(()=>{
    next()
  },800)
})

Vue.filter('priceFilter',function(val){
    return (parseFloat(val)/100).toFixed(2)
})
Vue.prototype.global = function(){
  const username = sessionStorage.getItem('username')
  const phone = sessionStorage.getItem('phone')
  const balance = sessionStorage.getItem('balance')
  return {username,phone,balance}
}
Vue.prototype.Todate = function(time, format) { //Fri Oct 31 18:00:00 UTC+0800 2008
  var t = new Date(time);
  var tf = function (i) {
    return (i < 10 ? '0' : '') + i
  }
  return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
    switch (a) {
      case 'yyyy':
        return tf(t.getFullYear());
        break;
      case 'MM':
        return tf(t.getMonth() + 1);
        break;
      case 'mm':
        return tf(t.getMinutes())
        break;
      case 'dd':
        return tf(t.getDate());
        break;
      case 'HH':
        return tf(t.getHours());
        break;
      case 'ss':
        return tf(t.getSeconds())
        break;
    }
  })
}
// router.beforeEach((to, from, next) => {
//   if (to.path == '/login') {
//     sessionStorage.removeItem('username');
//   }
//   let user = sessionStorage.getItem('username');
//   if (!user && to.path != '/login') {
//     next({ path: '/login' })
//   } else {
//     next()
//   }
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
