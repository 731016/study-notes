[TOC]



## 线程同步

[什么是 Java 中的线程同步？ - Java 并发面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1789249312885223425/question/1800347821641375745)

在多线程环境下，避免多个线程对共享资源进行同时访问，引发数据不一致或其它问题的机制。通过同一时刻只有一个线程能够访问共享资源



## 线程安全

[Java 中的线程安全是什么意思？ - Java 并发面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1789249312885223425/question/1780933294850863106)

多个线程访问共享资源时，能保证一致性和正确性



## 线程的生命周期在Java中如何定义？

[线程的生命周期在 Java 中是如何定义的？ - Java 并发面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1789249312885223425/question/1780933294871834626)

![image-20250106163305676](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20250106163305676.png)

## Java创建多线程

[Java 中如何创建多线程？ - Java 并发面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1789249312885223425/question/1828722732530307073)



## Java线程池原理

[你了解 Java 线程池的原理吗？ - Java 并发面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1789249312885223425/question/1780933294892806145#heading-0)

[Java 线程池核心线程数在运行过程中能修改吗？如何修改？ - Java 并发面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1789249312885223425/question/1830885090747584514#heading-0)

关键参数：

### 核心线程数

可以动态修改

`ThreadPoolExecutor.setCorePoolSize(int corePoolSize)`，修改核心线程数不会中断现有任务，新任务会生效；如果当前线程池中的数量超过核心线程数，多余的线程会在空闲时被回收

### 最大线程数

可以动态修改

`setMaximumPoolSize(int maximumPoolSize)`

### 空闲存活时间

超过时间的非核心线程会被销毁

### 工作队列

+ LinkedBlockingQueue：链表结构的阻塞队列，大小无限
+ SynchronousQueue：不存储任务，直接将任务提交给线程
+ ArrayBlockingQueue：数组结构的有界阻塞队列
+ PriorityBlockingQueue：带优先级的无界阻塞队列

### 线程工厂

### 任务拒绝处理器

+ AbortPolicy：当任务队列满且没有线程空闲，直接抛出异常，默认的拒绝策略。适合需要通知执行失败
+ CallerRunsPolicy：当任务队列满且没有线程空闲，由调用者线程执行。适合通过减缓任务提交来稳定系统
+ DiscardOldestPolicy：当任务队列满且没有线程空闲，会删除最早的任务，重新提交当前任务。适合丢弃最旧的任务以保证新的重要任务能够被处理
+ DiscardPolicy：直接丢弃当前提交的任务，不会执行任何操作，也不会抛出异常。适合对部分任务丢弃没有影响
+ 自定义拒绝策略，实现RejectedExecutionHandler接口，重写rejectedExecution

### 工作原理

任务提交，线程池线程数未达到核心线程数

![image-20250106164353882](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20250106164353882.png)

核心线程数已满，任务队列未满

![image-20250106164423270](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20250106164423270.png)

核心线程数已满，任务队列已满

![image-20250106164449502](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20250106164449502.png)

线程池中线程数已达最大线程数

![image-20250106164530788](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20250106164530788.png)

## 线程池的实现？

[Java 并发库中提供了哪些线程池实现？它们有什么区别？ - Java 并发面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1789249312885223425/question/1780933294913777665)

### FixedThreadPool

创建一个固定数量的线程池

空闲的线程会被复用，如果没有空闲的线程，新任务会放入队列等待

适合：负载稳定，任务数量确定且不需要动态调整线程数

### CacheThreadPool

可根据需要创建新线程的线程池

线程池线程数量无上限，空闲线程会在60s后被回收，如果由新任务且没有可用线程，会创建新线程

适合：短期大量并发任务的场景，任务执行时间短且线程数量需求变化较大

### SingeThreadExecutor

创建一个只有单个线程的线程池

只有一个线程处理任务，任务会按照提交顺序依次执行

适合：需要保证任务按顺序执行，或不需要并发处理任务

### ScheduledThreadPool

支持定时任务和周期性任务的线程池

可定时或以固定频率执行任务，线程池大小可自定义

适合：需要周期性执行任务

### WorkStealingPool

基于任务窃取算法的线程池

线程池中每个线程维护一个双端队列，线程可从自己的队列中取任务执行，如果线程的队列为空，可从其他线程的队列中获取任务来执行

适合：大量小任务并行执行



## 使用过哪些并发工具类？

[你使用过哪些 Java 并发工具类？ - Java 并发面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1789249312885223425/question/1780933294930554882)

### concurrenthashmap

线程安全高效的hash表，支持并发访问

### atomicinteger

对int类型的原子操作

### countdownlatch

一个或多个线程等待其它线程完成操作。通过计数器，当一个线程执行完成后，计数器递减，减到0时，所有等待线程会被唤醒并继续执行

### completablefuture

允许非阻塞地处理异步任务，通过链式调用组合多个异步操作

![image-20250107114105286](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20250107114105286.png)



## ReentrantLock的实现原理？

[Java 中 ReentrantLock 的实现原理是什么？ - Java 并发面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1789249312885223425/question/1780933295014440961)

基于AQS（抽象、封装；将排队、入队、加锁、中断提供出来）实现的一个可重入锁，支持公平和非公平方式

内部通过state变量和同步队列、等待队列实现

利用CAS修改state来争抢锁

抢不到进入同步队列等待，条件condition不满足进入等待队列

是否公平锁的区别：线程获取锁时是加入同步队列尾部还是直接利用CAS争抢锁

![image-20250107115727555](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20250107115727555.png)



## synchronized是怎么实现的？

[Java 的 synchronized 是怎么实现的？ - Java 并发面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1789249312885223425/question/1780933294980886530)

![image-20250107122402198](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20250107122402198.png)

## Synchronized 和 ReentrantLock 有什么区别？

[Synchronized 和 ReentrantLock 有什么区别？ - Java 并发面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1789249312885223425/question/1780933294976692225)



## volatile关键字的作用

[Java 中 volatile 关键字的作用是什么？ - Java 并发面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1789249312885223425/question/1780933295115104258)

[什么是 Java 中的指令重排？ - Java 并发面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1789249312885223425/question/1780933295043801090)

指令重排：保证单线程程序语义不变的情况下，对指令执行顺序进行调整，以提升执行效率

volatile：保证变量的可见性和禁止指令重排优化

### 可见性

当一个线程修改了volatile变量的值，新值会立即被刷新到主内存中，其它线程在读取该变量时可立即获取最新的值。

### 禁止指令重排序

通过内存屏障来禁止特定情况下的指令重排序，保证程序执行顺序符合预期。对volatile变量的写操作会在其前面插入一个StoreStore屏障，而对volatile变量的读操作会在其后插入一个LoadLoad屏障。