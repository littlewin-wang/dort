<template>
  <div class="content-container">
    <div v-if="activeFile">
      <pre class="code" v-highlightjs="version.content" contenteditable><code :class="[ extension ]"></code></pre>
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
      return this.activeFile.versions[0]
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
