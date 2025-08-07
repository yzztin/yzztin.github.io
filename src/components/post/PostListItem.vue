<!-- 
显示单个文章缩略图、标题、摘要、统计信息、分类、标签等
-->

<template>
    <div class="post-container px-2 py-2 flex flex-col gap-3">
        <div class="flex flex-row items-center gap-4 max-h-36">
            <!-- 文章缩略图 -->
            <router-link v-if="post.thumbnail" :to="`/posts/${post.id}`"
                class="h-full min-w-16 max-w-36 sm:max-w-48">
                <img class="rounded-md object-cover transition-all hover:scale-105 hover:shadow-md"
                    :src="post.thumbnail" :alt="post.thumbnail_alt" />
            </router-link>

            <div class="flex flex-col gap-1">
                <!-- 文章标题 -->
                <router-link :to="`/posts/${post.id}`">
                    <h2
                        class="text-[var(--c-80)] font-bold text-xl hover:text-[var(--c-theme)] transition-all hover:underline">
                        {{ post.title }}
                    </h2>
                </router-link>

                <!-- 文章摘要 -->
                <div v-if="post.excerpt"
                    class="post-excerpt post-content text-[var(--c-60)] text-sm line-clamp-5 border-b-1 border-[var(--c-sep)]">
                    {{ post.excerpt }}
                </div>
            </div>
        </div>

        <!-- 文章统计信息 -->
        <div class="flex flex-wrap items-center gap-x-2 text-sm text-[var(--c-70)]">
            <!-- 文章创建时间 -->
            <span class="flex flex-row items-center gap-1 group">
                <Icon icon="mingcute:add-circle-fill" width="16" />
                <time class="w-max">{{ formatDate(post.date) }}</time>
            </span>

            <!-- 文章更新时间 -->
            <span v-if="post.updated" class="flex flex-row items-center gap-1 group">
                <Icon icon="mingcute:refresh-3-fill" width="16" />
                <time class="w-max">{{ formatDate(post.updated) }}</time>
            </span>

            <span class="flex flex-row items-center gap-1 group">
                <Icon icon="mingcute:book-2-fill" width="16" />
                <p class="w-max">{{ post.wordCount }} words, {{ post.readTime }} min</p>
            </span>

            <!-- 分类 -->
            <span v-if="post.category?.length" class="flex flex-row items-center gap-1 group">
                <Icon :icon="categoriesIcon" width="16"
                    class="group-hover:scale-125 transition-transform group-hover:text-[var(--c-theme)]" />
                <router-link :to="`/categories/${post.category}`" class="underline underline-offset-2">
                    {{ post.category }}
                </router-link>
            </span>
        </div>

        <!-- 标签 -->
        <div v-if="post.tags?.length">
            <TagList :tags="post.tags" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import TagList from '@/components/post/PostTag.vue'
import type { Post } from '@/types/post'
import { formatDate } from '@/stores/post'
import { useHeaderStore } from '@/stores/useConfig'

const headerStore = useHeaderStore()

defineProps<{
    post: Post
}>()

// const post = props.post

// 获取 Categories 对应的图标
const categoriesIcon = computed(() => {
    const item = headerStore.navItems.find((item) => item.name === 'Categories');
    return item?.icon || 'mingcute:classify-2-fill'; // 如果找不到，返回默认图标
});

</script>