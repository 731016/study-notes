

[TOC]



## 什么是配置中心？常见的配置中心

[什么是配置中心？有哪些常见的配置中心？ - SpringCloud 面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1797453053310402561/question/1795829113869697025#heading-0)

集中配置、动态更新、分发配置文件的管理工具

Nacos：阿里的配置管理和服务发现工具，配置中心、注册中心。

Etcd：分布式键值存储公开，K8s集群配置。

Zookeeper：分布式协调服务，配置中心、注册中心。



## nacos实现原理

[你知道 Nacos 配置中心的实现原理吗？ - SpringCloud 面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1797453053310402561/question/1796136214777167873)

**配置的存储**

使用数据库存储配置数据。以键值对形式存储，每个配置项对应一个data ID，支持命名空间namespace和组group进行配置隔离和分类

**配置的推送机制**

1.x使用长轮询、2.x使用gRPC长连接实现配置的实时推送。

**配置的缓存**

客户端维护一个本地缓存，客户端接收到配置更新后，会自动刷新本地缓存的配置。如果macos服务不可用可使用本地缓存

## spring cloud组成

[Spring Cloud 由什么组成？ - SpringCloud 面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1797453053310402561/question/1796270754107621378#heading-1)

### 服务注册与发现

Zookeeper、nacos注册中心

### 负载均衡

Ribbon负载均衡

Feign，Dubbo远程调用

### 服务容错

Hystrix断路器

#### 服务治理

Spring Cloud Gateway网关

Spring Cloud Sleuth服务监控日志

## 分布式事务

[什么情况下需要使用分布式事务，有哪些方案？ - SpringCloud 面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1797453053310402561/question/1797616463733981185)

[什么是 Seata？ - SpringCloud 面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1797453053310402561/question/1797947969769701378)

[Seata 支持哪些模式的分布式事务？ - SpringCloud 面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1797453053310402561/question/1797986686995660801)

事务协调者：管理全局的分支事务状态，用于全局性事务的提交和回滚。
事务管理器：开发、提交、回滚事务。

事务作业管理器：分支事务上的资源管理。



AT模式：通过代理数据库操作实现分布式事务管理。非侵入式

TCC模式：两阶段提交，try（预留资源）、Confirm（确认）、Cancel（回滚）。侵入式

Saga模式：长事务模式，全局事务拆分为多个有序的小事务，每个事务都用对应的补偿操作

XA模式：基于两阶段提交协议（2PC）的标准化分布式事务管理模式。



## Feign和Dubbo的区别

[Feign 和 Dubbo 的区别？ - SpringCloud 面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1797453053310402561/question/1799933482451148802)

![image-20250120185435655](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20250120185435655.png)

## 服务雪崩

[什么是服务雪崩？ - SpringCloud 面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1797453053310402561/question/1800272846473469954)

在微服务架构和分布式系统中，由于某个服务不可用或性能下降，导致依赖的其它服务出现连锁故障，导致系统或大部分服务不可用

## 服务降级

[什么是服务降级？ - SpringCloud 面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1797453053310402561/question/1800275120583155713)

在微服务架构和分布式系统中，由于系统压力过大或部分服务故障，暂时减少或关闭某些不必要的功能，确保核心功能正常

## 服务熔断

[什么是服务熔断？ - SpringCloud 面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1797453053310402561/question/1800278016326443010)

当某个服务调用失败率持续升高时，中断对该服务的请求，防止系统资源不断消耗

## 服务限流

[什么是服务熔断？ - SpringCloud 面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1797453053310402561/question/1800278016326443010)

流量控制策略，服务降级的一种，通过限制每秒的请求数量（QPS）、请求频率、并发数，来保护服务的处理能力

