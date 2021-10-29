# Spring



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

![image-20211029115407639](https://raw.githubusercontent.com/731016/imgSave/master/note_img202110291154291.png)

![image-20211029115336390](https://raw.githubusercontent.com/731016/imgSave/master/note_img202110291153435.png)

![image-20211029134920732](https://raw.githubusercontent.com/731016/imgSave/master/note_img202110291349202.png)

