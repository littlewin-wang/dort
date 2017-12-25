/**
 * ID模块
 */

class IDs {
  constructor() {
    this.lastId = 0
  }

  getId () {
    const lastId = ++this.lastId

    return lastId
  }
}

module.exports = new IDs()
