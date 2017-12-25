/**
 * 项目模块
 */

const slug = require('slug')

class Project {
  constructor (_config, _options) {
    this.config = _config

    this.setName(_options.name)
  }

  destructor () {
    if (this.config.debug >= 1) {
      console.log('[project]'.green.bold + ' < ' + this.slug + ' > ' + ' - ' + 'deleted.'.cyan)
    }
  }

  setName (_name) {
    this.name = _name
    this.slug = slug(this.name, { lower: true })
  }
}

module.exports = Project
