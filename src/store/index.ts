import { createStore, Store, useStore as useVuexStore } from 'vuex'
import { IRootState, IStoreType } from './type'
// modules
import login from './login/login'
const store = createStore<IRootState>({
  state: () => {
    return {
      name: 'zy',
      age: 11
    }
  },
  mutations: {},
  getters: {},
  actions: {},
  modules: {
    login
  }
})
// vuex 重新缓存
export function setUpStore() {
  store.dispatch('login/loadLocalLogin')
}

export function useStore(): Store<IStoreType> {
  return useVuexStore()
}
export default store