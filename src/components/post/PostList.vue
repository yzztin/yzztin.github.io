<!--
在页面上显示文章列表

1. 按日期排序文章
2. 显示年份背景
3. 使用网格布局展示文章列表
-->

<template>
    <section class="px-2 py-8 max-w-prose mx-auto gap-4 grid grid-cols-1">
        <template v-for="(post, index) in props.posts" :key="index">
            <!-- 年份背景 -->
            <!--
                pointer-events-none  禁用鼠标事件，这会禁用 2025 年份背景字样响应鼠标事件，避免因此导致无法点击标题链接
            -->
            <div v-if="shouldShowYear(post)" class="relative pointer-events-none h-[30px]">
                <div class="absolute -top-6 w-[100%] text-center">
                    <p
                        class="inline-block translate-x-20 text-clip overflow-hidden text-9xl font-extrabold text-[var(--c-theme)] opacity-10 dark:opacity-20">
                        {{ getYear(post.date) }}
                    </p>
                </div>
            </div>

            <!-- 文章项 -->
            <div class="w-full">
                <PostListItem :post="post" />
            </div>

        </template>
    </section>
</template>

<script setup lang="ts">
import PostListItem from './PostListItem.vue'
import type { Post } from '@/types/post'

const props = defineProps<{
    posts: Post[]
}>()


const getYear = (date: Date) => {
    return new Date(date).getFullYear()
}

// 判断是否需要显示年份背景，只在第一次出现该年份时显示
const shouldShowYear = (post: Post) => {
    const currentYear = getYear(post.date)
    // indexOf 方法找到当前帖子 post 在 props.posts 数组中的索引位置
    const prevPost = props.posts[props.posts.indexOf(post) - 1]
    return !prevPost || getYear(prevPost.date) !== currentYear
}
</script>