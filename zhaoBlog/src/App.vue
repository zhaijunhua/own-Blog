<template>
  <div id="app">
    <blog/>
  </div>
</template>

<script>
import blog from './components/blog/index.vue';
export default {
  name: 'App',
  components: {
    blog
  }
}
</script>

<style lang="scss">
$background: #fcfcff;
body{
  background: $background;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
