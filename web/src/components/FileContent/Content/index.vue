<template>
  <div class="content-container">
    <div class="versions" v-show="openHistory">
      <ul v-if="activeFile" class="list">
        <li v-for="(v, index) in activeFile.versions" :key="index" :class="{ active: index === activeIndex }" @click="changeActive(index)" >
          <Version :version="v" />
        </li>
      </ul>
    </div>
    <div class="content">
      <div v-if="activeFile" class="content-main">
        <div class="line" v-if="openDiff">
          <div class="line-part" v-for="(d, index) in diff" :key="index">
            <span v-for="(line, idx) in d.count" :key="idx">{{d.removed ? '' : line + d.startAt}}</span>
            <div v-if="(d.added || d.removed) && diff.length > 1" class="line-bg" :style="{ background: d.added ? '#41ff79' : '#f03'}"></div>
          </div>
        </div>
        <div class="line" v-else>
          <div class="line-part">
            <span v-for="(line, idx) in version.content.split('\n').length" :key="idx">{{ line }}</span>
          </div>
        </div>
        <pre class="code" v-highlightjs="openDiff ? content : version.content" contenteditable><code :class="[ extension ]"></code></pre>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Version from './Version'

export default {
  name: 'Content',
  components: {
    Version
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
  data () {
    return {
      activeIndex: 0,
      index: 0
    }
  },
  computed: {
    ...mapGetters('files', ['activeFile']),
    extension () {
      return this.activeFile.extension
    },
    version () {
      return this.activeFile.versions[this.activeIndex] || { content: '' }
    },
    diff () {
      let index = 0

      if (this.version.diff && this.version.diff.length) {
        this.version.diff.map((d, idx) => {
          d.startAt = index
          if (!d.removed) {
            index += d.count
          }
        })
      }

      return this.version.diff || []
    },
    content () {
      let content = ''
      if (this.version.diff) {
        this.version.diff.map(d => {
          content += d.value
        })
      }

      return content
    }
  },
  methods: {
    changeActive (index) {
      this.activeIndex = index
      this.index = 0
    },
    indexAdd (number) {
      this.index += number
    }
  }
}
</script>

<style lang="scss" scoped>
.content-container {
  display: flex;
  flex-direction: row;
  .versions {
    flex: 0 0 180px;
    .list {
      margin: 0;
      padding: 0;
      list-style: none;
      li {
        cursor: pointer;
      }
      .active {
        background: rgb(34, 32, 58);
      }
    }
  }
  .content {
    flex: 1;
    background: rgb(34, 32, 58);
    .content-main {
      display: flex;
      .line {
        opacity: .6;
        .line-part {
          position: relative;
          span {
            display: block;
            font-size: 13px;
            height: 20px;
            line-height: 20px;
            padding: 0 20px;
          }
          .line-bg {
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
            width: calc(100vw - 250px - 180px);
            opacity: .4;
            pointer-events: none;
          }
        }
      }
      pre {
        outline: none;
        margin: 0;
        code {
          line-height: 20px;
          font-size: 14px;
          font-family: 'Roboto Mono', monospace;
        }
      }
    }
  }
}
</style>
