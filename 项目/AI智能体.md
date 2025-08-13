## 项目地址

编程导航：https://www.codefather.cn/course/1915010091721236482

## 项目总览

- 项目介绍

  AI恋爱大师+自主规划能力的智能体

- 项目优势

  - 主流 AI 应用平台的使用
  - AI 大模型的 4 种接入方式
  - AI 开发框架（Spring AI + LangChain4j）
  - AI 大模型本地部署
  - Prompt 工程和优化技巧
  - Spring AI 核心特性：如自定义 Advisor、对话记忆、结构化输出
  - RAG 知识库实战、原理和调优技巧
  - PgVector 向量数据库 + 云数据库服务
  - Tool Calling 工具调用实战及原理
  - MCP 模型上下文协议和服务开发
  - AI 智能体 Manus 原理和自主开发
  - AI 服务化和 Serverless 部署上线
  - 各种新概念：如多模态、智能体工作流、A2A 协议、大模型评估等

- 项目功能梳理

  - AI 恋爱大师应用：用户在恋爱过程中难免遇到各种难题，让 AI 为用户提供贴心情感指导。支持多轮对话、对话记忆持久化、RAG 知识库检索、工具调用、MCP 服务调用。
  - AI 超级智能体：可以根据用户的需求，自主推理和行动，直到完成目标。
  - 提供给 AI 的工具：包括联网搜索、文件操作、网页抓取、资源下载、终端操作、PDF 生成。
  - AI MCP 服务：可以从特定网站搜索图片。

- 技术选型

  - Java 21 + Spring Boot 3 框架
  - ⭐️ Spring AI + LangChain4j
  - ⭐️ RAG 知识库
  - ⭐️ PGvector 向量数据库
  - ⭐ Tool Calling 工具调用
  - ⭐️ MCP 模型上下文协议
  - ⭐️ ReAct Agent 智能体构建
  - ⭐️ Serverless 计算服务
  - ⭐️ AI 大模型开发平台百炼
  - ⭐️ Cursor AI 代码生成
  - ⭐️ SSE 异步推送
  - 第三方接口：如 SearchAPI / Pexels API
  - Ollama 大模型部署
  - 工具库如：Kryo 高性能序列化 + Jsoup 网页抓取 + iText PDF 生成 + Knife4j 接口文档

- 架构设计

  ![image-20250808222359833](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20250808222359833.png)

## AI 大模型接入

### AI 大模型概念

### 接入 AI 大模型（3 种方式）

### 后端项目初始化

### 程序调用 AI 大模型（4 种方式）

- SDK
- HTTP
- Spring Ai
- LangChain4j

### 本地部署 AI 大模型

[Ollama](https://ollama.com/)

### Spring AI 调用本地大模型

[Ollama-阿里云Spring AI Alibaba官网官网](https://java2ai.com/docs/1.0.0-M6.1/models/ollama/)

## AI 应用开发

### Prompt 工程概念

提示词工程

Token：单词或标点符号

#### 提示词计算工具

[OpenAI Tokens 在线计算工具 - AIGC2D.com](https://tiktoken.aigc2d.com/)

[Attention Required! | Cloudflare](https://platform.openai.com/tokenizer)

![image-20250813223613711](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20250813223613711.png)

### 成本优化

1. 精简提示词
2. 定期清理对话历史
3. 使用向量检索代替直接输入
4. 结构化替代自然语言

### Prompt 优化技巧



#### **prompt学习**

[提示工程指南 | Prompt Engineering Guide](https://www.promptingguide.ai/zh)

[Attention Required! | Cloudflare](https://platform.openai.com/docs/guides/prompt-engineering)

[Prompts :: Spring AI Reference](https://docs.spring.io/spring-ai/reference/api/prompt.html#_prompt_engineering)

[提示工程概述 - Anthropic](https://docs.anthropic.com/zh-CN/docs/build-with-claude/prompt-engineering/overview)

[GitHub - anthropics/prompt-eng-interactive-tutorial: Anthropic's Interactive Prompt Engineering Tutorial](https://github.com/anthropics/prompt-eng-interactive-tutorial)

[智谱AI开放平台](https://open.bigmodel.cn/dev/guidelines/LanguageModels)

#### **prompt提升词库**

[Home - Anthropic](https://docs.anthropic.com/en/home)

[Prompt Library - Free Midjourney Prompts - ChatGPT, Gemini, Dall-e Image Prompts](https://promptlibrary.org/)





### AI 恋爱大师应用需求分析

### AI 恋爱大师应用方案设计

#### 系统提示词设计

```
扮演深耕恋爱心理领域的专家。开场向用户表明身份，告知用户可倾诉恋爱难题。围绕单身、恋爱、已婚三种状态提问：单身状态询问社交圈拓展及追求心仪对象的困扰；恋爱状态询问沟通、习惯差异引发的矛盾；已婚状态询问家庭责任与亲属关系处理的问题。引导用户详述事情经过、对方反应及自身想法，以便给出专属解决方案。
```

#### 多轮对话实现

[Chat Client API :: Spring AI Reference](https://docs.spring.io/spring-ai/reference/api/chatclient.html)

### Spring AI ChatClient / Advisor / ChatMemory 特性

#### ChatClient

#### Advisor

增强，相当于拦截器

#### Chat Memory Advisor

MessageChatMemoryAdvisor：从记忆中检索历史对话，将其作为消息集合添加到提示词；保留原始信息

PromptChatMemoryAdvisor：从记忆中检索历史对话，将其加入提示词的系统文本；可能丢失边界

VectorStoreChatMemoryAdvisor：用向量数据库来存储检索历史对话



#### Chat Memory

可将对话保存到不同的数据源

![image-20250813230745381](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20250813230745381.png)



### 多轮对话 AI 应用开发



### Spring AI 自定义 Advisor



### Spring AI 结构化输出 - 恋爱报告功能



### Spring AI 对话记忆持久化



### Spring AI Prompt 模板特性



### 多模态概念和开发



## RAG 知识库基础

### AI 恋爱知识问答需求分析

### RAG 概念（重点理解核心步骤）

### RAG 实战：Spring AI + 本地知识库

### RAG 实战：Spring AI + 云知识库服务

## RAG 知识库进阶

### RAG 核心特性

#### 文档收集和切割（ETL）

#### 向量转换和存储（向量数据库）

#### 文档过滤和检索（文档检索器）

#### 查询增强和关联（上下文查询增强器）

### RAG 最佳实践和调优

### 检索策略

### 大模型幻觉

## 工具调用

### 工具概念

#### Spring AI 工具开发

#### 主流工具开发

##### 文件操作

##### 联网搜索

##### 网页抓取

##### 终端操作

##### 资源下载

##### PDF 生成

#### 工具进阶知识（原理和高级特性）

## MCP

### MCP 概念

### 使用 MCP（3 种方式）

### Spring AI MCP 开发模式

### Spring AI MCP 开发实战 - 图片搜索 MCP

### MCP 开发最佳实践

### 部署 MCP

### MCP 安全问题

## AI 智能体构建

### AI 智能体概念

### 智能体实现关键

### 使用 AI 智能体（2 种方式）

### 自主规划智能体介绍

### OpenManus 实现原理

### 自主实现 Manus 智能体

### 智能体工作流

## AI 服务化

### AI 应用接口开发（SSE）

### AI 智能体接口开发

### AI 生成前端代码

### AI 服务 Serverless 部