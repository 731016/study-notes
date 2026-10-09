import { h } from 'vue'
import { Layout } from 'vuepress-theme-plume/client'
import { defineClientConfig } from 'vuepress/client'
// import RepoCard from 'vuepress-theme-plume/features/RepoCard.vue'
// import NpmBadge from 'vuepress-theme-plume/features/NpmBadge.vue'
// import NpmBadgeGroup from 'vuepress-theme-plume/features/NpmBadgeGroup.vue'
// import Swiper from 'vuepress-theme-plume/features/Swiper.vue'
// PageContextMenu 提供页面标题右侧的「复制页面」下拉控件(依赖主题 llmstxt 配置)
import PageContextMenu from 'vuepress-theme-plume/features/PageContextMenu.vue'



// import CustomComponent from './theme/components/Custom.vue'
import Demos from './theme/components/Demos.vue'



// import './theme/styles/custom.css'

export default defineClientConfig({
  enhance({ app }) {
    // built-in components
    // app.component('RepoCard', RepoCard)
    // app.component('NpmBadge', NpmBadge)
    // app.component('NpmBadgeGroup', NpmBadgeGroup)
    // app.component('Swiper', Swiper) // you should install `swiper`

    // your custom components
    // app.component('CustomComponent', CustomComponent)
    app.component('Demos', Demos)
  },
  layouts: {
    Layout: h(Layout, null, {
      // 将 PageContextMenu 添加到 doc-title-after 插槽，即文章标题的右侧
      'doc-title-after': () => h(PageContextMenu, {
        // 关闭 AI 跳转项
        chatgpt: true,
        claude: true,
        perplexity: true,
      }),
    }),
  },
})
