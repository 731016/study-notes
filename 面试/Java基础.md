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

   ![image-20211102163408655](https://raw.githubusercontent.com/731016/imgSave/master/note_img202111021634953.png)

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

1)调用数值类型相应包装类中的方法`parse***(String)`或`valueOf(String)`即可返回相应基本类型或包装类型数值；

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

![image-20211102193048371](https://raw.githubusercontent.com/731016/imgSave/master/note_img202111021930709.png)

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
                
                if(bytes - subBytes == 1){
                    return str.substring(0, i);
                }
            }
        }
        return str;
    }
    @Test
    public void Test6(){
        String def1 = subString("我ABC 汉DEF", 8);
        String def2 = subString("我ABC 汉DEF", 4);
        System.out.println(def1);
        System.out.println(def2);
    }
```

![image-20211102195621155](https://raw.githubusercontent.com/731016/imgSave/master/note_img202111021956377.png)

