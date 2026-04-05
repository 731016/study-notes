import { defineThemeConfig } from 'vuepress-theme-plume'
import { navbar } from './navbar'
import { notes } from './notes'

/**
 * @see https://theme-plume.vuejs.press/config/basic/
 */
export default defineThemeConfig({
    logo: '/plume.svg',

    appearance: true,  // 配置 深色模式

    social: [
        { icon: 'github', link: 'https://github.com/731016/study-notes' },
    ],
    navbarSocialInclude: ['github'], // 允许显示在导航栏的 social 社交链接
    aside: true, // 页内侧边栏， 默认显示在右侧
    outline: [2, 6], // 页内大纲， 默认显示 h2, h3

    /**
     * 文章版权信息
     * @see https://theme-plume.vuejs.press/guide/features/copyright/
     */
    // copyright: true,

    prevPage: true,   // 是否启用上一页链接
    nextPage: true,   // 是否启用下一页链接
    createTime: true, // 是否显示文章创建时间

    /* 站点页脚 */
    footer: {
        message: ``,
        copyright: '鄂ICP备2024071306号',
    },

    /**
     * @see https://theme-plume.vuejs.press/config/basic/#profile
     */
    profile: {
        avatar: '/plume.svg',
        name: '计算机知识杂货铺',
        description: '你好，很高兴认识你👋 我叫折腾的小飞，00 后。',
        circle: true, // 圆形头像
        location: '湖北武汉 ',
        // organization: '', // 所属组织
    },

    navbar,
    collections: notes,

    /**
     * 公告板
     * @see https://theme-plume.vuejs.press/guide/features/bulletin/
     */
    // bulletin: {
    //   layout: 'top-right',
    //   contentType: 'markdown',
    //   title: '公告板标题',
    //   content: '公告板内容',
    // },

    /* 过渡动画 @see https://theme-plume.vuejs.press/config/basic/#transition */
    transition: {
        page: true,        // 启用 页面间跳转过渡动画
        postList: true,    // 启用 博客文章列表过渡动画
        appearance: 'fade',  // 启用 深色模式切换过渡动画, 或配置过渡动画类型
    }
})
