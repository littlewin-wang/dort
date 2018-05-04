<template>
  <div class="chat-container">
    <div class="label" @click="toggleChat">
      <h5>
        <span>Project Chat</span>
        <i class="iconfont" :class="`icon-${open ? 'down' : 'up'}`"></i>
      </h5>
    </div>
    <div class="box" v-if="open">
      <div class="content">
        <div class="item" v-for="msg in messages" :key="msg.id">
          <div class="state" :style="{background: msg.user.color}"></div>
          <div class="container">
            <div class="param">
              <span class="name" :style="{color: msg.user.color}">{{msg.user.name}}</span>
              <span class="time">{{new Date(msg.time).toLocaleString()}}</span>
            </div>
            <span class="text">{{msg.text}}</span>
          </div>
        </div>
      </div>
      <div class="input">
        <div class="name">
          <span>Nickname assign to you is </span>
          <input type="text" v-model="name" :style="{color: user.color}" @change="handleName($event)">
        </div>
        <div class="textarea">
          <textarea v-model="content" placeholder="Type the words here..." @keydown="handleContent"/>
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
      name: '',
      content: ''
    }
  },
  computed: {
    ...mapGetters('chat', ['open', 'user', 'messages']),
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
    ...mapActions('chat', ['toggleChat', 'setUser', 'setMessage']),
    handleName (event) {
      this.setUser({name: event.target.value})
      this.$el.querySelector('.textarea textarea').focus()
    },
    handleContent (event) {
      if (event.keyCode === 13 && !event.shiftKey) {
        event.preventDefault()

        let text = this.content.trim()

        if (text) {
          let message = {
            text
          }

          this.setMessage(message)

          this.content = ''
        }
      }
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
    width: 320px;
    .content {
      height: 300px;
      margin-right: -15px;
      padding: .5rem calc(0.5rem + 15px) .5rem .5rem;
      overflow-y: auto;
      background: #2c2a42;
      .item {
        display: flex;
        justify-content: space-between;
        .state {
          flex: 0 0 3px;
        }
        .container {
          margin-left: .5rem;
          flex: 1;
          overflow: hidden;
          font-size: 14px;
          font-weight: 300;
          .param {
            display: flex;
            justify-content: space-between;
            .time {
              font-size: 12px;
              opacity: .6
            }
          }
          .text {
            width: 100%;
            margin-top: .5rem;
            font-size: 13px;
            white-space: pre-wrap;
          }
        }
        &:not(:first-child) {
          margin-top: 1rem;
        }
      }
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


