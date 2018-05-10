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
    server: null,
    isConnecting: false,
    isLoading: false
  },
  getters: {
    server: state => state.server,
    isConnecting: state => state.isConnecting,
    isLoading: state => state.isLoading
  },
  mutations: {
    SET_SERVER (state, data) {
      state.server = data
    },
    SET_CONNECT (state, data) {
      state.isConnecting = data
    },
    SET_LOADING (state, data) {
      state.isLoading = data
    }
  },
  actions: {
    setServer ({ commit }, data) {
      commit('SET_SERVER', data)
    },
    setConnect ({ commit }, data) {
      commit('SET_CONNECT', !!data)
    },
    setLoading ({ commit }, data) {
      commit('SET_LOADING', !!data)
    }
  }
})
