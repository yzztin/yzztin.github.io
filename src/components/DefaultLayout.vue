<template>
  <div class="min-h-screen flex flex-col bg-[var(--c-0)] text-[var(--c-80)]">
    <Header />
    <main class="flex-grow">
      <!-- 在 父路由 中显示 子路由 Home 的内容 -->
      <router-view />
    </main>
    <Footer />
    <BackToTop />
    <div class="fixed top-0 bottom-0 left-0 right-0 pointer-events-none print:hidden" id="maple"></div>
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/common/Header.vue'
import Footer from '@/components/common/Footer.vue'
import BackToTop from '@/components/common/BackToTop.vue'
</script>