<template>
    <div class="border-t border-[--c-40]">
        <div v-if="pageInfo.total > 1" class="flex flex-row justify-center px-24 max-w-prose mx-auto py-4">
            <!-- 上一页按钮 -->
            <div v-if="hasPrev"
                class="hover:bg-gray-100 rounded-md text-center shadow-md flex flex-row border-1 items-center justify-center pr-4 pl-2 cursor-pointer"
                @click="prevPage">
                <Icon width="20" icon="mingcute:left-fill" data-inline="false" />
                Prev
            </div>
            <div v-else
                class="opacity-20 rounded-md text-center shadow-md flex flex-row border-1 items-center justify-center pr-4 pl-2">
                <Icon width="20" icon="mingcute:left-fill" data-inline="false" />
                Prev
            </div>

            <!-- 当前页码 -->
            <div class="flex flex-grow text-center justify-center">
                <div class="border-2 text-xl font-bold opacity-70 w-fit px-2 rounded-lg">
                    <p>{{ pageInfo.current }} / {{ pageInfo.total }}</p>
                </div>
            </div>

            <!-- 下一页按钮 -->
            <div v-if="hasNext"
                class="hover:bg-gray-100 rounded-md text-center justify-center border-1 shadow-md flex flex-row items-center pl-4 pr-2 cursor-pointer"
                @click="nextPage">
                Next
                <Icon width="20" icon="mingcute:right-fill" data-inline="false" />
            </div>
            <div v-else
                class="opacity-20 rounded-md text-center justify-center border-1 shadow-md flex flex-row items-center pl-4 pr-2">
                Next
                <Icon width="20" icon="mingcute:right-fill" data-inline="false" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Icon } from '@iconify/vue'
import type { PageInfo } from '@/types/pageInfo';


const props = defineProps<{ pageInfo: PageInfo }>();
const emit = defineEmits(['update:page']);

const hasPrev = computed(() => props.pageInfo.current > 1);
const hasNext = computed(() => props.pageInfo.current < props.pageInfo.total);

const prevPage = () => {
    emit('update:page', props.pageInfo.current - 1);
};

const nextPage = () => {
    emit('update:page', props.pageInfo.current + 1);
};
</script>

<style scoped>
.hover\:bg-gray-100:hover {
    background-color: rgba(243, 244, 246, 1);
    transition: background-color 0.2s ease;
}
</style>