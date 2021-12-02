import { createStore, Store, useStore as useVuexStore } from 'vuex'
import { IRootState, IStoreType } from './type'

import { getPageList } from '@/service/main/main'
// modules
import login from './login/login'
import system from './main/system/system'
import dashboard from './main/dashboard/dashboard'
const store = createStore<IRootState>({
  state: () => {
    return {
      name: 'zy',
      age: 11,
      entireDepartment: [],
      entireRole: [],
      entireMenu: []
    }
  },
  mutations: {
    changeEntireDepartment(state, list) {
      state.entireDepartment = list
    },
    changeEntireRole(state, list) {
      state.entireRole = list
    },
    changeEntireMenu(state, list) {
      state.entireMenu = list
    }
  },
  getters: {},
  actions: {
    async getInitialDataAction({ commit }) {
      // 部门
      const departmentResult = await getPageList('/department/list', {
        offset: 0,
        size: 1000
      })
      const { list: departmentList } = departmentResult.data
      // 角色
      const roleResult = await getPageList('/role/list', {
        offset: 0,
        size: 1000
      })
      const { list: roleList } = roleResult.data

      // 权限菜单
      const menuResult = await getPageList('/menu/list', {})
      const { list: menuList } = menuResult.data
      // 保存数据
      commit('changeEntireDepartment', departmentList)
      commit('changeEntireRole', roleList)
      commit('changeEntireMenu', menuList)
    }
  },
  modules: {
    login,
    system,
    dashboard
  }
})
// vuex 重新缓存
export function setUpStore() {
  store.dispatch('login/loadLocalLogin')
  store.dispatch('getInitialDataAction')
}

export function useStore(): Store<IStoreType> {
  return useVuexStore()
}
export default store
