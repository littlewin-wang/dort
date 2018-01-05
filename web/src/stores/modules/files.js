import FileTree from '@/utils/FileTree/'

const state = {
  tree: new FileTree({ rmEmpty: true })
}

const getters = {
  tree: state => state.tree
}

const actions = {
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
      file.versions.push(data.version)
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
