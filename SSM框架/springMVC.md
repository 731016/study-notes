## 执行流程

http://c.biancheng.net/spring_mvc/process.html

![image-20211124233848858](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/image-20211124233848858.png)

> + 客户端（浏览器）发送请求，直接请求到 `DispatcherServlet`。
> + `DispatcherServlet` 根据请求信息调用 `HandlerMapping`，解析请求对应的 `Handler`。
> + 解析到对应的 `Handler`（也就是我们平常说的 `Controller` 控制器）后，开始由 `HandlerAdapter` 适配器处理。
> + `HandlerAdapter` 会根据 `Handler`来调用真正的处理器开处理请求，并处理相应的业务逻辑。
> + 处理器处理完业务后，会返回一个 `ModelAndView` 对象，`Model` 是返回的数据对象，`View` 是个逻辑上的 `View`。
> + `ViewResolver` 会根据逻辑 `View` 查找实际的 `View`。
> + `DispaterServlet` 把返回的 `Model` 传给 `View`（视图渲染）。
> + 把 `View` 返回给请求者（浏览器）

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

![image-20211124234102729](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/image-20211124234102729.png)

## 请求重定向

https://blog.csdn.net/weixin_39973810/article/details/84847922

![image-20211124234135022](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/image-20211124234135022.png)



![image-20211124234146818](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/image-20211124234146818.png)

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
public PageInfo<Employee> paging(Integer pagenumber, Integer pgessize) {
   //利用PageHelper分页查询 注意：这个一定要放查询语句的前一行,否则无法进行分页,因为它对紧随其后第一个sql语句有效
   PageHelper.startPage(pagenumber,pgessize);
   //查询出所有数据
   List<Employee> list = mapper.selectList(null);
   //将数据存入pageInfo中
   PageInfo<Employee> pageInfo = new PageInfo<>(list);
   return pageInfo;
}
```

```java
@GetMapping("/page")
public String page(){
    //调用，传入需要查询的页数和每页数量
   PageInfo<Employee> paging = service.paging(2, 5);
   //使用getList方法获取到分页后的数据
   for (Employee employee : paging.getList()) {
      System.out.println(employee);
   }
   return "index";
}
```

```java
//如果要使用显示所有导航页号的话需要在PageInfo的构造中多添加一个参数：显示的导航号数量
PageInfo<Employee> pageInfo = new PageInfo<>(list,3);
```

| 参数                                     | 作用                                 |
| ---------------------------------------- | ------------------------------------ |
| private int pageNum;                     | 当前页                               |
| private int pageSize;                    | 每页的数量                           |
| private int size;                        | 当前页的数量                         |
| private int startRow;                    | 当前页面第一个元素在数据库中的行号   |
| private int endRow;                      | 当前页面最后一个元素在数据库中的行号 |
| private long total;                      | 总记录数                             |
| private int pages;                       | 总页数                               |
| private List list;                       | 结果集(每页显示的数据)               |
| private int prePage;                     | 前一页                               |
| private int nextPage;                    | 下一页                               |
| private boolean isFirstPage = false;     | 是否为第一页                         |
| private boolean isLastPage = false;      | 是否为最后一页                       |
| private boolean hasPreviousPage = false; | 是否有前一页                         |
| private boolean hasNextPage = false;     | 是否有下一页                         |
| private int navigatePages;               | 导航页码数                           |
| private int[] navigatepageNums;          | 所有导航页号                         |
| private int navigateFirstPage;           | 导航条上的第一页                     |
| private int navigateLastPage;            | 导航条上的最后一页                   |

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

![image-20211124234203933](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/image-20211124234203933.png)

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

## 自定义类型转换器

### utils

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

### jsp

```jsp
<form action="/checkHouseRecordAdd" method="post">
    cid:<input type="number">
    hid:<input type="number">
    账户名称：<input type="text">
    看房时间：<input type="date">

    <input type="submit" value="添加">
</form>
```

### web

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

## 异步请求,响应

> @ResponseBody 写在方法上，返回值可以为void
> @RequestBody 写在参数列表上，可以post提交的表单数据，自动封装成pojo实体对象

### pom.xml

```xml
<dependency>
            <groupId>com.fasterxml.jackson.core</groupId>
            <artifactId>jackson-databind</artifactId>
            <version>2.11.4</version>
        </dependency>
        <dependency>
            <groupId>com.fasterxml.jackson.core</groupId>
            <artifactId>jackson-core</artifactId>
            <version>2.11.4</version>
        </dependency>
        <dependency>
            <groupId>com.fasterxml.jackson.core</groupId>
            <artifactId>jackson-annotations</artifactId>
            <version>2.11.4</version>
        </dependency>
```

### service

```java
@GetMapping(value = "/toSelectOneEmp")
    public String toSelectOneEmp(){
        return "/select_emp";
    }

    @PostMapping(value = "/selectOneEmp")
    @ResponseBody
    public Employee selectOneEmp(@RequestBody Employee employee){
        System.out.println(employee);
        Integer employeeEid = employee.getEid();
        Employee emp = employeeService.selectOneEmp(employeeEid);
        return emp;
    }
```

### pojo

```java
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Employee {
    private Integer eid;
    private String ename;
    private String sex;
    private Integer pid;
    private String salary;
    private String dizhi;
    private String job;
    private String file;
}
```

### jsp

```javascript
<head>
    <title>Title</title>
    <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
    <script>
        $(function () {
            $('#select').click(function () {
                let dataObj = new Object();
                dataObj.eid = $('#eid').val();
                if (dataObj.eid == ""){
                    return false;
                }
                $.ajax({
                    type: 'post',
                    url: '${pageContext.request.contextPath}/selectOneEmp',
                    data: JSON.stringify(dataObj),
                    dataType: 'json',
                    contentType:"application/json;charset=utf-8",
                    success: function (data) {
                        console.log(data)
                        $('#info').html("");

                        $.each(data, function (index, element) {
                            $('#info').append('<h3>姓名：' + element + '</h3>');
                        });
                    },
                    error: function (resp) {
                        $('body').html(resp.responseText);
                    }
                });
            });
        });
    </script>
</head>
<body>
员工编号:<input type="text" id="eid">
<input type="button" id="select" value="查询">
<div id="info"></div>
</body>
```

## 多条件异步查询

### pojo

```java
public class Employee {
    private Integer eid;
    private String ename;
    private String sex;
    private Integer pid;
    private Double salary;
    private String dizhi;
    private String job;
    private String file;
}
public class ResultInfo<T> {
    private String msg;
    private List<T> resultObj;
}
```

### mapper

```java
List<Employee> selectCondEmpXml(Employee employee);
```

### service

```java
ResultInfo<Employee> selectCondEmp(Employee employee);
@Override
    public ResultInfo<Employee> selectCondEmp(Employee employee) {

        List<Employee> employees = employeeMapper.selectCondEmpXml(employee);

        System.out.println("service"+employees);

        ResultInfo<Employee> resultInfo = new ResultInfo<>();
        resultInfo.setResultObj(employees);

        if (employees.size() >= 0) {
            resultInfo.setMsg("查询成功！");
        } else {
            resultInfo.setMsg("查询失败！");
        }
        return resultInfo;
    }
```

### controller

```java
 @PostMapping(value = "/selectCondEmp")
    @ResponseBody
    public ResultInfo<Employee> selectCondEmp(@RequestBody Employee employee) {
        System.out.println("进入controller");
        System.out.println("controller"+employee);
        ResultInfo<Employee> info = employeeService.selectCondEmp(employee);
        return info;
    }
```

### jsp

```jsp
<head>
    <title>Title</title>
    <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
    <script>
        $(function () {
            $('#select').click(function () {
                let dataObj = new Object();
                dataObj.eid = $('#eid').val();
                if (dataObj.eid == "") {
                    return false;
                }
                $.ajax({
                    type: 'post',
                    url: '${pageContext.request.contextPath}/selectOneEmp',
                    data: JSON.stringify(dataObj),
                    dataType: 'json',
                    contentType: "application/json;charset=utf-8",
                    success: function (data) {
                        console.log(data);
                        $('#info').html("");
                        $.each(data, function (index, element) {
                            $('#info').append('<h3>姓名：' + element + '</h3>');
                        });
                    },
                    error: function (resp) {
                        $('body').html(resp.responseText);
                    }
                });
            });
            $('#select2').click(function () {

                let arr = $('#empForm').serializeArray()
                // console.log(arr);
                let dataArr = {};
                for (let i = 0; i < arr.length; i++) {
                    dataArr[arr[i].name] = arr[i].value;
                }
                console.log(JSON.stringify(dataArr));
                $.ajax({
                    type: 'post',
                    url: '${pageContext.request.contextPath}/selectCondEmp',
                    data: JSON.stringify(dataArr),
                    dataType: 'json',
                    contentType: "application/json;charset=utf-8",
                    cache: false,
                    success: function (data) {
                        console.log(data)
                        console.log(data.msg);
                        console.log(data.resultObj)
                        $('#info').html("");
                        $.each(data.resultObj, function (index, element) {
                            $('#info').append('<h3>姓名：' + element.ename + '</h3>');
                        });
                    },
                    error: function (resp) {
                        $('body').html(resp.responseText);
                    }
                });
            });

        });
    </script>
</head>
<body>
<form id="empForm">
    <div>
        员工编号:<input type="text" id="eid" name="eid">
    </div>
    <div>
        员工姓名：<input type="text" name="ename">
    </div>
    <div>
        性别：
        <input type="radio" value="男" name="sex">男
        <input type="radio" value="女" name="sex">女
    </div>
    <div>
        所属部门：
        <select name="pid">
            <option value="" selected>所有部门</option>
            <option value="404">绝密</option>
            <option value="701">销售部</option>
            <option value="803">调研部</option>
            <option value="805">外交部</option>
        </select>
    </div>
    <div>
        薪资：
        <input type="number" name="salary">
    </div>
    <div>
        地址：
        <input type="text" name="dizhi">
    </div>
    <div>
        工作：
        <input type="text" name="job">
    </div>
</form>
<input type="button" id="select" value="查询">
<input type="button" id="select2" value="多条件查询2">
<div id="info"></div>
</body>
```

## 访问静态资源

### springmvc.xml

```xml-dtd
<!--可以访问指定的静态资源-->
    <mvc:resources mapping="/js/**" location="/js"></mvc:resources>
    <mvc:resources mapping="/css/**" location="/css"></mvc:resources>
    <mvc:resources mapping="/img/**" location="/img"></mvc:resources>

<mvc:default-servlet-handler/>
```

## 文件上传

### pom.xml

```xml
<dependency>
      <groupId>commons-fileupload</groupId>
      <artifactId>commons-fileupload</artifactId>
      <version>1.3.1</version>
    </dependency>
    <dependency>
      <groupId>commons-io</groupId>
      <artifactId>commons-io</artifactId>
      <version>2.3</version>
    </dependency>
```

### springmvc.xml

```xml-dtd
<!--设置文件解析器-->
    <bean id="multipartResolver" class="org.springframework.web.multipart.commons.CommonsMultipartResolver">
        <!--设置文件大小不超过10M-->
        <property name="maxUploadSize" value="1024"/>
    </bean>
```

### controller

```java
@PostMapping(value = "/empAdd")
    public String empAdd(Model model,
                         HttpServletRequest request,
                         @ModelAttribute(value = "employee") Employee employee,
                         @RequestParam MultipartFile upload
    ) throws IOException {
        //服务器保存文件的真实路径
        String path = request.getSession().getServletContext().getRealPath("/uploads/");
//判断该文件夹是否存在，如果不存在则创建
        File file = new File(path);
        if (!file.exists()) {
            file.mkdirs();
        }
//获取上传文件的原始名称
        String filename = upload.getOriginalFilename();
//改造文件名，防止重名发生
        String uuid = UUID.randomUUID().toString().replace("-", "");
//执行上传
        filename = uuid + filename;

        System.out.println("文件名称"+filename);

        upload.transferTo(new File(path, filename));

        employee.setFile(filename);

        Integer empAdd = employeeService.empAdd(employee);
        if (empAdd <= 0) {
            System.out.println("添加失败！");
        }
        return "redirect:/queryAllEmp";
    }
```

### 上传jsp

```jsp
<form action="/empAdd" method="post" enctype="multipart/form-data">
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
        头像：<input type="file" name="upload">

        <input type="submit" value="提交">
        <input type="reset" value="重置">
    </form>
```

### 显示jsp

```jsp
<td><img src="/uploads/${emp.file}"></td>
```

## 拦截器

https://cloud.tencent.com/developer/article/1562376#:~:text=%E6%8B%A6%E6%88%AA%E5%99%A8%20%28interceptor%29%E6%98%AFspringmvc%E4%B8%AD%E7%9A%84%E4%B8%80%E4%B8%AA%20%E7%BB%84%E4%BB%B6%20%EF%BC%8C%E6%98%AF%E8%BF%90%E8%A1%8C%E5%9C%A8%20DispatcherServlet%20%E4%B9%8B%E5%90%8E%EF%BC%8C%E8%BF%90%E8%A1%8C%E5%9C%A8,Controller%20%E4%B9%8B%E5%89%8D%E7%9A%84%20%E6%8B%A6%E6%88%AA%E5%99%A8%E5%8F%AF%E4%BB%A5%E5%86%B3%E5%AE%9A%E5%AF%B9%E6%9F%90%E4%BA%9B%E7%AC%A6%E5%90%88%E6%9D%A1%E4%BB%B6%E7%9A%84%E8%BF%9B%E8%A1%8C%20%E6%8B%A6%E6%88%AA%20%E6%88%96%E8%80%85%20%E6%94%BE%E8%A1%8C%20%EF%BC%8C%E6%89%80%E4%BB%A5%EF%BC%8C%E9%80%9A%E5%B8%B8%E7%94%A8%E4%BA%8E%E5%AF%B9%E4%B8%80%E4%BA%9B%E5%85%B7%E6%9C%89%E7%9B%B8%E5%90%8C%E8%BF%90%E8%A1%8C%E6%9D%A1%E4%BB%B6%E7%9A%84%E5%8A%9F%E8%83%BD%E8%BF%9B%E8%A1%8C%E7%BA%A6%E6%9D%9F

```java
public class EmployeeInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        System.out.println("handler执行之前");
        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        System.out.println("handler执行之后，view返回之前");
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        System.out.println("view执行之后");
    }
}
```

### 登录验证

#### springmvc

```xml-dtd
<!--    配置拦截器-->
    <mvc:interceptors>
        <mvc:interceptor>
            <mvc:mapping path="/test/**"/>
<!--            <mvc:exclude-mapping path="/test/**"/>-->
            <bean class="com.springmvc.interceptor.EmployeeInterceptor"></bean>
        </mvc:interceptor>
    </mvc:interceptors>
```

#### interceptor

```java
public class EmployeeInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        System.out.println("handler执行之前");
        String uri = request.getRequestURI();
        if (uri.contains("login")) {
            return true;
        }

        if (request.getSession().getAttribute("login") == null) {
            response.sendRedirect("/login.jsp");
        }
        return false;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        System.out.println("handler执行之后，view返回之前");
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        System.out.println("view执行之后");
    }
}
```

#### mapper

```java
Employee login(String username);
```

```xml-dtd
<select id="login" resultType="com.springmvc.pojo.Employee" parameterType="java.lang.String">
        select * from employee where ename = #{username}
</select>
```

#### service

```java
Boolean login(String username);
@Override
    public Boolean login(String username) {
        Employee employee = employeeMapper.login(username);
        if (employee == null) {
            return false;
        }
        return true;
    }
```

#### web

```java
@PostMapping(value = "/emp_login")
    public String login(HttpServletRequest request,
                        @RequestParam(value = "username") String username,
                        @RequestParam(value = "password") String password) {
        System.out.println(username);
        System.out.println(password);
        if (employeeService.login(username) && "12345".equals(password)) {
            request.getSession().setAttribute("login","2000");
            return "/index";
        }
        return "/login";
    }
```

#### jsp

```jsp
<form action="/emp_login" method="post">
    用户名：<input type="text" name="username">
    密码：<input type="password" name="password">
    <input type="submit" value="登录">
</form>
```

### 多个拦截器的执行顺序

![image-20211124234224028](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/image-20211124234224028.png)

## 防止多表单提交

### js

```jsp
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML>
<html>
<head>
  <title>Form表单</title>
  <script type="text/javascript">
      var isCommitted = false;//表单是否已经提交标识，默认为false

      function dosubmit(){
          if(isCommitted==false){
              isCommitted = true;//提交表单后，将表单是否已经提交标识设置为true
              return true;//返回true让表单正常提交
          }else{
              return false;//返回false那么表单将不提交
          }
      }
  </script>
</head>

<body>
<form action="/DoForm"  method="post">
  用户名：<input type="text" name="username">
    <input type="submit" value="提交" id="submit"  onclick="return dosubmit()" >

</form>
</body>
</html>
```

### session

```jsp
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">

<html>
<head>
  <title>form表单</title>
</head>

<body>
<form action="/DoFormToken" method="post">
  <input type="hidden" name="token" value="<%=session.getAttribute("token") %>">
  用户名：<input type="text" name="username">
  <input type="submit" value="提交">
</form>
</body>
</html>
```

### 生成token字符串

```java
package com.zr.utils;

import java.util.Random;


public class TokenProccessor {
    /*
     *单例模式
     */
    private TokenProccessor(){}

    private static final TokenProccessor instance = new TokenProccessor();

    /**
     * 返回类的对象
     * @return
     */
    public static TokenProccessor getInstance(){
        return instance;
    }

    /**
     * 生成Token
     */
    public String makeToken(){
        String token = (System.currentTimeMillis() + new Random().nextInt(999999999)) + "";
        return token;
    }
}
```

### 进入页面之前，生成token，传给前端

```java
package com.zr.web;

import com.zr.utils.TokenProccessor
        ;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import java.io.IOException;

@WebServlet(name = "DoFormSession",urlPatterns = "/DoFormSession")
public class DoFormSession extends HttpServlet {
    protected void doPost(javax.servlet.http.HttpServletRequest request, javax.servlet.http.HttpServletResponse response) throws javax.servlet.ServletException, IOException {

    }

    protected void doGet(javax.servlet.http.HttpServletRequest request, javax.servlet.http.HttpServletResponse response) throws javax.servlet.ServletException, IOException {
        String token = TokenProccessor.getInstance().makeToken();//创建令牌
        System.out.println("在FormServlet中生成的token："+token);
        request.getSession().setAttribute("token", token);  //在服务器使用session保存token(令牌)
        response.sendRedirect("/add_session.jsp");//跳转到form.jsp页面
    }
}
```

### 提交时，验证token隐藏域

```java
package com.zr.web;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(name = "DoFormToken",urlPatterns = "/DoFormToken")
public class DoFormToken extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        boolean b = isRepeatSubmit(request);//判断用户是否是重复提交
        if(b==true){
            System.out.println("请不要重复提交!!!");
            return;
        }
        request.getSession().removeAttribute("token");//移除session中的token
        System.out.println("处理用户提交请求：添加完毕......");
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }

    /**
     * 判断客户端提交上来的令牌和服务器端生成的令牌是否一致
     *         true：重复提交
     *         false：没有重复提交
     */
    private boolean isRepeatSubmit(HttpServletRequest request) {
        String client_token = request.getParameter("token");
        //如果用户提交的表单数据中没有token，则是重复提交
        if(client_token==null){
            return true;
        }
        //取出存储在Session中的token
        String server_token = (String) request.getSession().getAttribute("token");
        //如果当前用户的Session中不存在Token，则是重复提交
        if(server_token==null){
            return true;
        }
        //存储在Session中的Token)与表单提交的Token不同，则是重复提交
        if(!client_token.equals(server_token)){
            return true;
        }

        return false;
    }
}
```

