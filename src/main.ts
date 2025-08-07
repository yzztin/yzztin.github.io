import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import './styles/main.css'
import { initGoogleAnalytics } from './plugins/GoogleAnalytics';
import { Fancybox } from "@fancyapps/ui"
import '@fancyapps/ui/dist/fancybox/fancybox.css'

// Google Analytics 初始化
const googleAnalyticsId = import.meta.env.VITE_GOOGLE_ANALYTICS_ID
initGoogleAnalytics(googleAnalyticsId)

// Fancybox 全局
window.Fancybox = Fancybox

// 创建 Vue 应用
const app = createApp(App)
app.use(router)
app.use(createPinia())

// 处理 GitHub Pages 重定向跳转逻辑
const url = new URL(window.location.href)
const redirect = url.searchParams.get('redirect')
if (redirect) {
    const decoded = decodeURIComponent(redirect)
    // 用 Vue Router 手动跳转到重定向地址
    router.replace(decoded)
}

// 最后挂载
app.mount('#app')
