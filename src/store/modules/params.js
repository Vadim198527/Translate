export const params = {
  namespaced: true,
  state: {
    quickMode: false
  },

  getters:{
    quickMode (state) {
      return state.quickMode
    }
  },

  mutations:{
    setQuickMode (state, payload) {
      state.quickMode = payload
    }
  },

  actions: {
    setQuickMode ({commit}, payload) {
      commit('setQuickMode', payload)
    }
  }
}
