/**
 * 文件结构模块
 */

class FileTree {
  /**
   * 初始化文件结构
   * @param {object} options 配置参数 ()
   */
  constructor (options = {}) {
    // 初始化统计个数
    this.fileCount = 0
    this.folderCount = 0
    this.allCount = 0

    this.files = []
    this.folders = []
    this.addFolder('.', {})
  }

  /**
   * 更新统计数据
   */
  updateCount () {
    let filesCount = 0
    let foldersCount = 0

    // 自调用迭代统计
    const traverseFolder = (folder) => {
      folder.folders.map(item => {
        traverseFolder(item)
        foldersCount++
      })

      filesCount += folder.files.length
    }

    traverseFolder(this.folders[0])

    this.filesCount = filesCount
    this.foldersCount = foldersCount
    this.allCount = this.filesCount + this.foldersCount
  }

  /**
   * 按标准格式化路径
   * @param {string} path 路径
   */
  formatPath (path = '') {
    if (typeof path !== 'string') {
      console.warn('[formatPath]: path is not valid')
      return false
    }

    // 去除多余空格，重复的/，首尾的/
    let newPath = path.trim()
    newPath = newPath.replace(/\/+/g, '/')
    newPath = newPath.replace(/\/$/, '')
    newPath = newPath.replace(/^\//, '')
    // 开头位置的'./'
    if (newPath !== '.' && newPath.search('./') !== 0) {
      newPath = './' + newPath
    }

    return newPath
  }

  /**
   * 增加文件夹
   * @param {string} path 路径
   * @param {object} data 数据
   */
  addFolder (path = '', data = {}) {
    if (typeof path !== 'string') {
      console.warn('[addFolder]: path is not valid')
      return false
    }

    if (typeof data !== 'object') {
      console.warn('[addFolder]: data is not valid')
      return false
    }

    // 将文件路径分级
    const newPath = this.formatPath(path)
    const pathArr = newPath.split('/')

    let folders = this.folders
    let folder

    // 按照路径层层迭代, 在最后一层迭代时增加文件夹
    pathArr.map(item => {
      let find = folders.find(folder => item === folder.name)
      if (find) {
        folder = find
        folders = find.folders
      } else {
        folder = {
          folders: [],
          files: [],
          name: item
        }

        Object.assign(folder, data)

        folders.push(folder)
        folders = folder.folders
      }
    })

    // 更新统计数据
    this.updateCount()

    return folder
  }

  /**
   * 删除文件夹
   * @param {string} path 路径
   */
  rmFolder (path = '') {
    if (typeof path !== 'string') {
      console.warn('[rmFolder]: path is not valid')
      return false
    }

    const emptyFolder = folder => {
      let folders = folder.folders.concat()
      folders.map((item, index) => {
        emptyFolder(item)
        folder.folders.splice(index, 1)

        // 执行回调
        if (item.onRemove && typeof item.onRemove === 'function') {
          item.onRemove.call(this, item)
        }
      })

      let files = folder.files.concat()
      files.map((file, index) => {
        folder.files.splice(index, 1)

        // 执行回调
        if (file.onRemove && typeof file.onRemove === 'function') {
          file.onRemove.call(this, file)
        }
      })
    }

    // 将文件路径分级
    const newPath = this.formatPath(path)
    const pathArr = newPath.split('/')

    // 将最后一级弹出来
    const pathLast = pathArr.pop()

    let folders = this.folders
    let folder

    // 按照路径层层迭代，false即退出循环
    pathArr.every(item => {
      let find = folders.find(folder => item === folder.name)

      if (find) {
        folder = find
        folders = find.folders
      } else {
        folder = null
        folders = null
      }

      return find
    })

    // 查找最后一级目录
    if (folder && folders) {
      let index = folders.findIndex(item => item.name === pathLast)

      // 存在则删除
      if (index !== -1) {
        let folder = folders[index]

        emptyFolder(folder)
        folders.splice(index, 1)

        // 执行回调
        if (folder.onRemove && typeof folder.onRemove === 'function') {
          folder.onRemove.call(this, folder)
        }

        // 更新统计数据
        this.updateCount()

        return true
      }
    }

    return false
  }
}

module.exports = FileTree
