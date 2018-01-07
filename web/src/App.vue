<template>
  <div id="app">
    <div class="menu">
      <div class="title">
        <h3>Dort</h3>
      </div>
      <div class="project">
        <span>demo</span>
        <i class="iconfont icon-download"></i>
      </div>
      <FileTree class="files" />
    </div>
    <div class="content">
    </div>
    <Connection class="socket"/>
  </div>
</template>

<script>
import Connection from './components/Connection'
import FileTree from './components/FileTree'

export default {
  name: 'app',
  components: {
    Connection,
    FileTree
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
  font-family: Helvetica, Arial, sans-serif;
  .menu {
    flex: 0 0 250px;
    background: rgb(28, 28, 29);
    color: #fff;
    .title {
      height: 50px;
      h3 {
        text-align: center;
        margin: 0;
        line-height: 50px;
        font-size: 28px;
        font-weight: 300;
      }
    }
    .project {
      height: 40px;
      display: flex;
      justify-content: space-between;
      padding: 0 20px;
      background: rgb(42, 42, 42);
      span {
        line-height: 40px;
        opacity: .6;
        font-size: 14px;
        font-weight: 300;
      }
      i {
        cursor: pointer;
        line-height: 40px;
        font-size: 20px;
        opacity: .6;
        &:hover {
          color: #4bd1c5;
          opacity: 1;
        }
      }
    }
    .files {
      height: calc(100% - 90px);
    }
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

