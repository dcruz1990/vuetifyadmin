import Vue from 'vue'
import Vuex from 'vuex'

// import axios from 'axios'

import user from '@/assets/dumydata/data'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoading: false,
    user: user,
    isAuthenticated: false,
    error: {
      errorType: '',
      errorFlag: false
    }
  },
  mutations: {
    setLoadingStatus (state, val) {
      state.isLoading = val
    },
    setUserStatus (state, user) {
      state.user = user
    },
    setIsAuthenticate (state, value) {
      state.isAuthenticated = value
    },
    setError (state, value) {
      state.error.errorType = value.type
      state.error.errorFlag = value.flag
    }
  },
  actions: {
    Login (context, userdata) {
      context.commit('setLoadingStatus', true)
      const baseUrl = 'http://localhost:5050/api/'
      const header = { 'Content-Type': 'application/json' }
      fetch(baseUrl + 'Auth/login', { method: 'post', headers: header, body: JSON.stringify(userdata) }).then((response) => {
        if (response.status === 200) {
          context.commit('setIsAuthenticate', true)
        } else if (response.status === 401) {
          context.commit('setLoadingStatus', false)
          context.commit('setIsAuthenticate', false)
          const Unauthorized = {
            type: 'Wrong username or password, please verify!',
            flag: true
          }
          context.commit('setError', Unauthorized)
          // context.commit('setBadCredentials', true)
        }
        return response.json()
      }).then((data) => {
        context.commit('setUserStatus', data)
        context.commit('setLoadingStatus', false)
        console.log(this.data)
      }).catch((err) => {
        const error = {
          type: err,
          flag: true
        }
        context.commit('setError', error)
        context.commit('setLoadingStatus', false)
        console.log(err)
      })
    },
    setErr(context, value) {
      context.commit('setError', value)
    }
  },
  modules: {
  },
  getters: {
    getIsAuthenticated (state) {
      return state.isAuthenticated
    }
  }
})
