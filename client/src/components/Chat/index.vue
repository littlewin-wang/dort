<template>
  <div class="chat-container">
    <barrageItem :style="{opacity: isBarrage ? 1 : 0}" v-for="msg in messages" :key="msg.id" :id="msg.id" :barrage="{text: msg.text, color: msg.user.color}"></barrageItem>
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
              <div class="file" v-if="msg.file">
                <span class="path" @click="handlePath(msg)">{{msg.file}}:{{msg.line}}#{{msg.version}}</span>
              </div>
              <span class="text">{{msg.text}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="input">
        <div class="name">
          <span class="label">Nickname assign to you is </span>
          <input class="nickname" type="text" v-model="name" :style="{color: user.color}" @change="handleName($event)">
          <label class="switch">
            <input type="checkbox" :checked="isBarrage" @click="isBarrage = !isBarrage">
            <span class="slider">{{isBarrage ? '弹幕' : ''}}</span>
          </label>
        </div>
        <div class="file" v-if="target">
          <span class="path" @click="handlePath(target)">{{target.file}}:{{target.line}}#{{target.version}}</span>
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
import barrageItem from '../Barrage/item'

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Chat',
  components: {
    Tooltip,
    barrageItem
  },
  data () {
    return {
      name: '',
      content: '',
      isBottom: true,
      isBarrage: true
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

          if (this.target) {
            message.file = this.target.file
            message.version = this.target.version
            message.line = this.target.line
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
    handlePath (target) {
      // set file
      if (target.file) {
        this.setFile(target.file)
      }

      // set version
      this.changeIndex(target.version)

      // set line
      this.setLine(target.line)

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
        .label {
          opacity: .6;
        }
        .nickname {
          width: 110px;
          &:hover {
            background: #2c2a42;
          }
        }
        .switch {
          position: relative;
          display: inline-block;
          width: 30px;
          height: 15px;
          vertical-align: middle;
        }

        .switch input { display: none; }

        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #ccc;
          -webkit-transition: .4s;
          transition: .4s;
          font-size: 15px;
          line-height: 15px;
        }

        .slider:before {
          position: absolute;
          content: "";
          height: 15px;
          width: 15px;
          left: 0;
          bottom: 0;
          background-color: white;
          -webkit-transition: .4s;
          transition: .4s;
        }

        input:checked + .slider {
          background-color: #2196F3;
        }

        input:focus + .slider {
          box-shadow: 0 0 1px #2196F3;
        }

        input:checked + .slider:before {
          transform: translateX(15px);
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
    .file {
      line-height: 14px;
      margin-bottom: 4px;
      .path {
        margin-right: 1rem;
        font-size: 12px;
        color: #4bd1c5;
        text-decoration: underline;
        cursor: pointer;
      }
      i {
        font-size: 12px;
        cursor: pointer;
      }
    }
  }
}
</style>


