<template>
  <div class="file-content">
    <Title class="file-title" @toggle-history="handleHistory" @toggle-diff="handleDiff" @copy="handleCopy" :openHistory="openHistory" :openDiff="openDiff" />
    <Content class="file-content" :openHistory="openHistory" :openDiff="openDiff" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Title from './Title'
import Content from './Content'

import copyToClipboard from 'copy-to-clipboard'

export default {
  name: 'FileContent',
  components: {
    Title,
    Content
  },
  data () {
    return {
      openHistory: true,
      openDiff: true
    }
  },
  computed: {
    ...mapGetters('files', ['activeFile', 'activeIndex'])
  },
  methods: {
    // toggle version history panel
    handleHistory () {
      this.openHistory = !this.openHistory
    },

    // toggle diff display
    handleDiff () {
      this.openDiff = !this.openDiff
    },

    handleCopy () {
      if (this.activeFile && this.activeFile.versions && this.activeFile.versions.length) {
        copyToClipboard(this.activeFile.versions[this.activeIndex].content)
      } else {
        copyToClipboard('')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .file-content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .file-title {
      flex: 0 0 50px;
    }
    .file-content {
      flex: 1;
    }
  }
</style>
