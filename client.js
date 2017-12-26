const socketIoClient = require('socket.io-client')

const projectsUrl = 'http://localhost:4574/project/demo'
let projectsSocket = socketIoClient(projectsUrl)

projectsSocket.on('connect', () => {
  console.log('connect')
})

projectsSocket.on('create_file', (data) => {
  console.log()
  console.log('create_file', data)
  console.log()
})

projectsSocket.on('delete_file', (data) => {
  console.log()
  console.log('delete_file', data)
  console.log()
})

projectsSocket.on('createVersion', (data) => {
  console.log()
  console.log('createVersion', data)
  console.log()
})
