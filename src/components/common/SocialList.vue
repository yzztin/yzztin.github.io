<template>
    <div class="flex flex-row items-center gap-4">
        <a v-for="item in socialLinks" :key="item.name" :href="item.url" target="_blank" rel="noopener noreferrer"
            class="text-[var(--c-50)] hover:text-[var(--c-theme)] transition-colors">
            <Icon :icon="item.icon" width="24" />
        </a>
    </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

interface SocialLink {
    name: string
    url: string
    icon: string
}

// 社交链接配置
const socialLinks: SocialLink[] = [
    {
        name: 'GitHub',
        url: 'https://github.com/yzztin',
        icon: 'mingcute:github-fill'
    },
    // {
    //     name: 'Twitter',
    //     url: 'https://twitter.com/yzztin',
    //     icon: 'mingcute:social-x-fill'
    // },
    {
        name: 'Email',
        url: 'mailto:yzz223@qq.com',
        icon: 'mdi:email'
    }
]
</script>