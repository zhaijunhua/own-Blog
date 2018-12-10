<template>
  <div id="app">
    <topBar/>
    <div id="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
import blog from './components/blog/index.vue';
import topBar from './components/nav/index.vue';
export default {
  name: 'App',
  components: {
    blog,
    topBar
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
