// 在 .d.ts 文件中声明自定义属性，文件要在 tsconfig.json 中指定的 include 范围内（src/ 内）
// TS 编译器就会自动应用这个类型声明到整个项目，不需要手动导入

declare global {
    interface Window {
        dataLayer: any[]
        gtag?: (...args: any[]) => void
        Fancybox: any
    }
}

export { }
