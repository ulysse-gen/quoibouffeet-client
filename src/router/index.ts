import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: () => import("@/views/LoginView.vue")
  },
  {
    path: '/register',
    name: 'register',
    component: () => import("@/views/RegisterView.vue")
  },
  {
    path: '/user/@:username',
    name: 'userpage',
    component: () => import("@/views/UserView.vue")
  },
  {
    path: '/recipe/@:recipe',
    name: 'recipepage',
    component: () => import("@/views/RecipeView.vue")
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
