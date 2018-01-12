<template>
  <div class="content-container">
    <div class="versions">
      <ul v-if="activeFile" class="list">
        <li v-for="(v, index) in activeFile.versions" :key="index" :class="{ active: index === activeIndex }" @click="changeActive(index)" >
          <Version :version="v" />
        </li>
      </ul>
    </div>
    <div class="content">
      <div v-if="activeFile">
        <pre class="code" v-highlightjs="version.content" contenteditable><code :class="[ extension ]"></code></pre>
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
  data () {
    return {
      activeIndex: 0
    }
  },
  computed: {
    ...mapGetters('files', ['activeFile']),
    extension () {
      return this.activeFile.extension
    },
    version () {
      return this.activeFile.versions[this.activeIndex] || { content: '' }
    }
  },
  methods: {
    changeActive (index) {
      this.activeIndex = index
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
      .active {
        background: rgb(34, 32, 58);
      }
    }
  }
  .content {
    flex: 1;
    background: rgb(34, 32, 58);
  }
}
</style>
