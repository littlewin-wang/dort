/**
 * 文件模块
 */

const diff = require('diff')
const ids = require('./ids.js')

class File {
  constructor (_options) {
    // 初始化基本信息
    this.id = ids.getId()
    this.name = _options.name
    this.path = {
      directory: _options.directory,
      full: _options.directory + '/' + this.name
    }
    this.versions = []
    this.projectSocket = _options.projectSocket

    // 后缀名保存
    const nameArr = this.name.split('.')
    this.extension = nameArr.length > 1 ? nameArr[nameArr.length - 1] : ''

    // 创建版本信息
    if (_options.content) {
      this.createVersion(_options.content)
    }
  }

  createVersion (content) {
    const version = {}
    const lastVersion = this.getLastVersion()

    version.date = new Date()
    version.content = content

    // 过滤首次空白提交
    if (!lastVersion && version.content === '') {
      return false
    }

    // 无前置版本内容
    let lastContent
    if (!lastVersion || !lastVersion.content) {
      lastContent = ''
    } else {
      lastContent = lastVersion.content
    }

    const diffs = diff.diffLines(
      lastContent,
      version.content
    )

    // 没有改变
    if (diffs.length === 1 && lastContent !== '') {
      return false
    }

    version.diff = diffs

    // 触发前端通知
    this.projectSocket.emit('createVersion', { file: this.path.full, version })

    // 保存版本记录
    this.versions.push(version)
  }

  getLastVersion () {
    return this.versions.length ? this.versions[this.versions.length - 1] : false
  }

  describe () {
    const ret = {}

    ret.id = this.id
    ret.name = this.name
    ret.path = this.path
    ret.versions = this.versions
    ret.extension = this.extension

    return ret
  }

  destructor () {

  }
}

module.exports = File
