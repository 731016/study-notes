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
	//@ModelAttribute当前端的name参数名称和实体类的属性名称相同时，可省略
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

> @GetMapping(value = "/test1/{id}")
> @PathVariable(value="id")
>
> 当@GetMapping上的占位符名称与下面括号里面的参数列表相同时，可**省略value**

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

### 查询

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

### 添加

```jsp
<form action="/empAdd" method="post">
        姓名：<input type="text" name="ename">
        性别：
        <input type="radio" name="sex" value="男" checked>男
        <input type="radio" name="sex" value="女">女
        部门：
        <select name="pid">
            <option value="404">绝密</option>
            <option value="701">销售部</option>
            <option value="803">调研部</option>
            <option value="805">外交部</option>
        </select>
        薪资：<input type="number" name="salary">
        地址：<input type="text" name="dizhi">
        职位：<input type="text" name="job">
        头像：<input type="image" name="file">

        <input type="submit" value="提交">
        <input type="reset" value="重置">
    </form>
```

```java
@GetMapping(value = "/toEmpAdd")
    public String toEmpAdd() {
        return "add";
    }

    @PostMapping(value = "/empAdd")
    public String empAdd(Model model, @ModelAttribute Employee employee) {
        Integer empAdd = employeeService.empAdd(employee);
        if (empAdd <= 0) {
            System.out.println("添加失败！");
        }
        List<Employee> employeeList = employeeService.queryAllEmp();
        model.addAttribute("employees", employeeList);
        return "employee";
    }
```

## 分页插件pagehelper

### pom.xml

```xml
<!-- https://mvnrepository.com/artifact/com.github.pagehelper/pagehelper -->
<dependency>
    <groupId>com.github.pagehelper</groupId>
    <artifactId>pagehelper</artifactId>
    <version>5.2.0</version>
</dependency>
```

### mybatis.xml

```xml-dtd
<plugins>
        <plugin interceptor="com.github.pagehelper.PageInterceptor"></plugin>
    </plugins>
```

### applicationContext.xml

```xml-dtd
<bean id="sqlSessionFactory" class="com.baomidou.mybatisplus.extension.spring.MybatisSqlSessionFactoryBean">
            <property name="dataSource" ref="dataSource"/>
    <!--        加载mybatis配置文件-->
            <property name="configLocation" value="classpath:mybatis.xml"/>
    <!--        别名处理-->
            <property name="typeAliasesPackage" value="com.springmvc.pojo"/>
<!--            映射sql文件-->
            <property name="mapperLocations" value="classpath:mapper/*.xml"/>
        </bean>
```

### mapper

```java
@Repository
public interface EmployeeMapper extends BaseMapper<Employee> {
    List<Employee> selectByPage();
}
```

```xml-dtd
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.springmvc.mapper.EmployeeMapper">
    <select id="selectByPage" parameterType="com.springmvc.pojo.Employee">
        select * from employee
    </select>
</mapper>
```

### sercive

```java
PageInfo<Employee> selectByPage(Integer pageNum, Integer pageSize);
PageInfo<Employee> selectCondByPage(Integer pageNum, Integer pageSize,Integer pid);
```

```java
@Override
    public PageInfo<Employee> selectByPage(Integer pageNum, Integer pageSize) {
        PageHelper.startPage(pageNum, pageSize);
        List<Employee> employeeList = employeeMapper.selectByPage();
        PageInfo<Employee> pageInfo = new PageInfo<>(employeeList, 5);
        return pageInfo;
    }

    @Override
    public PageInfo<Employee> selectCondByPage(Integer pageNum, Integer pageSize, Integer pid) {
        PageHelper.startPage(pageNum, pageSize);
        List<Employee> employeeList = null;
        if (pid == 0) {
            employeeList = employeeMapper.selectByPage();
        } else {
            employeeList = employeeMapper.selectCondByPage(pid);
        }
        PageInfo<Employee> pageInfo = new PageInfo<>(employeeList, 3);
        return pageInfo;
    }
```

### web

```java
@GetMapping(value = "/queryPageEmp/{pageNum}/{pid}")
    public String selectPage(Model model, @PathVariable("pageNum") Integer pageNum, @PathVariable("pid") Integer pid) {
        PageInfo<Employee> pageInfo = employeeService.selectCondByPage(pageNum, 5, pid);
        model.addAttribute("pageInfo", pageInfo);
        if (StringUtils.isBlank(pid.toString())){
            model.addAttribute("pid","000");
        }
        model.addAttribute("pid",pid);
        return "/employee";
    }
```

### jsp

```jsp
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <title>Title</title>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script>
        $(function () {
            $('#departmentID').change(function () {
                let pidVal = $(this).val();
                location.href = "/queryPageEmp/1/" + pidVal;
            });
        })
    </script>
</head>
<body>
<select name="pid" id="departmentID">
    <option value="0" selected>所有部门</option>
    <option value="404">绝密</option>
    <option value="701">销售部</option>
    <option value="803">调研部</option>
    <option value="805">外交部</option>
</select>
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
    <c:forEach items="${pageInfo.list}" var="emp">
        <tr>
            <td><input type="checkbox">${emp.eid}</td>
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

<div>
    <c:if test="${pid==0 || pid == null}">
        <a href="/queryPageEmp/1/0">首页</a>
    </c:if>
    <c:if test="${pid!=null}">
        <a href="/queryPageEmp/1/${pid}">首页</a>
    </c:if>
    <c:if test="${pageInfo.hasPreviousPage}">
        <a href="/queryPageEmp/${pageInfo.pageNum-1}/${pid}">上一页</a>
    </c:if>
    <c:forEach items="${pageInfo.navigatepageNums}" var="page">
        <c:if test="${page==pageInfo.pageNum}">
            <a style="color: green" href="/queryPageEmp/${page}/${pid}">${page}</a>
        </c:if>
        <c:if test="${page!=pageInfo.pageNum}">
            <a href="/queryPageEmp/${page}/${pid}">${page}</a>
        </c:if>
    </c:forEach>
    <c:if test="${pageInfo.hasNextPage}">
        <a href="/queryPageEmp/${pageInfo.pageNum+1}/${pid}">下一页</a>
        <a href="/queryPageEmp/${pageInfo.pages}/${pid}">末页</a>
    </c:if>
</div>

<div>
    <span style="color: olive">当前${pageInfo.pageNum }页</span>
    <span style="color: green">总共${pageInfo.pages }页</span>
    <span style="color: rosybrown">总共${pageInfo.total }条记录</span>
</div>
</body>
</html>
```

![image-20211109160023901](https://raw.githubusercontent.com/731016/imgSave/master/note_img202111091600265.png)

## 当需要接收集合类型时

```java
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Department {
    private List<Employee> employees;
}
```

```java
@Controller
public class DepartmentController {
    @GetMapping("/toDepAdd")
    public String toDepAdd(){
        return "/department_add";
    }
    @PostMapping("/depAdd")
    public String toDepAdd(@ModelAttribute Department department){
        for (Employee employee : department.getEmployees()) {
            System.out.println(employee);
        }
        return "/department_add";
    }
}
```

```jsp
<form action="/depAdd" method="post">
    员工编号：<input type="text" name="employees[0].eid">
    员工名称：<input type="text" name="employees[0].ename">
    员工编号：<input type="text" name="employees[1].eid">
    员工名称：<input type="text" name="employees[1].ename">

    <input type="submit" value="添加">
</form>
```

## 异步请求,响应

> @ResponseBody 写在方法上，返回值可以为void
> @RequestBody 写在参数列表上，可以post提交的表单数据，自动封装成pojo实体对象

```java
@Controller  
@RequestMapping("/catalog.do")  
public class CatalogController {  
    @RequestMapping(params = "fn=saveUsers")  
    @ResponseBody  
    public AjaxJson saveUsers(@RequestBody List<User> userList) {  
        …  
    }  
}
```

```java
public class User {  
        private String name;   
    private String pwd;  
    //省略getter/setter  
}  
```

```javascript
var userList = new Array();  
userList.push({name: "李四",pwd: "123"});   
userList.push({name: "张三",pwd: "332"});   
$.ajax({  
    type: "POST",  
    url: "<%=path%>/catalog.do?fn=saveUsers",  
    data: JSON.stringify(userList),//将对象序列化成JSON字符串  
    dataType:"json",  
    contentType : 'application/json;charset=utf-8', //设置请求头信息  
    success: function(data){  
        …  
    },  
    error: function(res){  
        …  
    }  
});  
```

## 自定义类型转换器

```java
@Component
public class DateConverter implements Converter<String, Date> {
    @Override
    public Date convert(String s) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy:MM:dd");
        Date date = null;
        try {
            date = dateFormat.parse(s);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return date;
    }
}
```

### springmvc.xml

```xml-dtd
<mvc:annotation-driven conversion-service="conversionService"/>

    <bean id="conversionService" class="org.springframework.format.support.FormattingConversionServiceFactoryBean">
        <property name="converters">
            <list>
                <bean class="com.springmvc.utils.DateConverter" />
            </list>
        </property>
    </bean>
```

```jsp
<form action="/checkHouseRecordAdd" method="post">
    cid:<input type="number">
    hid:<input type="number">
    账户名称：<input type="text">
    看房时间：<input type="date">

    <input type="submit" value="添加">
</form>
```

```java
@Controller
public class CheckHouseRecordController {

    @Resource
    private CheckHouseRecordService service;

    @GetMapping("/toCheckHouseRecordAdd")
    public String toCheckHouseRecordAdd() {
        return "/date_add";
    }

    @PostMapping("/checkHouseRecordAdd")
    public String checkHouseRecordAdd(@ModelAttribute CheckHouseRecord record) {
        System.out.println(record);
        Integer add = service.add(record);
        if (add <= 0) {
            System.out.println("添加失败！");
        }
        return "/date_add";
    }
}
```

