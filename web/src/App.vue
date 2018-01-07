<template>
  <div id="app">
    <div class="menu">
      <File :content="content" :depth="depth" />
    </div>
    <div class="content">
    </div>
    <Connection class="socket"/>
  </div>
</template>

<script>
import Connection from './components/Connection'
import File from './components/FileTree/File'

export default {
  name: 'app',
  components: {
    Connection,
    File
  },
  data () {
    return {
      depth: 2,
      content: {
        extension: 'html',
        name: 'text.js'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#app {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  .menu {
    flex: 0 0 250px;
    background: rgb(28, 28, 29);
    color: #fff;
  }
  .content {
    flex: 1;
    background: rgb(23, 23, 23)
  }
  .socket {
    display: none;
  }
}
</style>

