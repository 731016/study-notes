import { defineCollection } from 'vuepress-theme-plume'

export const notes = [
    {
        type: 'post', // 替代原博客功能
        dir: 'preview', // 指向 docs/blog 目录
        // title: '博客' // 集合显示名称
        postList: true, // 是否启用文章列表页
        tags: true, // 是否启用标签页
        archives: true, // 是否启用归档页
        categories: true, // 是否启用分类页
        postCover: 'right', // 文章封面位置
        pagination: 15, // 每页显示文章数量
    },
    {
        type: 'doc',
        dir: 'notes',
        sidebar: 'auto',
        sidebarCollapsed: true, // 是否默认折叠侧边栏
    }
]