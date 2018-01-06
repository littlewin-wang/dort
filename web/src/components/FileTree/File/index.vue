<template>
  <div class="file">
    <a href="" class="name">
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
.name {
  display: block;
  white-space: nowrap;

  .text {
    padding: 0 12px
  }
}
</style>
