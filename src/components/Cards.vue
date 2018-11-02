<!--suppress ALL -->
<template>
  <div>
    <v-layout justify-space-around>
      <v-flex xs10 sm5 md4 mt-4 class="elevation-9">
        <v-card>
          <v-card-title primary-title>
            <v-layout justify-space-around column>
              <v-flex pb-3 class="headline text-xs-center">
                lorem
              </v-flex>
              <v-divider></v-divider>
            </v-layout>
          </v-card-title>

          <v-card-actions>
            <v-layout px-3 justify-space-around>
              <v-btn flat class="primary" sm12
                     @click="showHelp"
              >{{titleButtonHelp}}</v-btn>
              <v-spacer></v-spacer>
              <v-btn icon class="success" sm12>
                <v-icon>thumb_up_alt</v-icon>
              </v-btn>
              <v-btn icon class="error" sm12>
                <v-icon>thumb_down_alt</v-icon>
              </v-btn>
            </v-layout>
          </v-card-actions>
        </v-card>
        <v-divider></v-divider>

      </v-flex>
    </v-layout>
    <v-layout v-if="help" justify-space-around>
      <v-flex xs10 sm5 md4 mt-4>
        <v-card>
          <v-card-title>
            <h1>Подсказка</h1>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
  </div>

</template>

<script>
  export default {
    name: "Cards",
    data () {
      return{
        help: false
      }
    },

    computed: {
      titleButtonHelp () {
        return !this.help ? 'Подсказка' : 'Скрыть'
      }
    },

    methods:{
      showHelp () {
        this.help = this.help ? false : true
      }
    }
  }
</script>

<style scoped>

</style>
