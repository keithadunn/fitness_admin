import Vue from 'vue'
import App from './modules/AppModule'
import router from './routes'
import store from './store'
import axios from 'axios'
import Vuelidate from 'vuelidate'

Vue.config.productionTip = false;
Vue.use(Vuelidate);


axios.defaults.headers.common['Authorization'] = `Bearer ${store.state.access_token}`;

// return to login if 401 error occurs
axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if(error.response.status === 401) {
    store.dispatch('logout');
    router.push('login')
  }
  return Promise.reject(error);
});

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app');
