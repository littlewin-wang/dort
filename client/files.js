/**
 * 文件集合模块
 */

const paths = require('./paths.js')

class Files {
  constructor(_config, _options) {
    this.config = _config

    this.projectSocket = _options.projectSocket
  }

  create (_path, _content) {
    // 初始化地址
    const normalizedPath = paths.normalize(_path)
    const parsedPath = paths.parse(normalizedPath)

    // 获取文件
    let file = this.get(normalizedPath)

    if (file) {
      return false
    }

    // 创建文件信息
    console.log(parsedPath, _content)

    // 触发事件
    this.projectSocket.emit('create_file', file)
  }

  get (_path, _force) {
    return false
  }
}

module.exports = Files
