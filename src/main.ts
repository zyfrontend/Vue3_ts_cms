import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css'
import { setUpStore } from './store'
import registerProperties from '@/utils/register-properties'
import { globalRegister } from './ElementPlus'
const app = createApp(App)
// 注册路由
setUpStore()
// 注册组件
app.use(globalRegister)
app.use(registerProperties)
app.use(router)
app.use(store)
app.mount('#app')
