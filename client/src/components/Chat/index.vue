<template>
  <div class="chat-container">
    <div class="label" @click="toggleChat">
      <h5>
        <span>Project Chat</span>
        <i class="iconfont" :class="`icon-${open ? 'down' : 'up'}`"></i>
      </h5>
    </div>
    <div class="box" v-if="open">
      <div class="content"></div>
      <div class="input">
        <div class="name">
          <span>Nickname assign to you is </span>
          <input type="text" v-model="name" :style="{color: user.color}" @change="handleName($event)">
        </div>
        <div class="textarea">
          <textarea placeholder="Type the words here..." />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Chat',
  data () {
    return {
      name: ''
    }
  },
  computed: {
    ...mapGetters('chat', ['open', 'user']),
    user () {
      return this.$store.state.chat.user
    }
  },
  watch: {
    user (value) {
      this.name = value.name
    }
  },
  methods: {
    ...mapActions('chat', ['toggleChat', 'setUser']),
    handleName (event) {
      this.setUser({name: event.target.value})
    }
  }
}
</script>

<style lang="scss" scoped>
.chat-container {
  min-width: 200px;
  .label {
    h5 {
      display: flex;
      justify-content: space-between;
      margin: 0;
      padding: .2rem .5rem;
      font-weight: 300;
      line-height: 2rem;
      background: #22203a;
      cursor: pointer;
    }
    &:hover {
      border-top: 1px solid #4bd1c5;
    }
  }
  .box {
    .content {
      height: 300px;
      overflow-y: auto;
      background: #2c2a42;
    }
    .input {
      padding: .2rem .5rem;
      line-height: 1.8rem;
      font-size: 13px;
      font-weight: 300;
      .name {
        span {
          opacity: .6;
        }
        input:hover {
          background: #2c2a42;
        }
      }
      .textarea {
        textarea {
          width: 100%;
          height: 3rem;
          padding-right: calc(15px + .5rem);
        }
      }
    }
  }
}
</style>


