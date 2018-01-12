import FileTree from '@/utils/FileTree/'

const state = {
  tree: new FileTree({ rmEmpty: true }),
  activeFile: null,
  search: ''
}

const getters = {
  tree: state => state.tree,
  activeFile: state => state.activeFile,
  search: state => state.search
}

const actions = {
  // 文件更新状态响应
  setFiles ({ commit }, data) {
    commit('SET_FILES', data)
  },
  createFile ({ commit }, data) {
    commit('CREATE_FILE', data)
  },
  deleteFile ({ commit }, data) {
    commit('DELETE_FILE', data)
  },
  createVersion ({ commit }, data) {
    commit('CREATE_VERSION', data)
  },

  // 当前文件
  setFile ({ commit }, data) {
    commit('SET_FILE', data)
  },

  // 搜索文件
  searchFile ({ commit }, data) {
    commit('SEARCH_FILE', data)
  }
}

const mutations = {
  SET_FILES (state, data) {
    state.tree = new FileTree({ rmEmpty: true })

    data.length && data.map((file, index) => {
      state.tree.addFile(file.path.full, file)
    })

    if (process.env.NODE_ENV !== 'production') {
      state.tree.getTree(true)
    }
  },

  CREATE_FILE (state, data) {
    state.tree.addFile(data.path.full, data)

    if (process.env.NODE_ENV !== 'production') {
      state.tree.getTree(true)
    }
  },

  DELETE_FILE (state, data) {
    state.tree.rmFile(data.path.full)

    if (process.env.NODE_ENV !== 'production') {
      state.tree.getTree(true)
    }
  },

  CREATE_VERSION (state, data) {
    const file = state.tree.getFile(data.file)

    if (file) {
      file.versions.unshift(data.version)
    }
  },

  SET_FILE (state, path) {
    // 路径不存在
    if (!path) {
      if (state.activeFile) {
        state.activeFile.active = false
      }
      state.activeFile = null
    } else {
      const file = state.tree.getFile(path)
      if (!state.activeFile || state.activeFile.id !== file.id) {
        if (state.activeFile) {
          state.activeFile.active = false
        }

        state.activeFile = file
        state.activeFile.active = true
      }
    }
  },

  SEARCH_FILE (state, data) {
    state.search = data
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
