import { createRouter, createWebHistory } from 'vue-router'
import EndLayout from '../pages/LayoutPage/EndLayout.vue'
import FrontLayout from '../pages/LayoutPage/FrontLayout.vue'
import Login from '../pages/LoginPage/index.vue'

const routes = [
  {
    path: '/',
    component: FrontLayout,
    children: [
      {
        path: '/layer',
        component: () => import('../pages/LayerPage/index.vue')
      }
    ]
  },
  { path: '/login', component: Login },
  {
    path: '/admin',
    component: EndLayout,
    children: [
      {
        path: 'user',
        component: () => import('../pages/UserPage/index.vue')
      },
      {
        path: 'fundCode',
        component: () => import('../pages/DataPage/FundCode.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
