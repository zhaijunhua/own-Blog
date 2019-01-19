import Vue from 'vue';
import Router from 'vue-router';
import login from '../components/login/index';
import portal from '../components/portal/index';
import pmessage from '../components/message/index';
import editmyself from '../components/editmyself/index';
import addsentence from '../components/addsentence/index';
import writeblog from '../components/writeblog/index';
import manageblog from '../components/manageblog/index';
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login',
      name: 'login',
    },
    {
      path: '/login',
      component: login,
    },
    {
      path: '/portal',
      name: 'portal',
      component: portal,
      redirect: '/message',
      children: [
        {
          path: '/message',
          name: 'message',
          component: pmessage
        },
        {
            path: '/editmyself',
            name: 'editmyself',
            component: editmyself
        },
        {
          path: '/addsentence',
          name: 'addsentence',
          component: addsentence
        },
        {
          path: '/writeblog',
          name: 'writeblog',
          component: writeblog
        },
        {
          path: '/manageBlog',
          name: 'manageBlog',
          component: manageblog
        }
      ]
    }
  ]
});
