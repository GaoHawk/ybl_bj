// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Router from 'vue-router'
import store from './vuex/store'
import MintUi from 'mint-ui'
import { sync } from 'vuex-router-sync'
import axios from 'axios'
import VueAxios from 'vue-axios'
import dirFocus from './directive/focus.vue'
import $ from 'jquery'
// import btn from './components/button.vue'
// import myDrag from './directive/dragEvent.vue'

Vue.prototype.$http = axios;
Vue.directive(dirFocus.name,dirFocus);
// Vue.directive(myDrag.name,myDrag);

Vue.config.productionTip = false

Vue.use(Router)
Vue.use(VueAxios,axios)
Vue.use(MintUi)
sync(store,router);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  store,
  components: { App }
})
