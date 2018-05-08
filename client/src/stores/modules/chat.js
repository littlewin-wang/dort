const state = {
  open: false,
  user: null,
  preUser: null,
  messages: [],
  preMessage: null,
  target: null,
  unread: 0
}

const getters = {
  open: state => state.open,
  user: state => state.user,
  preUser: state => state.activeUser,
  messages: state => state.messages,
  preMessage: state => state.activeMessage,
  target: state => state.target,
  unread: state => state.unread
}

const actions = {
  // empty message box
  emptyMessages ({ commit }) {
    commit('EMPTY_MESSAGES')
  },

  createMessage ({ commit }, data) {
    commit('CREATE_MESSAGE', data)
  },

  updateUser ({ commit }, data) {
    commit('UPDATE_USER', data)
  },

  setUser ({ commit }, data) {
    commit('SET_USER', data)
  },

  setMessage ({ commit }, data) {
    commit('SET_MESSAGE', data)
  },

  setTarget ({ commit }, data) {
    commit('SET_TARGET', data)
  },

  openChat ({ commit }) {
    commit('OPEN_CHAT')
  },

  closeChat ({ commit }) {
    commit('CLOSE_CHAT')
  },

  toggleChat ({ commit }) {
    commit('TOGGLE_CHAT')
  }
}

const mutations = {
  EMPTY_MESSAGES (state) {
    state.messages = []
  },

  CREATE_MESSAGE (state, data) {
    state.messages.push(data)

    // add unread if chat window is not open
    if (!state.open || document.hidden) {
      state.unread++
    }

    // only contain recent 100 messages
    if (state.messages.length > 100) {
      state.messages.splice(0, state.messages.length - 100)
    }
  },

  UPDATE_USER (state, data) {
    state.user = data
  },

  SET_USER (state, data) {
    state.preUser = data
  },

  SET_MESSAGE (state, data) {
    state.preMessage = data
  },

  SET_TARGET (state, data) {
    state.target = data
  },

  OPEN_CHAT (state) {
    state.unread = 0
    state.open = true
  },

  CLOSE_CHAT (state) {
    state.open = false
  },

  TOGGLE_CHAT (state) {
    state.unread = 0
    state.open = !state.open
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
