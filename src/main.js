import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import axios from 'axios';

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')

Vue.prototype.$axios = axios.create({
  baseURL: 'http://localhost:8000'
});

