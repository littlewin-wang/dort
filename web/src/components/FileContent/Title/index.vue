<template>
  <div class="title" v-if="activeFile">
    <div>
      <h3>{{activeFile.name}}</h3>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Content',
  computed: {
    ...mapGetters('files', ['activeFile'])
  }
}
</script>

<style lang="scss" scoped>
  .title {
    height: 50px;
    div {
      h3 {
        margin: 0;
        text-align: center;
        line-height: 50px;
      }
    }
  }
</style>
