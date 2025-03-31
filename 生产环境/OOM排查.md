[怎么分析 JVM 当前的内存占用情况？OOM 后怎么分析？ - 后端场景面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1795650132375805954/question/1818990174270726145#heading-0)



## jstat

```sh
jstat -gc <pid> 1000 10
```

![image-20250331093434738](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20250331093434738.png)

```sh
 S0C    S1C    S0U    S1U      EC       EU        OC         OU       MC       MU       CCSC    CCSU     YGC     YGCT     FGC    FGCT     GCT
1536.0 1536.0  0.0    0.0    30720.0   1024.0  708608.0    2048.0   44800.0  43712.6   4864.0  4096.0      4    0.072   1      0.015    0.087
1536.0 1536.0  0.0    0.0    30720.0   2048.0  708608.0    2048.0   44800.0  43712.6   4864.0  4096.0      4    0.072   1      0.015    0.087
1536.0 1536.0  0.0    0.0    30720.0   3072.0  708608.0    2048.0   44800.0  43712.6   4864.0  4096.0      4    0.072   1      0.015    0.087
```

![image-20250331093503071](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20250331093503071.png)



## jmap

```sh
jmap -heap <pid>
```

```sh
Attaching to process ID 1234, please wait...
Debugger attached successfully.
Server compiler detected.
JVM version is 25.131-b11

using parallel threads in the new generation.
using thread-local object allocation.
Concurrent Mark-Sweep GC

Heap Configuration:
   MinHeapFreeRatio         = 40
   MaxHeapFreeRatio         = 70
   MaxHeapSize              = 1048576000 (1000.0MB)
   NewSize                  = 1310720 (1.25MB)
   MaxNewSize               = 17592186044415 MB
   OldSize                  = 8388608 (8.0MB)
   NewRatio                 = 2
   SurvivorRatio            = 8
   MetaspaceSize            = 21807104 (20.796875MB)
   CompressedClassSpaceSize = 1073741824 (1024.0MB)
   MaxMetaspaceSize         = 17592186044415 MB
   G1HeapRegionSize         = 0 (0.0MB)

Heap Usage:
New Generation (Eden + 1 Survivor Space):
   capacity = 46989312 (44.8125MB)
   used     = 14364528 (13.697036743164062MB)
   free     = 32624784 (31.115463256835938MB)
   30.57471507400737% used
Eden Space:
   capacity = 41943040 (40.0MB)
   used     = 12058624 (11.5MB)
   free     = 29884416 (28.5MB)
   28.769444942474365% used
From Space:
   capacity = 5036288 (4.8046875MB)
   used     = 2305904 (2.1997528076171875MB)
   free     = 2730384 (2.6049346923828125MB)
   45.8012652387619% used
To Space:
   capacity = 5036288 (4.8046875MB)
   used     = 0 (0.0MB)
   free     = 5036288 (4.8046875MB)
   0.0% used
concurrent mark-sweep generation:
   capacity = 100663296 (96.0MB)
   used     = 1433600 (1.3671875MB)
   free     = 99229696 (94.6328125MB)
   1.4241612307230632% used

10764 interned Strings occupying 826944 bytes.
```

![image-20250331093541171](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20250331093541171.png)

## arthas

```sh
$ dashboard
ID     NAME                   GROUP          PRIORI STATE  %CPU    TIME   INTERRU DAEMON
17     pool-2-thread-1        system         5      WAITIN 67      0:0    false   false
27     Timer-for-arthas-dashb system         10     RUNNAB 32      0:0    false   true
11     AsyncAppender-Worker-a system         9      WAITIN 0       0:0    false   true
9      Attach Listener        system         9      RUNNAB 0       0:0    false   true
3      Finalizer              system         8      WAITIN 0       0:0    false   true
2      Reference Handler      system         10     WAITIN 0       0:0    false   true
4      Signal Dispatcher      system         9      RUNNAB 0       0:0    false   true
26     as-command-execute-dae system         10     TIMED_ 0       0:0    false   true
13     job-timeout            system         9      TIMED_ 0       0:0    false   true
1      main                   main           5      TIMED_ 0       0:0    false   false
14     nioEventLoopGroup-2-1  system         10     RUNNAB 0       0:0    false   false
18     nioEventLoopGroup-2-2  system         10     RUNNAB 0       0:0    false   false
23     nioEventLoopGroup-2-3  system         10     RUNNAB 0       0:0    false   false
15     nioEventLoopGroup-3-1  system         10     RUNNAB 0       0:0    false   false
Memory             used   total max    usage GC
heap               32M    155M  1820M  1.77% gc.ps_scavenge.count  4
ps_eden_space      14M    65M   672M   2.21% gc.ps_scavenge.time(m 166
ps_survivor_space  4M     5M    5M           s)
ps_old_gen         12M    85M   1365M  0.91% gc.ps_marksweep.count 0
nonheap            20M    23M   -1           gc.ps_marksweep.time( 0
code_cache         3M     5M    240M   1.32% ms)
Runtime
os.name                Mac OS X
os.version             10.13.4
java.version           1.8.0_162
java.home              /Library/Java/JavaVir
                       tualMachines/jdk1.8.0
                       _162.jdk/Contents/Hom
                       e/jre
```

![image-20250331093637670](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20250331093637670.png)



## OOM分析

### 1.使用jmap生成堆转储文件

```sh
jmap -dump:format=b,file=heap_dump.hprof <pid>
```

![image-20250331093743794](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20250331093743794.png)

```sh
-XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=/tmp/heapdump.hprof
```

### 2.使用工具分析堆转储文件

![image-20250331093827101](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20250331093827101.png)

#### mat

![image-20250331093903437](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20250331093903437.png)

![image-20250331093916728](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20250331093916728.png)

![image-20250331093928007](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20250331093928007.png)

![image-20250331093938358](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20250331093938358.png)

![image-20250331093950692](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20250331093950692.png)

找出最终的引用对象

![image-20250331094010957](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20250331094010957.png)



#### GCeasy

[Universal JVM GC analyzer - Java Garbage collection log analysis made easy](https://gceasy.io/)