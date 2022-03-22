import { Module } from 'vuex'
import router from '@/router'
import { ILoginState } from './types'
import { IRootState } from '../../types'
import { mapMenuRoutes, mapMenusToPermissions } from '@/utils/mapRoutes'
import {
  accuntLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId
} from '@/service/login'
import { IAccount } from '@/service/login/types'
import localCache from '@/utils/cache'
const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: localCache.getCache('token') ? localCache.getCache('token') : '',
      userInfo: localCache.getCache('userInfo')
        ? localCache.getCache('userInfo')
        : {},
      userMenus: localCache.getCache('userMenus')
        ? localCache.getCache('userMenus')
        : [],
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
      state.permissions = mapMenusToPermissions(userMenus)
    }
  },
  actions: {
    // 登录
    async accountLoginAction({ commit, dispatch }, payload: IAccount) {
      const res = await accuntLoginRequest(payload)
      const { id, token } = res.data
      // token保存
      commit('changeToken', token)
      // 本地保存 token
      localCache.setCache('token', token)

      // 全局初始化
      dispatch('getInitialDataAction', null, { root: true })
      // 获取用户信息
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
    loadLocalLogin({ commit, dispatch }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('changeToken', token)

        dispatch('getInitialDataAction', null, { root: true })
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
