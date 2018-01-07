<template>
  <div class="file">
    <a href="" class="name" :style="{ paddingLeft: depth * 20 + 'px' }">
      <Icon class="icon" :extension="content.extension"/>
      <span class="text">
        {{content.name}}
      </span>
    </a>
  </div>
</template>

<script>
import Icon from '../Icon'

export default {
  name: 'File',
  components: {
    Icon
  },
  props: {
    depth: Number,
    content: Object
  }
}
</script>

<style lang="scss" scoped>
.file {
  .name {
    display: block;
    height: 16px;
    line-height: 16px;
    white-space: nowrap;
    font-size: 14px;
    color: #fff;
    text-decoration: none;

    .icon {
      vertical-align: middle;
      height: 14px;
    }

    .text {
      display: inline-block;
      padding: 0 12px;
      opacity: .6;
    }
  }
}
</style>
