import Vue from 'vue';
import Router from 'vue-router';
import login from '../components/login/index';
import portal from '../components/portal/index';
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/portal',
      name: portal,
      component: portal
    }
  ]
});
