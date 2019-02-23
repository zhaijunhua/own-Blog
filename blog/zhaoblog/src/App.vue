<template>
  <div id="app">
    <div class="top-menu">
      <navbar/>
    </div>
    <div id="container">
      <router-view v-if="isRouterAlive"/>
    </div>
  </div>
</template>

<script>
// import './util/background.js';
import navbar from './components/nav/index.vue';
export default {
  name: 'App',
   provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      isRouterAlive: true
    };
  },
  components: {
    navbar
  },
   methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true
        console.log('reload')
      });
    }
  }
}
</script>
<style lang="scss" scoped>
#app {
  width: 100%;
  position: absolute;
  margin: 0 auto;
  height: 100%;
  #container{
    position: relative;
    top: 80px;
    width: 80%;
    margin: 20px auto;
  }
}
</style>
