import { Module } from 'vuex'
import { IDashboardState } from './types'
import { IRootState } from '../../type'
import {
  getAddressGoodsCount,
  getCategoryGoodsCount,
  getCategoryGoodsFavor,
  getCategoryGoodsSale
} from '@/service/analysis/dashboard'
const dashboardModule: Module<IDashboardState, IRootState> = {
  namespaced: true,
  state() {
    return {
      categoryGoodsSale: [],
      categoryGoodsCount: [],
      categoryGoodsFavor: [],
      addressGoodsSale: []
    }
  },
  mutations: {
    changeCategoryGoodsSale(state, data) {
      state.categoryGoodsSale = data
    },
    changeCategoryGoodsCount(state, data) {
      state.categoryGoodsCount = data
    },
    changeCategoryGoodsFavor(state, data) {
      state.categoryGoodsFavor = data
    },
    changeAddressGoodsSale(state, data) {
      state.addressGoodsSale = data
    }
  },
  actions: {
    async getDashboardDataAction({ commit }) {
      const AddressGoodsCountResult = await getAddressGoodsCount()
      const CategoryGoodsSaleResult = await getCategoryGoodsSale()
      const CategoryGoodsFavorResult = await getCategoryGoodsFavor()
      const CategoryGoodsCountResult = await getCategoryGoodsCount()

      // 保存数据
      commit('changeCategoryGoodsSale', CategoryGoodsSaleResult.data)
      commit('changeCategoryGoodsCount', CategoryGoodsCountResult.data)
      commit('changeCategoryGoodsFavor', CategoryGoodsFavorResult.data)
      commit('changeAddressGoodsSale', AddressGoodsCountResult.data)
    }
  }
}

export default dashboardModule
