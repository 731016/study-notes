---
title: 博客
createTime: 2024/04/18 19:22:07
permalink: /blog/博客/
readingTime: false
prev: false
next: false
article: false
externalLinkIcon: false
contributors: false
changelog: false
search: false
docs:
  -
    name: VuePress Plume
    desc: 一个简约的，功能丰富的 vuepress 文档&博客 主题。
    logo: /plume.png
    url: https://theme-plume.vuejs.press
    repo: https://github.com/pengzhanbo/vuepress-theme-plume
    preview: /images/demos/plume.webp
---

:::important
你可以随时通过 ==PR== 添加你的 文档 或 博客 到这个页面。

站点预览图片请放到 `docs/.vuepress/public/images` 目录下。推荐使用远程链接，以便可以随时更新它。

图片请尽量使用 `.jpg` 格式，体积较大的请使用 [tinypng](https://tinypng.com/) 进行压缩。
:::

[前往 **Github Pull Request** 提交站点](https://github.com/731016/study-notes/edit/master/docs/blog/post.md){.read-more}

## 文档

<Demos :list="$frontmatter.docs" />

## 博客

<Demos :list="$frontmatter.blog" />

::: details 案例每半年检查一次，以下情况的站点将会被移除

- 站点链接无法访问
- 已不再使用 vuepress-theme-plume 主题
:::

<script setup>
import Demos from '~/components/Demos.vue'
</script>