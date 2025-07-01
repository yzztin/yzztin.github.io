import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
    getPostFiles,
    readPostFile,
    parseMarkdown,
} from '@/plugins/md'
import type { Post } from '@/types/post'


const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
}

const usePostStore = defineStore('post', () => {

    const posts = ref<Post[]>([])

    // 获取文章列表
    const fetchPosts = async (isPage: boolean = false) => {
        // 获取所有文章文件名
        const filenames = await getPostFiles(isPage)

        // 读取并解析每个文章文件
        const postPromises = filenames.map(async (filename) => {
            const content = await readPostFile(filename, isPage)
            return parseMarkdown(content)
        })

        const rawPosts = await Promise.all(postPromises)

        // 生成id、统计字数和阅读时间
        const processedPosts = rawPosts.map(post => {
            // 提取时间戳并格式化为 YYYYMMDD 格式
            const dataForId = `${post.date.getFullYear()}${String(post.date.getMonth() + 1).padStart(2, '0')}${String(post.date.getDate()).padStart(2, '0')}`;

            // 处理标题，如果标题超过 10 个字，截取前 10 个字并在末尾加上 *
            let title = post.title.replace(/\s+/g, '')
            if (title.length > 10) {
                title = title.slice(0, 10) + '*';
            }

            let id

            // 生成 ID
            if (isPage) {
                id = post.id

            } else {
                id = `${dataForId}-${title}`;
            }

            // 计算字数和阅读时间（如果 parseMarkdown 中没有计算的话）
            const wordCount = post.wordCount || (post.content?.split(/\s+/).length || 0);
            const readTime = post.readTime || Math.ceil(wordCount / 400);

            return {
                // 扩展运算符 [...posts]，作用是创建 posts 数组的一个浅拷贝。
                ...post,
                id,
                wordCount,
                readTime
            };
        });

        // 根据创建时间排序
        // getTime() 获取时间戳
        processedPosts.sort((a, b) => b.date.getTime() - a.date.getTime());

        // 更新 posts
        posts.value = processedPosts;
    }

    /**
   * 根据 ID 获取文章列表
   */
    function getPostById(id: string): Post | undefined {
        return posts.value.find(post => post.id === id)
    }

    /**
   * 根据分类获取文章列表
   */
    const getPostsByCategory = (category: string): Post[] => {
        return posts.value.filter(post => post.category === category)
    }

    /**
     * 根据标签获取文章列表
     */
    const getPostsByTag = (tag: string): Post[] => {
        return posts.value.filter(post =>
            post.tags?.includes(tag)
        )
    }

    /**
    * 获取特色文章
    */
    const getFeaturedPosts = (): Post[] => {
        return posts.value.filter(post => post.featured)
    }

    /**
     * 获取所有分类及其对应文章数量
     */
    const getCategories = (): { categoryName: string; count: number }[] => {
        const categoryCount: Record<string, number> = {}

        posts.value.forEach(post => {
            if (post.category) {
                categoryCount[post.category] = (categoryCount[post.category] || 0) + 1
            }
        })

        return Object.entries(categoryCount).map(([categoryName, count]) => ({
            categoryName,
            count
        }))
    }

    /**
     * 获取所有标签和对应的数量
     */
    const getTags = (): { tagName: string; count: number }[] => {
        const tagCount: Record<string, number> = {}
        posts.value.forEach(post => {
            post.tags?.forEach(tag => {
                tagCount[tag] = (tagCount[tag] || 0) + 1
            })
        })
        return Object.entries(tagCount).map(([tagName, count]) => ({
            tagName,
            count
        }))
    }

    return {
        // 状态
        posts,

        // 方法
        getPostById,
        fetchPosts,
        getPostsByCategory,
        getPostsByTag,
        getFeaturedPosts,
        getCategories,
        getTags
    }
})

export { formatDate, usePostStore }