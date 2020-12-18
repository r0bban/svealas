import Vue from 'vue'
import Vuex from 'vuex'
import authModule from "@/store/modules/auth"
import christmasModule from "@/store/modules/christmas"

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    authModule,
    christmasModule
  },
  state: {
    error: [],
    showLogin: false
  },
  mutations: {
    addError(state, error) {
      if (state.error.length >= 3) {
        state.error.shift();
        state.error.push(error)
      } else state.error.push(error)
    },
    closeLogin(state) {
      state.showLogin = false;
    },
    openLogin(state) {
      state.showLogin = true;
    }
  },
  actions: {
    setNewError({ commit }, error) {
      commit('setError', error)
    },
  },
  getters: {
    // getUser(state){
    //   return state.auth.currentUser
    // }
  },
  // computed
})
