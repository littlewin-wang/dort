<template>
  <div class="tooltip" :class="`${position}`">
    <div class="container">
      <div class="arrow"></div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tooltip',
  props: {
    position: {
      type: String,
      default: 'top',
      validator (str) {
        return ['top', 'bottom', 'left', 'right'].includes(str)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .tooltip {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9;
    .container {
      position: absolute;
      padding: 6px 8px;
      background: #336;
      white-space: nowrap;
      font-size: 13px;
      line-height: 16px;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.2s;
      will-change: opacity;
      color: #fff;

      .arrow {
        position: absolute;
        width: 0;
        height: 0;
      }
    }

    &.top {
      .container {
        bottom: calc(100% + 10px);
        left: 50%;
        transform: translateX(-50%);
      }

      .arrow {
        bottom: -5px;
        left: 50%;
        transform: translateX(-50%);
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-top: 5px solid #336;
      }
    }

    &.bottom {
      .container {
        top: calc(100% + 10px);
        left: 50%;
        transform: translateX(-50%);
      }

      .arrow {
        top: -5px;
        left: 50%;
        transform: translateX(-50%);
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-bottom: 5px solid #336;
      }
    }

    &.left {
      .container {
        top: 50%;
        right: calc(100% + 10px);
        transform: translateY(-50%)
      }

      .arrow {
        right: -5px;
        top: 50%;
        transform: translateY(-50%);
        border-top: 5px solid transparent;
        border-bottom: 5px solid transparent;
        border-left: 5px solid #336;
      }
    }

    &.right {
      .container {
        top: 50%;
        left: calc(100% + 10px);
        transform: translateY(-50%)
      }

      .arrow {
        left: -5px;
        top: 50%;
        transform: translateY(-50%);
        border-top: 5px solid transparent;
        border-bottom: 5px solid transparent;
        border-right: 5px solid #336;
      }
    }

    &:hover {
      .container {
        opacity: 1
      }
    }
  }

</style>
