/**
 * 文件监控模块
 */

const chokidar = require('chokidar')
const fs = require('fs')
const mime = require('mime')
const socketIoClient = require('socket.io-client')

class Watch {
  constructor (_config) {
    this.config = _config
    this.path = process.cwd() + _config.path

    this.setExcludeRegex()
    this.setSocket()
    this.watch()
  }

  // 初始化socket
  setSocket () {
    this.socket = socketIoClient(`${this.config.domain}/watch`)

    this.socket.on('connect', () => {
      this.socket.emit('start_project', { name: this.config.name, path: this.path, exclude: this.config.exclude, excludeRegex: '' + this.excludeRegex })

      if (this.config.debug) {
        console.log('[watch]'.green.bold + ' - ' + 'socket connect'.cyan)
      }
    })

    this.socket.on('disconnect', () => {
      if (this.config.debug) {
        console.log('[watch]'.green.bold + ' - ' + 'socket disconnect'.cyan)
      }
    })
  }

  setExcludeRegex () {
    const regexs = []
    const Minimatch = require('minimatch').Minimatch

    Object.keys(this.config.exclude).forEach(key => {
      const value = this.config.exclude[key]
      const minimatch = new Minimatch(value, { dot: true })

      let regex = '' + minimatch.makeRe()
      regex = regex.replace('/^', '')
      regex = regex.replace('$/', '')

      regexs.push(regex)
    })

    this.excludeRegex = new RegExp(regexs.join('|'))
  }

  watch () {
    this.watch = chokidar.watch(
      this.path,
      {
        ignored: this.excludeRegex
      }
    )

    if (this.config.debug >= 1) {
      console.log('[watch]'.green.bold + ' - ' + 'start watching'.cyan + ' - ' + this.path.cyan)
    }

    // 添加文件事件响应函数
    this.watch.on('add', (_path) => {
      const relativePath = _path.replace(this.path, '.')
      const mimeType = mime.getType(relativePath)
      const file = {}

      file.path = relativePath
      file.canRead = true

      // 媒体文件不可读
      if (mimeType && mimeType.match(/^(audio)|(video)|(image)/)) {
        file.canRead = false
      }

      fs.stat(_path, (error, stats) => {
        // 判断文件大小
        if (this.config.maxFileSize < stats.size) {
          file.canRead = false
        }

        fs.readFile(_path, (error, data) => {
          if (file.canRead) {
            file.content = data.toString()
          }

          this.socket.emit('create_file', file)
        })
      })

      if (this.config.debug >= 1) {
        console.log('[watch]'.green.bold + ' - ' + 'add'.cyan + ' - ' + relativePath.cyan)
      }
    })

    // 更新文件事件响应函数
    this.watch.on('change', (_path) => {
      const relativePath = _path.replace(this.path, '.')
      const mimeType = mime.getType(relativePath)
      const file = {}

      file.path = relativePath
      file.canRead = true

      // 媒体文件不可读
      if (mimeType && mimeType.match(/^(audio)|(video)|(image)/)) {
        file.canRead = false
      }

      fs.stat(_path, (error, stats) => {
        // 判断文件大小
        if (this.config.maxFileSize < stats.size) {
          file.canRead = false
        }

        fs.readFile(_path, (error, data) => {
          if (file.canRead) {
            file.content = data.toString()
          }

          this.socket.emit('update_file', file)
        })
      })

      if (this.config.debug >= 1) {
        console.log('[watch]'.green.bold + ' - ' + 'change'.cyan + ' - ' + relativePath.cyan)
      }
    })

    // 删除文件事件响应函数
    this.watch.on('unlink', (_path) => {
      const relativePath = _path.replace(this.path, '.')

      this.socket.emit('delete_file', { path: relativePath })

      if (this.config.debug >= 1) {
        console.log('[watch]'.green.bold + ' - ' + 'unlink'.cyan + ' - ' + relativePath.cyan)
      }
    })

    // 添加文件夹事件响应函数
    this.watch.on('addDir', (_path) => {
      const relativePath = _path.replace(this.path, '.')

      this.socket.emit('create_folder', { path: relativePath })

      if (this.config.debug >= 1) {
        console.log('[watch]'.green.bold + ' - ' + 'addDir'.cyan + ' - ' + relativePath.cyan)
      }
    })

    // 删除文件夹事件响应函数
    this.watch.on('unlinkDir', (_path) => {
      const relativePath = _path.replace(this.path, '.')

      this.socket.emit('delete_folder', { path: relativePath })

      if (this.config.debug >= 1) {
        console.log('[watch]'.green.bold + ' - ' + 'unlinkDir'.cyan + ' - ' + relativePath.cyan)
      }
    })
  }
}

module.exports = Watch
