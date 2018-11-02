<template>
  <v-layout wrap ml-3>
    <v-flex lg10 sm12 order-xs2 order-lg1>
      <v-layout row wrap>
        <v-flex
          v-for="book in books"
          md4 sm6 xs12 px-4 py-4
        >
          <app-book :book="book"></app-book>
        </v-flex>
      </v-layout>
    </v-flex>


    <v-flex order-xs1 order-lg2 pt-4>
      <v-layout align-center>
        <app-load-book></app-load-book>
        <v-flex class="text--secondary">Добавить книгу</v-flex>
      </v-layout>

    </v-flex>
  </v-layout>

</template>

<script>
  import Book from './Book'
  import LoadModal from './modals/LoadModal'

  export default {
    created () {
      this.$store.dispatch('library/initState')
    },

    data () {
      return {
      }
    },

    computed: {
      books () {
        return this.$store.getters['library/booksData']
      }
    },

    components: {
      AppBook: Book,
      AppLoadBook: LoadModal
    }
  }
</script>

<style scoped>

</style>
