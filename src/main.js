// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import MintUI from 'mint-ui';
// import { Cell, Checklist } from 'mint-ui';
// import 'mint-ui/lib/style.css';
import './common/sass/index.scss';
import VueRouter from 'vue-router';
import axios from 'axios';
import VueAxios from 'vue-axios';
// import routes from './router';

// import vueTap from 'v-tap'
// import fastclick from 'fastclick'
// import Vuex from 'vuex'

import Goods from './components/goods/goods';
import Ratings from './components/ratings/ratings';
import Seller from './components/seller/seller';

// import FastClick from 'fastclick';
// FastClick.attach(document.body);
// Vue.use(vueTap)
Vue.use(MintUI);
Vue.use(VueRouter);
Vue.use(VueAxios, axios)

// Vue.use(Vuex)

// const store = new Vuex.Store({
//   state: {
//     count: 0
//   },
//   // 添加的商品元素
//   addCartEl: {},
//   mutations: {
//     increment(state) {
//       state.count++
//     }
//   }
// })

const routes = [
    // { path: '/', component: Goods },
    { path: '/goods', component: Goods },
    { path: '/ratings', component: Ratings },
    { path: '/seller', component: Seller },
    { path: '*', component: Goods }
];

const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    routes,
    linkActiveClass: 'active'
});
// router.go('/goods');
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    // store,
    template: '<App/>',
    components: { App },
    data: {
        eventHub: new Vue()
    }
});
// router.push('goods');
