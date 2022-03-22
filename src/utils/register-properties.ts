import { App } from 'vue'
import { formatUtcString } from '@/utils/dateFormat'
// 注册全局事件
export default function registerProperties(app: App) {
  app.config.globalProperties.$filters = {
    formatTime(value: string) {
      return formatUtcString(value)
    }
  }
}
