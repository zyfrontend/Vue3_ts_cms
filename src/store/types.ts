import { ILoginState } from './module/login/types'
import { IDashboardState } from './module/dashboard/types'
import { ISystemState } from './module/system/types'
export interface IRootState {
  name?: string
  age?: number
  entireDepartment: any[]
  entireRole: any[]
  entireMenu: any[]
}

export interface IRootWithModule {
  login: ILoginState
  system: ISystemState
  dashboard: IDashboardState
}

export type IStoreType = IRootState & IRootWithModule
