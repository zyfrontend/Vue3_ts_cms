import request from '../index'
import { IAccount, ILoginResult } from './type'
import { IDataType } from '../type'
enum LoginApi {
  AccountLogin = '/login',
  LoginUserInfo = '/users/', // 用法: /users/1
  UserMenus = '/role/' // 用法: role/1/menu
}
// 登录请求
export function accuntLoginRequest(account: IAccount) {
  return request.post<IDataType<ILoginResult>>({
    url: LoginApi.AccountLogin,
    data: account
  })
}

// 获取信息
export function requestUserInfoById(id: number) {
  return request.get<IDataType>({
    url: LoginApi.LoginUserInfo + id,
    showLoading: false
  })
}

// 获取菜单树
export function requestUserMenusByRoleId(id: number) {
  return request.get<IDataType>({
    url: LoginApi.UserMenus + id + '/menu',
    showLoading: false
  })
}
