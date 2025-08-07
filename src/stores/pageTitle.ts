import { defineStore } from 'pinia';
import { useBaseConfig } from '@/stores/useConfig'


export const usePageTitleStore = defineStore('pageTitle', {
    state: () => {
        // 在 state 函数内部使用 store，如果在顶层使用会导致循环依赖问题
        const baseConfig = useBaseConfig()
        return {
            baseTitle: baseConfig.title, // 主页面标题
            currentTitle: '', // 当前页面标题
        }
    },
    actions: {
        updateTitle(title: string | null | undefined) {
            if (title && title.trim()) {
                this.currentTitle = `${title} | ${this.baseTitle}`
            } else {
                this.currentTitle = this.baseTitle
            }
            document.title = this.currentTitle
        }
    }
})