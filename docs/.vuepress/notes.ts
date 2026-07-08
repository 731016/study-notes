import { icon } from 'mermaid/dist/rendering-util/rendering-elements/shapes/icon.js'
import { defineCollection } from 'vuepress-theme-plume'

export const notes = [
    {
        type: 'post', // 替代原博客功能
        dir: '/blog/', // 指向 docs/blog 目录
        link: '/blog/',
        title: '博客', // 集合显示名称
        postList: true, // 是否启用文章列表页
        tags: true, // 是否启用标签页
        archives: true, // 是否启用归档页
        categories: true, // 是否启用分类页
        postCover: 'right', // 文章封面位置
        pagination: 5, // 每页显示文章数量
    },
    {
        type: 'doc',
        dir: 'notes',
        sidebar: [
            /* ========== 知识库 ========== */
            {
                text: '知识库',
                icon: 'fluent-mdl2:knowledge-article',
                collapsed: true,
                items: [
                    {
                        text: 'Java 工具集',
                        icon: 'devicon:java',
                        collapsed: true,
                        items: [
                            '知识库/常用配置文件',
                            '知识库/Java工具类',
                            '知识库/Java算法',
                        ],
                    },
                    {
                        text: 'JavaScript 工具集',
                        icon: 'openmoji:javascript',
                        collapsed: true,
                        items: [
                            '知识库/JavaScript',
                        ],
                    },
                    {
                        text: '业务解决方案',
                        collapsed: true,
                        items: [
                            '知识库/常用技术解决方案',
                            '知识库/常见问题解决方案',
                            '知识库/制造业业务知识',
                        ],
                    },
                ],
            },
            /* ========== 运维与问题排查 ========== */
            {
                text: '运维与问题排查',
                icon: 'lsicon:operation-outline',
                collapsed: true,
                items: [
                    {
                        text: '生产环境问题',
                        collapsed: true,
                        items: [
                            '生产环境/cpu占用过高',
                            '生产环境/OOM排查',
                            '知识库/数据库死锁解决',
                            '生产环境/慢SQL优化',
                        ],
                    },
                ],
            },
            /* ========== 开发工具与环境 ========== */
            {
                text: '开发工具与环境',
                icon: 'carbon:development',
                collapsed: true,
                items: [
                    {
                        text: '版本控制',
                        collapsed: true,
                        items: [
                            '版本控制/SVN',
                            '版本控制/Git',
                        ],
                    },
                    {
                        text: 'IDE 与编辑器',
                        collapsed: true,
                        items: [
                            '开发环境/IDEA配置',
                            '开发环境/VsCode配置',
                        ],
                    },
                    {
                        text: '构建与部署',
                        collapsed: true,
                        items: [
                            '开发环境/Maven配置',
                            '开发环境/Tomcat配置',
                            '开发环境/单元测试',
                            '开发环境/压力测试',
                        ],
                    },
                    {
                        text: '命令行工具',
                        collapsed: true,
                        items: [
                            '开发环境/CMD编码',
                        ],
                    },
                ],
            },
            /* ========== 编程语言基础 ========== */
            {
                text: '编程语言基础',
                icon: 'streamline-ultimate:programming-browser-1-bold',
                collapsed: true,
                items: [
                    {
                        text: 'Java',
                        collapsed: true,
                        items: [
                            'JavaSE/Java基础',
                            'JavaSE/面向对象编程',
                            'JavaSE/JavaAPI',
                            'JavaSE/包装类型',
                            'JavaSE/泛型',
                            'JavaSE/数据结构',
                            'JavaSE/集合',
                            'JavaSE/异常处理',
                            'JavaSE/IO流',
                            'JavaSE/线程',
                            'JavaSE/网络编程',
                            'JavaSE/函数式接口',
                            'JavaSE/Debug',
                            '反射/反射',
                        ],
                    },
                    { text: 'C语言基础', link: 'c语言/c' },
                    { text: 'Python基础', link: 'Python/pyhton' },
                ],
            },
            /* ========== 后端 ========== */
            {
                text: '后端',
                icon: 'eos-icons:service',
                collapsed: true,
                items: [
                    { text: 'JSP + Servlet',icon: 'vscode-icons:file-type-jsp', link: 'JavaWeb/jsp_servlet' },
                    {
                        text: 'Spring 框架',
                        icon: 'devicon:spring',
                        collapsed: true,
                        items: [
                            'SSM框架/mybatis',
                            'SSM框架/spring',
                            'SSM框架/springMVC',
                            'SSM框架/springBoot',
                            'SSM框架/springclond',
                            'SSM框架/springClondAlibaba',
                        ],
                    },
                ],
            },
            /* ========== 前端 ========== */
            {
                text: '前端',
                icon: 'icon-park:web-page',
                collapsed: true,
                items: [
                    {
                        text: '前端基础',
                        collapsed: true,
                        items: [
                            '前端/HTML',
                            '前端/CSS',
                            '前端/JavaScript语法基础',
                            '前端/Web-Api',
                            '前端/移动布局基础',
                        ],
                    },
                    {
                        text: '前端框架',
                        collapsed: true,
                        items: [
                            '前端/Vue2',
                            '前端/Vue3',
                            'jQuery/Jquery',
                            'jQuery/Ajax',
                        ],
                    },
                    {
                        text: '前后端交互',
                        collapsed: true,
                        items: [
                            '前端/前后端交互',
                            '前端/前端项目注意事项',
                        ],
                    },
                ],
            },
            /* ========== 数据库技术 ========== */
            {
                text: '数据库技术',
                icon: 'mdi:database',
                collapsed: true,
                items: [
                    {
                        text: 'MySQL 数据库',
                        icon: 'logos:mysql',
                        collapsed: true,
                        items: [
                            'MySQL/MySql安装',
                            'MySQL/MySQL基础',
                            'MySQL/JDBC组件',
                        ],
                    },
                    { text: 'SQLServer基础',icon: 'devicon:microsoftsqlserver-wordmark', link: 'SQLServer/SqlServer' },
                ],
            },
            /* ========== 中间件 ========== */
            {
                text: '中间件',
                icon: 'vscode-icons:folder-type-middleware',
                collapsed: true,
                items: [
                    {
                        text: '缓存中间件',
                        collapsed: true,
                        items: [
                            'Redis/Redis',
                        ],
                    },
                    {
                        text: '消息队列 MQ',
                        collapsed: true,
                        items: [
                            '消息队列/rabbitMQ',
                            '消息队列/kafka',
                            '消息队列/RocketMQ',
                        ],
                    },
                    {
                        text: '搜索引擎',
                        collapsed: true,
                        items: [
                            { text: 'ElasticSearch', link: 'https://xiaofei.site/#/%E9%A1%B9%E7%9B%AE/%E8%81%9A%E5%90%88%E6%90%9C%E7%B4%A2%E5%B9%B3%E5%8F%B0?id=_11%E6%90%9C%E7%B4%A2%E4%BC%98%E5%8C%96-es' },
                        ],
                    },
                ],
            },
            /* ========== 计算机基础 ========== */
            {
                text: '计算机基础',
                icon: 'carbon:skill-level-basic',
                collapsed: true,
                items: [
                    {
                        text: '计算机网络',
                        collapsed: true,
                        items: [
                            '计算机网络/NetWork',
                        ],
                    },
                    {
                        text: '操作系统',
                        collapsed: true,
                        items: [
                            'linux/常用linux命令',
                            'linux/linux安装',
                            'linux/正则表达式',
                            'linux/samba服务器',
                            'linux/ubuntu问题解答',
                        ],
                    },
                ],
            },
            /* ========== 软件设计与架构 ========== */
            {
                text: '软件设计与架构',
                icon: 'eos-icons:software',
                collapsed: true,
                items: [
                    '设计模式/设计模式',
                    '软件设计师/软件设计师',
                ],
            },
            /* ========== 项目实战 ========== */
            {
                text: '项目实战',
                icon: 'pajamas:project',
                collapsed: true,
                items: [
                    {
                        text: '完整项目',
                        collapsed: true,
                        items: [
                            { text: '快递代取系统', link: 'https://github.com/731016/Express-pick-up-system' },
                            { text: '天天生鲜交易平台', link: 'https://github.com/731016/daily-fresh-trading-platform' },
                            { text: 'Lie flat房屋出租平台', link: 'https://github.com/731016/rent_house' },
                            '项目/用户中心',
                            '项目/伙伴匹配系统',
                            '项目/寻爱-万用信息展示网站',
                            '项目/API开放平台',
                            '项目/RPC框架',
                            '项目/聚合搜索平台',
                            '项目/智能协同云图库',
                            '项目/AI智能体',
                        ],
                    },
                    {
                        text: '学习案例',
                        collapsed: true,
                        items: [
                            { text: 'HTML+CSS+JS+JQuery案例学习', link: 'https://gitee.com/LovelyHzz/webpage-basic-learning' },
                            { text: '前端案例学习', link: 'http://www.lvyestudy.com/' },
                            'MySQL/购物商城',
                        ],
                    },
                ],
            },
            /* ========== 面试 ========== */
            {
                text: '面试',
                icon: 'material-symbols:work-outline',
                collapsed: true,
                items: [
                    {
                        text: '面试指南',
                        collapsed: true,
                        items: [
                            { text: '面试技巧', link: 'https://github.com/731016/731016.github.io/blob/master/面试技巧.md' },
                            '面试/八股文刷题路线',
                            '面试/八股文',
                        ],
                    },
                    {
                        text: '技术面试专题',
                        collapsed: true,
                        items: [
                            '面试/面试题',
                            '面试/Java基础',
                            '面试/Java集合',
                            '面试/Java并发',
                            '面试/Java虚拟机',
                            '面试/MySQL',
                            '面试/Redis',
                            '面试/Spring',
                            '面试/SpringBoot',
                            '面试/SpringCloud',
                            '面试/系统设计',
                            '面试/场景',
                            '面试/消息队列',
                            '面试/设计模式',
                            '面试/ElasticSearch',
                            '面试/Zookeeper',
                            '面试/netty',
                        ],
                    },
                    {
                        text: '真实面经',
                        collapsed: true,
                        items: [
                            {
                                text: '2021',
                                collapsed: true,
                                items: [
                                    '面试/真实面经/群硕软件',
                                    '面试/真实面经/赛德勤',
                                    '面试/真实面经/上海威士顿',
                                ],
                            },
                            {
                                text: '2025',
                                collapsed: true,
                                items: [
                                    '面试/真实面经/信华信技术',
                                    '面试/真实面经/润和软件',
                                    '面试/真实面经/武汉诺利捷',
                                    '面试/真实面经/诺安科技',
                                    '面试/真实面经/武汉市胜意科技',
                                    '面试/真实面经/北京万户软件',
                                    '面试/真实面经/武汉中交希迪科技',
                                    '面试/真实面经/卓迅信息技术',
                                    '面试/真实面经/浪潮数字商业',
                                    '面试/真实面经/上海艾融软件',
                                    '面试/真实面经/武汉音游科技有限公司',
                                    '面试/真实面经/飞速创新',
                                    '面试/真实面经/武汉中科通达',
                                    '面试/真实面经/北京芯盾时代',
                                    '面试/真实面经/哲凌科技',
                                    '面试/真实面经/顺丰速运',
                                    '面试/真实面经/一毂数据',
                                    '面试/真实面经/赢未来',
                                    '面试/真实面经/嘉禾云网',
                                    '面试/真实面经/佰思杰',
                                ],
                            },
                            {
                                text: '2026',
                                collapsed: true,
                                items: [
                                    '面试/恩达通',
                                    '面试/美平米',
                                ],
                            },
                        ],
                    },
                ],
            },
            /* ========== 其他领域 ========== */
            {
                text: '其他领域',
                icon: 'icon-park:other',
                collapsed: true,
                items: [
                    {
                        text: '高等数学',
                        icon: 'tdesign:mathematics',
                        collapsed: true,
                        items: [
                            '高等数学/基本初等函数图形',
                            '高等数学/特殊值的三角函数值表',
                            '高等数学/三角恒等变换',
                            '高等数学/诱导公式',
                            '高等数学/一元三次方程展开',
                            '高等数学/指数函数的运算法则',
                            '高等数学/华氏度F与摄氏度C的转换',
                            '高等数学/函数、极限、连续',
                            '高等数学/一元函数微分学',
                            '高等数学/一元函数积分学',
                            '高等数学/常微分方程',
                        ],
                    },
                    {
                        text: '劳动合同法',
                        icon: 'material-symbols:contract-rounded',
                        collapsed: true,
                        items: [
                            '劳动合同法/《劳动合同法》的重要性和范围',
                            '劳动合同法/劳动合同的效力',
                            '劳动合同法/劳动合同的分类',
                            '劳动合同法/试用期',
                            '劳动合同法/服务期和违约金',
                            '劳动合同法/竞业限制和违约金',
                        ],
                    },
                ],
            },
            /* ========== 资源导航 ========== */
            { text: '资源链接汇总', icon: 'material-icon-theme:folder-resource', link: '资源导航/link', },
        ],
        sidebarCollapsed: true, // 是否默认折叠侧边栏
    },
]
