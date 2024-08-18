# JSP + servlet



```Java
JSP =  Java Server Page

静态页面：.html ， 客户端中运行

动态页面：.jsp ，  服务器中运行
```

# 常用内置对象

[jsp内置对象_百度百科 (baidu.com)](https://baike.baidu.com/item/JSP内置对象/3771612#:~:text=JSP的内置对象是指在 JSP 页面系统中已经默认内置的 Java 对象，这些对象不需要开发人员显式声明即可使用。 在JSP页面中，可以通过存取JSP内置对象实现与JSP页面和Servlet环境的相互访问。 每个内部对象均有对应所属的ServletAPI类型。 [1],Web服务器。 早期的Java Web层体系结构中只有 Servlet 。 接受用户请求，处理业务逻辑，生成 HTML 显示结果都是在Servlet中完成的。)

## out

服务器**向浏览器输出**html格式的文本

```React
// out对象 
out.print(account);
out.print(educ);
```

## request

服务器**获取客户端请求的信息**

### (1) `setCharacterEncoding`

```Java
(1) request.setCharacterEncoding("utf-8");//设置提交到服务器数据的编码格式，否则会出现乱码

//表单元素提交到服务器，为了顺利提交表单数据，必须设置标签的name属性，如： 
    <form action="register_do.jsp">
      <input name="account"><p>
      <input type="submit" value="提交">
      <input name="love" type="checkbox" value="旅游"><input name="love" type="checkbox" value="游戏">
    </form>
    
(2) String account = request.getParameter("account");  //获取name=account的表单标签填写的数据（String型）
(3) String[] loves = request.getParameterValues("love"); //获取被选中的复选框数组
(4) request.getRequestDispatcher("register.jsp").forward(request,response); //转发跳转到register.jsp页面
// 提交表单
<form action="register_do.jsp">
  <div>
    用户名：
    <input name="account">
  </div>
  <div>密码：
    <input type="password" name="password">
  </div>
  <div>性别：
    <input type="radio" name="sex" checked="checked">男
    <input type="radio" name="sex">女
  </div>
  <div>
    学历：
    <select name="educ">
      <option>本科</option>
      <option>大专</option>
    </select>
  </div>
  <div>
    爱好：
    <input type="checkbox" value="01">玩游戏
    <input type="checkbox" value="02">学习
  </div>
  <input type="submit" value="提交">
</form>
<!--web.xml文件配置-->
<!--    默认页面-->
  <welcome-file-list>
    <welcome-file>register.jsp</welcome-file>
  </welcome-file-list>
//设置request的编码方式
    request.setCharacterEncoding("utf-8");
//设置response的编码方式
    response.setCharacterEncoding("utf-8");
  
  //接收客户端表单提交的数据
  String account = request.getParameter("account");
  String educ=request.getParameter("educ");

 // 获取多个name相同的表单数据
    String[] sexs = request.getParameterValues("sex");
    String[] parameterValues = request.getParameterValues("happy");
    for (String value : parameterValues) {
        System.out.println(value);
    }
```

### (2) `getRequestDispatcher`

```
request.getRequestDispatcher("JSP页面").forward(request,response);
```

页面转发，一次请求跳转，不会丢失数据

## response

服务器**处理客户端请求后，将数据返回到客户端**

### (1) sendRedirect(url)

重定向跳转到指定的页面，至少第二次请求后跳转，可跨域

- 登录页面

```Java
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="icon" href="https://cdn.jsdelivr.net/npm/@bootcss/v3.bootcss.com@1.0.16/favicon.ico">
    <link rel="canonical" href="https://getbootstrap.com/docs/3.4/examples/signin/">

    <title>Signin Template for Bootstrap</title>

    <!-- Bootstrap core CSS -->
    <link href="https://cdn.jsdelivr.net/npm/@bootcss/v3.bootcss.com@1.0.16/dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
    <link href="https://cdn.jsdelivr.net/npm/@bootcss/v3.bootcss.com@1.0.16/assets/css/ie10-viewport-bug-workaround.css" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="https://cdn.jsdelivr.net/npm/@bootcss/v3.bootcss.com@1.0.16/examples/signin/signin.css" rel="stylesheet">

    <!-- Just for debugging purposes. Don't actually copy these 2 lines! -->
    <!--[if lt IE 9]><script src="https://cdn.jsdelivr.net/npm/@bootcss/v3.bootcss.com@1.0.16/assets/js/ie8-responsive-file-warning.js"></script><![endif]-->
    <script src="https://cdn.jsdelivr.net/npm/@bootcss/v3.bootcss.com@1.0.16/assets/js/ie-emulation-modes-warning.js"></script>

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>

<body>

<div class="container">
    <form class="form-signin" action="boot_reg_to.jsp">
        <h2 class="form-signin-heading">登录</h2>
        <label for="inputEmail" class="sr-only">Email address</label>
        <input type="text" name="account" id="inputEmail" class="form-control" placeholder="账号" required autofocus>
        <label for="inputPassword" class="sr-only">Password</label>
        <input type="password" name="pwd" id="inputPassword" class="form-control" placeholder="密码" required>
        <div class="checkbox">
            <label>
                <input type="checkbox" value="remember-me"> 记住密码
            </label>
        </div>
        <button class="btn btn-lg btn-primary btn-block" type="submit">登录</button>
    </form>

</div> <!-- /container -->


<!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
<script src="https://cdn.jsdelivr.net/npm/@bootcss/v3.bootcss.com@1.0.16/assets/js/ie10-viewport-bug-workaround.js"></script>
</body>
</html>
```

- 登录处理页面

```Java
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    request.setCharacterEncoding("utf-8");
    String account = request.getParameter("account");
    String pwd = request.getParameter("pwd");

    StudentService service = new StudentServiceImpl();
    Student student = service.selectOne(account);

    if (account.equals(student.getAccount()) && pwd.equals(student.getPwd())) {
        response.sendRedirect("register.jsp");
    } else {
        out.write("<script>alert('账号或密码不正确！');location='bootstrap_register.jsp';</script>");
    }
%>
```

<img src="https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/image-20211124231407722.png" alt="image-20211124231407722" style="zoom:67%;" />

### (2) setContentType

```
response.setContentType("text/html;charset=UTF-8");
```

## session

俗称:会话，是指:服务器与某个客户端的一次交互过程。

它保存的数据在网站的任何地方都可以共享。

### (1) `setAttribute`

```Java
session.setAttribute("student_session", student);//设置session
Student session1 = (Student) session.getAttribute("student_session");
```

- 注册页面-**设置session**

```Java
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    request.setCharacterEncoding("utf-8");
    response.setContentType("text/html;charset=UTF-8");
    //用户输入
    String account = request.getParameter("account");
    String pwd = request.getParameter("pwd");

    StudentService service = new StudentServiceImpl();
    Student student = service.selectOne(account);
    // student对象为注册页面[stu_list.jsp]的a链接
    if (student != null && account.equals(student.getAccount()) && pwd.equals(student.getPwd())) {
//        response.sendRedirect("register.jsp");
        session.setAttribute("student_session", student);//设置session
        request.getRequestDispatcher("stu_detail.jsp").forward(request, response);//请求转发
    } else {
        out.write("<script>alert('账号或密码不正确！');location='bootstrap_register.jsp';</script>");
    }
%>
```

### (2) `getAttribute`

- 处理页面-**获取session**

```Java
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>用户详情页面</title>
</head>
<body>
<ul>
    <%
        request.setCharacterEncoding("utf-8");
        String acc = request.getParameter("acc");
        //判断是不是点击链接的请求
        if (acc == null) {
            //不是获取session对象
            Student session1 = (Student) session.getAttribute("student_session");
    %>
    <li>
        <%= session1.getAccount() %>
        <%= session1.getPwd() %>
        <%= session1.getSex() %>
        <%= session1.getEduc() %>
        <%= session1.getHappy() %>
    </li>
    <%
    } else {
            //是，获取get、请求的参数
        StudentService service = new StudentServiceImpl();
        Student student = service.selectOne(acc);
    %>
    <li>
        <%= student.getAccount() %>
        <%= student.getPwd() %>
        <%= student.getSex() %>
        <%= student.getEduc() %>
        <%= student.getHappy() %>
    </li>
    <%
        }
    %>
</ul>
</body>
</html>
```

### (3) `removeAttribute`

```Java
session.removeAttribute("login"); //清除指定的session
```

### (4) `invalidate`

```Java
session.invalidate(); // 清除所有的session
```

### (5) `getID()`

获取ID号

### (6)`setMaxInactiveInterval(秒)`

```Java
设置生命周期: session.setMaxInactive Interval (20)
以秒为单位: 20秒
web.xml中添加如下代码:
<session-config>
  <session-timeout>20</session-timeout> 以分钟为单位: 20分 钟
</session-config>
```

## application

针对访问当前网站的所有客户端

生命周期:与整个应用程序的生命周期一致，除非服务器崩溃或者应用程序被关闭才会结束。主要的功能方法与session相同

应用场景:统计网站访问人数

![image-20211124231600164](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/image-20211124231600164.png)

### (1)`getAttribute,setAttribute`

```Java
<%
    if (application.getAttribute("peopleNum")==null){
        application.setAttribute("peopleNum",1);
    }else{
        int num = Integer.parseInt(application.getAttribute("peopleNum").toString());
        num++;
        application.setAttribute("peopleNum",num);
    }
%>
<h4>当前访问量：<%=application.getAttribute("peopleNum").toString()%></h4>
```

## cookie

保护在客户端的信息

```Java
<input type="checkbox" name="rem" value="remember-me"> 20s内免登陆
if (request.getParameter("rem") != null) {
            Cookie cookieLogin = new Cookie("cookie_login", student.getAccount());
            cookieLogin.setMaxAge(30);
            response.addCookie(cookieLogin);
        }
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    Cookie[] cookies = request.getCookies();
    for (Cookie cookie : cookies) {
        if (cookie.getName().equals("cookie_login")){
            response.sendRedirect("register.jsp");
            return;
        }
    }
%>
```

## 作用域

```Java
1. pageContext
在单页面内实现数据共享，不能跨页共享数据

2. request
以转发跳转到目标页面可以共享数据，但以重定向跳转到目标页面是无法共享其数据的

3. session
在生命周期内以任何方式跳转到目标页面都可以共享其范围内的数据

4. application
只要服务器不宕机，应用程序不崩溃，则所有访问者都可以共享其数据(因占用内存时间太长，慎用! )
```

# JDBC+JSP

**数据表**

```SQL
create table **d_student**(
account varchar(50) primary key,
pwd varchar(50) not null,
sex varchar(10) not null,
educ varchar(10) not null,
happy varchar(50) not null
)default charset=utf8;

select * from d_student;
```

**jar包**

![image-20211124231701264](C:\Users\折腾的小飞\AppData\Roaming\Typora\typora-user-images\image-20211124231701264.png)

- **实体类**

```Java
public class Student {
    private String account;
    private String pwd;
    private String sex;
    private String educ;
    private String happy;

    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    public String getPwd() {
        return pwd;
    }

    public void setPwd(String pwd) {
        this.pwd = pwd;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getEduc() {
        return educ;
    }

    public void setEduc(String educ) {
        this.educ = educ;
    }

    public String getHappy() {
        return happy;
    }

    public void setHappy(String happy) {
        this.happy = happy;
    }

    public Student() {
    }

    public Student(String account, String pwd, String sex, String educ, String happy) {
        this.account = account;
        this.pwd = pwd;
        this.sex = sex;
        this.educ = educ;
        this.happy = happy;
    }
}
```

- **JDBC工具类**

```Java
public class JdbcUtils {
    private static DataSource ds;
    static {
        try {
            //1.加载配置文件
            Properties pro = new Properties();
            pro.load(JdbcUtils.class.getClassLoader().getResourceAsStream("db.properties"));
            //2.获取DataSource
            ds = DruidDataSourceFactory.createDataSource(pro);
        }
        catch (Exception e){
            ds = null;
        }
    }

    private static Connection getConnection(){
        Connection con;
        try {
            con = ds.getConnection();
        }
        catch (Exception ex){
            con = null;
        }
        return con;
    }
    /* 获取 QueryRunner */
    public static QueryRunner getQueryRunner(){
        QueryRunner runner = new QueryRunner(ds);
        return runner;
    }
}
```

- 注册页面

```Java
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>注册页面</title>
<%--    表单元素提交必须设置name属性--%>
</head>
<body>
<form action="register_do.jsp">
    <div>
        用户名：
        <input name="account">
    </div>
    <div>密码：
        <input type="password" name="password">
    </div>
    <div>性别：
        <input type="radio" name="sex" checked="checked" value="1">男
        <input type="radio" name="sex" value="0">女
    </div>
    <div>
        学历：
        <select name="educ">
            <option value="本科">本科</option>
            <option value="大专">大专</option>
        </select>
    </div>
    <div>
        爱好：
        <input type="checkbox" value="玩游戏" name="happy">玩游戏
        <input type="checkbox" value="学习" name="happy">学习
    </div>
    <input type="submit" value="提交">
</form>
</body>
</html>
```



## 插入数据-用户注册

- 数据访问层`Dao`

```Java
import java.sql.SQLException;

public interface StudentDao {
    // 插入数据
    public Integer insertStudent(Student student) throws SQLException;
}
public class StudentDaoImpl implements StudentDao {
   private QueryRunner queryRunner;

    public StudentDaoImpl() {
        queryRunner=JdbcUtils.getQueryRunner();
    }
    @Override
    public Integer insertStudent(Student student) throws SQLException {
        String insertsql = "insert into d_student values(?,?,?,?,?)";
        Object[] objects = {
                student.getAccount(),
                student.getPwd(),
                student.getSex(),
                student.getEduc(),
                student.getHappy()
        };
        //QueryRunner queryRunner = JdbcUtils.getQueryRunner();
        int updateFlag = queryRunner.update(insertsql, objects);
        return updateFlag;
    }
}
```

- 业务逻辑层`service`

```Java
public interface StudentService {
    public Integer insertStudent(Student student) throws SQLException;
}
public class StudentServiceImpl implements StudentService {
    private StudentDao studentDao;

    public StudentServiceImpl() {
        studentDao=new StudentDaoImpl();
    }

    @Override
    public Integer insertStudent(Student student) throws SQLException {
        Integer updateFlag = studentDao.insertStudent(student);
        return updateFlag;
    }
}
```

- 请求处理页面

```Java
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%--处理请求--%>
<%
    //设置request的编码方式
    request.setCharacterEncoding("utf-8");
    //设置response的编码方式
    response.setCharacterEncoding("utf-8");
    //接收客户端表单提交的数据
    String account = request.getParameter("account");
    String pwd = request.getParameter("password");
    String educ = request.getParameter("educ");
    // 获取多个name相同的表单数据
    String[] sexs = request.getParameterValues("sex");
    String[] parameterValues = request.getParameterValues("happy");
    String happy = "";
    for (String value : parameterValues) {
        happy += value;
        happy += ",";
    }
    happy = happy.substring(0, happy.lastIndexOf(","));
    Student stu = new Student(account, pwd, sexs[0], educ, happy);
    StudentService service = new StudentServiceImpl();
    Integer insertFlag = service.insertStudent(stu);
    System.out.println("insert success,change cols:" + insertFlag);
%>
```

![image-20211124231827467](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/image-20211124231827467.png)

## 查询数据-列出用户列表

- 数据访问层`Dao`

```Java
// 查询所有数据
public List<Student> selectAll() throws SQLException;
// 查询单个数据
public Student selectOne(String stuName) throws SQLException;
private QueryRunner queryRunner;

    public StudentDaoImpl() {
        queryRunner=JdbcUtils.getQueryRunner();
    }
@Override
    public List<Student> selectAll() throws SQLException {
        String selectAllSql="select * from d_student";
        BeanListHandler handler=new BeanListHandler(Student.class);
        //QueryRunner runner = JdbcUtils.getQueryRunner();
        List<Student> query = (List<Student>) runner.query(selectAllSql,handler);
        return query;
    }

    @Override
    public Student selectOne(String stuName) throws SQLException {
        String selectOneSql="select * from d_student where account=?";
        Object[] objects={stuName};
        BeanHandler<Student> handler= new BeanHandler<>(Student.class);
       // QueryRunner queryRunner=JdbcUtils.getQueryRunner();
        Student query = queryRunner.query(selectOneSql, handler, objects);
        return query;
    }
```

- 业务逻辑层`service`

```Java
public List<Student> selectAll() throws SQLException;
public Student selectOne(String stuName) throws SQLException;
@Override
    public Student selectOne(String stuName) throws SQLException {
        Student student = studentDao.selectOne(stuName);
        return student;
    }

    @Override
    public List<Student> selectAll() throws SQLException {
        List<Student> students = studentDao.selectAll();
        return students;
    }
```

- 主页，用户列表页，用户详情页

```Java
<a href="stu_list.jsp">用户列表页</a>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>用户列表</title>
</head>
<body>
<%
    StudentService service = new StudentServiceImpl();
    List<Student> students = service.selectAll();
%>
<ul>
    <%
        for (int i = 0; i < students.size(); i++) {%>
        <li><a href="stu_detail.jsp?acc=<%=students.get(i).getAccount()%>"><%=students.get(i).getAccount()%></a></li>
    <%}%>
</ul>
</body>
</html>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>用户详情页面</title>
</head>
<body>
<ul>
    <%
        request.setCharacterEncoding("utf-8");
        String acc = request.getParameter("acc");
        StudentService service = new StudentServiceImpl();
        Student student = service.selectOne(acc);
    %>
    <li>
        <%= student.getAccount() %>
        <%= student.getPwd() %>
        <%= student.getSex() %>
        <%= student.getEduc() %>
        <%= student.getHappy() %>
    </li>
</ul>
</body>
</html>
```

![image-20211124231748488](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/image-20211124231748488.png)

## 用户登录

- 请求处理页面,用户详情页面

```Java
<%@ page import="com.service.StudentService" %>
<%@ page import="com.service.impl.StudentServiceImpl" %>
<%@ page import="com.pojo.Student" %><%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2021/9/16
  Time: 18:10
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    request.setCharacterEncoding("utf-8");
    response.setContentType("text/html;charset=UTF-8");
    //用户输入
    String account = request.getParameter("account");
    String pwd = request.getParameter("pwd");

    StudentService service = new StudentServiceImpl();
    Student student = service.selectOne(account);
    // student对象为注册页面[stu_list.jsp]的a链接
    if (student != null && account.equals(student.getAccount()) && pwd.equals(student.getPwd())) {
//        response.sendRedirect("register.jsp");
        session.setAttribute("student_session", student);//设置session
        request.getRequestDispatcher("stu_detail.jsp").forward(request, response);//请求转发
    } else {
        out.write("<script>alert('账号或密码不正确！');location='bootstrap_register.jsp';</script>");
    }
%>
<%@ page import="com.service.StudentService" %>
<%@ page import="com.service.impl.StudentServiceImpl" %>
<%@ page import="com.pojo.Student" %><%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2021/9/16
  Time: 16:37
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>用户详情页面</title>
</head>
<body>
<ul>
    <%
        request.setCharacterEncoding("utf-8");
        String acc = request.getParameter("acc");
        //判断是不是点击链接的请求
        if (acc == null) {
            //不是获取session对象
            Student session1 = (Student) session.getAttribute("student_session");
    %>
    <li>
        <%= session1.getAccount() %>
        <%= session1.getPwd() %>
        <%= session1.getSex() %>
        <%= session1.getEduc() %>
        <%= session1.getHappy() %>
    </li>
    <%
    } else {
            //是，获取get、请求的参数
        StudentService service = new StudentServiceImpl();
        Student student = service.selectOne(acc);
    %>
    <li>
        <%= student.getAccount() %>
        <%= student.getPwd() %>
        <%= student.getSex() %>
        <%= student.getEduc() %>
        <%= student.getHappy() %>
    </li>
    <%
        }
    %>
</ul>
</body>
</html>
```

## 防止用户跳过验证直接登录

```Java
//页面判断session
if(session.getAttribute("student_session")==null){
    response.sendRedirect("bootstrap_register.jsp");
}
```

- 用户详情页面

```Java
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>用户详情页面</title>
</head>
<body>
<ul>
    <%
        request.setCharacterEncoding("utf-8");
        String acc = request.getParameter("acc");
        //判断是不是点击链接的请求
        if (acc == null) {
            //不是获取session对象
            Student session1 = (Student) session.getAttribute("student_session");
            if (session1 == null) {
                response.sendRedirect("bootstrap_register.jsp");
            } else {

    %>
    <li>
        <%= session1.getAccount() %>
        <%= session1.getPwd() %>
        <%= session1.getSex() %>
        <%= session1.getEduc() %>
        <%= session1.getHappy() %>
    </li>
    <%
        }

    } else {
        //是，获取get、请求的参数
        StudentService service = new StudentServiceImpl();
        Student student = service.selectOne(acc);
    %>
    <li>
        <%= student.getAccount() %>
        <%= student.getPwd() %>
        <%= student.getSex() %>
        <%= student.getEduc() %>
        <%= student.getHappy() %>
    </li>
    <%
        }
    %>
</ul>
</body>
</html>
```

## 删除用户

- 数据访问层`Dao`

```Java
public Integer delOne(String stuName) throws SQLException;
@Override
    public Integer delOne(String stuName) throws SQLException {
        String delSql="delete from d_student where account=?";
        Object[] objects={stuName};
        int delFlag = queryRunner.update(delSql, objects);
        return delFlag;
    }
```

- 业务逻辑层`Service`

```Java
public Integer delOne(String stuName) throws SQLException;
@Override
    public Integer delOne(String stuName) throws SQLException {
        return studentDao.delOne(stuName);
    }
```

- 用户列表页，删除处理

```Java
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>用户列表</title>
    <style>
        li{
            list-style: none;
        }
    </style>
</head>
<body>
<%
    //页面判断session
    if(session.getAttribute("student_session")==null){
        response.sendRedirect("bootstrap_register.jsp");
    }
    StudentService service = new StudentServiceImpl();
    List<Student> students = service.selectAll();
%>
<a href="register.jsp">添加用户</a>
<ul>

    <table>
        <tr>
            <th>用户账号</th>
            <th>操作</th>
        </tr>
        <%
            for (int i = 0; i < students.size(); i++) {%>
        <tr>
            <td><a href="stu_detail.jsp?acc=<%=students.get(i).getAccount()%>" name="detail"><%=students.get(i).getAccount()%></a></td>
            <td><a href="del.jsp?acc=<%=students.get(i).getAccount()%>" name="del">删除</a></td>
        </tr>
        <%}%>
    </table>
</ul>
<script>
    var delBtn=document.getElementsByName("del");
    for (let i = 0; i <delBtn.length ; i++) {
        delBtn[i].onclick=function () {
            let flag = confirm("确定要删除吗？");
            if (!flag) {
                return false;
            }
        }
    }
</script>
</body>
</html>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    StudentService service=new StudentServiceImpl();
    Integer delCount = service.delOne(request.getParameter("acc"));
    System.out.println("删除行数："+delCount);
    response.sendRedirect("stu_list.jsp");
%>
```

![image-20211124231956550](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/image-20211124231956550.png)

## 用户信息修改

![image-20211124232006233](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/image-20211124232006233.png)

- 业务逻辑层`Service`

```Java
public Integer alterOne(Student student) throws SQLException;
@Override
    public Integer alterOne(Student student) throws SQLException {
        String alterSql="update d_student set sex=?,educ=?,happy=? where account=?";
        Object[] objects={
                student.getSex(),
                student.getEduc(),
                student.getHappy(),
                student.getAccount()
        };
        int alterFlag = queryRunner.update(alterSql, objects);
        return alterFlag;
    }
```

- 业务逻辑层`Service`

```Java
public Integer alterOne(Student student) throws SQLException;
@Override
    public Integer alterOne(Student student) throws SQLException {
        return studentDao.alterOne(student);
    }
```

- 注册页面`register.jsp`

```Java
<%--
    新增用户

    表单提交给register_do.jsp 注册处理页面
    默认get请求

    用户列表页 stu_list.jsp
    登录页面 bootstrap_register.jsp
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>注册页面</title>
    <%--    表单元素提交必须设置name属性--%>
</head>
<body>
<form action="register_do.jsp">
    <table>
        <tr>
            <td>用户名：</td>
            <td><input name="account"></td>
        </tr>
        <tr>
            <td>密码：</td>
            <td><input type="password" name="password"></td>
        </tr>
        <tr>
            <td>性别：</td>
            <td>
                <input type="radio" name="sex" checked="checked" value="男">男
                <input type="radio" name="sex" value="女">女
            </td>
        </tr>
        <tr>
            <td>学历：</td>
            <td>
                <select name="educ">
                    <option value="本科">本科</option>
                    <option value="大专">大专</option>
                </select>
            </td>
        </tr>
        <tr>
            <td>爱好：</td>
            <td><input type="checkbox" value="玩游戏" name="happy">玩游戏
                <input type="checkbox" value="学习" name="happy">学习
            </td>
        </tr>
        <tr>
            <td colspan="2">
                <input type="submit" value="提交">
            </td>
        </tr>
        <tr>
            <td><a href="stu_list.jsp">用户列表页</a></td>
            <td><a href="bootstrap_register.jsp">登录页面</a></td>
        </tr>
    </table>
</form>
</body>
</html>
```

- 注册处理页面 `register_do.jsp`

```Java
<%@ page import="java.util.Enumeration" %>
<%@ page import="com.pojo.Student" %>
<%@ page import="com.service.StudentService" %>
<%@ page import="com.service.impl.StudentServiceImpl" %><%--
  处理新增用户

  获取get请求表单数据
  注册成功跳转bootstrap_register.jsp 登录页面
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%--处理请求--%>
<%
    //设置request的编码方式
    request.setCharacterEncoding("utf-8");
    //设置response的编码方式
    response.setCharacterEncoding("utf-8");
    //接收客户端表单提交的数据
    String account = request.getParameter("account");
    String pwd = request.getParameter("password");
    String educ = request.getParameter("educ");
    // 获取多个name相同的表单数据
    String[] sexs = request.getParameterValues("sex");
    String[] parameterValues = request.getParameterValues("happy");
    String happy = "";
    for (String value : parameterValues) {
        happy += value;
        happy += ",";
    }
    happy = happy.substring(0, happy.lastIndexOf(","));
    Student stu = new Student(account, pwd, sexs[0], educ, happy);
    StudentService service = new StudentServiceImpl();
    Integer insertFlag = service.insertStudent(stu);
    System.out.println("插入成功,修改行数：" + insertFlag);
    response.sendRedirect("bootstrap_register.jsp");
%>
```

- 登录页面`bootstrap_register.jsp`

```Java
<%--
  登录页面
  bootstrap_register.jsp
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="icon" href="https://cdn.jsdelivr.net/npm/@bootcss/v3.bootcss.com@1.0.16/favicon.ico">
    <link rel="canonical" href="https://getbootstrap.com/docs/3.4/examples/signin/">

    <title>Signin Template for Bootstrap</title>

    <!-- Bootstrap core CSS -->
    <link href="https://cdn.jsdelivr.net/npm/@bootcss/v3.bootcss.com@1.0.16/dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
    <link href="https://cdn.jsdelivr.net/npm/@bootcss/v3.bootcss.com@1.0.16/assets/css/ie10-viewport-bug-workaround.css" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="https://cdn.jsdelivr.net/npm/@bootcss/v3.bootcss.com@1.0.16/examples/signin/signin.css" rel="stylesheet">

    <!-- Just for debugging purposes. Don't actually copy these 2 lines! -->
    <!--[if lt IE 9]><script src="https://cdn.jsdelivr.net/npm/@bootcss/v3.bootcss.com@1.0.16/assets/js/ie8-responsive-file-warning.js"></script><![endif]-->
    <script src="https://cdn.jsdelivr.net/npm/@bootcss/v3.bootcss.com@1.0.16/assets/js/ie-emulation-modes-warning.js"></script>

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>

<body>
<script>
    // var submit

</script>
<div class="container">
    <form class="form-signin" action="boot_reg_to.jsp">
        <h2 class="form-signin-heading">登录</h2>
        <label for="inputEmail" class="sr-only">Email address</label>
        <input type="text" name="account" id="inputEmail" class="form-control" placeholder="账号" required autofocus>
        <label for="inputPassword" class="sr-only">Password</label>
        <input type="password" name="pwd" id="inputPassword1" class="form-control" placeholder="密码" required>
        <div class="checkbox">
            <label>
                <input type="checkbox" value="remember-me"> 记住密码
            </label>
        </div>
        <button class="btn btn-lg btn-primary btn-block" id="tj" type="submit">登录</button>
    </form>

</div> <!-- /container -->


<!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
<script src="https://cdn.jsdelivr.net/npm/@bootcss/v3.bootcss.com@1.0.16/assets/js/ie10-viewport-bug-workaround.js"></script>
</body>
</html>
```

- 用户登录处理页面`boot_reg_to.jsp`

```Java
<%@ page import="com.service.StudentService" %>
<%@ page import="com.service.impl.StudentServiceImpl" %>
<%@ page import="com.pojo.Student" %><%--

  登录处理页面
  boot_reg_to.jsp

  设置session "login":student.getAccount() 账户名(登录用户的数据库用户名)
  请求转发到 stu_list.jsp

--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    request.setCharacterEncoding("utf-8");
    response.setContentType("text/html;charset=UTF-8");
    //用户输入
    String account = request.getParameter("account");
    String pwd = request.getParameter("pwd");

    StudentService service = new StudentServiceImpl();
    Student student = service.selectOne(account);
    // student对象为注册页面[stu_list.jsp]的a链接
    if (student != null && account.equals(student.getAccount()) && pwd.equals(student.getPwd())) {
        session.setAttribute("login", student.getAccount());//设置session
        request.getRequestDispatcher("stu_list.jsp").forward(request, response);//请求转发
    } else {
        out.write("<script>alert('账号或密码不正确！');location='bootstrap_register.jsp';</script>");
    }
%>
```

- 用户列表-展示用户名，可以删除数据，返回注册用户页面`stu_list.jsp`

```Java
<%@ page import="com.service.StudentService" %>
<%@ page import="com.service.impl.StudentServiceImpl" %>
<%@ page import="com.pojo.Student" %>
<%@ page import="java.util.List" %>
<%--导入用户是否登陆检查--%>
<%@ include file="check.jsp"%>
<%--
  所有用户名列表
  stu_list.jsp

  session:"login"为空 ,重定向bootstrap_register.jsp 回登陆页面

  点击用户名 超链接跳转到 stu_detail.jsp?acc=用户名
  点击删除 超链接跳转到 del.jsp?acc=用户名
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<html>
<head>
    <title>用户列表</title>
    <style>
        li {
            list-style: none;
        }
    </style>
</head>
<body>
<%
    StudentService service = new StudentServiceImpl();
    List<Student> students = service.selectAll();
%>
<a href="register.jsp">添加用户</a>
<a href="exit.jsp">退出</a>
<ul>
    <table>
        <tr>
            <th>用户账号</th>
            <th>操作</th>
        </tr>
        <%
            for (int i = 0; i < students.size(); i++) {%>
        <tr>
            <td><a href="stu_detail.jsp?acc=<%=students.get(i).getAccount()%>"
                   name="detail"><%=students.get(i).getAccount()%>
            </a></td>
            <td><a href="del.jsp?acc=<%=students.get(i).getAccount()%>" name="del">删除</a></td>
        </tr>
        <%}%>
    </table>
</ul>
<script>
    var delBtn = document.getElementsByName("del");
    for (let i = 0; i < delBtn.length; i++) {
        delBtn[i].onclick = function () {
            let flag = confirm("确定要删除吗？");
            if (!flag) {
                return false;
            }
        }
    }
</script>
</body>
</html>
```

- 删除处理页面`del.jsp`

```Java
<%@ page import="com.service.StudentService" %>
<%@ page import="com.service.impl.StudentServiceImpl" %><%--
  删除用户信息处理

  重定向回用户列表页面stu_list.jsp
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    StudentService service=new StudentServiceImpl();
    Integer delCount = service.delOne(request.getParameter("acc"));
    System.out.println("删除行数："+delCount);
    response.sendRedirect("stu_list.jsp");
%>
```

- 用户详情页面`stu_detail.jsp`

```Java
<%@ page import="com.service.StudentService" %>
<%@ page import="com.service.impl.StudentServiceImpl" %>
<%@ page import="com.pojo.Student" %>
<%--导入用户是否登陆检查--%>
<%@ include file="check.jsp"%>
<%--
  用户详情页面

  获取session "login" || 超链接get请求
  为空 重定向登录页

  表单提交alter.jsp
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>用户详情页面</title>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>
<style>
    li {
        list-style: none;
    }
</style>
<body>
    <%
        request.setCharacterEncoding("utf-8");
        String acc = request.getParameter("acc"); //链接请求 用户列表点击用户名
        Student stuInfo = null;
        String account = (String) session.getAttribute("acc"); //session 修改成功后获取session
        if (acc == null && account == null) {
            request.getRequestDispatcher("bootstrap_register.jsp").forward(request, response);
//            response.sendRedirect("bootstrap_register.jsp");
        } else {
            //是，获取get、请求的参数
            StudentService service = new StudentServiceImpl();
            if (acc == null) {
                stuInfo = service.selectOne(account);
            } else {
                stuInfo = service.selectOne(acc);
            }
        }
    %>
    <a href="stu_list.jsp">返回用户列表</a>
    <form action="alter.jsp">
        <table>
            <tr>
                <th>用户名</th>
                <th>性别</th>
                <th>学历</th>
                <th>爱好</th>
                <th>操作</th>
            </tr>
            <tr>
                <td>
                    <input type="hidden" name="acc" value="<%= stuInfo.getAccount()%>"/>
                    <label><%= stuInfo.getAccount()%></label>

                </td>
                <td>
                    <input type="radio" name="sex" value="男">男
                    <input type="radio" name="sex" value="女">女

                </td>
                <td>
                    <select name="educ">
                        <option value="本科">本科</option>
                        <option value="大专">大专</option>
                    </select>
                </td>
                <td>
                    <input type="checkbox" name="happy" value="玩游戏">玩游戏
                    <input type="checkbox" name="happy" value="学习">学习
                </td>
                <td>
                    <input type="submit" value="修改">
                </td>
            </tr>
        </table>
    </form>
    /*(1) 使用java拼接数组
    <script>
        $(function () {
            <%
            String arr = "";
            String[] split = stuInfo.getHappy().split(",");
            for (String s : split) {
                arr+="\""+s+"\",";
            }
            arr=arr.substring(0,arr.lastIndexOf(","));
            %>
            let arr = [<%=arr%>];
            $('input[name="sex"][value="<%=stuInfo.getSex()%>"]').prop('checked',true);
            $('input[name="educ"][value="<%= stuInfo.getEduc() %>"]').prop('selected',true);
            $.each(arr,function () {
                $('input[type="checkbox"][value="'+this+'"]').prop('checked',true);
            })
        });
    </script>
*/
// (2) 使用js拼接数组
<script>
    $(function () {
        var arrstr = "<%=stuInfo.getHappy()%>"; //获取爱好数据传递给js变量
        var strings = arrstr.split(",");
        $('input[name="sex"][value="<%=stuInfo.getSex()%>"]').prop('checked', true);
        $('input[name="educ"][value="<%= stuInfo.getEduc() %>"]').prop('selected', true);
        // 使用js的forEach方法
        $.each(strings, function () {
            $('input[type="checkbox"][value="' + this + '"]').prop('checked', true);
        });
    });
</script>
</body>
</html>
```

- 修改用户数据处理页面 `alter.jsp`

```Java
<%@ page import="com.pojo.Student" %>
<%@ page import="com.service.StudentService" %>
<%@ page import="com.service.impl.StudentServiceImpl" %><%--
  修改处理
  获取get请求表单信息

  修改成功，js跳转stu_detail.jsp 本页面
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String alter_acc = request.getParameter("acc");
    String alter_sex = request.getParameter("sex");
    String alter_educ = request.getParameter("educ");
    String[] alter_happy = request.getParameterValues("happy");
    StringBuilder sb = new StringBuilder();
    for (String s : alter_happy) {
        sb.append(s+",");
    }
    Student student = new Student(alter_acc, null, alter_sex, alter_educ, sb.toString().substring(0,sb.lastIndexOf(",")));
    System.out.println(student);
    StudentService service = new StudentServiceImpl();
    Integer alterFlag = service.alterOne(student);
    System.out.println("修改成功，受影响行数：" + alterFlag);
    session.setAttribute("acc",alter_acc);
    out.write("<script>alert('修改成功！');location='stu_detail.jsp';</script>");
%>
```

- 防止用户跳过验证 `check.jsp`

```Java
<%--
    判断用户session，防止跳过登录验证

--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    if (session.getAttribute("login")==null){
        response.sendRedirect("bootstrap_register.jsp");
        return;
    }
%>
```

## 用户登出

```Java
<%--
  用户退出

  删除session
  重定向回bootstrap_register.jsp 登录页面
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
//    session.removeAttribute("login");
    session.invalidate();
    response.sendRedirect("bootstrap_register.jsp");
%>
```

# Servlet

**在src的****`web`****下面创建**

## 传统注册

![image-20211124232100341](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/image-20211124232100341.png)

## 注解注册

![image-20211124232112397](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/image-20211124232112397.png)

**输出**

```Java
PrintWriter out = response.getWriter();
out.println("xxx");
```

**获取session**

```Java
HttpSession session = request.getSession();
```

## 超链接传递数据到servlet

![image-20211124232125745](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/image-20211124232125745.png)

## EL表达式

[JSP 标准标签库（JSTL） | 菜鸟教程 (runoob.com)](https://www.runoob.com/jsp/jsp-jstl.html)

### EL表达式格式化日期

https://cloud.tencent.com/developer/article/1653924

**jar包**

```
jstl-1.22.jar
standard-1.1.2.jar
```

[Maven Repository: javax.servlet » jstl » 1.2 (mvnrepository.com)](https://mvnrepository.com/artifact/javax.servlet/jstl/1.2)

https://mvnrepository.com/artifact/taglibs/standard/1.1.2

<img src="C:\Users\折腾的小飞\AppData\Roaming\Typora\typora-user-images\image-20211124232145600.png" alt="image-20211124232145600" style="zoom:80%;" />

**遍历<c:forEach>**集合

![image-20211124232202999](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/image-20211124232202999.png)

## JS选中表单，显示信息

![image-20211124232214317](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/image-20211124232214317.png)

## 上传图片

```
upload_bill.jar
```

**网站根目录**

![image-20211124232225602](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/image-20211124232225602.png)

- `form`表单

```Java
<form action="/file_upload" method="post" enctype="multipart/form-data" id="submit">
        <li>
            <input type="file" name="file" id="file">
            <input type="hidden" name="hd" id="hd">
        </li>
        <li>
            <img src="" id="img" style="visibility: hidden">
            <span id="size" style="visibility: hidden"></span>
        </li>
        <input type="button" value="图片上传" id="subBtn">
    </form>
```

- `JS`代码

```Java
<script>
    // 文件表单
    var file = document.getElementById('file');
    // 隐藏域
    var hd = document.getElementById("hd");
    // 表单
    var submit = document.getElementById("submit");
    // 图片上传按钮
    var subBtn = document.getElementById("subBtn");

    // img显示要上传的图片
    var img = document.getElementById("img");
    // 文件大小
    var size = document.getElementById("size");
    subBtn.addEventListener("click", function () {
        hd.value = file.value;
        submit.submit();
    });
    file.addEventListener('change', function () {
        img.style.visibility = 'visible';
        var file = this.files[0];
        // 显示图片不能显示本地文件，要先创建一个url
        let url = URL.createObjectURL(file);
        img.src = url;
        size.style.visibility = 'visible';
        size.innerHTML="<h4>大小："+file.size/1024+" KB</h4>";
    });
</script>
```

- `servlet`

  `SmartUpload类`

```Java
@WebServlet(name = "FileServlet", urlPatterns = "/file_upload")
public class FileServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            request.setCharacterEncoding("utf-8");
            SmartUpload smartUpload = new SmartUpload();
            smartUpload.initialize(this.getServletConfig(), request, response);
            // 创建服务器upload目录
            File file = new File(getServletContext().getRealPath("/upload"));
            if (!file.exists()) {
                if (!file.mkdir()) {
                    throw new Exception("目录创建失败");
                }
            }
            smartUpload.upload();
            smartUpload.save("/upload");
            // 原始路径
//            String hdFilePath = smartUpload.getRequest().getParameter("hd");
            // 截取后的路径
//            String[] splitFilePath = hdFilePath.split("\\.");
            // 处理路径
            Date date = new Date();
            String time = date.getTime() + "";
            Random random = new Random();
            int randomNum = random.nextInt(100000000);
//            String editFilePath = time + randomNum + "." + splitFilePath[splitFilePath.length - 1];
            String editFilePath = time + randomNum + "." + smartUpload.getFiles().getFile(0).getFileExt();
            System.out.println(getServletContext().getRealPath("/") + "upload" + editFilePath);
            smartUpload.getFiles().getFile(0).saveAs(getServletContext().getRealPath("/")+"upload/" + editFilePath);

            String eidStr = String.valueOf(request.getSession().getAttribute("eid"));
            Integer eid = Integer.parseInt(eidStr);
            EmployeeService service = new EmployeeServiceImpl();
            Integer imageFlag = service.addUserImage(eid, editFilePath);
            if (imageFlag > 0) {
                System.out.println("添加图像名称成功！");
            }
            response.sendRedirect("/employee/employee_select");

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request, response);
    }
}
```

# 分页

```SQL
-- 每页显示5条数据 size：5
-- index:当前页码
-- linit (index-1)*5,5
select * from employee e inner join department d on e.pid=d.pid
GROUP BY eid
limit 0,5

select * from employee e inner join department d on e.pid=d.pid
GROUP BY eid
limit 5,5
```

![image-20211124232255310](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/image-20211124232255310.png)

```Java
public List<Employee> selectAllEmployee(Integer index, Integer size) throws SQLException {
        String sql = "select * from employee e inner join department d on e.pid=d.pid group by eid limit ?,?";
        Connection conn = JdbcUtils.getConnection();
        PreparedStatement prstmt = conn.prepareStatement(sql);
        Object[] objects = {
                (index - 1) * size,
                size
        };
        for (int i = 0; i < objects.length; i++) {
            prstmt.setObject(i + 1, objects[i]);
        }
        ResultSet resultSet = prstmt.executeQuery();
        List<Employee> employeeList = new ArrayList<>();
        while (resultSet.next()) {
            employeeList.add(new Employee(
                    resultSet.getInt(1),
                    resultSet.getString(2),
                    resultSet.getString(3),
                    resultSet.getDouble(5),
                    resultSet.getString(6),
                    resultSet.getString(7),
                    new Department(resultSet.getInt(9), resultSet.getString(10)),
                    resultSet.getString(8)
            ));
        }
        conn.close();
        return employeeList;
    }
    public Integer selectAllCount() throws SQLException {
        String sql = "select count(*) from employee e inner join department d on e.pid=d.pid";
        ScalarHandler<Long> handler = new ScalarHandler();
        Long count = queryRunner.query(sql, handler);
        return Math.toIntExact(count);
    }
Integer pageIndex = 0; // 当前页码
if (request.getParameter("i") == null) {
            pageIndex = 1;
} else {
            pageIndex = Integer.valueOf(request.getParameter("i"));
}
        
List<Employee> employeeList = service.selectAllEmployee(pageIndex, PAGESIZE);
// 获取学生总人数
Integer count = service.selectAllCount();

// 计算总页数
Integer pages = (count / PAGESIZE == 0) ? count / PAGESIZE : count / PAGESIZE + 1;

session.setAttribute("pages", pages); // 总页数
session.setAttribute("i", pageIndex); // 当前页码
<div class="bottom">
    <span>${sessionScope.i}/${sessionScope.pages}</span>
    <a href="/employee/employee_select?i=1">首页</a>
    <c:if test="${sessionScope.i != 1}">
        <a href="/employee/employee_select?i=${sessionScope.i-1}">上一页</a>
    </c:if>
    <c:if test="${sessionScope.i != sessionScope.pages}">
        <a href="/employee/employee_select?i=${sessionScope.i+1}">下一页</a>
    </c:if>
    <a href="/employee/employee_select?i=${sessionScope.pages}">末页</a>
</div>
//计算总人数
    public Integer getRows() {
        Integer rows = 0;
        try {
            rows = (pid == null || pid.equals("")) ? service.selectAllCount() : service.selectConditionAllCount(pid);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return rows;
    }

    //计算总页数
    public Integer getPages() {
        Integer pages = 0;
        Integer rows = getRows();
        pages = (rows % size == 0) ? rows / size : rows / size + 1;
        return pages;
    }
```

# 过滤器

```java
<!-- 登录验证过滤器传统配置-->
    <filter>
        <filter-name>checkLoginFilter</filter-name>
        <filter-class>com.filter.checkLoginFilter</filter-class>
    </filter>
    <filter-mapping>
        <filter-name>checkLoginFilter</filter-name>
        <url-pattern>/*</url-pattern>
    </filter-mapping>
package com.filter;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/*
    防止用户直接输入地址，跳过登录。
    通过session设置login标识，存储用户名，此session只会在登录后设置。
*/
//@WebFilter(filterName = "checkLoginFilter", urlPatterns = {"/*"})
public class checkLoginFilter implements Filter {
    public void destroy() {
    }

    public void doFilter(ServletRequest req, ServletResponse resp, FilterChain chain) throws ServletException, IOException {
        req.setCharacterEncoding("utf8"); // 设置编码
        HttpServletRequest request = (HttpServletRequest) req;
        HttpServletResponse response = (HttpServletResponse) resp;
        // 获取请求的uri地址
        String requestURI = request.getRequestURI();
        // 请求登录页面
        if (requestURI.contains("login.jsp")) {
            // 判断cookie是否存在，免登陆
            if (request.getCookies() == null) {
//                request.getRequestDispatcher("login.jsp").forward(req, resp);
                response.sendRedirect("login.jsp");
                return;
            }
            Cookie[] cookies = request.getCookies();
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("cookie_login")) {
                    response.sendRedirect("stu_list.jsp");
//                    request.getRequestDispatcher("stu_list.jsp").forward(req, resp);
                    return;
                }
            }
        }
        // 判断 请求 登录页面，登录表单提交，登录后的session不为空，允许
        if (requestURI.contains("login.jsp") || requestURI.contains("loginSvl") || request.getSession().getAttribute("login") != null) {
            chain.doFilter(req, resp);
            return;
        }
        response.sendRedirect("login.jsp");

    }

    public void init(FilterConfig config) throws ServletException {

    }

}
```