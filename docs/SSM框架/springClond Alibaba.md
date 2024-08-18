​        

## Nacos(Dynamic Naming and Configuration Service)

> 注册中心+配置中心 等价于 Eureka + Config + Bus

### :no_entry: 没有dashboard窗口

```xml
<component name="RunDashboard">
    <option name="configurationTypes">
      <set>
        <option value="SpringBootApplicationConfigurationType" />
      </set>
    </option>
  </component>
```

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202201142207801.png" alt="image-20220114220733108" style="zoom:80%;" />

### 下载安装

[https://nacos.io/zh-cn/](https://nacos.io/zh-cn/)

解压 运行bin目录下的startup.cmd

```powershell
启动命令
startup.cmd -m standalone
```

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202201142105169.png" alt="image-20220114210518577" style="zoom:80%;" />

```powershell
账号密码 nacos
访问地址：localhost:8848/nacos
```

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202201142106515.png" alt="image-20220114210607358" style="zoom:80%;" />



### 基于nacos的服务提供者

#### 父工程pom.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>org.example</groupId>
    <artifactId>springclondalibaba</artifactId>
    <packaging>pom</packaging>
    <version>1.0-SNAPSHOT</version>
    <modules>
        <module>cloudalibaba-provider-payment9001</module>
        <module>cloudalibaba-provider-payment9002</module>
    </modules>
    <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <maven.compiler.source>11</maven.compiler.source>
        <maven.compiler.target>11</maven.compiler.target>
        <junit.version>4.12</junit.version>
        <log4j.version>1.2.17</log4j.version>
        <lombok.version>1.16.18</lombok.version>
    </properties>

    <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-dependencies</artifactId>
                <version>2.1.9.RELEASE</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
            <dependency>
                <groupId>org.springframework.cloud</groupId>
                <artifactId>spring-cloud-dependencies</artifactId>
                <version>Greenwich.SR3</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
            <dependency>
                <groupId>com.alibaba.cloud</groupId>
                <artifactId>spring-cloud-alibaba-dependencies</artifactId>
                <version>2.1.0.RELEASE</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
            <dependency>
                <groupId>mysql</groupId>
                <artifactId>mysql-connector-java</artifactId>
                <version>8.0.11</version>
            </dependency>
            <dependency>
                <groupId>com.alibaba</groupId>
                <artifactId>druid</artifactId>
                <version>1.1.16</version>
            </dependency>
            <dependency>
                <groupId>org.mybatis.spring.boot</groupId>
                <artifactId>mybatis-spring-boot-starter</artifactId>
                <version>1.3.0</version>
            </dependency>
            <dependency>
                <groupId>junit</groupId>
                <artifactId>junit</artifactId>
                <version>${junit.version}</version>
            </dependency>
            <dependency>
                <groupId>log4j</groupId>
                <artifactId>log4j</artifactId>
                <version>${log4j.version}</version>
            </dependency>
            <dependency>
                <groupId>org.projectlombok</groupId>
                <artifactId>lombok</artifactId>
                <version>${lombok.version}</version>
                <optional>true</optional>
            </dependency>
        </dependencies>
    </dependencyManagement>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <configuration>
                    <fork>true</fork>
                    <addResources>true</addResources>
                </configuration>
            </plugin>
        </plugins>
    </build>


</project>
```

#### application.yml

```xml-dtd
server:
  port: 9001

spring:
  application:
    name: nacos-payment-provider
  cloud:
    nacos:
      discovery:
        server-addr: localhost:8848 #配置Nacos地址

management:
  endpoints:
    web:
      exposure:
        include: '*'
```

#### pom.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>springclondalibaba</artifactId>
        <groupId>org.example</groupId>
        <version>1.0-SNAPSHOT</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>

    <artifactId>cloudalibaba-provider-payment9001</artifactId>

    <dependencies>
        <!--SpringCloud ailibaba nacos -->
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
        </dependency>
        <!-- SpringBoot整合Web组件 -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>
        <!--日常通用jar包配置-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>
</project>
```

#### controller

```java
package com.wsd.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
@RestController
public class PaymentController {
    @Value("${server.port}")
    private String serverPort;

    @GetMapping(value = "/payment/nacos/{id}")
    public String getPayment(@PathVariable("id") Integer id)
    {
        return "nacos registry, serverPort: "+ serverPort+"\t id"+id;
    }

}

```

#### 启动类

```java
package com.wsd;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@EnableDiscoveryClient
@SpringBootApplication
public class PaymentMain9001 {
    public static void main(String[] args) {
        SpringApplication.run(PaymentMain9001.class, args);
    }

}

```



### 基于nacos的服务消费者

#### application.yml

```xml-dtd
server:
  port: 83


spring:
  application:
    name: nacos-order-consumer
  cloud:
    nacos:
      discovery:
        server-addr: localhost:8848


#消费者将要去访问的微服务名称(注册成功进nacos的微服务提供者)
service-url:
  nacos-user-service: http://nacos-payment-provider
```

#### pom.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>springclondalibaba</artifactId>
        <groupId>org.example</groupId>
        <version>1.0-SNAPSHOT</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>

    <artifactId>cloudalibaba-consumer-nacos-order83</artifactId>
    <dependencies>
        <!--SpringCloud ailibaba nacos -->
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
        </dependency>
        <!-- 引入自己定义的api通用包，可以使用Payment支付Entity -->
<!--        <dependency>-->
<!--            <groupId>com.atguigu.springcloud</groupId>-->
<!--            <artifactId>cloud-api-commons</artifactId>-->
<!--            <version>${project.version}</version>-->
<!--        </dependency>-->
        <!-- SpringBoot整合Web组件 -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>
        <!--日常通用jar包配置-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

</project>
```

#### controller

```java
package com.wsd.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import javax.annotation.Resource;

@RestController
public class OrderNacosController
{
    @Resource
    private RestTemplate restTemplate;

    @Value("${service-url.nacos-user-service}")
    private String serverURL;

    @GetMapping("/consumer/payment/nacos/{id}")
    public String paymentInfo(@PathVariable("id") Long id)
    {
        return restTemplate.getForObject(serverURL+"/payment/nacos/"+id,String.class);
    }

}
```

#### config

```java
package com.wsd.config;

import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class ApplicationContextBean
{
    @Bean
    @LoadBalanced //实现负载均衡
    public RestTemplate getRestTemplate()
    {
        return new RestTemplate();
    }
}
```

#### 启动类

```java
package com.wsd;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@EnableDiscoveryClient
@SpringBootApplication
public class OrderNacosMain83 {
    public static void main(String[] args) {
        SpringApplication.run(OrderNacosMain83.class,args);
    }
}
```

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202201142245322.png" alt="image-20220114224458857" style="zoom:80%;" />

### nacos作为配置中心（基本配置）

#### pom.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>springclondalibaba</artifactId>
        <groupId>org.example</groupId>
        <version>1.0-SNAPSHOT</version>
        <relativePath>../pom.xml</relativePath>
    </parent>
    <modelVersion>4.0.0</modelVersion>

    <artifactId>cloudalibaba-config-nacos-client3377</artifactId>
    <dependencies>
        <!--nacos-config-->
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-nacos-config</artifactId>
        </dependency>
        <!--nacos-discovery-->
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
        </dependency>
        <!--web + actuator-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>
        <!--一般基础配置-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

</project>
```

#### application.yml

```yaml
spring:
  profiles:
    active: dev # 表示开发环境
```

#### bootstrap.yml

```yaml
# nacos配置
server:
  port: 3377

spring:
  application:
    name: nacos-config-client
  cloud:
    nacos:
      discovery:
        server-addr: localhost:8848 #Nacos服务注册中心地址
      config:
        server-addr: localhost:8848 #Nacos作为配置中心地址
        file-extension: yaml #指定yaml格式的配置
  # ${spring.application.name}-${spring.profile.active}.${spring.cloud.nacos.config.file-extension}
```

#### controller

```java
package com.wsd.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RefreshScope //在控制器类加入@RefreshScope注解使当前类下的配置支持Nacos的动态刷新功能。
public class ConfigClientController {
    @Value("${config.info}")
    private String configInfo;

    @GetMapping("/config/info")
    public String getConfigInfo() {
        return configInfo;
    }
}
```

#### 启动类

```java
package com.wsd;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@EnableDiscoveryClient
@SpringBootApplication
public class NacosConfigClientMain3377
{
    public static void main(String[] args) {
        SpringApplication.run(NacosConfigClientMain3377.class, args);
    }
}
```

#### `dataId`字段配置规则

[Nacos Spring Cloud 快速开始](https://nacos.io/zh-cn/docs/quick-start-spring-cloud.html)

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202201142259444.png" alt="image-20220114225923631" style="zoom:80%;" />

```yaml
nacos-config-client-dev.yaml

prefix默认为spring.application.name的值
spring.profile.active为当前环境对应的profile
file-exetension为配置内容的数据格式
```

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202201142314380.png" alt="image-20220114231414735" style="zoom:80%;" />

#### 配置新增

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202201142311313.png" alt="image-20220114231059614" style="zoom:80%;" />

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202201142311945.png" alt="image-20220114231135596" style="zoom:80%;" />

#### 查看信息

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202201142326641.png" alt="image-20220114232606747" style="zoom:80%;" />

### 分类配置

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202201142329851.png" alt="image-20220114232945907" style="zoom:80%;" />

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202201142330104.png" alt="image-20220114233009497" style="zoom:80%;" />

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202201142329445.png" alt="image-20220114232912572" style="zoom:80%;" />

最外层的namespace是可以用于区分部署环境的，Group和DataID逻辑上区分两个目标对象

> 默认情况：
> <u>Namespace=public，Group=DEFAULT_GROUP, 默认Cluster是DEFAULT</u>
>
> Nacos默认的命名空间是public，Namespace主要用来实现隔离。
> 比方说我们现在有三个环境：开发、测试、生产环境，我们就可以创建三个Namespace，不同的Namespace之间是隔离的。
>
> Group默认是DEFAULT_GROUP，Group可以把不同的微服务划分到同一个分组里面去
>
> Service就是微服务；一个Service可以包含多个Cluster（集群），Nacos默认Cluster是DEFAULT，Cluster是对指定微服务的一个虚拟划分。
> 比方说为了容灾，将Service微服务分别部署在了杭州机房和广州机房，
> 这时就可以给杭州机房的Service微服务起一个集群名称（HZ），
> 给广州机房的Service微服务起一个集群名称（GZ），还可以尽量让同一个机房的微服务互相调用，以提升性能。
>
> 最后是Instance，就是微服务的实例。

##### dataid

**配置多个文件**

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202201142337714.png" alt="image-20220114233725300" style="zoom:80%;" />

###### application.yml

```yaml
spring:
  profiles:
    active: test # 表示开发环境 dev,测试环境 test
```

##### group

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202201142341113.png" alt="image-20220114234142649" style="zoom:80%;" />

###### bootstrap.yml

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202201142343119.png" alt="image-20220114234302282" style="zoom:80%;" />

##### namespace

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202201142346960.png" alt="image-20220114234634158" style="zoom:80%;" />

###### bootstrap.yml

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202201142351350.png" alt="image-20220114235106096" style="zoom:80%;" />

## nacos集群和持久化配置

[Nacos支持三种部署模式](https://nacos.io/zh-cn/docs/deployment.html)

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202201150005562.png" alt="image-20220115000529379" style="zoom:80%;" />

默认自带嵌入式数据库derby

### 单机模式支持mysql

在0.7版本之前，在单机模式时nacos使用嵌入式数据库derby实现数据的存储，不方便观察数据存储的基本情况。0.7版本增加了支持mysql数据源能力，具体的操作步骤：

- 1.安装数据库，版本要求：5.6.5+
- 2.初始化mysql数据库，数据库初始化文件：nacos-mysql.sql
- 3.修改conf/application.properties文件，增加支持mysql数据源配置（目前只支持mysql），添加mysql数据源的url、用户名和密码。

```properties
spring.datasource.platform=mysql

db.num=1
db.url.0=jdbc:mysql://127.0.0.1:3306/nacos_config?characterEncoding=utf8&connectTimeout=60000&socketTimeout=120000&autoReconnect=true&serverTimezone=UTC&useSSL=false
db.user=root
db.password=root
```

再以单机模式启动nacos，nacos所有写嵌入式数据库的数据都写到了mysql

#### sql脚本

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202201150013022.png" alt="image-20220115001346159" style="zoom:80%;" />

#### 修改配置

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202201150021741.png" alt="image-20220115002153799" style="zoom:80%;" />



## Sentinel熔断与限流

 <img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202201151443872.png" alt="image-20220115144314805" style="zoom:80%;" />

[Releases · alibaba/Sentinel · GitHub](https://github.com/alibaba/Sentinel/releases)

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202201151450541.png" alt="image-20220115145001993" style="zoom:80%;" />

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202201151451924.png" alt="image-20220115145120117" style="zoom:80%;" />

### 初始化工程

#### pom.xml

```xml
<dependencies>
        <!--SpringCloud ailibaba nacos -->
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
        </dependency>
        <!--SpringCloud ailibaba sentinel-datasource-nacos 后续做持久化用到-->
        <dependency>
            <groupId>com.alibaba.csp</groupId>
            <artifactId>sentinel-datasource-nacos</artifactId>
        </dependency>
        <!--SpringCloud ailibaba sentinel -->
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-sentinel</artifactId>
        </dependency>
        <!--openfeign-->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-openfeign</artifactId>
        </dependency>
        <!-- SpringBoot整合Web组件+actuator -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>
        <!--日常通用jar包配置-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>cn.hutool</groupId>
            <artifactId>hutool-all</artifactId>
            <version>4.6.3</version>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>

    </dependencies>
```

#### application.yml

```yaml
server:
  port: 8401

spring:
  application:
    name: cloudalibaba-sentinel-service
  cloud:
    nacos:
      discovery:
        #Nacos服务注册中心地址
        server-addr: localhost:8848
    sentinel:
      transport:
        #配置Sentinel dashboard地址
        dashboard: localhost:8080
        #默认8719端口，假如被占用会自动从8719开始依次+1扫描,直至找到未被占用的端口
        port: 8719

management:
  endpoints:
    web:
      exposure:
        include: '*'
```

#### controller

```java
package com.wsd.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
@RestController
public class FlowLimitController
{

    @GetMapping("/testA")
    public String testA()
    {
        return "------testA";
    }

    @GetMapping("/testB")
    public String testB()
    {
        return "------testB";
    }
}
```

#### 主启动类

```java
@EnableDiscoveryClient
@SpringBootApplication
public class MainApp8401
{
    public static void main(String[] args) {
        SpringApplication.run(MainApp8401.class, args);
    }
}
```





<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202201151502745.png" alt="image-20220115150240039" style="zoom:80%;" />

### 流控规则

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202201151510285.png" alt="image-20220115151017641" style="zoom:80%;" />

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202201151510129.png" alt="image-20220115151049664" style="zoom:80%;" />

#### 流控模式

##### 直接（快速失败）

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202201151515187.png" alt="image-20220115151539003" style="zoom:80%;" />

```txt
Blocked by Sentinel (flow limiting)
```

##### 关联

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202201151603420.png" alt="image-20220115160350007" style="zoom:80%;" />

大批量线程高并发访问B，导致A失效

Blocked by Sentinel (flow limiting)

##### 链路

？？？

#### 流控效果

##### 预热

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202201151653080.png" alt="image-20220115165342077" style="zoom:80%;" />

[流量控制 · alibaba/Sentinel Wiki · GitHub](https://github.com/alibaba/Sentinel/wiki/流量控制)

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202201151636281.png" alt="image-20220115163619492" style="zoom:80%;" />

> 默认 coldFactor 为 3，即请求QPS从(threshold / 3) 开始，经多少预热时长才逐渐升至设定的 QPS 阈值。
>
> ```
> 案例，阀值为10+预热时长设置5秒。
> 系统初始化的阀值为10 / 3 约等于3,即阀值刚开始为3；然后过了5秒后阀值才慢慢升高恢复到10
> ```

##### 排队等待

 [流量控制 · alibaba/Sentinel Wiki · GitHub](https://github.com/alibaba/Sentinel/wiki/流量控制)

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202201151654763.png" alt="image-20220115165404742" style="zoom:80%;" />

### 降级规则

[熔断降级 · alibaba/Sentinel Wiki · GitHub](https://github.com/alibaba/Sentinel/wiki/熔断降级)

```
Sentinel 熔断降级会在调用链路中某个资源出现不稳定状态时（例如调用超时或异常比例升高），对这个资源的调用进行限制，
让请求快速失败，避免影响到其它的资源而导致级联错误。
 
当资源被降级后，在接下来的降级时间窗口之内，对该资源的调用都自动熔断（默认行为是抛出 DegradeException）。
```



<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202201151657550.png" alt="image-20220115165739076" style="zoom:80%;" />

#### RT

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202201151715960.png" alt="image-20220115171547867" style="zoom:80%;" />

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202201151716734.png" alt="image-20220115171630272" style="zoom:80%;" />

```
按照上述配置，
 
  永远一秒钟打进来10个线程（大于5个了）调用testD，我们希望200毫秒处理完本次任务，
如果超过200毫秒还没处理完，在未来1秒钟的时间窗口内，断路器打开(保险丝跳闸)微服务不可用，保险丝跳闸断电了
 
后续我停止jmeter，没有这么大的访问量了，断路器关闭(保险丝恢复)，微服务恢复OK
```



#### 异常比例

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202201151715839.png" alt="image-20220115171527648" style="zoom:80%;" />

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202201151717870.png" alt="image-20220115171728000" style="zoom:80%;" />

按照上述配置，
单独访问一次，必然来一次报错一次(int age  = 10/0)，调一次错一次；

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202201151718635.png" alt="image-20220115171820648" style="zoom:80%;" />

开启jmeter后，直接高并发发送请求，多次调用达到我们的配置条件了。
断路器开启(保险丝跳闸)，微服务不可用了，不再报错error而是服务降级了。

#### 异常数

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202201151719169.png" alt="image-20220115171933488" style="zoom:80%;" />

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202201151720858.png" alt="image-20220115172006007" style="zoom:80%;" />

### 热点key限流

[热点参数限流 · alibaba/Sentinel Wiki · GitHub](https://github.com/alibaba/Sentinel/wiki/热点参数限流)

热点即经常访问的数据，很多时候我们希望统计或者限制某个热点数据中访问频次最高的TopN数据，并对其访问进行限流或者其它操作

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202201151738816.png" alt="image-20220115173802312" style="zoom:80%;" />

```java
@SentinelResource
处理的是Sentinel控制台配置的违规情况，有blockHandler方法配置的兜底处理；
 
RuntimeException
int age = 10/0,这个是java运行时报出的运行时异常RunTimeException，@SentinelResource不管
 
总结
 @SentinelResource主管配置出错，运行出错该走异常走异常
```

`参数必须是基础类型和string`

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202201151746154.png" alt="image-20220115174645359" style="zoom:80%;" />

### 系统规则

[系统自适应限流 · alibaba/Sentinel Wiki · GitHub](https://github.com/alibaba/Sentinel/wiki/系统自适应限流#系统规则)

### @SentinelResource















