<!--
显示文章标签列表
-->
<template>
    <div class="flex flex-wrap gap-1">
        <router-link v-for="tag in tags" :key="tag" :to="`/tags/${tag}`" class="
            tag
            text-sm
            rounded-full
            px-[5px]
            border-[1px]
            border-[var(--c-theme)]
            text-[var(--c-theme)]
            bg-[var(--c-0)]
            dark:bg-[var(--c-0)]
            dark:drop-shadow-none
            hover:bg-[var(--c-theme)]
            hover:text-[var(--c-0)]
            dark:hover:text-[var(--c-10)]
            dark:hover:bg-[var(--c-theme)] ">
            {{ tag }}
        </router-link>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    tags: string[]
}>()

</script>