import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import localCache from '@/utils/cache'
import { firstMenu } from '@/utils/mapRoutes'
const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login/index.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/Layout.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'noFound',
    component: () => import('@/views/notFound/noFound.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to) => {
  if (to.path !== '/login') {
    const token = localCache.getCache('token')
    if (!token) {
      return '/login'
    }
  }
  // 刷新无法正确跳转路由
  // console.log(to)
  if (to.path === '/main') {
    return firstMenu.url
  }
})

export default router
