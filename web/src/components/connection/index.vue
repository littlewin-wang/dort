<template>
  <div></div>
</template>

<script>
import socketIoClient from 'socket.io-client'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'connection',
  computed: {
    ...mapGetters('project', ['active'])
  },
  watch: {
    active: 'handleProject'
  },
  methods: {
    ...mapActions('project', ['setProjects']),
    ...mapActions('files', ['setFiles']),
    handleProject (data) {
      // 无效数据退出
      if (!data) {
        return
      }

      // 建立到当前project的连接
      const projectUrl = `http://localhost:4574/project/${data.slug}`
      this.projectSocket = socketIoClient(projectUrl)

      this.projectSocket.on('connect', () => {
        if (process.env.NODE_ENV !== 'production') {
          console.log('[WEB] - ' + `project ${data.slug} connected`)
        }
      })

      this.projectSocket.on('update_project', (data) => {
        if (process.env.NODE_ENV !== 'production') {
          console.log('[WEB] - ' + `project ${data.name} updated`)
        }

        this.setFiles(data.files.files)
      })

      this.projectSocket.on('create_file', (data) => {
        console.log(data)
      })

      this.projectSocket.on('delete_file', (data) => {
        console.log(data)
      })

      this.projectSocket.on('createVersion', (data) => {
        console.log(data)
      })
    }
  },
  created () {
    // 建立socket连接
    const projectsUrl = 'http://localhost:4574/projects'
    this.projectsSocket = socketIoClient(projectsUrl)

    this.projectsSocket.on('connect', () => {
      if (process.env.NODE_ENV !== 'production') {
        console.log('[WEB] - ' + 'projects connected')
      }
    })

    this.projectsSocket.on('update_projects', (data) => {
      if (process.env.NODE_ENV !== 'production') {
        console.log('[WEB] - ' + 'projects updated')
      }

      // 更新状态
      this.setProjects(data)
    })
  }
}
</script>
