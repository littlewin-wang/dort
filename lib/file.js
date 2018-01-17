/**
 * 文件模块
 */

const diff = require('diff')
const ids = require('./ids.js')

class File {
  constructor (_config, _options) {
    // 初始化基本信息
    this.config = _config
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

    if (this.config.debug >= 1) {
      console.log('[file]'.green.bold + ' - ' + `${this.path.full}`.yellow + ' - ' + 'has been created'.cyan)
    }

    // 创建版本信息
    if (_options.content) {
      this.createVersion(_options.content)
    }
  }

  createVersion (content) {
    const version = {}
    const lastVersion = this.getLastVersion()

    version.date = new Date()
    version.content = content ? content.toString() : ''

    // 过滤首次空白提交
    if (!lastVersion && version.content === '') {
      return false
    }

    // 无前置版本内容
    let lastContent
    if (!lastVersion || !lastVersion.content) {
      lastContent = ''
    } else {
      lastContent = lastVersion.content.toString()
    }

    const diffs = diff.diffLines(
      lastContent,
      version.content
    )

    // 没有改变, 不记录版本信息
    if (diffs.length === 1 && lastContent !== '') {
      return false
    }

    version.diff = diffs

    // 触发前端通知
    this.projectSocket.emit('createVersion', { file: this.path.full, version })

    // 保存版本记录
    this.versions.unshift(version)

    if (this.config.debug >= 1) {
      console.log('[file]'.green.bold + ' - ' + `${this.path.full}`.yellow + ' - ' + 'has new version'.cyan + ' - ' + version.date.toLocaleString())
    }
  }

  // 获取之前版本信息
  getLastVersion () {
    return this.versions.length ? this.versions[0] : false
  }

  // 指定描述信息
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
    if (this.config.debug >= 1) {
      console.log('[file]'.green.bold + ' - ' + `${this.path.full}`.yellow + ' - ' + 'has been deleted'.cyan)
    }
  }
}

module.exports = File
