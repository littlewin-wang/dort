<template>
  <div id="app">
    <img src="./assets/logo.png">
    <HelloWorld/>
    <Connection />
    <Icon extension="json" />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import Connection from './components/Connection'
import Icon from './components/FileTree/Icon'

export default {
  name: 'app',
  components: {
    HelloWorld,
    Connection,
    Icon
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
