<!-- 不蒜子，用以统计网页访问量 https://busuanzi.ibruce.info/ -->

<template>
    <div v-if="enabled" class="flex flex-col items-center mb-2">
        <div class="flex flex-row items-center">
            <Icon width="16" icon="ic:round-person" />
            <span class="mr-1">Visitors: </span>
            <span id="busuanzi_value_site_uv"></span>
        </div>
        <div class="flex flex-row items-center">
            <Icon width="16" icon="carbon:view-filled" />
            <span class="mx-1">Page Views: </span>
            <span id="busuanzi_value_site_pv"></span>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { Icon } from '@iconify/vue'

export default defineComponent({
    name: 'BusuanziStats',
    props: {
        enabled: {
            type: Boolean,
            default: true
        }
    },
    setup() {
        onMounted(() => {
            // 动态加载不蒜子统计脚本
            const script = document.createElement('script')
            script.src = '//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js'
            script.async = true
            document.head.appendChild(script)
        })

        // 显式引用 Icon 组件，避免 TypeScript 报错
        return { Icon }
    }
})
</script>

<style scoped></style>