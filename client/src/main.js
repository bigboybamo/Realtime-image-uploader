import Vue from 'vue'
import App from './App.vue'
import Vodal from 'vodal';

Vue.component(Vodal.name, Vodal);

new Vue({
  el: '#app',
  render: h => h(App)
})
