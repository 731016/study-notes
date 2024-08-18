# 驱动

`DriverManager`：管理一些系列数据库的驱动程序

# 核心对象

`Connection`：实现数据库与应用程序之间的联通 `Statement`：执行SQL命令，写（增删改），读（查） `ResultSet`：接收查询返回的结果

# Jar包

**下载地址**

我的数据库是`8.0`，我下载的jar包`mysql-connector-java-8.0.21.jar` 

## 创建项目

<img src="C:\Users\折腾的小飞\AppData\Roaming\Typora\typora-user-images\image-20211124232407819.png" alt="image-20211124232407819" style="zoom:80%;" />

## 添加目录，更改为源目录

<img src="C:\Users\折腾的小飞\AppData\Roaming\Typora\typora-user-images\image-20211124232421304.png" alt="image-20211124232421304" style="zoom:80%;" />

## 加入jar包

复制jar包到创建好的源目录

![image-20211124232434718](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/image-20211124232434718.png)



# JDBC连接数据库

**版本**

![image-20211124232447130](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/image-20211124232447130.png)

```sql
public static void main(String[] args) throws Exception {
        String url = "jdbc:mysql://localhost:3306/j0705?characterEncoding=utf8&useSSL=false&serverTimezone=UTC";
        String user = "root";
        String password = "root";
        String sql = "insert into employee values(default,'折腾的小飞','男',100,8900);";
        // 加载驱动，反射核心类的forName方法
        Class.forName("com.mysql.cj.jdbc.Driver");
        // 建立连接
        Connection con = DriverManager.getConnection(url, user, password);
        // 执行SQL
        Statement stmt = con.createStatement();
        // stmt.executeQuery() 查
        int n = stmt.executeUpdate(sql); // 增删改
        System.out.println("所受影响的行数：" + n);

        // 处理执行结果
    }
```

- 无条件查询，返回结果

```sql
public static void main(String[] args) throws ClassNotFoundException, SQLException {
        String url = "jdbc:mysql://localhost:3306/j0705?characterEncoding=utf8&useSSL=false&serverTimezone=UTC";
        String user = "root";
        String password = "root";
        String selectSql = "select * from employee;";
        // 加载驱动，反射核心类的forName方法
        Class.forName("com.mysql.cj.jdbc.Driver");
        // 建立连接
        Connection con = DriverManager.getConnection(url, user, password);
        // 执行SQL
        Statement stmt = con.createStatement();
        ResultSet resultSet = stmt.executeQuery(selectSql);
        StringBuffer sb = new StringBuffer("");
        while (resultSet.next()) {
            sb.append(resultSet.getInt("enumber")).append("\t");
            sb.append(resultSet.getString("ename")).append("\t");
            sb.append(resultSet.getString("sex")).append("\t");
            sb.append(resultSet.getInt("pnumber")).append("\t");
            sb.append(resultSet.getString("salary"));
            sb.append("\r\n");
        }
        System.out.println(sb.toString());
    }
```

![image-20211124232459237](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/image-20211124232459237.png)

- 条件查询，返回结果

```java
static String url = "jdbc:mysql://localhost:3306/demo?characterEncoding=utf8&useSSL=false&serverTimezone=UTC";
    static String user = "root";
    static String password = "123456";
    static String driver = "com.mysql.jdbc.Driver";

    public static void main(String[] args) throws Exception {
        Class.forName("com.mysql.jdbc.Driver");
        Connection con = DriverManager.getConnection(url, user, password);
        String sql = "select * from Product where id=?";
        Object[] parms = {1};
        PreparedStatement ps = con.prepareStatement(sql);
        for (int i = 0; i < parms.length; i++) {
            ps.setObject(i + 1, parms[i]);
        }
        ResultSet resultSet = ps.executeQuery();
        int id = -1;
        String ProductName = "";
        int Inventory = 0;
        Map<Integer, String> map = new HashMap<>();
        if (resultSet.next()) {
            id = resultSet.getInt("id");
            ProductName = resultSet.getString("ProductName");
            Inventory = resultSet.getInt("Inventory");
            map.put(id, ProductName + "," + Inventory);
        }
        for (Integer key : map.keySet()) {
            System.out.println("商品名称："+map.get(key).split(",")[0]);
            System.out.println("库存数量："+map.get(key).split(",")[1]);
        }
    }
```

![image-20211124232511713](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/image-20211124232511713.png)

- 简单的登陆验证

```sql
public static void main(String[] args) throws ClassNotFoundException, SQLException {
        Class.forName("com.mysql.cj.jdbc.Driver");
        String url = "jdbc:mysql://localhost:3306/j0705?characterEncoding=utf8&useSSL=false&serverTimezone=UTC";
        String user = "root";
        String password = "root";
        Connection con = DriverManager.getConnection(url, user, password);
        Statement statement = con.createStatement();

        System.out.println("等待输入用户名：");
        Scanner scanner = new Scanner(System.in);
        String inUser = scanner.nextLine();
        System.out.println("请输入密码：");
        String inPassword = scanner.nextLine();

        String selectSqlUser = "select `password` from users where `user` = '" + inUser + "';";
        ResultSet resultSet = statement.executeQuery(selectSqlUser);
        String pwd = "";
        while (resultSet.next()) {
            pwd = resultSet.getString("password");
        }
        if (inPassword.equals(pwd)) {
            System.out.println("登陆成功！！！");
        } else {
            System.out.println("密码不正确！");
        }
    }
```

![image-20211124232641272](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/image-20211124232641272.png)

## 创建JDBCUtils工具类

```java
package com.mysqljdbc.Utils;

import com.mysqljdbc.pojo.OutParameter;

import java.sql.*;
import java.util.List;

/**
 * @author 涂鏊飞tu_aofei@163.com
 * @description: TODO 类描述
 * @create 2021-08-30 9:21
 */
public class JDBCUtils {
    static String url = "jdbc:mysql://localhost:3306/demo?characterEncoding=utf8&useSSL=false&serverTimezone=UTC";
    static String user = "root";
    static String password = "123456";
    static String driver = "com.mysql.jdbc.Driver";

    public static ResultSet query(String sql, Object[] params) throws Exception {
        ResultSet rs = null;
        Class.forName(driver);
        Connection con = DriverManager.getConnection(url, user, password);
        PreparedStatement ps = con.prepareStatement(sql);
        if (params != null) {
            for (int i = 0; i < params.length; i++) {
                ps.setObject(i + 1, params[i]);
            }
        }
        rs = ps.executeQuery();
        return rs;
    }

    public static int update(String sql, Object[] params) throws Exception {
        int r = -1;
        Class.forName(driver);
        Connection con = DriverManager.getConnection(url, user, password);
        PreparedStatement ps = con.prepareStatement(sql);
        if (params != null) {
            for (int i = 0; i < params.length; i++) {
                ps.setObject(i + 1, params[i]);
            }
        }
        r = ps.executeUpdate();
        return r;
    }
    // 存储过程,输入参数
    public static ResultSet procQuery(String sql, Object[] params) throws Exception {
        ResultSet rs = null;
        Class.forName(driver);
        Connection con = DriverManager.getConnection(url, user, password);
        CallableStatement callstmt = con.prepareCall(sql);
        if (params!=null){
            for (int i = 0; i < params.length; i++) {
                callstmt.setObject(i + 1, params[i]);
            }
        }
        ResultSet r = callstmt.executeQuery();
        return r;
    }
    //存储过程，非查询，输入参数
    public static int procUpdate(String sql, Object[] params) throws Exception {
        ResultSet rs = null;
        Class.forName(driver);
        Connection con = DriverManager.getConnection(url, user, password);
        CallableStatement callstmt = con.prepareCall(sql);
        if (params!=null){
            for (int i = 0; i < params.length; i++) {
                callstmt.setObject(i + 1, params[i]);
            }
        }
        int r = callstmt.executeUpdate();
        return r;
    }

    public static void parameterProc(String sql, Object[] inparams, List<OutParameter> outparams) throws Exception{
        Class.forName(driver);
        Connection con=DriverManager.getConnection(url,user,password);
        CallableStatement callstmt=con.prepareCall(sql);
        if (inparams!=null){
            for (int i = 0; i < inparams.length; i++) {
                callstmt.setObject(i+1,inparams[i]);
            }
        }
        if (outparams!=null){
            for (OutParameter outparam : outparams) {
                callstmt.registerOutParameter(outparam.getpName(),outparam.getpType());
            }
        }
        callstmt.executeUpdate();

        for (OutParameter outparam : outparams) {
            outparam.setpValue(callstmt.getObject(outparam.getpName()));
        }
    }
}
```

- 执行查询

```java
package com.mysqljdbc.test;

import com.mysqljdbc.Utils.JDBCUtils;
import java.sql.ResultSet;
import java.util.Scanner;

/**
 * @author 涂鏊飞tu_aofei@163.com
 * @description: 查询
 * @create 2021-08-30 9:33
 */
public class Test1 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("请输入用户名：");
        String user = sc.nextLine();
        System.out.println("请输入密码：");
        String pwd = sc.nextLine();
        String selectSql = "select * from user where `user`=? and password=?";
        Object[] pars = {user, pwd};
        StringBuffer sbf = new StringBuffer();
        try {
            ResultSet query = JDBCUtils.query(selectSql, pars);
            while (query.next()) {
                sbf.append(query.getInt("id")).append("\t");
                sbf.append(query.getString("user")).append("\t");
                sbf.append(query.getString("password"));
                sbf.append("\r\n");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        System.out.println(sbf);
    }
}
```

![image-20211124232539764](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/image-20211124232539764.png)

- 执行插入数据

```java
package com.mysqljdbc.test;

import com.mysqljdbc.Utils.JDBCUtils;

import java.util.Scanner;

/**
 * @author 涂鏊飞tu_aofei@163.com
 * @description: 插入 类描述
 * @create 2021-08-30 9:45
 */
public class Test2 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String updatesql = "";
        System.out.println("请输入要注册的用户名：");
        String user = sc.nextLine();
        System.out.println("请输入密码：");
        String pwd1 = sc.nextLine();
        System.out.println("请再次输入密码：");
        String pwd2 = sc.nextLine();
        Object[] pars = {user, pwd1};
        if (pwd1.equals(pwd2)) {
            updatesql = "insert into user values(default,?,?)";
            try {
                int i = JDBCUtils.update(updatesql, pars);
                if (i != 0) {
                    System.out.println("修改成功," + i + "条数据已修改！");
                } else {
                    System.out.println("修改失败");
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}
```

![image-20211124232550928](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/image-2021112423255092822.png)

- 防止SQL注入,验证用户登录

```java
package com.mysqljdbc.test;

import com.mysqljdbc.Utils.JDBCUtils;

import java.sql.*;
import java.util.Scanner;

/**
 * @author 涂鏊飞tu_aofei@163.com
 * @description: 登录验证 类描述
 * @create 2021-08-30 10:48
 */
public class Test4 {
    static String url = "jdbc:mysql://localhost:3306/demo?characterEncoding=utf8&useSSL=false&serverTimezone=UTC";
    static String users = "root";
    static String password = "123456";
    static String driver = "com.mysql.jdbc.Driver";
    public static void main(String[] args) throws Exception {
        Scanner sc = new Scanner(System.in);
        System.out.println("请输入用户名：");
        String user = sc.nextLine();
        System.out.println("请输入密码：");
        String pwd = sc.nextLine();
        String sql = "select * from user where `user`= ? and `password`= ?";
//        String sql = "select * from user where `user`='" + user + "' and `password`= '" + pwd + "'";
//        String sql = "select * from user where `user`='admin' or 1=1 # and `password`= '" + pwd + "'";
        //注册 参数
        Object[] params = {user, pwd};

        Class.forName(driver);
        Connection con=DriverManager.getConnection(url, users,password);
        Statement stmt=con.createStatement();
        ResultSet rs = stmt.executeQuery(sql);
        if (rs.next()) {
            System.out.println("登录成功");
        } else {
            System.out.println("登录失败");
        }
    }
}
package com.mysqljdbc.test;

import com.mysqljdbc.Utils.JDBCUtils;
import java.sql.*;
import java.util.Scanner;

/**
 * @author 涂鏊飞tu_aofei@163.com
 * @description: 登录验证 类描述
 * @create 2021-08-30 10:48
 */
public class Test4 {
    public static void main(String[] args) throws Exception {
        Scanner sc = new Scanner(System.in);
        System.out.println("请输入用户名：");
        String user = sc.nextLine();
        System.out.println("请输入密码：");
        String pwd = sc.nextLine();
        String sql = "select * from user where `user`= ? and `password`= ?";
        //注册 参数
        Object[] params = {user, pwd};
        ResultSet rs = JDBCUtils.procQuery(sql, params);

        if (rs.next()) {
            System.out.println("登录成功");
        } else {
            System.out.println("登录失败");
        }
    }
}
```

![image-20211124232715310](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/image-20211124232715310.png)

- 带参数的存储过程-输入参数

```sql
CREATE DEFINER=`root`@`localhost` PROCEDURE `JDBCProc`(stu varchar(30))
BEGIN
  select * from student where `name`=stu;
END
package com.mysqljdbc.test;

import com.mysqljdbc.Utils.JDBCUtils;
import java.sql.*;

/**
 * @author 涂鏊飞tu_aofei@163.com
 * @description: 执行带参数的存储过程 类描述
 * @create 2021-08-30 11:35
 */
public class Test5 {
    public static void main(String[] args) throws Exception {
        String procsql = "{call `JDBCProc`(?)}";
        Object[] pars = {"任我行"};
        ResultSet proc = JDBCUtils.procQuery(procsql, pars);
        if (proc.next()){
            System.out.print(proc.getInt("id")+"\t"+proc.getString("name")+"\t"+proc.getString("major"));
        }
    }
}
```

![image-20211124232732870](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/image-20211124232732870.png)

- 带输入输出参数的存储过程，main方法

```sql
CREATE DEFINER=`root`@`localhost` PROCEDURE `intoProc`(
in  sid int,
out `sname` varchar(20),
out `total` int
)
BEGIN
  select stu.`name` into sname from student stu where stu.id=sid;
  select sum(result) into total from score sc where sc.sid=sid
  group by sc.sid;
END
package com.mysqljdbc.test;

import java.lang.reflect.Type;
import java.sql.*;
import java.util.Collection;

/**
 * @author 涂鏊飞tu_aofei@163.com
 * @description: 执行带输入输出参数的存储过程，全在main方法 类描述
 * @create 2021-08-30 13:41
 */
public class Test6 {
    static String url = "jdbc:mysql://localhost:3306/demo?characterEncoding=utf8&useSSL=false&serverTimezone=UTC";
    static String user = "root";
    static String password = "123456";
    static String driver = "com.mysql.jdbc.Driver";

    public static void main(String[] args) throws ClassNotFoundException, SQLException {
        Class.forName(driver);
        Connection con = DriverManager.getConnection(url, user, password);
        int sid = 2;
        String sname = "";
        int total = 0;
        String sql = "{call `intoProc`(?,?,?)}";

        CallableStatement callstmt = con.prepareCall(sql);
        callstmt.setInt(1, sid);
        callstmt.registerOutParameter("sname", Types.VARCHAR);
        callstmt.registerOutParameter("total", Types.INTEGER);

        callstmt.executeUpdate();

        sname = callstmt.getString("sname");
        total = callstmt.getInt("total");
        System.out.println("姓名：" + sname + "\t" + "总分：" + total);
    }
}
```

![image-20211124232753865](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/image-20211124232753865.png)

- 带输入输出参数的存储过程，工具类

```sql
package com.mysqljdbc.pojo;

/**
 * @author 涂鏊飞tu_aofei@163.com
 * @description: MySQL实体类 类描述
 * @create 2021-08-30 15:13
 */
public class OutParameter {
    private String pName;
    private int pType;
    private Object pValue; //返回值

    public OutParameter() {
    }

    public OutParameter(String pName, int pType, Object pValue) {
        this.pName = pName;
        this.pType = pType;
        this.pValue = pValue;
    }

    public String getpName() {
        return pName;
    }

    public void setpName(String pName) {
        this.pName = pName;
    }

    public int getpType() {
        return pType;
    }

    public void setpType(int pType) {
        this.pType = pType;
    }

    public Object getpValue() {
        return pValue;
    }

    public void setpValue(Object pValue) {
        this.pValue = pValue;
    }
}
package com.mysqljdbc.test;

import com.mysqljdbc.Utils.JDBCUtils;
import com.mysqljdbc.pojo.OutParameter;

import java.sql.Types;
import java.util.ArrayList;
import java.util.List;

/**
 * @author 涂鏊飞tu_aofei@163.com
 * @description: 执行带输入输出参数的存储过程，封装在工具类中 类描述
 * @create 2021-08-30 15:03
 */
public class Test7 {
    public static void main(String[] args) throws Exception {
       String sql="{call `intoProc`(?,?,?)}";
       Object[] inparms={2};
        List<OutParameter> list=new ArrayList<>();
        list.add(new OutParameter("sname", Types.VARCHAR,null));
        list.add(new OutParameter("total", Types.INTEGER,null));

        JDBCUtils.parameterProc(sql,inparms,list);

        System.out.println(list.get(0).getpValue());
        System.out.println(list.get(1).getpValue());
    }
}
```

![](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/image-20211124232753865.png)

- 聚合查询（单行记录）

```java
static String url = "jdbc:mysql://localhost:3306/demo?characterEncoding=utf8&useSSL=false&serverTimezone=UTC";
static String user = "root";
static String password = "123456";
static String driver = "com.mysql.jdbc.Driver";
// 执行聚合查询（单行记录）
    public static List<Object> scalar(String sql,Object[] params) throws Exception{
        Class.forName(driver);
        Connection con=DriverManager.getConnection(url,user,password);
        PreparedStatement ps=con.prepareStatement(sql);
        if (params!=null){
            for (int i = 0; i < params.length; i++) {
                ps.setObject(i+1,params[i]);
            }
        }
        ResultSet rs = ps.executeQuery();
        List<Object> list=new ArrayList<>();
        if (rs.next()){
            int columnCount = rs.getMetaData().getColumnCount();
            for (int i = 0; i < columnCount; i++) {
                list.add(rs.getObject(i+1));
            }
        }
        return list;
    }
package com.mysqljdbc.test;

import com.mysqljdbc.Utils.JDBCUtils;
import java.util.ArrayList;
import java.util.List;

/**
 * @author 涂鏊飞tu_aofei@163.com
 * @description: TODO 类描述
 * @create 2021-08-30 16:45
 */
public class Test8 {
    public static void main(String[] args) {
        String sql="select min(result),max(result),avg(result) from score where course=?";
        Object[] prams={"HTML"};
        try {
            List<Object> list=JDBCUtils.scalar(sql,prams);
            System.out.println("最低分："+list.get(0));
            System.out.println("最高分："+list.get(1));
            System.out.println("平均分："+list.get(2));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

![image-20211124232820087](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/image-20211124232820087.png)

## 数据库连接池

### 配置文件properties

```.properties
driverClassName=com.mysql.jdbc.Driver
url=jdbc:mysql://localhost:3306/demo?characterEncoding=utf8&useSSL=false&serverTimezone=UTC
username=root
password=123456
```

`druid-1.1.10`**数据库连接池**

**Jar包下载地址**

[Maven Repository: com.alibaba » druid » 1.1.10 (mvnrepository.com)](https://mvnrepository.com/artifact/com.alibaba/druid/1.1.10)

**GitHub源码**

[GitHub - alibaba/druid: 阿里云计算平台DataWorks(https://help.aliyun.com/document_detail/137663.html) 团队出品，为监控而生的数据库连接池](https://github.com/alibaba/druid)

```java
package com.mysqljdbc.Utils;

import com.alibaba.druid.pool.DruidDataSourceFactory;

import javax.sql.DataSource;
import java.util.Properties;

public class DruidUtils {
    private static DataSource ds;
    static {
        try {
            Properties pro = new Properties();
            pro.load(JDBCUtils.class.getClassLoader().getResourceAsStream("db.properties"));
            ds = DruidDataSourceFactory.createDataSource(pro);
        }
        catch (Exception ex){
            ds = null;
        }
    }
    public static DataSource getDataSource(){
        return ds;
    }
}
public static void main(String[] args) throws SQLException, ClassNotFoundException {
        DataSource ds= DruidUtils.getDataSource();
        Connection con=ds.getConnection();
        String sql = "select * from student where major=?";
        Object[] parms={"计算机应用"};
        PreparedStatement ps=con.prepareStatement(sql);
        ps.setObject(1,parms[0]);
        ResultSet resultSet = ps.executeQuery();
        while (resultSet.next()){
            System.out.println(resultSet.getString("name"));;
        }
    }
```

![image-20211124232834089](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/image-20211124232834089.png)

## 使用QueryRunner处理返回数据

```
commons-dbutils-1.6.jar
```

https://raw.githubusercontent.com/731016/imgSave/master/note_img202110281819062.png

使用数据库连接池和QueryRunner处理，带参数的查询

返回的每一行结果，使用对象存储，放到List集合

```java
public static void main(String[] args) throws Exception {
        DataSource ds= DruidUtils.getDataSource();
        QueryRunner runner = new QueryRunner(ds);
        BeanListHandler<Student> handler = new BeanListHandler(Student.class);

        String sql = "select * from student where major=?";
        Object[] parms={"计算机应用"};
        List<Student> studentList = runner.query(sql, handler,parms);

        for (Student student : studentList) {
            System.out.println(student);
        }
    }
```

![image-20211124232845874](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/image-20211124232845874.png)

- 带单个聚合函数的查询

```java
public interface EmployeeService {
    //   (8)根据部门名称，查询该部门员工的平均工资：public int getAvgSalary(String dName);
    public int getAvgSalary(String dName);
}
public int getAvgSalary(String dName) {
        try {
            QueryRunner runner = new QueryRunner(ds);

            ScalarHandler<Double> handler = new ScalarHandler();
            String conditionQuery = "select avg(salary) from employee e inner join department d on e.pid=d.pid where d.pname=?";
            Object[] params = new Object[]{
                    dName
            };
            Double aDouble = runner.query(conditionQuery, handler, params);
            return (int) Math.round(aDouble);
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        return 0;
    }
    public static void main(String[] args) {
        try {
            EmployeeServiceImpl employeeService = new EmployeeServiceImpl();
            System.out.println("平均工资：" + employeeService.getAvgSalary("研发部"));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
```

![image-20211124232901994](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/image-20211124232901994.png)

### QueryRunner

- queryRunner和Test测试类处理返回结果

```java
package com.j0705.utils;

import com.alibaba.druid.pool.DruidDataSourceFactory;
import org.apache.commons.dbutils.QueryRunner;

import javax.sql.DataSource;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

public class JDBCUtils {
    private static DataSource ds;

    static {
        try {
            //1.加载配置文件
            Properties pro = new Properties();
            pro.load(JDBCUtils.class.getClassLoader().getResourceAsStream("db.properties"));
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

    public static CallableStatement getStatement(String sql) throws Exception{
        CallableStatement call = getConnection().prepareCall(sql);
        return call;
    }
    /**
     * 执行查询 SQL语句
     */
    public static ResultSet query(String sql, Object[] params) throws Exception{
        ResultSet rs = null;
        Connection con = getConnection();
        PreparedStatement ps = con.prepareStatement(sql);

        //如果sql含有？，则需要在命令对象中注册对应的参数
        if (params != null){
            for (int i = 0; i < params.length; i++) {
                ps.setObject(i+1,params[i]);
            }
        }
        rs = ps.executeQuery();
        return  rs;
    }

    /**
     * 执行增删改SQL语句
     */
    public static int update(String sql,Object[] params) throws Exception{
        int r = -1;
        Connection con = getConnection();
        PreparedStatement ps = con.prepareStatement(sql);

        //如果sql含有？，则需要在命令对象中注册对应的参数
        if (params != null){
            for (int i = 0; i < params.length; i++) {
                ps.setObject(i+1,params[i]);
            }
        }
        r = ps.executeUpdate();
        return  r;
    }

    /**
     * 执行聚合查询（单行记录）
     */
    public static List<Object> scalar(String sql, Object[] params) throws Exception{
        List<Object> objects = new ArrayList<>();
        Connection con = getConnection();
        PreparedStatement ps = con.prepareStatement(sql);
        //如果sql含有？，则需要在命令对象中注册对应的参数
        if (params != null){
            for (int i = 0; i < params.length; i++) {
                ps.setObject(i+1,params[i]);
            }
        }
        ResultSet rs = ps.executeQuery();
        if (rs.next()){
            // 获取记录的总列数：
            int cols = rs.getMetaData().getColumnCount();
            for (int i=0; i<cols; i++){
                objects.add(rs.getObject(i+1));
            }
        }
        return  objects;
    }
}
package com.j0705.ui;

import com.j0705.pojo.Student;
import com.j0705.utils.JDBCUtils;
import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.ArrayHandler;
import org.apache.commons.dbutils.handlers.BeanHandler;
import org.apache.commons.dbutils.handlers.BeanListHandler;
import org.apache.commons.dbutils.handlers.ScalarHandler;
import org.junit.Test;

import java.sql.CallableStatement;
import java.sql.Types;
import java.util.List;

public class TestOne {


    private QueryRunner qr;

    public TestOne(){
        qr = JDBCUtils.getQueryRunner();
    }

    @Test
    public void test01() throws Exception{
        // 精确查询，返回一行记录
        String sql = "select * from student where sid = ? ";
        BeanHandler<Student> handler = new BeanHandler<>(Student.class);
        Object[] params = {20};
        Student std = qr.query(sql,handler,params);
        System.out.println("学号：" + std.getSid());
        System.out.println("姓名：" + std.getSname());
        System.out.println("专业：" + std.getMajor());
    }

    @Test
    public void test03() throws Exception{
        // 聚合查询(1个字段)
        String sql = "select count(*) from student";
        ScalarHandler<Long> handler = new ScalarHandler<>();
        Long count = qr.query(sql,handler);
        System.out.println("总人数：" + count);
    }

    @Test
    public void test02() throws Exception{
        // 聚合查询(多个字段)
        String sql = "select max(result) max,avg(result) avg from score where course='java'";
        ArrayHandler handler = new ArrayHandler();
        Object[] arr =  qr.query(sql,handler);
        System.out.println("最高分：" + arr[0]);
        System.out.println("平均分：" + arr[1]);
    }

    @Test
    public void test04() throws Exception{
        String sql = "{ call pro_output(?,?,?) }";
        int sid = 7;
        CallableStatement call=JDBCUtils.getStatement(sql);
        call.registerOutParameter("sname", Types.VARCHAR);
        call.registerOutParameter("total",Types.INTEGER);
        call.setObject(1,sid);
        call.executeUpdate();
        System.out.println(call.getObject(3));
    }

    @Test
    public void test05() throws  Exception{
        String sql = "{ call pro_student_major(?)}";
        Object[] arr = {"土木工程"};
        BeanListHandler<Student> handler = new BeanListHandler<>(Student.class);
        List<Student> students = qr.query(sql,handler,arr);

        for (Student ss : students) {
            System.out.println(ss.getSname() + "  " + ss.getMajor());
        }
    }
}
```

# 三层架构

![image-20211124232937611](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/image-20211124232937611.png)

> `pojo`.实体类 -类 `utils`.JDBCutils -类 `dao`(database access object) -**接口** impl.实体类Impl -**实现类** `service`.实体类Service -**接口** impl.实体类Impl -**实现类** `ui`.Test -测试类

## 结构

![image-20211124232925772](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/image-20211124232925772.png)

- pojo

```java
package com.framework.pojo;

import java.util.Date;

/**
 * @author 涂鏊飞tu_aofei@163.com
 * @description: 数据库映射类 类描述
 * @create 2021-09-01 10:49
 */
public class Student {
    private Integer id;
    private String name;
    private String gender;
    private Date birthday;
    private String major;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public Date getBirthday() {
        return birthday;
    }

    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }

    public String getMajor() {
        return major;
    }

    public void setMajor(String major) {
        this.major = major;
    }

    public Student() {
    }

    public Student(Integer id, String name, String gender, Date birthday, String major) {
        this.id = id;
        this.name = name;
        this.gender = gender;
        this.birthday = birthday;
        this.major = major;
    }
}
```

- dao

```java
package com.framework.dao;

import com.framework.pojo.Student;

import java.sql.SQLException;

public interface StudentDao {
    public int add(Student student) throws Exception;
}
```

- impl

```java
package com.framework.dao.impl;

import com.framework.dao.StudentDao;
import com.framework.pojo.Student;
import com.framework.utils.JDBCUtils;
import org.apache.commons.dbutils.QueryRunner;

import javax.sql.DataSource;
import java.sql.SQLException;

/**
 * @author 涂鏊飞tu_aofei@163.com
 * @description: 数据访问层实现类 类描述
 * @create 2021-09-01 11:03
 */
public class StudentDaoImpl implements StudentDao {
    @Override
    public int add(Student student) throws Exception {
        String addSql = "insert into student values(default,?,?,?,?)";
        Object[] params={
                student.getName(),
                student.getGender(),
                student.getBirthday(),
                student.getMajor()
        };
        int updatelines = JDBCUtils.update(addSql, params);
        return updatelines;
    }
}
```

- sercice

```java
package com.framework.service;

import com.framework.pojo.Student;

import java.sql.SQLException;

/**
 * @author 涂鏊飞tu_aofei@163.com
 * @description: 业务逻辑层接口 类描述
 * @create 2021-09-01 11:17
 */
public interface StudentService {
    public int add(Student student) throws Exception;
}
```

- impl

```java
package com.framework.service.impl;

import com.framework.dao.StudentDao;
import com.framework.dao.impl.StudentDaoImpl;
import com.framework.pojo.Student;
import com.framework.service.StudentService;

import java.sql.SQLException;

/**
 * @author 涂鏊飞tu_aofei@163.com
 * @description: 业务逻辑层实现类 类描述
 * @create 2021-09-01 11:18
 */
public class StudentServiceImpl implements StudentService {
    private StudentDao dao;

    public StudentServiceImpl() {
        dao = new StudentDaoImpl();
    }

    @Override
    public int add(Student student) throws Exception {
        int addlines = dao.add(student);
        return addlines;
    }
}
```

- utils

```java
package com.framework.utils;

import com.alibaba.druid.pool.DruidDataSourceFactory;
import com.framework.pojo.Student;

import javax.sql.DataSource;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

/**
 * @author 涂鏊飞tu_aofei@163.com
 * @description: 数据库工具类 类描述
 * @create 2021-09-01 10:51
 */
public class JDBCUtils {
    static DataSource ds;
    static {
        try {
            Properties pro = new Properties();
            pro.load(JDBCUtils.class.getClassLoader().getResourceAsStream("db.properties"));
            ds = DruidDataSourceFactory.createDataSource(pro);
        } catch (Exception e) {
            ds = null;
        }
    }

    public static Connection getConnection() {
        Connection con;
        try {
            con = ds.getConnection();
        } catch (Exception e) {
            con = null;
        }
        return con;
    }

    public static ResultSet query(String sql, Object[] params) throws Exception {
        ResultSet rs = null;
        Connection con = JDBCUtils.getConnection();
        PreparedStatement ps = con.prepareStatement(sql);
        if (params != null) {
            for (int i = 0; i < params.length; i++) {
                ps.setObject(i + 1, params[i]);
            }
        }
        rs = ps.executeQuery();
        return rs;
    }

    public static int update(String sql, Object[] params) throws Exception {
        int r = -1;
        Connection con = JDBCUtils.getConnection();
        PreparedStatement ps = con.prepareStatement(sql);
        if (params != null) {
            for (int i = 0; i < params.length; i++) {
                ps.setObject(i + 1, params[i]);
            }
        }
        r = ps.executeUpdate();
        return r;
    }

    // 执行聚合查询（单行记录）
    public static List<Object> scalar(String sql, Object[] params) throws Exception {
        Connection con = JDBCUtils.getConnection();
        PreparedStatement ps = con.prepareStatement(sql);
        if (params != null) {
            for (int i = 0; i < params.length; i++) {
                ps.setObject(i + 1, params[i]);
            }
        }
        ResultSet rs = ps.executeQuery();
        List<Object> list = new ArrayList<>();
        if (rs.next()) {
            int columnCount = rs.getMetaData().getColumnCount();
            for (int i = 0; i < columnCount; i++) {
                list.add(rs.getObject(i + 1));
            }
        }
        return list;
    }

    // 存储过程,输入参数
    public static ResultSet procQuery(String sql, Object[] params) throws Exception {
        ResultSet rs = null;
        Connection con = JDBCUtils.getConnection();
        CallableStatement callstmt = con.prepareCall(sql);
        if (params != null) {
            for (int i = 0; i < params.length; i++) {
                callstmt.setObject(i + 1, params[i]);
            }
        }
        ResultSet r = callstmt.executeQuery();
        return r;
    }

    //存储过程，非查询，输入参数
    public static int procUpdate(String sql, Object[] params) throws Exception {
        ResultSet rs = null;
        Connection con = JDBCUtils.getConnection();
        CallableStatement callstmt = con.prepareCall(sql);
        if (params != null) {
            for (int i = 0; i < params.length; i++) {
                callstmt.setObject(i + 1, params[i]);
            }
        }
        int r = callstmt.executeUpdate();
        return r;
    }

}
```

- ui

```java
package com.framework.ui;


import com.framework.pojo.Student;
import com.framework.service.StudentService;
import com.framework.service.impl.StudentServiceImpl;

import java.util.Date;

/**
 * @author 涂鏊飞tu_aofei@163.com
 * @description: 测试类 类描述
 * @create 2021-09-01 11:18
 */
public class Test1 {
    public static void main(String[] args) {
        try {
            Date birth = new Date();
            Student stu = new Student(null, "大过户", "男", birth, "会计学");

            StudentService service = new StudentServiceImpl();

            int add = service.add(stu);
            System.out.println("修改行数：" + add);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

## 允许接收键盘输入

```text
1.IDEA进入help->Edit Custom VM Options

2.添加一行：-Deditable.java.test.console=true

3.重启IDEA

重启步骤：

1）点击File–>Invalidate Caches进入重启窗口
2）选择重启方式，四个按钮，一共三种重启方式：
　　① Invalidate and Restart 清空缓存并重启。
　　② Invalidate 清除缓存，下次打开重启。
　　③ Cancel 取消。
　　④ Just Restart 重启。
```