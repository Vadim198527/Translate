import {fromXmlToHtml} from '../../components/jscomponents/fromXmlToHtml'
import * as fb from 'firebase'

class Book {
  constructor({html, vocabalary, currentVocabItemId, currentPage}) {
    this.html = {}
    html.forEach(elem => {
      this.html[elem.id] = elem.outerHTML
    })

    this.vocabalary = vocabalary
    this.currentVocabItemId = currentVocabItemId
  }
}

export const book = {
  namespaced: true,

  state: {
    id: '',
    vocabalary: {
      currentWordId: -1,
      vocabalaryItems: ''
    },
    currentVocabItemId: 0,
    htmlSource: []
  },

  getters: {
    currentWord(state) {
      if (+state.vocabalary.currentWordId !== -1) {
        const id = +state.vocabalary.currentWordId
        const currentWord = state.vocabalary.vocabalaryItems.find(item => +item.id.slice(4) === id)
        return currentWord
      }
      return ''
    },

    id(state) {
      return state.id
    },

    htmlSource(state) {
      return state.htmlSource
    },

    currentVocabItemId(state) {
      return state.currentVocabItemId
    },

    vocabalary(state) {
      return state.vocabalary
    },

  },

  mutations: {
    setId(state, payload) {
      state.id = payload
    },

    setHtmlSource(state, payload) {
      state.htmlSource = payload
    },

    setCurrentVocabItemId(state, payload) {
      state.currentVocabItemId = payload
    },

    setVocabulary(state, payload) {
      state.vocabalary = payload
    },


    incCurrentVocabItemId(state) {
      state.currentVocabItemId++
    },

    addVocabularyItem(state, payload) {
      state.vocabalary.currentWordId = payload.id.slice(4)
      if (!state.vocabalary.vocabalaryItems) {
        state.vocabalary.vocabalaryItems = []
      }
      state.vocabalary.vocabalaryItems.push(payload);
    },

    setCurrentWordId(state, payload) {
      state.vocabalary.currentWordId = payload
    },

    updatePage(state, {pageId, div}) {
      const index = +pageId.slice(4)
      state.htmlSource[index] = div
    }

  },

  actions: {
    async formatToHtml({commit, getters, rootGetters, dispatch}) {
      commit('shared/setLoad', true, {root: true})

      try {
        const style = rootGetters['otherData/paramsOfWindow']
        const fbSource = getters['fbSource']

        const html = []
        await new Promise(resolve => {
          setTimeout(() => {
            fromXmlToHtml(rootGetters['otherData/fbSource'], html, style)
            commit('shared/setLoad', false, {root: true})
            resolve()
          }, 1000)
        })

        commit('setHtmlSource', html)
        const title = rootGetters['otherData/fbSource'].querySelector('book-title').innerHTML
        const book = new Book({
          html,
          vocabalary: {
            vocabalaryItems: []
          },
          currentVocabItemId: getters['currentVocabItemId'],
        })
        const id = await fb.database().ref('books').push(book).key
        dispatch('library/addMetaInf', {
          id,
          title,
          currentPage: 0,
          pageQuant: html.length,
          imgLink: 'https://cdn.vuetifyjs.com/images/cards/desert.jpg'//Доработать
        }, {root: true})
        const resp = await fb.storage().ref(`books/${id}.fb2`).put(rootGetters['otherData/fbFile'])
        const link = resp.metadata.name
        dispatch('otherData/setFbFile', link, {root: true})
        return 'ready'
      } catch (err) {
        commit('shared/setLoad', false, {root: true})
        throw err
      }
    },


    async initState({commit, getters, dispatch}, payload) {
      try {
        if (payload) {
          await fb.database().ref('library').update({
            currentBookId: payload.id
          })
          commit('setId', payload.id)
        } else {
          const resp = await fb.database().ref('library/currentBookId').once('value')
          const id = resp.val()
          commit('setId', id);
          await dispatch('library/initState', null, {root: true})
        }
        if (getters['id']) {
          const respData = await fb.database().ref(`books/${getters['id']}`).once('value');
          const bookInfo = respData.val()
          let vocabalaryItems = []
          if (bookInfo.vocabalary && bookInfo.vocabalary.vocabalaryItems) {
            vocabalaryItems = bookInfo.vocabalary.vocabalaryItems
          }
          commit('setVocabulary', {
            currentWordId: getters['vocabalary'].currentWordId,
            vocabalaryItems
          })

          const htmlSource = []


          const parser = new DOMParser()
          let keys = Object.keys(bookInfo.html)

          keys.sort((a, b) => {
            const first = a.slice(4)
            const second = b.slice(4)

            return first - second
          })

          keys.forEach(key => {
            const doc = parser.parseFromString(bookInfo.html[key], 'text/xml')
            htmlSource.push(doc.querySelector('div'))
          })

          commit('setHtmlSource', htmlSource)
        }
      } catch (err) {
        throw err
      }

    },

    async incCurrentVocabItemId({commit, getters}) {
      try {
        commit('incCurrentVocabItemId')
        await fb.database().ref(`books/${getters['id']}`).update({
          currentVocabItemId: getters['currentVocabItemId']
        })
      } catch (err) {
        throw err
      }
    },

    async setContentXML({commit, dispatch}, payload) {
      try {
        const reader1 = new FileReader()
        const reader2 = new FileReader()

        let encoding
        let xml

        reader1.readAsText(payload)

        await new Promise((resolve) => {
          reader1.onload = (e) => {
            const text = e.target.result
            encoding = text.slice(
              text.indexOf('encoding="') + 10,
              text.indexOf('"', text.indexOf('encoding="') + 10)
            )
            resolve()
          }
        })


        reader2.readAsText(payload, encoding)
        await new Promise(resolve => {
          reader2.onload = e => {
            const parser = new DOMParser()
            xml = parser.parseFromString(e.target.result, 'text/xml')
            resolve()
          }
        })

        commit('otherData/setFbSource', xml, {root: true})
        commit('otherData/addIdToXml', undefined, {root: true})
      } catch (err) {
        throw err
      }

    },

    async addVocabularyItem({commit, getters}, payload) {
      try {
        commit('addVocabularyItem', payload)

        await fb.database().ref(`books/${getters['id']}`).update({
          vocabalary: getters['vocabalary']
        })
      } catch (err) {
        throw err
      }
    },

    setCurrentWordId({commit, getters}, payload) {
      const currentWordId = +payload.slice(4)
      commit('setCurrentWordId', currentWordId)

    },


    async updatePage({commit, getters}, {pageId, pageInnerHTML}) {
      try {
        const div = document.createElement('div')
        div.id = pageId
        div.innerHTML = pageInnerHTML
        const objChange = {}
        objChange[pageId] = div.outerHTML
        commit('updatePage', {pageId, div})
        await fb.database().ref(`books/${getters['id']}`).child('html').update(objChange)
      } catch (err) {
        throw err
      }

    },

    async deleteVocabalaryItem({commit, getters}, payload) {
      try {
        const vocabalary = getters['vocabalary']
        const currentWordId = vocabalary.currentWordId
        const vocabularyItems = vocabalary.vocabalaryItems
        const newVocabularyItems = vocabularyItems.filter(item => item.id !== payload)

        await fb.database().ref(`books/${getters['id']}/vocabalary`).update({
          vocabalaryItems: newVocabularyItems
        })

        const newCurrentWordId = +currentWordId !== +payload.slice(4) ? currentWordId : -1
        const newVocabalary = {
          currentWordId: newCurrentWordId,
          vocabalaryItems: newVocabularyItems
        }
        commit('setVocabulary', newVocabalary)
      } catch (err) {
        throw err
      }
    }
  }

}
