<template>
  <div class="index">
    <div class='container'>
      <div class='ring1'></div>
      <div class='ring2'></div>
      <div class='ring3'></div>
    </div>
    <div class='content'>
      Dort - <span>File sharing in amazing way</span>
    </div>
    <div class='link'>
      <a href="#">http://localhost:4574</a>
      <span>(In same network)</span>
    </div>
    <div class='slogan'>
      <span>- Every commit or version update is a way of little win</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  position: relative;
  margin: 100px auto 0 auto;
  width: 6em;
  height: 6em;
}

.content {
  color: white;
  text-align: center;
  margin-top: 50px;
  font-size: 24px;
  font-weight: 300;
  span {
    font-size: 16px;
    color: #4bd1c5;
  }
}

.link {
  text-align: center;
  margin-top: 50px;
  font-weight: 300;
  a {
    display: block;
    height: 50px;
    line-height: 50px;
    font-size: 24px;
    color: white;
  }
  span {
    display: block;
    color: rgba(255, 255, 255, .6)
  }
}

.slogan {
  margin-top: 50px;
  text-align: center;
  span {
    color: #4bd1c5;
    opacity: .7;
  }
}

.ring1, .ring2, .ring3 {
  position: absolute;
  width: 5em;
  height: 5em;
  border: 0.5em solid #FFF895;
  border-radius: 50%;
}

.ring1 {z-index: 2;}

.ring2 {
  width: 3em;
  height: 3em;
  top: 1em;
  left: 1em;
  border: 0.5em solid #CC637C;
  animation: move 1.5s ease-in-out infinite;
}

.ring3 {
  width: 1em;
  height: 1em;
  top: 2em;
  left: 2em;
  border: 0.5em solid #AFEAFF;
  animation: move2 1.5s ease-in-out infinite;
}


@keyframes move {
  0% {
    width: 3em;
    height: 3em;
    top: 1em;
    left: 1em;
    z-index: 3;
  }
  50% {
    width: 7em;
    height: 7em;
    top: -1em;
    left: -1em;
  }
  75% {
    z-index: 1;
  }
  100% {
    width: 3em;
    height: 3em;
    top: 1em;
    left: 1em;
    z-index: 3;
  }
 }


@keyframes move2 {
  0% {
    width: 1em;
    height: 1em;
    top: 2em;
    left: 2em;
    z-index: 4;
  }
  50% {
    width: 9em;
    height: 9em;
    top: -2em;
    left: -2em;
  }
  75% {
    z-index: 0;
  }
  100% {
    width: 1em;
    height: 1em;
    top: 2em;
    left: 2em;
    z-index: 4;
  }
 }
</style>

