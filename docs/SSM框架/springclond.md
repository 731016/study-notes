## 基础实例

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

> + getForObject 纯纯的对象，可理解为json
>
> + getForEntity 返回`ResponseEntity` 还包含响应体、响应头、状态码。。。

```java
@GetMapping("/user/queryEntity/{name}")
    @ResponseBody
    public String queryUserAllGetForEntity(@PathVariable(value = "name") String name) throws Exception {
        if (StringUtils.isAlphanumeric(name)) { //配英文，数字，中文
            String url = "http://MyProvider/user/queryOne/" + name;
            // 返回ResponseEntity对象，包含响应信息
            ResponseEntity<Users> entity = restTemplate.getForEntity(url, Users.class);
            // 判断状态码是否是2开头
            if (entity.getStatusCode().is2xxSuccessful()){
                return JSON.toJSONString(entity.getBody());
            }else{
                return "查询失败!";
            }
        } else {
            throw new Exception("输入的不是英文或数字");
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

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202112040854320.png" alt="image-20211201164137119" style="zoom: 67%;" />

### Eureka客户端

#### 服务注册

服务提供者在启动时，会检测配置属性中的： eureka.client.register-with-erueka=true 参数是否正确，事实上 默认就是true。

如果值确实为true，则会向EurekaServer发起一个Rest请求，并携带自己的元数据信息，Eureka Server会把这些信息保存到一个双层Map结构中。 

+ 第一层Map的Key就是服务id，一般是配置中的 spring.application.name 属性 

+ 第二层Map的key是服务的实例id。一般host+ serviceId + port，例如： localhost:user-service:8081 值则是服务的实例对象，也就是说一个服务，可以同时启动多个不同实例，形成集群。

默认注册时使用的是主机名或者localhost，如果想用ip进行注册，可以在 user-service 中添加配置如下： 

```yaml
eureka:
instance:
ip-address: 127.0.0.1 # ip地址
prefer-ip-address: true # 更倾向于使用ip，而不是host名
```

修改完后先后重启 user-service 和 consumer-demo ；在调用服务的时候就已经变成ip地址；需要注意的是：不是在 eureka中的控制台服务实例状态显示

#### 服务续约

在注册服务完成以后，服务提供者会维持一个心跳（定时向EurekaServer发起Rest请求），告诉EurekaServer：“我 还活着”。这个我们称为服务的续约（renew）；

有两个重要参数可以修改服务续约的行为；可以在 user-service 中添加如下配置项：

```yaml
lease-renewal-interval-in-seconds：服务续约(renew)的间隔，默认为30秒 
lease-expiration-duration-in-seconds：服务失效时间，默认值90秒
```

也就是说，默认情况下每隔30秒服务会向注册中心发送一次心跳，证明自己还活着。

如果超过90秒没有发送心跳， EurekaServer就会认为该服务宕机，会定时（eureka.server.eviction-interval-timer-in-ms设定的时间）从服务列表 中移除，这两个值在生产环境不要修改，默认即可

#### 获取服务列表

当服务消费者启动时，会检测 eureka.client.fetch-registry=true 参数的值，如果为true，则会从Eureka Server服务的列表拉取只读备份，然后缓存在本地。并且 每隔30秒 会重新拉取并更新数据。可以在 consumer-demo 项目中通过下面的参数来修改：

```yaml
eureka:
	client:
		registry-fetch-interval-seconds: 30
```

### 失效剔除和自我保护

#### 服务下线

当服务进行正常关闭操作时，它会触发一个服务下线的REST请求给Eureka Server，告诉服务注册中心：“我要下线 了”。

服务中心接受到请求之后，将该服务置为下线状态。 

#### 失效剔除

有时我们的服务可能由于内存溢出或网络故障等原因使得服务不能正常的工作，而服务注册中心并未收到“服务下 线”的请求。

相对于服务提供者的“服务续约”操作，服务注册中心在启动时会创建一个定时任务，默认每隔一段时间 （默认为60秒）将当前清单中超时（默认为90秒）没有续约的服务剔除，这个操作被称为失效剔除。 可以通过 eureka.server.eviction-interval-timer-in-ms 参数对其进行修改，单位是毫秒。 

#### 自我保护

我们关停一个服务，很可能会在Eureka面板看到一条警告： 

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202112100006420.png" alt="image-20211201165431134" style="zoom:80%;" />

这是触发了Eureka的自我保护机制。当服务未按时进行心跳续约时，Eureka会统计服务实例最近15分钟心跳续约的 比例是否低于了85%。

在生产环境下，因为网络延迟等原因，心跳失败实例的比例很有可能超标，但是此时就把服务 剔除列表并不妥当，因为服务可能没有宕机。

Eureka在这段时间内不会剔除任何服务实例，直到网络恢复正常。生产环境下这很有效，保证了大多数服务依然可用，不过也有可能获取到失败的服务实例，因此服务调用者必须做好服 务的失败容错。 可以通过下面的配置来关停自我保护：

```yaml
eureka:
	server:
	enable-self-preservation: false # 关闭自我保护模式（缺省为打开）
```

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
    
    @PostMapping("/user/addEntity")
    @ResponseBody
    public String addUserEntity(@RequestBody Users users) {
        String url = "http://MyProvider/user/add";
        Users body = restTemplate.postForEntity(url, users, Users.class).getBody();
        System.out.println(body);
        return "添加的对象"+JSON.toJSONString(body);
    }
}
```

## 显示service管理视图

[idea 怎么在service视图显示启动的服务 - 国内版 Bing](https://cn.bing.com/search?q=idea+怎么在service视图显示启动的服务&cvid=34bc533e65b441b0ba0eb95f92a0ef6c&aqs=edge..69i57.27689j0j1&pglt=163&FORM=ANNTA1&PC=U531)

## 高可用

> 多个注册中心

### 服务同步

多个Eureka Server之间也会互相注册为服务，当服务提供者注册到Eureka Server集群中的某个节点时，该节点会把 服务的信息同步给集群中的每个节点，从而实现数据同步。

因此，无论客户端访问到Eureka Server集群中的任意一 个节点，都可以获取到完整的服务列表信息。

![image-20211201101958313](https://i.loli.net/2021/12/01/f27hpkNdUSWobZ4.png)



## 负载均衡Ribbon

> 当需要作为消费者向别人请求，需要配置

### maven依赖

```xml
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
```

### 启动类

```java
@Bean
    @LoadBalanced //负载均衡
    public RestTemplate getRestTemplate() {
        return new RestTemplate();
    }
```

### 配置类

> 自定义配置类不要放在@ComponentScan能扫描到的包和子包下面！

```java
@Configuration
public class MySelfRule {
    @Bean
    public IRule myRule() {
        return new RandomRule(); // 随机
    }
}
```

### 启动类

```java
@RibbonClient(name = "MyCustomer",configuration = MySelfRule.class)
public class CustomerApp {...}
```

## 熔断器 hystrix

Hystrix解决雪崩问题的手段主要是服务降级，包括： 

+ 线程隔离 

+ 服务熔断

  <img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202112021121673.png" alt="image-20211202112059571" style="zoom: 80%;" />

1. Hystrix为每个依赖服务调用分配一个小的线程池，如果线程池已满调用将被立即拒绝，默认不采用排队，加速 失败判定时间。 

2. 用户的请求将不再直接访问服务，而是通过线程池中的空闲线程来访问服务，如果线程池已满，或者请求超 时，则会进行降级处理，什么是服务降级？

> 服务降级：优先保证核心服务，而非核心服务不可用或弱可用。 

用户的请求故障时，不会被阻塞，更不会无休止的等待或者看到系统崩溃，至少可以看到一个执行结果（例如返回友 好的提示信息） 。 

服务降级虽然会导致请求失败，但是不会导致阻塞，而且最多会影响这个依赖服务对应的线程池中的资源，对其它服 务没有响应。 

触发Hystrix服务降级的情况： 

+ 线程池已满 
+ 请求超时



Hystrix的服务熔断机制，可以实现弹性容错；当服务请求情况好转之后，可以自动重连。

通过断路的方式，将后续 请求直接拒绝，一段时间（默认5秒）之后允许部分请求通过，如果调用成功则回到断路器关闭状态，否则继续打开，拒绝请求的服务。

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202112021122698.png" alt="image-20211202112224630" style="zoom:80%;" />

状态机有3个状态： 

1. Closed：关闭状态（断路器关闭），所有请求都正常访问。 
2. Open：打开状态（断路器打开），所有请求都会被降级。Hystrix会对请求情况计数，当一定时间内失败请求百 分比达到阈值，则触发熔断，断路器会完全打开。默认失败比例的阈值是50%，请求次数最少不低于20次。 
3. Half Open：半开状态，不是永久的，断路器打开后会进入休眠时间（默认是5S）。随后断路器会自动进入半开 状态。此时会释放部分请求通过，若这些请求都是健康的，则会关闭断路器，否则继续保持打开，再次进行休眠计时

### maven依赖

```xml
<!-- 熔断机制 -->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-hystrix</artifactId>
        </dependency>
```

### 生产者

```java
@GetMapping("/user/queryCond/{name}")
    @HystrixCommand(fallbackMethod = "queryUserAllFallback"，commandProperties={
        @HystrixProperty(name="execution.isolation.thread.tomeoutInMilliseconds",value="3000") //只等待3s
    })
    @ResponseBody
    public String queryUserAll(@PathVariable(value = "name") String name) throws Exception {
        System.out.println(StringUtils.isAlpha(name));
        System.out.println(StringUtils.isNumeric(name));
        System.out.println(StringUtils.isAlphanumeric(name));
        if (StringUtils.isAlpha(name) || StringUtils.isNumeric(name) || StringUtils.isAlphanumeric(name)) {

            String url = "http://MyProvider/user/queryOne/" + name;
            Users users = restTemplate.getForObject(url, Users.class);
            return JSON.toJSONString(users);
        } else {
            throw new Exception("输入的不是英文或数字");
        }
    }

    public String queryUserAllFallback(String name) {
        System.out.println("查询员工" + name + "失败！");
        return "网络太拥挤。。。";
    }
```

> 可放在类上，对该类所有的方法进行处理

```java
@DefaultProperties(defaultFallback = "queryUserAllFallback")
```

### 新建类实现controller方法，统一处理

```yml
feign:
  hystrix:
    enabled: true
```

#### 接口

```java
@FeignClient(value = "MyProvider",fallback = UserFallback.class)
@Configuration
public interface UsersFeignClient {

    @GetMapping("/user/queryOne/{name}")
    Users queryOne(@PathVariable(value = "name") String name);

    @GetMapping("/user/query")
    @ResponseBody
    List<Users> queryAll();
}
```

```java
@Component
public class UserFallback implements UsersFeignClient {
    @Override
    public String queryUsers(String name) {
        System.out.println("查询员工" + name + "失败！");
        return "网络太拥挤。。。";
    }

    @Override
    public Employee getOne(Integer eid) {
        System.out.println("查询员工" + eid + "失败！");
        return null;
    }
}
```



<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/image-20211202104808569.png" alt="image-20211202104808569" style="zoom:80%;" />

### 启动类

```java
@EnableCircuitBreaker #范围更大
@EnableHystrix
```

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/image-20211209234833610.png" alt="image-20211209234833610" style="zoom:80%;" />



## 远程调用 feign

### maven依赖

```xml
<!-- 服务调用-->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-openfeign</artifactId>
        </dependency>
```

### client接口

> 接口调用想要调用的生产者的controller类的方法（一模一样）

```java
@FeignClient("MyProvider")
public interface UsersFeignClient {

    @GetMapping("/user/queryOne/{name}")
    String queryUsers(@PathVariable(value = "name") String name);
}
```

### controller

```java
@Resource
    private UsersFeignClient usersFeignClient;
@GetMapping("/user.html/{name}")
    @ResponseBody
    public Users queryUsers(@PathVariable(value = "name") String name) {
        String users = usersFeignClient.queryUsers(name);
        return JSON.parseObject(users, Users.class);
    }
```

### 启动类

```java
@EnableFeignClients
```

### 超时控制

> 默认1s

```yml
feign:
  client:
    config:
      default:
        ConnectTimeOut: 5000
        ReadTimeOut: 10000
```

### 支持负载均衡

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202112100006806.png" alt="image-20211202110903538" style="zoom:80%;" />

### 支持熔断器

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202112100006439.png" alt="image-20211202111251538" style="zoom:80%;" />

1）首先，要定义一个类，实现刚才编写的UserFeignClient，作为fallback的处理类

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202112100006484.png" alt="image-20211202111421278" style="zoom:80%;" />



2）然后在UserFeignClient中，指定刚才编写的实现类

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202112100005798.png" alt="image-20211202111438322" style="zoom:80%;" />

### 请求压缩

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202112021115877.png" alt="image-20211202111507613" style="zoom:80%;" />

###  日志级别(了解)

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202112100005822.png" alt="image-20211203091327038" style="zoom:80%;" />

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202112100005585.png" alt="image-20211203091420949" style="zoom:80%;" />

```yaml
logging:
  level:
    # 以什么级别监控哪个接口
    com.springclond.client.UsersFeginClient: debug
```

## 图形化监控dashboard

### maven

```xml
<dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-hystrix-dashboard</artifactId>
        </dependency>
```

### 

```yaml
server:
  port: 7001
management:
  endpoints:
    web:
      exposure:
        include: "*"
hystrix:
  dashboard:
    proxy-stream-allow-list: localhost
```

### 启动类

```java
@SpringBootApplication
@EnableHystrixDashboard
public class DashBoardApp {
    /*
     * description: 此配置是为了服务监控而配置，与服务容错本身 无关，springcloud 升级后的坑
     * ServletRegistrationBean因为springboot的默认路径不是"/hystrix.stream",
     * 只要在自己的项目里配置上下面的servlet就可以了
     * @Param: [] 
     * @Return: org.springframework.boot.web.servlet.ServletRegistrationBean 
     **/
    @Bean
    public ServletRegistrationBean getServlet() {
        HystrixMetricsStreamServlet streamServlet = new HystrixMetricsStreamServlet();
        ServletRegistrationBean registrationBean = new ServletRegistrationBean(streamServlet);
        registrationBean.setLoadOnStartup(1);
        registrationBean.addUrlMappings("/actuator/hystrix.stream");
        registrationBean.setName("HystrixMetricsStreamServlet");
        return registrationBean;
    }

    public static void main(String[] args) {
        SpringApplication.run(DashBoardApp.class, args);
    }
}
```

```xml
<dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <!-- 监控完善 需要监控的服务导入的依赖-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>
```

> 访问：http://localhost:端口/hystrix

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202112101436850.png" alt="image-20211210143614813" style="zoom: 67%;" />



## 网关 gateway

Spring Cloud Gateway是替代Netflix Zuul的一套解决方案。

网关的核心功能是：过滤和路由

### yml配置

#### maven依赖

```xml
<!--  Eureka客户端 -->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
        </dependency>
        <!-- 网关-->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-gateway</artifactId>
        </dependency>
```

#### yml

```yaml
server:
  port: 10010
spring:
  application:
    name: api-gateway
  cloud:
    gateway:
      routes:
        - id: user-service-route # 路由id，可以随意写
          uri: lb://MyProvider #代理生产者的地址
          predicates:
            - Path=/user/** # 路由断言，可以配置映射路径
eureka:
  client:
    service-url:
      defaultZone: http://127.0.0.1:10086/eureka,http://127.0.0.1:10087/eureka
  instance:
    prefer-ip-address: true
```

#### 启动类

```java
@SpringBootApplication
@EnableDiscoveryClient
public class GatewayApp {
    public static void main(String[] args) {
        SpringApplication.run(GatewayApp.class);
    }
}
```

### config配置

```java
@Configuration
public class GatewayConfig {
    /**
     * 配置了一个id为gateway-route的路由规则，
     * 当访问地址 http://localhost:10011/guonei时会自动转发到地址：http://news.baidu.com/guonei
     * @param builder
     * @return
     */
    @Bean
    public RouteLocator customRouteLocator(RouteLocatorBuilder builder){
        RouteLocatorBuilder.Builder routes = builder.routes();
        routes.route("gateway-route",r->r.path("/guonei").uri("http://news.baidu.com/guonei")).build();
        return routes.build();
    }
}
```

### 动态路由

```yaml
spring:
  application:
    name: cloud-gateway
  cloud:
    gateway:
      discovery:
        locator:
          enabled: true #开启从注册中心动态创建路由的功能，利用微服务名进行路由
      routes:
        - id: payment_routh #payment_route    #路由的ID，没有固定规则但要求唯一，建议配合服务名
          # uri: http://localhost:8001          #匹配后提供服务的路由地址
          uri: lb://cloud-payment-service #匹配后提供服务的路由地址
          predicates:
            - Path=/payment/get/**         # 断言，路径相匹配的进行路由

        - id: payment_routh2 #payment_route    #路由的ID，没有固定规则但要求唯一，建议配合服务名
          # uri: http://localhost:8001          #匹配后提供服务的路由地址
          uri: lb://cloud-payment-service #匹配后提供服务的路由地址
          predicates:
            - Path=/payment/lb/**         # 断言，路径相匹配的进行路由

```

### Route Predicate

```yaml
- After=2020-02-05T15:10:03.685+08:00[Asia/Shanghai]         # 断言，路径相匹配的进行路由
- Before=2020-02-05T15:10:03.685+08:00[Asia/Shanghai]         # 断言，路径相匹配的进行路由
- Between=2020-02-02T17:45:06.206+08:00[Asia/Shanghai],2020-03-25T18:59:06.206+08:00[Asia/Shanghai]

- Cookie=username,zzyy #curl http://localhost:9588/paymentInfo curl http://localhost:9588/paymentInfo --cookie "username=zzyy"
- Header=X-Request-Id, \d+  # 请求头要有X-Request-Id属性并且值为整数的正则表达式 # curl http://localhost:9588/paymentInfo -H "X-Request-Id:123"
- Host=**.atguigu.com
- Method=GET
- Query=username, \d+  # 要有参数名username并且值还要是整数才能路由 #http://localhost:9527/payment/lb?username=31
```

### 过滤器

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202112031029825.png" alt="image-20211203102946775" style="zoom:80%;" />

> http://127.0.0.1:10010/queryOne/123 -> http://127.0.0.1:10010/user/queryOne/123



<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202112031031278.png" alt="image-20211203103154652" style="zoom:80%;" />

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202112100005183.png" alt="image-20211203103210440" style="zoom:80%;" />



[Spring Cloud Gateway](https://cloud.spring.io/spring-cloud-static/spring-cloud-gateway/2.1.1.RELEASE/single/spring-cloud-gateway.html#_gatewayfilter_factories)

| 过滤器名称           | 说明                         |
| -------------------- | ---------------------------- |
| AddRequestHeader     | 对匹配上的请求加上Header     |
| AddRequestParameters | 对匹配上的请求路由添加参数   |
| AddResponseHeader    | 对从网关返回的响应添加Header |
| StripPrefix          | 对匹配上的请求路径去除前缀   |

### 自定义全局过滤器

```java
@Component //必须加，必须加，必须加
public class MyLogGateWayFilter implements GlobalFilter,Ordered
{
    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain)
    {
        System.out.println("time:"+new Date()+"\t 执行了自定义的全局过滤器: "+"MyLogGateWayFilter"+"hello");

        String uname = exchange.getRequest().getQueryParams().getFirst("uname");
        if (uname == null) {
            System.out.println("****用户名为null，无法登录");
            exchange.getResponse().setStatusCode(HttpStatus.NOT_ACCEPTABLE);
            return exchange.getResponse().setComplete();
        }
        return chain.filter(exchange);
    }

    @Override
    public int getOrder()
    {
        return 0;
    }
}
```



## Spring Cloud Config分布式配置中心

### 配置git仓库

```
1. 新建github仓库
2. git clone https://github.com/731016/springcloud-config.git
```

### 搭建配置中心

#### maven

```xml
<dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-config-server</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
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
  port: 20000

spring:
  application:
    name:  cloud-config-center #注册进Eureka服务器的微服务名
  cloud:
    config:
      server:
        git:
          uri: https://github.com/731016/springcloud-config.git #GitHub上面的git仓库名字
#          ####搜索目录
#          search-paths:
#            - springcloud-config
#          username: 731016
#          password: 18925468479=lol
#          skip-ssl-validation: true
#      ####读取分支
#      label: main

#服务注册到eureka地址
eureka:
  client:
    service-url:
      defaultZone: http://127.0.0.1:10086/eureka,http://127.0.0.1:10087/eureka
```

#### 启动类

```java
@SpringBootApplication
@EnableConfigServer
public class ConfigApp {
    public static void main(String[] args) {
        SpringApplication.run(ConfigApp.class, args);
    }
}
```

#### host映射

```powershell
windows下修改hosts文件，增加映射
127.0.0.1  config-3344.com # 不换也无所谓
```

#### 测试

```powershell
http://localhost:20000/main/config-dev.yml
```

### 获取配置中心配置

[Spring Cloud Config](https://cloud.spring.io/spring-cloud-static/spring-cloud-config/2.2.1.RELEASE/reference/html/)

```powershell
/{label}/{application}-{profile}.yml
	http://config-3344.com:3344/master/config-dev.yml
	http://config-3344.com:3344/dev/config-dev.yml
/{application}-{profile}.yml
	http://config-3344.com:3344/config-dev.yml
/{application}/{profile}[/{label}]
	http://config-3344.com:3344/config/dev/master #json格式
```

#### maven

```xml
 <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-config</artifactId>
        </dependency>
<dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
```

#### bootstrap.yml

```yaml
server:
  port: 20001

spring:
  application:
    name: config-client
  cloud:
    #Config客户端配置
    config:
      label: main #分支名称
      name: config #配置文件名称
      profile: dev #读取后缀名称   上述3个综合：master分支上config-dev.yml的配置文件被读取http://config-3344.com:3344/master/config-dev.yml
      uri: http://localhost:20000 #配置中心地址

#服务注册到eureka地址
eureka:
  client:
    service-url:
      defaultZone: http://127.0.0.1:10086/eureka,http://127.0.0.1:10087/eureka
```

#### controller

```java
@RestController
public class ConfigController {
    @Value("${version}")
    private String version;
    @GetMapping("/v")
    public String getVersion(){
        return version;
    }
}
```

### update配置中心刷新，<u>服务端不刷新</u>

#### maven

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

#### bootstrap.yml

```yaml
# 暴露监控端点
management:
  endpoints:
    web:
      exposure:
        include: "*"
```

#### 控制层

```java
@RestController
@RefreshScope
public class ConfigController {...}
```

```powershell
curl -X POST "http://localhost:20001/actuator/refresh"

C:\Users\折腾的小飞>curl -X POST "http://localhost:20001/actuator/refresh"
["config.client.version","version"]
```



## Spring Cloud Bus服务总线

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202112131420956.png" alt="image-20211213142046120" style="zoom:80%;" />

### 配置一个消费者

#### maven

```xml
<dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-config</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
```

#### bootstrap.yml

```yaml
server:
  port: 20001

spring:
  application:
    name: config-client
  cloud:
    #Config客户端配置
    config:
      label: main #分支名称
      name: config #配置文件名称
      profile: dev #读取后缀名称   上述3个综合：master分支上config-dev.yml的配置文件被读取http://config-3344.com:3344/master/config-dev.yml
      uri: http://localhost:20000 #配置中心地址

#服务注册到eureka地址
eureka:
  client:
    service-url:
      defaultZone: http://127.0.0.1:10086/eureka,http://127.0.0.1:10087/eureka
# 暴露监控端点
management:
  endpoints:
    web:
      exposure:
        include: "*"
```

#### 启动类

```java
@SpringBootApplication
@EnableEurekaClient
public class Config20002App {
    public static void main(String[] args) {
        SpringApplication.run(Config20002App.class, args);
    }
}
```

#### 控制层

```java
@RestController
@RefreshScope
public class ConfigController {
    @Value("${name}")
    private String name;
    @Value("${version}")
    private String version;

    @GetMapping("/info")
    public String getVersion() {
        return "config-dev文件" + name + "|" + version;
    }
}
```

### 设计思想

```java
1）利用消息总线触发一个客户端/bus/refresh,而刷新所有客户端的配置 ×
2）利用消息总线触发一个服务端ConfigServer的/bus/refresh端点，而刷新所有客户端的配置 √
```

### config配置中心-消息总线支持

#### maven

```xml
<!--添加消息总线RabbitMQ支持-->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-bus-amqp</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

#### bootstrap.yml

```yaml
#rabbitmq相关配置
rabbitmq:
  host: localhost
  port: 5672
  username: guest
  password: guest
##rabbitmq相关配置,暴露bus刷新配置的端点
management:
  endpoints: #暴露bus刷新配置的端点
    web:
      exposure:
        include: 'bus-refresh'
```



### 客户端配置-消息总线支持

#### maven

```xml
<!--添加消息总线RabbitMQ支持-->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-bus-amqp</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

#### bootstrap.yml

```yaml
#rabbitmq相关配置 15672是Web管理界面的端口；5672是MQ访问的端口
  rabbitmq:
    host: localhost
    port: 5672
    username: guest
    password: guest
# 暴露监控端点
management:
  endpoints:
    web:
      exposure:
        include: "*"   # 'refresh'
```

### 发送

```powershell
# 向配置中心发送post请求 全局通知
curl -X POST "http://localhost:3344/actuator/bus-refresh"
# 定点推送
curl -X POST "http://localhost:3344/actuator/bus-refresh/config-client:"
```





<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202112131423741.png" alt="image-20211213142337248" style="zoom:80%;" />

