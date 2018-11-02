<!--suppress ALL -->
<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" temporary app>

      <v-list>
        <v-list-tile
          v-for="(link, index) in links"
          :to="link.path"
          :key="'a' + index"
        >
          <v-list-tile-action>
            <v-icon>{{link.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="link.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

      </v-list>

    </v-navigation-drawer>

    <v-toolbar color="primary" dark app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <router-link
        tag="v-toolbar-title"
        to="/home"
        style="cursor: pointer"
        onselectstart="return false"
        onmousedown="return false"
      >Главная страница</router-link>
    </v-toolbar>

    <v-content>
      <router-view class="my-4"></router-view>
    </v-content>

  </v-app>
</template>

<script>
  import Reader from './components/Reader'

  export default {
    data () {
      return {
        drawer: null,
        title: ''
      }
    },


    computed: {

      links () {
        return [
          {
            icon: 'home',
            title: 'Домой',
            path: '/home'
          },

          {
            icon: 'import_contacts',
            title: 'Библиотека',
            path: '/library'
          },

          {
            icon: 'translate',
            title: 'Читать',
            path: '/read'
          },

          {
            icon: 'poll',
            title: 'Статистика',
            path: '/statistic'
          },

          {
            icon: 'chrome_reader_mode',
            title: 'Учить слова',
            path: '/learn'
          },
        ]
      }

    },


    components: {
      appReader: Reader
    }
  }
</script>

<style scope>

</style>
