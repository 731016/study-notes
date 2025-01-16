[TOC]



## 循环依赖

[什么是循环依赖（常问）？ - Spring 面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1790683494127804418/question/1780933295379345410)

多个bean相互依赖

spring使用三级缓存解决

一级缓存：存储完全初始化的单例bean

二级缓存：存储未完全初始化，但已经实例化的bean，用于提前暴露对象，避免循环依赖

三级缓存：存储对象工厂，需要时可创建早期bean（支持aop创建代理对象）

解决步骤：

1.创建bean实例，并加入三级缓存

2.当bean依赖另一个未初始化的bean时，spring从三级缓存获取bean的工厂，生成该bean的代理对象

3.代理对象存入二级缓存，解决循环依赖

4.所有依赖bean完全初始化后，bean将转移到一级缓存

### 为什么要使用二级缓存？

一级缓存也可以，主要能准确标识bean是实例化后的还是实例化后但是属性未完整填充的

### 为什么要使用三级缓存？

如果bean被代理了，因为被代理对象是在初始化后生成的，直接使用二级缓存不做处理会导致都是bean未代理的原始对象。

## spring IOC

[什么是 Spring IOC？ - Spring 面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1790683494127804418/question/1780933295329013762)

通过依赖注入（通过构造器、setter、接口）实现，让对象的创建和依赖关系交给spring容器负责，不由对象自身控制

## spring bean

[什么是 Spring Bean？ - Spring 面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1790683494127804418/question/1780933295337402370#heading-0)

通过spring管理的bean对象。

## spring bean作用域

[Spring Bean 一共有几种作用域？ - Spring 面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1790683494127804418/question/1780933295354179585)

singleton：单例

prototype：原型，多实例

request：每一个request请求中都有一个bean实例

session：每一个http seesion请求中都有一个bean实例

application：整个servletContext生命周期，只有一个bean实例

websocket：一个websocket生命周期，只有一个bean实例



## spring bean的生命周期

[说下 Spring Bean 的生命周期？ - Spring 面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1790683494127804418/question/1780933295396122626)

实例化：spring容器根据配置文件或注解实例化bean对象

属性注入：spring将依赖注入到bean实例

初始化前的扩展机制：实现了BeanNameAware等aware接口，则执行aware注入

初始化前：可通过BeanPostProcessor接口对bean进行额外处理

初始化：调用InitializingBean接口的afterPropertiesSet()方法或通过init-method属性指定的初始化方法

初始化后：可通过BeanProcessor进行处理

使用bean：可被其它bean使用

销毁：调用DispsableBean接口的destory()方法或通过destory-method属性指定的销毁方法。

![image-20250115185421202](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20250115185421202.png)



## spring注入方式有几种

[Spring 一共有几种注入方式？ - Spring 面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1790683494127804418/question/1780933295358373890)

### 构造器

spring提倡使用构造函数注入，构造器注入返回给客户端时一定是完整的

```java
public class MyService {  
    private final MyDependency myDependency;  

    @Autowired  
    public MyService(MyDependency myDependency) {  
        this.myDependency = myDependency;  
    }  
}  
```

### setter

```java
public class MyService {  
    private MyDependency myDependency;  

    @Autowired  
    public void setMyDependency(MyDependency myDependency) {  
        this.myDependency = myDependency;  
    }  
}
```



### 字段注入

@Autowired

```java
public class MyService {  
    @Autowired  
    private MyDependency myDependency;  
}
```



### 方法注入

@Autowired

```java
public class MyService {  
    public void performAction(@Autowired MyDependency myDependency) {  
        myDependency.doSomething();  
    }  
}
```



接口回调注入：定义的内建接口，如BeanFactoryAware，会进行BeanFactory的注入

```java
public interface Aware {
}

public interface BeanFactoryAware extends Aware {
    void setBeanFactory(BeanFactory var1) throws BeansException;
}
```

## AOP

[什么是 AOP？ - Spring 面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1790683494127804418/question/1780933295362568194)

面向切面编程，将与业务无关的横切关注点抽取处理，通过声明的方式动态地应用到业务方法上，而不是将这些代码直接嵌入业务逻辑中。

**切面**（Aspect 观察的方向）：横切关注点，需要观察什么东西，如日志、事务

```java
/**
 * 请求响应日志 AOP
 **/
@Aspect
@Component
@Slf4j
public class LogInterceptor {
	/**
	 * 执行拦截
	 */
	@Around("execution(* site.xiaofei.apibackend.controller.*.*(..))")
	public Object doInterceptor(ProceedingJoinPoint point) throws Throwable {
```

**连接点**（Join Point）：程序执行中的一个特定位置，如方法调用、异常抛出

**通知**（Advice 向某人提供观察结果）：在连接点执行的操作，前置、后置、环绕（在方法执行前后都可执行）、异常（方法抛出异常后执行）、返回（方法成功返回后执行）

**切入点**（Pointcut 切割点、划分点）：定义的一组连接点的集合，在什么地方使用通知，限制范围；通常通过表达式来匹配方法或类

```java
@Pointcut("execution(* com.example.service.*.*(..))")
public void serviceMethods() {}
```

**织入**（Waeving 编织的过程、交织的过程）：将切面应用到目标对象的过程。可在编译、类加载时、运行时进行织入



## spring aop默认的动态代理

[Spring AOP默认用的是什么动态代理，两者的区别？ - Spring 面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1790683494127804418/question/1780933295366762497)

spring framework默认使用JDK动态代理，SpringBoot 2.x默认使用CGLIB动态代理

### JDK动态代理

基于接口实现，通过反射机制，由Proxy类和InvocationHandler接口实现。代理类在运行时生成，并调用InvocationHandler的invoke方法

### CGLIB动态代理

基于类继承，通过继承目标类创建代理类，并重写插入切面逻辑。通过字节码技术生成目标类的子类，来实现对目标方法的代理

不能代理final类的final方法

Enhancer类创建代理对象

MethodInterceptor接口的intercept方法

## spring中的ApplicationContext

[Spring 中的 ApplicationContext 是什么？ - Spring 面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1790683494127804418/question/1780933295349985283#heading-0)

多个底层接口组合后的接口，包含5大功能：

1. 核心容器 BeanFactory
2. 国际化 MessageSource
3. 资源获取 ResourceLoader
4. 环境信息 EnvironmentCapable
5. 事件发布 ApplicationEventPublisher

![image-20250115152136698](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20250115152136698.png)



## spring拦截链

[能说说 Spring 拦截链的实现吗？ - Spring 面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1790683494127804418/question/1780933295370956802)

指一系列拦截器（AOP切面、过滤器、拦截器）依次作用于请求或方法调用，实现横切关注点的处理

HandlerInterceptor（MVC拦截器）：拦截http请求并进行预处理和后处理。实现HandlerInterceptor接口的preHandle、postHandle、afterCompletion，可在请求到达控制器之前、之后以及请求完成后进行处理

Filter（过滤器）：基于servlet api的过滤器，可对请求进行初步筛选。Filter接口的doFilter方法拦截请求

AOP拦截链（切面）：定义切面可实现方法前后的处理。@Before、@After、@Around等注解用于控制拦截的执行顺序



## Spring MVC

[说下对 Spring MVC 的理解？ - Spring 面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1790683494127804418/question/1780933295400316930)

[Spring MVC 具体的工作原理？ - Spring 面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1790683494127804418/question/1780933295400316931#heading-0)

请求处理流程：模型层（Model）、视图层（View）、控制层（Controller），提供一种松耦合的方式将用户请求、业务逻辑和视图渲染分离

基于servlet api构建，核心是DispatcherServlet前端控制器。通过注解、配置方式，将http请求映射到控制器方法，由控制器处理请求逻辑并将数据返回给视图层进行渲染。

主要功能：请求映射、数据绑定、视图解析、表单处理、异常处理

![image-20250116220112793](https://note-1259190304.cos.ap-chengdu.myqcloud.com/noteimage-20250116220112793.png)

[springMVC 执行流程](http://xiaofei.site:10082/#/SSM框架/springMVC?id=执行流程)

## spring 事务隔离级别

1. DEFAULT:默认，使用底层数据库的默认隔离级别，如果数据库无特殊配置，通常默认为READ_COMMITTED
2. READ_UNCOMMITTED:读未提交，允许事务读取尚未提交的数据，可能会导致脏读、不可重复读、幻读
3. READ_COMMITTED:读已提交，只允许读取已经提交的数据，避免脏读，可能出现不可重复读、幻读
4. REPEATABLE_READ:确保在同一事务内的多次读取结果一致，避免脏读、不可重复读，可能出现幻读
5. SERIALIZABLE:通过强制事务按顺序执行，完全避免脏读、不可重复读、幻读

## spring 事务传播行为

[Spring 有哪几种事务传播行为? - Spring 面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1790683494127804418/question/1780933295417094146)

required（默认行为）：方法会加入现有事务，如果没有就创建一个新事务

requires_new：强制启动一个新事务，无论当前是否存在事务。如果有就挂起，直到新事务完成

nested：如果当前存在事务，会在当前事务中创建一个嵌套事务，子事务可以独立回滚而不影响主事务

supports：支持事务，不强制要求。如果有事务，加入当前事务，没有就以非事务方式执行

mandatory：方法必须在已有事务中运行，如果当前没有事务就抛异常

not_supported：不支持事务，如果存在事务，将当前事务挂起，并以非事务方式执行

never：不允许在事务中运行，如果当前没有事务就抛异常



## spring 通知类型

[Spring 通知有哪些类型？ - Spring 面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1790683494127804418/question/1797567441497358338#heading-0)

前置通知

后置通知

后置异常通知：在目标方法抛出异常后执行

后置最终通知：无论目标方法如何结束（正确返回或抛出异常），都会执行

环绕通知



## @Qualifier注解

[@Qualifier 注解有什么作用 - Spring 面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1790683494127804418/question/1797568550655885313)

[Spring中的@Primary注解的作用是什么？ - Spring 面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1790683494127804418/question/1797871576671191041)

在依赖注入时消除歧义。当一个类型同多个实现类时，可以指定需要注入的bean

@Primary首选Bean，@Qualifier会覆盖@Primary

## @Bean和@Component

[@Bean和@Component有什么区别？ - Spring 面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1790683494127804418/question/1797568672965984258)

都是定义spring容器中bean的注解



|   特性   |                          @Bean                          |                   @Component                   |
| :------: | :-----------------------------------------------------: | :--------------------------------------------: |
| 使用位置 |               方法级别（@Configuration）                |                     类级别                     |
| 扫描机制 |              不支持自动扫描，需要手动注册               |      支持自动扫描，通过@Component自动发现      |
| 主要用途 |                 配置第三方库或复杂对象                  |                自动发现并注册类                |
| 常见场景 | 手动配置复杂对象、第三方库类（Redis、Mybatis，Api文档） | 自定义服务（AOP）、DAO层、控制器等类的自动注册 |
|  灵活性  |                  灵活、适合复杂初始化                   |          自定化更强、适合类的简单注册          |

## @Component与@Controller、@Repository、@Service

[@Component、@Controller、@Repository和@Service 的区别？ - Spring 面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1790683494127804418/question/1797568918223716354)

本质没区别，其它3个都是@Component的衍生注解。都用@Component都可以

@Component：通用注解，用于将任意类注册为spring容器中的bean

@Controller：专门用于spring MVC中的控制器层注解。用于处理http请求，并将结果返回给客户端

@Repository：标识业务逻辑层的类，主要用于编写服务类

@Service：用于数据访问层（DAO），与数据库交互

## spring事务什么情况下会失效

[Spring 事务在什么情况下会失效？ - Spring 面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1790683494127804418/question/1797569076432863234)

失效的情况都是用了声明式事务（@Transactional）

1. rollbackFor没设置对
2. propagation传播机制配置错误

```java
@Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = Exception.class)
public void addUserAndAddress(User user,Address address) throws Exception {
    userMapper.save(user);
    addAddress(address);
}

@Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = Exception.class)
public void addAddress(Address address) {
    addressMapper.save(address);
}
```

3. 异常被捕获，没抛出异常

4. 同一个类中方法调用，事务基于动态代理，同类的方法调用不会走代理方法

5. @Transactional应用在非public方法

6. @Transactional应用在final和static方式，aop（springBoot2.x默认是cglib，Spring默认是jdk）默认是CGLIB代理，无法对final方法子类化。static是静态方法，属于类，不属于实例对象，无法被代理

7. 多线程环境，@Transactional基于ThreadLocal存储上下文，多线程情况下每个线程都有自己的上下文
8. 数据库引擎不支持事务（Mysql MyISAM）

## @Value

[Spring中的@Value注解的作用是什么？ - Spring 面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1790683494127804418/question/1797871888496721922)

注入外部配置值（属性文件、环境变量、系统属性）到spring管理的bean中



