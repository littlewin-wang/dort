/**
 * site模块
 */

const express = require('express')
const helmet = require('helmet')
const colors = require('colors')
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

        
      }
      else {
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
}

module.exports = Site
