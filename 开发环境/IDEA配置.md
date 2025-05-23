# IDEA配置

[idea下载](https://www.jetbrains.com/idea/download/other.html#soujer.com)

# JDK

[jdk下载](https://www.oracle.com/java/technologies/downloads/?er=221886)

```PowerShell
配置环境变量(系统变量)
JAVA_HOME
C:\Program Files\Java\jdk-11.0.8

Path 添加
%JAVA_HOME%\bin;
```

# 快捷方法

## 快速生成返回值

```Java
在要返回的值后面输入.var 回车
```

## 文本操作

```Java
ctrl+d复制一行到下一行

shift+alt>+方向键移动一行

Shift + ctrl + L 格式化代码

ctrl+Y 删除当前行

alt + 鼠标选定 整体选定光标移动到每行最后

ctrl + R 搜索替换

ctrl+F 搜索

Shift+F12还原默认布局
```

# 代码样式

```text
安装系统版本x64 x32
Settings -> 
        字体 Editor Font [15 Consolas/Droid Sans Mono]
        编码 Editor File Encodings UTF-8
        代码样式Editor ColorScheme Language Defaults 注释改一下颜色
        主题和背景 Appearance
```

# 自动折叠空白包

# 标签全部显示

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202112292132906.png" alt="image-20211124221757311" style="zoom:80%;" />

# IDEA运行程序无效

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202112292132112.png" alt="image-20211124221824624" style="zoom:80%;" />

# 自定义文件，方法注释

[Idea 设置类、方法注释模板(解决params和return显示问题)---不来虚的 实测有效_一颗浑身披带雪花的松树---[雪松\]-CSDN博客](https://blog.csdn.net/jianxia801/article/details/114022122)

# 插件

[技巧 | 如何用 IDEA 提升十倍开发效率？ (qq.com)](https://mp.weixin.qq.com/s?__biz=MzI1NDczNTAwMA==&mid=2247484184&idx=1&sn=1b064ad5e4d560ebf6f9a95cc0a10488&chksm=e9c1e4efdeb66df9e0e81e35af969ec5d31f463a3bc82ba61b7bf6d29585c8a549438dbe3dfe#rd)



## smart-input

[自动切换输入法](https://plugins.jetbrains.com/plugin/20575-smart-input/)



## `Translation` 翻译插件

![image-20211124221844192](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202111271734433.png)

## Rainbow Brackets

给括号添加彩虹色，使开发者通过颜色区分括号嵌套层级，便于阅读



## String Manipulation

字符串快捷处理



## Alibaba Java Coding Guidelines

代码规范检查插件



## SonarLint/SonarQube for IDE

帮助你发现和修复代码的错误和漏洞



## MybatisX

MyBatis 增强插件，支持自动生成 entity、mapper、service 等常用操作的代码，优化体验



## Mybatis Log

组装的 SQL 和参数一目了然，调试时再也不用像福尔摩斯一样挖掘线索了。



## .ignore

生成不同语言的版本控制忽略文件



## GenerateAllSetter

快速生成调用对象 setter 方法的代码



## SerialVersionUID

实现 Serializable 接口时，还在为那串长长的数字烦恼？一键生成，轻松搞定。

## Easy Code

根据数据库表生成 Java entity、dao、mapper、service、controller 等代码



## Camel Case

变量命名风格转换器，再也不用担心被驼峰和下划线搞晕，代码风格统一，强迫症患者的福音。

## Free Mybatis Plugin

MyBatis 增强插件，支持 mapper => xml 的跳转、代码生成等功能



## Maven Helper

Maven 辅助插件



## Arthas Idea

Arthas 命令生成插件。Arthas 是阿里开源的 Java 在线诊断工具，该插件可以自动生成 Arthas 在线 Java 代码诊断命令，不用再到官网翻文档拼命令啦！



## VisualGC

可视化查看堆栈和 GC 信息，让您对内存情况了如指掌，再也不用盲人摸象





## Grep Console

控制台日志高亮显示，关键信息一目了然，再也不用在黑白的日志中大海捞针



## BashSupport

支持 Bash 脚本文件的高亮和提示等





## .env files support

支持 .env 文件的高亮和提示等



## lombok

`lombok-1.18.12.jar` **使用方法**

```java
@Data
@NoArgsConstructor
@AllArgsConstructor
```

## 测试类

`junit-4.12.jar` **4.1以上必须要：** `hamcrest-core-1.3.jar` **使用**`@Test`注解，测试方法不能有返回值和参数 

被@Test注解修饰的方法所在的类**只能有一个构造器** 被@Test注解修饰的方法所在的类**只能有一个修饰符为public公有的无参的构造器**



## 代码提示  

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202112292132970.png" alt="image-20211124221905121" style="zoom:80%;" />                   



## idea控制台乱码

https://cloud.tencent.com/developer/article/1795283

