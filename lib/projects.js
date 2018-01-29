/**
 * 项目组模块
 */

require('colors')
const Project = require('./project.js')

class Projects {
  constructor (_config) {
    this.config = _config
    this.projects = {}

    this.setSocket()
  }

  setSocket () {
    this.projectsSocket = this.config.socket.of('/projects')

    this.projectsSocket.on('connection', socket => {
      socket.emit('config', { domain: this.config.domain })
      this.projectsSocket.emit('update_projects', this.describe())

      if (this.config.debug >= 1) {
        console.log('[projects] > socket'.green.bold + ' - ' + 'connection'.cyan + ' - ' + socket.id.cyan)
      }
    })
  }

  createProject (_options) {
    // 初始化项目
    const project = new Project(this.config, _options)

    let sameNameProject = this.projects[project.slug]

    // 若存在同名项目
    // 保证slug的唯一性
    while (sameNameProject) {
      let lastVer = sameNameProject.name.match(/\d+$/)
      let newVer = 2

      if (lastVer && lastVer.length) {
        // 将lastVer取整 + 1
        newVer = ~~lastVer[0] + 1
      }

      // 更新项目名称和slug
      project.setName(_options.name + '-' + newVer)

      sameNameProject = this.projects[project.slug]
    }

    // 保存并触发事件
    this.projects[project.slug] = project
    this.projectsSocket.emit('update_projects', this.describe())

    return project
  }

  deleteProject (_slug) {
    const project = this.projects[_slug]

    if (project) {
      // 删除项目
      delete this.projects[_slug]
      project.destructor()

      this.projectsSocket.emit('update_projects', this.describe())
    }
  }

  describe () {
    const ret = {}
    ret.domain = this.config.domain
    ret.projects = {}

    for (const _slug in this.projects) {
      const _project = this.projects[_slug]

      ret.projects[_slug] = {
        slug: _project.slug,
        name: _project.name,
        fileCount: _project.files.count,
        date: _project.date,
        lastUpdateDate: _project.files.lastVersionDate
      }
    }

    return ret
  }
}

module.exports = Projects
