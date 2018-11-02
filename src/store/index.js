import Vuex from 'vuex'
import Vue from 'vue'
import {book} from './modules/book'
import {params} from './modules/params'
import {shared} from './modules/shared'
import {library} from './modules/library'
import {otherData} from "./modules/otherData";

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    otherData,
    shared,
    book,
    params,
    library
  }
})
