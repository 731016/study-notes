[TOC]



## springBoot的启动流程

[说说 Springboot 的启动流程？ - SpringBoot 面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1797452903309508610/question/1846441429268488194)

![image-20250117152544817](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20250117152544817.png)

1. 启动main方法：通过SpringApplication.run()引导应用启动
2. 创建SpirngApplication：推断应用类型（servlet还是其它类型）、设置初始化器（ApplicationContextInitializer）、设置启动监听器（ApplicationListener）、确定主应用类

```java
public SpringApplication(ResourceLoader resourceLoader, Class<?>... primarySources) {
    this.resourceLoader = resourceLoader;
    Assert.notNull(primarySources, "PrimarySources must not be null");
    this.primarySources = new LinkedHashSet<>(Arrays.asList(primarySources));
    //推断应用类型
    this.webApplicationType = WebApplicationType.deduceFromClasspath();
    this.bootstrapRegistryInitializers = new ArrayList<>(
                    getSpringFactoriesInstances(BootstrapRegistryInitializer.class));
    //设置初始化器
    setInitializers((Collection) getSpringFactoriesInstances(ApplicationContextInitializer.class));
    // 设置启动监听器
    setListeners((Collection) getSpringFactoriesInstances(ApplicationListener.class));
    // 确定主应用类
    this.mainApplicationClass = deduceMainApplicationClass();
}
```

3. 准备环境（ConfigurableEnvironment）：加载配置文件、系统环境变量、命令行参数

4. 创建并刷新ApplicationContext：创建应用上下文，加载配置类和自动配置类，注册bean并执行依赖注入等初始化操作

5. 在刷新上下文时启动嵌入式Web服务器：对于web应用，启动web容器，并注册servlet和filter

6. 发布应用已启动事件：监听stated事件逻辑触发

7. 执行CommandLineRunner和ApplicationRunner：执行实现该接口的初始化逻辑

8. 发布ready事件、应用启动完成：触发ApplicationReadyEvent，应用进入运行状态，处理业务请求或任务

```java
public ConfigurableApplicationContext run(String... args) {
    // 记录启动的开始时间，用于统计启动耗时
    long startTime = System.nanoTime();

    // 创建 DefaultBootstrapContext，用于在启动过程中保存共享的对象
    DefaultBootstrapContext bootstrapContext = createBootstrapContext();
    ConfigurableApplicationContext context = null;

    // 配置系统属性 "java.awt.headless"，适用于没有显示器的服务器环境
    configureHeadlessProperty();

    // 获取 SpringApplicationRunListeners，这些监听器可以监听应用的启动过程
    SpringApplicationRunListeners listeners = getRunListeners(args);

    // 通知所有监听器，Spring Boot 应用程序即将启动
    listeners.starting(bootstrapContext, this.mainApplicationClass);

    try {
        // 解析传入的命令行参数
        ApplicationArguments applicationArguments = new DefaultApplicationArguments(args);

        // 准备环境，加载配置文件、环境变量、命令行参数等
        ConfigurableEnvironment environment = prepareEnvironment(listeners, bootstrapContext, applicationArguments);

        // 配置环境，决定是否忽略 Java 的 `BeanInfo` 类，以加快启动速度
        configureIgnoreBeanInfo(environment);

        // 打印 Banner（欢迎信息），通常会在控制台或日志中展示
        Banner printedBanner = printBanner(environment);

        // 创建应用上下文（ApplicationContext），可以是不同类型的 Web 或非 Web 上下文
        context = createApplicationContext();

        // 设置应用启动监控器，用于收集应用启动过程中的统计数据
        context.setApplicationStartup(this.applicationStartup);

        // 准备应用上下文，注入环境、事件监听器、命令行参数等
        prepareContext(bootstrapContext, context, environment, listeners, applicationArguments, printedBanner);

        // 刷新上下文，启动 Spring 的核心容器，完成 Bean 的初始化等过程，其间会触发内嵌的 web 容器
        refreshContext(context);

        // 上下文刷新后的回调操作，可以用于自定义初始化逻辑
        afterRefresh(context, applicationArguments);

        // 计算应用启动耗时
        Duration timeTakenToStartup = Duration.ofNanos(System.nanoTime() - startTime);

        // 如果配置了日志，输出启动耗时等信息
        if (this.logStartupInfo) {
            new StartupInfoLogger(this.mainApplicationClass).logStarted(getApplicationLog(), timeTakenToStartup);
        }

        // 通知监听器，应用上下文已启动完成
        listeners.started(context, timeTakenToStartup);

        // 执行 CommandLineRunner 或 ApplicationRunner 接口中的代码
        callRunners(context, applicationArguments);
    }
    catch (Throwable ex) {
        // 处理启动过程中发生的异常
        handleRunFailure(context, ex, listeners);
        throw new IllegalStateException(ex);
    }

    try {
        // 计算到应用完全准备好所需的时间
        Duration timeTakenToReady = Duration.ofNanos(System.nanoTime() - startTime);

        // 通知监听器，应用已经完全准备好
        listeners.ready(context, timeTakenToReady);
    }
    catch (Throwable ex) {
        // 处理应用准备过程中的异常
        handleRunFailure(context, ex, null);
        throw new IllegalStateException(ex);
    }

    // 返回创建好的应用上下文
    return context;
}
```

## springBoot核心特性

[Spring Boot 的核心特性有哪些？ - SpringBoot 面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1797452903309508610/question/1796707609684869122#heading-1)

1. 内嵌服务器
2. 自动化配置。yaml，properties，SPI
3. jar包运行。java运行环境
4. 完整的生态支持

## springBoot如何实现自动配置

[SpringBoot 是如何实现自动配置的？ - SpringBoot 面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1797452903309508610/question/1846171814407757826)

`@EnableAutoConfiguration`实现，包含`@Import({AutoConfigurationImportSelector.class})`，导入的这个类会扫描classpath下所有的`META-INF/spring.factories`中的文件，根据文件中指定的配置类加载相应的bean自动配置



## application.yml和application.properties的区别

[Spring Boot 中 application.properties 和 application.yml 的区别是什么？ - SpringBoot 面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1797452903309508610/question/1797428369051222017)

配置效果相同，yml既有层级结构，properties使用键值对

优先级和和加载顺序
application.properties > application.yml

## springBoot定义和读取自定义配置

[如何在 Spring Boot 中定义和读取自定义配置？ - SpringBoot 面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1797452903309508610/question/1797429518173077505)

@Value（属性）、@ConfigurationProperties（前缀，类）、Environment接口

## springBoot配置文件加载优先级

[Spring Boot 配置文件加载优先级你知道吗？ - SpringBoot 面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1797452903309508610/question/1797435138708209665#heading-3)

[Core Features](https://docs.spring.io/spring-boot/docs/2.7.18/reference/html/features.html#features.external-config)



![image-20250120154630485](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20250120154630485.png)

## springBoot是否支持XML配置

[Spring Boot 是否可以使用 XML 配置 ? - SpringBoot 面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1797452903309508610/question/1797535861408137217)

@ImportResource导入xml配置文件

## springBoot默认同时可以处理的最大连接数

[SpringBoot 默认同时可以处理的最大连接数是多少？ - SpringBoot 面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1797452903309508610/question/1797798181887672322#heading-0)

在 APR/native 模式 下，默认值为 8192 + 等待队列长度100。

在 NIO 模式 下，默认值为 10000 + 等待队列长度100。tomcat默认使用NIO（非阻塞 I/O 模型）

在 BIO 模式 下，默认值为 200 + 等待队列长度100。

```yaml
server:
  tomcat:
    max-connections: 10000 # 最大连接数
    accept-count: 100 # 最大等待数/等待队列长度
```

**默认同时处理多少请求？**

**200**

tomcat默认核心线程数10，最大线程数200，等待队列长度100。在核心线程数满了会直接创建线程到最大线程数

```yaml
server:
  tomcat:
    max-threads: 200 #最大线程数
    min-spare-threads: 10 #最小工作线程数0
    accept-count: 100 # 最大等待数/等待队列长度
```

## springBoot的starter

[如何理解 Spring Boot 中的 starter？ - SpringBoot 面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1797452903309508610/question/1797866285598638082#heading-1)

一组依赖的集合，如spring-boot-starter-data-redis通过创建配置类，加载属性，创建spring.factories

## springBoot处理跨域请求

[Spring Boot 如何处理跨域请求（CORS）？ - SpringBoot 面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1797452903309508610/question/1797870601843638274)

1. 局部配置cors，使用@CrossOrigin
2. 全局cors，实现WebMvcConfigurer，重写addCorsMappings。优先级在最后
3. 添加CorsFilter。过滤器属于servlet

## 拦截器

[在 Spring Boot 中你是怎么使用拦截器的？ - SpringBoot 面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1797452903309508610/question/1797874211147087873#heading-1)

实现`HandlerInterceptor`接口，实现preHandle、postHandle、afterCompletion

实现`WebMvcConfigurer`的addInterceptors



## springBoot多数据源实现

[在 Spring Boot 中如何实现多数据源配置？ - SpringBoot 面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1797452903309508610/question/1798603759063478273#heading-0)

核心：实现AbstractRoutingDataSource

1. 在配置文件定义多数据源
2. 每个数据源配置DataSource、SqlSessionFactory、TransactionManager
3. 每个数据源配置独立的Mapper扫描路径
4. @Transactional指定事务管理器

## springBoot不推荐使用@Autowired

[SpringBoot（Spring）中为什么不推荐使用 @Autowired ？ - SpringBoot 面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1797452903309508610/question/1800338339586711554#heading-0)

推荐使用构造器注入，可以使用@Resource（按名称注入）替代

@Autowired（按类型注入）属于spring框架提供，

注入的可能是空对象，构造函数能确保传入的是一个对象实例
