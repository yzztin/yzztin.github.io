<template>
    <footer class="flex flex-col mt-18 mb-12 items-center text-[var(--c-50)] text-sm">
        <!-- 社交链接 -->
        <div class="flex flex-row items-center my-12">
            <SocialList />
        </div>

        <!-- busuanzi 网站访问统计信息 -->
        <div class="mb-6">
            <BusuanziStats />
        </div>

        <!-- 版权信息 -->
        <div class="flex flex-row items-center gap-2">
            <a class="hover:underline" target="_blank" href="https://creativecommons.org/licenses/by-nc-sa/4.0/">
                CC BY-NC-SA 4.0
            </a>
            <span>&copy; 2024-PRESENT</span>
            <a class="hover:underline" href="https://github.com/yzztin" target="_blank" rel="noopener noreferrer">
                Yzztin
            </a>
        </div>

        <!-- 网站信息 -->
        <div class="flex items-center gap-1">
            <span>Powered by</span>
            <a class="hover:underline" href="https://vuejs.org/" target="_blank" rel="noopener noreferrer">
                Vue3
            </a>
            <span>&</span>
            <a href="https://github.com/chen-yingfa/hexo-theme-fengye" class="hover:underline" target="_blank"
                rel="noopener noreferrer">
                Fengye
            </a>
        </div>
    </footer>
</template>

<script setup lang="ts">
import SocialList from './SocialList.vue'
import BusuanziStats from '@/components/common/BusuanziStats.vue'

</script>