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
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
