import Vue from 'vue'
import Vuex from 'vuex'
import files from './modules/files'
import project from './modules/project'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    files,
    project
  }
})
