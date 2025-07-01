/**
 * analytics.ts
 * Google Analytics 初始化模块，分析网站访问数据
 */



let isGtagInitialized = false


/**
 * 初始化 Google Analytics
 * @param trackingId - Google Analytics 跟踪 ID（如 'G-XXXXXXXXXX'）
 */
export function initGoogleAnalytics(trackingId: string): void {
    if (!trackingId || isGtagInitialized) {
        console.warn("Google Analytics did not initialize successfully!")
    }

    // 创建 <script> 标签异步加载 gtag.js
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`
    document.head.appendChild(script)

    // 初始化 gtag 全局函数
    window.dataLayer = window.dataLayer || []
    function gtag(...args: any[]) {
        window.dataLayer.push(args)
    }

    // 挂载 gtag 到全局
    window.gtag = gtag

    gtag('js', new Date())
    gtag('config', trackingId)

    isGtagInitialized = true
}
