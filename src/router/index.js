import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import Library from '../components/Library'
import Reader from '../components/Reader'
import Statistic from '../components/Statistic'
import Cards from '../components/Cards'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      redirect: '/home'
    },

    {
      path: '/home',
      component: Home
    },

    {
      path: '/library',
      component: Library
    },

    {
      path: '/read',
      component: Reader
    },

    {
      path: '/statistic',
      component: Statistic
    },

    {
      path: '/learn',
      component: Cards
    }
  ],

  mode: 'history'
})
