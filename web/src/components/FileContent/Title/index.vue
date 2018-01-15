<template>
  <div class="title" v-if="activeFile">
    <div>
      <h3>
        {{ activeFile.path.directory + '/' }}<b>{{ activeFile.name }}</b>
      </h3>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Title',
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
        font-size: 14px;
        font-weight: 300;
        color: rgba(255, 255, 255, 0.3);
        b {
          color: white
        }
      }
    }
  }
</style>
