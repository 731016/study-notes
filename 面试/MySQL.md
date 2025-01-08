[TOC]



## mysql中的数据排序是怎么实现的？

[MySQL 中的数据排序是怎么实现的？ - MySQL 面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1791003439968264194/question/1780933295526146049#heading-7)

排序命中索引，使用索引排序，否则使用文件索引

文件排序中，如果数据量少在内存中排序，使用单路排序或双路排序（多个回表的过程）

如果数据大则利用磁盘文件进行外部排序，一般使用归并排序



## 索引类型有哪些？

[MySQL 的索引类型有哪些？ - MySQL 面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1791003439968264194/question/1780933295438065665)

**数据结构**

+ B+树索引
+ 哈希索引
+ 倒排索引（Full-Text）
+ R-树索引（多维空间树）

**InnoDB B+树索引**

+ 聚簇索引
+ 非聚簇索引

**索引性质**

+ 普通索引
+ 主键索引
+ 联合索引
+ 唯一索引
+ 全文索引
+ 空间索引

## mysql InnoDB引擎中的聚簇索引和非聚簇索引有什么区别？

[MySQL InnoDB 引擎中的聚簇索引和非聚簇索引有什么区别？ - MySQL 面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1791003439968264194/question/1780933295442259970#heading-2)

聚簇索引的`非叶子节点`存储的是`索引值`，`叶子节点`存储的是`完成的数据记录`，一个表只能有一个聚簇索引，一般是表的主键，主要用于范围查询和排序。

非聚簇索引的`非叶子节点`存储的也是`索引值`，`叶子节点`存储的是`数据行的主键`和`对应的索引列`，一个表可以用多个非聚簇索引，非聚簇索引又称为辅助索引，二级索引，主要用于快速定位要查找的列。

## 回表是什么？

[MySQL 中的回表是什么？ - MySQL 面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1791003439968264194/question/1780933295446454273)

在使用二级索引（非聚簇索引）作为查询条件时，由于二级索引中只存储索引字段的值和对于的主键。如果要查询数据行中的其它数据，需要根据主键去聚簇索引查询实际的数据行。



## 最左前缀匹配原则

[MySQL 索引的最左前缀匹配原则是什么？ - MySQL 面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1791003439968264194/question/1780933295450648578)

在使用联合索引时，查询条件必须从索引的最左侧开始匹配。

![image-20250107182533158](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20250107182533158.png)

## 覆盖索引

[MySQL 的覆盖索引是什么？ - MySQL 面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1791003439968264194/question/1780933295454842881)

二级索引中包含了查询所需的所有字段，从而使查询可以仅通过访问二级索引而不需要访问实际的表数据



## 索引下推

[MySQL 的索引下推是什么？ - MySQL 面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1791003439968264194/question/1780933295459037186)

减少回表查询，提高查询效率。允许在使用联合索引查询数据时，将部分查询条件下推到存储引擎层过滤，减少需要从表中读取的数据行，减少IO。

![image-20250107183211524](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20250107183211524.png)



## 创建索引需要注意什么？

[在 MySQL 中建索引时需要注意哪些事项？ - MySQL 面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1791003439968264194/question/1780933295459037187)

1. 索引不是越多越好，索引会占空间，且每次修改时可能需要维护索引的数据，消耗资源
2. 对于字段的值有大量重复的谨慎建立索引。比如性别，不绝对，定时任务状态可能需要
3. 长字段不应该建立索引。text、longtext，占内存大
4. 数据修改频率远大于查询频率。
5. 对于需要频繁作为查询条件的字段应该建立索引。如果有多个条件考虑建立联合索引
6. 经常在order by、group by、distinct后的字段建立索引。

## 索引一定有效吗？怎么排查索引效果？

[MySQL 中使用索引一定有效吗？如何排查索引效果？ - MySQL 面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1791003439968264194/question/1780933295463231490)

[如何使用 MySQL 的 EXPLAIN 语句进行查询分析？ - MySQL 面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1791003439968264194/question/1780933295509368833)

索引不一定有效

查询条件不包含索引列、查询条件复杂且不匹配索引的顺序、数据量小的表可能选择全表扫描

+ 使用联合索引但不符合最左前缀
+ 索引中使用了运算
+ 索引上使用了函数
+ like使用左侧占位符
+ or随意使用
+ 查询字段类型不匹配导致隐式转换
+ 不同的参数可能导致索引失效，特别是复杂查询（联表、子查询、需要回表）的情况
+ 表中两个不同字段进行比较
+ 使用order by，如果后面跟的不是主键或覆盖索引会导致索引失效

使用explain命令，查询mysql的执行计划，主要关注

select_type：SIMPLE(简单查询)/PRIMARY(主查询)/SUBQUERY(子查询)

type（访问类型）：查询使用的访问方法，ALL（全表扫描）、index、range、ref（非唯一索引）

key（使用的索引）：如果是NULL，就没使用索引

rows（扫描的行数）

Extra（额外信息）：using index（使用覆盖索引）、using where（使用where条件进行过滤）、using temporary（使用临时表）、using filesort（使用文件排序）



## mysql的B+树中查询数据的全过程

[请详细描述 MySQL 的 B+ 树中查询数据的全过程 - MySQL 面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1791003439968264194/question/1780933295471620098#heading-2)

1. 从根节点开始，根据比较数据键值与节点中存储的索引键值，确定数据在哪个区间，从上到下定位叶子节点

   ![image-20250108165951936](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20250108165951936.png)

2. 叶子节点存储实际的数据行记录，但是一页有16KB,存储的数据不止一条

3. 叶子节点中数据行以组的形式划分，利用页目录结构，通过二分查询可定位到对于的组

   ![image-20250108170015126](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20250108170015126.png)

4. 定位组后，利用链表遍历找到对应的数据行

## 选择B+树作为索引结构？

[为什么 MySQL 选择使用 B+ 树作为索引结构？ - MySQL 面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1791003439968264194/question/1780933295475814402#heading-0)

1. 高效的查找性能：自平衡树，每个叶子节点到根节点的路径长度相同，插入和删除时会进行分裂和合并，保持树的平衡
2. 树的高度增长不会过快，使得查询磁盘I/O次数减少：非叶子节点仅保存主键或索引值和页面指针，使得每一页能容纳更多的记录
3. 范围查询能力强：叶子节点通过链表连接，从根节点定位到叶子节点查询到范围起点后，只需要顺序扫描链表即可遍历后续数据

## mysql事务隔离级别

[MySQL 中的事务隔离级别有哪些？ - MySQL 面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1791003439968264194/question/1780933295492591617)

[MySQL 默认的事务隔离级别是什么？为什么选择这个级别？ - MySQL 面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1791003439968264194/question/1780933295492591618#heading-0)

1. 读未提交：可能导致脏读
2. 读已提交：可能导致不可重复读（同一事务多次查询返回不同的结果）
3. 可重复读（默认）：可能幻读（同一事务多次查询返回不同数量的行）
4. 串行化：相当于单线程执行，大大降低并发性能

兼容早期的binlog的statement格式问题，如果使用读未提交或读已提交会导致主从数据库数据不一致



## mysql发生死锁怎么解决？

[MySQL 中如果发生死锁应该如何解决？ - MySQL 面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1791003439968264194/question/1780933295505174531#heading-2)

有死锁检测机制，会自动回滚持有资源最少的事务

锁等待超时参数，获取锁的等待时间超过阈值，就会释放锁进行回滚

手动kill掉死锁的事务

```mysql
-- 查询当前正在执行的事务和锁信息
show engine innodb status

-- 查询当前锁和锁的等待情况
select * from information_schema.Innodb_locks
select * from information_schema.Innodb_lock_waits

通过information_schema的innodb_trx找到事务id和线程id的对应关系

kill <thread_id>

MySQL 8.0后

-- 查看当前的锁等待
SELECT * FROM performance_schema.data_lock_waits;

-- 查看更详细的锁信息
SELECT * FROM performance_schema.data_locks;

-- 查看当前事务信息
SELECT * FROM information_schema.innodb_trx;

-- 查看具体的阻塞情况
SELECT 
    waiting_pid AS '等待进程',
    waiting_query AS '等待SQL',
    blocking_pid AS '阻塞进程',
    blocking_query AS '阻塞SQL',
    wait_age AS '等待时间',
    locked_table AS '被锁表'
FROM sys.innodb_lock_waits;
```



## count(*)、count(1)、count(字段名)有什么区别

[MySQL 中 count(*)、count(1) 和 count(字段名) 有什么区别？ - MySQL 面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1791003439968264194/question/1780933295513563137#heading-0)

count(*)：统计表中所有行的数量，包含null

count(1)：there is no performance difference，统计表中所有行的数量，包含null

count(字段名)：统计指定字段不为null的行数。全表扫描，有索引则使用，正常情况下需要判断是否为空，但如果不为空，如是主键，理论上也差不多

