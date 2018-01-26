<template>
  <div id="app">
    <div class="menu">
      <div class="title">
        <h3>Dort</h3>
      </div>
      <div class="project">
        <span>{{ active ? active.name : '' }}</span>
        <div class="action">
          <a :href="zipUrl" download="test.zip">
            <i class="iconfont icon-download">
              <Tooltip position="right">Download current project</Tooltip>
            </i>
          </a>
          <i class="iconfont direction" :class="this.listShow ? 'icon-up': 'icon-down'" v-if="all.projects && Object.keys(all.projects).length > 1" @click="toggleList">
            <Tooltip position="right">List all projects</Tooltip>
          </i>
        </div>
        <div class="list" v-if="all.projects" v-show="listShow">
          <div class="item" v-for="(project, index) in all.projects" :key="index" @click="changeActive(project)">
            <span>{{ project.name }}</span>
          </div>
        </div>
      </div>
      <FileTree class="files" />
    </div>
    <div class="content">
      <FileContent />
    </div>
    <Connection class="socket"/>
  </div>
</template>

<script>
import Connection from './components/Connection'
import FileTree from './components/FileTree'
import FileContent from './components/FileContent'
import Tooltip from './components/Tooltip'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'app',
  components: {
    Connection,
    FileTree,
    FileContent,
    Tooltip
  },
  data () {
    return {
      listShow: false
    }
  },
  computed: {
    ...mapGetters('project', ['active', 'all']),
    zipUrl () {
      if (this.active) {
        return `http://localhost:4574/${this.active.slug}/download`
      } else {
        return '#'
      }
    }
  },
  methods: {
    ...mapActions('project', ['setProject']),
    toggleList () {
      this.listShow = !this.listShow
    },
    changeActive (data) {
      this.setProject(data)
      this.listShow = false
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
  color: #fff;
  .menu {
    flex: 0 0 250px;
    background: rgb(34, 32, 58);
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
      position: relative;
      justify-content: space-between;
      padding: 0 20px;
      background: rgb(44, 42, 66);
      span {
        line-height: 40px;
        opacity: .6;
        font-size: 14px;
        font-weight: 300;
      }
      a {
        text-decoration: none;
      }
      i {
        position: relative;
        cursor: pointer;
        line-height: 40px;
        font-size: 20px;
        color: rgba(255, 255, 255, .6);
        &:hover {
          color: #4bd1c5;
        }
      }
      .direction {
        font-size: 14px;
      }
      .list {
        position: absolute;
        left: 0;
        right: 0;
        top: 40px;
        background: #181824;
        opacity: .8;
        z-index: 9;
        .item {
          padding: 0 20px;
          cursor: pointer;
          &:hover {
            background: rgb(44, 42, 66);
            span {
              color: #4bd1c5;
            }
          }
        }
      }
    }
    .files {
      height: calc(100% - 90px);
    }
  }
  .content {
    flex: 1;
    background: rgb(24, 24, 36)
  }
  .socket {
    display: none;
  }
}
</style>

