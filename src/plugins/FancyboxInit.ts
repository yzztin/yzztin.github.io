import { watch, nextTick } from 'vue'
import { Fancybox } from '@fancyapps/ui'
import '@fancyapps/ui/dist/fancybox/fancybox.css'

export function useFancybox(sourceRef: () => string) {
    watch(sourceRef, async () => {
        await nextTick() // 等待 DOM 更新

        document.querySelectorAll('.post-content').forEach((content) => {
            content.querySelectorAll('img').forEach(img => {
                const parent = img.parentElement
                if (parent?.classList.contains('fancybox-img') || parent?.tagName.toLowerCase() === 'a') return

                const alt = img.getAttribute('alt')
                const title = img.getAttribute('title')

                const span = document.createElement('span')
                span.className = alt ? 'fancybox-alt' : 'fancybox-title'
                span.innerText = alt || title || ''
                if (span.innerText) img.after(span)

                const link = document.createElement('a')
                link.className = 'fancybox-img'
                link.href = img.src
                link.setAttribute('data-fancybox', 'gallery')
                if (title) link.setAttribute('data-caption', title)

                img.replaceWith(link)
                link.appendChild(img)
            })
        })

        Fancybox.bind('[data-fancybox="gallery"]', {})
    }, { immediate: true })
}
