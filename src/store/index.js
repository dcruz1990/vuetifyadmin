import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router/index'
import { userService } from '../_services';

// import axios from 'axios'

// import { login, getUserData } from '@/services/AuthService'

// import userdata from '@/assets/dumydata/data'
// import datauser from '@/assets/dumydata/data.json'

Vue.use(Vuex)

const user = JSON.parse(localStorage.getItem('user'));

export default new Vuex.Store({
  strict: true,
  state: {
    isLoading: false,
    user: user,
    token: null,
    isAuthenticated: userService.checkAuth(),
    error: {
      errorType: '',
      errorFlag: false
    },

  },
  mutations: {
    setToken(state, val) {
      state.token = val
    },
    setLoadingStatus(state, val) {
      state.isLoading = val
    },
    setUser(state, user) {
      state.user = user
    },
    setIsAuthenticate(state, value) {
      state.isAuthenticated = value
    },
    setError(state, value) {
      state.error.errorType = value.type
      state.error.errorFlag = value.flag
    },
    setUserProfile(state, index) {
      this.getters.UserMainPhoto[0].main = false
      state.user.user.photos[index].main = true
    }
  },
  actions: {
    Login(context, userdata) {
      userService.login(userdata.username, userdata.password).then(
        context.commit('setLoadingStatus', true)
      ).then(
        user => {
          context.commit('setUser', user.user);
          context.commit('setToken', user.token)
          context.commit('setIsAuthenticate', true)
          context.commit('setLoadingStatus', false)
          router.push('/home');
        },
        data => {
          console.log(data)
          let myerr = {
            flag: true,
            type: data
          }
          context.commit('setError', myerr)
          context.commit('setLoadingStatus', false)
        }
      );
    },
    setErr(context, value) {
      context.commit('setError', value)
    },
    updateUser(context, value) {
      userService.updateUser(value).then(
        context.commit('setLoadingStatus', true)
      ).then(data => {
        context.commit('setUser', value)
        localStorage.setItem('user', JSON.stringify(value))
      })

      // let header = {
      //   'Content-Type': 'application/json',
      //   'Authorization': 'Bearer ' + localStorage.getItem('token')
      // }
      // try {
      //   fetch(this.state.baseUrl + 'users/' + this.state.user.id, {
      //     method: 'put',
      //     headers: header,
      //     body: JSON.stringify(value)
      //   }).then((response) => {
      //     if (response.status == 204) {
      //       context.commit('setUserStatus', value)
      //     } else {
      //       console.log(response.statusText)
      //     }
      //   })
      // } catch (error) {
      //   console.log(error)
      // }
    },
    // setMainProfilePic(context, index) {
    //   context.commit('setUserProfile', index)
    // }
  },
  modules: {
  },
  getters: {
    getIsAuthenticated(state) {
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
