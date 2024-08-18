# Spring IoC



被动实例化-控制反转（IoC）

## bean.properties

```properties
StudentDao=com.dao.impl.StudentDaoImpl
StudentService=com.service.impl.StudentServiceImpl
```

## SpringFactory.java

```Java
public class SpringFactory {
    private static Properties props;
    private static Map<String,Object> beansMap;
    static {
        try {
            props = new Properties();
            InputStream is = SpringFactory.class.getClassLoader().getResourceAsStream("bean.properties");
            props.load(is);

            beansMap = new HashMap<String, Object>();

            Enumeration<Object> keys = props.keys();

            while (keys.hasMoreElements()){
                String key = keys.nextElement().toString();
                String beanPath = props.getProperty(key);
                Object beanObj = Class.forName(beanPath).getDeclaredConstructor().newInstance();
                beansMap.put(key,beanObj);
            }

        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        } catch (InstantiationException e) {
            e.printStackTrace();
        } catch (NoSuchMethodException e) {
            e.printStackTrace();
        } catch (InvocationTargetException e) {
            e.printStackTrace();
        }
    }
    public static Object getBean(String className){
        return beansMap.get(className);
    }
}
private StudentDao studentDao;

    public StudentServiceImpl() {
        studentDao = (StudentDao) SpringFactory.getBean("StudentDao");
    }
    
private StudentService studentService;

    public Demo() {
        studentService = (StudentService) SpringFactory.getBean("StudentService");
    }
```

## 依赖

```XML
<dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-context</artifactId>
            <version>5.3.9</version>
</dependency>
```

## xml配置文件

```XML
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/context
        http://www.springframework.org/schema/context/spring-context.xsd">
        
    <bean id="studentDao" class="com.dao.impl.StudentDaoImpl"/>
    <bean id="studentService" class="com.service.impl.StudentServiceImpl"/>
</beans>
```

```java
//        ClassPathXmlApplicationContext 根据classpath
//        FileSystemXmlApplicationContext 根据文件
//        AnnotationConfigApplicationContext 根据注册
        ApplicationContext atc = new ClassPathXmlApplicationContext("bean.xml");
        StudentDao studentDao = atc.getBean("studentDao", StudentDao.class);
        StudentService studentService =atc.getBean("studentService",StudentService.class);

        studentDao.add();
        studentService.add();
```

## 范围&生命周期

```xml-dtd
scope="singleton单例(同一个对象) | prototype多例" init-method="init(初始化方法)" destroy-method="destory(销毁方法 创建此bean对象的工厂销毁时执行)"
```

## Bean注入

https://cloud.tencent.com/developer/article/1889640

```xml-dtd
<bean id="student" class="com.pojo.Student">
<!-- 构造 -->
    <constructor-arg name="sid" value="007" />
    <constructor-arg name="sname" value="张三" />
    <constructor-arg name="sex" value="男"/>
    <constructor-arg name="nation" value="五道口"/>
<!-- set -->
    <property name="sname" value="法外狂徒"/>
    <property name="sex" value="女"/>
    <property name="nation" value="五道口职业技术学院" ref="引用另一个bean"/>
</bean>
```

## 依赖注入

Spring通过DI（依赖注入）实现IOC（控制反转），常用的注入方式主要有三种：**构造方法注入**，**setter注入**，基于**注解的注入**。

```java
@Resource  根据名称注入
@Autowired 自动装配 根据类型注入
```



![image-20211124233440712](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/image-20211124233440712.png)

```xml-dtd
<bean id="studentService" class="com.service.impl.StudentServiceImpl" scope="prototype">
        <property name="studentDao" ref="studentDao"/>
</bean>
```

```java
public class StudentServiceImpl implements StudentService {
    private StudentDao studentDao;

//    public StudentServiceImpl() {
//        studentDao = (StudentDao) SpringFactory.getBean("studentDao");
//    }

    /**
     * 需要set方法实现dao注入service
     * @param studentDao
     */
    public void setStudentDao(StudentDao studentDao) {
        this.studentDao = studentDao;
    }

    @Override
    public void add() {
        studentDao.add();
    }
}
```

## JdbcTemplate

![image-20211124233544224](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/image-20211124233544224.png)



### 依赖

```xml
<dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>5.1.47</version>
        </dependency>
        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>druid</artifactId>
            <version>1.1.19</version>
        </dependency>
        <dependency>
            <groupId>org.mybatis</groupId>
            <artifactId>mybatis</artifactId>
            <version>3.4.6</version>
        </dependency>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-jdbc</artifactId>
            <version>5.3.11</version>
        </dependency>
```

### bean.xml

```xml-dtd
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/context
        http://www.springframework.org/schema/context/spring-context.xsd">

<!--<bean id="studentDao" class="com.dao.impl.StudentDaoImpl" scope="singleton" init-method="init" destroy-method="destory"/>
    <bean id="studentService" class="com.service.impl.StudentServiceImpl" scope="prototype">
        <property name="studentDao" ref="studentDao"/>
    </bean>
    <bean id="student" class="com.pojo.Student">
        <constructor-arg name="sid" value="007" />
        <constructor-arg name="sname" value="张三" />
        <constructor-arg name="sex" value="男"/>
        <constructor-arg name="nation" value="五道口"/>
        <property name="sname" value="法外狂徒"/>
        <property name="sex" value="女"/>
        <property name="nation" value="五道口职业技术学院"/>
    </bean>-->
    <context:property-placeholder location="classpath:db.properties"/>

    <bean id="dataSource" class="com.alibaba.druid.pool.DruidDataSource">
        <property name="driverClassName" value="${jdbc.driver}"/>
        <property name="url" value="${jdbc.url}"/>
        <property name="username" value="${jdbc.user}"/>
        <property name="password" value="${jdbc.password}"/>
    </bean>

    <bean id="jdbcTemplate" class="org.springframework.jdbc.core.JdbcTemplate">
        <property name="dataSource" ref="dataSource"/>
    </bean>

    <bean id="studentDao" class="com.dao.impl.StudentDaoImpl">
        <property name="jdbcTemplate" ref="jdbcTemplate"/>
    </bean>

    <bean id="studentService" class="com.service.impl.StudentServiceImpl">
        <property name="studentDao" ref="studentDao"/>
    </bean>
</beans>
```

### DAO层

```java
public interface StudentDao {
    String add(Student student);
    void init();
    void destory();
}
```

```java
public class StudentDaoImpl implements StudentDao {
    private JdbcTemplate jdbcTemplate;

    public void setJdbcTemplate(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
	// 插入
    @Override
    public String add(Student student) {
        String sql = "insert into students values(?,?,?,?)";
        int update = jdbcTemplate.update(sql,student.getSid(),student.getSname(),student.getSex(),student.getNation());
        if (update > 0) {
            return "员工添加完毕";
        }
        return "员工添加失败";
    }

    @Override
    public void init() {
        System.out.println("初始化...");
    }

    @Override
    public void destory() {
        System.out.println("销毁...");
    }
}
```

### service层

```java
public interface StudentService {
    String add(Student student);
}
```

```java
public class StudentServiceImpl implements StudentService {
    private StudentDao studentDao;

//    public StudentServiceImpl() {
//        studentDao = (StudentDao) SpringFactory.getBean("studentDao");
//    }

    /**
     * 需要set方法实现dao注入service
     * @param studentDao
     */
    public void setStudentDao(StudentDao studentDao) {
        this.studentDao = studentDao;
    }

    @Override
    public String add(Student student) {
        return studentDao.add(student);
    }
}
```

### db.properties

```xml
jdbc.driver=com.mysql.jdbc.Driver
jdbc.url=jdbc:mysql://localhost:3306/demo?characterEncoding=utf-8
jdbc.user=root
jdbc.password=123456
```

### 插入操作

```java
public class Demo {
    private StudentService studentService;

    /*public Demo() {
        studentService = (StudentService) SpringFactory.getBean("studentService");
    }

    @Test
    public void Demo1() {
        studentService.add();
    }*/

    public void setStudentService(StudentService studentService) {
        this.studentService = studentService;
    }

    @Test
    public void Demo2() {
//        ClassPathXmlApplicationContext 根据classpath
//        FileSystemXmlApplicationContext 根据文件
//        AnnotationConfigApplicationContext 根据注册
        /*ApplicationContext atc = new ClassPathXmlApplicationContext("bean.xml");
        StudentDao studentDao = atc.getBean("studentDao", StudentDao.class);
        StudentService studentService =atc.getBean("studentService",StudentService.class);

        studentDao.add();
        studentService.add();

        Student student = atc.getBean("student", Student.class);
        System.out.println(student);*/
        ApplicationContext atc = new ClassPathXmlApplicationContext("bean.xml");
        StudentService service = atc.getBean("studentService", StudentService.class);
        Student student = new Student();
        student.setSid("20154655");
        student.setSex("女");
        student.setNation("湖北省");
        student.setSname("虎不虎");
        System.out.println(service.add(student));
    }
}
```

### 查询

```java
/**
     * 查询
     * @return
     */
    @Override
    public List<Student> queryAll() {
        String sql = "select * from students";
        RowMapper<Student> rowMap = new BeanPropertyRowMapper<>(Student.class);
        return jdbcTemplate.query(sql, rowMap);
    }

    /**
     * 聚合查询
     * @return
     */
    @Override
    public Integer getStuCount() {
        String sql = "select count(*) from students";
        return jdbcTemplate.queryForObject(sql, Integer.class);
//        RowMapper<Integer> rowMap = new ColumnMapRowMapper(Integer.class);
//        return jdbcTemplate.queryForObject(sql, rowMap, Integer.TYPE);
    }
```

### 批量操作

https://blog.csdn.net/w144215160044/article/details/114646840

### 批量添加

```java
/**
     * 批量添加学生
     *
     * @param studentList
     * @return
     */
    @Override
    public String batchAdd(List<Student> studentList) {
        String sql = "insert into students values(?,?,?,?)";
        List<Object[]> objectList = new ArrayList<>();

        for (Student s : studentList) {
            objectList.add(new Object[]{s.getSid(), s.getSname(), s.getSex(), s.getNation()});
        }
//        studentList.stream().forEach(objectList::add);
        jdbcTemplate.batchUpdate(sql, objectList);
        return "批量添加完成";
    }
```

```java
@Test
    public void Demo5(){
        ApplicationContext atc = new ClassPathXmlApplicationContext("bean.xml");
        StudentService service = atc.getBean("studentService", StudentService.class);
        List<Student> list = new ArrayList<>();
        list.add(new Student("4546846","电话回访","男","湖北省"));
        list.add(new Student("4546847","寄刀片","男","湖南省"));
        list.add(new Student("4546848","烽火台","女","四川省"));
        String msg = service.batchAdd(list);
        System.out.println(msg);
    }
```

### 批量删除

```java
/**
     * 批量删除学生
     *
     * @param list
     * @return
     */
    @Override
    public String batchDelete(List<Object[]> list) {
        String sql = "delete from students where sid = ?";
        int[] ints = jdbcTemplate.batchUpdate(sql, list);
        int successCount = 0;
        for (int i : ints) {
            if (i > 0) {
                successCount++;
            }
        }
        return "批量删除完成,期待修改数据:" + ints.length + ",实际修改数据：" + successCount;
    }
```

```java
@Test
    public void Demo6(){
        ApplicationContext atc = new ClassPathXmlApplicationContext("bean.xml");
        StudentService service = atc.getBean("studentService", StudentService.class);
        List<Object[]> list = new ArrayList<>();
        list.add(new Object[]{"4546846"});
        list.add(new Object[]{"4546847"});
        String msg = service.batchDelete(list);
        System.out.println(msg);
    }
```



## spring整合junit

### 依赖

```xml
<dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-test</artifactId>
            <version>5.3.11</version>
        </dependency>
```

### 配置bean.xml

```java
<bean id="student" class="com.pojo.Student">
        <property name="sname" value="法外狂徒"/>
        <property name="sex" value="女"/>
        <property name="nation" value="五道口职业技术学院"/>
<!--        配置数组-->
        <property name="nameArr">
            <list>
                <value>arr1</value>
                <value>arr2</value>
                <value>arr3</value>
            </list>
        </property>
<!--        list集合-->
        <property name="nameList">
            <list>
                <value>list1</value>
                <value>list2</value>
                <value>list3</value>
            </list>
        </property>
<!--        set集合-->
        <property name="nameSet">
            <set>
                <value>set1</value>
                <value>set2</value>
            </set>
        </property>
<!--        map集合-->
        <property name="nameMap">
            <map>
                <entry key="mapkey1" value="mapvalue1"></entry>
                <entry key="mapkey2" value="mapvalue2"></entry>
                <entry key="mapkey3" value="mapvalue3"></entry>
            </map>
        </property>
<!--list里面有另一个对象-->
        <property name="objlist">
            <list>
                <ref bean="obj"></ref>
            </list>
        </property>
    </bean>
    <bean id="obj" class="com.pojo.Obj">
        <property name="id" value="111"></property>
        <property name="address" value="222"></property>
    </bean>
```

### 测试类

```java
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = "classpath:bean.xml")
public class Demo {

    // 自动注入 不用写set方法，配置bean.xml
    @Autowired
    private StudentService studentService;
    @Autowired
    private Student student;
    @Test
    public void Demo7(){

        List<Obj> objlist = student.getObjlist();
        System.out.println(objlist);
        String[] arr = student.getNameArr();
        for (String s : arr) {
            System.out.println(s);
        }
        List<Obj> objs = student.getObjlist();
        for (Obj obj : objs) {
            System.out.println(obj);
        }
        Set<String> nameSet = student.getNameSet();
        for (String s : nameSet) {
            System.out.println(s);
        }
        Map<String, String> nameMap = student.getNameMap();
        for (Map.Entry<String, String> map : nameMap.entrySet()) {
            System.out.println(map.getValue() +":"+ map.getValue());
        }
    }
}
```

## 组件扫描

```xml
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/context
        http://www.springframework.org/schema/context/spring-context.xsd">
    
    <context:component-scan base-package="com"></context:component-scan>
```

### 依赖

```xml
<dependency>
            <groupId>javax.annotation</groupId>
            <artifactId>javax.annotation-api</artifactId>
            <version>1.3.2</version>
        </dependency>
```

### 注解

![image-20211124233644417](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/image-20211124233644417.png)



## 配置类config

### pom.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.spring</groupId>
    <artifactId>spring</artifactId>
    <version>1.0</version>

    <dependencies>
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.13.2</version>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-context</artifactId>
            <version>5.3.9</version>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <version>1.18.20</version>
        </dependency>
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>5.1.47</version>
        </dependency>
        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>druid</artifactId>
            <version>1.1.19</version>
        </dependency>
        <dependency>
            <groupId>org.mybatis</groupId>
            <artifactId>mybatis</artifactId>
            <version>3.4.6</version>
        </dependency>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-jdbc</artifactId>
            <version>5.3.11</version>
        </dependency>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-test</artifactId>
            <version>5.3.11</version>
        </dependency>
        <dependency>
            <groupId>javax.annotation</groupId>
            <artifactId>javax.annotation-api</artifactId>
            <version>1.3.2</version>
        </dependency>
    </dependencies>
    <build>
        <!--   xml映射文件放到java文件一起-->
        <!--        <resources>-->
        <!--            <resource>-->
        <!--                <directory>src/main/java</directory>-->
        <!--                <includes>-->
        <!--                    <include>**/*.xml</include>-->
        <!--                </includes>-->
        <!--                <filtering>false</filtering>-->
        <!--            </resource>-->
        <!--        </resources>-->
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>3.8.1</version>
                <configuration>
                    <source>11</source>
                    <target>11</target>
                    <encoding>UTF-8</encoding>
                </configuration>
            </plugin>
        </plugins>
    </build>
</project>
```

### JdbcConfig类

```java
package com.config;

import com.alibaba.druid.pool.DruidDataSource;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.sql.DataSource;

public class JdbcConfig {
    @Value("${jdbc.driver}")//读取db.properties中的驱动字符串
    private String driver;

    @Value("${jdbc.url}")//读取db.properties中的远程服务器地址
    private String url;

    @Value("${jdbc.user}")//读取db.properties中的mysql用户名
    private String user;

    @Value("${jdbc.password}")//读取db.properties中的mysql密码
    private String password;
    
//该方法等价于spring配置文件中的<bean id="ds" />
    @Bean("ds")
    public DataSource createDataSource() {
        DruidDataSource ds = new DruidDataSource();
        ds.setDriverClassName(driver);
        ds.setUrl(url);
        ds.setUsername(user);
        ds.setPassword(password);
        return ds;
    }
//该方法等价于spring配置文件中的<bean id="jdbcTemplate" />并且通过注解参数和datasource建立关联
    @Bean("jdbcTemplate")
    public JdbcTemplate createJdbcTemplate(@Qualifier("ds") DataSource dataSource){
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        return jdbcTemplate;
    }
}

```

### db.properties

```properties
jdbc.driver=com.mysql.jdbc.Driver
jdbc.url=jdbc:mysql://localhost:3306/demo?characterEncoding=utf-8
jdbc.user=root
jdbc.password=123456
```

### SpringConfig类

```java
package com.config;


import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.context.annotation.PropertySource;
//spring配置的启动类
@Configuration//将该类变为配置类，起到bean.xml的作用
@ComponentScan("com")// 组件扫描 com 下所有类
@PropertySource("classpath:db.properties")//读取 db.properties文件
@Import(JdbcConfig.class)//和 JdbcConfig类建立关联
public class SpringConfig {
}
```

### test类

```java
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = SpringConfig.class)
public class Demo2 {

    @Resource
    private StudentService service;

    @Test
    public void Demo1(){
        System.out.println(service.queryAll());
    }
}
```

# mybatis整合spring

```xml
<!-- mybatis.xml -->
<?xml version="1.0" encoding="utf-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration></configuration>
```

```xml
<!-- spring.xml -->
<?xml version="1.0" encoding="UTF-8" ?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/context
        http://www.springframework.org/schema/context/spring-context.xsd">

    <context:property-placeholder location="classpath:db.properties" />
    <context:component-scan base-package="com" />

    <bean id="dataSource" class="com.alibaba.druid.pool.DruidDataSource">
        <property name="driverClassName" value="${jdbc.driver}"/>
        <property name="url" value="${jdbc.url}"/>
        <property name="username" value="${jdbc.user}"/>
        <property name="password" value="${jdbc.password}"/>
    </bean>

    <bean id="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
<!--        数据库连接池-->
        <property name="dataSource" ref="dataSource"/>
<!--        sql映射文件-->
        <property name="mapperLocations" value="classpath:data/*.xml"/>
<!--        mybatis配置文件-->
        <property name="configLocation" value="classpath:mybatis.xml"/>
    </bean>
<!--mybatis扫描器-->
    <bean id="mapperScanner" class="org.mybatis.spring.mapper.MapperScannerConfigurer">
<!--        整合连接池-->
        <property name="sqlSessionFactoryBeanName" value="sqlSessionFactory"/>
<!--        设置扫描范围 mapper代理的实现类-->
        <property name="basePackage" value="com.mapper"/>
    </bean>
          
</beans>
```

```java
dao(mapper) @Repository @Resource
service @Service @Resource
test 
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = "classpath:spring.xml")
@Resource
```

## web（servlet）暂时

```xml-dtd
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
         version="4.0">
    <listener>
        <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
    </listener>

    <context-param>
        <param-name>contextConfigLocation</param-name>
        <param-value>classpath:applicationContext.xml</param-value>
    </context-param>
    <welcome-file-list>
        <welcome-file>index.jsp</welcome-file>
    </welcome-file-list>
</web-app>
```

![image-20211124233714938](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/image-20211124233714938.png)

```xml-dtd
<bean id="studentService" class="com.service.impl.StudentServiceImpl"></bean>
```

```java
package com.web;

import com.pojo.Student;
import com.service.StudentService;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.web.context.support.SpringBeanAutowiringSupport;

import javax.annotation.Resource;
import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@WebServlet(name = "QueryAllStuSvl",urlPatterns = "/select")
public class QueryAllStuSvl extends HttpServlet {

    @Resource
    private StudentService service;

    @Override
    public void init(ServletConfig config) throws ServletException {
        SpringBeanAutowiringSupport.processInjectionBasedOnServletContext(this,config.getServletContext());
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("utf-8");
        response.setContentType("text/html;charset=utf-8");
        response.setCharacterEncoding("utf-8");

        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("applicationContext.xml");
        StudentService service = applicationContext.getBean("studentService", StudentService.class);


        List<Student> list = service.queryAll();
        request.getSession().setAttribute("stuList",list);
        response.sendRedirect("index.jsp");
    }
}
```

# spring AOP

https://toscode.gitee.com/JavaGuide/JavaGuide/blob/master/docs/java/basis/%E4%BB%A3%E7%90%86%E6%A8%A1%E5%BC%8F%E8%AF%A6%E8%A7%A3.md#31-jdk-%E5%8A%A8%E6%80%81%E4%BB%A3%E7%90%86%E6%9C%BA%E5%88%B6

## JDK动态代理

### 处理类（切面类）

```java
package com.aop;
//通用类
public class Shop {
    public void check(){
        System.out.println("买房前检查...");
    }
    public void notQualifications(){
        System.out.println("钱不够！！");
    }
    public void ok(){
        System.out.println("可以买。");
    }
}
```

### 代理类(增强处理)

```java
package com.aop;

import com.service.ShopService;
import com.service.StudentService;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;

public class ShopAop implements InvocationHandler {
    private ShopService service;
    private Shop shop;

    public ShopAop(ShopService service, Shop shop) {
        this.service = service;
        this.shop = shop;
    }

    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        shop.check();
        try {
            int a =1/0;
            shop.ok();
            method.invoke(service,shop);//执行业务方法,args表示业务方法的参数（无参则用null表示）
        }catch (Exception e){
            shop.notQualifications();
        }
        return null;
    }
}
```

### 业务接口及实现类

```java
package com.service;

public interface ShopService {
    void buy();
}
// --------------------------------------------------
package com.service.impl;

import com.service.ShopService;

public class ShopServiceImpl implements ShopService {
    @Override
    public void buy() {
        System.out.printf("买房中...");
        System.out.printf("买房完成...");
    }
}
```

### 测试类

```java
package com.Test;

import com.aop.Shop;
import com.aop.ShopAop;
import com.service.ShopService;
import com.service.StudentService;
import com.service.impl.ShopServiceImpl;
import com.service.impl.StudentServiceImpl;
import org.junit.Test;

import java.lang.reflect.Proxy;

public class Demo3 {
    @Test
    public void Test1() {
        ShopService service = new ShopServiceImpl();//纯粹的业务对象
        Shop shop = new Shop();

        ShopAop shopAop = new ShopAop(service,shop);//动态代理类（切面）

         //创建具有通用功能的业务对象: service + shop
        ShopService shopService = (ShopService) Proxy.newProxyInstance(service.getClass().getClassLoader(), service.getClass().getInterfaces(), shopAop);
        shopService.buy();
    }
}
```

## AOP相关术语

```
Target 目标对象 -- 业务对象
JoinPoint 连接点 -- 业务方法
Aspect 切面 -- 类，通用功能加入业务对象
Proxy 代理 -- 业务方法和切面类结合起来的代理对象（增强的业务对象）
Weaving 织入 -- 业务对象-> 代理对象
Advice 通知/增强 -- 拦截业务方法后要做的事情
	前置（身份验证）、后置（日志）、环绕（前置+后置）、最终（finally）、异常（记录异常情况）
Pointcut 切入点 -- 表达式，对哪些业务方法进行拦截。影响范围
```

## 配置代理

### pom.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
	<modelVersion>4.0.0</modelVersion>

	<groupId>org.example</groupId>
	<artifactId>demo_factory</artifactId>
	<version>1.0-SNAPSHOT</version>

	<properties>
		<spring-version>5.3.6</spring-version>
	</properties>

	<dependencies>
		<!--单元测试-->
		<dependency>
			<groupId>junit</groupId>
			<artifactId>junit</artifactId>
			<version>4.13</version>
			<scope>test</scope>
		</dependency>

		<!--Spring整合单元测试-->
		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-test</artifactId>
			<version>5.3.6</version>
		</dependency>

		<!--spring整合mybatis-->
		<dependency>
			<groupId>org.mybatis</groupId>
			<artifactId>mybatis-spring</artifactId>
			<version>2.0.4</version>
		</dependency>
		<dependency>
			<groupId>org.mybatis</groupId>
			<artifactId>mybatis</artifactId>
			<version>3.5.4</version>
		</dependency>

		<!--注解-->
		<dependency>
			<groupId>javax.annotation</groupId>
			<artifactId>javax.annotation-api</artifactId>
			<version>1.3.2</version>
		</dependency>

		<dependency>
			<groupId>org.projectlombok</groupId>
			<artifactId>lombok</artifactId>
			<version>1.18.20</version>
		</dependency>

		<dependency>
			<groupId>mysql</groupId>
			<artifactId>mysql-connector-java</artifactId>
			<version>5.1.47</version>
		</dependency>

		<dependency>
			<groupId>com.alibaba</groupId>
			<artifactId>druid</artifactId>
			<version>1.2.6</version>
		</dependency>

		<!-- spring -->
		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-beans</artifactId>
			<version>${spring-version}</version>
		</dependency>
		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-context</artifactId>
			<version>${spring-version}</version>
		</dependency>
		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-context-support</artifactId>
			<version>${spring-version}</version>
		</dependency>
		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-core</artifactId>
			<version>${spring-version}</version>
		</dependency>
		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-expression</artifactId>
			<version>${spring-version}</version>
		</dependency>

		<!-- 可选模块，按需添加 -->
		<!-- AOP -->
		<!-- 基于代理的AOP支持 -->
		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-aop</artifactId>
			<version>${spring-version}</version>
		</dependency>
		<!-- 提供与AspectJ的集成 -->
		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-aspects</artifactId>
			<version>${spring-version}</version>
		</dependency>

		<!-- JDBC支持包，包括数据源设置和JDBC访问支持 -->
		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-jdbc</artifactId>
			<version>${spring-version}</version>
		</dependency>

		<!-- 支持单元测试和集成测试Spring组件-->
		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-test</artifactId>
			<version>${spring-version}</version>
		</dependency>

		<!-- Spring事务 -->
		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-tx</artifactId>
			<version>${spring-version}</version>
		</dependency>

		<!-- 提供基本的面向Web的集成功能 -->
		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-web</artifactId>
			<version>${spring-version}</version>
		</dependency>

		<!-- SpringMVC -->
		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-webmvc</artifactId>
			<version>${spring-version}</version>
		</dependency>

		<dependency>
			<groupId>org.aspectj</groupId>
			<artifactId>aspectjweaver</artifactId>
			<version>1.9.4</version>
		</dependency>



		<dependency>
			<groupId>javax.servlet.jsp</groupId>
			<artifactId>jsp-api</artifactId>
			<version>2.1</version>
		</dependency>

		<dependency>
			<groupId>javax.servlet</groupId>
			<artifactId>javax.servlet-api</artifactId>
			<version>3.1.0</version>
			<scope>provided</scope>
		</dependency>

		<dependency>
			<groupId>jstl</groupId>
			<artifactId>jstl</artifactId>
			<version>1.2</version>
		</dependency>

		<dependency>
			<groupId>taglibs</groupId>
			<artifactId>standard</artifactId>
			<version>1.1.2</version>
		</dependency>

	</dependencies>

	<build>
		<plugins>
			<plugin>
				<groupId>org.apache.maven.plugins</groupId>
				<artifactId>maven-compiler-plugin</artifactId>
				<configuration>
					<source>1.8</source>
					<target>1.8</target>
					<encoding>utf-8</encoding>
				</configuration>
				<version>3.8.1</version>
			</plugin>
		</plugins>
	</build>
</project>
```

### applicationContext.xml

```java
public class Shop {
    //前置通知
    public void check() {
        System.out.println("买房前检查...");
    }

    //异常通知
    public void notQualifications() {
        System.out.println("钱不够！！");
    }

    /**
     * 后置通知
     */
    public void ok() {
        System.out.println("可以买。");
    }

    /**
     * 最终通知
     */
    public void finallyMethod() {
        System.out.println("交易完成");
    }

    /**
     * 环绕通知
     * @param pjp
     * @return
     */
    public Object aroundActive(ProceedingJoinPoint pjp) {
        Object returnValue = null;

        try {
            check(); // 前置
            // 参数列表
            Object[] args = pjp.getArgs();
            returnValue = pjp.proceed(args);
            ok(); //后置
        } catch (Throwable throwable) {
            notQualifications(); //异常
        } finally {
            finallyMethod(); //最终
        }
        return returnValue;
    }
}
```

```xml-dtd
<!--切面类：事务类(启动、提交、回滚)-->
    <bean id="shop" class="com.aop.Shop"/>
    <aop:config>
        <!--切点：将事务机制作用于service的所有类的所有方法-->
        <aop:pointcut id="all" expression="execution(* com.service.impl.*.*(..))"/>
        <!--切面-->
        <aop:aspect ref="shop">
            <!--通知（增加）-->
            <aop:before method="check" pointcut-ref="all"/> <!--前置通知-->
            <aop:after-returning method="ok" pointcut-ref="all"/> <!--后置通知-->
            <aop:after method="finallyMethod" pointcut-ref="all"/> <!--最终通知 -->
            <aop:after-throwing method="notQualifications" pointcut-ref="all"/> <!--异常通知-->
            <aop:around method="aroundActive" pointcut-ref="all"/> <!--环绕通知 -->
        </aop:aspect>
    </aop:config>
```

## AspectJ注解

```xml-dtd
<!--切面类：事务类(启动、提交、回滚)-->
    <bean id="shop" class="com.aop.Shop"/>

    <aop:aspectj-autoproxy/>
```

```java
package com.aop;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.*;
import org.springframework.web.bind.annotation.ResponseStatus;

@Aspect
public class Shop {
    @Pointcut("execution(* com.service.impl.*.*(..))")
    public void pointCutScope(){}


    //前置通知
    @Before("Shop.pointCutScope()")
    public void check() {
        System.out.println("买房前检查...");
    }

    //异常通知
    @AfterThrowing("Shop.pointCutScope()")
    public void notQualifications() {
        System.out.println("钱不够！！");
    }

    /**
     * 后置通知
     */
    @AfterReturning("Shop.pointCutScope()")
    public void ok() {
        System.out.println("可以买。");
    }

    /**
     * 最终通知
     */
    @After("Shop.pointCutScope()")
    public void finallyMethod() {
        System.out.println("交易完成");
    }

    /**
     * 环绕通知
     * @param pjp
     * @return
     */
    @Around("Shop.pointCutScope()")
    public Object aroundActive(ProceedingJoinPoint pjp) {
        Object returnValue = null;

        try {
            check(); // 前置
            // 参数列表
            Object[] args = pjp.getArgs();
            returnValue = pjp.proceed(args);
            ok(); //后置
        } catch (Throwable throwable) {
            notQualifications(); //异常
        } finally {
            finallyMethod(); //最终
        }
        return returnValue;
    }
}
```

## 事务处理

### pojo

```java
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Bank {
    private String name;
    private Integer money;
}
```

### mapper

```java
@Repository
public interface BankMapper {
    void updateMoney(Bank bank);
}
```

```java
@Repository
public interface BankMapper {
    void updateMoney(@Param("name")String name,@Param("money")Integer money);
}
```



### BankMapper.xml

```xml-dtd
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.mapper.BankMapper">
    <update id="updateMoney" parameterType="Bank">
        update bank set money=money + #{money} where `name`=#{name}
    </update>
</mapper>
```

```xml-dtd
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.mapper.BankMapper">
    <update id="updateMoney">
        update bank set money=money + #{money} where `name`=#{name}
    </update>
</mapper>
```



### service

```java
public interface BankService {
    void transfer(String from,String to,Integer money);
}

```

```java
@Service
public class BankServiceImpl implements BankService {
    @Resource
    private BankMapper bankMapper;

    @Override
    public void transfer(String from, String to, Integer money) {
        Bank bank = new Bank(from, -1 * money);
        bankMapper.updateMoney(bank);

//        int a = 1/0;

        bank.setName(to);
        bank.setMoney(money);
        bankMapper.updateMoney(bank);
    }
}
```

### applicationContext.xml

```xml-dtd
<bean id="dataSource" class="com.alibaba.druid.pool.DruidDataSource">
        <property name="driverClassName" value="${jdbc.driver}"/>
        <property name="url" value="${jdbc.url}"/>
        <property name="username" value="${jdbc.user}"/>
        <property name="password" value="${jdbc.password}"/>
</bean>

<!--切面：spring的事务-->
        <bean id="tm" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
            <property name="dataSource" ref="dataSource"/>
        </bean>
    <!-- 事务通知 -->
    <tx:advice id="txAdvice" transaction-manager="tm">
        <!-- 事务属性 -->
        <tx:attributes>
            <tx:method name="*" propagation="REQUIRED" isolation="REPEATABLE_READ"/>
        </tx:attributes>
    </tx:advice>

    <aop:config>
        <!--切点-->
        <aop:pointcut id="p_all" expression="execution(* com.service.impl.*.*(..))"/>
        <!--通知/增强：将spring事务通知嵌入-->
        <aop:advisor advice-ref="txAdvice" pointcut-ref="p_all"/>
    </aop:config>
```



### Test

```java
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = "classpath:applicationContext.xml")
public class Demo5 {
    @Resource
    private BankService bankService;
    @Test
    public void Test1(){
        try {
            bankService.transfer("aaa","bbb",500);
            System.out.println("转账成功！");
        } catch (Exception e) {
            System.out.println("转账失败！");
            e.printStackTrace();
        }
    }
}
```

### 事务注解

```xml-dtd
<!--切面：spring的事务-->
    <bean id="tm" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
        <property name="dataSource" ref="dataSource"/>
    </bean>

    <tx:annotation-driven transaction-manager="tm"/>
```

```java
@Service
@Transactional(propagation = Propagation.REQUIRED,isolation = Isolation.REPEATABLE_READ,readOnly = false)
public class BankServiceImpl implements BankService {
    @Resource
    private BankMapper bankMapper;

    @Override
    public void transfer(String from, String to, Integer money) {
        bankMapper.updateMoney(from, (-1 * money));


        bankMapper.updateMoney(to, money);
//        int a = 1 / 0;
    }
}
```

## aop自定义通知和事务处理比较

![image-20211124233740825](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/image-20211124233740825.png)

# Hibernate + spring

## pom.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.Hibernate</groupId>
    <artifactId>HibernateDemo</artifactId>
    <version>1.0</version>
    <properties>
        <spring-version>5.3.6</spring-version>
    </properties>

    <dependencies>

        <!-- 添加Hibernate依赖 -->
        <!-- https://mvnrepository.com/artifact/org.hibernate/hibernate-core -->
        <dependency>
            <groupId>org.hibernate</groupId>
            <artifactId>hibernate-core</artifactId>
            <version>5.6.0.Final</version>
        </dependency>


        <!-- 添加Log4J依赖 -->
        <dependency>
            <groupId>log4j</groupId>
            <artifactId>log4j</artifactId>
            <version>1.2.16</version>
        </dependency>

        <dependency>
            <groupId>org.slf4j</groupId>
            <artifactId>slf4j-nop</artifactId>
            <version>1.6.4</version>
        </dependency>

        <!-- 添加javassist -->
        <dependency>
            <groupId>javassist</groupId>
            <artifactId>javassist</artifactId>
            <version>3.12.0.GA</version>
        </dependency>

        <!-- mysql数据库的驱动包 -->
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>5.1.47</version>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <version>1.18.20</version>
        </dependency>


        <!--单元测试-->
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.13</version>
            <scope>test</scope>
        </dependency>

        <!--Spring整合单元测试-->
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-test</artifactId>
            <version>5.3.6</version>
        </dependency>

        <!--spring整合mybatis-->
        <dependency>
            <groupId>org.mybatis</groupId>
            <artifactId>mybatis-spring</artifactId>
            <version>2.0.4</version>
        </dependency>
        <dependency>
            <groupId>org.mybatis</groupId>
            <artifactId>mybatis</artifactId>
            <version>3.5.4</version>
        </dependency>

        <!--注解-->
        <dependency>
            <groupId>javax.annotation</groupId>
            <artifactId>javax.annotation-api</artifactId>
            <version>1.3.2</version>
        </dependency>

        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <version>1.18.20</version>
        </dependency>



        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>druid</artifactId>
            <version>1.2.6</version>
        </dependency>

        <!-- spring -->
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-beans</artifactId>
            <version>${spring-version}</version>
        </dependency>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-context</artifactId>
            <version>${spring-version}</version>
        </dependency>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-context-support</artifactId>
            <version>${spring-version}</version>
        </dependency>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-core</artifactId>
            <version>${spring-version}</version>
        </dependency>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-expression</artifactId>
            <version>${spring-version}</version>
        </dependency>

        <!-- 可选模块，按需添加 -->
        <!-- AOP -->
        <!-- 基于代理的AOP支持 -->
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-aop</artifactId>
            <version>${spring-version}</version>
        </dependency>
        <!-- 提供与AspectJ的集成 -->
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-aspects</artifactId>
            <version>${spring-version}</version>
        </dependency>

        <!-- JDBC支持包，包括数据源设置和JDBC访问支持 -->
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-jdbc</artifactId>
            <version>${spring-version}</version>
        </dependency>

        <!-- 支持单元测试和集成测试Spring组件-->
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-test</artifactId>
            <version>${spring-version}</version>
        </dependency>

        <!-- Spring事务 -->
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-tx</artifactId>
            <version>${spring-version}</version>
        </dependency>

        <!-- 提供基本的面向Web的集成功能 -->
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-web</artifactId>
            <version>${spring-version}</version>
        </dependency>

        <!-- SpringMVC -->
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-webmvc</artifactId>
            <version>${spring-version}</version>
        </dependency>

        <dependency>
            <groupId>org.aspectj</groupId>
            <artifactId>aspectjweaver</artifactId>
            <version>1.9.4</version>
        </dependency>



        <dependency>
            <groupId>javax.servlet.jsp</groupId>
            <artifactId>jsp-api</artifactId>
            <version>2.1</version>
        </dependency>

        <dependency>
            <groupId>javax.servlet</groupId>
            <artifactId>javax.servlet-api</artifactId>
            <version>3.1.0</version>
            <scope>provided</scope>
        </dependency>

        <dependency>
            <groupId>jstl</groupId>
            <artifactId>jstl</artifactId>
            <version>1.2</version>
        </dependency>

        <dependency>
            <groupId>taglibs</groupId>
            <artifactId>standard</artifactId>
            <version>1.1.2</version>
        </dependency>




        <!-- https://mvnrepository.com/artifact/org.springframework/spring-orm -->
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-orm</artifactId>
            <version>5.2.18.RELEASE</version>
        </dependency>




    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <configuration>
                    <source>1.8</source>
                    <target>1.8</target>
                    <encoding>utf-8</encoding>
                </configuration>
                <version>3.8.1</version>
            </plugin>
        </plugins>
    </build>

</project>
```

## hibernate_config.xml

```xml-dtd
<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE hibernate-configuration SYSTEM
		"http://www.hibernate.org/dtd/hibernate-configuration-3.0.dtd">

<hibernate-configuration>
	<session-factory>
		<!--数据库方言-->
		<property name="hibernate.dialect">
			org.hibernate.dialect.MySQLDialect
		</property>
<!--		<property name="dialect">-->
<!--			org.hibernate.dialect.MySQL5InnoDBDialect-->
<!--		</property>-->
<!--		<property name="hibernate.connection.driver_class">-->
<!--			com.mysql.jdbc.Driver-->
<!--		</property>-->

<!--		&lt;!&ndash; Assume test is the database name &ndash;&gt;-->
<!--		<property name="hibernate.connection.url">-->
<!--			jdbc:mysql://localhost/demo-->
<!--		</property>-->
<!--		<property name="hibernate.connection.username">-->
<!--			root-->
<!--		</property>-->
<!--		<property name="hibernate.connection.password">-->
<!--			123456-->
<!--		</property>-->

		<!-- List of XML mapping files -->
		<mapping resource="BankMapper.xml"/>

	</session-factory>
</hibernate-configuration>
```

## db.properties

```properties
jdbc.driver=com.mysql.jdbc.Driver
jdbc.url=jdbc:mysql://localhost:3306/demo?characterEncoding=utf-8
jdbc.user=root
jdbc.password=123456
```

## BankMapper.xml

```xml-dtd
<?xml version="1.0"?>
<!DOCTYPE hibernate-mapping PUBLIC
		"-//Hibernate/Hibernate Mapping DTD 3.0//EN"
		"http://www.hibernate.org/dtd/hibernate-mapping-3.0.dtd">
<!--
	<hibernate-mapping>一般不去配置，采用默认即可。
	schema:指定映射数据库的schema(模式/数据库)，如果指定该属性，则表名会自动添加该schema前缀
	package:指定包前缀 指定持久化类所在的包名 这样之后calss子元素中就不必使用全限定性的类名
	default-cascade="none"：默认的级联风格，表与表联动。
	default-lazy="true"：默认延迟加载
 -->
<hibernate-mapping>
	<!--
		<class>：使用class元素定义一个持久化类。
		name="cn.javass.user.vo.UserModel"：持久化类的java全限定名；
		table="tbl_user"：对应数据库表名，默认持久化类名作为表名；
		proxy:指定一个接口，在延迟装载时作为代理使用，也可在这里指定该类自己的名字。
		mutable="true"：默认为true，设置为false时则不可以被应用程序更新或删除，等价于所有<property>元素的update属性为false，表示整个实例不能被更新。
		dynamic-insert="false"：默认为false，动态修改那些有改变过的字段，而不用修改所有字段；
		dynamic-update="false"：默认为false，动态插入非空值字段；
		select-before-update="false"：默认为false，在修改之前先做一次查询，与用户的值进行对比，有变化都会真正更新；
		optimistic-lock="version"：默认为version(检查version/timestamp字段)，取值：all(检查全部字段)、dirty(只检查修改过的字段)；
		                           none(不使用乐观锁定)，此参数主要用来处理并发，每条值都有固定且唯一的版本，版本为最新时才能执行操作；
		如果需要采用继承映射，则class元素下还会增加<subclass.../>元素等用于定义子类。
	 -->
	<class name="com.hibernate.pojo.Bank" table="bank" >
		<id name="name">
			<column name="name"/>
		</id>
		<property name="money" column="money"/>
	</class>
</hibernate-mapping>
```

## applicationContext.xml

```xml-dtd
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xmlns:tx="http://www.springframework.org/schema/tx"
       xmlns:mvc="http://www.springframework.org/schema/mvc"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
			    http://www.springframework.org/schema/beans/spring-beans.xsd
			    http://www.springframework.org/schema/context
			    http://www.springframework.org/schema/context/spring-context.xsd
			    http://www.springframework.org/schema/aop
			    http://www.springframework.org/schema/aop/spring-aop.xsd
			    http://www.springframework.org/schema/tx
			    http://www.springframework.org/schema/tx/spring-tx.xsd
			    http://www.springframework.org/schema/mvc
			    http://www.springframework.org/schema/mvc/spring-mvc.xsd">

    <context:property-placeholder location="classpath:db.properties" />
    <!--组件扫描：用于注解-->
    	<context:component-scan base-package="com.hibernate"/>

    <!--数据库连接池（德鲁伊连接池）-->
    <bean id="dataSource" class="com.alibaba.druid.pool.DruidDataSource">
        <property name="driverClassName" value="${jdbc.driver}" />
        <property name="url" value="${jdbc.url}" />
        <property name="username" value="${jdbc.user}" />
        <property name="password" value="${jdbc.password}" />
    </bean>

<!--    org.springframework.orm.hibernate5.LocalSessionFactoryBean-->
    <!-- 配置 Hibernate 的 SeesionFactory -->
    <bean id="sessionFactory" class="org.springframework.orm.hibernate5.LocalSessionFactoryBean">
        <property name="dataSource" ref="dataSource"/>
        <!-- hibernateProperties 属性：配置与 hibernate 相关的内容，如显示 sql 语句，开启正向工程 -->
        <property name="hibernateProperties">
            <props> <!-- 显示当前执行的 sql 语句 -->
                <prop key="hibernate.show_sql">true</prop>
                <!-- 开启正向工程 -->
                <prop key="hibernate.hbm2ddl.auto">update</prop>
            </props>
        </property>
        <!-- 扫描实体所在的包 -->
        <property name="packagesToScan">
            <list>
                <value>com.hibernate.pojo</value>
            </list>
        </property>
    </bean>
    <!-- 配置 Hibernate 的事务管理器 -->
    <!--	<bean id="transactionManager" class="org.springframework.orm.hibernate5.HibernateTransactionManager">-->
    <!--		<property name="sessionFactory" ref="sessionFactory"/>-->
    <!--	</bean>-->

    <bean id="hibernateTemplate" class="org.springframework.orm.hibernate5.HibernateTemplate">
        <property name="sessionFactory" ref="sessionFactory"/>
    </bean>
</beans>
```

## pojo

```java
package com.hibernate.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
//@Table(name = "bank")
public class Bank {
    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String name;
    private Integer money;
}
```

## mapper

```java
package com.hibernate.mapper;

import com.hibernate.pojo.Bank;
import org.springframework.stereotype.Repository;

import java.util.List;
public interface BankMapper {
    List<Bank> queryAll();
}
```

```java
package com.hibernate.mapper.impl;

import com.hibernate.mapper.BankMapper;
import com.hibernate.pojo.Bank;
import org.springframework.http.codec.cbor.Jackson2CborDecoder;
import org.springframework.orm.hibernate5.HibernateTemplate;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;
import javax.persistence.criteria.CriteriaQuery;
import java.util.List;

@Repository
public class BankMapperImpl implements BankMapper {
    @Resource
    private HibernateTemplate hibernateTemplate;
    @Override
    public List<Bank> queryAll() {
        @SuppressWarnings("unchecked")
        List<Bank> from_bank = (List<Bank>) hibernateTemplate.find("from Bank");
        return from_bank;
    }
}
```

## test

```java
package com.demo;

import com.hibernate.mapper.BankMapper;
import com.hibernate.pojo.Bank;
import com.hibernate.service.BankService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.annotation.Resource;
import java.util.List;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = "classpath:applicationContext.xml")
public class Test1 {
    @Resource
    private BankService service;

    @Resource
    private BankMapper mapper;
    @Test
    public void Demo1() {
        List<Bank> banks = service.queryAll();
        for (Bank bank : banks) {
            System.out.println(bank);
        }
//        List<Bank> banks = mapper.queryAll();
//        for (Bank bank : banks) {
//            System.out.println(bank);
//        }
    }
}
```



# spring Data JPA

## pom.xml

```xml
<dependency>
            <groupId>org.springframework.data</groupId>
            <artifactId>spring-data-jpa</artifactId>
            <version>2.2.2.RELEASE</version>
</dependency>
```

## applicationContext.xml

```xml-dtd
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xmlns:tx="http://www.springframework.org/schema/tx"
       xmlns:mvc="http://www.springframework.org/schema/mvc"
       xmlns:jpa="http://www.springframework.org/schema/data/jpa"

       xsi:schemaLocation="http://www.springframework.org/schema/beans
			    http://www.springframework.org/schema/beans/spring-beans.xsd
			    http://www.springframework.org/schema/context
			    http://www.springframework.org/schema/context/spring-context.xsd
			    http://www.springframework.org/schema/aop
			    http://www.springframework.org/schema/aop/spring-aop.xsd
			    http://www.springframework.org/schema/data/jpa
				http://www.springframework.org/schema/data/jpa/spring-jpa.xsd
			    http://www.springframework.org/schema/tx
			    http://www.springframework.org/schema/tx/spring-tx.xsd
			    http://www.springframework.org/schema/mvc
			    http://www.springframework.org/schema/mvc/spring-mvc.xsd">

    <context:property-placeholder location="classpath:db.properties" />
    <!--组件扫描：用于注解-->
    <context:component-scan base-package="com.jpa"/>

    <!--数据库连接池（德鲁伊连接池）-->
    <bean id="dataSource" class="com.alibaba.druid.pool.DruidDataSource">
        <property name="driverClassName" value="${jdbc.driver}" />
        <property name="url" value="${jdbc.url}" />
        <property name="username" value="${jdbc.user}" />
        <property name="password" value="${jdbc.password}" />
    </bean>

<!--    org.springframework.orm.hibernate5.LocalSessionFactoryBean-->
    <!-- 配置 Hibernate 的 SeesionFactory -->
    <!--<bean id="sessionFactory" class="org.springframework.orm.hibernate5.LocalSessionFactoryBean">
        <property name="dataSource" ref="dataSource"/>
        &lt;!&ndash; hibernateProperties 属性：配置与 hibernate 相关的内容，如显示 sql 语句，开启正向工程 &ndash;&gt;
        <property name="hibernateProperties">
            <props> &lt;!&ndash; 显示当前执行的 sql 语句 &ndash;&gt;
                <prop key="hibernate.show_sql">true</prop>
                &lt;!&ndash; 开启正向工程 &ndash;&gt;
                <prop key="hibernate.hbm2ddl.auto">update</prop>
            </props>
        </property>
        &lt;!&ndash; 扫描实体所在的包 &ndash;&gt;
        <property name="packagesToScan">
            <list>
                <value>com.hibernate.pojo</value>
            </list>
        </property>
    </bean>-->
    <bean id="entityManagerFactory" class="org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean">
        <property name="dataSource" ref="dataSource"/>
        <property name="jpaVendorAdapter">
            <bean class="org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter">
                <!-- 配置数据库类型 -->
                <property name="database" value="MYSQL"/>
                <!-- 正向工程 自动创建表 -->
                <property name="generateDdl" value="true"/>
                <!-- 显示执行的 SQL -->
                <property name="showSql" value="true"/>
            </bean>
        </property>
        <!-- 扫描实体的包 -->
        <property name="packagesToScan">
            <list>
                <value>com.jpa.pojo</value>
            </list>
        </property>
    </bean>


    <!-- 配置 Hibernate 的事务管理器 -->
    <!--	<bean id="transactionManager" class="org.springframework.orm.hibernate5.HibernateTransactionManager">-->
    <!--		<property name="sessionFactory" ref="sessionFactory"/>-->
    <!--	</bean>-->
    <!-- 配置 Hibernate 的事务管理器 -->
    <bean id="transactionManager" class="org.springframework.orm.jpa.JpaTransactionManager">
        <property name="entityManagerFactory" ref="entityManagerFactory"/>
    </bean>

    <!-- 配置开启注解事务处理 -->
    <tx:annotation-driven transaction-manager="transactionManager"/>

    <!--<bean id="hibernateTemplate" class="org.springframework.orm.hibernate5.HibernateTemplate">
        <property name="sessionFactory" ref="sessionFactory"/>
    </bean>-->

    <!-- Spring Data JPA 的配置 -->
    <!-- base-package：扫描 dao 接口所在的包 -->
    <jpa:repositories base-package="com.jpa.mapper" />
</beans>
```

## dao

```java
    public interface BankMapper extends JpaRepository<Bank,String> {
}
```

## pojo

```java
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
//@Table(name = "bank")
public class Bank {
    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String name;
    private Integer money;
}
```

## test

```java
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = "classpath:applicationContext.xml")
public class Test1 {

    @Resource
    private BankMapper bankMapper;

    /**
     * 查询
     */
    @Test
    public void Demo1(){
        List<Bank> all = bankMapper.findAll();
        for (Bank bank : all) {
            System.out.println(bank);
        }
    }

    /**
     * 删除
     */
    @Test
    public void Demo2(){
        bankMapper.deleteById("bbb");
    }

    /**
     * 修改
     */
    @Test
    public void Demo3(){
        Optional<Bank> aaa = bankMapper.findById("aaa");
        aaa.get().setMoney(1500);
        bankMapper.save(aaa.get());
    }

    /**
     * 插入
     */
    @Test
    public void Demo4(){
        Bank bank = new Bank("bbb", 2000);
        bankMapper.save(bank);
    }
}
```

## JPA运行原理

```java
// 实体管理对象 持久化上下文
    @PersistenceContext(name = "entityManagerFactory")
    private EntityManager manager;

    @Test
    //JPA的运行原理
    public void Demo5(){
        JpaRepositoryFactory jpaFactory = new JpaRepositoryFactory(manager);
        BankMapper mapper = jpaFactory.getRepository(BankMapper.class);
        List<Bank> all = mapper.findAll();
        for (Bank bank : all) {
            System.out.println(bank);
        }
    }
```

## 事务处理

[事务问题解决](https://www.cnblogs.com/huacw/p/8075143.html)

[Optional类的使用方法](https://www.jianshu.com/p/d81a5f7c9c4e)

```java
@Test
    @Transactional //测试类中，事务提交方式默认都是回滚，需要手动更改
//    @Rollback(false) // 取消自动回滚
    @Commit // 也可提交
// 组件扫描：默认不能扫描到Test <context:component-scan base-package="com.jpa"/> 所以在单元测试上加注解@Transactional无效
    public void Demo3(){
        try {
            Optional<Bank> aaa = bankMapper.findById("aaa");
            aaa.get().setMoney(5000);
            bankMapper.save(aaa.get());
            int i = 1/0;
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
```

## JpaRepository接口

[使用方法介绍](https://cloud.tencent.com/developer/article/1429365#:~:text=JpaRepository%20%E6%8E%A5%E5%8F%A3%E6%98%AF%E6%88%91%E4%BB%AC%E5%BC%80%E5%8F%91%E6%97%B6%E4%BD%BF%E7%94%A8%E7%9A%84%E6%9C%80%E5%A4%9A%E7%9A%84%E6%8E%A5%E5%8F%A3%E3%80%82,%E5%85%B6%E7%89%B9%E7%82%B9%E6%98%AF%E5%8F%AF%E4%BB%A5%E5%B8%AE%E5%8A%A9%E6%88%91%E4%BB%AC%E5%B0%86%E5%85%B6%E4%BB%96%E6%8E%A5%E5%8F%A3%E7%9A%84%E6%96%B9%E6%B3%95%E7%9A%84%E8%BF%94%E5%9B%9E%E5%80%BC%E5%81%9A%E9%80%82%E9%85%8D%E5%A4%84%E7%90%86%E3%80%82%20%E5%8F%AF%E4%BB%A5%E4%BD%BF%E5%BE%97%E6%88%91%E4%BB%AC%E5%9C%A8%E5%BC%80%E5%8F%91%E6%97%B6%E6%9B%B4%E6%96%B9%E4%BE%BF%E7%9A%84%E4%BD%BF%E7%94%A8%E8%BF%99%E4%BA%9B%E6%96%B9...%20%E9%80%9A%E8%BF%87%E5%89%8D%E9%9D%A2%E5%A4%9A%E7%AF%87%E6%96%87%E4%BB%B6%E5%AF%B9SpringDataJPA%E7%9A%84%E4%BB%8B%E7%BB%8D%EF%BC%8C%E7%9B%B8%E4%BF%A1%E5%A4%A7%E5%AE%B6%E5%BA%94%E8%AF%A5%E5%B7%B2%E7%BB%8F%E5%AF%B9SpringDataJPA%E5%BE%88%E7%86%9F%E6%82%89%E4%BA%86%EF%BC%8C%E4%BD%BF%E7%94%A8%E8%B5%B7%E6%9D%A5%E8%BF%98%E6%98%AF%E8%9B%AE%E6%96%B9%E4%BE%BF%E7%9A%84%EF%BC%8C%E5%8F%AA%E6%98%AF%E5%9C%A8%E6%95%B4%E5%90%88%E7%9A%84%E6%97%B6%E5%80%99%E9%9C%80%E8%A6%81%E6%B7%BB%E5%8A%A0%E5%A4%A7%E9%87%8F)

### 方法名称命名规则查询

规则：findBy(关键字)+属性名称(属性名称的首字母大写)+查询条件(首字母大写)

| 关键字           | 方法名                         | sql where 子句              |
| :--------------- | :----------------------------- | :-------------------------- |
| And              | findByNameAndPwd               | where name= ? and pwd =?    |
| Or               | findByNameOrSex                | where name= ? or sex=?      |
| Is,Equal         | findById,findByIdEquals        | where id= ?                 |
| Between          | findByIdBetween                | where id between ? and ?    |
| LessThan         | findByIdLessThan               | where id < ?                |
| LessThanEqual    | findByIdLessThanEquals         | where id <= ?               |
| GreaterThan      | findByIdGreaterThan            | where id > ?                |
| GreaterThanEqual | findByIdGreaterThanEquals      | where id > = ?              |
| After            | findByIdAfter                  | where id > ?                |
| Before           | findByIdBefore                 | where id < ?                |
| IsNull           | findByNameIsNull               | where name is null          |
| isNotNull,Not    | findByNameNotNull              | where name is not Null null |
| Like             | findByNameLike                 | where name like ?           |
| NotLike          | findByNameNotLike              | where name not like ?       |
| StartingWith     | findByNameStartingWith         | where name like ‘?%’        |
| EndingWith       | findByNameEndingWith           | where name like ‘%?’        |
| Containing       | findByNameContaining           | where name like ‘%?%’       |
| OrderBy          | findByIdOrderByXDesc           | where id=? order by x desc  |
| Not              | findByNameNot                  | where name <> ?             |
| In               | findByIdIn(Collection<?> c)    | where id in (?)             |
| NotIn            | findByIdNotIn(Collection<?> c) | where id not in (?)         |
| True             | findByAaaTue                   | where aaa = true            |
| False            | findByAaaFalse                 | where aaa = false           |
| IgnoreCase       | findByNameIgnoreCase           | where UPPER(name)=UPPER(?)  |

```java
public interface BankMapper extends JpaRepository<Bank,String> {
    List<Bank> findByNameContaining(String likeName);
}
@Test
    public void Demo6(){
        List<Bank> likeName = bankMapper.findByNameContaining("a");
        System.out.println(likeName);
}
```



### 基于@Query 注解查询

```java
//注解query
    @Query(value = "from Bank where name like ?1")
    List<Bank> findByNameLikeJPQL(String name);

    //nativeQuerym开启sql支持
    @Query(value = "select * from bank where name like ?1", nativeQuery = true)
    List<Bank> selectNameLike(String name);
```

### 分页查询

```java
public interface AreaMapper extends JpaRepository<Area,Integer> {
}
@Resource
    private AreaMapper areaMapper;
@Test
    public void Demo7() {
        Integer page = 1; // 当前页码
        Integer size = 3; // 每页大小
        Pageable pageRequest1 = PageRequest.of(page, size);
        //(1)
        Page<Area> all = areaMapper.findAll(pageRequest1);
        List<Area> content = all.getContent();
        System.out.println(content);
        //(2)
        page = 1;
        size = 5;
        Pageable pageRequest2 = PageRequest.of(page, size);
        List<Area> bankMapperAll = areaMapper.findAll(pageRequest2).toList();
        System.out.println(bankMapperAll);
    }
```

#### Sort排序

```java
/**
     * 单条件查询
     */
    @Test
    public void Demo8(){
        Sort sort = Sort.by(Sort.Direction.DESC,"aid");
        List<Area> all = areaMapper.findAll(sort);
        System.out.println(all);
    }

    /**
     * 多条件查询
     * order属于sort的静态内部类
     */
    @Test
    public void Demo9(){
        Sort.Order order1 = Sort.Order.desc("aid");
        Sort.Order order2 = Sort.Order.asc("aname");
        Sort orders = Sort.by(order1, order2);
        List<Area> all = areaMapper.findAll(orders);
        System.out.println(all);
    }
```

#### 多条件+排序+分页

```java
/**
     * 实现多条件查询
     * 条件+排序+分页
     */
    @Test
    public void Demo10(){
        Specification<Area> spec = new Specification<Area>() {
            @Override
            public Predicate toPredicate(Root<Area> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
                /**
                 * @return Predicate:定义了查询条件
                 * @param Root<Users> root:根对象。封装了查询条件的对象
                 * @param CriteriaQuery<?> query:定义了一个基本的查询.一般不
                使用
                 * @param CriteriaBuilder cb:创建一个查询条件
                 */
                // 条件集合
                List<Predicate> predicateList = new ArrayList<Predicate>();
                // 添加条件
                predicateList.add(criteriaBuilder.like(root.get("aname"), "%区%"));
                predicateList.add(criteriaBuilder.greaterThan(root.get("aid"),2));
                // 定义查询条件
                Predicate[] predicates = new Predicate[predicateList.size()];
                // 创建查询条件
                return criteriaBuilder.and(predicateList.toArray(predicates));
            }
        };
        // 加上排序
        Sort orders = Sort.by("aid").descending();
        //Sort orders = Sort.by(Sort.Direction.DESC,"aid");
        // 加上分页
        Pageable pageable = PageRequest.of(1,4,orders);
        List<Area> areaMapperAll = areaMapper.findAll(spec, pageable).toList();
        System.out.println(areaMapperAll);
    }
```

### 关系映射

#### 员工类 employee.java

```java
package com.jpa.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer eid;
    private String ename;
    private String sex;
//    private Integer pid;
    private Double salary;
    private String dizhi;
    private String file;

    @ManyToOne
    @JoinColumn(name = "pid")
    private Department department;
}
```

#### 部门类 department.java

```java
package com.jpa.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Department {
    @Id
    private Integer pid;
    private String pname;

    // 一对多
    @OneToMany(mappedBy = "department",fetch = FetchType.EAGER)
    private List<Employee> employeeList = new ArrayList<>();
}
```

#### 员工和部门对应的mapper接口

##### DepartmentMapper.java

```java
package com.jpa.mapper;

import com.jpa.pojo.Department;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DepartmentMapper extends JpaRepository<Department,Integer> {
}
```

##### EmployeeMapper.java

```java
package com.jpa.mapper;

import com.jpa.pojo.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface EmployeeMapper extends JpaRepository<Employee,Integer>, JpaSpecificationExecutor<Employee> {
}
```

#### Test

```java
import com.jpa.mapper.DepartmentMapper;
import com.jpa.mapper.EmployeeMapper;
import com.jpa.pojo.Department;
import com.jpa.pojo.Employee;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.annotation.Resource;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = "classpath:applicationContext.xml")
public class Test2 {

    @Resource
    private EmployeeMapper employeeMapper;
    @Resource
    private DepartmentMapper departmentMapper;

    @Test
    //查询员工
    public void Demo1() {
        List<Employee> mapperAll = employeeMapper.findAll();
        for (Employee e : mapperAll) {
            System.out.println(e.getEname() + ":" + e.getDepartment().getPname());
        }
    }

    @Test
    // 查询部门
    public void Demo2() {
        List<Department> mapperAll = departmentMapper.findAll();
        for (Department d : mapperAll) {
            System.out.println(d.getPname());
            for (Employee e : d.getEmployeeList()) {
                System.out.println("\t" + e.getEname());
            }
        }
    }
    @Test
    // 多条件查询员工
    public void Demo3() {
        Specification<Employee> spec = new Specification<Employee>() {
            @Override
            public Predicate toPredicate(Root<Employee> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
                List<Predicate> predicateList = new ArrayList<>();
                predicateList.add(criteriaBuilder.equal(root.get("sex"),"男"));
                predicateList.add(criteriaBuilder.equal(root.get("department").get("pname"),"市场部"));
                predicateList.add(criteriaBuilder.greaterThan(root.get("salary"),3000));

                Predicate[] predicates = new Predicate[predicateList.size()];

                return criteriaBuilder.and(predicateList.toArray(predicates));
            }
        };
        Sort orders = Sort.by("eid").descending();
        Pageable pageable = PageRequest.of(0, 5, orders);
        List<Employee> employeeMapperAll = employeeMapper.findAll(spec, pageable).toList();
        employeeMapperAll.forEach(employee -> System.out.println(employee.getEname()));
    }
}
```

#### 添加数据

版本要一致！

![image-20211124233825158](https://note-1259190304.cos.ap-chengdu.myqcloud.com/note/image-20211124233825158.png)

```java
忽略不存在的部门编号
@ManyToOne
@JoinColumn(name = "pid")
@NotFound(action = NotFoundAction.IGNORE) 
private Department department;
```

```java
 @Test
    public void Demo4() {
        Department department = new Department(805, "外交部", new ArrayList<Employee>());

        Employee employee1 = new Employee(-1, "凸凹啊", "男", 8000.0, "湖北省", "项目主管","xxx", null);
        Employee employee2 = new Employee(-1, "湖滨层", "女", 6000.2, "四川省", "项目主管","xxx", null);

        employee1.setDepartment(department);
        employee2.setDepartment(department);

        department.getEmployeeList().add(employee1);
        department.getEmployeeList().add(employee2);

        departmentMapper.save(department);
        employeeMapper.save(employee1);
        employeeMapper.save(employee2);
        System.out.println("添加成功...");
    }
```

#### 修改数据

```java
@Test
    public void Demo5() {
        // 无数据get会出错
        Department department = departmentMapper.findById(802).get();
        departmentMapper.delete(department);
//        System.out.println(department.getPname());
        department.setPid(701);
        for (int i = 0; i < department.getEmployeeList().size(); i++) {
            department.getEmployeeList().get(i).setDepartment(department);
        }

        departmentMapper.save(department);

        List<Employee> employees = employeeMapper.findByDepartment_Pid(null);
        for (Employee employee : employees) {
            System.out.println(employee);
            employee.setDepartment(department);
            employeeMapper.save(employee);
        }
    }
```



