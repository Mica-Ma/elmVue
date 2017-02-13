// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
;
import Vue from 'vue';
import App from './App';
import MintUI from 'mint-ui';
// import { Cell, Checklist } from 'mint-ui';
// import 'mint-ui/lib/style.css';
import VueRouter from 'vue-router';
// import VueRouter from './router';

import Goods from './components/goods';
import Ratings from './components/ratings';
import Seller from './components/seller';

Vue.use(MintUI);
Vue.use(VueRouter);

const routes = [
    { path: '/', component: Goods },
    { path: '/ratings', component: Ratings },
    { path: '/seller', component: Seller }
];

const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    routes
});

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
});
