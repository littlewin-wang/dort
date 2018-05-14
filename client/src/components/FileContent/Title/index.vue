<template>
  <div class="title" v-if="activeFile">
    <div class="title-main">
      <div class="left">
        <i class="iconfont icon-history" :class="{ active: openHistory }" @click="toggleHistory">
          <Tooltip position="bottom">Toggle versions panel</Tooltip>
        </i>
        <i class="iconfont icon-diff" :class="{ active: openDiff }" @click="toggleDiff">
          <Tooltip position="bottom">Toggle diff display</Tooltip>
        </i>
      </div>
      <h3>
        {{ activeFile.path.directory + '/' }}<b>{{ activeFile.name }}</b>
      </h3>
      <div class="right">
        <i class="iconfont icon-copy" @click="handleCopy">
          <Tooltip position="bottom">Copy to clipboard</Tooltip>
        </i>
        <a :href="contentUri" :download="activeFile.name">
          <i class="iconfont icon-download">
            <Tooltip position="left">Download the file</Tooltip>
          </i>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Tooltip from '../../Tooltip'

import copyToClipboard from 'copy-to-clipboard'

export default {
  name: 'Title',
  components: {
    Tooltip
  },
  props: {
    openHistory: {
      type: Boolean,
      default: true
    },
    openDiff: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    ...mapGetters(['server']),
    ...mapGetters('files', ['activeFile', 'activeIndex']),
    ...mapGetters('project', ['active']),
    contentUri () {
      if (this.activeFile && this.activeFile.versions && this.activeFile.versions.length) {
        return `data:text/plain;charset=utf-8,${encodeURIComponent(this.activeFile.versions[this.activeIndex].content)}`
      } else {
        return `${this.server.domain}/${this.active.slug}/files/${this.activeFile.path.full}`
      }
    }
  },
  methods: {
    // toggle version history panel
    toggleHistory () {
      this.$emit('toggle-history')
    },

    // toggle diff display
    toggleDiff () {
      this.$emit('toggle-diff')
    },

    // copy content to clipboard
    handleCopy () {
      if (this.activeFile && this.activeFile.versions && this.activeFile.versions.length) {
        copyToClipboard(this.activeFile.versions[this.activeIndex].content)
      } else {
        copyToClipboard(`${this.server.domain}/${this.active.slug}/files/${this.activeFile.path.full}`)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .title {
    height: 50px;
    .title-main {
      display: flex;
      justify-content: space-between;
      height: 50px;
      h3 {
        margin: 0;
        text-align: center;
        line-height: 50px;
        font-size: 14px;
        font-weight: 300;
        color: rgba(255, 255, 255, 0.3);
        b {
          color: white
        }
      }
      .left, .right {
        flex: 0 0 100px;
        font-size: 0;
        i {
          position: relative;
          display: inline-block;
          width: 50px;
          height: 50px;
          cursor: pointer;
          line-height: 50px;
          font-size: 20px;
          text-align: center;
          color: rgba(255, 255, 255, .4);
          &:hover {
            color: #4bd1c5;
          }
          &.active {
            background: rgb(34, 32, 58);
          }
        }
      }
    }
  }
</style>
