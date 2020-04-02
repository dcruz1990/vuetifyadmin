import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import vueDebounce from 'vue-debounce'

Vue.config.productionTip = false

Vue.use(vueDebounce, {
  listenTo: ['input', 'keyup'],
  
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
