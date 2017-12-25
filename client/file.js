/**
 * 文件模块
 */

const diff = require('diff')
const ids = require('./ids.js')

class File {
  constructor (_options) {
    this.id = ids.getId()
    this.name = _options.name
    this.path = {
      directory: _options.directory,
      full: _options.directory + '/' + this.name
    }
  }
}

module.exports = File
