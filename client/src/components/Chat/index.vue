<template>
  <div class="chat-container">
    <div class="label" @click="toggleChat">
      <Tooltip position="left" v-if="!open">Discuss this project with other prople</Tooltip>
      <h5>
        <span>Project Chat</span>
        <i class="iconfont" :class="`icon-${open ? 'down' : 'up'}`"></i>
        <div class="unread" v-if="unread > 0 && !open">{{unread}}</div>
      </h5>
    </div>
    <div class="box" v-if="open">
      <div class="content" ref="container" @scroll="handleScroll">
        <div class="item-list" ref="inner">
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
      </div>
      <div class="input">
        <div class="name">
          <span>Nickname assign to you is </span>
          <input type="text" v-model="name" :style="{color: user.color}" @change="handleName($event)">
        </div>
        <div class="file" v-if="target">
          <span class="path" @click="handlePath">{{target.file}}:{{target.line}}#{{target.version}}</span>
          <i class="iconfont icon-close" @click="setTarget(null), setLine(null)"></i>
        </div>
        <div class="textarea">
          <textarea v-model="content" placeholder="Type the words here..." @keydown="handleContent"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Tooltip from '../Tooltip'

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Chat',
  components: {
    Tooltip
  },
  data () {
    return {
      name: '',
      content: '',
      isBottom: true
    }
  },
  computed: {
    ...mapGetters('chat', ['unread']),
    open () {
      return this.$store.state.chat.open
    },
    user () {
      return this.$store.state.chat.user
    },
    messages () {
      return this.$store.state.chat.messages
    },
    target () {
      return this.$store.state.chat.target
    }
  },
  watch: {
    open (value) {
      if (value) {
        window.requestAnimationFrame(() => {
          this.handleBottom()
        })
      }
    },
    user (value) {
      this.name = value.name
    },
    messages () {
      window.requestAnimationFrame(() => {
        if (this.isBottom) {
          this.handleBottom()
        }
      })
    }
  },
  methods: {
    ...mapActions('chat', ['toggleChat', 'setUser', 'setMessage', 'setTarget']),
    ...mapActions('files', ['setFile', 'setLine', 'changeIndex']),

    // chat list container stay at bottom
    handleBottom () {
      this.$refs.container.scrollTop = this.$refs.inner.offsetHeight - this.$refs.container.offsetHeight + 15
    },

    // update user name
    handleName (event) {
      this.setUser({name: event.target.value})
      // focus textarea after modification done
      this.$el.querySelector('.textarea textarea').focus()
    },

    // post message to server
    handleContent (event) {
      // In case use shift + enter to change input to next line
      if (event.keyCode === 13 && !event.shiftKey) {
        event.preventDefault()

        let text = this.content.trim()

        if (text) {
          let message = {
            text
          }

          this.setMessage(message)

          this.content = ''
          this.handleBottom()
        }
      }
    },

    // update isBottom when scroll
    handleScroll () {
      this.isBottom = (this.$refs.container.scrollTop + this.$refs.container.offsetHeight >= this.$refs.inner.offsetHeight + 15)
    },

    // set file - version - line
    handlePath () {
      // set file
      if (this.target.file) {
        this.setFile(this.target.file)
      }

      // set version
      this.changeIndex(this.target.version)

      // set line
      this.setLine(this.target.line)

      this.$el.querySelector('.textarea textarea').focus()
      this.handleBottom()
    }
  }
}
</script>

<style lang="scss" scoped>
.chat-container {
  min-width: 200px;
  .label {
    h5 {
      position: relative;
      display: flex;
      justify-content: space-between;
      margin: 0;
      padding: .2rem .5rem;
      font-weight: 300;
      line-height: 2rem;
      background: #222233;
      cursor: pointer;
      .unread {
        position: absolute;
        width: 30px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border-radius: 50%;
        background: #4bd1c5;
        top: 0;
        left: 50%;
        transform: translateY(-50%)
      }
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
      background: #222233;
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
      .file {
        line-height: 14px;
        margin-bottom: 4px;
        .path {
          margin-right: 1rem;
          color: #4bd1c5;
          text-decoration: underline;
          cursor: pointer;
        }
        i {
          font-size: 13px;
          cursor: pointer;
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


