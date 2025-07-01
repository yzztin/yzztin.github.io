<template>
  <!-- 显示星星图标和 Featured Posts 文本 -->
  <div class="flex flex-col items-center justify-center">

    <!--
      --c-50 是自定义的 css 变量，在 src/style/main.css 中定义，var(--c-50) 表示取变量的值
      text-[] 是 Tailwind CSS 的动态类名，用于设置文本颜色
    -->
    <div class="flex flex-row items-center gap-2 text-[var(--c-50)]">

      <!-- 这里是通过 cdn 使用 iconify -->
      <!-- <span class="iconify" data-icon="mingcute:star-fill" style="font-size: 28px;"></span> -->

      <!-- 这是使用 Icon 组件 -->
      <Icon icon="mingcute:star-fill" width="28" />

      <p class="text-center text-3xl">Featured Posts</p>
    </div>
  </div>

  <!-- 精选文章列表 -->
  <PostList :posts="postStore.getFeaturedPosts()" :show-tags="true" />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { Icon } from '@iconify/vue'  // 引入 Icon 组件
import { usePostStore } from '@/stores/post'
import PostList from '@/components/post/PostList.vue'


const postStore = usePostStore()
// const { posts } = postStore  // 解构赋值，这会断开响应式引用，变为一个普通的变量，相当于把 postStore.posts 赋值给了 posts

// 组件挂载到 DOM 后获取执行 fetchPosts() 方法获取文章，获取到的数据会自动更新到 pinia store 中
// 在刚创建组件时，pinia store 是空的，在组件挂载后获取到实际的文章数据
// 通常用于执行初始化操作，例如从服务器获取数据、设置初始状态等。
onMounted(async () => {
  await postStore.fetchPosts()
})

// 计算属性：从所有文章中获取精选文章
// post => post.featured 是一个回调函数，代表会对每一个 post 进行判断，如果 post.featured 为 true，则将该 post 添加到 featuredPosts 中
// const featuredPosts = computed(() => {
//   const filtered = postStore.posts.filter(post => post.featured)
//   console.log('过滤后的结果:', filtered)
//   return filtered
// })
</script>
