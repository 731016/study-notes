[TOC]



## 面向对象特征

抽象：找出事物的相似之处，将其归咎成一个类

封装：将类的属性和方法用访问修饰符保护起来，提供公共的方法去操作。

继承：一个类继承另一个类中可以被继承的属性和方法，子类可以修改或增加新的属性和方法。

多态：

- **子类继承父类**
- **子类重写父类的方法**
- **父类引用指向子类对象**

程序中定义的引用变量所指向的具体类型和通过该引用变量发出的方法调用在编译时并不确定，而是在程序运行期间才确定。

## 作用域public,private,protected,以及不写时的区别？

| 访问修饰符           | 同一个类 | 同一个包，子类 | 不同包-子类 | 不同包-非子类 |
| -------------------- | -------- | -------------- | ----------- | ------------- |
| `public` 公共的      | ✅        | ✅              | ✅           | ✅             |
| `protected` 受保护的 | ✅        | ✅              | ✅           |               |
| 默认(`default`)      | ✅        | ✅              |             |               |
| `private` 私有的     | ✅        |                |             |               |

## int 和Integer 有什么区别?

int是java的基本数据类型，默认为0。

Integer是int的包装类型，默认为null。

## &和&&的区别？

&除了是位运算符，不具有短路的效果，(3>2 &3<2) 为false

&& 是逻辑运算符and，且有短路效果，(3>2 && 3<2)true

## 简述逻辑操作(&,|,^)与条件操作(&&,||)的区别？

条件操作只能操作布尔型的,而逻辑操作不仅可以操作布尔型,而且可以操作数值型

逻辑操作不会产生短路

| &    | 与   | 两个位都为1时，结果才为1 |
| ---- | ---- | ------------------------ |
| \|   | 或   | 两个位都为0时，结果才为0 |
| ^    | 异或 | 两个位相同为0，相异为1   |

## heap 和stack 有什么区别？

heap 堆 先进后出

stack 栈 先进先出

## 在JAVA 中，如何跳出当前的多重嵌套循环？

在最外层循环前加label 标识,然后用break:label 方法即可跳出多重循环。或者在外层循环加boolean判断

## 构造器Constructor 是否可被override?

构造器Constructor 不能被继承，因此不能重写Overriding，但可以被重载Overload。

## 当一个对象被当作参数传递到一个方法后，此方法可改变这个对象的属性，并可返回变化后的结果，那么这里到底是值传递还是引用传递?

是值传递。Java 编程语言只有值传递参数。当一个对象实例作为一个参数被传递到方法中时，参数的值就是对该对象的引用。对象的内容可以在被调用的方法中改变，但对象的引用是永远不会改变的。

## 我们在web 应用开发过程中经常遇到输出某种编码的字符，如iso8859-1等，如何输出一个某种编码的字符串？

```java
new String(str.getBytes("ISO-8859-1"), "GBK");
```

## String, StringBuffer StringBuilder 的区别

String：存储字符串，使用final修饰，不可变，所有的操作都是返回新的字符串，底层采用byte数组(1.8+)

StringBuffer：可变字符串，对同一个字符串进行操作，采用缓冲区，默认大小16，线程安全

StringBuilder：可变字符串，线程不安全

## Overload 和Override 的区别。Overloaded 的方法是否可以改变返回值的类型?

如果在子类中定义某方法与其父类有相同的名称和参数，我们说该方法被重写(Overriding)。

如果在一个类中定义了多个同名的方法，它们或有不同的参数个数或有不同的参数类型，则称为方法的重载(Overloading)。

**Overloaded 的方法是可以改变返回值的类型**。

## 描述一下JVM 加载class 文件的原理机制?

JVM 中类的装载是由ClassLoader 和它的子类来实现的,Java ClassLoader是一个重要的Java 运行时系统组件。它负责在运行时查找和装入类文件的类。

## abstract class 和interface 有什么区别?

从**<u>多态</u>**上来说：

1. 一个类可以**实现**多个接口，但只能**继承**一个抽象类。

在**<u>方法</u>**上：

1. 抽象类可以有**构造方法**，接口中不能有构造方法。

2. 抽象类中可以包含**非抽象的普通方法**，接口中的所有方法必须都是抽象的，不能有非抽象的普通方法。

3. 抽象类中可以包含**静态方法**，<del>接口中不能包含静态方法 </del>(jdk8加入)

   ![image-20211124223730577](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/image-20211124223730577.png)

在**<u>成员变量和访问修饰符</u>**上：

1. 抽象类中可以有**普通成员变量**，接口中没有普通成员变量 

2. 抽象类和接口中都可以包含**静态成员变量**，抽象类中的静态成员变量的访问类型可以任意，但接口中定义的变量只能是public static final类型，并且默认即为public static final类型。 

## 接口是否可继承接口? 抽象类是否可实现(implements)接口? 抽象类是否可继承实体类

接口可以继承接口。抽象类可以实现(implements)接口，抽象类可继承实体类，但前提是实体类必须有明确的**构造函数**。

## 数据类型之间的转换

```
    1)如何将数值型字符转换为数字？

​    2)如何将数字转换为字符？

​    3)如何取小数点前两位并四舍五入?
```

1)调用数值类型相应包装类中的方法`parse(String)`或`valueOf(String)`即可返回相应基本类型或包装类型数值；

2)将数字与空字符串相加即可获得其所对应的字符串;另外对于基本类型数字还可调用`String 类中的valueOf(…)`方法返回相应字符串,而对于包装类型数字则可调用其`toString()`方法获得相应字符串；

3)可用该数字构造一`java.math.BigDecimal` 对象和`java.text.DecimalFormat`,再设置舍入模式进行四舍五入到保留小数点后两位,再将其转换为字符串截取最后两位。

```
import java.math.BigDecimal;
import java.math.RoundingMode;模式
import java.text.DecimalFormat;
```

```java
@Test
    public void Test2() {
        /**
         * 1、ROUND_UP：向远离零的方向舍入。
         *
         *         若舍入位为非零，则对舍入部分的前一位数字加1；若舍入位为零，则直接舍弃。即为向外取整模式。
         *
         * 2、ROUND_DOWN：向接近零的方向舍入。
         *
         *         不论舍入位是否为零，都直接舍弃。即为向内取整模式。
         *
         * 3、ROUND_CEILING：向正无穷大的方向舍入。
         *
         *         若 BigDecimal 为正，则舍入行为与 ROUND_UP 相同；若为负，则舍入行为与 ROUND_DOWN 相同。即为向上取整模式。
         *
         * 4、ROUND_FLOOR：向负无穷大的方向舍入。
         *
         *         若 BigDecimal 为正，则舍入行为与 ROUND_DOWN 相同；若为负，则舍入行为与 ROUND_UP 相同。即为向下取整模式。
         *
         * 5、ROUND_HALF_UP：向“最接近的”整数舍入。
         *
         *         若舍入位大于等于5，则对舍入部分的前一位数字加1；若舍入位小于5，则直接舍弃。即为四舍五入模式。
         *
         * 6、ROUND_HALF_DOWN：向“最接近的”整数舍入。
         *
         *         若舍入位大于5，则对舍入部分的前一位数字加1；若舍入位小于等于5，则直接舍弃。即为五舍六入模式。
         *
         * 7、ROUND_HALF_EVEN：向“最接近的”整数舍入。
         *
         *         若（舍入位大于5）或者（舍入位等于5且前一位为奇数），则对舍入部分的前一位数字加1；
         *
         *         若（舍入位小于5）或者（舍入位等于5且前一位为偶数），则直接舍弃。即为银行家舍入模式。
         *
         * 8、ROUND_UNNECESSARY
         *
         *         断言请求的操作具有精确的结果，因此不需要舍入。
         *
         *         如果对获得精确结果的操作指定此舍入模式，则抛出ArithmeticException。
         */
        double a = 21.2464;
        DecimalFormat df = new DecimalFormat("#.00");
        df.setRoundingMode(RoundingMode.HALF_UP);
        double parseDouble = Double.parseDouble(df.format(a));
        System.out.println(parseDouble);

        BigDecimal bd =new BigDecimal(a);
        double bigDecimal = bd.setScale(2, RoundingMode.HALF_UP).doubleValue();
        System.out.println(bigDecimal);

    }
```

## 字符串操作：如何实现字符串的反转及替换？

```
StringBuffer，StringBulider都包含反转和替换的方法
String有替换的方法
```



## 写一个函数，要求输入一个字符串和一个字符长度，对该字符串进行分隔。

```java
@Test
    public void Test4() {
        String str = "hello world";
        String[] split = split(str, 2);
        System.out.println(Arrays.toString(split));
    }

    public String[] split(String str, int chars) {
        int index = 0;
        StringBuilder sb = new StringBuilder();
//        最大下标不能大于数组长度-1,数组长度从1开始
        while (index < str.length() - 1) {
//            endIndex下标不包含那个数,起始下标每次+2，结束下标每次加2
            sb.append(str.substring(index, index + chars));
            sb.append(",");
            index += 2;
        }
        String hanleStr = String.valueOf(sb);
        String[] split = hanleStr.split(",");
        return split;
    }
```

## 编码转换：怎样将GB2312 编码的字符串转换为ISO-8859-1 编码的字符串？

```java
@Test
    public void Test5() throws UnsupportedEncodingException {
        String str = "你好，世界！";
//        utf8->gbk
        String gbk = new String(str.getBytes("UTF-8"), "GBK");
        System.out.println(gbk);
//        gbk->utf-8
        String utf8 = new String(gbk.getBytes("GBK"), "UTF-8");
        System.out.println(utf8);

    }
```

![image-20211124223746838](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/image-20211124223746838.png)

## 写一个函数，2 个参数，1 个字符串，1 个字节数，返回截取的字符串，要求字符串中的中文不能出现乱码：如（“我ABC”，4）应该截为“我AB”，输入（“我ABC 汉DEF”，6）应该输出为“我ABC”而不是“我ABC+汉的半个”。

```java
public String subString(String str, int subBytes) {
        int bytes = 0; // 用来存储字符串的总字节数
        for (int i = 0; i < str.length(); i++) {
//            计算后的bytes与字节数相等，截取是的index正好是对应的下标
            if (bytes == subBytes) {
                return str.substring(0, i);
            }
//            返回对应index的char值
            char c = str.charAt(i);
            if (c < 256) {
                bytes += 1; // 英文字符的字节数看作1
            } else {
                bytes += 2; // 中文字符的字节数看作2
                // 当要截取的最后一个是中文时，+2会超过要截取的字节数，上面的判断条件会不满足，要满足不能出现乱码，多要丢掉
                // 此时直接截取
                if(bytes - subBytes == 1){
                    return str.substring(0, i);
                }
            }
        }
        return str;
    }
    @Test
    public void Test6(){
//        String def1 = subString("我ABC 汉DEF", 8);
        String def2 = subString("我A汉BC汉DEF", 4);
//        System.out.println(def1);
        System.out.println(def2);
    }
```

![image-20211124223759087](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/image-20211124223759087.png)

## **日期和时间**

```java
public String getDate(int flag) {
        Calendar calendar = Calendar.getInstance();

        // 取得年月日、小时分秒
        int year = calendar.get(Calendar.YEAR);
        int month = calendar.get(Calendar.MONTH);
        int day = calendar.get(Calendar.DATE);
        int hour = calendar.get(Calendar.HOUR);
        int minute = calendar.get(Calendar.MINUTE);
        int second = calendar.get(Calendar.SECOND);
        // 如何取得从1970 年到现在的毫秒数
        long timeInMillis = calendar.getTimeInMillis();

        // 如何取得某个日期是当月的最后一天
        /*
         *  DAY_OF_MONTH 指示月份中的某天
         * 设置 此值为该月的最大天数
         * */
        calendar.set(Calendar.DAY_OF_MONTH, calendar.getActualMaximum(calendar.DAY_OF_MONTH));
        String day_of_month = String.valueOf(calendar.get(Calendar.DAY_OF_MONTH));

        // 如何格式化日期
        Date date = new Date();
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String format = df.format(date);

        // 昨天的当前时刻
        // 今天的时间-1
        calendar.set(Calendar.DATE, -1);
        Date time = calendar.getTime();
        String formatTime = df.format(time);

        switch (flag) {
            case 1:
                return year + "年" + month + "月" + day + "日" + hour + "时" + minute + "分" + second + "秒";
            case 2:
                return String.valueOf(timeInMillis);
            case 3:
                return day_of_month;
            case 4:
                return format;
            case 5:
                return formatTime;
        }
        return null;
    }

    @Test
    public void Demo1() {
//        java.util.Calendar
//        1)如何取得年月日、小时分秒？
        System.out.println(getDate(1));
//        2)如何取得从1970 年到现在的毫秒数？
        System.out.println(getDate(2));
//        3)如何取得某个日期是当月的最后一天？
        System.out.println(getDate(3));
//        4)如何格式化日期？
        System.out.println(getDate(4));
        // 昨天的当前时刻
        System.out.println(getDate(5));
    }
```

## error和exception有什么区别

`error`是系统中的错误，程序员是不能改变的和处理的，是在程序编译时出现的错误，只能通过修改程序才能修正。一般是指与虚拟机相关的问题，如系统崩溃，虚拟机错误，内存空间不足，方法调用栈溢等。对于这类错误的导致的应用程序中断，仅靠程序本身无法恢复和和预防，遇到这样的错误，建议让程序终止。

`exception`表示程序可以处理的异常，可以捕获且可能恢复。遇到这类异常，应该尽可能处理异常，使程序恢复运行，而不应该随意终止异常。

## ArrayList和Vector的区别

这两个类都实现了**List接口**（List接口继承了Collection接口），他们都是**有序集合**，即存储在这两个集合中的元素的位置都是有顺序的，可以按位置**索引**号取出某个元素，并且其中的数据是**允许重复**的。

主要包括两个方面：

（1）同步性： **Vector是线程安全的**，也就是说是它的方法之间是线程同步的，而ArrayList是线程序不安全的，它的方法之间是线程不同步的。

（2）数据增长： ArrayList与Vector都有一个初始的容量大小，当存储进它们里面的元素的个数超过了容量时，就需要增加ArrayList与Vector的存储空间，每次要增加存储空间时，不是只增加一个存储单元，而是增加多个存储单元，每次增加的存储单元的个数在内存空间利用与程序效率之间要取得一定的平衡。**Vector默认增长为原来两倍**，而ArrayList的增长策略在文档中没有明确规定（从**源代码看到的是增长为原来的1.5倍**）。ArrayList与Vector都可以设置初始的空间大小，**Vector还可以设置增长的空间大小**，而**ArrayList没有提供设置**增长空间的方法。 

总结：即Vector增长原来的一倍，ArrayList增加原来的0.5倍。

## 说出ArrayList, Vector, LinkedList的存储性能和特性

`ArrayList`和`Vector`都是使用**数组方式存储数据**，此数组元素数大于实际存储的数据以便增加和插入元素，它们都允许**直接按序号索引元素**，但是插入元素要涉及数组元素移动等内存操作，所以<u>索引数据快而插入数据慢</u>，Vector由于使用了`synchronized方法`（线程安全），通常性能上较ArrayList差，而LinkedList使用**双向链表**实现存储，按序号索引数据**需要进行前向或后向遍历**，但是插入数据时只需要记录本项的前后项即可，所以**插入速度较快**。

## Collection 和 Collections的区别

Collection是**集合类的上级接口**，继承与他的接口主要有Set、Queue 和List.
Collections是针对**集合类的一个工具类**，他提供一系列静态方法实现对各种集合的搜索、排序、线程安全化等操作。

## Set里的元素是不能重复的，那么用什么方法来区分重复与否呢? 是用==还是equals()? 它们有何区别

Set里的元素是不能重复的，用`equals()`判断两个Set是否相等
**==是用来判断两者是否是同一对象（同一事物），而equals是用来判断是否引用同一个对象**

因为set里面存放的是对象的引用，所以当两个元素只要满足了equals()时就已经指向同一个对象，也就出现了重复元素。

## HashMap和Hashtable的区别

HashMap是Hashtable的轻量级实现（非线程安全的实现），他们都完成了**Map接口**，主要区别在于

由于非线程安全，HashMap允许将null作为一个entry的key或者value，而**Hashtable不允许**。 

HashMap把Hashtable的contains方法去掉了，改成**containsvalue和containsKey**。

Hashtable继承自**Dictionary**类，而HashMap是Java1.2引进的Map interface的一个实现。

最大的不同是，**Hashtable的方法是Synchronized的**，而HashMap不是。 

Hashtable和HashMap采用的hash/rehash算法都大概一样，所以性能不会有很大的差异。 

## java中有几种类型的流？JDK为每种类型的流提供了一些抽象类以供继承，请说出他们分别是哪些类？

字节流，字符流。字节流继承于`InputStream`、`OutputStream`，字符流继承于`InputStreamReader`、`OutputStreamWriter`。

## 文件读写的基本类

`FileReader`类和`FileWriter`类分别继承自**Reader**类和**Writer**类。FileReader类用于读取文件，File Writer类用于将数据写入文件，这两各类在使用前，都必须要调用其构造方法创建相应的对象，然后调用相应的`read()`或`write()`方法。

## 多线程有几种实现方法,都是什么?同步有几种实现方法,都是什么?

个人觉得实现多线程有4种方法，想要同步也有4种

> **多线程**
>
> （1）继承`Thread`
>
> （2）实现`Runnable` 无返回值
>
> （3）实现`Callable` 有返回值
>
> （4）线程池 `Executors`工厂类、`ExecutorService`接口执行任务、`ThreadPoolExecutor`构造方法自定义线程池
>
> ```java
> public static ExecutorService newFixedThreadPool(int nThreads)
> 创建一个可重用固定线程数的线程池，以共享的无界队列方式来运行这些线程。
> 
> public static ExecutorService newCachedThreadPool(ThreadFactory threadFactory)
> 创建一个可根据需要创建新线程的线程池，但是在以前构造的线程可用时将重用它们
> 
> public static ScheduledExecutorService newScheduledThreadPool(int corePoolSize)
> 创建一个线程池，可以调度命令在给定的延迟后运行，或者定期执行。
> 
> public static ExecutorService newSingleThreadExecutor(ThreadFactory threadFactory)
> 返回一个线程池（这个线程池只有一个线程 ）,这个线程 池可以在线程死后（或发生异常时）重新启动一个线程来替代原来的线程继续执行下去！
> 
> ScheduledExecutorService scheduledPool= Executors.newXXXX(corePoolSize);
> ```
>
> ```java
> public interface ExecutorService
> 用来从线程池中获取线程，调用start方法，并执行任务
> 
> ExecutorService pool= Executors.newFixedThreadPool(3);
> ```
>
> ```java
> public ThreadPoolExecutor(int corePoolSize, 
>                        int maximumPoolSize, 
>                        long keepAliveTime, 
>                        TimeUnit unit, 
>                        BlockingQueue<Runnable> workQueue, 
>                        ThreadFactory threadFactory, 
>                        RejectedExecutionHandler handler);
> 1. corePoolSize：指定了线程池中的线程数量。
> 2. maximumPoolSize：指定了线程池中的最大线程数量。
> 3. keepAliveTime：当前线程池数量超过 corePoolSize 时，多余的空闲线程的存活时间，即多次时间内会被销毁。
> 4. unit：keepAliveTime 的单位。
> 5. workQueue：任务队列，被提交但尚未被执行的任务。
> 6. threadFactory：线程工厂，用于创建线程，一般用默认的即可。
> 7. handler：拒绝策略，当任务太多来不及处理，如何拒绝任务。
> 
> JDK 内置的拒绝策略如下： new ThreadPoolExecutor XXXXXXXX()
> 1. AbortPolicy ： 直接抛出异常，阻止系统正常运行。
> 2. CallerRunsPolicy ： 只要线程池未关闭，该策略直接在调用者线程中，运行当前被丢弃的任务。显然这样做不会真的丢弃任务，但是，任务提交线程的性能极有可能会急剧下降。
> 3. DiscardOldestPolicy ： 丢弃最老的一个请求，也就是即将被执行的一个任务，并尝试再次提交当前任务。
> 4. DiscardPolicy ： 该策略默默地丢弃无法处理的任务，不予任何处理。如果允许任务丢失，这是最好的一种方案。
> 以上内置拒绝策略均实现了 RejectedExecutionHandler 接口，若以上策略仍无法满足实际需要，完全可以自己扩展 RejectedExecutionHandler 接口。
> ```
>
> 
>
> **同步**
>
> （1）同步方法 synchronized,wait与notify
>
> ```java
> 修饰词 synchronized 返回值 方法名称(参数){}
> ```
>
> （2）同步代码块
>
> ```java
> synchronized(锁对象){
>   可能发生安全问题的代码
> }
> ```
>
> （3）锁机制
>
> ```java
> ReentrantLock 可重入s
> ReadLock 读锁
> WriteLock 写锁
> ```
>
> ```java
> ReentrantLock lock=new ReentrantLock(); //可重入锁
> lock.lock();
> lock.unlock();
> ------------------------------------------------------
> /*
>     初始化可重入锁
> */
> final Lock lock = new ReentrantLock();
> // 设置条件 等待通知组件
> final Condition reachThreeCondition = lock.newCondition();
> // 加锁
> lock.lock();
> try {
>         reachThreeCondition.await(); // 等待
>         reachThreeCondition.signal(); // 通知等待该条件的线程可以执行
> }finally {
>     // 释放锁
>      lock.unlock();
> }
> ```

## 当一个线程进入一个对象的一个synchronized方法后，其它线程是否可进入此对象的其它方法?

1.其他方法前是否加了synchronized关键字，如果**没加**，则**能**。

2.如果这个方法**内部调用了wait**，则可以进入其他synchronized方法。

3.如果其他个方法<u>都加了synchronized关键字，并且内部没有调用wait</u>，则不能。

4.如果其他方法是<u>static</u>，它用的同步锁是当前类的字节码，与非静态的方法不能同步，因为非静态的方法用的是this。

## 线程的基本概念、线程的基本状态以及状态之间的关系

+ **<u>线程的基本概念</u>**

进程是**程序的一次执行**，是**系统资源分配与调动的基本单位**，使程序能够**并发执行**

因为进程的创建、销毁、切换产生大量的时间和空间开销，进程的数量不能太多，线程是比**进程更小的能独立运行的基本单位，是进程的一个实体**

线程基本不占用系统资源，只运行必不可少的资源（程序计数器，寄存器，栈）

进程占用堆、栈

+ **<u>线程的基本状态</u>**

1. **新建状态（`NEW`）**：当程序使用 `new 关键字`创建了一个线程之后，该线程就处于新建状态，此时仅由 JVM 为其分配内存，并初始化其成员变量的值
2. **就绪状态（`RUNNABLE`）**：当线程对象调用了 `start()`方法之后，该线程处于就绪状态。Java 虚拟机会为其创建方法调用栈和程序计数器，等待调度运行。
3. **运行状态（`RUNNING`）**：如果处于就绪状态的线程`获得了 CPU`，开始执行 run()方法的线程执行体，则该线程处于运行状态。
4. **阻塞状态（`BLOCKED`）**：阻塞状态是指线程因为某种原因放弃了 cpu 使用权，也即让出了 cpu timeslice，暂时停止运行。直到线程进入可运行(runnable)状态，才有机会再次获得 cpu timeslice 转到运行(running)状 态。阻塞的情况分三种：

> **等待阻塞（o.wait->等待对列）**： 运行(running)的线程执行 o.`wait()`方法，JVM 会把该线程放入**等待队列**(waitting queue)中。 
>
> **同步阻塞(lock->锁池)** 运行(running)的线程在获取对象的同步锁时，若该同步锁被别的线程占用，则 JVM 会把该线程放入**锁池**(lock pool)中。 
>
> **其他阻塞(sleep/join)** 运行(running)的线程执行 Thread.`sleep`(long ms)或 t.`join()`方法，或者发出了 I/O 请求时，JVM 会把该线程置为阻塞状态。当 sleep()状态超时、join()等待线程终止或者超时、或者 I/O 处理完毕时，线程重新转入可运行(runnable)状态。

5. **线程死亡（`DEAD`）**：

线程会以下面三种方式结束，结束后就是死亡状态。

> **正常结束**
>
> ​	`run()`或 `call()`方法执行完成，线程正常结束。
>
> **异常结束**
>
> ​	线程抛出一个`未捕获的 Exception 或 Error`。
>
> 
>
> ​	调用 `stop`
>
> ​	直接调用该线程的 stop()方法来结束该线程—该方法通常容易导致死锁，不推荐使用。

+ **<u>线程的基本状态之间的关系</u>**

调用线程的`start`方法后线程进入**就绪状态**，

`线程调度`系统将就绪状态的线程转为**运行状态**，

遇到`synchronized`语句时，由运行状态转为**阻塞**，

当synchronized`获得锁`后，由阻塞转为**运行**，

在这种情况可以调用`wait`方法转为**挂起**状态，

当线程关联的**代码执行完后**，线程变为结束状态。

![image-20211124223832750](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/image-20211124223832750.png)

## sleep() 和 wait() 有什么区别?

sleep是线程类（`Thread`）的方法，导致此线程暂停执行指定时间，给执行机会给其他线程，但是监控状态依然保持，到时后会自动恢复。调用sleep**不会释放对象锁**。
 wait是`Object`类的方法，对此对象调用wait方法导致本线程**放弃对象锁**，进入等待此对象的等待队列，只有针对此对象发出notify方法（或notifyAll）后本线程才进入对象锁池准备获得对象锁进入运行状态。

## socket通信（tcp/udp区别及JAVA的实现方式）

TCP:**面向连接的协议** 。在传输数据之前，在发送端和接收端建立逻辑联系，再传输数据，提供了两台计算机之间可靠无差错的数据传输。

UDP:用户数据报协议，是一个**面向无连接的协议** 。传输数据时不需要建立连接，不管对方服务是否启动，直接将数据、数据源和目的地都封装到数据包中，直接发送传输速度快，容易丢包。

## 什么是java序列化，如何实现java序列化？

https://blog.csdn.net/qq_41666142/article/details/120471586?spm=1001.2014.3001.5501

为了把对象的成员属性和成员方法进行持久化的保存，需要把**对象转换为字节序列**，以便于存储

1. **实现序列化的对象需要实现一个标记接口，并且给这个添加一个Long类型的标记**
2. 使用`ObjectOutputStream`类`writeObject()`方法写入对象
3. 要读取时，使用`ObjectInputStream`类的`readObject()`方法
