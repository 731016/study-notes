## 项目地址

编程导航：https://www.codefather.cn/course/1915010091721236482

## 项目总览

- 项目介绍

  AI Java后端开发大师+自主规划能力的智能体

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

  - AI Java后端开发大师应用：用户在开发过程中难免遇到各种难题，让 AI 为用户提供贴心指导。支持多轮对话、对话记忆持久化、RAG 知识库检索、工具调用、MCP 服务调用。
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





### Java后端开发大师应用需求分析

### Java后端开发大师应用方案设计

#### 系统提示词设计

```
扮演深耕Java后端开发领域的专家。开场向用户表明身份，告知用户遇到的难题或不明白的关键词；
围绕编程学习记录，包括Java，Spring，SpringMVC，SpringBoot，SpringCloud，设计模式，JavaScript，Linux，Sql，数据库，Redis，消息队列，前端，Git，SVN，C语言，Python，计算机网络，开发环境配置，生产环境问题排查，面试资料；包括软考中级软件设计师，高等数学，劳动合同法，
这些知识点提问：询问遇到的具体不明白的地方或者遇到bug出现的报错信息；
引导用户详述不清楚的地方、bug、报错信息，以便给出对应的答案。
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



```java
@Component
@Slf4j
public class LoveApp {

    private final ChatClient chatClient;

    private static final String SYSTEM_PROMPT = "扮演深耕Java后端开发领域的专家。开场向用户表明身份，告知用户遇到的难题或不明白的关键词。" +
            "围绕编程学习记录，包括Java，Spring，SpringMVC，SpringBoot，SpringCloud，设计模式，JavaScript，Linux，Sql，数据库，Redis，消息队列，前端，Git，SVN，C语言，Python，计算机网络，开发环境配置，生产环境问题排查，面试资料；包括软考中级软件设计师，高等数学，劳动合同法" +
            "这些知识点提问：询问遇到的具体不明白的地方或者遇到bug出现的报错信息；" +
            "引导用户详述不清楚的地方、bug、报错信息，以便给出对应的答案。";

     /**
     * 初始化 ChatClient
     *
     * @param dashscopeChatModel
     */
    public LoveApp(ChatModel dashscopeChatModel) {
//        // 初始化基于文件的对话记忆
//        String fileDir = System.getProperty("user.dir") + "/tmp/chat-memory";
//        ChatMemory chatMemory = new FileBasedChatMemory(fileDir);
        // 初始化基于内存的对话记忆
        MessageWindowChatMemory chatMemory = MessageWindowChatMemory.builder()
                .chatMemoryRepository(new InMemoryChatMemoryRepository())
                .maxMessages(20)
                .build();
        chatClient = ChatClient.builder(dashscopeChatModel)
                .defaultSystem(SYSTEM_PROMPT)
                .defaultAdvisors(
                        MessageChatMemoryAdvisor.builder(chatMemory).build(),
                        // 自定义日志 Advisor，可按需开启
                        new MyLoggerAdvisor()
//                        // 自定义推理增强 Advisor，可按需开启
                       ,new ReReadingAdvisor()
                )
                .build();
    }
    
    
    public String doChat(String message, String chatId) {
    ChatResponse response = chatClient
            .prompt()
            .user(message)
            .advisors(spec -> spec.param(CHAT_MEMORY_CONVERSATION_ID_KEY, chatId)
                    .param(CHAT_MEMORY_RETRIEVE_SIZE_KEY, 10))
            .call()
            .chatResponse();
    String content = response.getResult().getOutput().getText();
    log.info("content: {}", content);
    return content;
}

}
```



```java
@SpringBootTest
class LoveAppTest {

    @Resource
    private LoveApp loveApp;

    @Test
    void testChat() {
        String chatId = UUID.randomUUID().toString();
        // 第一轮
        String message = "你好，我是折腾的小飞";
        String answer = loveApp.doChat(message, chatId);
        // 第二轮
        message = "我想知道java的三大特性";
        answer = loveApp.doChat(message, chatId);
        Assertions.assertNotNull(answer);
        // 第三轮
        message = "我叫什么来着？刚跟你说过，帮我回忆一下";
        answer = loveApp.doChat(message, chatId);
        Assertions.assertNotNull(answer);
    }
}
```

调整初始化ChatClient的对话记忆大小为1

```java
// 初始化基于内存的对话记忆
        MessageWindowChatMemory chatMemory = MessageWindowChatMemory.builder()
                .chatMemoryRepository(new InMemoryChatMemoryRepository())
                .maxMessages(1)
                .build();
```

直接断片了

![image-20250820225725921](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20250820225725921.png)



### Spring AI 自定义 Advisor

（1）实现接口

CallAroundAdvisor：处理同步请求和响应
StreamAroundAdvisor： 处理流式请求和响应

```java
public class MyCustomAdvisor implements CallAroundAdvisor, StreamAroundAdvisor {
    // 实现方法...
}
```

（2）实现核心方法

CallAroundAdvisor的aroundCall

```java
@Override
public AdvisedResponse aroundCall(AdvisedRequest advisedRequest, CallAroundAdvisorChain chain) {
    // 1. 处理请求（前置处理）
    AdvisedRequest modifiedRequest = processRequest(advisedRequest);
    
    // 2. 调用链中的下一个Advisor
    AdvisedResponse response = chain.nextAroundCall(modifiedRequest);
    
    // 3. 处理响应（后置处理）
    return processResponse(response);
}
```



流式处理StreamAroundAdvisor的aroundStream

```java
@Override
public Flux<AdvisedResponse> aroundStream(AdvisedRequest advisedRequest, StreamAroundAdvisorChain chain) {
    // 1. 处理请求
    AdvisedRequest modifiedRequest = processRequest(advisedRequest);
    
    // 2. 调用链中的下一个Advisor并处理流式响应
    return chain.nextAroundStream(modifiedRequest)
               .map(response -> processResponse(response));
}
```

（3）执行顺序

```java
@Override
public int getOrder() {
    // 值越小优先级越高，越先执行
    return 100; 
}
```

（4）唯一名称

```java
@Override
public String getName() {
    return "自定义的 Advisor";
}
```



spring ai的内置simpleloggeradvisor日志拦截器默认打印debug级别日志，springboot默认日志级别为info

```yaml
logging:
  level:
    org.springframework.ai.chat.client.advisor.SimpleLoggerAdvisor: debug
```

#### 自定义日志 advisor

不想修改日志级别，自定义一个

```java
/**
 * 自定义日志 Advisor
 * 打印 info 级别日志、只输出单次用户提示词和 AI 回复的文本
 */
@Slf4j
public class MyLoggerAdvisor implements CallAroundAdvisor, StreamAroundAdvisor {

    @Override
    public String getName() {
        return this.getClass().getSimpleName();
    }

    @Override
    public int getOrder() {
        return 0;
    }

    private AdvisedRequest before(AdvisedRequest request) {
        log.info("AI Request: {}", request.userText());
        return request;
    }

    private void observeAfter(AdvisedResponse advisedResponse) {
        log.info("AI Response: {}", advisedResponse.response().getResult().getOutput().getText());
    }

    public AdvisedResponse aroundCall(AdvisedRequest advisedRequest, CallAroundAdvisorChain chain) {
        advisedRequest = this.before(advisedRequest);
        AdvisedResponse advisedResponse = chain.nextAroundCall(advisedRequest);
        this.observeAfter(advisedResponse);
        return advisedResponse;
    }

    public Flux<AdvisedResponse> aroundStream(AdvisedRequest advisedRequest, StreamAroundAdvisorChain chain) {
        advisedRequest = this.before(advisedRequest);
        Flux<AdvisedResponse> advisedResponses = chain.nextAroundStream(advisedRequest);
        return (new MessageAggregator()).aggregateAdvisedResponse(advisedResponses, this::observeAfter);
    }
}

```



#### 自定义Re-Reading advisor

[Advisors API :: Spring AI Reference](https://docs.spring.io/spring-ai/reference/api/advisors.html#_re_reading_re2_advisor)

该技术通过让模型重新阅读问题来提高推理能力，有 [文献](https://arxiv.org/pdf/2309.06275) 来印证它的效果。

> 💡 注意‍，虽然该技术可提高大﻿语言模型的推理能力，不过成本会加倍！所以如果 AI 应用要面⁡向 C 端开放，不建议使用。

Re2 的‍实现原理很简单，改﻿写用户 Prompt 为下列格式，也就是让 AI 重复⁡阅读用户的输入：

```markdown
{Input_Query}
Read the question again: {Input_Query}
```

需要对请求进‍行拦截并改写 user﻿Text，对应的实现代码如下：

```java
/**
 * 自定义 Re2 Advisor
 * 可提高大型语言模型的推理能力
 */
public class ReReadingAdvisor implements CallAdvisor, StreamAdvisor {

    /**
     * 执行请求前，改写 Prompt
     *
     * @param chatClientRequest
     * @return
     */
    private ChatClientRequest before(ChatClientRequest chatClientRequest) {
        String userText = chatClientRequest.prompt().getUserMessage().getText();
        // 添加上下文参数
        chatClientRequest.context().put("re2_input_query", userText);
        // 修改用户提示词
        String newUserText = """
                %s
                Read the question again: %s
                """.formatted(userText, userText);
        Prompt newPrompt = chatClientRequest.prompt().augmentUserMessage(newUserText);
        return new ChatClientRequest(newPrompt, chatClientRequest.context());
    }

    @Override
    public ChatClientResponse adviseCall(ChatClientRequest chatClientRequest, CallAdvisorChain chain) {
        return chain.nextCall(this.before(chatClientRequest));
    }

    @Override
    public Flux<ChatClientResponse> adviseStream(ChatClientRequest chatClientRequest, StreamAdvisorChain chain) {
        return chain.nextStream(this.before(chatClientRequest));
    }

    @Override
    public int getOrder() {
        return 0;
    }

    @Override
    public String getName() {
        return this.getClass().getSimpleName();
    }
}
```



修改后可测试使﻿用 Advisor，并进行测试，查看请求是否被改写。

```java
/**
     * 初始化 ChatClient
     *
     * @param dashscopeChatModel
     */
    public LoveApp(ChatModel dashscopeChatModel) {
//        // 初始化基于文件的对话记忆
//        String fileDir = System.getProperty("user.dir") + "/tmp/chat-memory";
//        ChatMemory chatMemory = new FileBasedChatMemory(fileDir);
        // 初始化基于内存的对话记忆
        MessageWindowChatMemory chatMemory = MessageWindowChatMemory.builder()
                .chatMemoryRepository(new InMemoryChatMemoryRepository())
                .maxMessages(20)
                .build();
        chatClient = ChatClient.builder(dashscopeChatModel)
                .defaultSystem(SYSTEM_PROMPT)
                .defaultAdvisors(
                        MessageChatMemoryAdvisor.builder(chatMemory).build(),
                        // 自定义日志 Advisor，可按需开启
                        new MyLoggerAdvisor()
//                        // 自定义推理增强 Advisor，可按需开启
                       ,new ReReadingAdvisor()
                )
                .build();
    }
```

![image-20250820231552937](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20250820231552937.png)

#### 最佳实践

1）保持单‍一职责：每个 Ad﻿visor 应专注于一项特定任务

2）注意执行顺序：合理设置`getOrder()`值确保 Advisor 按正确顺序执行

3）同时支‍持流式和非流式：尽﻿可能同时实现两种接口以提高灵活性

4）高效处理请求：避免在 Advisor 中执行耗时操作

5）测试边‍界情况：确保 Ad﻿visor 能够优雅处理异常和边界情况

6）对于需‍要更复杂处理的流式﻿场景，可以使用 Reactor 的操作符：

```java
@Override
public Flux<AdvisedResponse> aroundStream(AdvisedRequest advisedRequest, StreamAroundAdvisorChain chain) {
    return Mono.just(advisedRequest)
           .publishOn(Schedulers.boundedElastic())
           .map(request -> {
               // 请求前处理逻辑
               return modifyRequest(request);
           })
           .flatMapMany(request -> chain.nextAroundStream(request))
           .map(response -> {
               // 响应处理逻辑
               return modifyResponse(response);
           });
}
```

7）可以使用 `adviseContext` 在 Advisor 链中共享状态：

```java
// 更新上下文
advisedRequest = advisedRequest.updateContext(context -> {
    context.put("key", "value");
    return context;
});

// 读取上下文
Object value = advisedResponse.adviseContext().get("key");
```



### Spring AI 结构化输出 - 知识报告功能

[Structured Output Converter :: Spring AI Reference](https://docs.spring.io/spring-ai/reference/api/structured-output-converter.html)

结构化输出转换器，将大语言模型返回的文本输出转换为结构化数据格式，如Json，xml或Java类。



#### 基本原理-工作流程

![image-20250904204940248](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20250904204940248.png)

无法保证真正准确



#### 进阶原理-API设计

```java
public interface StructuredOutputConverter<T> extends Converter<String, T>, FormatProvider {

}
```

集成2个关键接口：

`FormatProvider`接口：提供特定的格式指令给AI模型

Spring 的`Converter<String, T>`接口：负责将模型的文本输出转换为指定的目标类型T

```java
public interface FormatProvider {
    String getFormat();
}
```

提供多种转换器

- `AbstractConversionServiceOutputConverter<T>` - 提供预配置的 [GenericConversionService](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/core/convert/support/GenericConversionService.html) 用于将LLM输出转换为所需格式. No default `FormatProvider` implementation is provided.

- `AbstractMessageOutputConverter<T>` - Supplies a pre-configured [MessageConverter](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/jms/support/converter/MessageConverter.html) for converting LLM output into the desired format. No default `FormatProvider` implementation is provided.

  支持Spring AI Message对象的转换

- `BeanOutputConverter<T>` - Configured with a designated Java class (e.g., Bean) or a [ParameterizedTypeReference](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/core/ParameterizedTypeReference.html), this converter employs a `FormatProvider` implementation that directs the AI Model to produce a JSON response compliant with a `DRAFT_2020_12`, `JSON Schema` derived from the specified Java class. Subsequently, it utilizes an `ObjectMapper` to deserialize the JSON output into a Java object instance of the target class.

  输出转换为JavaBean对象（基于ObjectMapper实现）

- `MapOutputConverter` - Extends the functionality of `AbstractMessageOutputConverter` with a `FormatProvider` implementation that guides the AI Model to generate an RFC8259 compliant JSON response. Additionally, it incorporates a converter implementation that utilizes the provided `MessageConverter` to translate the JSON payload into a `java.util.Map<String, Object>` instance

  输出转换为Map结构

- `ListOutputConverter` - Extends the `AbstractConversionServiceOutputConverter` and includes a `FormatProvider` implementation tailored for comma-delimited list output. The converter implementation employs the provided `ConversionService` to transform the model text output into a `java.util.List`.

输出转换为List结构



![image-20250904210100886](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20250904210100886.png)



#### 工作流程

（1）调用模型之前，FormatProvider为AI模型提供特定的格式指令，使其能够生成可以通过Converter转换为指定目标类型的文本输出。

通常使用PromptTemplate将格式指令附加到用户输入的末尾

```java
StructuredOutputConverter outputConverter = ...
String userInputTemplate = """
        ... 用户文本输入 ....
        {format}
        """; // 用户输入，包含一个“format”占位符。
Prompt prompt = new Prompt(
        new PromptTemplate(
                this.userInputTemplate,
                Map.of(..., "format", outputConverter.getFormat()) // 用转换器的格式替换“format”占位符
        ).createMessage());
```

（2）Converter负责将模型的输出文本转换为指定类型的实例

![image-20250904210633207](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20250904210633207.png)

#### 知识报告功能开发

为用户生成知识报告，并转换为知识报告对象，包含标题和学习建议列表字段。

（1）引入JSON Schema依赖

```xml
<!-- 支持结构化输出 -->
        <dependency>
            <groupId>com.github.victools</groupId>
            <artifactId>jsonschema-generator</artifactId>
            <version>4.38.0</version>
        </dependency>
```

(2)定义知识报告类，使用java14引入的record特性快速定义

```java
record KnowLedgeReport(String title,List<String> suggestions){

}
```

（3）复用之前的chatClient对象，补充原有的系统提示词，添加结构化的输出代码

```java
/**
     * AI 知识报告功能（实战结构化输出）
     * @param message
     * @param chatId
     * @return
     */
    public KnowLedgeReport doChatWithKnowLedgeReport(String message, String chatId) {
        KnowLedgeReport knowLedgeReport = chatClient
                .prompt()
                .system(SYSTEM_PROMPT + "每次对话后都要生成问答结果，标题为{用户名}的知识报告，内容为建议列表")
                .user(message)
                .advisors(spec -> spec.param(ChatMemory.CONVERSATION_ID, chatId))
                .call()
                .entity(KnowLedgeReport.class);
        log.info("KnowLedgeReport: {}", knowLedgeReport);
        return knowLedgeReport;
    }
```

（4）单元测试

```java
@Test
    void doChatWithKnowLedgeReport() {
        String chatId = UUID.randomUUID().toString();
        String message = "你好，我是折腾的小飞，我想了解一下数据湖，但我不知道该怎么做";
        LoveApp.KnowLedgeReport knowLedgeReport = loveApp.doChatWithKnowLedgeReport(message, chatId);
        Assertions.assertNotNull(knowLedgeReport);
    }
```

可以发现Advisor上下文包含格式指令

![image-20250904213203549](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20250904213203549.png)

```
formatParam -> Your response should be in JSON format.
Do not include any explanations, only provide a RFC8259 compliant JSON response following this format without deviation.
Do not include markdown code blocks in your response.
Remove the ```json markdown from the output.
Here is the JSON Schema instance your output must adhere to:
```{
  "$schema" : "https://json-schema.org/draft/2020-12/schema",
  "type" : "‍object",
  "properties" ﻿: {
    "suggestions" : ​{
      "type" : "array"​,
      "items" : {
    ⁡    "type" : "string"
      }
    },
    "‍title" : ﻿{
      "​type" : "​string"
    }
  },
  "add‍itionalProp﻿erties" : f​alse       ​           ⁡              
}
```

Ai生成的内容

![image-20250904213435082](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20250904213435082.png)

转换器成功将json文本转换为对象

![image-20250904213252498](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20250904213252498.png)

#### 最佳实践

1.尽量为模型提供清晰的格式指导

2.实现输出验证机制和异常处理逻辑，确保结构化数据符合预期

3.选择支持结构化输出的合适模型

4.对于复杂结构，考虑使用`ParameterizedTypeReference`



### Spring AI 对话记忆持久化

之前使用基于内存的对话记忆，一旦服务器重启，就会丢失。

#### 利用现有依赖实现

[Chat Client API :: Spring AI Reference](https://docs.spring.io/spring-ai/reference/api/chatclient.html#_chat_memory)

提供第三方数据库的整合支持，可将对话保存到不同的数据源

InMemoryChatMemory：内存存储

CassandraChatMemory：在Cassandra中带有过期时间的持久化存储

Neo4jChatMemory：在Neo4j中没有过期时间限制的持久化存储

JdbcChatMemory：在JDBC中没有过期时间限制的持久化存储



spring-ai-starter-model-chat-memory-jdbc目前依赖很少，不推荐

[Spring仓库](https://repo.spring.io/ui/packages/gav:%2F%2Forg.springframework.ai:spring-ai-starter-model-chat-memory-jdbc?name=spring-ai-starter-model-chat-memory-jdbc&type=packages)，用的人不多

建议自定义



#### 自定义实现

只需要修改ChatMemory存储来改变对话记忆的保存位置即可

![image-20250904214826873](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20250904214826873.png)

参考InMemoryChatMemoryRepository，就是存储在ConcurrentHashMap

![image-20250904215224406](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20250904215224406.png)

#### 自定义文件持久化ChatMemory

主要是消息和文本的转换

保存消息时，要将消息从Message对象转为文件内的文本；

读取消息时，要将文件内的文本转换为Message对象，即对象的序列化和反序列化



如果使用JSON

1. 要持久化的Message是接口，有很多不同的子类实现（UserMessage，SystemMessage）
2. 每种子类的字段都不同
3. 子类没有无参构造函数，没有Serializable序列化接口

![image-20250904215817845](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20250904215817845.png)



为了避免不必要的报错，使用高性能的[kryo序列化库](https://github.com/EsotericSoftware/kryo)

(1)引入依赖

```xml
<dependency>
    <groupId>com.esotericsoftware</groupId>
    <artifactId>kryo</artifactId>
    <version>5.6.2</version>
</dependency>
```

（2）在根包下新增chatmemory包，编写FileBasedChatMemory

```java
package com.yupi.yuaiagent.chatmemory;

import com.esotericsoftware.kryo.Kryo;
import com.esotericsoftware.kryo.io.Input;
import com.esotericsoftware.kryo.io.Output;
import org.objenesis.strategy.StdInstantiatorStrategy;
import org.springframework.ai.chat.memory.ChatMemory;
import org.springframework.ai.chat.messages.Message;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * 基于文件持久化的对话记忆
 */
public class FileBasedChatMemory implements ChatMemory {

    private final String BASE_DIR;
    private static final Kryo kryo = new Kryo();

    static {
        kryo.setRegistrationRequired(false);
        // 设置实例化策略
        kryo.setInstantiatorStrategy(new StdInstantiatorStrategy());
    }

    // 构造对象时，指定文件保存目录
    public FileBasedChatMemory(String dir) {
        this.BASE_DIR = dir;
        File baseDir = new File(dir);
        if (!baseDir.exists()) {
            baseDir.mkdirs();
        }
    }

    @Override
    public void add(String conversationId, List<Message> messages) {
        List<Message> conversationMessages = getOrCreateConversation(conversationId);
        conversationMessages.addAll(messages);
        saveConversation(conversationId, conversationMessages);
    }

    @Override
    public List<Message> get(String conversationId) {
        return getOrCreateConversation(conversationId);
    }

    @Override
    public void clear(String conversationId) {
        File file = getConversationFile(conversationId);
        if (file.exists()) {
            file.delete();
        }
    }

    private List<Message> getOrCreateConversation(String conversationId) {
        File file = getConversationFile(conversationId);
        List<Message> messages = new ArrayList<>();
        if (file.exists()) {
            try (Input input = new Input(new FileInputStream(file))) {
                messages = kryo.readObject(input, ArrayList.class);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return messages;
    }

    private void saveConversation(String conversationId, List<Message> messages) {
        File file = getConversationFile(conversationId);
        try (Output output = new Output(new FileOutputStream(file))) {
            kryo.writeObject(output, messages);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private File getConversationFile(String conversationId) {
        return new File(BASE_DIR, conversationId + ".kryo");
    }
}

```



（3）修改LoveApp的构造函数

```java
/**
     * 初始化 ChatClient
     *
     * @param dashscopeChatModel
     */
    public LoveApp(ChatModel dashscopeChatModel) {
//        // 初始化基于文件的对话记忆
        String fileDir = System.getProperty("user.dir") + "/tmp/chat-memory";
        ChatMemory chatMemory = new FileBasedChatMemory(fileDir);
        // 初始化基于内存的对话记忆
//        MessageWindowChatMemory chatMemory = MessageWindowChatMemory.builder()
//                .chatMemoryRepository(new InMemoryChatMemoryRepository())
//                .maxMessages(20)
//                .build();
        chatClient = ChatClient.builder(dashscopeChatModel)
                .defaultSystem(SYSTEM_PROMPT)
                .defaultAdvisors(
                        MessageChatMemoryAdvisor.builder(chatMemory).build(),
                        // 自定义日志 Advisor，可按需开启
                        new MyLoggerAdvisor()
//                        // 自定义推理增强 Advisor，可按需开启
                       ,new ReReadingAdvisor()
                )
                .build();
    }
```

（4）测试

![image-20250904220724029](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20250904220724029.png)



### Spring AI Prompt 模板特性

[Prompts :: Spring AI Reference](https://docs.spring.io/spring-ai/reference/api/prompt.html#_prompttemplate)

Spring AI中用于构建和管理提示词的核心组件。允许开发者创建带有占位符的文本模板，在运行时动态替换



基本功能支持变量替换

```java
// 定义带有变量的模板
String template = "你好，{name}。今天是{day}，天气{weather}。";

// 创建模板对象
PromptTemplate promptTemplate = new PromptTemplate(template);

// 准备变量映射
Map<String, Object> variables = new HashMap<>();
variables.put("name", "鱼皮");
variables.put("day", "星期一");
variables.put("weather", "晴朗");

// 生成最终提示文本
String prompt = promptTemplate.render(variables);
// 结果: "你好，鱼皮。今天是星期一，天气晴朗。"
```

#### 实现原理

使用OSS StringTemplate模板引擎

```java
public class PromptTemplate implements PromptTemplateActions, PromptTemplateMessageActions {
    // 实现细节
}
```

![image-20250904221419258](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20250904221419258.png)



#### 专用模板类

SystemPromptTemplate：系统消息，设置AI的行为和背景

AssistantPromptTemplate：助手消息，设置AI回复的结构

FunctionPromptTemplate：目前没用

![image-20250904221619756](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20250904221619756.png)

```java
String userText‍ = """
    Tell me about three﻿ famous pirates from the Golde​n Age of Piracy and why they d​id.
    Write at least a sente⁡nce for each pirate.
    """;

Message userMessage = new UserMessage(userText);

String sy‍stemText = """
  ﻿You are a helpful​ AI assistant tha​t helps people fi⁡nd information.
  Your name is {name}
  You should reply to the user's request with your name and also in the style of a {voice}.
  """;

SystemPromptTemplate systemPromptTemplate = new SystemPromptTemplate(systemText);
Message systemMessage = systemPromptTemplate.createMessage(Map.of("name", name, "voice", voice));

Prompt prompt = new Prompt(List.of(userMessage, systemMessage));

List<Generation> response = chatModel.call(prompt).getResults();
```

#### 从文件加载模板

```java
// 从类路径资源加载系统提示模板
@Value("classpath:/prompts/system-message.st")
private Resource systemResource;

// 直接使用资源创建模板
SystemPromptTemplate systemPromptTemplate = new SystemPromptTemplate(systemResource);
```



### 多模态概念和开发

[Multimodality API :: Spring AI Reference](https://docs.spring.io/spring-ai/reference/api/multimodality.html)

能够同时处理、理解和生成多种不同类型数据的能力，如文本、图像、音频、视频、PDF、结构化数据。



允许发送包含图片

```java
byte[] data = new ClassPathResource("/vertex-test.png").getContentAsByteArray();

var userMessage = new UserMessage("Explain what do you see on this picture?",
        List.of(new Media(MimeTypeUtils.IMAGE_PNG, this.data)));

ChatResponse response = chatModel.call(new Prompt(List.of(this.userMessage)));
```

ChatClient API 添加资源

```java
String response = ChatClient.create(chatModel).prompt()
		.user(u -> u.text("Explain what do you see on this picture?")
				    .media(MimeTypeUtils.IMAGE_PNG, new ClassPathResource("/multimodal.test.png")))
		.call()
		.content();
```



[通义千问API参考_大模型服务平台百炼(Model Studio)-阿里云帮助中心](https://help.aliyun.com/zh/model-studio/use-qwen-by-calling-api#d0e30636ad3s3)



## RAG 知识库基础

### AI Java开发知识问答需求分析

### RAG 概念（重点理解核心步骤）

![image-20251008210405322](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20251008210405322.png)

#### Embedding和Embedding模型

![image-20251008210627759](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20251008210627759.png)

![image-20251008210642112](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20251008210642112.png)



#### 向量数据库

![image-20251008210848185](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20251008210848185.png)

#### 召回

![image-20251008211014727](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20251008211014727.png)



#### 精排和RANK模型

![image-20251008211048393](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20251008211048393.png)

![image-20251008211100699](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20251008211100699.png)



#### 混合检索策略

![image-20251008211126768](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20251008211126768.png)





### RAG 实战：Spring AI + 本地知识库

[Retrieval Augmented Generation :: Spring AI Reference](https://docs.spring.io/spring-ai/reference/api/retrieval-augmented-generation.html)

[检索增强生成RAG（Retrieval-Augmented Generation）-阿里云Spring AI Alibaba官网官网](https://java2ai.com/docs/1.0.0-M6.1/tutorials/rag/)

#### 1.文档准备

#### 2.文档读取

准备好的知识库文档处理后保存到向量数据库，这个过程称为ETL（抽取、转换、加载）

ETL3大核心组件

+ DocumentReader：读取文档，得到文档列表
+ DocumentTransformer：转换文档，得到处理后的文档列表
+ DocumentWriter：将文档列表保存到存储中

![image-20251008211813949](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20251008211813949.png)



##### 使用MarkdownDocumentReader读取Markdown文档

(1)导入依赖

```xml
<dependency>
    <groupId>org.springframework.ai</groupId>
    <artifactId>spring-ai-markdown-document-reader</artifactId>
    <version>1.0.0-M6</version>
</dependency>
```

（2）在根目录新增rag包，新增类KnowAppLoader，负责读取所有Markdown文档并转换为Document列表

```java
@Component
@Slf4j
public class KnowAppDocumentLoader {

    private final ResourcePatternResolver resourcePatternResolver;


    public KnowAppDocumentLoader(ResourcePatternResolver resourcePatternResolver) {
        this.resourcePatternResolver = resourcePatternResolver;
    }

    public List<Document> loadMarkdowns() {
        List<Document> allDocumentList = new ArrayList<>();
        try {
            Resource[] resources = resourcePatternResolver.getResources("classpath:document/*.md");
            for (Resource resource : resources) {
                String filename = resource.getFilename();
                MarkdownDocumentReaderConfig config = MarkdownDocumentReaderConfig.builder()
                        .withHorizontalRuleCreateDocument(true)
                        .withIncludeCodeBlock(false)
                        .withIncludeBlockquote(false)
                        .withAdditionalMetadata("filename", filename)
                        .build();
                MarkdownDocumentReader reader = new MarkdownDocumentReader(resource, config);
                allDocumentList.addAll(reader.get());
            }

        } catch (IOException e) {
            log.error(" Markdown 文档加载失败", e);
        }
        return allDocumentList;
    }
}
```

通过MarkdownDocumentReaderConfig文档加载配置制定读取的细节，是否读取代码块、引用块。还指定了元信息配置，提取文档的文件名作为文档的元信息，便于精确检索。



#### 3.向量转换和存储

先使用spring ai内置的、基于内存读写的向量数据库保存文档

SimpleVectorStore实现了VectorStore接口，VectorStore接口集成了DocumentWriter

![image-20251008214642919](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20251008214642919.png)

在写入文档前，先调用Embedding模型将文本转换为向量

![image-20251008214719181](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20251008214719181.png)

在rag目录下，新增KnowAppVectorStoreConfig，实现初始化向量数据库并保存文档

```java
@Configuration
public class KnowAppVectorStoreConfig {

    @Resource
    private KnowAppDocumentLoader knowAppDocumentLoader;

    @Bean
    VectorStore knowAppVectorStore(EmbeddingModel embeddingModel){
        SimpleVectorStore simpleVectorStore = SimpleVectorStore.builder(embeddingModel).build();
        //加载文档
        List<Document> documents = knowAppDocumentLoader.loadMarkdowns();
        simpleVectorStore.add(documents);
        return simpleVectorStore;
    }
}
```



#### 4.查询增强

主要是QuestionAnswerAdvisor问答拦截器和RetrievalAugmentationAdvisor检索增强拦截器

![image-20251008215455833](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20251008215455833.png)

引入依赖

```xml
<dependency>
   <groupId>org.springframework.ai</groupId>
   <artifactId>spring-ai-advisors-vector-store</artifactId>
</dependency>
```

QuestionAnswerAdvisor问答器

```java
@Component
@Slf4j
public class KnowApp {

    private final ChatClient chatClient;

    private static final String SYSTEM_PROMPT = "扮演深耕Java后端开发领域的专家。开场向用户表明身份，告知用户遇到的难题或不明白的关键词。" +
            "围绕编程学习记录，包括Java，Spring，SpringMVC，SpringBoot，SpringCloud，设计模式，JavaScript，Linux，Sql，数据库，Redis，消息队列，前端，Git，SVN，C语言，Python，计算机网络，开发环境配置，生产环境问题排查，面试资料；包括软考中级软件设计师，高等数学，劳动合同法" +
            "这些知识点提问：询问遇到的具体不明白的地方或者遇到bug出现的报错信息；" +
            "引导用户详述不清楚的地方、bug、报错信息，以便给出对应的答案。";


    /**
     * 初始化 ChatClient
     *
     * @param dashscopeChatModel
     */
    public KnowApp(ChatModel dashscopeChatModel) {
//        // 初始化基于文件的对话记忆
        String fileDir = System.getProperty("user.dir") + "/tmp/chat-memory";
        ChatMemory chatMemory = new FileBasedChatMemory(fileDir);
        // 初始化基于内存的对话记忆
//        MessageWindowChatMemory chatMemory = MessageWindowChatMemory.builder()
//                .chatMemoryRepository(new InMemoryChatMemoryRepository())
//                .maxMessages(20)
//                .build();
        chatClient = ChatClient.builder(dashscopeChatModel)
                .defaultSystem(SYSTEM_PROMPT)
                .defaultAdvisors(
                        MessageChatMemoryAdvisor.builder(chatMemory).build(),
                        // 自定义日志 Advisor，可按需开启
                        new MyLoggerAdvisor()
//                        // 自定义推理增强 Advisor，可按需开启
                        , new ReReadingAdvisor()
                )
                .build();
    }

    @Resource
    private VectorStore knowAppVectorStore;

    public String doChatWithRag(String message, String chatId) {
        ChatResponse chatResponse = chatClient.prompt().user(message)
                // 开启日志，便于观察效果
                .advisors(new MyLoggerAdvisor())
                // 应用 RAG 知识库问答
                .advisors(new QuestionAnswerAdvisor(knowAppVectorStore))
                .call()
                .chatResponse();
        String context = chatResponse.getResult().getOutput().getText();
        log.info("context:{}", context);
        return context;
    }
}
```

#### 测试
加载文档被拆分，并添加元信息
![image-20251009212201](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/20251009212201.png)


切片信息，每个切片对应的分数和元信息
![image-20251009212202](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/20251009212202.png)

AI的回复包含知识库的内容
![image-20251009212203](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/20251009212203.png)


### RAG 实战：Spring AI + 云知识库服务

#### 1.准备云知识库
![image-20251009212548](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/QQ%E6%88%AA%E5%9B%BE20251009212548.png)
![image-20251009213325](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/QQ%E6%88%AA%E5%9B%BE20251009213325.png)
#### 2.RAG开发
文档检索器查询
```java
// 调用大模型的 API
var dashScopeApi = new DashScopeApi("DASHSCOPE_API_KEY");
// 创建文档检索器
DocumentRetriever retriever = new DashScopeDocumentRetriever(dashScopeApi,
        DashScopeDocumentRetrieverOptions.builder()
                .withIndexName("你的知识库名称")
                .build());
// 测试从云知识库中查询
List<Document> documentList = retriever.retrieve(new Query("谁是猪猪?"));
```

[检索增强顾问](https://docs.spring.io/spring-ai/reference/api/retrieval-augmented-generation.html#_retrievalaugmentationadvisor_incubating)

```java
Advisor retrievalAugmentationAdvisor = RetrievalAugmentationAdvisor.builder()
        .queryTransformers(RewriteQueryTransformer.builder()
                .chatClientBuilder(chatClientBuilder.build().mutate())
                .build())
        .documentRetriever(VectorStoreDocumentRetriever.builder()
                .similarityThreshold(0.50)
                .vectorStore(vectorStore)
                .build())
        .build();

String answer = chatClient.prompt()
        .advisors(retrievalAugmentationAdvisor)
        .user(question)
        .call()
        .content();
```

（1）配置一个云知识库的增强检索顾问Bean
```java
@Configuration
@Slf4j
public class KnowAppRagCloudAdvisorConfig {

    @Value("${spring.ai.dashscope.api-key}")
    private String dashScopeApiKey;

    @Bean
    public Advisor knowAppRagCloudAdvisor() {
        DashScopeApi dashScopeApi = new DashScopeApi.Builder().apiKey(dashScopeApiKey).build();
        final String KNOWLEDGE_INDEX = "学习笔记";
        DashScopeDocumentRetriever documentRetriever = new DashScopeDocumentRetriever(dashScopeApi,
                DashScopeDocumentRetrieverOptions.builder()
                        .withIndexName(KNOWLEDGE_INDEX)
                        .build());
        return RetrievalAugmentationAdvisor.builder().documentRetriever(documentRetriever).build();
    }
}
```

在KnowApp使用
```java
@Resource
    private Advisor knowAppRagCloudAdvisor;

    public String doChatWithRagCloud(String message, String chatId) {
        ChatResponse chatResponse = chatClient.prompt().user(message)
                .advisors(spec -> spec.param(ChatMemory.CONVERSATION_ID, chatId))
                // 开启日志，便于观察效果
                .advisors(new MyLoggerAdvisor())
                // 应用 RAG 知识库问答
                .advisors(new QuestionAnswerAdvisor(knowAppVectorStore))
                //增强检索
                .advisors(knowAppRagCloudAdvisor)
                .call()
                .chatResponse();
        String context = chatResponse.getResult().getOutput().getText();
        log.info("context:{}", context);
        return context;
    }
```
测试结果
```
Request: Prompt{messages=[SystemMessage{textContent='扮演深耕Java后端开发领域的专家。开场向用户表明身份，告知用户遇到的难题或不明白的关键词。围绕编程学习记录，包括Java，Spring，SpringMVC，SpringBoot，SpringCloud，设计模式，JavaScript，Linux，Sql，数据库，Redis，消息队列，前端，Git，SVN，C语言，Python，计算机网络，开发环境配置，生产环境问题排查，面试资料；包括软考中级软件设计师，高等数学，劳动合同法这些知识点提问：询问遇到的具体不明白的地方或者遇到bug出现的报错信息；引导用户详述不清楚的地方、bug、报错信息，以便给出对应的答案。', messageType=SYSTEM, metadata={messageType=SYSTEM}}, UserMessage{content='Context information is below.

---------------------
C文件概述c语言把文件看作是一个字符（字节）的序列，即由一个字符顺序组成根据数据组织的形式：
...
（5）复合语句。用{}把一些语句括起来，又称分程序；{t=x;x=y;y=t;}若复合语句内只有一条语句，大括号可以省略；
---------------------

Given the context information and no prior knowledge, answer the query.

Follow these rules:

1. If the answer is not in the context, just say that you don't know.
2. Avoid statements like "Based on the context..." or "The provided information...".

Query: C语言是什么？

Answer:


Context information is below, surrounded by ---------------------

---------------------
链式编程链式编程是为了节省代码量，看起来更优雅。 $(this).css('color', 'red').sibling().css('color', '');

...

---------------------

Given the context and provided history information and not prior knowledge,
reply to the user comment. If the answer is not in the context, inform
the user that you can't answer the question.
', properties={messageType=USER}, messageType=USER}], modelOptions=DashScopeChatOptions: {"model":"qwen-plus","temperature":0.8,"enable_search":false,"incremental_output":true,"enable_thinking":false,"multi_model":false}}
2025-10-09T21:49:37.968+08:00  INFO 3812 --- [yu-ai-agent] [           main] c.y.yuaiagent.advisor.MyLoggerAdvisor    : AI Request: Prompt{messages=[SystemMessage{textContent='扮演深耕Java后端开发领域的专家。开场向用户表明身份，告知用户遇到的难题或不明白的关键词。围绕编程学习记录，包括Java，Spring，SpringMVC，SpringBoot，SpringCloud，设计模式，JavaScript，Linux，Sql，数据库，Redis，消息队列，前端，Git，SVN，C语言，Python，计算机网络，开发环境配置，生产环境问题排查，面试资料；包括软考中级软件设计师，高等数学，劳动合同法这些知识点提问：询问遇到的具体不明白的地方或者遇到bug出现的报错信息；引导用户详述不清楚的地方、bug、报错信息，以便给出对应的答案。', messageType=SYSTEM, metadata={messageType=SYSTEM}}, UserMessage{content='Context information is below.

---------------------
C文件概述c语言把文件看作是一个字符（字节）的序列，即由一个字符顺序组成根据数据组织的形式：
...
---------------------

Given the context information and no prior knowledge, answer the query.

Follow these rules:

1. If the answer is not in the context, just say that you don't know.
2. Avoid statements like "Based on the context..." or "The provided information...".

Query: C语言是什么？

Answer:


Context information is below, surrounded by ---------------------

---------------------
链式编程链式编程是为了节省代码量，看起来更优雅。 $(this).css('color', 'red').sibling().css('color', '');

...

---------------------

Given the context and provided history information and not prior knowledge,
reply to the user comment. If the answer is not in the context, inform
the user that you can't answer the question.

Read the question again: Context information is below.

---------------------
C文件概述c语言把文件看作是一个字符（字节）的序列，即由一个字符顺序组成根据数据组织的形式：
...
---------------------

Given the context information and no prior knowledge, answer the query.

Follow these rules:

1. If the answer is not in the context, just say that you don't know.
2. Avoid statements like "Based on the context..." or "The provided information...".

Query: C语言是什么？

Answer:


Context information is below, surrounded by ---------------------

---------------------
链式编程链式编程是为了节省代码量，看起来更优雅。 $(this).css('color', 'red').sibling().css('color', '');

...

---------------------

Given the context and provided history information and not prior knowledge,
reply to the user comment. If the answer is not in the context, inform
the user that you can't answer the question.

', properties={messageType=USER}, messageType=USER}], modelOptions=DashScopeChatOptions: {"model":"qwen-plus","temperature":0.8,"enable_search":false,"incremental_output":true,"enable_thinking":false,"multi_model":false}}
2025-10-09T21:49:42.935+08:00  INFO 3812 --- [yu-ai-agent] [           main] c.y.yuaiagent.advisor.MyLoggerAdvisor    : AI Response: C语言是一种功能强大、灵活的结构式编程语言，起源于1972年，由BCPL和B语言演变而来。它具有丰富的运算符和数据结构，语法限制不太严格，程序设计自由度大，适用于操作系统、文字处理、图形、电子表格等各类软件开发。C语言程序由函数组成，函数是其基本单位，必须有且只有一个main函数作为程序的入口和出口。C语言支持标准库函数和用户自定义函数，允许对文件以字符或字节为单位进行流式输入输出，并采用缓冲文件系统处理文本和二进制文件。此外，C语言可直接访问物理地址，能直接操作硬件，生成的代码质量高，执行效率高，具有良好的可移植性，是主要的编程语言之一。
2025-10-09T21:49:42.935+08:00  INFO 3812 --- [yu-ai-agent] [           main] c.y.yuaiagent.advisor.MyLoggerAdvisor    : AI Response: C语言是一种功能强大、灵活的结构式编程语言，起源于1972年，由BCPL和B语言演变而来。它具有丰富的运算符和数据结构，语法限制不太严格，程序设计自由度大，适用于操作系统、文字处理、图形、电子表格等各类软件开发。C语言程序由函数组成，函数是其基本单位，必须有且只有一个main函数作为程序的入口和出口。C语言支持标准库函数和用户自定义函数，允许对文件以字符或字节为单位进行流式输入输出，并采用缓冲文件系统处理文本和二进制文件。此外，C语言可直接访问物理地址，能直接操作硬件，生成的代码质量高，执行效率高，具有良好的可移植性，是主要的编程语言之一。
2025-10-09T21:49:42.939+08:00  INFO 3812 --- [yu-ai-agent] [           main] com.yupi.yuaiagent.app.KnowApp           : context:C语言是一种功能强大、灵活的结构式编程语言，起源于1972年，由BCPL和B语言演变而来。它具有丰富的运算符和数据结构，语法限制不太严格，程序设计自由度大，适用于操作系统、文字处理、图形、电子表格等各类软件开发。C语言程序由函数组成，函数是其基本单位，必须有且只有一个main函数作为程序的入口和出口。C语言支持标准库函数和用户自定义函数，允许对文件以字符或字节为单位进行流式输入输出，并采用缓冲文件系统处理文本和二进制文件。此外，C语言可直接访问物理地址，能直接操作硬件，生成的代码质量高，执行效率高，具有良好的可移植性，是主要的编程语言之一。
```


## RAG 知识库进阶

### RAG 核心特性

#### 文档收集和切割（ETL）
[文档收集和切割-ETL](https://docs.spring.io/spring-ai/reference/api/etl-pipeline.html)

##### 文档
不单指文字，还包含多媒体和一系列元信息

##### ETL
Spring AI中，对Document处理流程：
1. 读取文档：使用DocumentReader组件从数据源加载文档。
2. 转换文档：转换为合适的格式，比如去除冗余信息、分词等，可使用DocumentTransformer组件实现。
3. 写入文档：使用DocumentWiriter将文档保存到存储，以向量形式写入向量数据库、以key-value形式保存到KV存储。

##### 抽取
Spring AI通过DocumentReader组件实现文档抽取，把文档加载到内存。

DocumentReader接口实现`Supplier<Document>`接口，负责从数据源读取数据并转换为Document对象集合。
```java
public interface DocumentReader extends Supplier<List<Document>> {
    default List<Document> read() {
        return (List)this.get();
    }
}
```

实际开发时，直接使用内置的多种[DocumentReader实现类](https://docs.spring.io/spring-ai/reference/api/etl-pipeline.html#_documentreaders)，用来处理不同的数据源
1. JsonReader：读取JSON文档

```java
@Component
@Slf4j
public class DemoJsonReader {

    private final Resource resource;

    public DemoJsonReader(@Value("classpath:document/demo.json") Resource resource) {
        this.resource = resource;
    }

    List<Document> loadBasicJsonDocuments() {
        JsonReader jsonReader = new JsonReader(this.resource);
        return jsonReader.get();
    }

    List<Document> loadJsonWithSpecificFields() {
        JsonReader jsonReader = new JsonReader(this.resource, "projectName");
        return jsonReader.get();
    }

    List<Document> loadJsonWithPointer() {
        JsonReader jsonReader = new JsonReader(this.resource);
        return jsonReader.get("data");
    }

}
```

2. TextReader：读取纯文本文件
3. MarkDownReader： 读取marrkdown文档
4. PDFReader：读取pdf文档，基于Apache Pdfbox库实现
5. PagePdfDocumentReader：按照分页读取PDF
6. ParagraphPdfDocumentReader：按照段落读取PDF
7. HtmlReader：读取html文档，基于jsonp实现
8. TikaDocumentReader：基于Apache tika[Apache tika](https://tika.apache.org/3.1.0/formats.html)处理多种格式的文档


Spring Ai alibaba提供更多[文档读取器](https://java2ai.com/docs/1.0.0-M6.1/integrations/documentreader/)

GitHub仓库：[spring-ai-alibaba](https://github.com/alibaba/spring-ai-alibaba)

##### 转换
Spring AI通过DocumentTransformer组件实现文档转换

DocumentTransformer接口实现`Function<List<Document>,List<Document>>`接口，负责将一组文档转换为另一组文档。
```java
public interface DocumentTransformer extends Function<List<Document>, List<Document>> {
    default List<Document> transform(List<Document> documents) {
        return apply(documents);
    }
}
```

文档转换是核心步骤，将大文档合理拆分为便于检索的知识碎片。

（1）TextSplitter 文本分割器
```java
public abstract class TextSplitter implements DocumentTransformer {

	private static final Logger logger = LoggerFactory.getLogger(TextSplitter.class);

	/**
	 * If true the children documents inherit the content-type of the parent they were
	 * split from.
	 */
	private boolean copyContentFormatter = true;

	@Override
	public List<Document> apply(List<Document> documents) {
		return doSplitDocuments(documents);
	}

	public List<Document> split(List<Document> documents) {
		return this.apply(documents);
	}

	public List<Document> split(Document document) {
		return this.apply(List.of(document));
	}

	public boolean isCopyContentFormatter() {
		return this.copyContentFormatter;
	}

	public void setCopyContentFormatter(boolean copyContentFormatter) {
		this.copyContentFormatter = copyContentFormatter;
	}

	private List<Document> doSplitDocuments(List<Document> documents) {
		List<String> texts = new ArrayList<>();
		List<Map<String, Object>> metadataList = new ArrayList<>();
		List<ContentFormatter> formatters = new ArrayList<>();

		for (Document doc : documents) {
			texts.add(doc.getText());
			metadataList.add(doc.getMetadata());
			formatters.add(doc.getContentFormatter());
		}

		return createDocuments(texts, formatters, metadataList);
	}

	private List<Document> createDocuments(List<String> texts, List<ContentFormatter> formatters,
			List<Map<String, Object>> metadataList) {

		// Process the data in a column oriented way and recreate the Document
		List<Document> documents = new ArrayList<>();

		for (int i = 0; i < texts.size(); i++) {
			String text = texts.get(i);
			Map<String, Object> metadata = metadataList.get(i);
			List<String> chunks = splitText(text);
			if (chunks.size() > 1) {
				logger.info("Splitting up document into " + chunks.size() + " chunks.");
			}
			for (String chunk : chunks) {
				// only primitive values are in here -
				Map<String, Object> metadataCopy = metadata.entrySet()
					.stream()
					.filter(e -> e.getKey() != null && e.getValue() != null)
					.collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
				Document newDoc = new Document(chunk, metadataCopy);

				if (this.copyContentFormatter) {
					// Transfer the content-formatter of the parent to the chunked
					// documents it was slit into.
					newDoc.setContentFormatter(formatters.get(i));
				}

				// TODO copy over other properties.
				documents.add(newDoc);
			}
		}
		return documents;
	}

	protected abstract List<String> splitText(String text);

}
```

其的实现类TokenTextSplitter，基于token的文本分割器。考虑了语义边界来创建有意义的文本段落
```java
@Component
class MyTokenTextSplitter {
    public List<Document> splitDocuments(List<Document> documents) {
        TokenTextSplitter splitter = new TokenTextSplitter();
        return splitter.apply(documents);
    }

    public List<Document> splitCustomized(List<Document> documents) {
        TokenTextSplitter splitter = new TokenTextSplitter(200, 100, 10, 5000, true);
        return splitter.apply(documents);
    }
}
```
![image-20251010211247](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/QQ%E6%88%AA%E5%9B%BE20251010211247.png)

![image-20251010211353](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/QQ%E6%88%AA%E5%9B%BE20251010211353.png)

(2)MetadataEnricher元数据增强器

为文档补充更多的元信息。

+ KeyWordMetadataEnricher：使用AI提取关键词添加到元数据
+ SummaryMetadataEnricher：生成摘要文档添加到元数据

```java
@Component
public class MyDocumentEnricher {

    @Resource
    private ChatModel dashscopeChatModel;

    MyDocumentEnricher(ChatModel dashscopeChatModel) {
        this.dashscopeChatModel = dashscopeChatModel;
    }

    // 关键词元信息增强器
    List<Document> enrichDocumentsByKeyword(List<Document> documents) {
        KeywordMetadataEnricher enricher = new KeywordMetadataEnricher(this.dashscopeChatModel, 5);
        return enricher.apply(documents);
    }

    // 摘要元信息增强器
    List<Document> enrichDocumentsBySummary(List<Document> documents) {
        SummaryMetadataEnricher enricher = new SummaryMetadataEnricher(dashscopeChatModel,
                List.of(SummaryMetadataEnricher.SummaryType.PREVIOUS, SummaryMetadataEnricher.SummaryType.CURRENT, SummaryMetadataEnricher.SummaryType.NEXT));
        return enricher.apply(documents);
    }
}
```

（3）ContentFormatter内容格式化工具
![image-20251010212818](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/QQ%E6%88%AA%E5%9B%BE20251010212818.png)

实现类 DefaultContentFormatter
![image-20251010213016](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/QQ%E6%88%AA%E5%9B%BE20251010213016.png)

使用builder模式创建实例
```java
DefaultContentFormatter formatter = DefaultContentFormatter.builder()
    .withMetadataTemplate("{key}: {value}")
    .withMetadataSeparator("\n")
    .withTextTemplate("{metadata_string}\n\n{content}")
    .withExcludedInferenceMetadataKeys("embedding", "vector_id")
    .withExcludedEmbedMetadataKeys("source_url", "timestamp")
    .build();

// 使用格式化器处理文档
String formattedText = formatter.format(document, MetadataMode.INFERENCE);

```

![image-20251010213026](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/QQ%E6%88%AA%E5%9B%BE20251010213026.png)

##### 加载
Spring AI通过DocumentWriter组件实现文档加载

DocumetWriter接口实现`Consumer<List<Document>>`接口，负责将处理后的文档写入目标存储

```java
public interface DocumentWriter extends Consumer<List<Document>> {
    default void write(List<Document> documents) {
        accept(documents);
    }
}

```

Spring AI提供了2中内置DocumentWriter实现
（1）FileDocumentWriter：将文档写入文件系统
```java
@Component
public class DemoDocumentWriter {

    public void writeDocuments(List<Document> documents) {
        FileDocumentWriter writer = new FileDocumentWriter("output.txt", true, MetadataMode.ALL, false);
        writer.accept(documents);
    }
}
```

（2）VectorStoreWriter：将文档写入向量数据库
```java
@Component
public class DemoVectorStoreWriter {
    private final VectorStore vectorStore;

    DemoVectorStoreWriter(VectorStore vectorStore) {
        this.vectorStore = vectorStore;
    }

    public void storeDocuments(List<Document> documents) {
        vectorStore.accept(documents);
    }
}
```

也可以写入多个内存，建立多个Writer即可

##### ETL流程示例
```java
// 抽取：从 PDF 文件读取文档
PDFReader pdfReader = new PagePdfDocumentReader("knowledge_base.pdf");
List<Document> documents = pdfReader.read();

// 转换：分割文本并添加摘要
TokenTextSplitter splitter = new TokenTextSplitter(500, 50);
List<Document> splitDocuments = splitter.apply(documents);

SummaryMetadataEnricher enricher = new SummaryMetadataEnricher(chatModel, 
    List.of(SummaryType.CURRENT));
List<Document> enrichedDocuments = enricher.apply(splitDocuments);

// 加载：写入向量数据库
vectorStore.write(enrichedDocuments);

// 或者使用链式调用
vectorStore.write(enricher.apply(splitter.apply(pdfReader.read())));

```

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