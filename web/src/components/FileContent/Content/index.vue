<template>
  <div class="content-container">
    <div class="versions">
      <ul v-if="activeFile" class="list">
        <li v-for="(v, index) in activeFile.versions" :key="index">
          {{v.date}}
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

export default {
  name: 'Content',
  computed: {
    ...mapGetters('files', ['activeFile']),
    extension () {
      return this.activeFile.extension
    },
    version () {
      return this.activeFile.versions[0] || { content: '' }
    }
  }
}
</script>

<style lang="scss" scoped>
.content-container {
  display: flex;
  flex-direction: row;
  .versions {
    flex: 0 0 150px;
    .list {
      margin: 0;
      padding: 0;
      list-style: none;
      background: rgb(34, 32, 58);
      li {
        height: 50px;
      }
    }
  }
  .content {
    flex: 1;
    background: rgb(34, 32, 58);
  }
}
</style>
