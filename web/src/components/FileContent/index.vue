<template>
  <div class="file-content">
    <Title class="file-title" />
    <Content class="file-content" />
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
