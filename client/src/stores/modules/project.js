const state = {
  all: {},
  active: null
}

const getters = {
  all: state => state.all,
  active: state => state.active
}

const actions = {
  setProjects ({ commit }, data) {
    commit('SET_PROJECTS', data)
  },

  addProject ({ commit }, data) {
    commit('ADD_PROJECT', data)
  },

  setProject ({ commit }, data) {
    commit('SET_PROJECT', data)
  }
}

const mutations = {
  SET_PROJECTS (state, data) {
    state.all = data

    if (!state.all.projects) {
      state.active = null
      return
    }

    // 删除了当前项目
    if (state.active) {
      if (!state.all.projects[state.active.slug]) {
        state.active = null
      }
    } else {
      // 重置当前项目
      const keys = Object.keys(state.all.projects)

      if (keys.length > 0) {
        state.active = state.all.projects[keys[0]]
      }
    }
  },

  SET_PROJECT (state, data) {
    state.active = data
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
