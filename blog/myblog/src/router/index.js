import Vue from 'vue'
import Router from 'vue-router'
import blog from '../components/blog/index.vue';
import article from '../components/article/index.vue';
import aboutme from '../components/about/index.vue';
import sentence from '../components/sentence/index.vue';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: blog
    },
    {
      path: '/article',
      name: 'article',
      component: article
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
    }
  ]
})
