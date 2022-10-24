import Layout from '@/views/layout/index.vue'
import Login from '@/views/login/index.vue'
import { createRouter, createWebHistory } from 'vue-router'

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
      { path: '/user', component: () => import('@/views/user/index.vue') },
      { path: '/role', component: () => import('@/views/user/role.vue') },
      {
        path: '/data',
        component: () => import('@/views/data/index.vue')
      }
    ]
  },
  { path: '/login', component: Login }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
