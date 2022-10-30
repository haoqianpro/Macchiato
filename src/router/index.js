import Layout from '@/views/layout/index.vue'
import Login from '@/views/login/index.vue'
import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/index',
    component: Layout,
    redirect: '/data',
    children: [
      {
        path: '/countrywide-overview',
        component: () => import('@/views/report/covid.vue')
      },
      {
        path: '/countrywide-overview-2',
        component: () => import('@/views/report/covidⅡ.vue')
      },
      { path: '/user', component: () => import('@/views/user/index.vue') },
      { path: '/role', component: () => import('@/views/user/role.vue') },
      {
        path: '/data',
        component: () => import('@/views/data/index.vue')
      }
    ]
  },
  { path: '/login', name: 'login', component: Login }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  if (to.name !== 'login' && !store.state.user) {
    next('/login')
  } else if (to.name === 'login' && store.state.user) {
    next('/index')
  } else {
    next()
  }
})

export default router
