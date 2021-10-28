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

![image-20211028161607573](https://raw.githubusercontent.com/731016/imgSave/master/note_img202110281616290.png)

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

![image-20211028161645951](https://raw.githubusercontent.com/731016/imgSave/master/note_img202110281616918.png)

![image-20211028161854469](https://raw.githubusercontent.com/731016/imgSave/master/note_img202110281618802.png)

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

### DAO

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

### service

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

### bean.xml

```xml
jdbc.driver=com.mysql.jdbc.Driver
jdbc.url=jdbc:mysql://localhost:3306/demo?characterEncoding=utf-8
jdbc.user=root
jdbc.password=123456
```

### Test

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

