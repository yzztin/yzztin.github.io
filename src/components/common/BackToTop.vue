<!--
在右下角显示回到顶部按钮，当页面滚动超过 100px 时才会显示，
通过 back-to-top-on 类修改了 bottom-20 属性为 bottom-8
-->

<template>
    <!-- <div class="back-to-top fixed right-6 z-1024 bottom-8 rounded-lg font-bold py-1 px-2 text-[var(--c-80)] bg-[var(--c-20)] cursor-pointer text-center drop-shadow-md" -->
    <div class="back-to-top fixed right-6 z-1024 -bottom-20 rounded-lg font-bold py-1 px-2 text-[var(--c-80)] bg-[var(--c-20)] cursor-pointer text-center drop-shadow-md"
        :class="{ 'back-to-top-on': show }" @click="scrollToTop">
        <span class="flex justify-center items-center text-sm">
            <span id="scrollpercent"><span>{{ scrollPercent }}</span> %</span>
            <Icon icon="mingcute:arrow-to-up-fill" width="18" id="go-top" />
        </span>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Icon } from '@iconify/vue'

const show = ref(false)
const scrollPercent = ref(0)

const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
    scrollPercent.value = Math.floor((scrollTop / scrollHeight) * 100)
    show.value = scrollTop > 100
}

const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}

onMounted(() => {
    window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})
</script>