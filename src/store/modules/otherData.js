import * as fb from "firebase";

export const otherData = {
  namespaced: true,
  state: {
    paramsOfWindow: {
      styleOfWindow: '',
      width: 0,
      height: 0
    },
    fbFile: null,
    fbSource: null,
  },





  getters: {
    paramsOfWindow(state) {
      return state.paramsOfWindow
    },

    fbFile(state) {
      return state.fbFile
    },

    fbSource(state) {
      return state.fbSource
    }
  },

  mutations: {
    setParamsOfWindow(state, payload) {
      state.paramsOfWindow = payload
    },

    setFbFile(state, payload) {
      state.fbFile = payload
    },

    setFbSource(state, payload) {
      state.fbSource = payload
    },


    addIdToXml(state) {
      const allTages = state.fbSource.querySelectorAll('*')
      for (let i = 0; i < allTages.length; i++) {
        if (allTages[i].tagName.toLowerCase() === 'p' || allTages[i].tagName.toLowerCase() === 'title') {
          allTages[i].id = 'cnt' + i
        }
      }
    },
  },

  actions: {
    setParamsOfWindow({commit}, payload) {
      commit('setParamsOfWindow', payload)
    },

    async setFbFile({commit}, payload) {
      try {
        await fb.database().ref('otherInfo').update({
          fbFile: payload
        })
        commit('setFbFile', payload)
      } catch (err){
        throw err
      }
    }
  },
}
