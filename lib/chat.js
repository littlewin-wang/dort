/**
 * Chat module
 */

require('colors')
const HTMLEntities = require('html-entities')
const IDs = require('./ids.js')
const ids = new IDs()

class Chat {
  constructor (_config, _options) {
    this.config = _config
    this.slug = _options.slug

    this.users = {}
    this.messages = []
    this.htmlEntities = new HTMLEntities.XmlEntities()

    this.setSocket()
  }

  setSocket () {
    // create one channel for chat system
    this.chatSocket = this.config.socket.of('/project/' + this.slug + '/chat')

    this.chatSocket.on('connection', socket => {
      const user = this.createUser()

      // debug message
      if (this.config.debug >= 1) {
        console.log('[chat] > socket'.green.bold + ' - ' + 'connection'.yellow + ' - ' + `${socket.id}`.cyan)
        console.log('[chat] > user'.green.bold + ' - ' + 'create'.yellow + ' - ' + `${user.name}`.cyan)
      }

      // generate basic user info
      const userInfo = {
        name: user.name,
        color: user.color
      }

      socket.emit('user', userInfo)

      // response to message
      socket.on('message', data => {
        data.id = ids.getId()
        data.time = new Date()
        this.messages.push(data)

        const msgInfo = {
          id: data.id,
          time: data.time,
          text: this.htmlEntities.encode(data.text),
          file: data.file,
          version: data.version,
          line: data.line,
          user: data.user
        }

        this.chatSocket.emit('message', msgInfo)

        // debug message
        if (this.config.debug >= 1) {
          console.log('[chat] > socket'.green.bold + ' - ' + 'message'.yellow + ' - ' + `${data.text}`.cyan)
        }
      })

      socket.on('update_user', data => {
        const newName = data.name.trim()
        const oldName = user.name

        // name check
        if (newName.length <= 0 || newName.length > 20 || newName === oldName) {
          return
        }

        user.name = this.htmlEntities.encode(data.name)

        // debug message
        if (this.config.debug >= 1) {
          console.log('[chat] > socket'.green.bold + ' - ' + 'update_user'.yellow + ' - ' + `${oldName} > ${newName}`.cyan)
        }
      })

      socket.on('notice', data => {
        console.log('notice - ', data)
      })

      socket.on('disconnect', () => {
        console.log('[chat] > socket'.green.bold + ' - ' + 'disconnect'.yellow + ' - ' + `${user.name}`.cyan)
      })
    })
  }

  createUser () {
    let user = {}

    user.id = ids.getId()
    user.name = `user${user.id}`
    user.color = this.getRandomColor()

    this.users[user.id] = user

    return user
  }

  getRandomColor () {
    return '#' + Math.floor(Math.random() * 16777215).toString(16)
  }
}

module.exports = Chat
