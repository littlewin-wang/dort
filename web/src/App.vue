<template>
  <div id="app">
    <img src="./assets/logo.png">
    <HelloWorld/>
    <Connection />
    <File :content="content" />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import Connection from './components/Connection'
import File from './components/FileTree/File'

export default {
  name: 'app',
  components: {
    HelloWorld,
    Connection,
    File
  },
  data () {
    return {
      content: {
        extension: 'js',
        name: 'text.js'
      }
    }
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
