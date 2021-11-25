import { breadcrumbType } from '@/UI/breadcrumb'
import { RouteRecordRaw } from 'vue-router'
let firstMenu: any = null
export function mapMenuRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []

  // 1. 加载所有的默认 routes
  const allRoutes: RouteRecordRaw[] = []
  // Commonjs api <require>
  // 使用 webpack 操作
  const routeFiles = require.context('../router/main', true, /\.ts/)
  routeFiles.keys().forEach((key) => {
    const route = require('../router/main' + key.split('.')[1])
    allRoutes.push(route.default)
  })
  // 2. 根据菜单获取需要添加的routes
  const _recurseGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        const route = allRoutes.find((route) => route.path === menu.url)
        if (route) routes.push(route)
        if (!firstMenu) {
          firstMenu = menu
        }
      } else {
        _recurseGetRoute(menu.children)
      }
    }
  }

  _recurseGetRoute(userMenus)
  return routes
}
export function mapPathBreadcrumbs(userMenus: any, currentPath: string): any {
  const breadcrumbs: breadcrumbType[] = []
  mapMenuPath(userMenus, currentPath, breadcrumbs)
  return breadcrumbs
}
// 获取路由路径信息
export function mapMenuPath(
  userMenus: any,
  currentPath: string,
  breadcrumbs?: breadcrumbType[]
): any {
  for (const menu of userMenus) {
    // 区分一级二级菜单
    if (menu.type === 1) {
      const findMenu = mapMenuPath(menu.children ?? [], currentPath)
      if (findMenu) {
        // breadcrumbs?.push({ name: menu.name, path: menu.url })
        // breadcrumbs?.push({ name: findMenu.name, path: findMenu.url })
        // 取消路由跳转
        breadcrumbs?.push({ name: menu.name })
        breadcrumbs?.push({ name: findMenu.name })

        return findMenu
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu
    }
  }
}
export function mapMenusToPermissions(userMenus: any[]) {
  const permissions: string[] = []

  const _recurseGetPermission = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 1 || menu.type === 2) {
        _recurseGetPermission(menu.children ?? [])
      } else if (menu.type === 3) {
        permissions.push(menu.permission)
      }
    }
  }
  _recurseGetPermission(userMenus)

  return permissions
}

export { firstMenu }
