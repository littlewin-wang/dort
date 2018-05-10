<template>
  <div id="app">
    <Loading v-if="isConnecting" :text="'Connecting poject ' + (active ? active.name : '')"></Loading>

    <div class="menu">
      <div class="title">
        <h3 class="label" @click="resetIndex">Dort</h3>
        <i class="iconfont icon-info" @click="showModal"></i>
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
      <FileContent v-if="activeFile" />
      <Index v-else />
    </div>
    <div class="chat">
      <Chat></Chat>
    </div>

    <modal name="info" :width="300" :minHeight="300">
      <div class="info">
        <h5>Dort <span>1.0.0</span></h5>
        <p>
          File sharing through web with wonderful alternation.
        </p>
        <ul>
          <li>
            <a target="_blank" rel="external nofollow" href="https://github.com/coding-show/dort">Github</a>
          </li>
        </ul>
         <h5>Author</h5>
         <ul>
          <li>
            Littlewin ( <a target="_blank" rel="external nofollow" href="https://github.com/littlewin-wang">Github</a> / <a target="_blank" rel="external nofollow" href="https://littlewin.wang">Site</a> )
          </li>
        </ul>
      </div>
    </modal>

    <Connection class="socket"/>
  </div>
</template>

<script>
import Loading from './components/Loading'
import Connection from './components/Connection'
import FileTree from './components/FileTree'
import Index from './components/Index'
import FileContent from './components/FileContent'
import Chat from './components/Chat'
import Tooltip from './components/Tooltip'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'app',
  components: {
    Loading,
    Connection,
    FileTree,
    Index,
    FileContent,
    Tooltip,
    Chat
  },
  data () {
    return {
      listShow: false
    }
  },
  computed: {
    ...mapGetters(['server', 'isConnecting']),
    ...mapGetters('project', ['active', 'all']),
    ...mapGetters('files', ['activeFile']),
    zipUrl () {
      if (this.active) {
        return `${this.server.domain}/${this.active.slug}/download`
      } else {
        return '#'
      }
    }
  },
  methods: {
    ...mapActions('project', ['setProject']),
    ...mapActions('files', ['setFile']),
    toggleList () {
      this.listShow = !this.listShow
    },
    changeActive (data) {
      this.setProject(data)
      this.listShow = false
    },
    showModal () {
      this.$modal.show('info')
    },
    resetIndex () {
      this.setFile(null)
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
      position: relative;
      height: 50px;
      h3 {
        text-align: center;
        margin: 0;
        line-height: 50px;
        font-size: 28px;
        font-weight: 300;
        cursor: pointer;
      }
      i {
        position: absolute;
        top: 0;
        right: 20px;
        line-height: 50px;
        font-size: 20px;
        color: rgba(255, 255, 255, .6);
        cursor: pointer;
        &:hover {
          color: #4bd1c5;
        }
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
    overflow: hidden;
    background: rgb(24, 24, 36)
  }
  .chat {
    position: absolute;
    right: 0;
    bottom: 0;
  }
  .socket {
    display: none;
  }
  .info {
    height: 100%;
    padding: 20px;
    background: #2e2c49;
    h5 {
      height: 30px;
      line-height: 30px;
      margin: 0;
      font-size: 16px;
      font-weight: 500;
      span {
        font-size: 14px;
        color: rgba(255, 255, 255, .6);
      }
    }
    p {
      margin: 0;
      padding: 10px 0;
      font-size: 14px;
      font-weight: 300;
    }
    ul {
      margin: 10px 0;
      font-size: 14px;
      font-weight: 300;
      a {
        color: rgb(255, 255, 255);
      }
    }
  }
}
</style>

