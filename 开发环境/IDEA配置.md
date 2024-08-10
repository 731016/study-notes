# IDEA配置

# JDK

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


[自动切换输入法](https://plugins.jetbrains.com/plugin/20575-smart-input/)

`Translation` 翻译插件

![image-20211124221844192](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202111271734433.png)

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

