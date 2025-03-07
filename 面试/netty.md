## 几种I/O模型

同步阻塞（Blocking I/O，BIO）

线程调用read时，如果还没有接收到数据，线程会阻塞等待；数据从网卡 -> 内核 -> 用户空间，两个过程都为阻塞操作

缺点：每一个连接都需要一个线程，即使没有数据，线程也会被占用，导致资源浪费，不适合高并发场景

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20250307155352223.png" alt="image-20250307155352223" style="zoom:67%;" />



同步非阻塞（Non-Blocking I/O，NIO）

read调用如果没数据，会立即返回错误（或特定状态），不会阻塞线程；应用程序需要不断轮询判断数据是否就绪。但数据从内核 -> 用户空间还是阻塞的

缺点：轮询方式会频繁进行系统调用，上下文切换开销大，CPU占用较高，不适合大规模连接

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/notenoteimage-20250307155525325.png" alt="image-20250307155525325" style="zoom:67%;" />



I/O多路复用

通过一个线程（或少量线程）监控多个连接的状态；只有某个连接的数据就绪时，系统才通知应用程序，再执行read读取操作

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20250307155436153.png" alt="image-20250307155436153" style="zoom:67%;" />



信号驱动 I/0

由内核在数据就绪时发出信号通知应用程序，应用程序收到信号，再执行read读取操作

缺点：对于TCP协议，由于同一个信号可能对应多种事件，难以精确区分（实际应用较少）

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20250307155448331.png" alt="image-20250307155448331" style="zoom:67%;" />



异步I/O （Asynchronous I/O，AIO）

调用aio_read后，内核负责将数据从网卡 -> 内核 -> 用户空间，拷贝完成后通过回调通知应用程序；整个过程线程没有阻塞

缺点：linux支持不完善

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20250307155505751.png" alt="image-20250307155505751" style="zoom:67%;" />



[说说你知道的几种 I/O 模型 - Netty 面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1804354610222800897/question/1804476796656885762)

### 介绍一下Reactor线程模型

基于事件驱动，将I/O操作抽象成不同的事件，每个事件都配置对应的回调函数，由Selector监听连接上事件的发生，再进行分发调用相应的回调函数进行处理



单Reactor单线程模型

所有操作都是一个I/O线程处理

![image-20250307160957869](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20250307160957869.png)



单Reactor多线程模型

一个线程接收建立连接事件和后续的连接I/O处理，线程池处理具体业务逻辑

![image-20250307161011488](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20250307161011488.png)



主从Reactor多线程模型

主Reactor负责接收建立连接事件，从Reactor负责处理后续的连接I/O处理，线程池处理具体业务逻辑

![image-20250307161024192](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20250307161024192.png)

## TCP粘包、半包

[说一下 TCP 半包和粘包问题？ - Netty 面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1804354610222800897/question/1805367724032598017)

如果一次传输的数据大小没有超过发送缓冲区大小，完整的报文会被拆分，导致半包

如果一次传输的数据大小超过发送缓冲区大小，可能会跟别的报文合并发送，导致粘包



解决：

固定长度

分隔符

固定长度字段 + 内容

## Netty的零拷贝机制

[简单说说 Netty 的零拷贝机制？ - Netty 面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1804354610222800897/question/1804893517888823297)

避免在用户空间和内核之间拷贝数据，降低CPU和内存带宽的消耗

