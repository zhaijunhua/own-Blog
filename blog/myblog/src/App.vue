<template>
  <div id="app">
    <top-bar></top-bar>
    <div id="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
import './util/background.js';
import blog from './components/blog/index.vue';
import topbar from './components/nav/index.vue';
export default {
  name: 'App',
  components: {
    blog,
    'top-bar':topbar
  }
}
</script>

<style lang="scss">
#app {
  width: 100%;
  position: absolute;
  margin: 0 auto;
  height: 100%;
  #container{
    width: 80%;
    margin: 20px auto;
  }
}
</style>
