<template>
  <div class="file-tree">
    <div class="file-empty">
      <p>NO FILE. WAIT FOR LOADING.</p>
    </div>
    <div class="file-container">
      <input type="text" class="search" v-model="searchInput">
      <div class="content">
        <Folder v-for="(folder, index) in tree.folders" :key="index" :content="folder" :depth="0" />
      </div>
      <a class="action" href="">ALL READ</a>
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

