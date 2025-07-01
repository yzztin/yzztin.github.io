<template>
    <article class="post-content prose m-auto dark:prose-invert" v-html="safeHtml"></article>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import MarkdownIt from 'markdown-it'
import DOMPurify from 'dompurify'

const props = defineProps<{ source: string }>()

const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    breaks: true,
})


const html = ref('')
const safeHtml = ref('')

function render() {
    html.value = md.render(props.source || '')
    safeHtml.value = DOMPurify.sanitize(html.value)
}

watch(() => props.source, render, { immediate: true })
onMounted(render)
</script>

<style scoped>
.copy-btn {
    position: absolute;
    top: 8px;
    right: 8px;
    z-index: 2;
    font-size: 12px;
    padding: 2px 8px;
    background: #eee;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.code-block-wrapper {
    position: relative;
}
</style>