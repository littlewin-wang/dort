<template>
  <li class="barrage-item"
      :style="styles"
      :class="[
        playing ? 'playing' : '',
        played ? 'played' : ''
      ]">
    <span class="content" v-text="barrage.text" :style="{color: barrage.color}"></span>
  </li>
</template>

<script>
  export default {
    name: 'barrage-item',
    props: {
      id: {
        type: Number
      },
      delay: {
        type: Number,
        default: 10
      },
      barrage: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        // 定时器
        timers: {
          transform: null,
          playing: null
        },
        // 播放状态
        played: false,
        playing: false,
        styles: {
          'z-index': (this.id + 1) * 10,
          transition: `transform ${this.delay}s linear`
        }
      }
    },
    ready () {
      this.startAnimation()
    },
    mounted () {
      this.startAnimation()
    },
    beforeDestroy () {
      if (this.timers.transform) {
        clearTimeout(this.timers.transform)
        this.timers.transform = null
      }
      if (this.timers.playing) {
        clearTimeout(this.timers.playing)
        this.timers.playing = null
      }
    },
    methods: {
      randomTop () {
        // cound height range
        const innerHeight = document.documentElement.clientHeight - 500

        let top = Math.floor(Math.random() * innerHeight)
        return `${top}px`
      },
      startAnimation () {
        this.$nextTick(() => {
          // 开始动画
          this.timers.transform = setTimeout(() => {
            this.playing = true
            // 计算出一个随机高度，相对左距
            this.$set(this.styles, 'top', this.randomTop())
          })
          // 结束动画
          this.timers.playing = setTimeout(() => {
            this.playing = false
            this.played = true
            this.$nextTick(() => {
              this.$emit('end', this.id)
            })
          }, this.delay * 1000)
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .barrage-item {
    width: auto;
    right: 0px;
    display: block;
    position: fixed;
    transform: translate3d(100%, 0, 0);
    &.playing {
      transform: translate3d(calc(-100vw - 200%), 0, 0);
    }
    &.played {
      visibility: hidden;
    }
  }
</style>
