export const shared = {
  namespaced: true,
  state: {
    isLoading: false,
    err: null
  },

  getters: {
    isLoading (state) {
      return state.isLoading
    }
  },

  mutations: {
    setLoad (state, payload) {
      state.isLoading = payload
    }
  },

  actions: {
    setLoad ({commit}, payload) {
      commit('setLoad', payload)
    }

  },
}
