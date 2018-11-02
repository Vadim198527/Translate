<!--suppress ALL -->
<template>
  <v-layout align-center>
    <v-flex mb-5 mx-3>
      <v-btn small fab @mouseup="decPage">
        <v-icon>chevron_left</v-icon>
      </v-btn>
    </v-flex>

    <v-flex xs12>
      <v-card class="elevation-12">
        <v-card-text>
          <div @mouseup="onMouseUp" @dblclick="onDblClick" @mousedown="onMouseDown"
               style="overflow-y: hidden; height: 500px"
               v-html="page"
               ref="textWindow"
          ></div>
        </v-card-text>
      </v-card>
    </v-flex>

    <v-flex mb-5 mx-3>
      <v-btn small fab @mouseup="incPage">
        <v-icon>chevron_right</v-icon>
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
  import {textFunctions} from '../components/jscomponents/domFunctions'

  export default {
    mounted() {
      if (this.$store.getters['params/quickMode']) {
        const style = window.getComputedStyle(this.$refs.textWindow).cssText;
        const clientWidth = this.$refs.textWindow.clientWidth;
        const clientHeight = this.$refs.textWindow.clientHeight;

        const result = {
          styleOfWindow: style,
          clientWidth: clientWidth,
          clientHeight: clientHeight
        };
        this.$store.dispatch('otherData/setParamsOfWindow', result);

        this.$router.push('/library');
        new Promise((resolve) => {
          const result = this.$store.dispatch('book/formatToHtml')
          if (result === 'ready') {
            resolve(result)
          }
        });
      } else {
        this.$store.dispatch('book/initState')
      }
    },


    data() {
      return {
        word: '',
        wordId: ''
      }
    },


    computed: {
      pageNumber() {
        const bookId = this.$store.getters['book/id']
        if (bookId) {
          const booksData = this.$store.getters['library/booksData']
          if (booksData.length !== 0) {
            const bookData = booksData.find(item => item.id === bookId);
            return bookData.currentPage
          }
        }
        return -1
      },

      page() {
        const htmlSource = this.$store.getters['book/htmlSource']
        if (htmlSource.length !== 0 && this.pageNumber !== -1) {
          return htmlSource[this.pageNumber].innerHTML
        }
        return ''
      },

      pageId() {
        const htmlSource = this.$store.getters['book/htmlSource']
        if (htmlSource.length !== 0 && this.pageNumber !== -1) {
          return htmlSource[this.pageNumber].id
        }
        return null
      }

    },

    methods: {
      incPage() {
        const id = this.$store.getters['book/id']
        this.$store.dispatch('library/incPage', id)
      },

      decPage() {
        const id = this.$store.getters['book/id']
        this.$store.dispatch('library/decPage', id)
      },

      onMouseUp(e) {
        setTimeout(() => {
          const spanResult = textFunctions.select(this)
          if (spanResult) {
            this.word = spanResult.innerText.trim()
            this.wordId = spanResult.id
          }
          if (this.$refs.textWindow.innerHTML !== this.page) {
            this.$store.dispatch('book/updatePage', {
              pageId: this.pageId,
              pageInnerHTML: this.$refs.textWindow.innerHTML
            })
          }

        }, 300)
      },

      onDblClick(e) {
        if (e.target.classList.contains('selection')) {
          textFunctions.cancelSelect(e.target, this)
          if (this.$refs.textWindow.innerHTML !== this.page.innerHTML) {
            this.$store.dispatch('book/deleteVocabalaryItem', e.target.id)
            this.$store.dispatch('book/updatePage', {
              pageId: this.pageId,
              pageInnerHTML: this.$refs.textWindow.innerHTML
            })
          }
        }
      },

      onMouseDown(e) {
        if (e.target.classList.contains('selection')) {
          const id = e.target.id
          this.$store.dispatch('book/setCurrentWordId', id)
        }
      },

      async traduct({title, id}) {
        const key2 = 'dict.1.1.20180909T033927Z.08b54a2fd87a24e9.8148c4c47790771a8266321ba79c8323a27e7bb5'
        const key1 = 'trnsl.1.1.20180909T035828Z.c37130e31dd106a2.bd2221629bb80bf4d0a3cbb96a87614a3e8f0fcd'
        const lang = 'es-ru'

        let reqTrans = 'https://translate.yandex.net/api/v1.5/tr.json/translate?'
          + 'key=' + key1 + '&text=' + title + '&lang=' + lang + '&format=plain'

        let reqSlovar = 'https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key='
          + key2 + '&lang=es-ru&text=' + title + '&flags=4'

        let result = {
          id,
          title,
          tradSlov: '',
          tradTrans: ''
        };

        let response = await this.$http.get(reqSlovar)
        if (response.status === 200) {
          const data = await response.json();
          result.tradSlov = data
        }

        response = await this.$http.get(reqTrans)
        if (response.status === 200) {
          const data = await response.json();
          result.tradTrans = data
        }


        this.$store.dispatch('book/addVocabularyItem', result)
      }
    },

    watch: {
      word() {
        this.traduct({id: this.wordId, title: this.word})
      }
    }
  }
</script>

<style scope>
  #textField::-webkit-scrollbar {
    width: 0;
  }

  p {
    margin-bottom: 5px;
  }

  p.start {
    text-indent: 20px;
  }

  span.selection {
    background-color: rgb(115, 129, 241);
  }
</style>
