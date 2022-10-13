import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../pages/LayoutPage/index.vue'
import Login from '../pages/LoginPage/index.vue'

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
        path: '/layer',
        component: () => import('../pages/LayerPage/index.vue')
      },
      { path: '/user', component: () => import('../pages/UserPage/index.vue') },
      {
        path: '/data',
        component: () => import('../pages/DataPage/index.vue')
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
