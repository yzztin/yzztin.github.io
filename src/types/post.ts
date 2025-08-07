// 导出 Post 接口供其他文件使用 - 保持与原有结构一致
export interface Post {
    id?: string
    title: string
    date: Date
    excerpt?: string
    wordCount?: number
    readTime?: number
    tags?: string[]
    category?: string
    featured?: boolean
    path?: string
    content?: string | any
    thumbnail?: string
    thumbnail_alt?: string
    updated?: Date
}

export interface PostFrontMatter {
    id?: string
    title: string
    date: string
    updated?: string
    excerpt?: string
    category?: string
    tags?: string[]
    featured?: boolean
    thumbnail?: string
    thumbnail_alt?: string
}

// 给定 Post 默认值
export function createEmptyPost(): Post {
    return {
        title: '',
        date: new Date(),
        excerpt: '',
        wordCount: 0,
        readTime: 0,
        tags: [],
        category: '',
        featured: false,
        path: '',
        content: '',
        thumbnail: '',
        thumbnail_alt: '',
        updated: new Date(),
        id: '', // 虽然是可选，但加上可以防止 undefined
    }
}