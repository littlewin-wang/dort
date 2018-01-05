<template>
  <div id="app">
    <img src="./assets/logo.png">
    <HelloWorld/>
    <connection />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import connection from './components/connection'

export default {
  name: 'app',
  components: {
    HelloWorld,
    connection
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
