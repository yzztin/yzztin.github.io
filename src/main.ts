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

// Fancybox.bind('[data-fancybox="gallery"]', {})
window.Fancybox = Fancybox

const app = createApp(App)

app.use(router)
app.use(createPinia())

app.mount('#app')
