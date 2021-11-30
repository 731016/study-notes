### controller

```java
@RestController
public class DemoController {
    @Resource
    private RestTemplate restTemplate;
    @RequestMapping("/qq")
    public List<Product> qq(){
        String url = "http://192.168.5.110:8777/product/restful";
        List<Product> products = restTemplate.getForObject(url, List.class);
        return products;
    }
}
```

### 启动类

```java
@SpringBootApplication
public class App {

    @Bean
    public RestTemplate getRestTemplate() {
        return new RestTemplate();
    }

    public static void main(String[] args) {
        SpringApplication.run(App.class, args);
    }
}
```

## 注册中心、生产者、消费者

### 父级工程

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>org.example</groupId>
    <artifactId>springclondPCR</artifactId>
    <packaging>pom</packaging>
    <version>1.0-SNAPSHOT</version>
    <modules>
        <module>eureka</module>
        <module>provider</module>
        <module>customer</module>
    </modules>

    <parent>
        <groupId>org.springframework.boot</groupId>
        <version>2.1.5.RELEASE</version>
        <artifactId>spring-boot-starter-parent</artifactId>
    </parent>
    <properties>
        <java.version>11</java.version>
        <spring-cloud.version>Greenwich.SR6</spring-cloud.version>
        <mapper.starter.version>2.1.5</mapper.starter.version>
        <mysql.version>8.0.11</mysql.version>
    </properties>
    <dependencyManagement>
        <dependencies>
            <!-- springCloud -->
            <dependency>
                <groupId>org.springframework.cloud</groupId>
                <artifactId>spring-cloud-dependencies</artifactId>
                <version>${spring-cloud.version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
            <!-- 通用Mapper启动器 -->
            <dependency>
                <groupId>tk.mybatis</groupId>
                <artifactId>mapper-spring-boot-starter</artifactId>
                <version>${mapper.starter.version}</version>
            </dependency>
            <!-- mysql驱动 -->
            <dependency>
                <groupId>mysql</groupId>
                <artifactId>mysql-connector-java</artifactId>
                <version>${mysql.version}</version>
            </dependency>
        </dependencies>
    </dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <version>1.18.20</version>
        </dependency>
    </dependencies>
    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
</project>
```

### 注册中心 Eureka

#### maven依赖

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>springclondPCR</artifactId>
        <groupId>org.example</groupId>
        <version>1.0-SNAPSHOT</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>

    <artifactId>eureka</artifactId>

    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-eureka-server</artifactId>
        </dependency>
    </dependencies>
</project>
```

#### application.yml

```yaml
server:
  port: 10086
spring:
  application:
    name: eureka-server  #serviceId
eureka:
  client:
    service-url: # EurekaServer的地址，目前是自己的地址，如果是集群，需要写其它Server的地址
      defaultZone: http://127.0.0.1:10086/eureka
    register-with-eureka: false  #不向注册中心注册自己
    fetch-registry: false  # false表示自己就是注册中心，我的职责就是维护服务实例，并不需要去拉取服务
```

#### 启动类

```java
package com.springclond;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

/**
 * TODO 类描述
 *
 * @date 2021/11/30 10:02
 */
@EnableEurekaServer
@SpringBootApplication
@EnableDiscoveryClient
public class EurekaApp {
    public static void main(String[] args) {
        SpringApplication.run(EurekaApp.class);
    }
}
```

### 生产者 provider

#### maven依赖

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>springclondPCR</artifactId>
        <groupId>org.example</groupId>
        <version>1.0-SNAPSHOT</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>

    <artifactId>provider</artifactId>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
            <version>2.1.5.RELEASE</version>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
        </dependency>
        <!-- https://mvnrepository.com/artifact/tk.mybatis/mapper-spring-boot-starter -->
        <dependency>
            <groupId>tk.mybatis</groupId>
            <artifactId>mapper-spring-boot-starter</artifactId>
            <version>2.1.5</version>
        </dependency>
    </dependencies>
</project>
```

#### application.yml

```yaml
server:
  port: 9091

spring:
  application:
    name: MyProvider
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://127.0.0.1:3306/demo?serverTimezone=UTC&useSSL=false
    username: root
    password: root


mybatis:
  type-aliases-package: com.springclond.pojo


eureka:
  client:
    service-url:
      defaultZone: http://127.0.0.1:10086/eureka
    fetch-registry: true  #会从Eureka服务的列表拉取只读备份，然后缓存在本地
    registry-fetch-interval-seconds: 30 #每隔30秒 会重新拉取并更新数据。
  instance:
    ip-address: 127.0.0.1    #ip地址
    prefer-ip-address: true  #更倾向于ip,而非host
    lease-expiration-duration-in-seconds: 90 #服务失效时间，默认：90秒
    lease-renewal-interval-in-seconds: 30    #服务续约(心跳)的间隔，默认：30秒
    #默认情况下每隔30秒服务会向注册中心发送一次心跳，证明自己还活着。如果超过90秒没有发送心跳，
    #EurekaServer就会认为该服务宕机，会定时从服务列表中移除
```

#### 启动类

```java
package com.springclond;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;
import tk.mybatis.spring.annotation.MapperScan;

/**
 * TODO 类描述
 *
 * @date 2021/11/30 14:03
 */
@EnableDiscoveryClient
@MapperScan("com.springclond.mapper")
@SpringBootApplication
public class ProviderApp {

    @Bean
    @LoadBalanced //负载均衡
    public RestTemplate getRestTemplate() {
        return new RestTemplate();
    }
    public static void main(String[] args) {
        SpringApplication.run(ProviderApp.class);
    }
}
```

#### pojo

```java
package com.springclond.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Id;
import javax.persistence.Table;

/**
 * TODO 类描述
 *
 * @date 2021/11/30 18:59
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Users {
    private Integer id;
    private String username;
    private String password;
    private String gender;
    private String email;
    private String telephone;
}
```

#### mapper

```java
package com.springclond.mapper;

import com.springclond.pojo.Users;
import org.apache.ibatis.annotations.Mapper;
import tk.mybatis.mapper.common.BaseMapper;

/**
 * TODO 类描述
 *
 * @date 2021/11/30 18:56
 */
@Mapper
public interface UserMapper extends BaseMapper<Users> {
}
```

#### service

```java
public interface UserService {
    List<Users> queryAllUsers();
    Users queryOne(String name);
    void addUser(Users user);
}
@Service
public class UserServiceImpl implements UserService {
    @Resource
    private UserMapper userMapper;

    @Override
    public List<Users> queryAllUsers() {
        return userMapper.selectAll();
    }

    @Override
    public Users queryOne(String name) {
        Users users = new Users();
        users.setUsername(name);
        return userMapper.selectOne(users);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED,isolation = Isolation.DEFAULT,readOnly = false)
    public void addUser(Users user) {
        userMapper.insert(user);
    }
}
```

#### controller

```java
@Controller
public class UserController {
    @Resource
    private UserService userService;

    @GetMapping("/user/query")
    @ResponseBody
    public List<Users> queryUsers(){
        return userService.queryAllUsers();
    }

    @GetMapping("/user/queryOne/{name}")
    @ResponseBody
    public Users queryUsers(@PathVariable(value = "name") String name){
        return userService.queryOne(name);
    }

    @PostMapping("/user/add")
    public String addUser(@RequestBody Users users){
        userService.addUser(users);
        return "生产者success";
    }
}
```

### 消费者 customer

#### maven依赖

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>springclondPCR</artifactId>
        <groupId>org.example</groupId>
        <version>1.0-SNAPSHOT</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>

    <artifactId>customer</artifactId>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <!--  Eureka客户端 -->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
        </dependency>

        <!-- 负载均衡,用于@LoadBalanced, 通过服务名调用服务而非 ip:端口 -->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-ribbon</artifactId>
        </dependency>

        <!-- 熔断机制 -->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-hystrix</artifactId>
        </dependency>

        <!-- Feign -->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-openfeign</artifactId>
        </dependency>

        <!--thymeleaf模板-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-thymeleaf</artifactId>
        </dependency>

        <dependency>
            <groupId>net.sourceforge.nekohtml</groupId>
            <artifactId>nekohtml</artifactId>
            <version>1.9.22</version>
        </dependency>
    </dependencies>
</project>
```

#### application.yml

```yaml
server:
  port: 8081
spring:
  application:
    name: MyCustomer

  thymeleaf:
    prefix: classpath:/templates
    suffix: .html
    encoding: utf-8
    mode: LEGACYHTML5
    servlet:
      content-type: text/html
    cache: false

eureka:
  client:
    service-url:
      defaultZone: http://127.0.0.1:10086/eureka
  instance:
    ip-address: 127.0.0.1    #ip地址
    prefer-ip-address: true  #更倾向于ip,而非host
```

### 启动类

```java
package com.springclond;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

/**
 * TODO 类描述
 *
 * @date 2021/11/30 17:27
 */
@SpringBootApplication
//@EnableFeignClients("com.zr.customer.feign") //开启Feign功能
public class CustomerApp {

    @Bean
    @LoadBalanced //负载均衡
    public RestTemplate getRestTemplate() {
        return new RestTemplate();
    }

    public static void main(String[] args) {
        SpringApplication.run(CustomerApp.class,args);
    }
}
```

#### pojo

```java
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Users {
    private Integer id;
    private String username;
    private String password;
    private String gender;
    private String email;
    private String telephone;
}
```

#### controller

```java
package com.springclond.controller;

import com.springclond.pojo.Users;
import org.apache.catalina.User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import javax.annotation.Resource;
import java.util.List;

/**
 * TODO 类描述
 *
 * @date 2021/11/30 19:20
 */
@Controller
public class UserController {
    @Resource
    private RestTemplate restTemplate;

    @GetMapping("/user/query")
    @ResponseBody
    public List<User> queryUsers(){
        String url = "http://MyProvider/user/query";
        return restTemplate.getForObject(url, List.class);
    }

    @GetMapping("/user/queryOne/{name}")
    @ResponseBody
    public User queryUsers(@PathVariable(value = "name") String name){
        String url = "http://MyProvider/user/query/"+ name;
        return restTemplate.getForObject(url, User.class);
    }
    @PostMapping("/user/add")
    @ResponseBody
    public String addUser(@RequestBody Users users){
        String url = "http://MyProvider/user/add";
        restTemplate.postForObject(url,users,User.class);
        return "消费者success";
    }
}
```

