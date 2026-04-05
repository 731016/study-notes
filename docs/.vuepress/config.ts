import { viteBundler } from '@vuepress/bundler-vite'
import { defineUserConfig } from 'vuepress'
import { plumeTheme } from 'vuepress-theme-plume'

export default defineUserConfig({
    base: '/',
    lang: 'zh-CN',
    title: '计算机知识杂货铺',
    description: '编程学习记录，包括Java，Spring，SpringMVC，SpringBoot，SpringCloud，设计模式，JavaScript，Linux，Sql，数据库，Redis，消息队列，前端，Git，SVN，C语言，Python，计算机网络，开发环境配置，生产环境问题排查，面试资料...',

    head: [
        // 配置站点图标
        ['link', { rel: 'icon', type: 'image/png', href: '/plume.svg' }],
    ],

    bundler: viteBundler({
        viteOptions: {
            server: {
                allowedHosts: ['xiaofei.site']
            }
        }
    }),
    shouldPrefetch: false, // 站点较大，页面数量较多时，不建议启用

    theme: plumeTheme({
        /* 添加您的部署域名, 有助于 SEO, 生成 sitemap */
        hostname: 'http://xiaofei.site',

        /* 文档仓库配置，用于 editLink */
        docsRepo: 'https://github.com/731016/studyNotes-vuePress',
        docsDir: 'docs',
        docsBranch: 'master',

        /* 页内信息 */
        editLink: true,
        lastUpdated: true,
        contributors: {
            mode: 'block',
            info: [
                {
                    username: 'xiaofei',
                    alias: ['tuaofei'], // 别名，本地 git 配置中的用户名
                    url: 'https://github.com/731016',
                    avatar: 'https://avatars.githubusercontent.com/u/49927991?s=96&v=4',
                }
            ]
        },
        changelog: true,
        editLinkPattern: ':repo/blob/:branch/:path',

        plugins: {
            git: true
        },


        /**
         * 博客
         * @see https://theme-plume.vuejs.press/config/basic/#blog
         */
        // blog: false, // 禁用博客
        // blog: {
        //     postList: true, // 是否启用文章列表页
        //     tags: true, // 是否启用标签页
        //     archives: true, // 是否启用归档页
        //     categories: true, // 是否启用分类页
        //     postCover: 'right', // 文章封面位置
        //     pagination: 15, // 每页显示文章数量
        // },

        /* 博客文章页面链接前缀 */
        article: '/article/',

        /**
         * 编译缓存，加快编译速度
         * @see https://theme-plume.vuejs.press/config/basic/#cache
         */
        cache: 'filesystem',

        /**
         * 为 markdown 文件自动添加 frontmatter 配置
         * @see https://theme-plume.vuejs.press/config/basic/#autofrontmatter
         */
        autoFrontmatter: {
            permalink: true,  // 是否生成永久链接
            createTime: true, // 是否生成创建时间
            title: true,      // 是否生成标题
        },

        /* 本地搜索, 默认启用 */
        search: { provider: 'local' },

        /**
         * Algolia DocSearch
         * 启用此搜索需要将 本地搜索 search 设置为 false
         * @see https://theme-plume.vuejs.press/config/plugins/search/#algolia-docsearch
         */
        // search: {
        //   provider: 'algolia',
        //   appId: '',
        //   apiKey: '',
        //   indexName: '',
        // },

        /**
         * Shiki 代码高亮
         * @see https://theme-plume.vuejs.press/config/plugins/code-highlight/
         */
        codeHighlighter: {
            // twoslash: true, // 启用 twoslash
            whitespace: true, // 启用 空格/Tab 高亮
            lineNumbers: true, // 启用行号
        },

        /* 文章字数统计、阅读时间，设置为 false 则禁用 */
        readingTime: true,

        /**
         * markdown
         * @see https://theme-plume.vuejs.press/config/markdown/
         */
        markdown: {
            abbr: true,         // 启用 abbr 语法  *[label]: content
            annotation: true,   // 启用 annotation 语法  [+label]: content
            pdf: true,          // 启用 PDF 嵌入 @[pdf](/xxx.pdf)
            caniuse: true,      // 启用 caniuse 语法  @[caniuse](feature_name)
            plot: true,         // 启用隐秘文本语法 !!xxxx!!
            bilibili: true,     // 启用嵌入 bilibili视频 语法 @[bilibili](bid)
            youtube: true,      // 启用嵌入 youtube视频 语法 @[youtube](video_id)
            artPlayer: true,    // 启用嵌入 artPlayer 本地视频 语法 @[artPlayer](url)
            audioReader: true,  // 启用嵌入音频朗读功能 语法 @[audioReader](url)
            icons: true,        // 启用内置图标语法  :[icon-name]:
            codepen: true,      // 启用嵌入 codepen 语法 @[codepen](user/slash)
            replit: true,       // 启用嵌入 replit 语法 @[replit](user/repl-name)
            codeSandbox: true,  // 启用嵌入 codeSandbox 语法 @[codeSandbox](id)
            jsfiddle: true,     // 启用嵌入 jsfiddle 语法 @[jsfiddle](user/id)
            npmTo: true,        // 启用 npm-to 容器  ::: npm-to
            demo: true,         // 启用 demo 容器  ::: demo
            repl: {             // 启用 代码演示容器
                go: true,         // ::: go-repl
                rust: true,       // ::: rust-repl
                kotlin: true,     // ::: kotlin-repl
            },
            math: {             // 启用数学公式
                type: 'katex',
            },
            chartjs: true,      // 启用 chart.js
            echarts: true,      // 启用 ECharts
            mermaid: true,      // 启用 mermaid
            flowchart: true,    // 启用 flowchart
            image: {
                figure: true,     // 启用 figure
                lazyload: true,   // 启用图片懒加载
                mark: true,       // 启用图片标记
                size: true,       // 启用图片大小
            },
            include: true,      // 在 Markdown 文件中导入其他 markdown 文件内容
            imageSize: 'local', // 启用 自动填充 图片宽高属性，避免页面抖动
        },

        /**
         * 水印
         * @see https://theme-plume.vuejs.press/guide/features/watermark/
         */
        // watermark: true,

        /**
         * 评论 comments
         * @see https://theme-plume.vuejs.press/guide/features/comments/
         */
        comment: {
            provider: 'Giscus', // "Artalk" | "Giscus" | "Twikoo" | "Waline"
            comment: true,
            repo: '731016/study-notes',
            repoId: 'R_kgDOHlvQHw',
            category: 'General',
            categoryId: 'DIC_kwDOHlvQH84CpjQD',
            mapping: 'pathname',
            reactionsEnabled: true,
            inputPosition: 'top',
        },

        /**
         * 资源链接替换
         * @see https://theme-plume.vuejs.press/guide/features/replace-assets/
         */
        // replaceAssets: 'https://cdn.example.com',

        /**
         * 加密功能
         * @see https://theme-plume.vuejs.press/guide/features/encryption/
         */
        // encrypt: {},
    }),
})
