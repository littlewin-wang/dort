/**
 * 文件路径处理模块
 */

const path = require('path')

class Paths {
  constructor () {
    this.separator = path.sep
  }

  normalize (_path) {
    if (_path === '.' || _path === '') {
      return '.'
    }

    return './' + path.normalize(_path)
  }

  parse (_path) {
    return path.parse(this.normalize(_path))
  }
}

module.exports = new Paths()
