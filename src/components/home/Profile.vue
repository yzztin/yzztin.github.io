<template>
  <!-- home 页面个人信息 -->
  <div class="index-info-container pt-6 text-[var(--c-70)]">
    <div class="flex flex-col items-center justify-center">
      <!-- 
      这个 img 标签用来控制首页头像图片
      rounded-3xl 设置图片的圆角为 3xl，即 48px 的圆角
      w-36 设置图片的宽度为 36，单位是 Tailwind CSS 的默认单位
      sm:w-48 使用 Tailwind CSS 的响应式前缀 sm:，表示在屏幕宽度大于 sm 断点（默认是 640px）时，图片的宽度会变为 48
      hover:scale-[1.04] 这是 Tailwind CSS 的伪类 hover 和 scale 的组合。当鼠标悬停在图片上时，图片的缩放比例会变为 1.04
      transition-transform 用于为图片的变换（如缩放）添加过渡效果，确保图片的放大效果是平滑的，而不是瞬间完成的。
      -->

      <!-- 点击头像图片跳转到 /about -->
      <router-link to="/about" class="cursor-pointer">
        <img :src="baseConfig.portrait" :alt="baseConfig.title"
          class="rounded-3xl w-36 sm:w-48 hover:scale-[1.04] transition-transform" />
      </router-link>

      <!-- 标题 -->
      <h1
        class="site-title text-center text-5xl bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent pb-4 pt-6 font-black">
        {{ baseConfig.title }}
      </h1>

      <!-- 副标题 -->
      <p
        class="text-3xl font-extrabold text-center bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
        {{ baseConfig.subtitle }}
      </p>

      <!-- 位置和简历 -->
      <div class="flex flex-wrap items-center justify-center gap-4 my-6 font-bold text-lg">
        <div class="flex flex-row items-center gap-1">
          <Icon width="24" icon="mingcute:building-1-fill"></Icon>
          <p>{{ baseConfig.location }}</p>
        </div>
        <div class="flex flex-row items-center gap-1 group">
          <Icon class="transition-transform group-hover:scale-125" width="24" icon="mingcute:idcard-fill"></Icon>
          <a :href="baseConfig.cvPath" class="group-hover:underline">
            Resume ({{ baseConfig.cvLastUpdateDate }})
          </a>
        </div>
      </div>

      <!-- 描述 -->
      <div class="description-container max-w-prose mx-auto grid grid-cols-1">
        <div class="text-left p-8">
          <p v-html="baseConfig.descriptionClean()"></p>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useBaseConfig } from '@/stores/useConfig'

const baseConfig = useBaseConfig()

</script>
