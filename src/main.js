import '@/styles/index.scss'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/theme-chalk/src/message.scss'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

// 注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(router).mount('#app')

import chinaJsonData from '@/assets/china.json'
import * as echarts from 'echarts'
echarts.registerMap('china', chinaJsonData)
