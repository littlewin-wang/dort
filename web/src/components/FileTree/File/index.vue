<template>
  <div class="file">
    <a href="#" class="name" :style="{ paddingLeft: depth * 20 + 'px' }">
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
    padding: 6px;
    height: 16px;
    line-height: 16px;
    font-size: 14px;
    white-space: nowrap;
    color: #fff;
    text-decoration: none;

    .icon {
      vertical-align: middle;
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
