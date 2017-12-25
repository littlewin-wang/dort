/**
 * 项目模块
 */

const slug = require('slug')

const Files = require('./files.js')

class Project {
  constructor (_config, _options) {
    this.config = _config

    this.setName(_options.name)
    this.setSocket()

    this.files = new Files(this.config, { projectSocket: this.projectSocket })
  }

  setSocket () {
    this.projectSocket = this.config.socket.of('/project/' + this.slug)

    this.projectSocket.on('connection', socket => {
      this.projectSocket.emit('update_project', this.describe())

      if (this.config.debug >= 1) {
        console.log('[project] > socket'.green.bold + ' - ' + 'connection'.cyan + ' - ' + socket.id.cyan)
      }
    })
  }

  destructor () {
    if (this.config.debug >= 1) {
      console.log('[project]'.green.bold + ' - ' + `${this.slug} deleted.`.cyan)
    }
  }

  setName (_name) {
    this.name = _name
    this.slug = slug(this.name, { lower: true })
  }

  describe () {
    const ret = {}

    ret.name = this.name

    return ret
  }
}

module.exports = Project
