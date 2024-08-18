# Java基础

---

# 字节

```PowerShell
1 Byte（字节） = 8 bit（位）
100Mbps / 8 = 12.5 MB/s
```


# dos命令

```PowerShell
win +r 输入cmd

切换盘符 盘符:
进入文件夹 cd 文件夹路径
  返回上一级目录 cd ..
  进入当前目录 cd .
  返回根目录 cd \
命令提示 Tab
查看当前目录文件 dir
清除屏幕信息 cls
退出 exit
```


# 虚拟机

**实现跨平台** 

```PowerShell
java文件通过jdk的javac命令编译成class文件，交给虚拟机运行

jdk包括jvm（虚拟机）和jre（java运行环境）以及一些程序需要用到的相关类文件
```


![image-20211124230517845](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/image-20211124230517845.png)

# 记事本运行Java程序

```Java
(1)新建HelloWorld.java文件，编写源代码
    /*类名 和 文件名 必须相同
      定义要求：
        （1）不能用数字开头
        （2）特殊符号不能开头￥ - +
        （3）不能使用关键字
        （4）包含下划线和数字
      类名 首字母大写 大驼峰
      方法名 第一个首字母小写 小驼峰 
      变量名 一般小写
    */
public class HelloWorld {
    /*
      main方法 程序执行的入口方法
    */
  public static void main(String[] args){
        /*
          打印输出
        */
    System.out.println("hello world!!!");
  }
}

(2)编译成class文件（javac.exe编译器）
    javac HelloWorld.java

(3)执行编译文件（java.exe解释器）
    java HelloWorld

(4)交给jvm运行
```


## 运行时控制台乱码问题

默认`ANSI`编码

```Java
需要使用Notepad++把中文转换为ANSI编码

谨慎使用！！！
修改为UTF-8编码
在运行中通过regedit进入注册表 找到HKEY_CURRENT_USER\Console\%SystemRoot%_system32_cmd.exe
新建一个 DWORD（32位值）,命名为CodePage，值设为65001
已有CodePage的话，修改它，改为十进制，65001
```


![image-20211028190228701](https://raw.githubusercontent.com/731016/imgSave/master/note_img202110281902821.png)

## 查看文件扩展名

```Java
组织->文件夹和搜索选项
```


![image-20211028190241286](https://raw.githubusercontent.com/731016/imgSave/master/note_img202110281902852.png)


# 变量

- 在程序**运行过程中可以变化** 的量

- 定义时，每次只能保持一个数据，必须明确保存数据的类型

- 变量必须先**声明** 并**赋值** 后才能使用

## 局部变量

- 在方法体内声明的变量被称为局部变量，该变量只能在该方法内使用

- 局部变量在方法、构造方法、或者语句块被执行的时候创建，当它们执行完成后，将会被销毁。

- 访问修饰符不能用于局部变量。

```Java
public class Test2{
  public static void main(String[] args){
    //System.out.println();
    byte byte1 = 127;
    short short1 = 345;
    int int1=222;
        //声明长整数时，数字后面加L
    long long1=9223372036854775807L;
        //float的数据范围大于double，声明flaot类型数据后面加F
    float float1=3.5F;
        double double1=56.345;
    boolean boolean1=true;
    char char1='x';
    System.out.println(byte1);
    System.out.println(short1);
    System.out.println(int1);
    System.out.println(long1);
    System.out.println(float1);
    System.out.println(double1);
    System.out.println(boolean1);
    System.out.println(char1);
  }
}
```


## 成员变量(实例变量)

在**类内部但在方法体外** 声明的变量称为成员变量，或者实例变量。之所以称为实例变量，是因为该变量只能
通过类的实例（对象）来访问。

- 成员变量在对象创建的时候创建，在对象被销毁的时候销毁。

- 访问修饰符可以修饰成员变量。

## 静态变量

- 通过 `static` 关键字声明的变量被称为静态变量（类变量），它可以**直接被类访问** 

- 静态变量在程序开始时创建，在程序结束时销毁。

# 常量

在Java程序**运行过程中中不可变** 的量

使⽤ `final` 关键字修饰的成员变量。常量的值⼀旦给定就⽆法改变！

**常量名必须大写** 

```Java
(1)整数常量 1 2 3 0 -1
    System.out.println(1);
(2)小数常量 0.2 -0.2
    System.out.println(5.6);
(3)字符常量 'a' '0' '我'
    System.out.println('a');
(4)字符串常量 "a" "0" "当前"
    System.out.println("答复");
(5)布尔常量 true false
    System.out.println(true);
  System.out.println(false);
(6)空常量 null
```


# 注释

```Java
//单行注释
/*
  多行注释
*/
```


# 数据类型

```Java
基本类型
    数值                          字符  布尔
byte short int float double long char boolean
引用类型
    数组 类 接口

```


当变量是**成员变量** 或者**静态变量** 时，可以不进行初始化，它们会有一个默认值。


**基本数据类型：** 
1、变量名指向具体的数值。
2、基本数据类型存储在栈上。
**引用数据类型：** 
1、变量名指向的是存储对象的内存地址，在栈上。
2、内存地址指向的对象存储在堆上。

### 基本类型(8种)及内存空间

```Java
整数                                  默认值
    byte  (1字节)  -128~127             0
    short  (2字节)   -32768-32767       0
    int    (4字节)   (-2^32)~(2^32-1)   0
    long  (8字节)  (-2^63)~(2^63-1)     0
小数 
    float  (4字节)                      0.0
    double  (8字节)                     0.0
布尔 
    boolean  (1字节)  true false        false
字符 
    char  (2字节)  0-65535              '\u0000'
```


![image-20211124230539376](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/image-20211124230539376.png)

### float类型和double类型的比较

![image-20211124230551916](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/image-20211124230551916.png)

```Java
System.out.println(f1(2.34F, 2.34));

public static String f1(float a, double b) {
DecimalFormat dec = new DecimalFormat(".000000000000000");
System.out.println("float类型的a的值：" + dec.format(a));
System.out.println("double类型的b的值：" + dec.format(b));
return "float类型的" + a + "和dobule类型的" + b + "比较结果为" + (a == b);}
```


![image-20211124230607776](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/image-20211124230607776.png)

堆是在程序**运⾏时** 在内存中申请的空间（可理解为动态的过程）；切记，不是在编译时；

![image-20211124230617903](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/image-20211124230617903.png)




## 数据类型转换

```Java
自动类型转换（隐式转换）
    byte,short,char->int->long->float->double
  （1）特点：代码无须处理
  （2）规则：从小的数据类型自动转换到大的类型
  
强制类型转换
    （1）特点：代码需要处理，无法自动完成
    （2）规则：从大的数据类型转换到小的类型
    （3）格式：
      (byte)数据 (short)数据 (int)数据 (long)数据
      (float)数据 (double)数据
      (char)数据
      boolean不能转换！
    （4）一般不推荐使用，会丢失数据精度，数据溢出
      byte m=127;
    byte n=1;
    n=(byte)(m+1);
    System.out.println(n);
```

# ASCII

![image-20211124230656425](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/image-20211124230656425.png)



![image-20211124230708287](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/image-20211124230708287.png)

# 运算符

```Java
算术运算符 + - * / % ++ --
关系运算符 == != < > <= >=
位运算符 & | ^ ~ << >> >>>
逻辑运算符 & | ^ ! && ||
三元运算符 (条件)?(符合):(不符合)
赋值运算符 = += -= *= /= %=
```


## 运算符 +

（1）数字会直接加
（2）char会转换为int类型，再计算
（3）字符串会进行字符串拼接
（4）其他类型的数据和字符串相加也会拼接

## 赋值运算符

复合运算符**包含了一个强制类型转换** 

```Java
byte b=10;
b+=5;//不会报错
System.out.println(b);
```


## 关系运算符

```Java
== 用来判断数据是否相等
    结果：true false
    不允许出现  类似1<x<3的式子

字符串不能和数字比较大小，可判断是否相等
布尔类型不能比较大小，可判断是否相等 
```


## 逻辑运算符

```Java
x>1 && x<3 只有符号两侧的结果为true，最后结果才为true;且左侧为false，右侧代码不执行。
X>1 || x<3 只要等号两侧任一结果为true，最后结果为true;且左侧为true时，右侧代码不再执行。
！结果取反
```


## 位运算符

![image-20211124230726781](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/image-20211124230726781.png)

## 三元运算符

```Java
一元运算符 一个数据进行运算
二元运算符 两个数据进行运算
三元运算符 三个数据进行运算

格式：数据类型 变量名=判断条件?表达式1:表达式2
    判断条件结果为true，返回表达式1的值，否则返回表达式2的值

```


```Java
判断三个数的最大值
int m=94,n=107,k=25;
int max=m>n?(m>k?m:k):(n>k?n:k);
System.out.println("最大值为"+max);
```


# 流程控制

```Java
if(条件判断)else if(条件判断){代码块}else(){代码块}
switch()case:{}default:{}
```


变量的类型可以是 `byte、short、int、long`，或者对应的包装器类型 Byte、Short、Integer、Long，以及`字符串`和`枚举`。

# 输入

```Java
用法：
import java.util.Scanner;
System.out.println("请输入：");
Scanner r=new Scanner(System.in);
String s=r.next();
nextInt();//接收数字
nextFloat();//接收浮点型
next(); //接收字符串
```


# 循环

```Java
while(判断语句){
    循环语句块;
}

do
{
    循环语句块
}while(判断语句);

for(int i=0;i<10;i++)
{
  循环语句块    
}

// forEach
for(元素类型元素 : 数组或集合){
// 要执⾏的代码
}  

```


## 死循环

```Java
while (true){}
for (;;){}
do {}while (true);
```


![image-20211124230740626](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/image-20211124230740626.png)

## 嵌套循环

```Java
for(int i=0;i<5;i++){
    for(int j=0;j<4;j++){
        System.out.println("*");
    }
}
```


## break和continue关键字

```Java
break //结束当前循环，执行循环体下面的代码
continue //结束本次循环，继续下一轮循环
```


# 字符串

1. String 类是 `final` 的，意味着它不能被⼦类继承。

2. String 类实现了 `Serializable` 接口，意味着它可以序列化。

3. String 类实现了 `Comparable` 接口，意味着最好不要用‘==’来⽐较两个字符串是否相等，应该用`compareTo()`方法去比较。

4. `StringBuffer`、`StringBuilder` 和 `String` 一样，都实现了 `CharSequence `接口

5. Java 9 以前，String 是 `char` 型数组实现的，之后改成了 `byte` 型数组实现，并增加了 `coder` 来表示编码。

6. 每一个字符串都会有一个 hash 值

```Java
第一，可以保证 String 对象的**安全性** ，避免被篡改，毕竟像密码这种隐私信息一般就是字符串存储的。
第二，保证**哈希值不会频繁变更** 。毕竟要经常作为哈希表的键值，经常变更的话，哈希表的性能就会很差劲。
第三，可以实现**字符串常量池** 。

由于字符串的不可变性，String 类的这些方法实现最终都返回了新的字符串对象

```


# 字符串常量池

String的String Pool是一个固定大小的`Hashtable`，默认值大小长度是1009，如果放进String Pool的String非常多，就会造成Hash冲突严重，从而导致链表会很长，而链表长了后直接会造成的影响就是当调用`String.intern`时性能会大幅下降（因为要一个一个找）

在jdk7中，`StringTable`的长度可以通过一个参数指定：
`-XX:StringTableSize=99991`

```Java
第一，使用**双引号** 声明的字符串对象会保存在**字符串常量池** 中。
第二，使用 new 关键字创建的字符串对象会先从**字符串常量池** 中找，如果没找到就创建一个，然后再在**堆中创建字符串对象** ；如果找到了，就**直接在堆中创建字符串对象** 。
第三，针对没有使用双引号声明的字符串对象来说，就像下面代码中的 s1 那样：
Strings1=newString("二哥") +newString("三妹");

如果想把 s1 的内容也放在字符串常量池的话，可以调用intern()方法来完成。
不过，需要注意的是，Java 7 的时候，字符串常量池从永久代中移动到了堆中，虽然此时永久代还没有完全被移除。
Java 8 的时候，永久代被彻底移除。

这个变化也直接影响了String.intern()方法在执行时的策略，Java 7 之前，执行String.intern()方法的时候，不管对象在堆中是否已经创建，字符串常量池中仍然会创建一个内容完全相同的新对象；
Java 7 之后呢，由于字符串常量池放在了堆中，执行String.intern()方法的时候，如果对象在堆中已经创建了，字符串常量池中就不需要再创建新的对象了，是直接保存堆中对象的引用，也就节省了一部分的内存空间。
```


# 随机数

```Java
生成0-80之间的整数
Random random=new Random();
int i = random.nextInt(80);
System.out.println(i);
```


# 数组

存放数据长度固定的容器，存储的多个数据类型必须一致

数组是一种**引用类型** 的数据


Java将内存分为**堆内存** 和**栈内存** 

```Java
栈内存（stack）：方法在此运行（main方法进入栈中运行）
    先进后出
堆内存（heap）：存储对象或数组，new关键字创建出来的实例
    先进先出
    GC：Java垃圾回收器 复习分配算法
方法区：存储可以运行的.class文件
  
寄存区：给cpu使用，不会直接管理
```


![image-20211124230756460](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/image-20211124230756460.png)

### 数组声明

```Java
int[] arr;
int arr[];
```


### 数组初始化

在内存中为数组开辟一块内存，并给数组赋一个初始值

`格式： 数组类型[] 数组名称=new 数组类型[数组长度];`

**new** :在内存中为数组开辟新的内存空间

(1)动态初始化（指定长度）：创建数组时，指定数组中元素的个数

```Java
动态初始化会有初始值！

数组类型[] 数组名称=new 数据类型[数组长度];

char[] ch=new char[3];

拆分=>char[] ch;ch=new char[3];
```


(2)静态初始化（指定内容）：创建数组时，不指定长度，而是直接给出具体的数据

```Java
数组类型[] 数组名称=new 数组类型[]{元素1，元素2...};

int[] arr2=new int[]{1,2,3};

拆分=>int[] arr2;arr2=new int[]{1,2,3};

简写:int[] arr3={1,2,3};简写无法拆分
```


访问数组元素通过**数组下标** ，从0开始，一直到数组元素长度为-1为止

```Java
格式：数组名称[数组下标]
```


**得到内存地址** 

```Java
int[] arr=new int[3];
System.out.println(arr+"");
//[I@21bcffb5
```


### 初始值

```Java
整型为 0
浮点型为 0.0
字符型为 '\u0000'
布尔型为 false
引用类型为 null
```


### 数组元素赋值

```Java
arr[0]=2;
```


### 异常处理

```Java
数组下标越界
java.lang.ArrayIndexOutOfBoundsException
    要访问的元素的下标超过数组下标的最大值
空指针
java.lang.NullPointerException
    将数组初始化
```


### 数组长度

```Java
数组名称.length //返回int值

int[] arr4 = {34, 565, 64, 3647, 46, 897, 5457, 657, 464, 6};
System.out.println(arr4.length);//10

```


### 遍历数组

对数组中的每一个元素进行处理

```Java
//使用for循环遍历数组
for (int i=0;i<arr4.length;i++){
    System.out.println(arr4[i]);
}
```


### 二维数组

```Java
//声明
数组类型[][] 变量名称=new 数组类型[一维数组长度][二维数组长度]

```


### 数组工具类

```Java
（1）排序数组 
  Arrays.sort(数组名)
（2）数组复制
    System.arraycopy(需要复制的数组,开始下标,目标数组,目标数组开始下标,需要复制的长度)
（3）数组扩容/缩容
    新数组 = Arrays.copyOf(新数组,新数组长度 + 原数组长度);
  System.arraycopy(原数组,原数组起始位置,新数组,新数组起始位置（新数组长度-原数组长度）,原数组长度（要追加的长度）);
```


#### 创建数组

`copyOf` 复制指定的数组，截取或用 null 填充

`copyOfRange` 复制指定范围内的数组到一个新的数组

`fill` 对数组进行填充

```Java
import java.util.Arrays;
/**
 * @Description 创建数组
 * 1. copyOf 复制指定的数组，截取或用 null 填充
 * 2. copyOfRange 复制指定范围内的数组到一个新的数组
 * 3. fill 对数组进行填充
 * @Classname CreateArray
 * @Date 2021/8/22 19:07
 * @Created by 折腾的小飞
 */
public class CreateArray {
    public static void main(String[] args) {
        String[] strArr=new String[]{"涂","鏊","飞"};
        String[] newStrArr1 = Arrays.copyOf(strArr, 2);
        String[] newStrArr2 = Arrays.copyOf(strArr, 5);// 使用null填充；长度不足，会扩容，返回新数组
        System.out.println(Arrays.toString(newStrArr1));
        System.out.println(Arrays.toString(newStrArr2));

        // 第一个是指定的数组，第二个是起始位置（包含），第三个是截止位置（不包含）
        String[] copyOfRange1 = Arrays.copyOfRange(strArr, 0, 1);
        String[] copyOfRange2 = Arrays.copyOfRange(strArr, 0, 5); // 仍然使用了 null 进行填充
        System.out.println(Arrays.toString(copyOfRange1));
        System.out.println(Arrays.toString(copyOfRange2));

        // 将 4 个位置填充为"胡梓卓"
        String[] emptyArr=new String[3];
        Arrays.fill(emptyArr,"胡梓卓");
        System.out.println(Arrays.toString(emptyArr));
    }
}
```


![image-20211124230855126](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/image-20211124230855126.png)


#### 比较数组

```Java
1. Arrays 类的 equals() 方法用来判断两个数组是否相等

2. Arrays.hashCode() 方法
```


#### 数组排序


Arrays 类的 `sort()` 方法用来对数组进行排序

```Java
import java.util.Arrays;

/**
 * @Description 数组排序
 *      基本数据类型是按照 双轴快速排序 的
 *      引用数据类型是按照 TimSort排序 的
 *      使用了 Peter McIlroy 的“乐观排序和信息理论复杂性”中的技术。
 * 1. Arrays 类的 sort() 方法用来对数组进行排序
 * @Classname SortArray
 * @Date 2021/8/22 19:55
 * @Created by 折腾的小飞
 */
public class SortArray {
    public static void main(String[] args) {
        String[] arr=new String[]{"涂","胡","tu","ao","zi"};
        String[] sortArr = Arrays.copyOf(arr, arr.length);
        Arrays.sort(sortArr);// 按照的是首字母的升序进行排列的
        System.out.println(Arrays.toString(sortArr));
    }
}

```


![image-20211124230957031](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/image-20211124230957031.png)

#### 数组检索


数组排序后就可以使用 Arrays 类的 `binarySearch()` 方法进行二分查找

```Java
import java.util.Arrays;

/**
 * @Description 数组检索
 * 1. 数组排序后就可以使用 Arrays 类的 binarySearch() 方法进行二分查找了。
 * 否则的话，只能线性检索，效率就会低很多。
 * @Classname SearchArray
 * @Date 2021/8/22 20:02
 * @Created by 折腾的小飞
 */
public class _4SearchArray {
    public static void main(String[] args) {
        String[] str1 = new String[]{"hu", "ao", "zi", "fei"};
        String[] sortedStr1 = Arrays.copyOf(str1, str1.length);
        Arrays.sort(sortedStr1);

        int searchIndex = Arrays.binarySearch(sortedStr1, "zi");
        System.out.println("找到的下标：" + searchIndex);

        int binarySearch = Arrays.binarySearch(sortedStr1, "00");
        System.out.println(binarySearch); // 找不到返回-1
        
        // binarySearch()方法 既可以精确检索，也可以模糊检索，比如说忽略大小写
        int fuzzyIndex = Arrays.binarySearch(sortedStr1, "Zi", String::compareToIgnoreCase);
        System.out.println("模糊查找找到的下标：" + fuzzyIndex);
    }
}

```


![image-20211124231008876](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/image-20211124231008876.png)


#### 数组转流


Arrays 类的 `stream()` 方法可以将数组转换成流

```Java
import java.util.Arrays;

/**
 * @Description 数组转流
 * 1. Arrays 类的 stream() 方法可以将数组转换成流
 * @Classname _5StreamArray
 * @Date 2021/8/22 20:15
 * @Created by 折腾的小飞
 */
public class _5StreamArray {
    public static void main(String[] args) {
        String[] str = new String[]{"hu", "ao", "zi", "fei"};
        System.out.println(Arrays.stream(str).count());

        //指定起始下标和结束下标
        System.out.println(Arrays.stream(str, 1, 2).count());

        // 范围错误
        System.out.println(Arrays.stream(str, 1, 9).count());
    }
}
```


![image-20211124231021904](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/image-20211124231021904.png)

#### 打印数组

`Arrays.toString()`
`Arrays.deepToString()` *方法，打印二维数组* 

```Java
import java.util.Arrays;

/**
 * @Description 打印数组
 * 1. Arrays.toString()
 * @Classname _6PrintArray
 * @Date 2021/8/22 20:25
 * @Created by 折腾的小飞
 */
public class _6PrintArray {
    public static void main(String[] args) {
        String[] str = new String[]{"hu", "ao", "zi", "fei"};
        System.out.println(str);
        System.out.println(Arrays.toString(str));
    }
}
```


![image-20211124231034272](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/image-20211124231034272.png)

```Java
// 1
Arrays.asList(str).stream().forEach(s -> System.out.print(s));
System.out.println();
// 2
Stream.of(str).forEach(System.out::print);
System.out.println();

// 3
Arrays.stream(str).forEach(System.out::print);

// 4
for (int i = 0; i < str.length; i++) {
    System.out.println(str[i]);
}
        
// 5
for (String s : str) {
   System.out.println(s);
}

// 6 打印二维数组
String[][] deepArr=new String[][]{{"折腾","的"},{"小飞"}};
System.out.println(Arrays.deepToString(deepArr));
```

![image-20211124231048140](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/image-20211124231048140.png)

#### 数组转List


`Arrays.asList()`

```Java
`*junit-4.12.jar`
**4.1以上必须要：** 
`hamcrest-core-1.3.jar`
**使用** `@Test`注解，测试方法不能有返回值和参数
​
```


![image-20211124231059096](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/image-20211124231059096.png)

#### setAll


Java 8 新增了 `setAll()` 方法，它提供了一个函数式编程的入口，可以对数组的元素进行填充

```Java
import java.util.Arrays;
/**
 * @Description setAll
 * Java 8 新增了 setAll() 方法，它提供了一个函数式编程的入口，可以对数组的元素进行填充
 * @Classname _8SetAll
 * @Date 2021/8/22 20:39
 * @Created by 折腾的小飞
 */
public class _8SetAll {
    public static void main(String[] args) {
        int[] arr = new int[10];
        // i 就相当于是数组的下标，
        // 值从 0 开始，到 9 结束，
        // 那么 i * 10 就意味着值从 0 * 10 开始，到 9 * 10 结束
        // 可以用来为新数组填充基于原来数组的新元素。
        Arrays.setAll(arr, i -> i * 10);
        System.out.println(Arrays.toString(arr));
    }
}
```


![image-20211124231109336](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/image-20211124231109336.png)

#### parallelPrefix


通过遍历数组中的元素，将**当前下标位置上的元素** 与它**之前****下标的元素** 进行操作，然后将**操作后的结果覆盖当前下标位置上的元素** 。

```Java
package com.Study.Array;

import java.util.Arrays;

/**
 * @Description parallelPrefix
 * parallelPrefix() 方法和 setAll() 方法一样，也是 Java 8 之后提供的，提供了一个函数式编程的入口，
 * 通过遍历数组中的元素，将当前下标位置上的元素与它之前下标的元素进行操作，然后将操作后的结果覆盖当前下标位置上的元素。
 * @Classname _9ParallelPrefix
 * @Date 2021/8/22 20:44
 * @Created by 折腾的小飞
 */
public class _9ParallelPrefix {
    public static void main(String[] args) {
        int[] arr = new int[]{1, 2, 3, 4, 5};

        Arrays.parallelPrefix(arr, ((left, right) -> left + right));
        // 相当于
        Arrays.parallelPrefix(arr, ((left, right) -> {
            System.out.println(left + "，" + right);
            return left + right;
        }));
        //Lambda 表达式执行了三次：
        //第一次是 1 和 2 相加，结果是 3，替换下标为 1 的位置
        //第二次是 3 和 3 相加，结果是 6，也就是第一次的结果和下标为 2 的元素相加的结果
        //第三次是 6 和 4 相加，结果是 10，也就是第二次的结果和下标为 3 的元素相加的结果

        System.out.println(Arrays.toString(arr));
    }
}
```


![image-20211124231119886](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/image-20211124231119886.png)

# 方法

方法就是若干语句的一个合集

```Java
方法名定义规则：小驼峰 标识符命名规则
方法定义的位置：在类里面，方法外面；所处位置与调用顺序无关
调用方法：方法名();

public static void 方法名(){
    code
}

```


### 参数和返回值

![image-20211124231133407](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/image-20211124231133407.png)

### 关于参数

```Java
有参：方法体需要参数进行操作要带上参数
无参：不需要参数，方法名后面括号不需要参数
```


**参数列表是否相同？** 

（1）参数个数

（2）参数类型

（3）参数顺序

### 关于返回值

方法需要返回一个值时，需要返回
不需要时，不用加 return,程序会默认添加一个 return 0;

### 数组方法

```Java
数组可作为返回值和参数
public static int[] f1(int[] arr) {
    return arr;
}
```


### 可变参数传参

可变参数必须是最后一个参数，不能有多个可变参数

```Java
System.out.println(getNumMax(2,4,3,4,-5,53,34,56));
public static int getNumMax(int... argments){
    for (int i=0;i<argments.length;i++){
        if(argments[0]<argments[i]){
            argments[0]=argments[i];
        }
    }
    return argments[0];
}
```


### 方法调用

`格式:方法名称(参数1，参数2,参数3)`
（1）直接调用 
（2）打印调用 System.out.println(方法名称(参数))
（3）赋值调用 数据类型 变量类型 = 方法名(参数)

### 定义格式

```Java
修饰符 返回值类型 方法名称(参数类型 参数1,参数类型 参数2...){
    return 返回值;
}

进入方法中的变量的名称称为形参，参数用逗号隔开
return作用
    （1）停止代码
    （2）返回需要的数据
```


### 异常处理

```Java
栈区溢出异常
StackOverflowError
    回调函数死循环
```


## 方法重载

多个方法名称相同，参数列表不同

```Java
public static void f1(){}
public static void f1(int a){}
public static void f1(double a){}
public static void f1(int a,int b){}
public static void f1(int a,double b){}
public static void f1(double b,int a){}
```


**注意** 

（1）函数名称一致（大小写）

（2）参数列表不同

**个数 类型 顺序** 

（3）和**返回值** 类型无关

（4）和**参数名称** 无关

## 重载方法的调用

```Java
根据参数列表调用
f1();
public static void f1(){}

f1(2);
public static void f1(int a){}

f1(2.5);
public static void f1(double a){}

f1(3,4);
public static void f1(int a,int b){}

f1(3,2.5);
public static void f1(int a,double b){}

f1(2.5,3);
public static void f1(double b,int a){}
```

