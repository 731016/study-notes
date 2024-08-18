**下载地址**

[Apache Tomcat® - Welcome!](https://tomcat.apache.org/)

# IDEA导入

## 新建项目

![image-20211124223240393](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/image-20211124223240393.png)

## 添加tomcat!

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/image-20211124223308753.png" style="zoom:80%;" />

## 部署项目

<img src="D:\xunleidownload\imgSave-master\imgSave-master\note\image-20211124223446489.png" alt="image-20211124223446489" style="zoom:67%;" />

## 控制台乱码

修改**tomcat目录**下的`logging.properties`文件的

```React
#java.util.logging.ConsoleHandler.encoding = UTF-8
java.util.logging.ConsoleHandler.encoding = GBK
```

![image-20211124223501748](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/image-20211124223501748.png)



## tomcat热更新

![image-20211124223515518](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202111271738701.png)

# 简单的web页面

```React
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<html>

<head>

  <title>$Title$</title>

</head>

<body>

<h1>Hello JSP</h1>

<%

  for (int i = 1; i <= 9; i++) {

    for (int j = 1; j <= i; j++) {

%>

<input type="button" value="<%=i%>*<%=j%>=<%=(i*j)%>">

<% }%>

  <br />

<%}%>

</body>

</html>
```