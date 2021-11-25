import { Module } from 'vuex'
import router from '@/router'
import {
  accuntLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId
} from '@/service/login/login'
import { mapMenuRoutes, mapMenusToPermissions } from '@/utils/map-routes'
import { IAccount } from '@/service/login/type'
import localCache from '@/utils/cache'
import { ILoginState } from './type'
import { IRootState } from '../type'
const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: [],
      permissions: []
    }
  },
  mutations: {
    // 保存token
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus
      // 获取路由信息
      const routes = mapMenuRoutes(userMenus)
      // 动态添加子路由
      routes.forEach((route) => {
        router.addRoute('main', route)
      })
      // 获取用户按钮权限
      const permissions = mapMenusToPermissions(userMenus)
      state.permissions = permissions
    }
  },
  actions: {
    // 登录逻辑
    async accountLoginAction({ commit }, payload: IAccount) {
      const loginResult = await accuntLoginRequest(payload)
      const { id, token } = loginResult.data
      // vuex 发送保存token
      commit('changeToken', token)
      // localStorage 保存token
      localCache.setCache('token', token)
      // 获取信息
      const userInfoResult = await requestUserInfoById(id)
      const userInfo = userInfoResult.data
      // vuex 发送保存userinfo
      commit('changeUserInfo', userInfo)
      // localStorage 缓存
      localCache.setCache('userInfo', userInfo)

      // 获取用户菜单
      const uerMenusResult = await requestUserMenusByRoleId(userInfo.role.id)
      // vuex 发送保存 menus
      const userMenus = uerMenusResult.data
      commit('changeUserMenus', userMenus)
      // localStorage 缓存
      localCache.setCache('userMenus', userMenus)

      // 路由跳转
      router.push('/main')
    },
    loadLocalLogin({ commit }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('changeToken', token)
      }
      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userMenus = localCache.getCache('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    }
  }
}

export default loginModule
