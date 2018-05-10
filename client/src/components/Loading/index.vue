<template>
  <div class="loading">
    <div class="inner">
      <h1>{{text}}</h1>
      <svg id="load" x="0px" y="0px" viewBox="0 0 150 150">
        <circle id="loading-inner" cx="75" cy="75" r="60"/>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: 'loading',
  props: {
    text: {
      type: String,
      default: 'Loading'
    }
  }
}
</script>


<style lang="scss" scoped>
.loading {
  position: absolute;
  height: 100%;
  width: 100%;
  background: rgba(190, 190, 190, .9);
  z-index: 10;
  .inner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    > h1 {
      text-align: center;
      font-size: 2.5em;
      margin-bottom: 1em;
      font-weight: 300;
      color: #fc3;
    }
  }
}

#load {
  width: 150px;
  animation: loading 3s linear infinite;
  #loading-inner {
    stroke: {
      dashoffset: 0;
      dasharray: 300;
      width: 10;
      miterlimit: 10;
      linecap: round;
    }
    animation: loading-circle 2s linear infinite;
    stroke: #fc3;
    fill: transparent;
  }
}

@keyframes loading {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes loading-circle {
  0% {
    stroke-dashoffset: 0;
  }
  100% {
    stroke-dashoffset: -600;
  }
}
</style>

