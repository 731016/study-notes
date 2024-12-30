[TOC]



## 有哪些集合类？

[Java 中有哪些集合类？请简单介绍 - Java 集合面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1788408712975282177/question/1780933294699868162#heading-3)

[Java 中的 LinkedHashMap 是什么？ - Java 集合面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1788408712975282177/question/1780933294783754241#heading-0)

[Java 中的 List 接口有哪些实现类？ - Java 集合面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1788408712975282177/question/1780933294708256769#heading-1)

[Java 中的 TreeMap 是什么？ - Java 集合面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1788408712975282177/question/1780933294796337153)

Collection接口：存储对象集合类

**List接口**

ArrayList：动态数组，查询快，插入删除慢

LinkedList：双向链表，查询慢，插入删除快

Vector：线程安全的动态数组，类似ArrayList

**Set接口**

HashSet：哈希表，无序，不重复

LinkedHashSet：链表+哈希表，维护插入顺序，不重复

TreeSet：基于红黑树，有序，不重复

**Queue接口**

LinkedList：作为队列使用，支持FIFO（先进先出）

PriorityQueue：优先堆，自然排序或指定比较器排序



**Map接口**：key-value键值对

hashMap：哈希表，无需，key不重复

LinkedHashMap：链表+哈希表，维护插入顺序，key不重复

TreeMap：红黑树，键值对有序，key不重复，key不能为null

ConcurrentHashMap：线程安全的哈希表，key和值不能为null



## 数组和链表的区别

[数组和链表在 Java 中的区别是什么？ - Java 集合面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1788408712975282177/question/1780933294704062466#heading-1)

[Java 中 ArrayList 和 LinkedList 有什么区别？ - Java 集合面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1788408712975282177/question/1839516705798356994)

**数组**

大小固定的连续存储空间

长度固定，扩展数组需要重新分配新的空间

可直接用下标访问

**链表**

不需要连续存储空间

扩展只需要使用指针存储新的地址空间，扩展方便

需要从头节点开始查找

额外占用空间存储指针，占用空间比数组大



## hashMap原理

[说说 Java 中 HashMap 的原理？ - Java 集合面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1788408712975282177/question/1834107117591187457)

[使用 HashMap 时，有哪些提升性能的技巧？ - Java 集合面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1788408712975282177/question/1821510409319555074)

[什么是 Hash 碰撞？怎么解决哈希碰撞？ - Java 集合面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1788408712975282177/question/1821481519536611330)

HashMap是基于哈希表的数据结构，用于存储键值对。将键的hash值映射到数组索引位置，通过数组+链表（jdk1.8以后是**数组+链表+红黑树**）来处理哈希冲突。

使用`hashcode()`计算hash值，通过indexFor()（jdk1.8以后使用`（n-1）& hash`）确定元素在数组中的存储位置。

默认初始容量16，负载因子0.75。当存储元素数量超过16 * 0.75 = 12 个时，触发扩容操作，容量 * 2 并重新分配元素位置。



优化当多个元素映射到同一个哈希桶时的查找性能，当链表长度>8，链表会转变为红黑树（自平衡二叉树）。树中元素<6，会转换回链表



jdk1.7之前链表插入使用头插法，发生hash冲突时，新节点总是插入到链表头部；在多线程环境下，可能形成环，特别是在并发扩容时

jdk1.8，改为尾插法，保持插入顺序



元素数量 > 容量 * 负载因子，触发扩容 * 2，会从新计算所有键的索引，耗时操作

+ 确定一个初始大小
+ 调整负载因子
+ hashcode均匀分布

保留插入顺序，使用LinkedHashMap

保证有序，使用TreeMap

线程安全，使用ConcurrentHashMap



hashcode冲突

+ 使用链表存储
+ 开放寻址
+ 重新计算hashcode

## concurrentHashMap1.7和1.8的区别

[Java 中 ConcurrentHashMap 1.7 和 1.8 之间有哪些区别？ - Java 集合面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1788408712975282177/question/1780933294813114369#heading-2)

[什么是 Java 的 CAS（Compare-And-Swap）操作？ - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/question/1780933295027023873)

**1.7**

使用分段锁，每一个segment是独立的，可并发访问，默认16

多个segment组成，每个segment包含一个hashmap。单独扩容

不加锁，三次获取有变化，重新加锁获取

**1.8**

移除segment，只在更新链表或红黑树节点使用synchronized锁住链表或树的头节点

增加红黑树

扩容整个hashmap，通过CAS操作确保线程安全，多个线程可逐步同时扩容

使用数组维护节点数量，使用CAS修改basecount，失败就选择countercell对象修改，basecount + 所有countercell



## concurrentHashMap的get方法是否需要加锁？

[Java 中 ConcurrentHashMap 的 get 方法是否需要加锁？ - Java 集合面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1788408712975282177/question/1780933294829891585#heading-3)

使用volatile，保证写入时，就算读取也能获取最新的数据



## concurrentHashMap不支持key或value为空？

[为什么 Java 的 ConcurrentHashMap 不支持 key 或 value 为 null？ - Java 集合面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1788408712975282177/question/1780933294834085890)

避免混淆，并发环境下，如果通过key获取value1为空，就不清楚真的是空还是值是空的情况



## HashMap和HashTable的区别

[Java 中的 HashMap 和 Hashtable 有什么区别？ - Java 集合面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1788408712975282177/question/1780933294720839681)

|           | 线程安全                       | 性能差异                  | 允许空值               | 继承结构                 | 迭代器类型           |
| --------- | ------------------------------ | ------------------------- | ---------------------- | ------------------------ | -------------------- |
| hashMap   | :x:                            | 单线程环境下优于hashTable | 1个nul key，多个null值 | AbstractMap，Map的实现类 | 快速失败的Iterator   |
| hashTable | :white_check_mark:synchronized | 低于hashMap               | 不允许null key和值     | Dictionary               | 弱一致性的Enumerator |

ConcurrentHashMap是HashTable的替代方案。通过分段锁提高了并发性能，读无锁，写使用局部分段锁



## ConcurrentHashMap和HashTable的区别

[ConcurrentHashMap 和 Hashtable 的区别是什么？ - Java 集合面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1788408712975282177/question/1854745940761190402)

都是线程安全的哈希表实现

hashtable：使用单一的synchronized锁对整个哈希表进行同步，效率低下

ConcurrentHashMap：CAS + synchronized 实现，如果node为空，使用cas将数据插入节点，如果不为空，使用synchronized锁定node的头节点



## hashset和hashmap的区别

[Java 中的 HashSet 和 HashMap 有什么区别？ - Java 集合面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1788408712975282177/question/1780933294729228289#heading-2)

hashset内部使用hashmap实现，hashset中的元素实际存储在hashmap的key中，value都是一个常量对象PRESENT

## CopyOnWriteArrayList和Collections.synchronizedList()的区别

[Java 的 CopyOnWriteArrayList 和 Collections.synchronizedList 有什么区别？分别有什么优缺点？ - Java 集合面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1788408712975282177/question/1821470164721016833#heading-0)

[Java 中的 CopyOnWriteArrayList 是什么？ - Java 集合面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1788408712975282177/question/1780933294838280194#heading-4)

**CopyOnWriteArrayList**

线程安全的List实现，特性：**写时复制**

增删改操作会复制一个新的底层数组。读操作不加锁（volatile 修饰的数组），写操作加锁

合适**读多写少**



**Collections.synchronizedList()**

一个包装方法，将任何List转换为线程安全的版本，对增删改查使用synchronized进行同步，保证线程安全

适合**临时**转换为线程安全的List使用



## ArrayList扩容机制

[Java ArrayList 的扩容机制是什么？ - Java 集合面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1788408712975282177/question/1839515038747066370#heading-0)

默认大小10，超过当前容量，触发扩展机制，创建新数组大小为原来的1.5倍（`int newCapacity = oldCapacity + (oldCapacity >> 1);`）使用copyOf()将原数组复制到新数组



## HashMap的扩容机制

[Java 中 HashMap 的扩容机制是怎样的？ - Java 集合面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1788408712975282177/question/1780933294750199809#heading-2)

[假设有一个 1G 大的 HashMap，此时用户请求过来刚好触发它的扩容，会怎样？让你改造下 HashMap 的实现该怎样优化？ - 后端场景面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1795650132375805954/question/1797473188553293825#heading-1)

基于负载因子决定。默认为0.75

默认扩容原大小的2次方，即2倍

在扩容时，并不是所有元素都需要重新计算哈希码。由于数组长度变为原来的两倍，新的数组索引计算方式为：

```java
int newIndex = (newTable.length - 1) & hash;
```

对于原来的哈希值`hash`，如果`(hash & oldCap) == 0`，那么在新数组中的索引位置不变；如果`(hash & oldCap)!= 0`，那么在新数组中的索引位置是原来的索引位置加上旧数组的容量。

这是因为数组长度翻倍后，新的索引计算实际上是在原来的基础上增加了一位判断。例如，假设原来数组长度为 8（二进制为`1000`），新数组长度为 16（二进制为`10000`）。原来的索引计算是`hash & 0111`，新的索引计算是`hash & 1111`。如果`hash`的第 4 位（从右往左，第 0 位是最低位）为 0，那么新的索引与原来相同；如果第 4 位为 1，那么新的索引就是原来的索引加上 8。



## hashmap扩容时使用2的n次方？

[为什么 HashMap 在 Java 中扩容时采用 2 的 n 次方倍？ - Java 集合面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1788408712975282177/question/1780933294754394113)

通过(n-1)&hash计算元素的存储索引位置，只有在数组容量是n^2才能确保索引均匀分布。**位运算的效率高于取模运算**，提高了hash运算的效率

i = (n-1)&hash，满足这个公式，当b=2的n次幂是，a%b = a&(b-1)



## hashmap负载因子默认0.75？

[为什么 Java 中 HashMap 的默认负载因子是 0.75？ - Java 集合面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1788408712975282177/question/1780933294758588418#heading-0)

时间复杂度和空间复杂度度的合理平衡

高并发读取场景：0.5空间利用率低，hash冲突少，查找效率高，频繁扩容

内存受限场景：1.0空间利用率高，哈希冲突概率大，降低查找效率



## 为什么jdk1.8对hashmap进行了红黑树的改动？

[为什么 JDK 1.8 对 HashMap 进行了红黑树的改动？ - Java 集合面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1788408712975282177/question/1780933294771171329#heading-0)

[JDK 1.8 对 HashMap 除了红黑树还进行了哪些改动？ - Java 集合面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1788408712975282177/question/1780933294775365634)

1.8之前使用链表解决hash冲突。当哈希冲突较多时，链表元素增多，查找、插入和删除的时间复杂度从O(1)->O(n)

使用红黑树，当数组长度>=64,链表长度>=8时，链表转化为红黑树；链表长度<6时，重新转换为链表；平衡二叉树，时间复杂度O(log n)

避免频繁树化，减少内存占用（红黑树需要额外指针和结构，红黑树节点大小是普通节点大小的两倍）



优化hash计算：扰动函数

扩容机制优化：不是所有元素都重新计算hashcode

头插法变为尾插法：避免多线程扩容操作出现环





