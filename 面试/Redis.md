[TOC]



## redis主从复制的实现原理

[Redis 主从复制的实现原理是什么？ - Redis 面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1791375592078610434/question/1780933295647780865#heading-0)

全量同步

![image-20250110212823261](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20250110212823261.png)

增量同步

![image-20250110213006553](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20250110213006553.png)

## redis集群的实现原理

[Redis 集群的实现原理是什么？ - Redis 面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1791375592078610434/question/1780933295651975169#heading-0)

通过多个redis实例组成，每个实例存储部分数据。使用哈希槽机制来分配数据，将整个键空间划分为16384（2^14）个槽。每个redis实例负责一定范围的哈希槽，数据的key经过哈希函数计算后对16384取余可定位到对应节点。

各个节点使用gossip协议通信，每个节点都会保存集群的完整拓扑信息，包括节点id、ip地址、端口、负责的哈希槽范围

> 16384？
>
> 发生节点负责的槽信息
>
> unsigned char myslots[CLUSTER_SLOTS/8]
>
> 当槽位为65536时，65536/8/1024=8 kb
>
> 当槽位为16384时，16384/8/1024=2 kb
>
> 考虑消息大小和集群规模
>
> 65536这个ping消息的消息头就会过大浪费带宽
>
> 集群不太可能会扩展超过1000个节点，16384够用

## redis通常应用于哪些场景？

[Redis 通常应用于哪些场景？ - Redis 面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1791375592078610434/question/1780933295584866306#heading-0)

1. 缓存：热点数据缓存，减少数据库的负载，先查缓存，再查数据库（加锁），如果数据库无数据可在缓存写入null，应对缓存穿透
2. 分布式锁：分布式系统资源的安全访问
3. 实时系统：适合实时分析，如网站点击统计、实时排行榜（zset数据结构）
4. 计数器：原子性适合，如点赞
5. 消息队列：list的Pub/Sub功能，实现轻量级的消息队列

## Redis为什么快？

[Redis 为什么这么快？ - Redis 面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1791375592078610434/question/1780933295589060609)

1. 基于内存
2. 单线程模型：避免多线程环境下的上下文切换和资源竞争
3. I/O多路复用：单个线程同时处理多个客户端连接的能力
4. 高效的数据结构：字符串、列表、哈希、集合、Zset（有序集合）等
5. 多线程引入：4.0开始引入Unlink等异步执行命令；6.0引入多线程，并发处理网络请求

## 几种I/O模型

[说说你知道的几种 I/O 模型 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/question/1804476796656885762)



![image-20250113154431074](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20250113154431074.png)

### 同步阻塞 BIO

用户线程发起请求后一直阻塞，一直到数据返回；一个线程对应一个连接，即使没有数据，也同步阻塞着

![image-20250113152503974](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20250113152503974.png)

### 同步非阻塞 NIO

没数据时，用户程序可以不阻塞等着，直接返回，用户程序可通过轮询操作不断发起请求，直到获取到数据，有数据时等待数据返回（内核->用户空间）的这段时间用户程序是阻塞状态的

![image-20250113152631389](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20250113152631389.png)



### I/O多路复用

同步非阻塞I/O频繁调用一直轮询是非常消耗CPU资源的。

只用一个线程查看多个连接是否有数据已准备就绪，如果有就通知别的线程来读取数据，用少量的线程去监控多条连接，减少线程数量，降低内存销毁，减少了上下文切换次数



![image-20250113153004557](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20250113153004557.png)

### 信号驱动式I/O

由内核告诉数据已准备好，再由用户线程去读取

基于TCP协议的socket有七种产生信号的事件，无法区分，除非使用UDP协议

![image-20250113153507863](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20250113153507863.png)

### 异步I/O AIO

内核直接把数据拷贝到用户空间再告诉用户线程

> linux对异步I/O支持不足，winodw实现了

![image-20250113153944832](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20250113153944832.png)

## Redis常见的数据类型

[Redis 中常见的数据类型有哪些？ - Redis 面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1791375592078610434/question/1780933295593254915)

[Redis String 类型的底层实现是什么？（SDS） - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/question/1780933295681335298)

[Redis 的 hash 是什么？ - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/question/1780933295601643521)

### String

存储文本、数字和二进制数据。最大长度512MB

### Hash

键值对集合，适合存储对象的属性。内部使用哈希表实现

### List

有序的字符串集合，支持从两端推入和弹出元素，底层为双向链表

### Set

无序且不重复的字符串集合，使用哈希表实现，支持快速查找和去重

### Sorted Set

类似与集合，每一个元素都有一个分数，用于排序，底层使用跳表实现，支持快速的范围查询



2.2新增：BitMap 0、1两种状态

2.8新增：HyperLogLog 海量数据基数统计

3.2新增：GEO 存储地理位置

5.0新增：Stream 消息队列



## Zset实现原理

[Redis 的 hash 是什么？ - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/question/1780933295601643521)

[Redis Zset 的实现原理是什么？ - Redis 面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1791375592078610434/question/1861688534670434305)

SkipList + HashTable 组成

SkipList ： 存储数据的排序和快速查找

HashTable ：存储成员和分数的映射关系

> 当Zset元素数量较少时，会使用ZipList（6.0）/Listpack（7.0）来节省内存
>
> 满足下列两个条件：
>
> 元素个数 <= zset-max-ziplist-entries（默认128）
>
> 元素成员名和分值的长度 <= zset-max-ziplist-value（默认64字节）

## redis中跳表的实现原理

[Redis 中跳表的实现原理是什么？ - Redis 面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1791375592078610434/question/1780933295597449217)

多层链表实现，底层链表保存所有元素，每一层链表都是下一层的子集

插入：从最高层查找插入位置，随机决定新节点层数，在相应层插入节点并更新指针

删除：从最高层开始查找删除的节点，并在各层中更新指针，以保持跳表的结构

查找：从最高层开始，逐层向下，直到直到目标元素或确定元素不存在。

## redis支持事务吗？

[Redis 支持事务吗？如何实现？ - Redis 面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1791375592078610434/question/1780933295610032129)

支持事务，保证所有的命令在一个原子操作中，不会被打断，不支持回滚

## Lua脚本功能是什么？

[Redis 的 Lua 脚本功能是什么？如何使用？ - Redis 面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1791375592078610434/question/1780933295618420738)

允许用户在Redis服务器执行自定义的Lua脚本，以实现原子操作和复杂逻辑

lua本身不具备原子性，redis命令是单线程执行，整个lua脚本会被作为一个命令执行，其它命令会被阻塞，保证了原子性

由于执行lua脚本其间，无法处理其他命令，所有lua脚本不应过于复杂，尽量简洁高效，lua-time-limit可调整lua脚本执行时间。默认为5s，超过时间会终止且抛错

## Big key问题是什么？怎么解决？

[Redis 中的 Big Key 问题是什么？如何解决？ - Redis 面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1791375592078610434/question/1780933295626809345)

一个内存空间占用比较大的键

+ 内存分布不均。集群模式下，如果大key都分配到一个实例

+ 操作大key耗时较长

+ I/O占用资源大

+ 可能导致客户端超时

数据压缩、拆分数据、合适的存储结构、只存储必要数据



## 解决热点key问题

[如何解决 Redis 中的热点 key 问题？ - Redis 面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1791375592078610434/question/1780933295631003650)

拆分：加一个前缀索引，分散到不同的key

多级缓存：增加其它缓存，分摊redis压力

读写分离：主从复制，读请求分摊多多个从节点

限流和降级：减少对redis的请求或必要时返回降级的数据或空值

### 如何发现热key

#### redis集群监控

1.连接到集群节点

2.执行`CLUSTER NODES`命令，该命令会返回集群中所有节点的详细信息

```
# 连接到节点
redis - cli - c -h 127.0.0.1 -p 7000
# 获取节点统计信息
INFO stats
#通过手动连接到每个节点并查看该值，可以比较不同节点之间的 QPS，判断是否存在 QPS 倾斜。
instantaneous_ops_per_sec:100
```

#### hotkey监控

4.0后引入

```
redis-cli --hotkeys
```

缺点：扫描整个keyspace，如果key数量较多，执行时间可能很长

#### monitor命令

1.0起支持

缺点：单个客户端执行monitor就会损耗50%的性能！，不推荐

#### 客户端/代理层收集

## redis持久化机制

[Redis 的持久化机制有哪些？ - Redis 面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1791375592078610434/question/1780933295635197954)

### RDB

数据快照

```
# rdb开启
# 每间隔多少秒，至少有多少条数据写入；满足一个条件即可
save 900 1
save 300 10
save 60 10000

# rdb文件存储
 # The filename where to dump the DB
 dbfilename dump.rdb
 
 # The working directory.
 dir /Users/niuniumart/code/redis

```

#### 什么时候进行持久化？

```
# 主动执行
save
bgsave
达到持久化阈值
程序正常关闭
```

![image-20250113182321604](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20250113182321604.png)





### AOF

记录日志

```
appendonly no

# The name of the append only file (default: "appendonly.aof")

appendfilename "appendonly.aof"
```

![image-20250113182716001](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20250113182716001.png)

#### 重写AOF

在AOF文件体积过大时，自动在后台fork一个子进程，进行AOF重写。针对相同key的操作，进行合并。

在重写过程中，redis不但将新的操作记录在原有的AOF缓冲区，还会记录在AOF重写缓冲区。一旦新AOF文件创建完毕，redis就会将重写缓冲区内容追加到新的AOF文件，再替换掉旧的AOF文件

![image-20250113183332473](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20250113183332473.png)



### AOF，RDB混合持久化

实际发生在AOF重写阶段，将当前状态保存为RDB二进制内容，写入新的AOF文件，再将重写缓冲区的内容追加到新的AOF文件，替换旧AOF文件

#### 混合持久化，服务启动时加载流程

文件开头有“REDIS”为混合持久化的AOF文件

![image-20250113183730904](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20250113183730904.png)

## redis分布式锁

[Redis 中如何实现分布式锁？ - Redis 面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1791375592078610434/question/1780933295660363778)

`set lock_key uniqueValue EX exprire_time NX + lua脚本`

### 单点故障

单台redis实现分布式锁存在单点故障，如果采用主从读写分离架构，如果一个客户端在主节点上加锁成功，然后主节点挂掉了，由于主从延迟其它从节点还没同步锁，导致其它客户端获取到锁

### redlock 红锁

部署多个redis实例（5个）

客户端大多数实例（>=3个）上请求锁，并在锁过期前，大多数实例（n/2 + 1）加锁成功



[分布式锁在未完成逻辑前过期怎么办？ - Redis 面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1791375592078610434/question/1780933295664558081#heading-1)

通过看门狗机制，后台定时向redis进行锁续期



### 实现分布式锁可能遇到的问题

1. 业务未执行完，锁已到期
2. 单点故障
3. 主从问题不同步
4. 网络分区
5. 时钟飘逸
6. 锁的可重入性
7. 误释放锁

## redisson分布式锁原理

[说说 Redisson 分布式锁的原理? - Redis 面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1791375592078610434/question/1833406734003052546#heading-0)

### 锁获取

使用lua脚本，`exists`+`hexists`+`hincrby`保证只有一个线程能获取锁

通过`pexpire`为锁设置过期时间，防止因宕机等原因导致锁无法释放

### 锁续期

持有锁的线程会定期续期，确保任务没有完成时锁不会失效

### 锁释放

使用lua脚本，`hexists`+`del`确保只有持有锁的线程才能释放锁，防止误释放锁

### 可重入锁

持有锁的线程可多次获取同一把锁而不会阻塞。哈希中的key为线程id，如果重入则value+1，如果释放则value-1，减到0说明锁被释放，则del锁

## 缓存击穿、缓存穿透、缓存雪崩

[Redis 中的缓存击穿、缓存穿透和缓存雪崩是什么？ - Redis 面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1791375592078610434/question/1780933295672946690)

缓存击穿：热点数据过期，导致大量请求访问数据库。热点数据不过期；保证同一时间只有一个请求构建缓存

缓存穿透：查询不存在的数据，导致每次请求都会访问数据库。布隆过滤器，过滤不存在的请求；缓存空值

缓存雪崩：多个缓存数据在同一时间过期，导致大量请求访问数据库。随机时间过期

## redisson看门狗

[Redisson 看门狗（watch dog）机制了解吗？ - Redis 面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1791375592078610434/question/1869931978230796290)

避免redis中的锁在超时后业务逻辑还没执行完成，锁被自动释放的情况。通过定期刷新锁的过期时间来实现自动续期

定时刷新：未设置过期时间，基于netty时间轮启动定时任务，定期向redis发送命令更新锁的过期时间，默认10s，每次续期30s

释放锁：当客户端主动释放时，redssion会取消刷新操作。如果宕机，定时任务也会挂，到超时时间后，锁会自动释放

## redis保证缓存和数据库的数据一致性

[Redis 中如何保证缓存与数据库的数据一致性？ - Redis 面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1791375592078610434/question/1780933295677140994)

![image-20250114171941497](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20250114171941497.png)

想保证强一致性，通过分布式读写锁实现，查询缓存使用读锁，更新使用写锁，更新时先写数据库再删缓存，此时读操作阻塞，等待更新。

## redis实现排行榜

[如何使用 Redis 快速实现排行榜？ - Redis 面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1791375592078610434/question/1780933295681335299)

1.使用sorted set存储分数和成员

使用`ZADD`，将用户和对应的分数添加到有序集合

2.获取排名

使用`ZRANK`获取某个用户的排名

3.获取前N名

使用`ZREVRANGE`获取分数最高的前N名

4.更新分数

使用`ZINCRBY`对其分数进行加减操作

## redis实现布隆过滤器

[如何使用 Redis 快速实现布隆过滤器？ - Redis 面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1791375592078610434/question/1780933295689723905)

### 使用位图bitmap实现

位图结构SETBIT和GETBIT操作。本质是bit数组，用于标识元素是否存在

通过多个哈希函数计算索引位置，将位图中的相应位置设置为1，表示该元素可能存在

### 使用redisBloom模块

BF.ADD向布隆过滤器添加元素，BF.EXISTS来检测元素是否可能存在

## 统计大量用户唯一访问量

[如何使用 Redis 统计大量用户唯一访问量（UV）？ - Redis 面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1791375592078610434/question/1780933295689723906)

HyperLogLog，基数估算算法的概率性数据结构，可以用极少的内存统计海量用户唯一访问的近似值

![image-20250114221030961](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20250114221030961.png)





