<template>
  <div class="title" v-if="activeFile">
    <div class="title-main">
      <div class="left">
        <i class="iconfont icon-history" :class="{ active: openHistory }" @click="toggleHistory"></i>
        <i class="iconfont icon-diff" :class="{ active: openDiff }" @click="toggleDiff"></i>
      </div>
      <h3>
        {{ activeFile.path.directory + '/' }}<b>{{ activeFile.name }}</b>
      </h3>
      <div class="right">
        <i class="iconfont icon-copy"></i>
        <i class="iconfont icon-download"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Title',
  data () {
    return {
      openHistory: false,
      openDiff: false
    }
  },
  computed: {
    ...mapGetters('files', ['activeFile'])
  },
  methods: {
    toggleHistory () {
      this.openHistory = !this.openHistory
    },
    toggleDiff () {
      this.openDiff = !this.openDiff
    }
  }
}
</script>

<style lang="scss" scoped>
  .title {
    height: 50px;
    .title-main {
      display: flex;
      justify-content: space-between;
      height: 50px;
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
      .left, .right {
        font-size: 0;
        i {
          display: inline-block;
          width: 50px;
          height: 50px;
          cursor: pointer;
          line-height: 50px;
          font-size: 20px;
          text-align: center;
          color: rgba(255, 255, 255, .4);
          &:hover {
            color: #4bd1c5;
          }
          &.active {
            background: rgb(34, 32, 58);
          }
        }
      }
    }
  }
</style>
