import { App } from 'vue'
import 'element-plus/lib/theme-chalk/base.css'
import {
  ElAside,
  ElButton,
  ElCheckbox,
  ElForm,
  ElFormItem,
  ElIcon,
  ElInput,
  ElLink,
  ElRadio,
  ElTabPane,
  ElContainer,
  ElHeader,
  ElMain,
  ElTabs,
  ElMenu,
  ElSubmenu,
  ElMenuItemGroup,
  ElMenuItem,
  ElBreadcrumb,
  ElDropdown,
  ElDropdownItem,
  ElBreadcrumbItem,
  ElDropdownMenu,
  ElAvatar,
  ElRow,
  ElCol,
  ElSelect,
  ElOption,
  ElOptionGroup,
  ElDatePicker,
  ElTable,
  ElTableColumn,
  ElImage,
  ElDialog,
  ElPagination,
  ElTree,
  ElCard
} from 'element-plus'
import { UserFilled, PhoneFilled, Calendar } from '@element-plus/icons'
const components = [
  ElSelect,
  ElRow,
  ElCol,
  ElAvatar,
  ElButton,
  ElForm,
  ElFormItem,
  ElInput,
  ElRadio,
  ElTabs,
  ElTabPane,
  ElIcon,
  ElDialog,
  ElCheckbox,
  ElLink,
  ElAside,
  ElContainer,
  ElHeader,
  ElMain,
  ElMenu,
  ElSubmenu,
  ElMenuItemGroup,
  ElMenuItem,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
  ElOption,
  ElOptionGroup,
  ElDatePicker,
  ElTable,
  ElTableColumn,
  ElPagination,
  ElImage,
  ElTree,
  ElCard,
  UserFilled,
  Calendar,
  PhoneFilled
]

export default function (app: App): void {
  for (const component of components) {
    app.component(component.name, component)
  }
}
