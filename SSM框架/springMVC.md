# springMVC

## 执行流程

http://c.biancheng.net/spring_mvc/process.html

![image-20211108151623092](https://raw.githubusercontent.com/731016/imgSave/master/note_img202111081516282.png)

## pom.xml

```xml
<dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-web</artifactId>
            <version>${spring.version}</version>
        </dependency>

        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-webmvc</artifactId>
            <version>${spring.version}</version>
        </dependency>
```

## tomcat配置

![image-20211108111708587](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20211108111708587.png)

```properties
tomcat.util.scan.StandardJarScanFilter.jarsToScan=\
```

## springmvc.xml

```xml-dtd
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:mvc="http://www.springframework.org/schema/mvc"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="
        http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/mvc
        http://www.springframework.org/schema/mvc/spring-mvc.xsd
        http://www.springframework.org/schema/context
        http://www.springframework.org/schema/context/spring-context.xsd">
    <!-- 开启注解扫描 -->
    <context:component-scan base-package="com.springmvc.web"/>

    <!-- 视图解析器对象 -->
    <bean id="internalResourceViewResolver" class="org.springframework.web.servlet.view.InternalResourceViewResolver">
<!--        前缀-->
        <!--        <property name="prefix" value="/WEB-INF/pages/" />-->
<!--        后缀-->
        <property name="suffix" value=".jsp"/>
    </bean>

    <!-- 开启SpringMVC框架注解的支持 -->
    <mvc:annotation-driven />

    <!--配置自定义类型转换器-->
    <!--	<bean id="conversionService" class="org.springframework.context.support.ConversionServiceFactoryBean">-->
    <!--		<property name="converters">-->
    <!--			<set>-->
    <!--				<bean class=""/>-->
    <!--			</set>-->
    <!--		</property>-->
    <!--	</bean>-->
</beans>
```

## web.xml

```xml-dtd
<!--配置监听器：监视被spring管理的对象的状态改变-->
    <listener>
        <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
    </listener>

    <!-- 配置请求过滤器，编码格式设为UTF-8，避免中文乱码-->
    <filter>
        <filter-name>springUtf8Encoding</filter-name>
        <filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
        <init-param>
            <param-name>encoding</param-name>
            <param-value>UTF-8</param-value>
        </init-param>
    </filter>
    <filter-mapping>
        <filter-name>springUtf8Encoding</filter-name>
        <url-pattern>/*</url-pattern>
    </filter-mapping>

    <!--前端控制器：与客户端http请求联络-->
    <servlet>
        <servlet-name>DispatcherServlet</servlet-name>
        <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
        <init-param>
            <param-name>contextConfigLocation</param-name>
            <param-value>classpath:springmvc.xml</param-value>
        </init-param>
        <!--值越小，优先级越高-->
        <load-on-startup>1</load-on-startup>
    </servlet>
    <servlet-mapping>
        <servlet-name>DispatcherServlet</servlet-name>
        <url-pattern>/</url-pattern>
    </servlet-mapping>

    <context-param>
        <param-name>contextConfigLocation</param-name>
        <param-value>classpath:applicationContext.xml</param-value>
    </context-param>
```

## web层

> @Controller
>
> @RequestMapping(value = "")

```jsp
<a href="/hello">hello</a>
```

```java
@Controller
public class hello {
    @RequestMapping("/hello")
    public String Hello(HttpServletRequest request) {
        request.getSession().setAttribute("msg", "你好，欢迎！");
        return "hello";
    }
    @RequestMapping("/test/hello")
    public String Hello(Model model) {
        model.addAttribute("msg","你好，欢迎！");
        return "hello";
        // --------------------------------
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.addObject(obj); // 添加对象
        modelAndView.setViewName("hello"); // 设置视图名称
        return modelAndView;
    }
}
```



> @GetMapping(value = "")
> @PostMapping(value = "")

```jsp
<a href="/test/test1">hello</a>
```

```java
@Controller
@RequestMapping(value = "/test")
public class Test1 {
    @GetMapping("/test1")
    public String test1(Model model){
        model.addAttribute("msg","test11页面");
        return "/test/test1";
    }
}
```



> method = RequestMethod.GET | RequestMethod.POST 请求方法
>
> params = {"bid","salary!100"} 约束包含bid，salary！=100
>
> (@RequestParam("id") Integer id) 接收对应请求的参数

```java
@RequestMapping(value = "/test",method = RequestMethod.GET,params = {"bid"})
```

```java
@Controller
@RequestMapping(value = "/test")
public class Test1 {
    @GetMapping(value = "/test1", params = {"id"})
    public String test1(Model model, @RequestParam("id") Integer id) {
        System.out.println(id);
        model.addAttribute("msg", "test1页面");
        return "/test/test1";
    }
}
```

## 请求转发

https://www.cnblogs.com/kitor/p/10987217.html

![image-20211108152018220](https://raw.githubusercontent.com/731016/imgSave/master/note_img202111081520334.png)

## 请求重定向

https://blog.csdn.net/weixin_39973810/article/details/84847922

![image-20211108152315128](https://raw.githubusercontent.com/731016/imgSave/master/note_img202111081523729.png)

![image-20211108152329816](https://raw.githubusercontent.com/731016/imgSave/master/note_img202111081523677.png)

![image-20211108152344230](https://raw.githubusercontent.com/731016/imgSave/master/note_img202111081523381.png)

## @ModelAttribute

https://www.cnblogs.com/liaochong/p/spring_modelattribute.html

> 1. 运用在参数上，会将客户端传递过来的参数按名称注入到指定对象中，并且会将这个对象自动加入ModelMap中，便于View层使用；
> 2. 运用在方法上，会在每一个@RequestMapping标注的方法前执行，如果有返回值，则自动将该返回值加入到ModelMap中；

```java
//@ModelAttribute 把表单数据封装为图书对象
    @PostMapping("/book/save_add")
    public String add(@ModelAttribute("aaa")BookInfo bookInfo){
        System.out.println(bookInfo);
        return "/book/book_add";
    }

    //@ModelAttribute("bk")先于当前控制器类中所有handler方法执行
    @ModelAttribute("bk")
    public BookInfo modelAttr_1(Model model){
        BookInfo bookInfo = new BookInfo(888,"长津湖",1000);
        model.addAttribute(bookInfo);
        System.out.println("先于handler执行.....");
        return bookInfo;
    }
```

## restFul风格

```jsp
<a href="/test/test1/1">test1</a>
```

```java
@Controller
@RequestMapping(value = "/test")
public class Test1 {
    @GetMapping(value = "/test1/{id}")
    public String test1(Model model, RedirectAttributes attr, @PathVariable("id") Integer id) {
        System.out.println(id);
//        attr.addAttribute("msg","请求重定向方式：test1页面");
        model.addAttribute("msg", "请求转发方式：test1页面");
        return "/test/test1";
    }
}
```

```jsp
<a href="/queryAllEmp">员工列表</a>
/--------------------------------------------
<table>
    <tr>
        <th>编号</th>
        <th>姓名</th>
        <th>性别</th>
        <th>部门编号</th>
        <th>薪资</th>
        <th>地址</th>
        <th>职位</th>
        <th>头像文件名称</th>
    </tr>
    <c:forEach items="${employees}" var="emp">
        <tr>
            <td><input type="button">${emp.eid}</td>
            <td>${emp.ename}</td>
            <td>${emp.sex}</td>
            <td>${emp.pid}</td>
            <td>${emp.salary}</td>
            <td>${emp.dizhi}</td>
            <td>${emp.job}</td>
            <td>${emp.file}</td>
            <td><a href="/empDel/${emp.eid}">删除</a></td>
        </tr>
    </c:forEach>
</table>
```

```java
@GetMapping(value = "/empDel/{eid}")
    public String empDel(Model model, @PathVariable Integer eid) {
        Integer delegate = employeeService.empDelegate(eid);
        if (delegate <= 0) {
            System.out.println("删除失败！");
        }
        List<Employee> employeeList = employeeService.queryAllEmp();
        model.addAttribute("employees", employeeList);
        return "redirect:/queryAllEmp";
    }
```

