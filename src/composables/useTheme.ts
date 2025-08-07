import { ref, onMounted, watch } from 'vue'

export function useTheme() {
    const isDark = ref(false)

    // 定义一个函数用于根据系统主题设置初始的暗色模式状态
    const setInitialTheme = () => {
        // 使用 window.matchMedia 来检测系统主题
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        isDark.value = prefersDark
        if (prefersDark) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }

    // 定义一个函数用于切换主题
    const toggleTheme = () => {
        isDark.value = !isDark.value
    }

    // 使用 onMounted 钩子在组件挂载时设置初始主题
    onMounted(() => {
        setInitialTheme()
    })

    // 监听 isDark 的变化，同步更新 documentElement 的类
    watch(isDark, (newValue) => {
        if (newValue) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    })

    return {
        isDark,
        toggleTheme
    }
}