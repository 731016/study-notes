# IO流

# 输入输出方向

**输入** ：就是从**硬盘** 读取文件到**内存** 当中

**输出** ：就是将**内存** 中的数据写到**硬盘** 当中

# IO流分类

## 字节流

1. `InputStream`

2. `OutputStream`​

## 字符流

1. `Reader`

2. `Writer`


# 操作文件的流

`File类`
`java.io.File`：对文件和目录的创建，查询和删除操作

## 构造方法

`public File (String pathname) `
通过将给定的路径名字符串转换为抽象路径名来创建新的`File`实例
​

`public File (String parent, String child) `
从**父路径名** 字符串和**子路径名** 字符串创建新的`File`实例
​

`public File ( File parent, String child) `
从**父抽象路径名** 和**子路径名字符串** 创建一个新的`File`实例。
​

`public File ( URI uri)`
通过将给定的`file:`  URI转换为抽象路径名来创建新的`File`实例。


## 字段

`public static final String  ``pathSeparator`
与系统相关的路径分隔符字符，为方便起见，表示为字符串

> windows返回：`;`
Linux返回：`:`


`public static final  String ``separator`
与系统相关的默认名称 - 分隔符字符，以方便的方式表示为字符串。

> windows返回：`\`


> linux返回：`/`


```java
public class Demo {
    public static void main(String[] args) {
        String path="D:\\360Downloads\\chinasoft\\javaSE\\day07\\src\\com\\ThreadCommunication\\demo5\\Demo.java";
        
        path.replace("\\",File.separator);
        File file=new File(path);
        System.out.println(path);
        
        File file1=new File("C:\\","temp.txt");
        System.out.println(file1);
        
        File f=new File("C:\\");
        File file2=new File(f,"temp.txt");
        System.out.println(file2);
    }
}
```



## File类获取功能的方法

`public long length()`
返回由此抽象路径名表示的文件的长度。 如果此路径名表示目录，则返回值未指定。

```java
long length = file1.length(); // 获取文件字节数
System.out.println(length);
```



`public String getAbsolutePath ()`返回此**抽象路径名** 的**绝对路径名** 字符串。
`public  String getPath ()` 将此**抽象路径名** 转换为**路径名字符串** 

> 参数是什么路径，得到的就是什么路径

`public String getName()` 返回由此抽象路径名表示的文件或目录的名称。

```java
File file=new File("aaa.txt");
String path=file.getAbsolutePath(); // 相对路径转换绝对路径
System.out.println(path);

File file=new File("D:\\360Downloads\\chinasoft\\javaSE\\day08\\src\\aaa.txt");
String path=file.getName();
System.out.println(path); // 获取文件路径
System.out.println(file.length()); // 获取字节数
```



## File类判断功能的方法

`public boolean isFile ()` 测试此抽象路径名表示的文件是否为普通文件。
`public boolean isHidden () `测试此抽象路径名命名的文件是否为隐藏文件。
`public boolean isDirectory ()` 测试此抽象路径名表示的文件是否为目录。
`public boolean exists ()` 测试此抽象路径名表示的文件或目录是否存在。
`public boolean canRead () `测试应用程序是否可以读取由此抽象路径名表示的文件。
`public boolean canWrite ()` 测试应用程序是否可以修改由此抽象路径名表示的文件。

## File类创建和删除功能的方法

`public boolean createNewFile ()` 当且仅当具有该名称的**文件尚不存在时** ，原子地创建一个**由该抽象路径名命名的新的空文件** 。
`public boolean  mkdir ()` 创建由此抽象路径名命名的目录。 
`public boolean  mkdirs ()` 创建由此抽象路径名命名的目录，包括任何必需但不存在的父目录。
请注意，如果此操作失败，它可能已成功创建一些必需的父目录。
`public boolean  renameTo ( File dest)` **重命名** 由此抽象路径名表示的文件。
`public boolean delete () `删除由此抽象路径名表示的文件或目录。 如果此路径名表示目录，则**目录必须为空才能删除** 。
`public void  deleteOnExit () `请求在虚拟机终止时删除由此抽象路径名表示的文件或目录。
文件（或目录）按注册的相反顺序进行删除。
调用此方法删除已注册删除的文件或目录无效。 将仅针对Java语言规范定义的虚拟机的正常终止而尝试删除。 
一旦请求删除，就无法取消请求。 因此，该方法应谨慎使用。

```java
public class Demo {
    public static void main(String[] args) throws IOException {
        File file=new File("D:\\360Downloads\\chinasoft\\javaSE\\a.txt");
        boolean newFile = file.createNewFile();
        System.out.println(newFile);

        file.renameTo(new File("D:\\360Downloads\\chinasoft\\javaSE\\aaaa")); // 改名字
        file.renameTo(new File("D:\\360Downloads\\chinasoft\\javaSE\\aaaa.txt"));

        File file1=new File("D:\\360Downloads\\chinasoft\\javaSE\\ddd");
        boolean mkdir = file1.mkdir();
        System.out.println(mkdir);

        File file2=new File("D:\\360Downloads\\chinasoft\\javaSE\\aaa\\bbb\\ccc");
        boolean mkdirs = file2.mkdirs(); // 只能创建目录
        System.out.println(mkdirs);
        
        File file = new File("D:\\360Downloads\\chinasoft\\javaSE\\a.txt");
        file.delete();
        file.deleteOnExit();
    }
}
```



## File类遍历目录的方法

`public String []  list ()`
返回一个字符串数组，命名由此抽象路径名表示的目录中的文件和目录。
`public File[] listFiles()`
返回一个抽象路径名数组，表示由该抽象路径名表示的目录中的文件。
​

### 注意

list方法和listFiles方法遍历的是构造方法给出的目录<br />​

**JDK 11做了优化以下不会报错** 

> 如果构造方法给出的目录不存在<br />如果给出的路径不是一个目录


```java
public class Demo {
    public static void main(String[] args) {
        File file=new File("D:\\360Downloads\\chinasoft\\javaSE\\day08\\src\\com\\io");
        String[] list = file.list();
        for (String s : list) {
            System.out.println(s);
        }

        File[] files = file.listFiles();
        for (File file1 : files) {
            System.out.println(file1);
        }
    }
}
```


![image-20211124230407014](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/image-20211124230407014.png)

<br />

### 删除多级目录

|- 需要遍历目录<br />- 如果目录中有目录存在 继续遍历，如果有文件存在则直接删除|
|---|
| |

```java
public class DeleteDir {
    public static void main(String[] args) throws IOException {
        File delDirectory = new File("del");
        File[] absoluteDirectory = delDirectory.getAbsoluteFile().listFiles();
        del(absoluteDirectory);

        delDirectory.delete();
    }

    private static void del(File... files) throws IOException {
        for (File file : files) {
            System.out.println(file);
            if (file.isFile()) {
                file.delete();
            }
            if (file.isDirectory()) {
                if (file.list().length == 0) {
                    file.delete();
                }
                else {
                    del(file.listFiles());
                }
            }
            file.delete();
        }
    }
}
```



# 字节流

一切皆字节
一切文件数据在存储的时候都是以二进制数字的形式保存，都是一个个字节，文件传输的时候也是如此
字节流可以传输任意文件数据，无论什么样的流对象，**底层传输的都是二进制数据** 

## 输出流


### `OutputStream`

`java.io.OutputStream` 所有**字节输出流** 的父类，作用将内存中的数据输出到磁盘

`public abstract class OutputStream`抽象类，定义了一些子类共性的方法

`public void write(byte[] b)`
将`b.length`字节从指定的字节数组写入此输出流。
​

`public void write(byte[] b,int off,int len)`
从位于偏移`off`的指定字节数组写入`len`字节到此输出流。
​

`public abstract void write(int b)`
将指定的字节写入此输出流

`public void flush()`
刷新此输出流并强制任何缓冲的输出字节被写出。 `flush`的一般合同是指出，如果以前写入的字节已经通过实现输出流缓冲，则应立即将这些字节写入到其预定目的地。 

`public void close()`
关闭此输出流并释放与此流相关联的任何系统资源。 `close`的总合同是关闭输出流。 封闭流不能执行输出操作，无法重新打开。



### FileOutputStream【有追加】

`public class FileOutputStream extends OutputStream`
作用：将内存中的数据写入到硬盘文件中

`public FileOutputStream(String name)`
创建文件输出流以指定的名称写入文件，写入目的为**路径** 



`public FileOutputStream(File file)`
创建文件输出流以写入由指定的`File`对象表示的文件，写入目的为**文件** 


#### 构造方法的使用

1. 创建`FileOutputStream`对象

2. 会根据构造方法中传递的文件路径/文件，创建一个空文件

3. 会把`FileOutputStream`对象指向创建好的文件

```java
// 创建对象
        OutputStream os=new FileOutputStream(new File("aaa.txt"));
        // 调用write方法写数据
        os.write("hello,world!".getBytes());
        // 释放资源
        os.close();
```



#### 写入原理（内存--->硬盘）

```java
java程序 -> jvm虚拟机 -> os操作系统 -> os调用写数据的方法 -> 把数据写到文件当中
```


`public FileOutputStream(String name, boolean append)`
创建文件输出流以指定的名称写入文件
`true`：如果第二个参数为`true` ，则字节**将写入文件的末尾** 而不是开头。

`public FileOutputStream(File file,boolean append)`
创建文件输出流以写入由指定的`File`对象表示的文件
`true`：如果第二个参数为`true` ，则字节将**写入文件的末尾** 而不是开头。
​



#### 换行符

`windows：\r\n`

``linux：\n`

mac：\r

```java
public class Print {
    public static void main(String[] args) throws IOException {
        OutputStream os=new FileOutputStream(new File("aaa.txt"),true);
        for (int i = 0; i < 10; i++) {
            os.write("hello,world".getBytes());
            os.write("\r\n".getBytes());
        }
        os.close();
    }
}
```



## 输入流

字节输入流：`InputStream`
`public int read()`
从输入流读取数据的下一个字节。
值字节被返回作为`int`范围`0`到`255` 。
如果没有字节可用，因为流已经到达，则返回值`-1`。

`public int read(byte[] b)`
从输入流中读取一些字节数，并将它们存储到缓冲器阵列`b` 。
实际读取的字节数作为整数返回。 ​
如果`b`的长度为零，则不会读取字节并返回`0` ; 否则，尝试读取至少一个字节。
如果没有字节可用，因为流在文件末尾，则返回值`-1` ; 否则，读取至少一个字节并将其存储到`b` 。
​

`public void close()`
关闭此输入流并释放与流相关联的任何系统资源。



### FileInputStream

`public class FileInputStream extends InputStream`
作用：将磁盘中的数据写入到内存中


#### 构造方法

|`FileInputStream(File file)填入一个文件`<br />`FileInputStream(String name)填入一个文件路径`|
|---|
| |




#### 读取原理

```java
java程序 -> JVM -> OS -> OS读取数据的方法 -> 读取文件
```


#### 实现步骤

1. 创建对象，构造中绑定读取的数据源

2. 使用对象的read方法，读取文件

3. 释放资源


#### 字节流一次读取多个字节

`public int read(byte[] b)`

#### 注意

1. 方法参数`byte[]`

&ensp;&ensp;&ensp;&ensp;作用：起到缓冲的作用，存储每次读取的多个字节

&ensp;&ensp;&ensp;&ensp;数组的长度一般定义为1024（1KB）或者1024的整数

2. 方法的返回值是`int`

&ensp;&ensp;&ensp;&ensp;每次读取的有效字节个数


#### String中字节转换为字符的方法

`String(byte[] bytes)`
`String(byte[] bytes,int offest,int length)`：将字节数组中的内容转换为String

```java
public class Demo {
    public static void main(String[] args) throws IOException {
        FileInputStream fis=new FileInputStream(new File("aaa.txt"));
        byte[] b=new byte[1024];
        int len;
        while ((len=fis.read(b))!=-1){
            System.out.println(new String(b,0,b.length));
        }
    }
}
```



#### 读取图片

```java
public class InputImg {
    public static void main(String[] args) throws IOException {
        InputStream ips = new FileInputStream(new File("C:\\Users\\折腾的小飞\\Desktop\\图片\\code\\java.png"));
        OutputStream ops = new FileOutputStream(new File("java.png"), true);

        int len;
        byte[] b = new byte[1024];
        while ((len = ips.read(b)) != -1) {
            ops.write(b, 0, len);
        }
        ips.close();
        ops.close();
    }
}

```



# 中文编码

```java
GBK：占2字节
UTF8：占3字节
```



# 字符流


## 字符输入流

`Reader`：字符输入流，所有字符输入流的底层父类


`public int read()`
读一个字符 该方法将阻塞，直到字符可用，发生I / O错误或达到流的结尾。
`public int read(char[] cbuf)`
将字符读入数组
`public abstract void close()`
关闭流并释放与之相关联的任何系统资源

## FileReader

`public class FileReader extends InputStreamReader --> Reader`
文件字符输入流

### 作用

把硬盘文件中文件中的数据以字符的形式读取到内存

### 构造方法

`public FileReader(String fileName)`
创建一个新的 `FileReader` ，给定要读取的文件的名称。 

`public FileReader(File file)`
创建一个新的 `FileReader` ，给予 `File`读取。 


### 使用步骤

1. 创建对象，构造方法中绑定要读取的数据源

2. 使用对象中的read方法读取文件

3. 释放资源

```java
FileReader fr = new FileReader("D:\\360Downloads\\chinasoft\\javaSE\\day09\\source\\a.txt");

char[] ch=new char[1024];
 int len;
 while ((len=fr.read(ch))!=-1){
  System.out.println(new String(ch, 0, len));
        }
fr.close();
```



## 字符输出流

`Writer`：字符输出流，所有字符输出流的底层父类

`public void write(char[] cbuf)`
写入一个**字符数组** 。 

`public abstract void write(char[] cbuf,int off, int len)`
写入**字符数组的一部分** 。

`public void write(String str)`
写一个**字符串** 

`public void write(String str, int off, int len)`
写一个**字符串的一部分** 。

`public Writer append(CharSequence csq)`
将指定的字符序列**附加** 到此作者。

`public abstract void flush()`
**刷新流** 。 如果流已经从缓冲区中的各种write（）方法保存了任何字符，请将它们立即写入到其预期目的地。

`public abstract void close()`
**关闭流，先刷新** 。 一旦流已关闭，进一步的write（）或flush（）调用将导致抛出IOException。



## FileWriter【有追加】

`public class FileWriter extends OutputStreamWriter --> Writer`

### 构造方法

`public FileWriter(File file)`
给一个File对象构造一个FileWriter对象。 

`public FileWriter(String fileName)`
构造一个给定文件名的FileWriter对象。 

`public FileWriter(String fileName,boolean append)`
构造一个FileWriter对象，给出一个带有布尔值的文件名，表示是否附加写入的数据。

`public FileWriter(File file, boolean append)`
给一个File对象构造一个FileWriter对象。 如果第二个参数为`true`  ，则字节将写入文件的末尾而不是开头。

### 使用步骤

1. 创建对象，绑定输出的目的地

2. 使用write方法，把数据写到内存缓冲区（字符转换为字节）

3. 使用flush方法，把内存缓冲区的数据刷新到文件中

4. 释放资源

```java
public class Demo {
    public static void main(String[] args) throws IOException {
        FileWriter fw=new FileWriter(new File("a.txt"),true);
        String str="今天没下雨";
        for (int i = 0; i < 10; i++) {
            fw.write(str+"\r\n");
            fw.flush();
        }

        FileReader fr=new FileReader(new File("a.txt"));
        int len;
        char[] ch=new char[1024];
        while ((len=fr.read(ch))!=-1){
            System.out.println(new String(ch, 0, len));
        }
        fw.close();
    }
}
```



# 流的异常处理

在**JDk1.7** 以前处理流的异常` try catch finally`<br />

## **格式1.7** 

```java
FileWriter fw = null;
        try {
            fw = new FileWriter(new File("a.txt"));
            fw.write("hello");
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                if(fw!=null){
                    fw.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
```


**JDK1.8 优化** <br />在try**后面添加了(),** **在()中** **定义流对象** ，作用域**只在try块中有效** <br />try代码执行完毕，会自动把流对象释放掉<br />​<br /><br />

## 格式1.8

```java
try (FileInputStream fis = new FileInputStream(new File("a.txt"));
     FileOutputStream fos = new FileOutputStream(new File("b.txt"));
    )
{
            int len;
            while ((len = fis.read()) != -1) {
                fos.write(len);
            }
} catch (IOException e) {
     e.printStackTrace();
}
```



**JDK1.9** <br />**try的前面可以定义流对象** <br />在try的（）中可以**直接引入流对象的名称（变量名）** <br />在try代码执行完毕后，流对象可以释放掉，不用写finally<br />


## **格式1.9** 

```java
public static void main(String[] args) throws IOException {
        FileInputStream fis = new FileInputStream(new File("a.txt"));
        FileOutputStream fos = new FileOutputStream(new File("b.txt"));
        try (fis; fos) {
            int len;
            while ((len = fis.read()) != -1) {
                fos.write(len);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }finally {
            fis.close();
        }
    }
```


**​** <br /><br />

# Properties

`public class Properties extends Hashtable<Object,Object>`
`Properties`类表示一组持久的属性。 
`Properties`可以保存到流中或从流中加载。 
属性列表中的每个键及其对应的值都是一个字符串。
​

**双列集合，key和value都是字符串** 



## 存储的方法

`public String getProperty(String key)`
使用此属性列表中指定的键搜索属性。
​

`public Object setProperty(String key,String value)`
调用`Hashtable`方法`put` 。
提供与`getProperty`方法的并行性。 强制使用字符串的属性键和值。
返回的值是`Hashtable`调用`put`的结果。
​

`public Set<String> stringPropertyNames()`
从该属性列表中返回一个**不可修改的键集** ，其中键及其对应的值是字符串，包括默认属性列表中的不同键，如果尚未从主属性列表中找到相同名称的键。
其关键字或值不是`String`类型的`String`被省略。 
返回的集合不受此`Properties`对象的支持。 对此`Properties`对象的更改不会反映在返回的集合中

```java
Properties pro=new Properties();
        //添加数据
        pro.setProperty("hello","你好");
        pro.setProperty("good","食物");
        //遍历集合
        Set<String> names = pro.stringPropertyNames();
        for (String key : names) {
            String value = pro.getProperty(key);
            System.out.println("key:"+key+"value:"+value);
        }
        fw.close();
```



## 集合 写入 磁盘

将**集合中的临时数据** ，写入到磁盘当中

`public void store(OutputStream out, String comments)`

将此属性列表（键和元素对）写入此`Properties`表中，以适合使用`load(InputStream)`方法加载到`Properties`表格的格式输出流。


`public void store(Writer writer,String comments)`

将此属性列表（键和元素对）写入此`Properties`表格中，以适合使用`load(Reader)`方法的格式将输出字符流。

`comments：注释用来解释说明保存文件是用来做什么，不能使用中文，会产生乱码，一般使用空字符串""`


### 使用步骤

1. 创建集合对象，给集合添加数据

2. 创建一个字节输出流/字符输出流，构造方法中绑定输出的位置

3. 使用集合对象的store方法，把集合中的数据存储到硬盘当中

4. 释放资源

```java
Properties pro=new Properties();
        //添加数据
        pro.setProperty("hello","你好");
        pro.setProperty("good","食物");
        //遍历集合
        Set<String> names = pro.stringPropertyNames();
        for (String key : names) {
            String value = pro.getProperty(key);
            System.out.println("key:"+key+"value:"+value);
        }
        FileWriter fw=new FileWriter(new File("a.txt"));
        pro.store(fw,"");

        fw.close();
```



## 磁盘 读出 集合

`public void load(InputStream inStream)`
从输入字节流读取属性列表（键和元素对）。
字节流读取，**不能读取中文** 

`public void load(Reader reader)`
以简单的线性格式从输入字符流读取属性列表（关键字和元素对）。
字节流读取，**可以读取中文** 

### 使用步骤

1. 创建对象

2. 使用集合中的load方法读取文件

3. 遍历集合

```java
Properties proRead=new Properties();
        FileReader fr=new FileReader(new File("a.txt"));
        proRead.load(fr);

        Set<String> keys = proRead.stringPropertyNames();
        for (String key : keys) {
            System.out.println(key+"："+proRead.getProperty(key));
        }
```



# 缓冲流

缓冲流：也称高效流，它是四个基本Filexxx流的增强

## 按照数据类型分类

**字节** 缓冲流：`BufferedInputStream`，`BufferedOutputStream`<br />**字符** 缓冲流：`BufferedReader`，`BufferedWriter`<br />​<br /><br />

## 缓冲流的原理

在创建对象的时候，会创建一个内置的默认大小的缓冲区数组，通过缓冲区读写，减小系统IO次数，从而提高读写效率<br />


## BufferedOutputStream

`public class BufferedOutputStream extends FilterOutputStream -->` `OutputStream`
该类实现缓冲输出流



### 构造方法

`public BufferedOutputStream(OutputStream out)`
创建一个新的缓冲输出流，以将数据写入指定的底层输出流。

`public BufferedOutputStream(OutputStream out, int size)`
创建一个新的缓冲输出流，以便以指定的缓冲区大小将数据写入指定的底层输出流。

` size：可以指定大小，也可以不指定`


### 使用步骤

1. 创建对象，构造方法中绑定要输出的目的地

2. 创建BufferOutputStream对象，构造方法中传递FileOutpurStream对象，提高FileOutpurStream效率

3. 使用BufferOutputStream对象中的write方法，把数据写入到内部缓冲区

4. 使用BufferOutputStream对象的flush方法，把数据刷新到文件中

5. 关闭资源，close方法，先刷新再关闭

```java
public class Demo {
    public static void main(String[] args) throws IOException {
        FileOutputStream fos=new FileOutputStream(new File("a.txt"));
        BufferedOutputStream bos=new BufferedOutputStream(fos,24);

        bos.write("写入缓冲区".getBytes());
        bos.flush();
        bos.close();
    }
}
```



## BufferInputStream

`public class BufferedInputStream extends FilterInputStream -- > InpntStream`

### 构造方法

`public BufferedInputStream(InputStream in)`
创建一个`BufferedInputStream`并保存其参数，输入流`in`供以后使用。
内部缓冲区数组被创建并存储在`buf` 。
​

`public BufferedInputStream(InputStream in, int size)`
创建具有指定缓冲区大小的`BufferedInputStream`  ，并保存其参数，输入流`in`供以后使用。 长度为`size`的内部缓冲区阵列创建并存储在`buf` 。

```java
public class Demo2 {
    public static void main(String[] args) throws IOException {
        FileInputStream fis=new FileInputStream(new File("a.txt"));
        BufferedInputStream bis=new BufferedInputStream(fis);

        int len;
        byte[] bytes=new byte[1024];
        while ((len=bis.read(bytes))!=-1){
            System.out.println(new String(bytes, 0, len));
        }
    }
}
```


![image-20211124230429079](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/image-20211124230429079.png)

<br />

## BufferedWriter

`public class BufferedWriter extends Writer`

### 构造方法

`public BufferedWriter(Writer out)`
创建使用默认大小的输出缓冲区的缓冲字符输出流

`public BufferedWriter(Writer out,int sz)`
创建一个新的缓冲字符输出流，使用给定大小的输出缓冲区。

```java
public class Demo3 {
    public static void main(String[] args) throws IOException {
        FileWriter fw=new FileWriter(new File("a.txt"));
        BufferedWriter bw=new BufferedWriter(fw);

        bw.write("缓冲区，字符输出流");
        bw.close();
    }
}
```



## BufferedReader

`public class BufferedReader extends Reader`

### 构造方法

`public BufferedReader(Reader in)`
创建使用默认大小的输入缓冲区的缓冲字符输入流。 

`public BufferedReader(Reader in,  int sz)`
创建使用指定大小的输入缓冲区的缓冲字符输入流。 

### 特有方法

`public String readLine()`
读一行文字。 一行被视为由换行符（'\ n'），回车符（'\  r'）中的任意一个，紧跟换行符的回车符或通过到达文件末尾终止（EOF）。
**返回值** 
**一个包含行的内容的字符串** ，不包括任何行终止字符，如果没有读取任何字符，如果流的结尾已经到达，则为null 


### 使用步骤

1. 创建一个字符输入流对象

2. 创建一个缓存字符输入流对象

3. 释放资源

```java
public class Demo4 {
    public static void main(String[] args) throws IOException {
        FileReader fr=new FileReader(new File("a.txt"));
        BufferedReader br=new BufferedReader(fr);
        String line;
        while ((line=br.readLine())!=null){
            System.out.println(line);
        }
    }
}
```



## 使用缓存字节流复制文字

```java
private static void copyText() throws IOException {
        FileReader fr = new FileReader(new File("b.txt"));
        BufferedReader br = new BufferedReader(fr);

        FileWriter fw = new FileWriter(new File("a.txt"));
        BufferedWriter bw = new BufferedWriter(fw);
        String line;
        while ((line = br.readLine()) != null) {
            bw.write(line);
            bw.flush();
        }
        bw.close();
        br.close();
    }
```



## 使用缓存字符流复制图片

```java
private static void copyImg() throws IOException {
        FileInputStream fis = new FileInputStream(new File("C:\\Users\\折腾的小飞\\Desktop\\图片\\1.JPG"));
        BufferedInputStream bis = new BufferedInputStream(fis);

        FileOutputStream fos = new FileOutputStream(new File("c.jpg"));
        BufferedOutputStream bos = new BufferedOutputStream(fos);
        int len;
        byte[] bytes = new byte[1024];
        while ((len = bis.read(bytes)) != -1) {
            bos.write(bytes,0,len);
            bos.flush();
        }
        bis.close();
        bos.close();
    }
```



# ObjectOutputStream

`public class ObjectOutputStream extends OutputStream`

## 构造方法

`public ObjectOutputStream(OutputStream out)`
创建一个写入指定的OutputStream的ObjectOutputStream

## 特殊的成员方法

`public final void writeObject(Object obj)`
将指定的对象写入ObjectOutputStream。

## 使用步骤

1. 创建ObjectOutputStream对象，构造方法中传递字节输出流

2. 使用对象的writeObject方法，将对象输出到文件中

3. 释放资源

```java
public class Person implements Serializable {
   // private final long serialVersionUID = 1L;
    private String name;
    private int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public Person() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    @Override
    public String toString() {
        return "Person{" +
                "name='" + name + '\'' +
                ", age=" + age +
                '}';
    }
}
public class Demo {
    public static void main(String[] args) throws IOException {
        ObjectOutputStream oos=new ObjectOutputStream(new FileOutputStream("obj.txt"));
        oos.writeObject(new Person("站撒",21));
        oos.close();
    }
}
```



# Serializable接口

也称为标记接口<br />要进行序列化和反序列化必须要实现该接口，实现后相当于给这个类添加了一个标记<br />当我们进行序列化和反序列化时就会检测该类上面是否有这个标记

> 有：正常的序列化<br />没有：报错 NotSerializableException



# ObjectInputStream

`public class ObjectInputStream extends InputStream`
对象的反序列化流

## 作用

将文件中保存的对象，以流的形式读取到内存<br />

## 特殊的方法

`public final Object readObject()`
从ObjectInputStream读取一个对象。

```java
public class Demo3 {
    public static void main(String[] args) throws IOException, ClassNotFoundException {
        Person person=new Person("笑死",45);
        ObjectInputStream ois=new ObjectInputStream(new FileInputStream("obj.txt"));
        Object o=ois.readObject();
        Person p=(Person)o;
        System.out.println(p);
    }
}
```



# 序列化与反序列化

序列化：把**对象** 转换为**字节序列** 的过程称为对象的序列化。
反序列化：把字节序列恢复为对象的过程称为对象的反序列化。
​


## 什么情况下需要序列化

当你想把的内存中的对象状态保存到一个文件中或者数据库中时候；<br />当你想用套接字在网络上传送对象的时候；<br />当你想通过RMI传输对象的时候；

```java
package com.study.SerializableImpl;

import java.io.Serializable;

/**
 * @Description 实现对象序列化
 * @Classname Demo1
 * @Date 2021/9/12 13:09
 * @Created by 折腾的小飞
 */
public class Student implements Serializable {
    private static final long serialVersionUID = 1L;
    private String name;
    private Integer age;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public Student() {
    }

    public Student(String name, Integer age) {
        this.name = name;
        this.age = age;
    }

    @Override
    public String toString() {
        return "Student{" +
                "name='" + name + '\'' +
                ", age=" + age +
                '}';
    }
}
```



## 序列化多个对象

```java
package com.study.SerializableImpl;

import java.io.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * @Description TODO
 * @Classname StudentSerializable
 * @Date 2021/9/12 14:23
 * @Created by 折腾的小飞
 */
public class StudentSerializable {
    public static void main(String[] args) {
        Student stu = new Student("胡梓卓", 22);
        Student stu1 = new Student("涂鏊飞", 21);
        Student[] stus = {stu, stu1};
        try {
            ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(new File("./stu.txt")));

            /*oos.writeObject(stus); // 写入一个对象数组
            oos.flush();*/

            /*for (Student student : stus) {
                oos.writeObject(student);
                oos.flush();
            }
            oos.writeObject(null);*/

            for (Student student : stus) {
                oos.writeObject(student);
                oos.flush();
            }

            System.out.println("对象序列化成功");


            ObjectInputStream ois = new ObjectInputStream(new FileInputStream("./stu.txt"));
            // 存入文件时，将几个对象放入一个Object[] 数组中，然后再读取。
            Object[] arrStu = (Object[]) ois.readObject();
            for (Object o : arrStu) {
                System.out.println(o);
            }


            // 第二种方法，在写入时最后写入null
            Student s=null;
            while ((s= (Student) ois.readObject())!=null){
                System.out.println(s);
            }

            // 用available判断是否达到了文件末尾
            Object obj = null;
            while (ois.available() > 0) {
                obj = ois.readObject();
                System.out.println(obj);
            }

            /*System.out.println(ois.available());*/
            System.out.println("对象反序列化成功");
            oos.close();
            ois.close();
        } catch (IOException e) {
            e.printStackTrace();
        }

    }
}

```


```java
public class Demo4 {
    public static void main(String[] args) throws IOException, ClassNotFoundException {
        Set<Person> set=new HashSet<>();
        set.add(new Person("战士",21));
        set.add(new Person("法国",34));
        set.add(new Person("简单",12));
        // 序列化
        ObjectOutputStream oos=new ObjectOutputStream(new FileOutputStream(new File("d.txt")));
        oos.writeObject(set);
        oos.close();

        // 反序列化
        ObjectInputStream ois=new ObjectInputStream(new FileInputStream(new File("d.txt")));
        Set<Person> set1=(Set<Person>)ois.readObject();
        System.out.println(set1);
    }
}
```


```java
// 4.txt
�� sr java.util.HashSet�D�����4  xpw   ?@     sr com.demo6.Person��f�}� I ageL namet Ljava/lang/String;xp   t 战士sq ~    t 
简单sq ~    "t 法国x
```


![image-20211124230446373](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/image-20211124230446373.png)


> 需求说明：从控制台接收3名学员的信息，每条信息存储到一个Student对象中，将多个Student对象存储到一个集合中。输入完毕后，将所有学员信息存储到文件Student.txt中。每名学员信息存储一行，多个属性值中间用逗号隔开。


```java
public class Test11 {
    public static void main(String[] args) throws IOException, ClassNotFoundException {
        Scanner r = new Scanner(System.in);
        Set<Student> set = new HashSet<>();
        System.out.println("输入要接收学员的数量：");
        int count = r.nextInt();
        int countFix = count;
        while (count > 0) {
            System.out.println("输入第" + (countFix - count + 1) + "名学员的姓名：");
            r.nextLine();
            String name = r.nextLine();
            System.out.println("输入第" + (countFix - count + 1) + "名学院的年龄：");
            int age = r.nextInt();
            set.add(new Student(name, age));
            count--;


        }

        ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("Student.txt"));
        for (Student student : set) {
            oos.writeObject(student+"\r\n");
        }
        oos.writeObject(null);

        oos.close();

        ObjectInputStream ois = new ObjectInputStream(new FileInputStream("Student.txt"));
        String stu = null;
        PrintStream ps=new PrintStream(new FileOutputStream("StudentPrint.txt"));
        System.setOut(ps);
        while ((stu = (String) ois.readObject()) != null) {
            System.out.println(stu);
        }
        ois.close();

//        Set<Student> set1 = (HashSet<Student>) ois.readObject();
//        System.out.println(set);


//        BufferedReader br=new BufferedReader(new FileReader("Student.txt"));
//        String line;
//        while ((line=br.readLine())!=null){
//            System.out.println(line);
//        }
    }
}
```



## 判断对象流已经读取到文件末尾的方法

[https://www.cnblogs.com/NirobertEinteson/p/12025049.html](https://www.cnblogs.com/NirobertEinteson/p/12025049.html)

# PrintStream

`public class PrintStream extends FilterOutputStream`

**打印流** <br />

## 特点

1. 只负责数据的输出不负责读取数据

2. 与其他的流不同，永远不会抛出异常

3. 特有方法println，print

```java
public class Demo {
    public static void main(String[] args) throws FileNotFoundException {
        PrintStream ps=new PrintStream("d.txt");
        ps.write(98);
        ps.print(99); // 不换行打印
        ps.println(102); // 换行打印
        ps.close();
    }
}
```



## 标准化输出

在控制台打印
如果使用`System.setOut`方法可以改变输出的位置


`public static void setOut(PrintStream out)`
重新分配“标准”输出流。

```java
public class Demo2 {
    public static void main(String[] args) throws FileNotFoundException {
        System.out.println("标准控制台打印");
        PrintStream ps=new PrintStream("d.txt");
        System.setOut(ps);
        System.out.println("文本打印");
        ps.close();
    }
}
```

