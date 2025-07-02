import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/orderList'
    },
    {
      path: '/orderList',
      name: 'orderList',
      component: () => import('../views/OrderListView.vue'),
    },
    {
      path: '/order',
      name: 'order',
      component: () => import('../views/OrderView.vue'),
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/AdminView.vue'),
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('../views/TestView.vue'),
    },
  ],
})

export default router
