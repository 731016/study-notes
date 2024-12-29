[TOC]



## 什么是java序列化，如何实现java序列化？

https://blog.csdn.net/qq_41666142/article/details/120471586?spm=1001.2014.3001.5501

[Java 中的序列化和反序列化是什么？ - Java 基础面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1787463103423897602/question/1780933294448209922)

把对象转化成可传输的字节序列格式，以便于存储传输

1. **实现序列化的对象需要实现一个`Serializable`接口，并且给这个添加一个Long类型的`serialVersionUID`标记**，用于反序列化时验证版本一致性
2. 使用`ObjectOutputStream`类`writeObject()`方法写入对象
3. 要读取时，使用`ObjectInputStream`类的`readObject()`方法
4. 静态变量和transient修饰的变量不能序列化

## 什么是不可变类？

[什么是 Java 中的不可变类？ - Java 基础面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1787463103423897602/question/1780933294456598529)

创建后对象的属性不能修改。

1. 类被final修饰
2. 所有字段都是final和private
3. 通过构造函数初始化
4. 不对外提供修改对象状态的方法
5. 类包含其它可变对象的引用，确保在外部无法修改

## error和exception有什么区别

[Java 中 Exception 和 Error 有什么区别？ - Java 基础面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1787463103423897602/question/1780933294469181442)

都是`Throwable`的子类，表示程序运行时发生的异常或错误

`Exception`：程序可以处理的异常，可以通过代码恢复或处理

checked exception（编译异常）：必须显示处理，使用try-catch、throws。如IOException
unchecked exception（运行时异常）：不需要显示捕获，如NullPonterException，继承至`RuntimeException`

`Error`：是系统中的错误，一般是指与虚拟机相关的问题，如系统崩溃，虚拟机错误，内存空间不足，方法调用栈溢出等。对于这类错误的导致的应用程序中断，仅靠程序本身无法恢复和和预防，一般遇到这样的错误程序无法继续运行

## 面向对象特征

[什么是 Java 的多态特性？ - Java 基础面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1787463103423897602/question/1780933294406266881)

[Java 方法重载和方法重写之间的区别是什么？ - Java 基础面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1787463103423897602/question/1780933294490152961)

抽象：找出事物的相似之处，将其归咎成一个类

封装：将类的属性和方法用访问修饰符保护起来，提供公共的方法去操作。

继承：一个类继承另一个类中可以被继承的属性和方法，子类可以修改或增加新的属性和方法。

多态：

编译时多态（静态多态）：方法重载实现，同一个类中的多个名称相同的方法，通过传入的参数类型或数量不同，来确定调用哪一个方法

运行时多态：子类重写父类的方法。同一个接口或父类引用变量可以指向不同的对象实例，并根据实际指向的对象类型执行相应的方法。



## 当一个对象被当作参数传递到一个方法后，此方法可改变这个对象的属性，并可返回变化后的结果，那么这里到底是值传递还是引用传递?

[Java 中的参数传递是按值还是按引用？ - Java 基础面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1787463103423897602/question/1780933294414655490)

是值传递。Java 编程语言只有值传递参数。

基本数据类型：传递的是值得副本。

引用数据类型：当一个对象实例作为一个参数被传递到方法中时，参数的值就是对该对象的引用。对象的内容可以在被调用的方法中改变，但对象的引用是永远不会改变的。

## 不支持多重继承？

[为什么 Java 不支持多重继承？ - Java 基础面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1787463103423897602/question/1780933294435627010)

多继承会产生菱形继承问题；同一个方法从多个父类继承，产生冲突

接口可以多实现

想调用接口里面的方法，子类必须重写该方法

多个接口内有相同的默认方法，子类必须重写这个方法

## 面向对象编程和面向过程编程的区别

[Java 面向对象编程与面向过程编程的区别是什么？ - Java 基础面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1787463103423897602/question/1780933294477570050)

面向对象编程：把类或对象作为基本单元来组织编码，通过定义对象的属性和行为来解决问题，关注对象之间的关系和交互

面向过程编程：把过程或函数作为基本单元来组织编码，通过函数或过程实现业务逻辑，关注执行的步骤和顺序

## 内部类

[什么是 Java 内部类？它有什么作用？ - Java 基础面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1787463103423897602/question/1780933294498541569)

在一个类的内部定义的类，支持成员内部类、静态内部类、局部内部类、匿名内部类。内部类可以访问外部类的成员变量和方法

## String, StringBuffer StringBuilder 的区别

[Java 中 String、StringBuffer 和 StringBuilder 的区别是什么？ - Java 基础面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1787463103423897602/question/1780933294519513089)

[Java 的 StringBuilder 是怎么实现的？ - Java 基础面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1787463103423897602/question/1780933294532096002#heading-1)

String：存储字符串，使用final修饰，不可变，所有的操作都是返回新的字符串，底层采用char数组(<1.8)、byte数组(1.8+)

StringBuffer：可变字符串，对同一个字符串进行操作，采用缓冲区，默认大小16，内部使用`synchronized`来保证线程安全

StringBuilder：可变字符串，线程不安全

## hashcode和equals

[Java 中 hashCode 和 equals 方法是什么？它们与 == 操作符有什么区别？ - Java 基础面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1787463103423897602/question/1772568783219695618)

[Java 中的 hashCode 和 equals 方法之间有什么关系？ - Java 基础面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1787463103423897602/question/1780933294574039042)

hashcode：用于散列存储结构中确定对象的存储位置

equals：比较对象内容是否相同，默认比较引用地址

==：比较两个引用是否指向同一个对象。对于基本类型，比较值



如果两个对象equals结果相同，hashcode必须也相同

如果重写了equals，对应必须重写hashcode，否则会导致在基本hash的集合中无法正确存储和查找元素，导致重复存储、查找失败

## 访问修饰符public,private,protected,以及不写时的区别？

| 访问修饰符           | 同一个类 | 同一个包 | 子类(不同包) | 其它包 |
| -------------------- | -------- | -------- | ------------ | ------ |
| `public` 公共的      | ✅        | ✅        | ✅            | ✅      |
| `protected` 受保护的 | ✅        | ✅        | ✅            |        |
| 默认(`default`)      | ✅        | ✅        |              |        |
| `private` 私有的     | ✅        |          |              |        |

## 包装类型和基本类型的区别

[Java 中包装类型和基本类型的区别是什么？ - Java 基础面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1787463103423897602/question/1780933294544678914)

基本类型：8种，int、char、float、double、long、string、byte、boolean，直接存储数值，（局部变量：栈、成员变量：堆、静态字段：方法区），不支持null

包装类型：是类，存储在堆中，支持null

区别：性能、比较方式、默认值、初始化方式、存储方式

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

## jdk和jre的区别

[JDK 和 JRE 有什么区别？ - Java 基础面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1787463103423897602/question/1780933294557261825)

[你使用过哪些 JDK 提供的工具？ - Java 基础面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1787463103423897602/question/1780933294561456129)

jre:java运行环境

jdk：用于开发java程序的完成环境，包含jre，开发、调试、监控Java程序的工具

## heap 和stack 有什么区别？

heap 堆 先进后出

stack 栈 先进先出

## 在JAVA 中，如何跳出当前的多重嵌套循环？

在最外层循环前加label 标识,然后用break:label 方法即可跳出多重循环。或者在外层循环加boolean判断

## 构造器Constructor 是否可被override?

构造器Constructor 不能被继承，因此不能重写Overriding，但可以被重载Overload。

## 我们在web 应用开发过程中经常遇到输出某种编码的字符，如iso8859-1等，如何输出一个某种编码的字符串？

```java
new String(str.getBytes("ISO-8859-1"), "GBK");
```

## Overload 和Override 的区别。Overloaded 的方法是否可以改变返回值的类型?

如果在子类中定义某方法与其父类有相同的名称和参数，我们说该方法被重写(Overriding)。

如果在一个类中定义了多个同名的方法，它们或有不同的参数个数或有不同的参数类型，则称为方法的重载(Overloading)。

**Overloaded 的方法是可以改变返回值的类型**。

## 描述一下JVM 加载class 文件的原理机制?

JVM 中类的装载是由ClassLoader 和它的子类来实现的,Java ClassLoader是一个重要的Java 运行时系统组件。它负责在运行时查找和装入类文件的类。

## 抽象类和接口有什么区别?

[接口和抽象类有什么区别？ - Java 基础面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1787463103423897602/question/1780933294427238401#heading-1)

接口（自上而下）：知道某个行为，基于这个行为约束定义接口，一些类需要有这些行为，才去实现对应的接口

抽象类（自下而上）：多个类有相同的特性，代码可以复用，将公共逻辑封装成一个抽象类，减少代码冗余

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

## 日期和时间

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

[Java 中 wait() 和 sleep() 的区别？ - Java 基础面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1787463103423897602/question/1828622076837330945)

**wait()**:

**必须在同步块或同步方法内调用**，依赖对象锁来管理线程的等待和唤醒机制。调用后，当前线程释放持有的对象锁，进入等待状态

属于Object类

需要被其他线程通过notify()或notifyAll()显示唤醒，或被wait(long timeout)的超时参数唤醒

用于进程间通信

**sleep()**:

**可以在任何上下文中调用，不需要获取对象锁**

属于Thread类

在指定时间后自动恢复允许，或通过抛出InterruptedException恢复、

让线程暂停执行一段时间



## 一个线程两次调用start

[如果一个线程在 Java 中被两次调用 start() 方法，会发生什么？ - Java 基础面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1787463103423897602/question/1800331617560240129)

报错，一个线程只能启动一次

## socket通信（tcp/udp区别及JAVA的实现方式）

TCP:**面向连接的协议** 。在传输数据之前，在发送端和接收端建立逻辑联系，再传输数据，提供了两台计算机之间可靠无差错的数据传输。

UDP:用户数据报协议，是一个**面向无连接的协议** 。传输数据时不需要建立连接，不管对方服务是否启动，直接将数据、数据源和目的地都封装到数据包中，直接发送传输速度快，容易丢包。



## 动态代理

[什么是 Java 中的动态代理？ - Java 基础面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1787463103423897602/question/1780933294590816257)

[JDK 动态代理和 CGLIB 动态代理有什么区别？ - Java 基础面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1787463103423897602/question/1780933294599204866)

一种设计模式，在运行时创建代理对象，并将其方法委托给实际的目标对象

和静态代理不一样，不需要在编译时创建具体的代理类，而是在运行时通过反射动态生成代理对象

JDK动态代理：代理接口，通过Proxy和InvocationHandler接口实现

CGLIB动态代理：通过字节码生成目标类的子类来实现，对普通类进行代理，使用Enhancer和MethodInterceptor



## 注解原理

[Java 中的注解原理是什么？ - Java 基础面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1787463103423897602/question/1780933294607593473#heading-6)

为代码元素（类、方法、字段、参数等）提供元数据。可通过编译时、类加载时或运行时的反射机制来实现特殊的处理逻辑

使用@interface定义

本质是一种特殊的接口，java编译器会为其生成字节码，将其作为类文件的一部分



## 反射机制

[你使用过 Java 的反射机制吗？如何应用反射？ - Java 基础面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1787463103423897602/question/1780933294611787778)

在运行时获取类的结构信息（方法、字段、构造函数）并操作对象的机制



## SPI（service provider interface）

[什么是 Java 的 SPI（Service Provider Interface）机制？ - Java 基础面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1787463103423897602/question/1780933294620176386)

插件机制，在运行时动态加载服务的实现。通过定义接口并提供一种可扩展的方式来让服务提供者在运行时注入，实现解耦和模块化设计

服务接口：接口或抽象类

服务提供者：实现服务接口的具体实现类

服务加载器（serviceLoader）：工具类，负责动态加载服务实现类。通过serviceLoader在运行时发现和加载多个服务提供者

配置文件（MEAT-INF/services/）目录下配置服务接口的文件来声明，内容为实现类的完全限定名



## 泛型的作用

[Java 泛型的作用是什么？ - Java 基础面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1787463103423897602/question/1780933294628564993#heading-3)

通过在编译时检查类型安全，避免在运行时发生类型转换错误

## 泛型擦除

[什么是 Java 泛型的上下界限定符？ - Java 基础面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1787463103423897602/question/1780933294636953601#heading-0)

[Java 泛型擦除是什么？ - Java 基础面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1787463103423897602/question/1833434214495657985#heading-4)

在编译时将所有泛型信息删除的过程，确保与java1.4之前的版本保持兼容

泛型参数在运行时会被替换为上界（通常时Object），在运行时无法获取泛型的实际类型

反射对一下3种情况可获取泛型类型

+ 成员变量的泛型
+ 方法入参的泛型
+ 方法返回值的泛型

## 深拷贝和浅拷贝的区别

深拷贝：复制对象本身和其引用的对象

浅拷贝：复制对象的引用



## Integer缓存池

[什么是 Java 的 Integer 缓存池？ - Java 基础面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1787463103423897602/question/1780933294657925121)

在-128~127范围内的Integer对象在自动装箱（基本类型->包装类型）时，会被缓存和复用



## 类加载过程

[Java 的类加载过程是怎样的？ - Java 基础面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1787463103423897602/question/1780933294662119426#heading-0)

类加载到JVM中。把二进制流存储到内存中，经过处理转化为class类

加载流程
**加载**：二进制流读入内存，生成一个class对象

**连接**

+ 验证：加载进来的二进制流是否规范
+ 准备：为静态变量赋初值，在方法区划分内存空间
+ 解析：将常量池的符号引用转化为直接引用

**初始化**：执行静态代码块

## 双亲委派模型

[什么是 Java 中的双亲委派模型？ - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/question/1780933294670508033)

类加载器在加载某个类时，会先委派给父类加载器去加载，父类加载器无法加载时，才由当前类加载器自行加载

安全性：避免重复加载类

一致性：保证同一个类在系统中只出现一个



违反双亲委派机制例子？

JDBC：接口为类库定义，实现在厂商提供的jar包，需要由应用程序加载器完成

SPI机制：由自定义类加载器完成，绕过了父类加载器



**先自下而上委托，再自上而下加载？**

启动类->扩展类->应用程序类->自定义类

类加载器是组合关系，子加载器只记录父加载器，父加载器没记录子加载器

## 类加载器

[你了解 Java 的类加载器吗？ - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/question/1780933295186407425)

JVM用于动态加载类文件的组件，将.class文件中的字节码加载到内存中，并将其转换为Class对象

动态加之类：在运行时根据需要加载类，不是在编译时加载所有类

隔离不同的类命名空间：通过不同的类加载器，可以隔离同名类，不会冲突

## BigDecimal保证精度不丢失

[BigDecimal 为什么能保证精度不丢失? - Java 基础面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1787463103423897602/question/1861417708154970114#heading-0)

使用任意精度的整数表示法，不使用浮动的二进制表示

单独保持整数部分和小数点的位置，避免浮点数转化的精度丢失

## new String("xxx")会创建多少个对象？

[使用 new String("yupi") 语句在 Java 中会创建多少个对象？ - Java 基础面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1787463103423897602/question/1780933294678896641)

1. **字符串字面量**：

   当出现字符串字面量（如 "xxx"）时，会在字符串常量池中创建一个字符串字面量对象。字符串常量池是一个特殊的存储区域，用于存储字符串字面量，避免重复创建相同的字符串对象。

2. **字符串对象**：

   当使用`new String("xxx")`时，Java 会调用`String`类的构造函数来创建一个新的`String`对象。这个新对象包含字符串 "yupi" 的内容，并存储在堆内存中。

3. **总结**：

   使用`new String("xxx")`会创建两个对象：一个是存储在字符串常量池中的字符串字面量对象，另一个是存储在堆内存中的`String`对象。这两个对象是不同的，因为它们存储在不同的内存区域，并且具有不同的生命周期。字符串常量池中的对象可能会被多个引用共享，而堆内存中的对象则不会被自动共享。

## final、finally、finalize区别

[Java 中 final、finally 和 finalize 各有什么区别？ - Java 基础面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1787463103423897602/question/1780933294687285250)

final：修饰类、方法、变量

+ 类：不能被继承
+ 方法：不能被重写
+ 变量：不能重新赋值

finally：与try-catch结合使用，确保始终会执行

finalize：是Object的方法，运行对象在被垃圾回收前进行清理操作



## 乱码问题

[为什么在 Java 中编写代码时会遇到乱码问题？ - Java 基础面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1787463103423897602/question/1780933294691479554)

字符编码与解码不一致



## 栈和队列区别

[栈和队列在 Java 中的区别是什么？ - Java 基础面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1787463103423897602/question/1800343420860178433)

栈：后进先出
队列：先进先出



## I/O流

[Java 的 I/O 流是什么？ - Java 基础面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1787463103423897602/question/1800347227602100226#heading-3)

处理输入和输出数据的类库

字节流：处理8位字节数据，适合二进制文件

字符流：处理16位字符数据，适合文本文件



## 迭代器

[什么是 Java 中的迭代器（Iterator）？ - Java 基础面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1787463103423897602/question/1800708852364419073)

Iterator集合框架中用于遍历集合元素的接口，依次访问集合中的每一个元素，不需要关心集合的具体实现。提供统一的方式来遍历List、Set等集合类型，通常与Collection类接口一起使用

核心方法：hasNext，next，remove



## 静态方法和实例方法的区别

[Java 中静态方法和实例方法的区别是什么？ - Java 基础面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1787463103423897602/question/1800784527800737793#heading-2)

![image-20241229203155925](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20241229203155925.png)
