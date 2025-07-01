<!-- 单篇文章的详细信息 -->
<template>
    <section class="px-6 max-w-prose mx-auto md:px-0">
        <!-- 文章头部 -->
        <header class="py-4">
            <div class="flex flex-col gap-2 pt-4 md:pt-6">
                <!-- 标题 -->
                <div id="article-title" class="leading-snug">
                    <p class="text-3xl font-bold text-[var(--c-100)] mb-4">{{ post.title }}</p>
                </div>

                <!-- 元数据 -->
                <div>
                    <section class="flex flex-col gap-x-2 gap-y-1 text-sm text-[var(--c-100)]">
                        <div class="flex flex-wrap items-center gap-x-2 gap-y-1">
                            <!-- 日期 -->
                            <div class="flex items-center gap-1">
                                <Icon width="18" icon="mingcute:add-circle-fill" />
                                Created: <time class="w-max">{{ formatDate(post.date) }}</time>
                            </div>
                            <div v-if="post.updated" class="flex items-center gap-1">
                                <Icon width="18" icon="mingcute:refresh-3-fill" />
                                Edited: <time class="w-max">{{ formatDate(post.updated) }}</time>
                            </div>
                        </div>

                        <div class="flex flex-wrap items-center gap-x-3 gap-y-3">

                            <!-- 字数统计 -->
                            <span class="flex items-center gap-1">
                                <Icon width="18" icon="mingcute:book-2-fill" />
                                <span>{{ post.wordCount }} words, {{ post.readTime }} min</span>
                            </span>

                            <!-- 分类 -->
                            <span class="flex flex-row items-center gap-1 group hover:underline">
                                <Icon class="transition-all group-hover:scale-125 mr-0" width="18"
                                    icon="mingcute:classify-2-fill" />
                                <a :href="`/categories/${post.category}`" class="article-category">
                                    {{ post.category }}
                                </a>
                            </span>
                        </div>
                    </section>
                </div>

                <!-- 标签 -->
                <div v-if="post.tags">
                    <TagList :tags="post.tags" />
                </div>
            </div>
        </header>

        <!-- 目录 -->
        <!--
        TableOfContents 组件本身并不“知道”文章内容是什么，也不会去解析任何字符串。
        它利用了DOM操作和第三方库 tocbot 来实现目录的自动生成。 
            1. 在 DOM 创建一个空的 <nav> 元素，带有一个关键类名 'post-toc'
            2. 在文章内容独立渲染的组件中 <article> 元素带有一个关键类名 'post-content'
            3. 执行 tocbot.init() 函数
            4. 接着会自动扫描和遍历 .post-content 内部所有的标题标签，组装为一个嵌套的 <ul> 列表
            5. 得到组装的目录元素
        -->
        <TableOfContents :source="post.content" />

        <!-- 文章内容 -->
        <!-- <article class="post-content prose m-auto dark:prose-invert" v-html="post.content"></article> -->
        <MarkdownRenderer :source="post.content" />

        <!-- 上一篇/下一篇导航 -->
        <!-- 此时点击跳转后响应的还是同一个 Post Detail.vue 组件，因此需要 watch 监视路由变化来切换文章内容展示 -->
        <div class="flex justify-between mt-4 pt-4 border-t border-[var(--c-sep)] text-sm gap-2 text-[var(--c-50)]">
            <div class="flex-1">
                <div v-if="prevPost" class="max-w-fit">
                    <router-link :to="`/posts/${prevPost.id}`"
                        class="transition-all flex justify-center hover:-translate-x-1 hover:text-[var(--c-80)]">
                        <Icon width="20" icon="mingcute:left-fill" data-inline="false" />
                        {{ prevPost.title }}
                    </router-link>
                </div>
            </div>

            <div class="flex-1 text-right">
                <div v-if="nextPost" class="max-w-fit ml-auto">
                    <router-link :to="`/posts/${nextPost.id}`"
                        class="flex justify-center hover:translate-x-1 transition-transform hover:text-[var(--c-100)]">
                        {{ nextPost.title }}
                        <Icon width="20" icon="mingcute:right-fill" data-inline="false" />
                    </router-link>
                </div>
            </div>
        </div>

    </section>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, withDefaults } from 'vue'
import { Icon } from '@iconify/vue'
import { useRoute } from 'vue-router'
import type { Post } from '@/types/post'
import { createEmptyPost } from '@/types/post'
import { usePostStore, formatDate } from '@/stores/post'
import { usePageTitleStore } from '@/stores/pageTitle'
import TagList from '@/components/post/PostTag.vue'
import MarkdownRenderer from '@/components/MarkdownRenderer.vue'
import TableOfContents from '@/components/post/TableOfContents.vue'
import { useFancybox } from '@/plugins/FancyboxInit'

// 非强制传参
interface Props {
    isPage?: boolean
    pageId?: string
}

const props = withDefaults(defineProps<Props>(), {
    isPage: false,
})

const route = useRoute()
const postStore = usePostStore()

// 在上面 <template> 中，如果直接使用 post.xxx，但是 post 实际上对应的值还没加载的话，会直接导致页面崩溃而不会执行挂载，因此可以先给定一个默认值
const post = ref<Post>(createEmptyPost())

// 上下篇文章
const prevPost = ref<Post | null>(null)
const nextPost = ref<Post | null>(null)

useFancybox(() => post.value.content)

// 监听 route.params.post 的变化，并在变化时重新加载对应的文章数据
watch(() => route.params.post, async (newId) => {
    if (!newId) return

    const currentPost = postStore.getPostById(newId as string) ?? createEmptyPost()
    post.value = currentPost

    const index = postStore.posts.findIndex(p => p.id === newId)
    prevPost.value = index > 0 ? postStore.posts[index - 1] : null
    nextPost.value = (index >= 0 && index < postStore.posts.length - 1) ? postStore.posts[index + 1] : null
})

// 通过挂载组件获取数据，如果没有拿到对应的数据，给出定一个默认的数据值
onMounted(async () => {
    const postId = route.params.post

    // TODO FIXME: 每次都调用获取文件名和解析文章，可以尝试优化，不做重复解析。
    await postStore.fetchPosts(props.isPage)

    // if (postStore.posts.length === 0) {
    //     await postStore.fetchPosts(props.isPage)
    // }

    if (props.isPage) {
        post.value = postStore.getPostById(props.pageId as string) ?? createEmptyPost()
    } else {
        post.value = postStore.getPostById(postId as string) ?? createEmptyPost()
    }

    // 更改标题
    usePageTitleStore().updateTitle(post.value.title)

    // 查找当前 post 在列表中的位置
    const index = postStore.posts.findIndex(p => p.id === postId)

    if (index > 0) {
        prevPost.value = postStore.posts[index - 1]
    }
    if (index >= 0 && index < postStore.posts.length - 1) {
        nextPost.value = postStore.posts[index + 1]
    }
})

</script>

<style scoped></style>