<template>
    <nav class="post-toc toc text-sm w-40 relative top-32 right-4 opacity-70 hidden lg:block"
        style="position: fixed !important;"></nav>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, nextTick, watch } from 'vue'
import tocbot from 'tocbot'
import 'tocbot/dist/tocbot.css'

// 接收 markdown 内容作为触发更新的信号
const props = defineProps<{
    source: string
}>()

const tocOptions = {
    tocSelector: '.post-toc',
    contentSelector: '.post-content',
    headingSelector: 'h1, h2, h3',
    hasInnerContainers: true,
    listClass: 'toc-list',
}

function addHeadingIds() {
    const contentElement = document.querySelector('.post-content')
    if (contentElement) {
        const usedIds = new Set()
        const headings = contentElement.querySelectorAll('h1, h2, h3')
        headings.forEach((heading) => {
            if (!heading.id) {
                const rawText = heading.textContent?.trim() || ''
                let slug = rawText.replace(/\s+/g, '-') // 空格转连字符

                // 避免重复 slug
                let originalSlug = slug
                let count = 1
                while (usedIds.has(slug)) {
                    slug = `${originalSlug}-${count++}`
                }
                usedIds.add(slug)
                heading.id = slug
            }
        })
        return headings.length > 0
    }
    return false
}

async function initToc() {
    await nextTick()
    // 销毁旧的 toc
    tocbot.destroy()
    // 多次尝试，直到有标题为止
    let tryCount = 0
    const tryInit = () => {
        if (addHeadingIds()) {
            tocbot.init(tocOptions)
        } else if (tryCount < 10) {
            tryCount++
            setTimeout(tryInit, 200)
        }
    }
    tryInit()
}

onMounted(initToc)
onUnmounted(() => {
    tocbot.destroy()
})

// 当 props.source 变化时重新初始化目录
watch(() => props.source, () => {
    initToc()
})
</script>

<style scoped></style>