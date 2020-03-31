import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import LoginView from '../views/LoginView'
import EditProfile from '@/components/EditProfile'
import NotFound from '@/views/NotFound'



Vue.use(VueRouter)


const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/editprofile',
    name: 'EditProfile',
    component: EditProfile,
    // beforeEnter(to, from, next) {
    //   if (store.state.isAuthenticated) { 
    //     next()
    //   } else {
    //     next({
    //       name: 'Login',
    //       query: { redirectFrom: to.fullPath  }
    //     })
    //   } 
    // }
    
  },
  {
    // matches everything else  
    path: '*',
    name: 'notFound',
    component: NotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
