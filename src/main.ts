import { createApp } from 'vue'
import router from './router'
import store from './store'
import { globalRegister } from './global'
// vuex 缓存
import { setUpStore } from './store'
// css
import 'normalize.css'
import '@/assets/css/index.less'
// component
import App from './App.vue'
const app = createApp(App)
// 注册组件
app.use(globalRegister)
// 注册路由
app.use(router)
app.use(store)
setUpStore()
app.mount('#app')
