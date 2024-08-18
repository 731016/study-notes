# MAVEN配置

[Maven – Download Apache Maven](https://maven.apache.org/download.cgi)



# 设置 Maven 环境变量

新建系统变量 **MAVEN_HOME**，变量值：自己的安装文件夹

![image-20211124221930804](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/image-20211124221930804.png)

编辑系统变量 **Path**，添加变量值：

```PowerShell
;%MAVEN_HOME%\bin
```

![image-20211124221947523](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/image-20211124221947523.png)

```PowerShell
mvn -version
```

# maven源设置

[maven镜像-maven下载地址-maven安装教程-阿里巴巴开源镜像站 (aliyun.com)](https://developer.aliyun.com/mirror/maven)

```xml
apache-maven-3.6.3\conf\settings.xml
<!--本地仓库路径-->
<localRepository>D:/360Downloads/maven/apache-maven-3.6.3-bin/repository</localRepository>

<mirrors>
     <!-- 阿里云仓库 -->
        <mirror>
          <id>aliyunmaven</id>
          <mirrorOf>*</mirrorOf>
          <name>阿里云公共仓库</name>
          <url>https://maven.aliyun.com/repository/public</url>
        </mirror>
  </mirrors>


  <profiles>
  <id>jdk-11</id>
      <activation>
      <activeByDefault>true</activeByDefault>
        <jdk>11</jdk>
      </activation>

      <properties>
        <maven.compiler.source>11</maven.compiler.source>
    <maven.compiler.target>11</maven.compiler.target>
    <maven.compiler.compilerVersion>11</maven.compiler.compilerVersion>
      </properties>
  </profiles>
```

## IDEA配置maven

## <img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202112292132356.png" alt="image-20211124222700068" style="zoom:67%;" />

# 运行maven项目

![image-20211124222731245](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202111271735488.png)

![image-20211124222757353](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/image-20211124222757353.png)

![image-20211124222821518](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202111271735229.png)

# 依赖

```XML
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <!-- 坐标 /com/mvn/demo/1.0-SNAPSHOT -->
    <groupId>com.mvn.demo</groupId>
    <artifactId>demo_maven</artifactId>
    <version>1.0-SNAPSHOT</version>

    <!-- jar依赖配置-->
    <dependencies>
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>5.1.6</version>
        </dependency>
        <!-- https://mvnrepository.com/artifact/com.alibaba/druid -->
        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>druid</artifactId>
            <version>1.2.6</version>
        </dependency>
        <!-- https://mvnrepository.com/artifact/org.projectlombok/lombok -->
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <version>1.18.20</version>
            <scope>provided</scope>
        </dependency>
        <!-- https://mvnrepository.com/artifact/commons-dbutils/commons-dbutils -->
        <dependency>
            <groupId>commons-dbutils</groupId>
            <artifactId>commons-dbutils</artifactId>
            <version>1.6</version>
        </dependency>
        <!-- https://mvnrepository.com/artifact/org.hamcrest/hamcrest-core -->
        <dependency>
            <groupId>org.hamcrest</groupId>
            <artifactId>hamcrest-core</artifactId>
            <version>1.3</version>
            <scope>test</scope>
        </dependency>
        <!-- https://mvnrepository.com/artifact/javax.servlet/jstl -->
        <dependency>
            <groupId>javax.servlet</groupId>
            <artifactId>jstl</artifactId>
            <version>1.2</version>
        </dependency>

    </dependencies>
    <!-- 插件-->
    <build>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>3.8.1</version>
                <configuration>
                    <source>11</source>
                    <target>11</target>
                </configuration>
            </plugin>
        </plugins>
    </build>

</project>
```

## 导入自己的项目

```XML
<dependencies>
        <dependency>
            <groupId>com.mvn.demo</groupId>
            <artifactId>demo_maven</artifactId>
            <version>1.0-SNAPSHOT</version>
        </dependency>
    </dependencies>
```

# 支持jsp，servlet

```XML
<dependency>
            <groupId>javax.servlet.jsp</groupId>
            <artifactId>javax.servlet.jsp-api</artifactId>
            <version>2.3.3</version>
            <scope>provided</scope>
        </dependency>
        <dependency>
            <groupId>javax.servlet</groupId>
            <artifactId>javax.servlet-api</artifactId>
            <version>4.0.1</version>
        </dependency>
```

![image-20211124222857539](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/image-20211124222857539.png)

# 依赖管理

## 依赖范围

```XML
<dependency>
            <groupId>javax.servlet</groupId>
            <artifactId>javax.servlet-api</artifactId>
            <version>4.0.1</version>
            <scope>provided</scope>
</dependency>
```

| scope取值    | 有效范围（compile, runtime, test） | 依赖传递 | 例子        |
| ------------ | ---------------------------------- | -------- | ----------- |
| **compile**  | all                                | 是       | spring-core |
| **provided** | compile, test                      | **否**   | servlet-api |
| **runtime**  | runtime, test                      | 是       | JDBC驱动    |
| **test**     | test                               | **否**   | JUnit       |
| **system**   | compile, test                      | 是       |             |

[Maven之scope详解 - satire - 博客园 (cnblogs.com)](https://www.cnblogs.com/satire/p/15068971.html)

## 打包方式

```XML
zip
tar
tar.gz (or tgz)
tar.bz2 (or tbz2)
tar.snappy
tar.xz (or txz)
jar
dir
war
```

## 父工程demo_maven

```XML
<modelVersion>4.0.0</modelVersion>

<!-- 坐标 /com/mvn/demo/1.0-SNAPSHOT -->
<groupId>com.mvn.demo</groupId>
<artifactId>demo_maven</artifactId>
<version>1.0-SNAPSHOT</version>
<modules>
        <module>dem_children</module>
        <module>demo_utils</module>
</modules>
<!--    打包方式 pom,jar,war-->
<packaging>pom</packaging>
```

## 子工程demo_utils

```XML
<parent>
        <artifactId>demo_maven</artifactId>
        <groupId>com.mvn.demo</groupId>
        <version>1.0-SNAPSHOT</version>
</parent>
<modelVersion>4.0.0</modelVersion>

<artifactId>demo_utils</artifactId>
<version>1.0</version>
```

## 同级子工程demo_children

```XML
<parent>
        <artifactId>demo_maven</artifactId>
        <groupId>com.mvn.demo</groupId>
        <version>1.0-SNAPSHOT</version>
</parent>
    
<modelVersion>4.0.0</modelVersion>

<artifactId>dem_children</artifactId>
<version>1.0</version>
<!-- 导入demo_utils-->
<dependencies>
        <dependency>
            <groupId>com.mvn.demo</groupId>
            <artifactId>demo_utils</artifactId>
            <version>1.0</version>
        </dependency>
</dependencies>
```

## 依赖冲突

### 1. 使用第一声明者优先原则

谁先定义的就用谁的传递依赖，即在pom.xml文件自上而下，先声明的jar坐标，就先引用该jar的传递依赖。

```XML
  <dependencies>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-aop</artifactId>
            <version>5.2.0.RELEASE</version>
        </dependency>
        
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-context</artifactId>
            <version>5.2.7.RELEASE</version>
        </dependency>

    </dependencies>
```

### 2. 使用路径近者优先原则

即直接依赖级别高于传递依赖

```XML

```

### 3. 排除依赖

```XML
 <dependencies>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-context</artifactId>
            <version>5.2.7.RELEASE</version>
            <exclusions>
                <exclusion>
                    <artifactId>spring-core</artifactId>
                    <groupId>org.springframework</groupId>
                </exclusion>
            </exclusions>
        </dependency>

        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-aop</artifactId>
            <version>5.2.0.RELEASE</version>
        </dependency>

    </dependencies>
```

### 4. 版本锁定

使用dependencyManagement 进行版本锁定，dependencyManagement可以统一管理项目的版本号，确保应用的各个项目的依赖和版本一致。

**仅仅起到指锁定依赖版本的作用，其它的作用它什么都没有**

```XML
<!--锁定依赖的版本，它仅仅是起到锁定作用，不下载依赖包-->
<dependencyManagement>
  <dependencies>
  <!-- Junit单元测试依赖 -->
    <dependency>
      <groupId>junit</groupId>
      <artifactId>junit</artifactId>
      <version>4.11</version>
      <scope>test</scope>
    </dependency>
  </dependencies>
</dependencyManagement>
<!--    版本常量-->
    <properties>
        <lombok-version>1.18.20</lombok-version>
    </properties>
<!--    版本锁定-->
    <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>org.projectlombok</groupId>
                <artifactId>lombok</artifactId>
                <version>${lombok-version}}</version>
            </dependency>
        </dependencies>
    </dependencyManagement>
```

### **dependencies和dependencyManagement的区别：**

`dependencies`是真正引入依赖的元素。而且在子项目中不写该依赖项，那么子项目仍然会从父项目中继承该依赖项（全部继承）。 `dependencyManagement`里只是声明依赖，并不实现引入，因此子项目需要显示的在dependencies中声明需要用的依赖。如果不在子项目中声明依赖，是不会从父项目中继承下来的；只有在子项目中写了该依赖项，并且没有指定具体版本，才会从父项目中继承该项，并且version和scope都读取自父pom;另外如果子项目中指定了版本号，那么会使用子项目中指定的依赖版本。

# 手动部署到服务器

## 新建web模块

![image-20211124222923709](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/image-20211124222923709.png)

## 配置web目录

![image-20211124222946844](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/image-20211124222946844.png)

## maven编译,打包,安装

https://blog.csdn.net/zhan107876/article/details/93197985

## 复制打包好的.war文件

![image-20211127173751201](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202111271737102.png)

## 设置tomcat管理用户名密码

![image-20211124223204383](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/image-20211124223204383.png)

```XML
<role rolename="manager-gui"/>
<user username="tomcat" password="s3cret" roles="manager-gui"/>
```

## cmd启动tomcat

![image-20211124223216479](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/image-20211124223216479.png)

```PowerShell
startup 启动
shutdown 停止
localhost:8080/manager
输入账号密码
```