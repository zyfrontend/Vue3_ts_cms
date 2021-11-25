import request from '../index'
import { IDataType } from '../type'
// 获取信息
export function getPageList(url: string, queryInfo: any) {
  return request.post<IDataType>({
    url: url,
    data: queryInfo
  })
}
