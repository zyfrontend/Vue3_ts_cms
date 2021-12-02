import request from '@/service'

enum DashboardAPI {
  categoryGoodsCount = '/goods/category/count',
  categoryGoodsSale = '/goods/category/sale',
  categoryGoodsFavor = '/goods/category/favor',
  addressGoodsCount = '/goods/address/sale'
}

export function getCategoryGoodsCount() {
  return request.get({
    url: DashboardAPI.categoryGoodsCount
  })
}
export function getCategoryGoodsSale() {
  return request.get({
    url: DashboardAPI.categoryGoodsSale
  })
}
export function getCategoryGoodsFavor() {
  return request.get({
    url: DashboardAPI.categoryGoodsFavor
  })
}
export function getAddressGoodsCount() {
  return request.get({
    url: DashboardAPI.addressGoodsCount
  })
}
