<template>
    <!--
        header 标签这里设置了 text-[var(--c-80)] 指定文本颜色为灰色，
        但是同时， src/style/main.css 中也有设置全局 a 标签的文本颜色为蓝色，
        在 css 选择器的优先级规则中，header 是文本颜色样式对于 header 下的 <a> 标签来说是 “继承样式”，
        而 main.css 中的是对于 <a> 的直接选择器，并且使用了  @layer base，优先级高于继承样式
    -->
    <header class="
        flex flex-row items-center
        w-full
        pr-4
        z-10
        border-b-[1px]
        border-b-[var(--c-border)]
        dark:bg-[var(--c-0)]
        dark:border-b-[var(--c-0)]
        gap-2
        h-[var(--h-header)]
        text-[var(--c-80)]
    ">
        <!-- 左侧标题 -->
        <div class="overflow-hidden h-full flex flex-row items-center">
            <router-link to="/" class="
                whitespace-nowrap
                text-2xl
                hover:text-[var(--c-theme)]
                pl-4
                font-black
                bg-gradient-to-r from-cyan-500
                to-blue-500 bg-clip-text text-transparent
            ">
                {{ siteTitle }}
            </router-link>
        </div>

        <!-- 中间空白 -->
        <div class="flex-1"></div>

        <!-- 右侧导航 -->
        <div class="flex flex-row items-center z-20 h-full">
            <!-- 页面链接 -->
            <div class="hidden sm:flex flex-row h-full">
                <router-link v-for="(item, index) in navItems" :key="index" :to="item.path" class="
                    flex flex-row items-center
                    gap-1
                    hover:underline
                    hover:bg-[var(--c-20)]
                    hover:text-[var(--c-theme)]
                    transition-all
                    px-2
                    py-1
                    my-1
                    rounded-lg
                    group
                    whitespace-nowrap
                ">
                    <Icon v-if="item.icon" :icon="item.icon" width="22"
                        class="group-hover:scale-125 transition-transform" />
                    <p v-if="item.showName !== false && item.name">{{ item.name }}</p>
                </router-link>
            </div>

            <!-- 右侧图标 -->
            <div class="flex flex-row items-center justify-center">
                <!-- 主题切换 -->
                <button class="flex group p-1" title="切换主题" @click="toggleTheme">
                    <!-- <Icon :icon="isDark ? 'mingcute:moon-fill' : 'mingcute:sun-fill'" width="24" class="transition-transform -->
                    <Icon :icon="isDark ? 'ic:round-dark-mode' : 'ic:round-light-mode'" width="24" class="transition-transform
                        group-hover:rotate-[45deg]
                        group-hover:scale-125
                        group-hover:text-[var(--c-theme)]" />
                </button>

                <!-- 移动端菜单按钮 -->
                <div class="flex flex-row items-center justify-center p-1 sm:hidden">
                    <button v-if="!isMenuOpen" class="w-6 h-6" aria-hidden="true" @click="toggleMenu">
                        <Icon icon="mingcute:menu-fill" width="24"
                            class="transition-transform hover:scale-125 hover:rotate-[5deg]" />
                    </button>
                    <button v-else class="w-6 h-6" aria-hidden="true" @click="toggleMenu">
                        <Icon icon="mingcute:close-circle-fill" width="24"
                            class="transition-transform hover:scale-125 hover:rotate-[80deg]" />
                    </button>
                </div>
            </div>
        </div>
    </header>

    <!-- 移动端菜单 -->
    <div v-show="isMenuOpen" class="
        sm:hidden
        w-full
        z-10
        rounded
    ">
        <div class="
        flex
        flex-col
        font-bold
        text-xl
        border-b-[1px]
        relative
        z-20
        border-[var(--c-sep)]
        px-2
        py-2
    ">
            <router-link v-for="(item, index) in navItems" :key="index" :to="item.path" class="
            flex flex-row items-center
            gap-2
            h-12
            hover:underline
            hover:bg-[var(--c-20)]
            px-3
            py-1
            rounded-lg
        ">
                <Icon v-if="item.icon" :icon="item.icon" width="22" />
                <p>{{ item.name || item.path }}</p>
            </router-link>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import { useTheme } from '@/composables/useTheme'
import { useBaseConfig, useHeaderStore } from '@/stores/useConfig'

const { isDark, toggleTheme } = useTheme()

const baseConfig = useBaseConfig()
const headerStore = useHeaderStore()

// 网站标题
const siteTitle = baseConfig.title

// 导航菜单
const navItems = headerStore.navItems

// 移动端菜单状态
const isMenuOpen = ref(false)
const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
}
</script>