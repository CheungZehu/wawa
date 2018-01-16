import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    member: {},
    sum: Number,
  },
  mutations: {
    updateMember (state, payload) {
      state.member = payload.member
      window.localStorage.setItem('member', payload.member)
    },
    updateSum (state, payload) {
      state.sum = payload.sum
      window.localStorage.setItem('sum', payload.sum)
    },
  },
  actions: {
    updateMember ({commit}, member) {
      commit({type: 'updateMember', member: member})
    },
    updateSum ({commit}, sum) {
      commit({type: 'updateSum', sum: sum})
    },
  }
})