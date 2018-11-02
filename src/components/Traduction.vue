<template>
  <v-layout justify-space-around>
    <v-flex xs10>
      <v-card class="elevation-12">
        <v-list subheader three-line>
          <template v-for="elem in currentWord.tradSlov.def"
          >
            <v-divider></v-divider>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>{{elem.text}}</v-list-tile-title>
                <v-list-tile-sub-title>
                  {{formTraduction(elem)}}
                </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>

          <template v-for="elem in currentWord.tradTrans.text">
            <v-divider></v-divider>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>Переводчик</v-list-tile-title>
                <v-list-tile-sub-title>
                  {{elem}}
                </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>

        </v-list>
      </v-card>
    </v-flex>

  </v-layout>
</template>

<script>

  export default {

    computed: {
      currentWord () {
        return this.$store.getters['book/currentWord']
      },

    },

    methods: {
      formTraduction (elem) {
        let result = '';
        for (let i = 0; i < elem.tr.length - 1; i++) {
          result += elem.tr[i].text + ', '
        }
        const lastIndex = elem.tr.length - 1;
        result += elem.tr[lastIndex].text;
        return result
      }
    }

  }
</script>

<style scoped>

</style>
