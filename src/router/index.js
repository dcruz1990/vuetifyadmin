import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import LoginView from '../views/LoginView'
import EditProfile from '@/components/EditProfile'
import NotFound from '@/views/NotFound'

import store from '@/store/index'

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
    // beforeEnter(to, from, next) {
    //   let isAuthenticated = localStorage.getItem('token')
    //   if (isAuthenticated) { 
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
    path: '/editprofile',
    name: 'EditProfile',
    component: EditProfile,
    // beforeEnter(to, from, next) {
    //   let test = store.isAuthenticated
    //   console.log(test)
    //   let isAuthenticated = localStorage.getItem('user')
    //   if (isAuthenticated) {
    //     next()
    //   } else {
    //     next({
    //       name: 'Login',
    //       query: { redirectFrom: to.fullPath }
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

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  if (authRequired && !loggedIn) {
    return next('/');
  }

  next();
})

export default router
