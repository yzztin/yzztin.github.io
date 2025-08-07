<template>
    <!--
        flex 将元素设置为弹性布局容器
        flex-col 设置弹性布局的方向为垂直
        items-center 在水平交叉轴上居中对齐
        justify-center 在垂直方向主轴上居中对齐
    -->
    <div class="flex flex-col items-center justify-center">
        <!--
            w-1/2 宽度为父容器的 50%
            mb-10 下边距为 2.5rem (40px)
            h-[1px]: 高度为 1px
            bg-[var(--c-sep)]: 使用自定义变量 --c-sep 作为背景色
            mr-1/2: 右边距为父容器的 50%
        -->
        <hr class="w-1/2 mb-10 h-[1px] bg-[var(--c-sep)] mr-1/2">
    </div>

</template>

<script setup lang="ts">
</script>