import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './store/store'
import {routes, scrollBehavior} from './routes/Routes'
import App from './App';
Vue.use(VueRouter);



const router = new VueRouter({
	mode: 'history',
	base: __dirname,
	routes
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: xx => xx(App)
})
