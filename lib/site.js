/**
 * site模块
 */

require('colors')
const express = require('express')
const helmet = require('helmet')

const http = require('http')
const path = require('path')

class Site {
  constructor (_config, _success, _isRunning, _error) {
    this.config = _config
    this.success = _success
    this.isRunning = _isRunning
    this.error = _error

    this.setExpress()
    this.setServer()
  }

  setExpress () {
    this.express = express()
    this.express.use(helmet())
  }

  setServer () {
    this.server = http.createServer(this.express)

    this.server.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        if (this.config.debug >= 1) {
          console.log('[site]'.green.bold + ' - ' + 'already running'.cyan)
        }

        if (typeof this.isRunning === 'function') {
          this.isRunning()
        }
      } else {
        if (this.config.debug >= 1) {
          console.log('[site]'.green.bold + ' - ' + 'unknow error'.cyan)
        }

        if (typeof this.error === 'function') {
          this.error()
        }
      }
    })

    this.server.listen(this.config.port, () => {
      if (this.config.debug >= 1) {
        console.log('[site]'.green.bold + ' - ' + 'started'.cyan)
      }

      if (typeof this.success === 'function') {
        this.success()
      }
    })
  }

  createProjectRoute (_project) {
    // 页面主路由
    this.express.use('/', express.static(path.join(__dirname, '../client/dist')))

    // 文件打包下载路由
    this.express.get('/' + _project.slug + '/download', (request, response) => {
      const zipBuffer = _project.getZip()

      // 设置打包名
      const date = new Date()
      const hours = `${date.getHours() < 10 ? '0' : ''}${date.getHours()}`
      const minutes = `${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()}`
      const seconds = `${date.getSeconds() < 10 ? '0' : ''}${date.getSeconds()}`
      const name = `${_project.slug}_${hours}-${minutes}-${seconds}.zip`

      response.setHeader('Content-disposition', `attachment; filename=${name}`)

      zipBuffer.pipe(response)
    })

    // 静态文件路由
    this.express.use('/' + _project.slug + '/files', express.static(_project.path))
  }
}

module.exports = Site
