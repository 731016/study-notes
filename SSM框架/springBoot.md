## 基本的springboot项目

### 依赖

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.4.5</version>
    </parent>

    <groupId>com.springboot</groupId>
    <artifactId>springboot</artifactId>
    <version>1.0</version>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
    </dependencies>
</project>
```

### controller

```java
@RestController
public class StudentController {
    @RequestMapping("/hello")
    public String hello() {
        return "hello springboot";
    }

    @RequestMapping("/hzz")
    public Student hzz() {
        Student student = new Student("胡梓卓", 22);
        return student;
    }
}
```

### application.yml

```yaml
server:
  port: 8088
```

### 启动类

```java
@SpringBootApplication
public class App {
    public static void main(String[] args) {
        SpringApplication.run(App.class, args);
    }
}
```



## springboot热部署

https://www.cnblogs.com/luckforefforts/p/13825794.html#:~:text=spring-boot-devtools%20%E5%8F%AF%E4%BB%A5%E5%AE%9E%E7%8E%B0%E9%A1%B5%E9%9D%A2%E7%83%AD%E9%83%A8%E7%BD%B2%EF%BC%8C%E5%AE%9E%E7%8E%B0%E7%B1%BB%E6%96%87%E4%BB%B6%E7%83%AD%E9%83%A8%E7%BD%B2%EF%BC%88%E7%B1%BB%E6%96%87%E4%BB%B6%E4%BF%AE%E6%94%B9%E5%90%8E%E4%B8%8D%E4%BC%9A%E7%AB%8B%E5%8D%B3%E7%94%9F%E6%95%88%EF%BC%89%EF%BC%8C%E5%AE%9E%E7%8E%B0%E5%AF%B9%E5%B1%9E%E6%80%A7%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6%E7%9A%84%E7%83%AD%E9%83%A8%E7%BD%B2%E3%80%82%20%E5%85%B6%E5%8E%9F%E7%90%86%E6%98%AF,spring-boot-devtools%20%E4%BC%9A%E7%9B%91%E5%90%AC%20Classpath%20%E4%B8%8B%E7%9A%84%E6%96%87%E4%BB%B6%E5%8F%98%E5%8A%A8%EF%BC%8C%E5%B9%B6%E4%B8%94%E4%BC%9A%E7%AB%8B%E5%8D%B3%E9%87%8D%E5%90%AF%E5%BA%94%E7%94%A8%EF%BC%88%E5%8F%91%E7%94%9F%E5%9C%A8%E4%BF%9D%E5%AD%98%E6%97%B6%E6%9C%BA%EF%BC%89%E3%80%82

## junit单元测试

> 注意：test 》 java 下面的目录结构要和main 》java下面的目录结构相同
>
> 也可以在@SpringBootTest(classes = App.class)加对应的启动类的反射信息

```xml
<dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
        </dependency>
```

```java
@SpringBootTest(classes = App.class)
public class Demo {
    @Resource
    private StudentService studentService;

    @Test
    public void Test1() {
        List<Student> students = studentService.queryAllStudent();
        students.forEach(System.out::println);
    }
}
```

## springboot-jsp项目

### 依赖

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.4.5</version>
    </parent>

    <groupId>com.springboot</groupId>
    <artifactId>springboot</artifactId>
    <version>1.0</version>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
        </dependency>
        <!--热部署-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
        </dependency>

        <!--jsp-->
        <dependency>
            <groupId>org.apache.tomcat.embed</groupId>
            <artifactId>tomcat-embed-jasper</artifactId>
        </dependency>
        <dependency>
            <groupId>jstl</groupId>
            <artifactId>jstl</artifactId>
            <version>1.2</version>
        </dependency>
        <dependency>
            <groupId>com.baomidou</groupId>
            <artifactId>mybatis-plus-boot-starter</artifactId>
            <version>3.4.2</version>
        </dependency>
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
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

### application.yml

```yaml
server:
  port: 8088
spring:
  datasource:
    driver-class-name: com.mysql.jdbc.Driver
    url: jdbc:mysql://127.0.0.1:3306/demo?characterEncoding=utf8
    username: root
    password: 123456
#    type: com.alibaba.druid.pool.DruidDataSource
  mvc:
    view:
      suffix: .jsp
# 取消pojo实体类驼峰命令自动转换蛇形命名
mybatis-plus:
  configuration:
    map-underscore-to-camel-case: false
```

### 启动类

```java
@SpringBootApplication
@MapperScan(basePackages = "com.springboot.mapper")
public class App {

    // 自己实例化
//    @Bean
//    private StudentService getStudentService(){
//        StudentServiceImpl service = new StudentServiceImpl();
//        return service;
//    }
    
    public static void main(String[] args) {
        SpringApplication.run(App.class, args);
    }
}
```

![img](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/05WH]RR%LYP2(4$}O()P2VN.jpg)

## pageHelper分页

```xml
<dependency>
            <groupId>com.github.pagehelper</groupId>
            <artifactId>pagehelper-spring-boot-starter</artifactId>
            <version>1.4.0</version>
        </dependency>
```

```java
@Test
    public void Test2() {
        PageHelper.startPage(1,5);
        List<Student> students = studentService.queryAllStudent();
        PageInfo<Student> pageInfo = new PageInfo<>(students);
        System.out.println(pageInfo.getList());
    }
```

## Thymeleaf

渲染XML/XHTML/HTML5内容的模板引擎。支持Spring Expression Language

Thymeleaf在Spring Boot项目中放入到resources/templates中。这个文件夹中的内容是无法通过浏览器URL直接访问的（和WEB-INF效果一样），所有Thymeleaf页面必须先走控制器

```xml
<dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-thymeleaf</artifactId>
        </dependency>
```

### application.yml

```yaml
  thymeleaf:
    prefix: classpath:/templates/
    suffix: .html
```

### controller

```java
@RequestMapping("/html")
    public String queryAll(Model model) {
        List<Student> students = studentService.queryAllStudent();
        model.addAttribute("students",students);
        return "/index";
    }
```

https://developer.aliyun.com/article/769977

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/image-20211125152255043.png" alt="image-20211125152255043" style="zoom: 80%;" />

```java
th:text 属性 向HTML标签内部输出信息
<!--直接向标签内部填充内容，清空原有内容 -->
<span th:text="jqk"></span>
<!-- 从作用于中获取name输入到标签内部 -->
<span th:text="${name}"></span>
<!-- 获取session作用域内容-->
<span th:text="${session.name}"></span>
    
Th:value 表单元素，设置HTML标签中表单元素value属性时使用
 <input type="text" th:value="${name}"/>
     
Th:if 进行逻辑判断。如果成立该标签生效（显示），如果不成立，此标签无效（不显示）。
<span th:if="${name}!='张三'">会显示</span>
注意：判断条件中逻辑判断符号写在${}外面的

Th:href （了解）
设置href属性的。取值使用@{}取值
<a th:href="@{/getParam(id=1,name='etc')}" >跳转</a>
<!-- 获取作用域值-->
<a th:href="@{/getParam(name=${name})}">跳转二</a>
```



```html
<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.thymeleaf.org">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<h2>第一个html页面</h2>
<table>
    <tr>
        <th>姓名</th>
    </tr>
    <tr th:each="stu : ${students}">
        <td th:text="${stu.getName()}"></td>
    </tr>
</table>
</body>
</html>
```

### 简单的删除

> ()相当于？
>
> restful风格采用字符串分割的方式

```html
<h2>第一个html页面</h2>
<table>
    <tr>
        <th>姓名</th>
    </tr>
    <tr th:each="stu : ${students}">
        <td th:text="${stu.getName()}"></td>
        <td>
            // 传统
            <a th:href="@{/student/del(id=${stu.getId()})}">删除</a>
            // restful风格
            <a th:href="@{'/student/delrest/'+${stu.getId()}}">删除</a>
        </td>
    </tr>
</table>
```

![image-20211125161114924](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/image-20211125161114924.png)

## yml静态资源设置

```yaml
# 设置静态资源
  web:
    resources:
      static-locations: classpath:static/
```

## 使用thymeleaf表单提交

### 添加操作

```html
<form method="post" th:action="@{/product/addProduct}" th:object="${product}">
    <!--  input文本框获取表单内容  -->
    <div>商品名称：<input type="text" name="productName" th:value="*{productName}"></div>
    <div>商品库存：<input type="text" name="inventory" th:value="*{inventory}"></div>
    <!--  单选框获取表单内容  -->
    <div>商品类型：
        <input type="radio" name="tid"
               th:checked="${product.tid==1?true:false}" value="1">食品
        <input type="radio" name="tid"
               th:checked="${product.tid==2?true:false}" value="2">生活用品
        <input type="radio" name="tid"
               th:checked="${product.tid==3?true:false}" value="3">数码产品
    </div>
    <!--  下拉菜单获取表单内容  -->
    <div>商品类型：
        <select name="tid" th:value="*{tid}">
            <option
                    th:each="p : ${productTypes}"
                    th:value="${p.tid}"
                    th:text="${p.tname}"
            >
            </option>
        </select>
    </div>
    <input type="submit" value="添加">
</form>
```

### 后台控制层写法

```java
/**
 * 通过中转页面将对象信息存入session
 *
 * @param model
 * @return
 */
@RequestMapping("/toAddProduct")
public String toAddProduct(Model model) {
    List<ProductType> productTypes = typeService.selectAll();
    Product product = new Product();
    model.addAttribute("productTypes", productTypes);
    //必须先将对象存入session前台才能获取到对应的对象属性，对象是空的也无所谓
    model.addAttribute("product", product);
    return "/product/product_add";
}

/**
 * 获取表单提交数据，自动组成对象
 *
 * @param product
 * @return
 */
@RequestMapping("/addProduct")
public String addProduct(Product product) {
    System.out.println(product);
    service.addProduct(product);
    return "redirect:/product/allList";
}
```

### 修改操作

```html
<!--  下拉菜单获取表单内容  -->
<div>商品类型：
    <select name="tid" th:value="*{tid}">
        <!-- 将数据显示在下拉菜单中 -->
        <option
                th:each="p : ${productTypes}"
                th:value="${p.tid}"
                th:text="${p.tname}"
                th:selected="${p.tid==product.tid}"
        >
        </option>
    </select>
</div>
```

### 逻辑层

```java
@Override
public Boolean updateProduct(Product product) {
    //修改操作可以使用UpdateWrapper
    UpdateWrapper<Product> updateWrapper = new UpdateWrapper<>();
    updateWrapper.eq("id", product.getId());
    int update = mapper.update(product, updateWrapper);
    return update > 0;
}
```

## Scheduled定时任务

### 依赖

```xml
<dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-context-support</artifactId>
    </dependency>
```

### 启动类

```java
@EnableScheduling
```

### 定时任务

```java
@Component 
public class DemoScheduled {
    @Scheduled(cron="0/2 * * * * *")
    public void testScheduled(){
        System.out.println("test scheduled");
    }
}
```

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/202111291106557.png" alt="image-20211129110620409" style="zoom: 67%;" />

## Quartz

<img src="C:\Users\折腾的小飞\AppData\Roaming\Typora\typora-user-images\image-20211129114126034.png" alt="image-20211129114126034" style="zoom:67%;" />

### 依赖

```xml
<dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-quartz</artifactId>
</dependency>
```

### 配置类

```java
@Configuration
public class QuartzConfig {
    @Bean
    public JobDetail getJobDetail() {
        // 对应定时任务类
        return JobBuilder.newJob(Quartz.class).withIdentity("quartz").storeDurably().build();
    }
    @Bean
    public CronTrigger scheduleJob() {
        CronScheduleBuilder cronTrig = CronScheduleBuilder.cronSchedule("0/2 * * * * ?");
        CronTrigger trigger = TriggerBuilder.newTrigger().forJob(getJobDetail())
            // 创建的CronTrigger类型的对象
                .withIdentity("trigger").withDescription("这是cron触发器").startNow()
            // 创建的CronScheduleBuilder类型的对象
                .withSchedule(cronTrig).build();
        return trigger;
    }
}
```

### 定时任务

```java
@Component
public class Quartz extends QuartzJobBean{
    @Override
    public void executeInternal(JobExecutionContext context){
        System.out.println("调用任务。。。"+new Random().nextInt());
    }
}
```

## 拦截器

```java
@Component
public class LoginIntercepter implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        System.out.println("执行拦截器");
        return false;
    }
}
```

### config

<img src="C:\Users\折腾的小飞\AppData\Roaming\Typora\typora-user-images\image-20211129160821148.png" alt="image-20211129160821148" style="zoom:80%;" />

```java
@Configuration
public class IntercepterConfig implements WebMvcConfigurer {

    @Resource
    private LoginIntercepter loginIntercepter;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(loginIntercepter).addPathPatterns("/**")
                .excludePathPatterns("/css/**")
                .excludePathPatterns("/js/**")
                .excludePathPatterns("/images/**")
                .excludePathPatterns("/login");
    }
}
```

