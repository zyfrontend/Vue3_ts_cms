import request from '../index'
import { IDataType } from '../type'
// 获取信息
export function getPageList(url: string, queryInfo: any) {
  return request.post<IDataType>({
    url: url,
    data: queryInfo
  })
}
// 删除
export function deletePageData(url: string) {
  return request.delete<IDataType>({
    url: url
  })
}

// 新建
export function createPageData(url: string, newData: any) {
  return request.post<IDataType>({
    url: url,
    data: newData
  })
}

// 编辑
export function editPageData(url: string, editData: any) {
  return request.patch<IDataType>({
    url: url,
    data: editData
  })
}
