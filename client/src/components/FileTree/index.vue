<template>
  <div class="file-tree">
    <div class="file-empty" v-if="tree.filesCount === 0">
      <p>NO FILE. WAIT FOR LOADING.</p>
    </div>
    <div class="file-container" v-else>
      <input type="text" class="search" v-model="searchInput" placeholder="Search Input...">
      <div class="content">
        <Folder v-for="(folder, index) in tree.folders" :key="index" :content="folder" :depth="0" />
      </div>
    </div>
  </div>
</template>

<script>
import Folder from './Folder'
import { mapGetters, mapActions } from 'vuex'

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
  },
  watch: {
    searchInput: 'searchFile'
  },
  methods: {
    ...mapActions('files', ['searchFile'])
  }
}
</script>

<style lang="scss" scoped>
.file-tree {
  .file-empty {
    p {
      font-size: 14px;
      font-weight: 300;
      text-align: center;
    }
  }
  .file-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    .search {
      display: block;
      flex: 0 0 40px;
      padding-left: 20px;
      margin-bottom: 10px;
      font-size: 14px;
      line-height: 40px;
      border-bottom: 1px solid rgba(255,255,255,0.2);
    }
    .content {
      flex: 1;
      overflow-y: auto;
      margin-right: -15px;
    }
  }
}
</style>
