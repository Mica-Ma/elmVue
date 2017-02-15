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

import Goods from './components/goods/goods';
import Ratings from './components/ratings/ratings';
import Seller from './components/seller/seller';

Vue.use(MintUI);
Vue.use(VueRouter);
Vue.use(VueAxios, axios)

const routes = [
    // { path: '/', component: Goods },
    { path: '/goods', component: Goods },
    { path: '/ratings', component: Ratings },
    { path: '/seller', component: Seller }
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
    template: '<App/>',
    components: { App }
});
router.push('goods');
