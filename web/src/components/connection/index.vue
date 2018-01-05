<template>
  <div></div>
</template>

<script>
import socketIoClient from 'socket.io-client'

export default {
  name: 'connection',
  data () {
    return {
      project: null
    }
  },
  watch: {
    project: 'handleProject'
  },
  methods: {
    handleProject (data) {
      console.log('watch', data)

      // 无效数据退出
      if (!data) {
        return
      }

      // 建立到当前project的连接
      const projectUrl = `http://localhost:4574/project/${data.slug}`
      this.projectSocket = socketIoClient(projectUrl)

      this.projectSocket.on('connect', () => {
        console.log('[WEB] - ' + `project ${data.slug} connected`)
      })

      this.projectSocket.on('update_project', (data) => {
        console.log(data)
      })

      this.projectSocket.on('create_file', (data) => {
        console.log(data)
      })

      this.projectSocket.on('delete_file', (data) => {
        console.log(data)
      })

      this.projectSocket.on('createVersion', (data) => {
        console.log(new Date())
        console.log(data)
      })
    }
  },
  created () {
    // 建立socket连接
    const projectsUrl = 'http://localhost:4574/projects'
    this.projectsSocket = socketIoClient(projectsUrl)

    this.projectsSocket.on('connect', () => {
      console.log('[WEB] - ' + 'projects connected')
    })

    this.projectsSocket.on('update_projects', (data) => {
      console.log('[WEB] - ' + 'projects updated')
      console.log(data)
      this.project = data.projects.demo
    })
  }
}
</script>
