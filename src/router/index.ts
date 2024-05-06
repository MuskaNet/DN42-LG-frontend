import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/detail/:server',
      component: () => import('@/views/ProtocolInfoView.vue')
    },
    {
      path: '/detail/:server/:protocol',
      component: () => import('@/views/ProtocolInfoView.vue')
    },
    {
      path: '/route/:server',
      component: () => import('@/views/RouteView.vue')
    },
    {
      path: '/whois/:value',
      component: () => import('@/views/WhoisView.vue')
    },
    {
      path: '/traceroute/:server/:address',
      component: () => import('@/views/TracerouteView.vue')
    }
  ]
})

export default router
