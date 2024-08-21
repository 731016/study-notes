# JavaAPI

# Object类

类Object是类层次结构的根。每个类都有Object作为超类。所有对象（包括数组）都实现了这个类的方法。

## toString

`public String toString()`

```java
@Override
public String toString() {
    return "Person{" +
            "age=" + age +
            ", name='" + name + '\'' +
            '}';
}
```


任何类需要打印内容需要**重写toString方法** 
返回的是**该对象的字符串** 

## equals()

`public boolean equals(Object obj)`



`Object默认的equals也调用==`


两个引用类型的数据时判断**内存地址** 

```java
//重写equals方法
@Override
public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    Phone phone = (Phone) o;
    return Double.compare(phone.price, price) == 0 &&
            Objects.equals(brand, phone.brand);
}
```


```java
import java.util.Objects;

public class Phone {
private String brand;
private double price;

public String getBrand() {
    return brand;
}
public void setBrand(String brand) {
    this.brand = brand;
}
public double getPrice() {
    return price;
}

public void setPrice(double price) {
    this.price = price;
}

    public Phone(String brand, double price) {
        this.brand = brand;
        this.price = price;
    }

    public Phone() {
    }

    @Override
    public String toString() {
        return "Phone{" +
                "品牌='" + brand + '\'' +
                ", 价格=" + price +
                '}';
    }

    @Override
    public int hashCode() {
        return super.hashCode();
    }
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Phone phone = (Phone) o;
        return Double.compare(phone.price, price) == 0 &&
                Objects.equals(brand, phone.brand);
    }
}

//main
Phone p1 = new Phone("华为", 5999);
        Phone p2 = new Phone("华为", 5999);
        System.out.println(p1 == p2);
        System.out.println(p1.equals(p2));
```


## hashCode()

`public int hashCode()`
返回对象的哈希码值。

# Date类

<br />Date类代表了一个特定的时间，以毫秒为精度

```java
//(1)获取当前时间的毫秒值
Date date=new Date();
System.out.println(date.getTime());

//(2)
System.out.println(System.currentTimeMillis());

//时间设定 通过构造方法设定
Date date1=new Date(0L);
```


# DateFormat类

`DateFormat`是一个用于日期/时间格式化子类的**抽象类** ，它以语言无关的方式格式化和分析日期或时间。

## SimpleDateFormat类

`SimpleDateFormat`是一个**具体的类** ，用于以区域设置敏感的方式格式化和解析日期。它允许格式化（日期文本），解析（文本日期）和规范化。

**操作步骤：** 

1. 创建一个SimpleDateFormat对象，构造方法中指定字符串格式类型

```.properties
格式：
  1. y 年
  2. M 月
  3. d 日
  4. H 小时
  5. m 分
  6. s 秒
```


2. 调用该对象的**parse方法** ，把符合对象格式的字符串解析为**date类型数据** 

```java
public static void main(String[] args) throws ParseException {
        String str="2021-8-1"; //字符串不能获取对应的方法
        SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
        Date date=sdf.parse(str);
    }

SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
        Date date = sdf.parse(str);
        System.out.println(date.getYear()); // 年 当前年份-1900
        System.out.println(date.getMonth()); // 从0开始 +1
        System.out.println(date.getDay()); //返回由此日期表示的星期几。 
返回的值（ 0 =星期日， 1 =星期二， 2 =星期二， 3 =星期三， 4 =星期二， 5 =星期五， 6 =星期六）
表示包含或以此时间表示的时刻开始的星期几Date对象

        String str = "12:47 2021/8/3";
        SimpleDateFormat sdf = new SimpleDateFormat("HH:mm yyyy/MM/dd");
        Date date = sdf.parse(str);
        System.out.println(date.getYear() + 1900+"年"+(date.getMonth()+1)+"月"+date.getDate()+"日");
//返回此Date对象所代表的月份。 返回的值在1和31之间
```


**日期转换为 2021年8月3日10:40:40** 

**操作步骤：** 

1. 创建SimpleDateFormat对象，通过构造方法定义好要转换的字符

2. 调用**format** 方法进行转换

```java
Date d = new Date();
SimpleDateFormat sf = new SimpleDateFormat("yyyy年MM月dd日 HH:mm:ss");
String s = sf.format(d);
System.out.println(s);
```



# Calendar类

`public abstract class Calendar`
Calendar类是一个抽象类，可以为在某一特定时刻和一组之间的转换的方法[calendar fields](https://www.yuque.com/java/util/Calendar.html#fields)

## 设置时间

```java
Calendar calendar = Calendar.getInstance();
        calendar.set(Calendar.YEAR, 2023); // 设置年份
        calendar.add(Calendar.YEAR, 2);
        calendar.add(Calendar.YEAR, -4);
        System.out.println(calendar.get(Calendar.YEAR));

        calendar.set(Calendar.MONTH, 12);
        calendar.add(Calendar.MONTH, -4);
        System.out.println(calendar.get(Calendar.MONTH)); //从0开始
```



# System类

`public final class System `

## gc()

`public static void gc()`*运行垃圾回收器。* 

## exit()

`public static void exit(int status)`
终止当前运行的Java虚拟机。 该参数作为状态代码; 按照惯例，非零状态码表示异常终止。

## currentTimeMillis()

`public static long currentTimeMillis()`
返回当前时间（以毫秒为单位）。

## arraycopy()

```.properties
public static void arraycopy(Object src,(需要复制的数组)
                      int srcPos,
                      Object dest,(复制到哪里的数组)
                      int destPos,
                      int length)将指定源数组中的数组从指定位置复制到目标数组的指定位置。
```


> **参数：** 
`src` - 源数组。 
`srcPos` - 源数组中的起始位置。 
`dest` - 目标数组。 
`destPos` - 目的地数据中的起始位置。 
`length` - 要复制的数组元素的数量。 


```java
public static void main(String[] args) {
        int[] arr={5,6,7,4};
        int[] arr2={34,65,34};
      System.exit(1); // 停止虚拟机运行
        //数组复制，具有覆盖效果
        System.arraycopy(arr2,0,arr,1,arr2.length);
        System.out.println(Arrays.toString(arr));
      System.gc(); // 启动垃圾回收器
    }
```



# String类

`public final class String`
不能被继承和重写

## 声明

String直接引号赋值，表示该值存在于字符串常量池中，而new出来的对象则该值存放在堆内存当中<br /><br /><br />字符串**一经声明无法改变长度** ，任何的拼接或删除都是创建新的字符串。

```java
/*
    String的声明
 */
public class StringDemo {
    public static void main(String[] args) {
        String str="hello world";
        String str5="hello world";
        String str1=new String("hello world");
        System.out.println(str == str1);
        System.out.println(str == str5);
        System.out.println(str.equals(str5));


        //将byte数组转换为字符串
        byte[] bytes=new byte[]{86,78,-46};
        String str2=new String(bytes);
        System.out.println(str2);

        //将char数组转换为字符串
        char[] chars=new char[]{'h','z','z'};
        String str3=new String(chars);
        System.out.println(str3);

        //将Stringbuilder转换为string
        StringBuilder sb=new StringBuilder("hello");
        String str4=new String(sb);
        System.out.println(str4);
    }
}

```



## 字符串比较

字符串比较内容，需要使用**equals方法** <br /><br /><br />**尽量将传来的参数放到equals方法作为参数！！！** 

```java
public static void main(String[] args) {
        //字符串的比较
        String st1 = "hello world";
        String st2 = new String("hello world");
        //字符串比较内容，需要使用equals方法
        System.out.println(st1.equals(st2));

        System.out.println("hello world".equals(st1));

        String st3 = null;
        //当使用equals方法时，尽量将传来的参数放到equals方法作为参数
        System.out.println(st3.equals(st1)); // 空指针
        System.out.println(st1.equals(st3));
    }
```



## charAt

`public char charAt(int index)`
返回指定索引处的char值。指数范围从**0到length() - 1**  。

```java
String st1 = "Don't Sleep";
char c = st1.charAt(1);
//当索引值超过字符串长度时，报错StringIndexOutOfBoundsException
// char c = st1.charAt(20);
System.out.println(c);
```


## concat

`public String concat(String str)`
将指定的字符串连接到该字符串的末尾。


如果参数字符串的长度为0 ，则返回此String对象。否则，返回一个String对象

```java
String st1 = "Don't Sleep";
st1=st1.concat("daffsf");
System.out.println(st1);
```


## replace

`public String replace(char oldChar,char newChar)`
返回从替换所有出现的导致一个字符串oldChar ，在这个字符串newChar

```java
String st1 = "Don't Sleep";
st1=st1.concat("daffsf");
st1 = st1.replace('f', 'g');
System.out.println(st1);
```

<br />

`public String replace(CharSequence target,CharSequence replacement)`

将与字面目标序列匹配的字符串的每个子字符串替换为指定的文字替换序列

`CharSequence`： 可以接收char或String

<br />

> **参数** 
`target` - 要替换的char值的序列 
`replacement` - char值的替换顺序


```java
//检测所有的字符并替换
st1=st1.replace("gg","**");
System.out.println(st1);
```


![image-20211124231236063](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/image-20211124231236063.png)

## replaceAll

`public String replaceAll(String regex, replacement)`
用给定的替换替换与给定的[regular  expression](https://www.yuque.com/xiaofei00152/util/regex/Pattern.html#sum)匹配的此字符串的每个子字符串。


> **参数** 
regex - 要匹配此字符串的正则表达式
replacement - 要替换每个匹配的字符串 


## toCharArray

`public char[] toCharArray()`将此字符串转换为新的字符数组。 
结果一个新分配的字符数组，其长度是该字符串的长度，其内容被初始化为包含由该字符串表示的字符序列。

```java
char[] chars=st1.toCharArray();
        for (int i = 0; i < chars.length; i++) {
            System.out.print(chars[i]+"\t");
        }
```


![image-20211124231247085](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/image-20211124231247085.png)

## getBytes

`public byte[] getBytes(String charsetName)`

```java
byte[] bytes=st1.getBytes();
        for (int i = 0; i < bytes.length; i++) {
            System.out.print(bytes[i]+"\t");
        }
```


![image-20211124231256956](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/image-20211124231256956.png)


## indexOf

`public int indexOf(int ch)`
返回指定字符第一次出现的字符串内的索引。


由该对象表示的字符序列中第一次出现字符的索引，如果字符没有找到，返回 -1 。

```java
String st1 = "food kood";
        int i = st1.indexOf("g");
        System.out.println(i);
```


![image-20211124231306066](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/image-20211124231306066.png)

## substring

`public String substring(int beginIndex)`
返回一个字符串，该字符串是此字符串的子字符串。
从指定下标开始截取一直到结尾


`public String substring(int beginIndex,int endIndex)`
从指定下标开始截取到指定下标结束
**下标包含开始下标，不包含结束下标** 

## split

`public String[] split(String regex)`
根据指定字符串进行拆分，并将剩余的字符串装到数组中

```java
String st1 = "food kood";
String[] st2 = st1.split("o");
        for (int i1 = 0; i1 < st2.length; i1++) {
            System.out.println(st2[i1]);
        }
```


![image-20211124231318155](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/image-20211124231318155.png)

```java
//提取网址信息
String urlStr = "https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&nsv_idx=1&tn=baidu&wd=1896年奥运会&fenlei=256";
String[] url = urlStr.split("/");
System.out.println("网址为：" + url[2]);

String parameter=url[3].substring(url[3].indexOf("?")+1);
String[] par = parameter.split("&");
for (int i = 0; i < par.length; i++) {
    if(par[i].indexOf("ie=")!=-1){
        System.out.println(par[i].replace("=", ":"));
    }else if(par[i].indexOf("f=")!=-1){
        System.out.println(par[i].replace("=", ":"));
    }
}
```


![image-20211124231327340](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/image-20211124231327340.png)



## toUpperCase

`public String toUpperCase()`
将字符串中所有小写字符转换为大写字符

## toLowerCase

`public String toLowerCase()`
将字符串中所有大写字符转换为小写字符

## contains

`public boolean contains(CharSequence s)`
判断字符串中是否包含指定的字符

当且仅当此字符串包含指定的char值序列时才返回true


## isEmpty

`public boolean isEmpty()`
判断字符串是否为空

## isBlank

`public boolean isBlank()`
判断认为空格也是空的

```java
System.out.println(" ".isEmpty());
System.out.println(" ".isBlank());
```


![image-20211124231336482](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/image-20211124231336482.png)

## valueOf

`public static String valueOf(int i)`
将基本类型转换为字符串类型

## trim

`public String trim()`
去掉字符串两端空格


# StringBuilder

`String`：不可变的，底层是由数组组成
`StringBuilder`：字符串缓冲区，可以提高字符串的效率

**构造方法** 

```java
new StringBuilder();
```


构造一个不带有任何字符的字符串生成器，**初始容量为16个字符** 

## append

`public StringBuilder append(String str)`
在原字符串上追加

