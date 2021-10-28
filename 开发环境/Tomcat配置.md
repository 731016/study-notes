**下载地址**

[Apache Tomcat® - Welcome!](https://tomcat.apache.org/)

# IDEA导入

## 新建项目

![image-20211028154401703](https://raw.githubusercontent.com/731016/imgSave/master/note_img202110281544101.png)

## 添加tomcat

![image-20211028154442472](https://raw.githubusercontent.com/731016/imgSave/master/note_img202110281544719.png)

## 部署项目

![image-20211028154504821](https://raw.githubusercontent.com/731016/imgSave/master/note_img202110281545880.png)

## 控制台乱码

修改**tomcat目录**下的`logging.properties`文件的

```React
#java.util.logging.ConsoleHandler.encoding = UTF-8
java.util.logging.ConsoleHandler.encoding = GBK
```

![image-20211028154557956](https://raw.githubusercontent.com/731016/imgSave/master/note_img202110281546487.png)



## tomcat热更新

![image-20211028154623045](https://raw.githubusercontent.com/731016/imgSave/master/note_img202110281546282.png)

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