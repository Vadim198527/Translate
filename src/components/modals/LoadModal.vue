<template>
  <v-dialog width="500px" v-model="modal" ref="huli">
    <v-btn
      dark
      fab
      color="primary"
      slot="activator"
      ref="activ"
    >
      <v-icon>add</v-icon>
    </v-btn>

    <v-card v-if="!load">
      <v-container>
        <v-layout>
          <v-flex>
            <v-card-text>
              <v-text-field
                name="bora"
                label="Введите URL"
                type="text"
              ></v-text-field>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>

        <v-layout>
          <v-flex>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class="warning" @click="onClick">
                <v-icon class="mr-2">cloud_upload</v-icon>
                С компьютера
              </v-btn>
              <input
                @change="onInputFile"
                style="display: none"
                name="inputFile"
                ref="inputFile"
                type="file"
                accept=".fb2,.fb2.zip"
              >
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>

    <v-card v-else>
      <v-card-title style="flex-direction: column">

        <v-layout justify-center>
            <h3 style="text-align: center">
              Подождите, идет загрузка и обработка книги.
              Это может занять несколько минут.
            </h3>

        </v-layout>

        <v-layout>
          <v-progress-circular
            indeterminate
            color="primary"
            mr-5
          ></v-progress-circular>
        </v-layout>


      </v-card-title>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    mounted () {
      if (this.$store.getters['params/quickMode']) {
        this.modal = true
        new Promise((resolve) => {
          const id = setInterval(() => {
            if(!this.load){
              clearInterval(id);
              resolve('Закончилось');
            }
          }, 10)
        }).then(() => {
          this.modal = false
          this.$store.dispatch('params/setQuickMode', false)
        })
      }
    },

    data () {
      return {
        modal: false
      }
    },

    computed: {
      load () {
        return this.$store.getters['shared/isLoading'];
      }
    },

    methods: {
      onClick () {
        this.$refs.inputFile.click()
        // new Promise((resolve) => {
        //   if(!this.load){
        //     resolve('est')
        //   }
        // }).this(() => this.modal = false)
      },

      async onInputFile (e) {
        const file = e.target.files[0]

        await this.$store.dispatch('book/setContentXML', file)

        this.$store.dispatch('params/setQuickMode', true)
        this.$router.push('/read')
      }
    }
  }
</script>

<style scoped>

</style>
