<template>
  <div class="folder">
    <a href="#" class="name" :style="{ paddingLeft: (depth + 1) * 20 + 'px' }" @click="open = !open">
      <Icon class="icon" :extension="open ? 'folder-active' : 'folder'"/>
      <span class="text">
        <span v-for="(item, index) in nameArr" :key="index"><span class="label">{{ item }}</span><b v-if="index !== nameArr.length - 1">{{search}}</b></span>
      </span>
    </a>
    <div v-show="open">
      <Folder v-for="(item, index) in content.folders" :key="'folder -' + index" :content="item" :depth="depth + 1" :directory="fullPath + '/'" />
      <File v-for="(item, index) in content.files" :key="'file -' + index" :content="item" :depth="depth + 1" />
    </div>
  </div>
</template>

<script>
import Icon from '../Icon'
import File from '../File'
import { mapGetters } from 'vuex'

export default {
  name: 'Folder',
  components: {
    Icon,
    File
  },
  props: {
    depth: Number,
    directory: {
      type: String,
      default: ''
    },
    content: Object
  },
  data () {
    return {
      open: true
    }
  },
  computed: {
    ...mapGetters('files', ['search']),
    fullPath () {
      return `${this.directory}${this.content.name}`
    },
    nameArr () {
      return this.search ? this.content.name.split(this.search) : [this.content.name]
    }
  }
}
</script>

<style lang="scss" scoped>
.folder {
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
      opacity: .6;
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

    &:hover {
      .icon {
        opacity: 1;
      }

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
