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
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans.xsd">
        
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



