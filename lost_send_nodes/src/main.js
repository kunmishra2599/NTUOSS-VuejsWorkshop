import Vue from 'vue'
import VueFire from 'vuefire'


import App from './App'

Vue.use(VueFire)

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
