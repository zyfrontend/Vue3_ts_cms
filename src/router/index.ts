import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import localCache from '@/utils/cache'
import { firstMenu } from '@/utils/map-routes'
const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/login' },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/main/main.vue')
    // 动态路由
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'nfound',
    component: () => import('@/views/not-found/nfound.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
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
