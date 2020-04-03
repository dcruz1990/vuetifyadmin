import Vue from 'vue'
import Vuex from 'vuex'

// import axios from 'axios'

import userdata from '@/assets/dumydata/data'
import datauser from '@/assets/dumydata/data.json'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    isLoading: false,
    user: {},
    token: null,
    isAuthenticated: false,
    error: {
      errorType: '',
      errorFlag: false
    },
    baseUrl: 'http://192.168.1.1:5050/api/'
  },
  mutations: {
    setToken (state, val) {
      state.token = val
    },
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
    },
    setUserProfile (state, index) {
      this.getters.UserMainPhoto[0].main = false
      state.user.user.photos[index].main = true
    }
  },
  actions: {
    Login (context, userdata) {
      context.commit('setLoadingStatus', true)
      // const baseUrl = 
      const header = { 'Content-Type': 'application/json' }
      fetch(this.state.baseUrl + 'Auth/login', { method: 'post', headers: header, body: JSON.stringify(userdata) }).then((response) => {
        if (response.status === 200) {
          context.commit('setIsAuthenticate', true)
          context.commit('setLoadingStatus', false)
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
        context.commit('setUserStatus', data.user)
        context.commit('setToken', data.token)
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
    },
    updateUser(context, value) {
      let header = { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.state.token
      }
      try {
        fetch(this.state.baseUrl + 'users/' + this.state.user.id, {
         method: 'put',
         headers: header,
         body: JSON.stringify(value)
        }).then((response) => {
          if (response.status == 204) {
            context.commit('setUserStatus', value)
          } else {
            console.log(response.statusText)
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
    // setMainProfilePic(context, index) {
    //   context.commit('setUserProfile', index)
    // }
  },
  modules: {
  },
  getters: {
    getIsAuthenticated (state) {
      return state.isAuthenticated
    },
    // UserMainPhoto (state) {
    //   if (state.user.user.photos) {
    //   return state.user.user.photos.filter(({main}) => Boolean(main)) 
    //   } else {
    //     return false
    //   }
    // },
    // getAlluserPhotos (state) {
    //   if (state.user.user.photos) {
    //   return state.user.user.photos
    //   } else {
    //     return false
    //   }
    // }
  }
  
})
