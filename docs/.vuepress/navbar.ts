import {defineNavbarConfig} from 'vuepress-theme-plume'

export const navbar = defineNavbarConfig([
    {text: '首页', link: '/', icon: 'material-symbols:home-outline'},
    {text: '博客', link: '/preview/', icon: 'material-symbols:article-outline'},
    {
        text: '刷题网站',
        icon: 'flat-color-icons:comments',
        items: [
            {
                text: '刷题网站',
                items: [
                    {
                        text: '炼码',
                        link: 'https://www.lintcode.com/',
                    },
                    {
                        text: '赛码',
                        link: 'https://www.acmcoder.com/#/practice/company',
                    },
                    {
                        text: '牛客网',
                        link: 'https://www.nowcoder.com/',
                    },
                    {
                        text: '力扣',
                        link: 'https://leetcode.cn/',
                    },
                    {
                        text: '剑指offer',
                        link: 'https://www.nowcoder.com/exam/oj/ta?page=1&tpId=13&type=13',
                    },
                ],
            }
        ]
    },
    {
        text: '运维助手',
        icon: 'mdi:idea',
        items: [
            {
                text: '博客',
                // icon: 'icon-park-solid:theme',
                items: [
                    {
                        text: 'csdn',
                        link: 'https://blog.csdn.net/qq_41666142',
                        icon: 'mdi:paper-airplane',
                        badge: '100W+访问'
                    },
                ],
            },
            {
                text: 'Linux',
                // icon: 'mingcute:plugin-2-fill',
                badge: {text: '徽章', type: 'warning'},
                items: [
                    {
                        text: 'cloudflare',
                        link: 'https://dash.cloudflare.com/49a6bb3ca5c8c8ab2b4f59ff43ba0f2a/xiaofei.site',
                        icon: 'pajamas:feature-flag',
                    },
                    {
                        text: '1Panel',
                        link: 'http://43.136.170.4:10001/1panel',
                        icon: 'material-symbols:move-selection-down-rounded',
                    },
                    {
                        text: 'vsCode网页版',
                        link: 'http://43.136.170.4:10086/login',
                        icon: 'ic:baseline-post-add',
                    },
                ],
            },
            {
                text: '网盘',
                // icon: 'flat-color-icons:globe',
                items: [
                    {
                        text: '蓝凑云',
                        link: 'https://pc.woozooo.com/account.php?action=login&ref=/mydisk.php',
                        icon: 'mdi-light:link-variant',
                    },
                ],
            },
        ],
    },
    {
        text: '演示网站',
        icon: 'mdi-light:link-variant',
        items: [
            {
                text: '快速开发平台',
                link: 'http://43.136.170.4:8888/',
                icon: 'mdi-light:link-variant',
            },
        ]
    },
    {
        text: 'Ai助手',
        icon: 'flat-color-icons:search',
        items: [
            {
                text: 'Ai助手',
                items: [
                    {
                        text: 'Kimi',
                        link: 'https://kimi.moonshot.cn/',
                    },
                    {
                        text: 'Cursor',
                        link: 'https://cursor.com/cn',
                    },
                    {
                        text: 'TRAE',
                        link: 'https://www.trae.cn/',
                    },
                    {
                        text: 'DeepSeek - 探索未至之境',
                        link: 'https://chat.deepseek.com/',
                    },
                    {
                        text: '听脑 AI',
                        link: 'https://itingnao.com/',
                    },
                    {
                        text: '鱼聪明',
                        link: 'https://www.yucongming.com/chat/1781191236741668865',
                    },
                    {
                        text: '通义',
                        link: 'https://tongyi.aliyun.com/qianwen/',
                    },
                    {
                        text: 'AI 提示词',
                        link: '/article/68i4hs34/',
                    }
                ],
            }
        ],
    },
    {text: '关于我', link: 'https://731016.github.io/', icon: 'fluent-color:person-48'},
])
