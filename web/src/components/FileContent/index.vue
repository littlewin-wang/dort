<template>
  <div class="file-content">
    <Title class="file-title" @toggle-history="handleHistory" @toggle-diff="handleDiff" :openHistory="openHistory" :openDiff="openDiff" />
    <Content class="file-content" :openHistory="openHistory" :openDiff="openDiff" />
  </div>
</template>

<script>
import Title from './Title'
import Content from './Content'

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
  methods: {
    // toggle version history panel
    handleHistory () {
      this.openHistory = !this.openHistory
    },

    // toggle diff display
    handleDiff () {
      this.openDiff = !this.openDiff
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
