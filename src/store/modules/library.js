import * as fb from 'firebase'


export const library = {
  namespaced: true,
  state: {
    currentBookId: '',
    booksData: []
  },


  getters: {
    currentBookId(state) {
      return state.currentBookId
    },

    booksData(state) {
      return state.booksData
    }

  },

  mutations: {
    addMetaInf(state, payload) {
      state.booksData = state.booksData ? state.booksData: []
      state.booksData.push(payload)
    },

    setBooksData(state, payload) {
      state.booksData = payload
    },

    setCurrentBookId(state, payload) {
      state.currentBookId = payload
    },

    initState(state, payload) {
      if (payload) {
        state.currentBookId = payload.currentBookId;
        state.booksData = payload.booksData;
      }
    },

    incPage(state, payload) {
      const bookMeta = state.booksData.find(bookMeta => bookMeta.id === payload)
      if (bookMeta.pageQuant - 1 > bookMeta.currentPage) {
        bookMeta.currentPage++;
      }
    },

    decPage(state, payload) {
      const bookMeta = state.booksData.find(bookMeta => bookMeta.id === payload)
      if (bookMeta.currentPage > 0) {
        bookMeta.currentPage--;
      }
    }

  },

  actions: {
    async addMetaInf({commit, getters}, payload) {
      try {
        commit('addMetaInf', payload)
        commit('setCurrentBookId', payload.id)
        await fb.database().ref('library').update({
          currentBookId: getters['currentBookId'],
          booksData: getters['booksData']
        })
      } catch (err) {
        throw err
      }
    },

    async setCurrentBookId({commit}, payload) {
      try {
          await fb.database().ref('library').update({
            currentBookId: payload
          })
        commit('setCurrentBookId', payload)
      } catch(err) {
          throw err
      }
    },

    async initState({commit}) {
      try {
        let libraryData = await fb.database().ref('library').once('value').then(res => res.val())
        commit('initState', libraryData)
      } catch (err) {
        throw err
      }


    },

    async incPage({commit, getters}, payload) {
      try {
        commit('incPage', payload)
        await fb.database().ref('library/').update({
          booksData: getters['booksData']
        })
      } catch (err) {
        throw err
      }
    },

    async decPage({commit, getters}, payload) {
      try {
        commit('decPage', payload)
        await fb.database().ref('library/').update({
          booksData: getters['booksData']
        })
      } catch (err) {
        throw err
      }
    },

    async deleteBook({commit, getters}, payload) {

      // await fb.storage().ref('books').child(payload.linkXML).delete()
      await fb.database().ref('books/' + payload.id).remove()
      const booksData = getters['booksData']
      const newBooksData = booksData.filter(book => book.id !== payload.id)
      const currentBookId = payload.id !== getters['currentBookId'] ? getters['currentBookId'] : ''
      commit('setBooksData', newBooksData)
      commit('setCurrentBookId', currentBookId)
      await fb.database().ref('library').update({
        currentBookId: getters['currentBookId'],
        booksData: getters['booksData']
      })
    }

  },
}
