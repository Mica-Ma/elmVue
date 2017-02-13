// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import MintUI from 'mint-ui';
// import { Cell, Checklist } from 'mint-ui';
// import 'mint-ui/lib/style.css';
// import VueRouter from './router'

Vue.use(MintUI);
// Vue.use(VueRouter)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
});
