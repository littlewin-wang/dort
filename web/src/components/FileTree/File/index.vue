<template>
  <div class="file">
    <a href="#" class="name" :class="{ active: activeFile && activeFile.id === content.id }" :style="{ paddingLeft: (depth + 1) * 20 + 'px' }" @click.prevent="setFile(content.path.full)">
      <Icon class="icon" :extension="content.extension"/>
      <span class="text">
        <span v-for="(item, index) in nameArr" :key="index"><span class="label">{{ item }}</span><b v-if="index !== nameArr.length - 1">{{search}}</b></span>
      </span>
    </a>
  </div>
</template>

<script>
import Icon from '../Icon'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'File',
  components: {
    Icon
  },
  props: {
    depth: Number,
    content: Object
  },
  computed: {
    ...mapGetters('files', ['activeFile', 'search']),
    nameArr () {
      return this.search ? this.content.name.split(this.search) : [this.content.name]
    }
  },
  methods: {
    ...mapActions('files', ['setFile'])
  }
}
</script>

<style lang="scss" scoped>
.file {
  .name {
    display: block;
    padding: 6px;
    height: 16px;
    line-height: 16px;
    font-size: 14px;
    white-space: nowrap;
    color: #fff;
    text-decoration: none;

    .icon {
      width: 12px;
      height: 12px;
    }

    .text {
      display: inline-block;
      padding: 0 12px;
      .label {
        opacity: .6;
        font-weight: 300;
      }
      b {
        color: #ff6;
        font-weight: bold;
      }
    }

    &.active {
      background: rgb(48, 48, 54)
    }

    &:hover {
      .text {
        .label {
          color: #4bd1c5;
          opacity: 1;
        }
      }
    }
  }
}
</style>
