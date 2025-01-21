[TOC]



## Mybatis的缓存机制

[说说 MyBatis 的缓存机制？ - MyBatis 面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1801424748099739650/question/1802597639336042498#heading-0)

### 一级缓存

仅在同一个`SqlSession`中生效。基于namespace、sql、参数作为唯一标识

默认开启，生命周期与SqlSession一致

执行commit、rollback或手动清理缓存时会清空

### 二级缓存

跨SqlSession共享缓存，基于Mapper的缓存

需要手动开启

```xml
<mapper namespace="com.example.mapper.UserMapper">
    <!-- 开启二级缓存 -->
    <cache eviction="LRU" flushInterval="60000" size="512" readOnly="true"/>
</mapper>

<!-- eviction：缓存清理策略
flushInterval：刷新间隔
size：缓存的最大对象个数
readOnly：只读，设置为true时提高性能，但不能修改返回对象-->
```

生命周期与SqlSessionFactory一致

数据的增，删，改会清空缓存

> 一级、二级缓存都会导致脏数据
>
> 由于SqlSession会有脏数据的情况，所以我们可以设置SqlSession数据缓存的级别。一共有两种级别分别是SESSION和STATEMENT。SESSION：这是默认设置，意味着在一个SqlSession生命周期内，对查询结果进行缓存。
>
> STATEMENT：意味着每次执行完SQL后都会清除缓存，即每个语句执行后都不会保留缓存。一般建议设置为STATEMENT

## MyBatis的执行流程

[能详细说说 MyBatis 的执行流程吗？ - MyBatis 面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1801424748099739650/question/1803351153858568193)

1. 创建SqlSessionFactory：读取MyBatis的mybatis-configxml初始化，通过SqlSessionFactoryBuilder构建
2. 获取SqlSession：SqlSessionFactory通过openSession()获取SqlSession对象（执行sql、提交事务）
3. 命名空间和映射语句的查找：通过namespace和id定位，将映射文件解析为一个MappedStatement对象（保存sql、参数类型、返回类型）
4. 参数封装、sql语句执行、返回结果映射：sql执行前，根据映射文件配置的parameterType类型，将传入的参数封装为对象。根据不同的执行环境将sql语句执行到数据库中，并将查询结果根据resultType/resultMap进行转换，将查询结果转换为Java对象
5. 事务管理：通过SqlSession处理，commit()和rollback()
6. 关闭SqlSession：通过close()关闭

## MyBatis写个XML映射文件，再写个Dao接口就能执行，原理是什么

[MyBatis 写个 Xml 映射文件，再写个 DAO 接口就能执行，这个原理是什么？ - MyBatis 面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1801424748099739650/question/1801871567963365377#heading-0)

通过动态代理，解析xml映射文件和动态生成dao接口实现类来执行sql

1. 加载配置和mapper映射文件：MappedStatement对象
2. 动态代理实现dao接口：为每一个dao接口生成代理类MapperProxy，拦截接口方法调用，根据方法名和参数匹配到对应的MappedStatement，调用jdbc执行
3. 通过jdbc执行sql：执行sql获取resultset
4. 结果映射：resultmap或resulttype映射为dao接口方法的返回值类型

## MyBatis支持延迟加载

[MyBatis 是否支持延迟加载？如果支持，它的实现原理是什么？ - MyBatis 面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1801424748099739650/question/1802587443079487490)

通过MyBatis提供的代理对象，当访问具体关联的属性时，才真正触发数据库的查询

```xml
<settings>
    <!-- 启用懒加载 -->
    <setting name="lazyLoadingEnabled" value="true"/>
    <!-- 当访问任何属性时，都会加载所有懒加载属性 -->
    <setting name="aggressiveLazyLoading" value="false"/>
    <!-- 使用实际的参数而不是当前对象的哈希码来触发加载 -->
    <setting name="useActualParamName" value="true"/>
</settings>
```

使用CGLIB或Javassist创建代理对象

代理对象内部维护一个延迟加载器ResultLoaderMap记录哪些属性需要延迟加载

进入代理对象的invoke，检查被调用方法是否是延迟加载属性的getter方法，如果是，并且该属性的值为null，执行sql查询，再setter设置到目标对象的属性中

## mybatis插件的运行原理

[简述 MyBatis 的插件运行原理，以及如何编写一个插件？ - MyBatis 面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1801424748099739650/question/1802872613967831042#heading-1)

通过动态代理实现，在sql执行的关键点拦截生成代理对象。先调用插件的intercept

ExecutorL：执行sql CRUD操作

ParameterHandler：处理sql语句中的参数

StatementHandler：处理sql语句

ResultSetHandler：处理结果集

### 实现

**实现Intercept接口**

+ intercept：拦截逻辑
+ plugin：创建当前拦截器的代理对象
+ setProperties：设置插件属性

**定义拦截逻辑**

在intercept实现增强逻辑。使用Invocation对象调用目标方法

**配置插件**

在mybatis-config.xml配置插件类和参数

```java
@Intercepts({
    @Signature(
        type= StatementHandler.class,
        method = "prepare",
        args = {Connection.class, Integer.class}
    )
})
public class ExamplePlugin implements Interceptor {
    @Override
    public Object intercept(Invocation invocation) throws Throwable {
        // 获取被代理对象
        StatementHandler statementHandler = (StatementHandler) invocation.getTarget();
        // 获取 SQL 语句
        String sql = statementHandler.getBoundSql().getSql();
        System.out.println("SQL: " + sql);
        // 继续执行其他插件链和目标方法
        return invocation.proceed();
    }

    @Override
    public Object plugin(Object target) {
        // 创建代理对象
        return Plugin.wrap(target, this);
    }

    @Override
    public void setProperties(Properties properties) {
        // 从配置中获取属性，例如：
        String someProperty = properties.getProperty("someProperty");
        System.out.println("Some Property: " + someProperty);
    }
}
```

```xml
<plugins>
    <plugin interceptor="com.example.ExamplePlugin">
        <property name="someProperty" value="value"/>
    </plugin>
</plugins>
```

### 用途

性能分析、动态参数注入、数据脱敏、自动分页



## mybatis实现数据库类型和java类型转换

[MyBatis 如何实现数据库类型和 Java 类型的转换的？ - MyBatis 面试题 - 面试鸭 - 程序员求职面试刷题神器](https://www.mianshiya.com/bank/1801424748099739650/question/1803321567800188930)

依赖类型处理器TypeHandler

- 加载映射文件时，根据jdbc类型和java类型确定使用的TypeHandler

- 执行sql时，ParameterHandler使用TypeHandler将java参数转换为jdbc类型

- 解析结果集时，ResultSetHandler使用TypeHandler将jdbc类型转换为java对象