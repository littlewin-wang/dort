<template>
  <div class="file-tree">
    <div class="file-empty">
      <p>NO FILE. WAIT FOR LOADING.</p>
    </div>
    <div class="file-container">
      <input type="text" class="search" v-model="searchInput" placeholder="Search files">
      <div class="content">
        <Folder v-for="(folder, index) in tree.folders" :key="index" :content="folder" :depth="0" />
      </div>
    </div>
  </div>
</template>

<script>
import Folder from './Folder'
import { mapGetters } from 'vuex'

export default {
  name: 'FileTree',
  components: {
    Folder
  },
  data () {
    return {
      searchInput: ''
    }
  },
  computed: {
    ...mapGetters('files', ['tree'])
  }
}
</script>

<style lang="scss" scoped>
.file-tree {
  .file-container {
    .search {
      display: block;
      height: 30px;
      width: 100%;
      padding-left: 20px;
      margin-bottom: 10px;
      font-size: 14px;
      line-height: 30px;
      border-bottom: 1px solid rgba(255,255,255,0.2);
    }
  }
}
</style>
