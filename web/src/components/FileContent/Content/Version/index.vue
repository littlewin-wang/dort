<template>
  <div class="version">
    <div class="info">
      <span class="info-count">{{ lines.added + lines.removed }}</span>
      <div class="info-diff">
        <span v-for="(item, index) in addNodes" :key="index" :class="item.class"></span>
      </div>
    </div>
    <div class="time">
      <span>{{ date }}</span>
      <span>{{ fromNow }}</span>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'Version',
  props: {
    version: {
      type: Object,
      default: {}
    }
  },
  date () {
    return {
      fromNow: ''
    }
  },
  computed: {
    date () {
      return this.moment.format('hh:mm')
    },

    // calc diff data
    lines () {
      let ret = {
        'added': 0,
        'removed': 0,
        'unchange': 0
      }

      this.version.diff.map(d => {
        if (d.added) {
          ret.added += d.count
        } else if (d.removed) {
          ret.removed += d.count
        } else {
          ret.unchange += d.count
        }
      })

      return ret
    },

    // add state nodes
    addNodes () {
      let arr = []

      if (this.lines.added === 0) {
        if (this.lines.removed <= 5) {
          for (let i = 0; i < this.lines.removed; i++) {
            arr.push({
              class: 'removed-block'
            })
          }

          for (let j = this.lines.removed; j < 5; j++) {
            arr.push({
              class: 'normal-block'
            })
          }
        } else {
          for (let i = 0; i < 5; i++) {
            arr.push({
              class: 'removed-block'
            })
          }
        }
      } else if (this.lines.removed === 0) {
        if (this.lines.added <= 5) {
          for (let i = 0; i < this.lines.added; i++) {
            arr.push({
              class: 'added-block'
            })
          }

          for (let j = this.lines.added; j < 5; j++) {
            arr.push({
              class: 'normal-block'
            })
          }
        } else {
          for (let i = 0; i < 5; i++) {
            arr.push({
              class: 'added-block'
            })
          }
        }
      } else {
        let added = Math.floor(this.lines.added / (this.lines.added + this.lines.removed) * 5)
        let removed = Math.floor(this.lines.removed / (this.lines.added + this.lines.removed) * 5)
        let normal = 5 - added - removed

        for (let i = 0; i < added; i++) {
          arr.push({
            class: 'added-block'
          })
        }

        for (let j = 0; j < removed; j++) {
          arr.push({
            class: 'removed-block'
          })
        }

        for (let k = 0; k < normal; k++) {
          arr.push({
            class: 'normal-block'
          })
        }
      }

      return arr
    }
  },
  created () {
    this.moment = moment(this.version.date)
    this.fromNow = this.moment.fromNow()
  }
}
</script>

<style lang="scss" scoped>
.version {
  padding: 8px 12px;
  .info {
    display: flex;
    justify-content: space-between;
    height: 20px;
    .info-count {
      line-height: 20px;
      font-size: 14px;
      font-weight: 300;
    }
    .info-diff {
      span {
        display: inline-block;
        width: 6px;
        height: 6px;
        margin-left: 1px;
      }
      .added-block {
        background: #2cbe4e;
      }
      .removed-block {
        background: #cb2431;
      }
      .normal-block {
        background: #d1d5da;
      }
    }
  }
  .time {
    display: flex;
    justify-content: space-between;
    height: 20px;
    font-size: 13px;
    font-weight: 300;
    opacity: .6;
    span {
      line-height: 20px;
    }
  }
}
</style>
