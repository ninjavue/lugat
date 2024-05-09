import { createStore } from 'vuex'
import helper from './helper'
import test from './modules/test'
import dagree from './modules/dagree'
import lektion from './modules/lektion'

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    helper,
    test,
    dagree,
    lektion
  }
})
