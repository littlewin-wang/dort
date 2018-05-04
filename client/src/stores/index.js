import Vue from 'vue'
import Vuex from 'vuex'

import chat from './modules/chat'
import files from './modules/files'
import project from './modules/project'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    chat,
    files,
    project
  },
  state: {
    server: null
  },
  getters: {
    server: state => state.server
  },
  mutations: {
    SET_SERVER (state, data) {
      state.server = data
    }
  },
  actions: {
    setServer ({ commit }, data) {
      commit('SET_SERVER', data)
    }
  }
})
