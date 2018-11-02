<!--suppress ALL -->
<template>
  <v-card class="elevation-9">
    <v-layout justify-space-around>
      <v-flex xs12>
        <v-img
          :src=book.imgLink
          :aspect-ratio="18/6"
        ></v-img>
      </v-flex>
    </v-layout>


    <v-card-title primary-title>
      <v-layout justify-center>
        <div class="headline mb-0" style="text-align: center">{{book.title}}</div>

      </v-layout>
    </v-card-title>

    <v-layout justify-space-around>
      <v-flex
        style="text-align: center"
      >{{this.progress}}%</v-flex>
    </v-layout>
    <v-progress-linear
      v-model="progress"
    ></v-progress-linear>

    <v-card-actions>
      <v-layout justify-space-around>
        <v-btn flat color="orange" @click="onClick">Читать</v-btn>

        <v-btn
          @click="onDelete"
          flat
          icon
          color="blue-grey lighten-4"
        >
          <v-icon>delete</v-icon>
        </v-btn>
      </v-layout>

    </v-card-actions>

  </v-card>
</template>

<script>
  export default {
    props: ['book'],
    data () {
      return {
      }
    },

    computed: {
      progress () {
        if (this.book.currentPage !== 0) {
          return Math.round(this.book.currentPage * 100/this.book.pageQuant);
        } else {
          return 0
        }
      }
    },

    methods: {
      onClick () {
        this.$store.dispatch('book/initState', this.book)
          .then(() => {
            this.$router.push('/read')
          })
      },

      onDelete() {
        this.$store.dispatch('library/deleteBook', this.book)
      }
    }
  }
</script>

<style scoped>

</style>
