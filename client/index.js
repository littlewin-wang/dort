/**
 * client端入口文件
 */

const colors = require('colors')
const ip = require('ip')
const socketIo = require('socket.io')

const Watch = require('./watch')
const Site = require('./site.js')
const Projects = require('./projects.js')

const packageConfig = require('../package.json')

class App {
  constructor() {
    console.log('---'.rainbow + ' Dort '.bold + packageConfig.version.bold + ' ----------------------'.rainbow)

    // 导入配置参数
    this.setConfig()

    // 设置site
    this.setSite(
      () => {
        this.setSocket()
        this.setProjects()
      },
      () => {
        console.log('[dort]'.green.bold + ' - ' + 'seems to be running already'.cyan)
      },
      () => {
        console.log('[dort]'.green.bold + ' - ' + 'error'.red)
      }
    )

    // 开启监控模块
    this.setWatch()
  }

  // 解析命令行参数
  setConfig () {
    const config = {}

    const args = require('yargs')
      .option('debug', {
        alias: 'd',
        describe: '开发调试等级，用来规范打印信息',
        default: 1,
        type: 'number'
      })
      .option('path', {
        alias: 'pa',
        describe: '目录地址',
        default: '',
        type: 'string'
      })
      .option('name', {
        alias: 'n',
        describe: '工程名称',
        default: '',
        type: 'string'
      })
      .option('port', {
        alias: 'po',
        describe: '服务端口',
        default: 4574,
        type: 'number'
      })
      .option('exclude', {
        alias: 'e',
        describe: '需要排除掉的文件',
        default:
          [
            '**/.DS_Store',
            'node_modules/**',
            'vendor/**',
            '.git'
          ],
        type: 'array'
      })
      .option('test', {
        alias: 't',
        describe: '开启测试工程',
        default: false,
        type: 'boolean'
      })
      .option('max-file-size', {
        alias: 'm',
        describe: '文件大小限制',
        default: 99999,
        type: 'number'
      })
      .argv

    config.debug = args.debug
    config.path = args.path
    config.name = args.name
    config.port = args.port
    config.exclude = args.exclude
    config.test = args.test

    // 工程名单独处理，可以是第一个arguments参数
    if (config.name === '') {
      if (args._.length > 0 && typeof args._[0] === 'string' && args._[0] !== '') {
        config.name = args._[0]
      } else {
        config.name = 'DEFAULT'
      }
    }

    // 定义domain
    config.domain = `http://${ip.address()}${config.port !== 80 ? ':' + config.port : ''}`

    this.config = config

    if (this.config.debug >= 1) {
      for (const _configKey in this.config) {
        const _configValue = '' + this.config[_configKey]
        console.log('[dort]'.yellow.bold + ' - ' + '<' + _configKey.green + '>' + ': ' + _configValue.cyan)
      }
    }
  }

  setSite (_success, _isRunning, _error) {
    this.site = new Site(this.config, _success, _isRunning, _error)
  }

  setSocket () {
    this.config.socket = socketIo.listen(this.site.server)

    // 新建socket监听watchSocket
    const watchSocket = this.config.socket.of('/watch')

    watchSocket.on('connection', socket => {
      let project

      if (this.config.debug >= 1) {
        console.log('[dort]'.green.bold + ' - ' + 'socket connect'.cyan + ' - ' + socket.id.cyan)
      }

      socket.on('start_project', data => {
        project = this.projects.createProject(data)

        if (this.config.debug >= 1) {
          console.log('[dort] > socket'.green.bold + ' - ' + 'start_project'.cyan)
        }
      })

      socket.on('create_file', data => {
        if (this.config.debug >= 1) {
          console.log('[dort] > socket'.green.bold + ' - ' + 'create_file'.cyan + ' - ' + data.path.cyan)
        }
      })

      socket.on('update_file', data => {
        if (this.config.debug >= 1) {
          console.log('[dort] > socket'.green.bold + ' - ' + 'update_file'.cyan + ' - ' + data.path.cyan)
        }
      })

      socket.on('delete_file', data => {
        if (this.config.debug >= 1) {
          console.log('[dort] > socket'.green.bold + ' - ' + 'delete_file'.cyan + ' - ' + data.path.cyan)
        }
      })

      socket.on('disconnect', () => {
        if (this.config.debug >= 1) {
          console.log('[dort] > socket'.green.bold + ' - ' + 'disconnect'.cyan + ' - ' + socket.id.cyan)
        }
      })
    })
  }

  setProjects () {
    this.projects = new Projects(this.config)
  }

  setWatch () {
    this.watch = new Watch(this.config)
  }
}

const app = new App()
