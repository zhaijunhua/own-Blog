import Vue from 'vue';
import Router from 'vue-router';
// import blog from '../components/blog/index.vue';
// import blogarticle from '../components/article/index.vue';
// import aboutme from '../components/about/index.vue';
// import sentence from '../components/sentence/index.vue';
// import mesboard from '../components/mesboard/index.vue';

const blog = resolve => require(['../components/blog/index.vue'], resolve);
const blogarticle = resolve => require(['../components/article/index.vue'], resolve);
const aboutme = resolve => require(['../components/about/index.vue'], resolve);
const sentence = resolve => require(['../components/sentence/index.vue'], resolve);
const mesboard = resolve => require(['../components/mesboard/index.vue'], resolve);
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: blog
    },
    {
      path: '/blogarticle',
      name: 'blogarticle',
      component: blogarticle
    },
    {
      path: '/sentence',
      name: 'sentence',
      component: sentence
    },
    {
      path: '/aboutme',
      name: 'aboutme',
      component: aboutme
    },
    {
      path: '/mesboard',
      name: 'mesboard',
      component: mesboard
    }
  ]
});
