import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import VueResource from 'vue-resource'
import {store} from './store/index'
import * as fb from 'firebase'

Vue.use(Vuetify)

Vue.config.productionTip = false;

Vue.use(VueResource)

new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>',

  created () {
    fb.initializeApp({
      apiKey: "AIzaSyA_2VWbx8S_WWqwpvnhpfYLz1Gzpk5tjBU",
      authDomain: "leng-project.firebaseapp.com",
      databaseURL: "https://leng-project.firebaseio.com",
      projectId: "leng-project",
      storageBucket: "leng-project.appspot.com",
      messagingSenderId: "705040713632"
    })

    // fb.auth().onAuthStateChanged(user => {
    //   if (user) {
    //     this.$store.dispatch('autoLoginUser', user)
    //   }
    //
    //   authed.user = user
    // })

  }
})




