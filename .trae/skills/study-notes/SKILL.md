---
name: "study-notes"
description: "A VuePress 2 + vuepress-theme-plume personal knowledge base for computer science study notes. Invoke when working with this project's documentation, adding/editing Markdown notes, configuring VuePress, building/deploying the site, or managing study content in the notes directory."
---

# 计算机知识杂货铺 (study-notes)

基于 VuePress 2 + vuepress-theme-plume 构建的个人计算机知识学习笔记站点，部署于 [xiaofei.site](http://xiaofei.site)。

## 项目概览

| 项目 | 说明 |
|------|------|
| **名称** | 计算机知识杂货铺 |
| **作者** | tuaofei (小飞) |
| **仓库** | https://github.com/731016/study-notes |
| **部署域名** | http://xiaofei.site |
| **技术栈** | Node.js 18+ / VuePress 2 / Vue 3 / TypeScript / Vite |
| **主题** | vuepress-theme-plume v1.0.0-rc.193 |
| **包管理** | npm |

## 目录结构

```
study-notes/
├── docs/
│   ├── .vuepress/           # VuePress 配置目录
│   │   ├── config.ts         # 站点主配置
│   │   ├── plume.config.ts   # 主题配置（导航栏、页脚、社交链接等）
│   │   ├── navbar.ts         # 导航栏定义
│   │   ├── notes.ts          # 内容集合定义（博客 + 文档）
│   │   ├── client.ts         # 客户端增强配置
│   │   ├── public/           # 静态资源 (favicon, SVG等)
│   │   └── theme/            # 自定义主题组件和样式
│   ├── notes/                # 所有学习笔记文档（核心内容）
│   │   ├── JavaSE/           # Java 基础
│   │   ├── SSM框架/          # Spring / SpringMVC / SpringBoot / SpringCloud
│   │   ├── MySQL/            # MySQL 数据库
│   │   ├── Redis/            # Redis
│   │   ├── 消息队列/          # RocketMQ / Kafka / RabbitMQ
│   │   ├── 前端/             # HTML / CSS / JavaScript / Vue
│   │   ├── linux/            # Linux 运维
│   │   ├── 设计模式/          # 设计模式
│   │   ├── 计算机网络/        # 计算机网络
│   │   ├── 面试/             # 面试资料、八股文、真实面经
│   │   ├── 项目/             # 项目实践（RPC框架、API开放平台等）
│   │   ├── 开发环境/          # IDEA / Maven / Tomcat / VSCode 配置
│   │   ├── 生产环境/          # OOM排查 / CPU占用 / 慢SQL优化
│   │   ├── 版本控制/          # Git / SVN
│   │   ├── 知识库/            # 工具类、算法、业务解决方案
│   │   ├── 高等数学/          # 高等数学笔记
│   │   ├── 软件设计师/        # 软考中级
│   │   ├── 劳动合同法/        # 劳动合同法笔记
│   │   ├── 资源导航/          # 外部资源链接
│   │   └── README.md         # 笔记首页
│   └── README.md
├── package.json
├── LICENSE
└── README.md
```

## 常用命令

| 命令 | 说明 |
|------|------|
| `npm install` | 安装依赖 |
| `npm run docs:dev` | 启动开发服务器（端口 10082） |
| `npm run docs:dev-clean` | 清除缓存后启动开发服务器 |
| `npm run docs:build` | 构建生产包 |
| `npm run docs:preview` | 本地预览生产构建 |
| `npm run vp-update` | 更新 VuePress 和主题 |

## 如何添加新的学习笔记

1. 在 `docs/notes/` 下对应的分类目录中创建 `.md` 文件
2. 笔记使用标准 Markdown 格式，支持 VuePress 扩展语法（代码块、提示容器、Mermaid 图表等）
3. 侧边栏由主题自动生成（`notes.ts` 中配置 `sidebar: 'auto'`）
4. 如需新分类，在 `docs/notes/` 下新建目录并放入 Markdown 文件即可

## 配置要点

### 核心配置文件

| 文件 | 作用 |
|------|------|
| [config.ts](file:///d:/projects/开源项目源码/study-notes/docs/.vuepress/config.ts) | 站点标题、描述、SEO、主题初始化 |
| [plume.config.ts](file:///d:/projects/开源项目源码/study-notes/docs/.vuepress/plume.config.ts) | 主题配置：Logo、深色模式、社交链接、页脚、版权 |
| [navbar.ts](file:///d:/projects/开源项目源码/study-notes/docs/.vuepress/navbar.ts) | 顶部导航栏，包含首页、博客、刷题网站、运维助手等 |
| [notes.ts](file:///d:/projects/开源项目源码/study-notes/docs/.vuepress/notes.ts) | 内容集合：博客文章和文档目录配置 |
| [client.ts](file:///d:/projects/开源项目源码/study-notes/docs/.vuepress/client.ts) | 客户端增强，可注册自定义组件 |

### 站点信息

- **Base URL**: `/`
- **语言**: zh-CN
- **深色模式**: 支持（`appearance: true`）
- **页内大纲**: 显示 h2 ~ h6 标题
- **上一页/下一页**: 启用
- **创建时间**: 显示
- **编辑链接**: 指向 GitHub 仓库
- **备案号**: 鄂ICP备2024071306号

## 内容主题覆盖

1. **Java 全栈**: JavaSE → SSM 框架 (Spring/SpringMVC/SpringBoot/SpringCloud) → MyBatis
2. **数据库**: MySQL 基础与设计、SQLServer、JDBC
3. **中间件**: Redis、RocketMQ、Kafka、RabbitMQ
4. **前端**: HTML、CSS、JavaScript、Vue2/Vue3、jQuery、Ajax
5. **运维与工具**: Linux、Git/SVN、Maven、Tomcat、IDEA、VSCode
6. **面试**: 八股文（Java基础/并发/JVM/集合/MySQL/Redis/Spring/设计模式）、真实面经（20+ 公司）
7. **项目实践**: 用户中心、伙伴匹配、API开放平台、RPC框架、聚合搜索、AI智能体等
8. **其他**: 高等数学、软件设计师（软考）、劳动合同法

## Markdown 扩展能力

该站点通过 vuepress-theme-plume 支持以下 Markdown 扩展：

- **Mermaid 图表** (依赖 `mermaid`)
- **ECharts 图表** (依赖 `echarts`)
- **Chart.js 图表** (依赖 `chart.js`)
- **流程图** (依赖 `flowchart.ts`)
- **代码块**: 语法高亮（通过 Prism.js）
- **提示容器**: info / tip / warning / danger / details
- **数学公式**: LaTeX 支持
- **任务列表**: GFM 风格

## 注意事项

1. 笔记文件默认使用 `.md` 扩展名，部分历史文件使用 `.md.bak` 作为备份
2. 开发服务器绑定 `0.0.0.0:10082`，生产构建输出到 `docs/.vuepress/dist/`
3. 站点已配置 Vite 的 `allowedHosts` 允许 `xiaofei.site`
4. 不要删除 `docs/notes/js/` 和 `docs/notes/css/` 下的静态资源文件，它们是历史 Docsify 迁移遗留的前端资源
5. 修改导航栏需编辑 `docs/.vuepress/navbar.ts`，修改侧边栏配置需编辑 `docs/.vuepress/notes.ts`
