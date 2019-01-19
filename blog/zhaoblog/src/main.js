// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import vueInfiniteScroll from 'vue-infinite-scroll'
import axios from 'axios'
import './assets/css/common.css'
import marked from 'marked';
import  hljs from 'highlight.js';
import 'highlight.js/styles/monokai.css';
marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  highlight: function(code, lang) {
      if (lang && hljs.getLanguage(lang)) {
          return hljs.highlight(lang, code, true).value;
      } else {
          return hljs.highlightAuto(code).value;
      }
  }
});
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(vueInfiniteScroll)
Vue.prototype.$axios = axios
Vue.prototype.marked = marked
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
