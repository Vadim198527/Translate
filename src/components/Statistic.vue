<!--suppress ALL -->
<template>
  <v-layout id="app">
    <v-flex>

      <v-layout justify-space-around>
        <v-flex xs8>
          <v-layout justify-space-around>
            <v-flex xs3>
              <v-select
                :items="items"
                :label="items[0]"
              ></v-select>
            </v-flex>

            <v-flex xs3>
              <v-select
                :items="items"
                :label="items[0]"
              ></v-select>
            </v-flex>

            <v-flex xs3>
              <v-select
                :items="items"
                :label="items[0]"
              ></v-select>
            </v-flex>
          </v-layout>



        </v-flex>
      </v-layout>

      <v-layout justify-space-around mt-5 >
        <v-flex xs6 pt-5 class="Chart">
          <app-graphic
            ref="canvas"
            :data="data"
            :height="200"
            :options="{responsive: true, maintainAspect: true}"
          ></app-graphic>
        </v-flex>
      </v-layout>


    </v-flex>
  </v-layout>

</template>

<script>
  import Graphic from './Graphic'

  export default {

    data () {
      return {
        gradient: null,
        gradient2: null,
        items: ['за неделю', 'за месяц', 'за год'],
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [
            {
              label: 'Data One',
              borderColor: '#FC2525',
              pointBackgroundColor: 'white',
              borderWidth: 1,
              pointBorderColor: 'white',
              backgroundColor: '#FC2525',
              data: [40, 39, 10, 40, 39, 80, 40]
            },{
              label: 'Data Two',
              borderColor: '#05CBE1',
              pointBackgroundColor: 'white',
              pointBorderColor: 'white',
              borderWidth: 1,
              backgroundColor: '#05CBE1',
              data: [60, 55, 32, 10, 2, 12, 53]
            }
          ]

        }
      }
    },



    components: {
      AppGraphic: Graphic
    }
  }
</script>

<style scoped>
  .Chart {
    background: #212733;
    border-radius: 15px;
    box-shadow: 0px 2px 15px rgba(25, 25, 25, 0.27);
    margin:  25px 0;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
