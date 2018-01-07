<template>
  <div class="file">
    <a href="#" class="name" :class="{ active: activeFile && activeFile.id === content.id }" :style="{ paddingLeft: (depth + 1) * 20 + 'px' }" @click.prevent="setFile(content.path.full)">
      <Icon class="icon" :extension="content.extension"/>
      <span class="text">
        {{content.name}}
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
    ...mapGetters('files', ['activeFile'])
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
      opacity: .6;
      font-weight: 300;
    }

    &.active {
      background: rgb(48, 48, 54)
    }

    &:hover {
      .text {
        color: #4bd1c5;
        opacity: 1;
      }
    }
  }
}
</style>
