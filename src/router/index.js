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
        path: '/report',
        component: () => import('@/views/report/index.vue')
      },
      { path: '/user', component: () => import('@/views/user/index.vue') },
      {
        path: '/data',
        component: () => import('@/views/data/index.vue')
      },
      {
        path: '/createReport',
        component: () => import('@/views/report/createReport.vue')
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
