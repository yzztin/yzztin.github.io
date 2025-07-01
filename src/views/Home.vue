<template>
  <div class="container mx-auto">
    <Profile />
    <Divider />
    <FeaturedPosts />
  </div>
</template>

<script setup lang="ts">
import Profile from '@/components/home/Profile.vue'
import Divider from '@/components/common/Divider.vue'
import FeaturedPosts from '@/components/home/FeaturedPosts.vue'

</script>