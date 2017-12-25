/**
 * 项目组模块
 */

class Projects {
  constructor (_config) {
    this.config = _config
    this.all = {}

    this.setSocket()
  }

  setSocket () {
    this.projectsSocket = this.config.socket.of('/projects')

    this.projectsSocket.on('connection', socket => {
      this.projectsSocket.emit('update_projects', this.describe())

      if (this.config.debug >= 1) {
        console.log('[projects] > socket'.green.bold + ' - ' + 'connection'.cyan + ' - ' + socket.id.cyan)
      }
    })
  }

  describe () {
    const result = {}
    result.domain = this.config.domain
    result.all = {}

    return result
  }
}

module.exports = Projects
