type IFormType = 'id' | 'input' | 'password' | 'select' | 'datepicker'
export interface IFormItem {
  type: IFormType
  label: string
  rules?: any[]
  placeholder?: any
  // 对select
  options?: any[]
  // 对其他特殊属性
  otherOptions?: any
}

export interface IForm {
  formItems: IFormItem[]
  labelWidth?: string
  colLayout: any
  itemLayout: any
}
