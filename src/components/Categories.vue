<template>
    <!-- 当显示特定分类的文章时 -->
    <div v-if="isCategoryPage" class="flex flex-col items-center">
        <div class="mt-6 flex flex-row items-center gap-2 text-2xl h-8 px-4">
            <Icon width="28" :icon="categoriesIcon" />
            <span>
                <p>Category: {{ currentCategory }}</p>
            </span>
        </div>
        <PostList :posts="postStore.getPostsByCategory(currentCategory)" />
    </div>

    <!-- 当显示所有分类时 -->
    <div v-else class="flex flex-col gap-2 px-6 max-w-prose mx-auto md:px-0 my-8">
        <div class="flex flex-row items-center gap-2">
            <Icon width="30" :icon="categoriesIcon" />
            <h2 class="font-bold text-2xl">Categories</h2>
        </div>
        <div class="mt-2 flex flex-col">
            <router-link v-for="(category, index) in postStore.getCategories()" :key="index"
                :to="`/categories/${category.categoryName}`" class="py-2 group">
                <div class="flex flex-row gap-1 group-hover:translate-x-2 transition-transform group-hover:underline">
                    <p>{{ category.categoryName }}</p>
                    <span>({{ category.count }})</span>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { Icon } from '@iconify/vue'
import { usePostStore } from '@/stores/post'
import { usePageTitleStore } from '@/stores/pageTitle'
import { useHeaderStore } from '@/stores/useConfig'
import PostList from '@/components/post/PostList.vue'


// 路由和状态管理
const route = useRoute()
const postStore = usePostStore()
const headerStore = useHeaderStore()

// 获取 Categories 对应的图标
const categoriesIcon = computed(() => {
    const item = headerStore.navItems.find((item) => item.name === 'Categories');
    return item?.icon || 'mingcute:classify-2-fill'; // 如果找不到，返回默认图标
});

onMounted(async () => {
    await postStore.fetchPosts()
})

// 当前是显示全部分类还是某个特定分类的页面
const isCategoryPage = computed(() => route.path.startsWith('/categories/'))

// 当前分类
const currentCategory = computed(() => {
    if (isCategoryPage.value) {
        return route.params.categoryName as string;
    }
    return '';
})

watch(currentCategory, (newVal) => {
    if (isCategoryPage.value && newVal) {
        usePageTitleStore().updateTitle(newVal)
    }
})

</script>