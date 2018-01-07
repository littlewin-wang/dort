<template>
  <div class="folder">
    <a href="#" class="name" :style="{ paddingLeft: depth * 20 + 'px' }" @click="open = !open">
      <Icon class="icon" :extension="open ? 'folder-active' : 'folder'"/>
      <span class="text">
        {{content.name}}
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
    fullPath () {
      return `${this.directory}${this.content.name}`
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
      width: 12px;
      height: 12px;
    }

    .text {
      display: inline-block;
      padding: 0 12px;
      opacity: .6;
      font-weight: 300;
    }
  }
}
</style>
