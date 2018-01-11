<template>
  <div class="version">
    <div class="state">
      +{{lines.added}} -{{lines.deleted}} ={{lines.unchange}}
    </div>
    <div class="time">
      {{version.date}}
    </div>
  </div>
</template>

<script>

export default {
  name: 'Version',
  props: {
    version: {
      type: Object,
      default: {}
    }
  },
  computed: {
    lines () {
      let ret = {
        'added': 0,
        'deleted': 0,
        'unchange': 0
      }

      this.version.diff.map(d => {
        if (d.added) {
          ret.added += d.count
        } else if (d.deleted) {
          ret.deleted += d.count
        } else {
          ret.unchange += d.count
        }
      })

      return ret
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
