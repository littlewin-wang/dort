/**
 * 项目模块
 */

require('colors')
const slug = require('slug')
const Files = require('./files.js')
const JSZip = require('jszip')
const globby = require('globby')
const Chat = require('./chat.js')
const fs = require('fs')
const path = require('path')

class Project {
  constructor (_config, _options) {
    this.config = _config

    this.path = _options.path
    this.exclude = _options.exclude
    this.date = new Date()

    this.setName(_options.name)
    this.setSocket()

    this.chat = new Chat(this.config, { slug: this.slug })

    // flag to check if file uodated
    this.isUpdate = true
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

  getZip () {
    if (!this.isUpdate) {
      if (this.config.debug >= 1) {
        console.log('[project] > zip'.green.bold + ' - ' + `from cache.`.cyan)
      }

      return this.zipBuffer
    }

    const globPattern = ['**', ...this.exclude.map((item) => `!${item}`)]
    const files = globby.sync(globPattern, { dot: true })

    const zip = new JSZip()

    files.map(f => {
      const stats = fs.lstatSync(f)

      if (stats.isFile()) {
        const basename = path.basename(f)
        const relativePath = f.replace(basename, '').replace(this.path, '')
        zip.file(`${relativePath}${basename}`, fs.readFileSync(f))
      }
    })

    this.zipBuffer = zip.generateNodeStream({ type: 'nodebuffer', streamFiles: true })
    this.isUpdate = false

    if (this.config.debug >= 1) {
      console.log('[project] > zip'.green.bold + ' - ' + `created.`.cyan)
    }

    return this.zipBuffer
  }

  destructor () {
    this.projectSocket.emit('destruct')

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
    ret.files = this.files.describe()

    return ret
  }
}

module.exports = Project
