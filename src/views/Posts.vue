<template>
    <PostList :posts="currentPagePosts" />

    <!-- 分页 -->
    <!-- 定义一个自定义事件 update:page，当调用该事件时执行 updatePage 方法 -->
    <Paginator v-if="isPaginator" :pageInfo="pageInfo" @update:page="updatePage" />
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import PostList from '@/components/post/PostList.vue'
import Paginator from '@/components/Paginator.vue';
import type { PageInfo } from '@/types/pageInfo'
import { usePostStore } from '@/stores/post'

// 当前页码
const currentPage = ref(1);

// 每页显示的文章数量
const pageSize = 10;

const postStore = usePostStore()

// 是否分页
const isPaginator = computed(() => postStore.posts.length > pageSize);

// 当前页的文章
const currentPagePosts = computed(() => {
    const start = (currentPage.value - 1) * pageSize;
    const end = start + pageSize;
    return postStore.posts.slice(start, end);
});

// 分页信息
const pageInfo = computed<PageInfo>(() => ({
    current: currentPage.value,
    total: Math.ceil(postStore.posts.length / pageSize),
}));

// 更新当前页码
const updatePage = (newPage: number) => {
    currentPage.value = newPage;
};

onMounted(async () => {
    await postStore.fetchPosts()
})

</script>


<style scoped></style>